// src/services/apiService.js
import api from "./api";

// ============================================
// PRODUCT & CATEGORY APIS (Public)
// ============================================

// Get all products
export const getProducts = async () => {
  const response = await api.get("/products");
  return response;
};

// Get product by ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response;
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  const response = await api.get(`/products/category/${categoryId}`);
  return response;
};

// Get all categories
export const getCategories = async () => {
  const response = await api.get("/categories");
  return response;
};

// ============================================
// CART APIS (Protected)
// ============================================

// Get cart
export const getCart = async (email) => {
  const response = await api.get(`/cart/${email}`);
  return response;
};

// Add to cart
export const addToCartAPI = async (email, productId, quantity) => {
  const response = await api.post("/cart/add", { email, productId, quantity });
  return response;
};

// Update cart item
export const updateCartItemAPI = async (email, productId, quantity) => {
  const response = await api.put("/cart/update", {
    email,
    productId,
    quantity,
  });
  return response;
};

// Remove from cart
export const removeFromCartAPI = async (email, productId) => {
  const response = await api.delete(`/cart/remove/${email}/${productId}`);
  return response;
};

// Clear cart
export const clearCartAPI = async (email) => {
  const response = await api.delete(`/cart/clear/${email}`);
  return response;
};

// Get cart total
export const getCartTotal = async (email) => {
  const response = await api.get(`/cart/total/${email}`);
  return response;
};

// ============================================
// ORDER APIS (Protected)
// ============================================

// Create order
export const createOrder = async (orderData) => {
  const response = await api.post("/orders/create", orderData);
  return response;
};

// Get user orders
export const getUserOrders = async (email) => {
  const response = await api.get(`/orders/user/${email}`);
  return response;
};

// Get order by ID
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response;
};

// ============================================
// AUTHENTICATION APIS (Public)
// ============================================

// Register user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response;
};

// Get user profile
export const getUserProfile = async (email) => {
  try {
    const response = await api.get(`/users/profile/${email}`);
    return response;
  } catch (error) {
    // Fallback: return user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    return { data: { success: true, data: user } };
  }
};

// Update password
export const updatePassword = async (email, currentPassword, newPassword) => {
  const response = await api.put("/users/change-password", {
    email,
    currentPassword,
    newPassword,
  });
  return response;
};
