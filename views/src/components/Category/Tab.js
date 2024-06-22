import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useCart } from "../../context/CartContext";
import Axios from "../../api/axios";

const Tabs = () => {
    const navigate = useNavigate();
    const { addToCart, setCurrentProduct } = useCart();

    const [activeTab, setActiveTab] = useState(0);
    const [activeCategory, setActiveCategory] = useState([]);

    const categories = [
        { name: "Keyboards", id: "keyboard" },
        { name: "Mouse", id: "mouse" },
        { name: "Headphones", id: "headphone" },
        { name: "Monitor", id: "monitor" },
        { name: "Chairs", id: "chair" },
        { name: "Controllers", id: "controller" },
        { name: "Microphones", id: "microphone" },
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    useEffect(() => {
        try {
            Axios.get(`/api/products/${categories[activeTab].id}`)
                .then((response) => {
                    const { data = [] } = response?.data || {};
                    const payload = data.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.map((item) => (
                                <div className="w-full max-w-sm h-120 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 pb-2.5">
                                    <div className="relative h-2/5">
                                        <img className="p-4 rounded-t-lg h-full w-full object-cover" src={item.imageurl} alt="Product" />
                                        <div className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md">
                                            <span className="text-indigo-500 text-sm font-semibold uppercase">
                                                {categories[activeTab].name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-6 h-3/5 flex flex-col justify-between">
                                        <span
                                            className="block text-lg sm:text-xl font-semibold text-gray-900 cursor-pointer hover:text-indigo-500 transition-colors"
                                            onClick={() => {
                                                setCurrentProduct(item._id);
                                                navigate("/productPage");
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                        <div className="mt-2 sm:mt-3 text-gray-500">Price: &#8377; {item.price}</div>
                                        <button
                                            className="mt-4 sm:mt-5 bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 transition-colors focus:outline-none focus:bg-indigo-700"
                                            onClick={() => {
                                                toast.success('Item Added to cart!', {
                                                    position: "top-right",
                                                    autoClose: 500,
                                                    hideProgressBar: true,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "light",
                                                });
                                                addToCart({
                                                    _id: item._id,
                                                    name: item.name,
                                                    description: item.description,
                                                    quantity: 1,
                                                    price: item.price,
                                                    imageurl: item.imageurl,
                                                });
                                            }
                                            }
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    ) : <h1>Nothing to Display!</h1>;

                    setActiveCategory(payload);
                });
        } catch (err) {
            console.log(err);
        }
    }, [activeTab]);

    return (
        <div>
            <div className="flex flex-wrap justify-center mt-5" id="categories">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 text-lg ${activeTab === index
                            ? "border-b-2 border-violet-700 text-violet-700"
                            : "text-slate-400"
                            }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="mt-4 mx-4 sm:mx-16 lg:mx-32 xl:mx-48">{activeCategory}</div>
        </div>
    );
};

export default Tabs;
