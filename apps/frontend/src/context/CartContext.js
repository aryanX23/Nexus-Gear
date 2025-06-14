import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const axiosprivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [change, setChange] = useState(false);
  const [currentProduct, setCurrentProduct] = useState("");

  const handleUpdate = async (temp) => {
    try {
      const userId = localStorage.getItem("userId");

      await axiosprivate.post(
        "/api/payments/setCart",
        JSON.stringify({
          cartItems: temp,
          userId: userId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
      setCartItems((prev) => []);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const addToCart = async (product) => {
    try {
      setChange((prev) => !prev);
      setCartItems((prevCartItems) => {
        const existingProductIndex = prevCartItems.findIndex(
          (item) => item._id === product._id
        );

        let updatedCartItems;

        if (existingProductIndex !== -1) {
          // Product exists, update quantity. Unit price (item.price) remains unchanged.
          updatedCartItems = prevCartItems.map((item, index) => {
            if (index === existingProductIndex) {
              return {
                ...item, // Preserves existing item properties including unit price
                quantity: item.quantity + product.quantity, // product.quantity is the quantity to add
              };
            }
            return item;
          });
        } else {
          // Product does not exist, add new product
          updatedCartItems = [...prevCartItems, product];
        }

        handleUpdate(updatedCartItems);
        return updatedCartItems;
      });
    } catch (err) {
      console.error("Error in addToCart:", err); // Log the error for debugging
      // It's generally better to show a user-friendly error message
      // than just redirecting. For now, keeping the redirect.
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      // Use functional update to get the latest state
      const updatedCartItems = prevCartItems.filter(
        (item) => item._id !== productId
      );
      handleUpdate(updatedCartItems);
      return updatedCartItems;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        currentProduct,
        setCurrentProduct,
        change,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
