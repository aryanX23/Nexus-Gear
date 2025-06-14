import React, { useEffect } from "react";

import Navbar from "../components/Navbar/navbar";
import HeroSection from "../components/Herosection/HeroSection";
import Footer from "../components/Footer/Footer";
import Category from "../components/Category/Category";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useCart } from "../context/CartContext";

const HomePage = () => {
  const axiosprivate = useAxiosPrivate();

  const { setCartItems } = useCart();

  const userId = localStorage.getItem("userId") || "temp";

  useEffect(() => {
    async function handleFetch() {
      try {
        if (userId !== "temp") {
          const response = await axiosprivate.get(
            "/api/payments/getCart/" + userId,
            {
              withCredentials: true,
            }
          );
          setCartItems(response.data.cartItems);
          return;
        }
        setCartItems([]);
      } catch (err) {
        console.log(err);
        setCartItems([]);
      }
    }
    handleFetch();
  }, [axiosprivate, userId, setCartItems]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <Category />
      <Footer />
    </>
  );
};

export default HomePage;
