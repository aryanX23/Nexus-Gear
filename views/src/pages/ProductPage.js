import React from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Navbar from "../components/Navbar/navbar";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer/Footer";

const ProductPage = () => {
    const { currentProduct } = useCart();
    return (
        <>
            <Navbar />
            <ProductDetails productId={currentProduct} />
            <Footer />
        </>
    );
};

export default ProductPage;
