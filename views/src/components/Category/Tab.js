import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.js";
import Axios from "../../api/axios.js";
const Tabs = () => {
    const { addToCart, setCurrentProduct } = useCart();
    const [activeTab, setActiveTab] = useState(0);
    const [activeCategory, setActiveCategory] = useState([]);
    const navigate = useNavigate();
    const categories = [
        {
            name: "Keyboards",
            id: "keyboard",
        },
        {
            name: "Mouse",
            id: "mouse",
        },
        {
            name: "Headphones",
            id: "headphone",
        },
        {
            name: "Monitor",
            id: "monitor",
        },
        {
            name: "Chairs",
            id: "chair",
        },
        {
            name: "Controllers",
            id: "controller",
        },
        {
            name: "Microphones",
            id: "microphone",
        },
    ];
    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    useEffect(() => {
        Axios.get(
            "/api/products/" +
                categories[activeTab].id
        ).then((response) => {
            const data = response.data;
            var payload = data.map((item) => {
                return (
                    <div
                        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md"
                        key={item._id} 
                        id="categories"
                    >
                        <div className="md:flex">
                            <div className="md:flex">    
                                <img class="p-8 rounded-t-lg" src={item.imageurl} alt="Product_Image" />
                            </div>
                            <div className="px-5 pb-5">
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                    {categories[activeTab].name}
                                </div>
                                <span
                                    className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white cursor-pointer"
                                    onClick={() => {
                                        setCurrentProduct((prev) => item._id);
                                        navigate("/productPage");
                                    }}
                                >
                                    {item.name}
                                </span>
                                <div className="mt-4">
                                    <span className="text-gray-500">
                                        Price:{item.price}rs
                                    </span>
                                </div>
                                <button
                                    className="mt-4 bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                                    onClick={() =>
                                        addToCart({
                                            _id: item._id,
                                            name: item.name,
                                            description: item.description,
                                            quantity: 1,
                                            price: item.price,
                                            imageurl: item.imageurl,
                                        })
                                    }
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                );
            });
            if (payload.length === 0) payload = <h1>Nothing to Display!</h1>;
            payload = <div className="grid">{payload}</div>;
            setActiveCategory((prev) => payload);
        });
    }, [activeTab]);
    return (
        <div>
            <div className="flex justify-center mt-5" id="categories">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`px-5 mx-3 py-1 text-lg ${
                            activeTab === index
                                ? "border-b-2 border-violet-700 text-violet-700"
                                : "text-slate-400"
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="mt-4 mx-96 ">{activeCategory}</div>
        </div>
    );
};

export default Tabs;
