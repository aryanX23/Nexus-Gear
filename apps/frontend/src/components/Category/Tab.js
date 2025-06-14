import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import necessary icons
import { BsInbox } from "react-icons/bs";
import { FaStar, FaShoppingCart } from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import Axios from "../../api/axios";

// --- Data and Sub-components defined in the same file ---

const categories = [
  { name: "Keyboards", id: "keyboard" },
  { name: "Mouse", id: "mouse" },
  { name: "Headphones", id: "headphone" },
  { name: "Monitor", id: "monitor" },
  { name: "Chairs", id: "chair" },
  { name: "Controllers", id: "controller" },
  { name: "Microphones", id: "microphone" },
];

// --- Sub-component 1: TabButton ---
const TabButton = React.forwardRef(({ label, isActive, onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-500 z-10
            ${isActive ? "text-white" : "text-slate-600 hover:text-slate-900"}`}
    >
      {label}
    </button>
  );
});

// --- Sub-component 2: ProductCard (Redesigned UI) ---
const ProductCard = ({ item, onProductClick, onAddToCartClick }) => {
  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
      <div
        onClick={() => onProductClick(item)}
        className="relative w-full aspect-square overflow-hidden cursor-pointer"
      >
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-full shadow-md">
            Featured
          </span>
        </div>
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={item.imageurl}
          alt={item.name}
        />
        <div
          className="absolute inset-0 bg-black/40 flex items-center justify-center 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div
            onClick={(e) => onAddToCartClick(e, item)}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg 
                                   transform transition-all ease-in-out hover:scale-105 hover:brightness-110"
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3
          onClick={() => onProductClick(item)}
          className="text-base font-semibold text-slate-800 truncate cursor-pointer hover:text-blue-600 transition-colors"
        >
          {item.name}
        </h3>

        <div className="flex items-center mt-2 gap-1">
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-slate-300" />
          <span className="text-xs text-slate-500 ml-2">(142)</span>
        </div>

        <div className="flex-grow" />

        <div className="flex items-end justify-between mt-4">
          <p className="text-xl font-bold text-slate-900">
            <span className="text-base font-medium text-slate-500 mr-0.5">
              &#8377;
            </span>
            {item.price.toLocaleString("en-IN")}
          </p>
          <button
            onClick={(e) => onAddToCartClick(e, item)}
            aria-label="Add to cart"
            className="p-2 rounded-full text-slate-500 bg-slate-100 transition-all duration-200
                                   hover:bg-blue-500 hover:text-white hover:scale-110"
          >
            <FaShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Other Sub-components (LoadingGrid, EmptyState) ---
const SkeletonCard = () => (
  <div className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md animate-pulse">
    <div className="w-full aspect-square bg-slate-200"></div>
    <div className="p-4 flex flex-col flex-grow">
      <div className="h-5 w-3/4 bg-slate-200 rounded-md"></div>
      <div className="flex gap-1 mt-3">
        <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
        <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
        <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
      </div>
      <div className="flex-grow" />
      <div className="flex items-end justify-between mt-4">
        <div className="h-8 w-1/2 bg-slate-200 rounded-md"></div>
        <div className="h-9 w-9 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  </div>
);

const LoadingGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {Array.from({ length: 8 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-white/50 backdrop-blur-sm rounded-xl">
    <BsInbox size={80} className="mb-6 text-cyan-500/50" />
    <h2 className="text-3xl font-bold text-slate-700 mb-2">
      No Products Found
    </h2>
    <p className="max-w-md text-slate-500">
      It seems this category is empty at the moment. Please check back later or
      try another category.
    </p>
  </div>
);

// --- Main Tabs Component ---

const Tabs = () => {
  const navigate = useNavigate();
  const { addToCart, setCurrentProduct } = useCart();

  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGridVisible, setIsGridVisible] = useState(false);

  const tabsRef = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeTabNode = tabsRef.current[activeTab];
    if (activeTabNode) {
      setSliderStyle({
        left: activeTabNode.offsetLeft,
        width: activeTabNode.offsetWidth,
      });
    }
  }, [activeTab, products]);

  useEffect(() => {
    if (isLoading) {
      const fetchProducts = async () => {
        try {
          const response = await Axios.get(
            `/api/products/${categories[activeTab].id}`
          );
          setProducts(response.data.data || []);
        } catch (err) {
          console.error("Failed to fetch products:", err);
          setProducts([]);
          toast.error("Could not fetch products.");
        } finally {
          setIsLoading(false);
          setIsGridVisible(true);
        }
      };
      fetchProducts();
    }
  }, [isLoading, activeTab]);

  const handleTabClick = (index) => {
    if (index === activeTab) return;
    setIsGridVisible(false);
    setTimeout(() => {
      setActiveTab(index);
      setIsLoading(true);
    }, 200);
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart({
      _id: item._id,
      name: item.name,
      quantity: 1,
      price: item.price,
      imageurl: item.imageurl,
    });
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleProductClick = (item) => {
    setCurrentProduct(item._id);
    navigate("/productPage");
  };

  return (
    <section
      id="categories"
      className="relative py-24 sm:py-28 bg-slate-50 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-purple-300/80 to-cyan-300/80 rounded-full blur-[250px] opacity-40"
      ></div>
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 translate-x-1/3 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-300/80 to-teal-300/80 rounded-full blur-[150px] opacity-40"
      ></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Arsenal
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Select a category to find the perfect gear to complete your setup.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div
            className="relative inline-flex flex-nowrap items-center p-2 bg-white/70 border border-white/80 backdrop-blur-lg rounded-xl overflow-x-auto shadow-sm
                                 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div
              className="absolute top-2 bottom-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
              style={sliderStyle}
            />

            {categories.map((category, index) => (
              <TabButton
                ref={(el) => (tabsRef.current[index] = el)}
                key={category.id}
                label={category.name}
                isActive={activeTab === index}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 min-h-[600px]">
          {!isGridVisible && isLoading ? (
            <LoadingGrid />
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-opacity duration-200 ease-in-out
                            ${isGridVisible ? "opacity-100" : "opacity-0"}`}
            >
              {products.length > 0 ? (
                products.map((item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    onProductClick={handleProductClick}
                    onAddToCartClick={handleAddToCart}
                  />
                ))
              ) : (
                <EmptyState />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Tabs;
