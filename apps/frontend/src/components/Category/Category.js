import React from "react";
import Tabs from "./Tab";
import "./Category.css";

const Category = () => {
  return (
    <div className="min-h-screen app__bg" id="categories">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold section-title text-white text-center md:text-left">
          Build your next Gaming Setup
        </h1>
        <Tabs />
      </div>
    </div>
  );
};

export default Category;
