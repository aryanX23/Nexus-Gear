import React from 'react'
import Tabs from './Tab.js'
import './Category.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.js';

const Category = () => {

  const { addToCart } = useCart();

  const categories = [
    {
      name: 'Keyboards',
      content: (
        <div className="grid">

          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
            {/* Product 2 */}
            <div className="md:flex">
              <div className="md:flex">
                <img
                  className="h-auto w-full object-cover md:w-48"
                  src="https://via.placeholder.com/200"
                  alt="Product 2"
                />
              </div>
              <div className="p-5">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Category 1
                </div>
                <Link to="/ProductPage" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                  Product Name
                </Link>
                <div className="mt-4">
                  <span className="text-gray-500">Price: </span>
                  <span className="text-black font-medium">$79.99</span>
                </div>
                <button className="mt-4 bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600" onClick={addToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
            {/* Product 1 */}
            <div className="md:flex">
              <div className="md:flex">
                <img
                  className="h-auto w-full object-cover md:w-48"
                  src="https://via.placeholder.com/200"
                  alt="Product 1"
                />
              </div>
              <div className="p-5">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Category 1
                </div>
                <Link to="/ProductPage" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                  Product Name
                </Link>
                <div className="mt-4">
                  <span className="text-gray-500">Price: </span>
                  <span className="text-black font-medium">$99.99</span>
                </div>
                <button className="mt-4 bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
            {/* Product 2 */}
            <div className="md:flex">
              <div className="md:flex">
                <img
                  className="h-auto w-full object-cover md:w-48"
                  src="https://via.placeholder.com/200"
                  alt="Product 2"
                />
              </div>
              <div className="p-5">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Category 1
                </div>
                <Link to="/ProductPage" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                  Product Name
                </Link>
                <div className="mt-4">
                  <span className="text-gray-500">Price: </span>
                  <span className="text-black font-medium">$79.99</span>
                </div>
                <button className="mt-4 bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>



        </div>


      ),
    },
    {
      name: 'Mouse',
      content: <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src="https://via.placeholder.com/200"
              alt="Product"
            />
          </div>
          <div className="p-5">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Category
            </div>
            <Link to="/ProductPage" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              Product Name
            </Link>
            <div className="mt-4">
              <span className="text-gray-500">Price: </span>
              <span className="text-black font-medium">$99.99</span>
            </div>
            <button className="mt-4 bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    },
    {
      name: 'Headphones',
      content: <div>Content for Category 3</div>
    },
    {
      name: 'Monitor',
      content: <div><h3>Hello</h3></div>
    },
    {
      name: 'Chairs',
      content: <div><h3>Hello</h3></div>
    },
    {
      name: 'Controllers',
      content: <div><h3>Hello</h3></div>
    },
    {
      name: 'Microphones',
      content: <div><h3>Hello</h3></div>
    }
  ];

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-5 pt-16 section-title">
          Build your next Gaming Setup
        </h1>
        <Tabs categories={categories} />
      </div>
    </div>
  );
};

export default Category;
