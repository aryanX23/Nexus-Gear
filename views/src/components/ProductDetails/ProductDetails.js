import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from "../../api/axios";
import { useCart } from "../../context/CartContext";

const ProductDetailPage = (props) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [change, setChange] = useState(false);

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

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await Axios({
                    method: "post",
                    url: "/api/products/getReviews",
                    data: {
                        productId: props.productId,
                    },
                });

                if (response.data.status === "success") {
                    setReviews(prev => response?.data?.reviews || []);
                } else {
                    toast.error("Failed to Fetch Reviews", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

            } catch (error) {
                console.error("Error fetching review:", error);
                toast.error("Failed to fetch review", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }

        fetchReviews();
    }, [props.productId, change]);

    if (!product) {
        return <div className="text-center py-8">Loading...</div>;
    }

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value > 0 ? value : 1); // Ensure quantity is at least 1
    };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        try {
            const response = await Axios({
                method: "post",
                url: "/api/products/addReview",
                data: {
                    productId: props.productId,
                    userId: userId,
                    review: {
                        comment: review,
                        rating: rating,
                    },
                },
            });

            if (response.data.status === "success") {
                toast.success("Review submitted successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setChange(prev => !prev);
                setReview('');
                setRating(5);
            } else {
                toast.error("Failed to submit review", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 overflow-hidden rounded-lg">
                    <img
                        src={product.imageurl}
                        alt={product.name}
                        className="w-full rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0">
                    <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">{product.description}</p>
                    <p className="text-xl font-semibold mt-4 text-gray-900">
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
                            className="w-20 py-2 px-3 border border-gray-300 rounded-md text-center"
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
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mt-8 bg-gray-50 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Product Reviews</h3>
                {reviews.length > 0 ? (
                    <ul className="space-y-6">
                        {reviews.map((review, index) => (
                            <li key={index} className="bg-white rounded-lg shadow-sm p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-lg font-semibold text-gray-800">
                                        {review.reviewerName}
                                    </p>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 mt-2">{review.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 mt-4 text-center italic">No reviews yet. Be the first to review this product!</p>
                )}
            </div>
            <div className="mt-8 bg-gray-50 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Submit a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <textarea
                        className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        rows="4"
                    />
                    <div className="flex items-center">
                        <label htmlFor="rating" className="mr-2 text-gray-700">Rating:</label>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`w-8 h-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'
                                        } focus:outline-none`}
                                >
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetailPage;
