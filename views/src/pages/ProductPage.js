import React from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Navbar from "../components/Navbar/navbar";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
    const { currentProduct } = useCart();
    return (
        <>
            <Navbar />
            <ProductDetails productId={currentProduct} />
        </>
    );
};

export default ProductPage;
