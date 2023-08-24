import React from 'react'
import Tabs from './Tab.js'
import './Category.css'

const Category = () => {

  return (
    <div className="min-h-screen app__bg section__padding" id='categories'>
      <div>
        <h1 className="text-4xl font-bold section-title text-white">
          Build your next Gaming Setup
        </h1>
        <Tabs/>
      </div>
    </div>
  );
};

export default Category;
