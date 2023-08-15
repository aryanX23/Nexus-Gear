import React from 'react'
import Tabs from './Tab.js'
import './Category.css'

const Category = () => {

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-4xl font-bold mb-5 pt-16 section-title">
          Build your next Gaming Setup
        </h1>
        <Tabs/>
      </div>
    </div>
  );
};

export default Category;
