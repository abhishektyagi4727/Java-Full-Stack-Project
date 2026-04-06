// src/context/CartContext.jsx
import { createContext, useEffect, useMemo, useState, useContext } from "react";
import { toast } from "react-toastify";
import {
  getCart,
  addToCartAPI,
  updateCartItemAPI,
  removeFromCartAPI,
  clearCartAPI,
} from "../services/apiService";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext); // ✅ Get user from AuthContext

  // Load cart from backend when user logs in
  useEffect(() => {
    if (isLoggedIn && user && user.email) {
      loadCartFromBackend();
    } else {
      setCart([]); // Clear cart when logged out
    }
  }, [isLoggedIn, user]);

  const loadCartFromBackend = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const response = await getCart(user.email);
      console.log("Cart loaded:", response.data);

      if (response.data && response.data.success) {
        const cartItems = response.data.data.map((item) => ({
          id: item.productId,
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.imageUrl,
          quantity: item.quantity,
          qty: item.quantity,
        }));
        setCart(cartItems);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add to cart
  const addToCart = async (item) => {
    console.log("addToCart called, isLoggedIn:", isLoggedIn, "user:", user);

    if (!isLoggedIn || !user) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await addToCartAPI(
        user.email,
        item.id || item.productId,
        1,
      );
      console.log("Add to cart response:", response.data);

      if (response.data && response.data.success) {
        toast.success(`${item.name} added to cart 🎉`);
        await loadCartFromBackend(); // Refresh cart
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  // Remove from cart
  const removeFromCart = async (id) => {
    if (!isLoggedIn || !user) return;

    try {
      const response = await removeFromCartAPI(user.email, id);
      if (response.data && response.data.success) {
        toast.info("Item removed from cart");
        await loadCartFromBackend();
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item");
    }
  };

  // Update quantity
  const updateQty = async (id, quantity) => {
    if (!isLoggedIn || !user) return;

    const newQuantity = Math.max(1, Number(quantity));
    try {
      const response = await updateCartItemAPI(user.email, id, newQuantity);
      if (response.data && response.data.success) {
        await loadCartFromBackend();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!isLoggedIn || !user) return;

    try {
      const response = await clearCartAPI(user.email);
      if (response.data && response.data.success) {
        toast.info("Cart cleared");
        setCart([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  // Get cart total
  const getCartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || item.qty || 1),
      0,
    );
  }, [cart]);

  // Get cart count
  const getCartCount = useMemo(() => {
    return cart.reduce(
      (count, item) => count + (item.quantity || item.qty || 1),
      0,
    );
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      getCartTotal,
      getCartCount,
      loadCartFromBackend,
    }),
    [cart, loading, isLoggedIn, user],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
