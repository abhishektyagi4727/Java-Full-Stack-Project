import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total price - handles both quantity and qty fields
  const totalPrice = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity || item.qty || 1);
    return sum + price * qty;
  }, 0);

  // Get image URL - handles different property names
  const getImageUrl = (item) => {
    return (
      item.imageUrl ||
      item.image ||
      "https://via.placeholder.com/100x100?text=Food"
    );
  };

  // Get quantity - handles different property names
  const getQuantity = (item) => {
    return item.quantity || item.qty || 1;
  };

  // Get product name
  const getProductName = (item) => {
    return item.name || item.productName;
  };

  // Get price
  const getPrice = (item) => {
    return Number(item.price) || 0;
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container text-center py-5">
        <h2>Shopping Cart</h2>
        <div className="alert alert-info mt-4">
          Your cart is empty. Start adding some delicious food!
        </div>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="mb-4">Shopping Cart</h2>

      {/* DESKTOP TABLE */}
      <div className="table-responsive desktop-only">
        <table className="cart-table table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id || item.productId}>
                <td className="product">
                  <img
                    src={getImageUrl(item)}
                    alt={getProductName(item)}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <span className="ms-3">{getProductName(item)}</span>
                </td>
                <td>₹{getPrice(item)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={getQuantity(item)}
                    onChange={(e) =>
                      updateQty(
                        item.id || item.productId,
                        Number(e.target.value),
                      )
                    }
                    className="form-control"
                    style={{ width: "80px" }}
                  />
                </td>
                <td>₹{(getPrice(item) * getQuantity(item)).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id || item.productId)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="mobile-only d-md-none">
        {cart.map((item) => (
          <div className="card mb-3" key={item.id || item.productId}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={getImageUrl(item)}
                  alt={getProductName(item)}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1">{getProductName(item)}</h6>
                  <p className="mb-0 text-danger fw-bold">₹{getPrice(item)}</p>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromCart(item.id || item.productId)}
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      updateQty(
                        item.id || item.productId,
                        getQuantity(item) - 1,
                      )
                    }
                    disabled={getQuantity(item) <= 1}
                  >
                    -
                  </button>
                  <span className="mx-3">{getQuantity(item)}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      updateQty(
                        item.id || item.productId,
                        getQuantity(item) + 1,
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div className="fw-bold">
                  ₹{(getPrice(item) * getQuantity(item)).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total */}
      <div className="cart-total card mt-4 p-3 bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Total Amount:</h5>
          <h4 className="mb-0 text-danger">₹{totalPrice.toFixed(2)}</h4>
        </div>
      </div>

      {/* Cart Actions */}
      <div className="cart-actions d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
        >
          ← Continue Shopping
        </button>

        <button
          className="btn btn-danger"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}

export default Cart;
