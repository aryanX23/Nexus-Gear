import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images, autoScrollInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    // Automatically switch to the next image at the specified interval
    const intervalId = setInterval(nextImage, autoScrollInterval);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, autoScrollInterval]);

  return (
    <div className="carousel-container">
      <img src={images[currentIndex]} alt={`Image ${currentIndex}`} className="carousel-image" />
    </div>
  );
};

export default ImageCarousel;
