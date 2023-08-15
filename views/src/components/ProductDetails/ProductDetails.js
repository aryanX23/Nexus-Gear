// ProductDetailPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import { useCart } from "../../context/CartContext";

const ProductDetailPage = (props) => {
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    useEffect(() => {
        if (!props.productId)
            navigate('/');
        const fetchProductData = async () => {
            try {
                Axios({
                    method: "post",
                    url:
                        "http://localhost:8080" +
                        "/api/products/productDetails",
                    withCredentials: true,
                    data: {
                        productId: props.productId,
                    },
                }).then((response) => {
                  const data = response.data;
                  if (data.response === "success") {
                    setProduct(prev => data);
                  }
                  else {
                      navigate("/");
                  }
                });
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProductData();
    }, [props.productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img
                        src={product.imageurl}
                        alt={product.name}
                        className="w-full rounded-lg"
                    />
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-lg font-semibold mt-4">
                        Price: Rs {product.price}
                    </p>
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded"
                        onClick={() =>
                            addToCart({
                                _id: props.productId,
                                name: product.name,
                                description: product.description,
                                quantity: 1,
                                price: product.price,
                                imageurl: product.imageurl,
                            })
                        }
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold">Product Reviews</h3>
                <ul className="mt-4">
                    {product?.reviews?.map((review, index) => (
                        <li
                            key={index}
                            className="border-t border-gray-300 pt-4"
                        >
                            <p className="text-lg font-semibold">
                                {review.author}
                            </p>
                            <p className="text-gray-600 mt-1">
                                {review.comment}
                            </p>
                            <p className="text-lg font-semibold mt-1">
                                Rating: {review.rating}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductDetailPage;
