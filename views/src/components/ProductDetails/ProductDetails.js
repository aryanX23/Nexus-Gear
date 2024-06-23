import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Axios from "../../api/axios";
import { useCart } from "../../context/CartContext";

const ProductDetailPage = (props) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!props.productId) {
            navigate('/');
            return;
        }

        const fetchProductData = async () => {
            try {
                const response = await Axios({
                    method: "post",
                    url: "/api/products/productDetails",
                    withCredentials: true,
                    data: {
                        productId: props.productId,
                    },
                });
                const data = response.data;
                if (data.status === "success") {
                    setProduct(data);
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProductData();
    }, [props.productId, navigate]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value > 0 ? value : 1); // Ensure quantity is at least 1
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 overflow-hidden rounded-lg">
                    <img
                        src={product.imageurl}
                        alt={product.name}
                        className="w-full rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-lg font-semibold mt-4 text-gray-800">
                        Price: Rs {product.price}
                    </p>
                    <div className="mt-4 flex items-center">
                        <label htmlFor="quantity" className="mr-2 text-gray-700">
                            Quantity:
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-16 py-2 px-3 border border-gray-300 rounded-md text-center"
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded hover:bg-blue-600 transition-colors"
                        onClick={() => {
                            toast.success('Item Added to Cart', {
                                position: "top-right",
                                autoClose: 1000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            addToCart({
                                _id: props.productId,
                                name: product.name,
                                description: product.description,
                                quantity: quantity,
                                price: product.price * quantity,
                                imageurl: product.imageurl,
                            });
                        }
                        }
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800">Product Reviews</h3>
                <ul className="mt-4 space-y-4">
                    {product?.reviews?.map((review, index) => (
                        <li key={index} className="border-t border-gray-300 pt-4">
                            <p className="text-lg font-semibold text-gray-800">
                                {review.author}
                            </p>
                            <p className="text-gray-600 mt-1">{review.comment}</p>
                            <p className="text-lg font-semibold mt-1 text-gray-800">
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
