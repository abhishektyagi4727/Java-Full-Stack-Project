import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/apiService";
import { toast } from "react-toastify";

function Checkout() {
  const { user } = useContext(AuthContext);
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    deliveryAddress: "",
    paymentMethod: "CARD",
  });
  const [loading, setLoading] = useState(false);
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    // Pre-fill address from user profile if available
    if (user?.address) {
      setFormData((prev) => ({ ...prev, deliveryAddress: user.address }));
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !loading) {
      navigate("/cart");
    }
  }, [cart, navigate, loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "deliveryAddress") {
      setAddressError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate delivery address
    if (!formData.deliveryAddress.trim()) {
      setAddressError("Please enter delivery address");
      return;
    }

    setLoading(true);

    // Prepare cart items for API
    const cartItems = cart.map((item) => ({
      productId: item.id || item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity || item.qty || 1,
    }));

    const orderData = {
      email: user?.email,
      deliveryAddress: formData.deliveryAddress,
      paymentMethod: formData.paymentMethod,
      cartItems: cartItems,
    };

    try {
      const response = await createOrder(orderData);
      console.log("Order response:", response.data);

      if (response.data && response.data.success) {
        toast.success("Order placed successfully!");
        await clearCart(); // Clear cart after successful order
        navigate(`/order-success/${response.data.data.id}`);
      } else {
        toast.error(response.data?.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to place order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const subtotal = getCartTotal;
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        {/* Order Summary */}
        <div className="col-md-5 order-md-2 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              {cart.map((item) => (
                <div
                  key={item.id || item.productId}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    {item.name} x {item.quantity || item.qty || 1}
                  </span>
                  <span className="text-danger">
                    ₹
                    {(item.price * (item.quantity || item.qty || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery Charge:</span>
                <span>
                  {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span className="text-danger fs-5">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="col-md-7 order-md-1">
          <div className="card shadow-sm">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">Delivery Details</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* User Info (Read-only) */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user?.name || ""}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user?.email || ""}
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={user?.phone || ""}
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-3">
                  <label className="form-label">Delivery Address *</label>
                  <textarea
                    name="deliveryAddress"
                    className={`form-control ${addressError ? "is-invalid" : ""}`}
                    rows="3"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your complete delivery address"
                    required
                  />
                  {addressError && (
                    <div className="invalid-feedback">{addressError}</div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <label className="form-label">Payment Method</label>
                  <div className="border rounded p-3">
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="CARD"
                        checked={formData.paymentMethod === "CARD"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="card" className="form-check-label">
                        <i className="fas fa-credit-card me-2"></i>
                        Credit/Debit Card
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="UPI"
                        checked={formData.paymentMethod === "UPI"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="upi" className="form-check-label">
                        <i className="fas fa-mobile-alt me-2"></i>
                        UPI (Google Pay/PhonePe)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="CASH"
                        checked={formData.paymentMethod === "CASH"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="cod" className="form-check-label">
                        <i className="fas fa-money-bill me-2"></i>
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/cart")}
                  >
                    ← Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={loading}
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
