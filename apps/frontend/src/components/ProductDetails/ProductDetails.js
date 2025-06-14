import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from "../../api/axios";
import { useCart } from "../../context/CartContext";

// Import necessary icons
import { FaStar, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { BsInbox } from 'react-icons/bs';

// --- Reusable Sub-components ---

const StarRating = ({ rating, totalReviews }) => (
    <div className="flex items-center gap-2">
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-slate-300'} />
            ))}
        </div>
        {totalReviews > 0 && <span className="text-sm text-slate-500 hover:text-blue-600 cursor-pointer font-medium">{`(${totalReviews} reviews)`}</span>}
    </div>
);

const InteractiveStarRating = ({ rating, setRating }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
            >
                <FaStar
                    className={`w-7 h-7 transition-colors duration-200 ${rating >= star ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-300'}`}
                />
            </button>
        ))}
    </div>
);

const QuantitySelector = ({ quantity, setQuantity }) => (
    <div className="flex items-center">
        <button
            type="button"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="h-10 w-10 flex items-center justify-center bg-slate-200 text-slate-700 rounded-l-lg hover:bg-slate-300 transition"
        >
            <FaMinus />
        </button>
        <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-16 h-10 text-center font-bold text-slate-900 border-y border-slate-200 focus:outline-none"
        />
        <button
            type="button"
            onClick={() => setQuantity(q => q + 1)}
            className="h-10 w-10 flex items-center justify-center bg-slate-200 text-slate-700 rounded-r-lg hover:bg-slate-300 transition"
        >
            <FaPlus />
        </button>
    </div>
);

const ProductSkeleton = () => (
    <div className="animate-pulse container mx-auto px-4 py-12">
        {/* Skeleton content remains the same */}
    </div>
);

// --- Main Product Detail Page Component ---

const ProductDetailPage = (props) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [change, setChange] = useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [activeDetailsTab, setActiveDetailsTab] = useState('description');

    // ... (useEffect and handler logic remains the same)
    useEffect(() => {
        if (!props.productId) {
            navigate('/');
            return;
        }

        const fetchAllData = async () => {
            try {
                const productResponse = await Axios.post("/api/products/productDetails", { productId: props.productId }, { withCredentials: true });
                if (productResponse.data.status === "success") {
                    setProduct(productResponse.data);
                    setMainImage(productResponse.data.imageurl);
                } else {
                    navigate("/");
                }

                const reviewResponse = await Axios.post("/api/products/getReviews", { productId: props.productId });
                if (reviewResponse.data.status === "success") {
                    setReviews(reviewResponse.data.reviews || []);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                navigate("/");
            }
        };

        fetchAllData();
    }, [props.productId, navigate, change]);

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        if (!userId) {
            toast.error("You must be logged in to submit a review.");
            return;
        }

        try {
            await Axios.post("/api/products/addReview", {
                productId: props.productId,
                userId: userId,
                review: { comment: review, rating: rating },
            });
            toast.success("Review submitted successfully!");
            setChange(prev => !prev);
            setReview('');
            setRating(5);
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review.");
        }
    };

    if (!product) {
        return <ProductSkeleton />;
    }

    const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
        return { star, count, percentage };
    });

    return (
        <>
            {/* Animation styles for the fade-in effect */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }
            `}</style>
            <div className="bg-slate-50">
                <div className="container mx-auto px-4 py-12 sm:py-16">
                    {/* ... (Top product details section remains the same) ... */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Image Gallery */}
                        <div>
                            <div className="w-full aspect-square bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-4">
                                <img
                                    src={mainImage}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Product Details & Actions */}
                        <div className="flex flex-col">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{product.name}</h1>

                            <div className="mt-4 flex items-center gap-4">
                                <StarRating rating={averageRating} totalReviews={reviews.length} />
                                <span className="h-4 w-px bg-slate-300" />
                                <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">In Stock</span>
                            </div>

                            <p className="mt-6 text-slate-600 text-lg leading-relaxed">{product.description}</p>

                            <p className="mt-8 text-4xl font-extrabold text-slate-900">
                                <span className="text-2xl font-medium text-slate-500 mr-1">&#8377;</span>
                                {product.price.toLocaleString('en-IN')}
                            </p>

                            <div className="mt-8 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-6">
                                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                                    <button
                                        onClick={() => {
                                            addToCart({ ...product, _id: props.productId, quantity, price: product.price }); // Ensure unit price is passed
                                            toast.success("Item added to cart!", {
                                                position: "top-right",
                                                autoClose: 2000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "light",
                                            });
                                        }}
                                        className="flex-grow flex items-center justify-center gap-3 h-14 px-6 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                    >
                                        <FaShoppingCart size={20} />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Redesigned Description and Reviews Section --- */}
                    <div className="mt-16 sm:mt-20">
                        <div className="flex justify-center border-b border-slate-200">
                            <nav className="flex gap-4" aria-label="Tabs">
                                <button onClick={() => setActiveDetailsTab('description')} className={`py-3 px-5 font-semibold rounded-t-lg transition-colors duration-200 ${activeDetailsTab === 'description' ? 'bg-white border border-slate-200 border-b-white text-blue-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}>
                                    Description
                                </button>
                                <button onClick={() => setActiveDetailsTab('reviews')} className={`py-3 px-5 font-semibold rounded-t-lg transition-colors duration-200 ${activeDetailsTab === 'reviews' ? 'bg-white border border-slate-200 border-b-white text-blue-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}>
                                    Reviews ({reviews.length})
                                </button>
                            </nav>
                        </div>

                        <div key={activeDetailsTab} className="mt-8 animate-fade-in">
                            {activeDetailsTab === 'description' && (
                                <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                                    <div className="prose max-w-none text-slate-600">
                                        <h3 className="text-xl font-bold text-slate-900 mb-4">Product Description</h3>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                            )}
                            {activeDetailsTab === 'reviews' && (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                                    {/* Left Side: Review Summary */}
                                    <div className="lg:col-span-4">
                                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm sticky top-24">
                                            <h3 className="text-lg font-bold text-slate-900">Customer Feedback</h3>
                                            <div className="flex items-center gap-2 mt-4">
                                                <StarRating rating={averageRating} />
                                                <p className="font-semibold text-slate-800">{averageRating.toFixed(1)} out of 5</p>
                                            </div>
                                            <p className="mt-1 text-sm text-slate-600">Based on {reviews.length} reviews</p>

                                            <div className="space-y-3 mt-6">
                                                {ratingDistribution.map(item => (
                                                    <div key={item.star} className="flex items-center gap-2 text-sm">
                                                        <span className="font-medium text-slate-600">{item.star} star</span>
                                                        <div className="flex-grow bg-slate-200 h-2 rounded-full">
                                                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                                                        </div>
                                                        <span className="w-8 text-right text-slate-500">{item.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Reviews List and Form */}
                                    <div className="lg:col-span-8 space-y-8">
                                        <h3 className="text-xl font-bold text-slate-900">All Reviews</h3>
                                        {reviews.length > 0 ? (
                                            reviews.map((rev, index) => (
                                                <article key={index} className="border-t border-slate-200 pt-8 flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-lg">
                                                        {rev.reviewerName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <StarRating rating={rev.rating} />
                                                        <p className="mt-2 font-semibold text-slate-800">{rev.reviewerName}</p>
                                                        <p className="mt-2 text-slate-600 leading-relaxed">{rev.comment}</p>
                                                    </div>
                                                </article>
                                            ))
                                        ) : (
                                            <div className="text-center py-12 border-t border-slate-200">
                                                <BsInbox size={40} className="mx-auto text-slate-400" />
                                                <p className="mt-4 text-slate-600">Be the first to share your thoughts!</p>
                                            </div>
                                        )}
                                        {/* Review Form */}
                                        <div className="border-t border-slate-200 pt-8">
                                            <h3 className="text-xl font-bold text-slate-900">Write a review</h3>
                                            <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
                                                    <InteractiveStarRating rating={rating} setRating={setRating} />
                                                </div>
                                                <div>
                                                    <label htmlFor="review" className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
                                                    <textarea
                                                        id="review"
                                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                        placeholder="Share your thoughts on this product..."
                                                        value={review}
                                                        onChange={(e) => setReview(e.target.value)}
                                                        required
                                                        rows="4"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="h-12 px-6 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                                >
                                                    Submit Review
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;
