import React, { useState } from 'react';

const Tabs = ({ categories }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex justify-center border-b border-gray-200">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-5 mx-3 py-1 ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="mt-4 mx-96 ">
        {categories[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
