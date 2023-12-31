// CartContext.js
import React, { createContext, useContext, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router";
import AuthContext from "./AuthProvider";
const CartContext = createContext();
export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [currentProduct, setCurrentProduct] = useState("");
    const axiosprivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useContext(AuthContext);
    const handleUpdate = async (temp) => {
        try {
            await axiosprivate.post(
                "/api/payments/setCart",
                JSON.stringify({
                    cartItems: temp,
                    userId: auth?.userId,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
        } catch (err) {
            console.log(err);
            setCartItems(prev => []);
            navigate("/login", { state: { from: location }, replace: true });
        }
    };
    const addToCart = async (product) => {
        try {
            setCartItems((prev) => {
                var temp = prev;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i]._id === product._id) {
                        temp[i].quantity += product.quantity;
                        handleUpdate(temp);
                        return temp;
                    }
                }
                handleUpdate(temp.concat(product));
                return temp.concat(product);
            });
        } catch (err) {
            navigate("/login", { state: { from: location }, replace: true });
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => {
            const temp = cartItems.filter((item) => item._id !== productId);
            handleUpdate(temp);
            return temp;
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
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
