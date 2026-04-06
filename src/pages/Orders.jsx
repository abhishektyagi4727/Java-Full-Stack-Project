import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserOrders } from "../services/apiService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.email) {
      fetchOrders();
    } else {
      setLoading(false);
      setError("Please login to view orders");
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders(user.email);
      console.log("Orders response:", response);

      // Handle Spring Boot response format
      if (response.data && response.data.success) {
        setOrders(response.data.data || []);
      } else if (response.data) {
        setOrders(response.data || []);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get order items
  const getOrderItems = (order) => {
    if (order.items && order.items.length > 0) {
      return order.items;
    }
    if (order.orderItems && order.orderItems.length > 0) {
      return order.orderItems;
    }
    return [];
  };

  // Helper function to get product name
  const getProductName = (item) => {
    return (
      item.productName || item.product?.name || item.product_name || "Product"
    );
  };

  // Helper function to get quantity
  const getQuantity = (item) => {
    return item.quantity || 1;
  };

  // Helper function to get total amount
  const getTotalAmount = (order) => {
    return order.totalAmount || order.total || 0;
  };

  // Helper function to get order status
  const getStatus = (order) => {
    const status = order.status || "PENDING";
    const statusColors = {
      PENDING: "warning",
      PROCESSING: "info",
      DELIVERED: "success",
      CANCELLED: "danger",
    };
    return { text: status, color: statusColors[status] || "secondary" };
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          <p className="mb-0">No orders found.</p>
          <a href="/" className="btn btn-primary mt-3">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Products</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>
                    {getOrderItems(order).map((item, index) => (
                      <div key={item.id || index}>
                        {getProductName(item)} x {getQuantity(item)}
                      </div>
                    ))}
                  </td>
                  <td>₹{getTotalAmount(order).toFixed(2)}</td>
                  <td>
                    <span className={`badge bg-${getStatus(order).color}`}>
                      {getStatus(order).text}
                    </span>
                  </td>
                  <td>{formatDate(order.createdAt || order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
