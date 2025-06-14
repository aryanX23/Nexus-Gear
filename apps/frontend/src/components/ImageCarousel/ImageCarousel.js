import React, { useState, useEffect, useCallback } from "react";

import "./ImageCarousel.css";

const ImageCarousel = ({ images, autoScrollInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    if (images.length === 0) return;

    const intervalId = setInterval(nextImage, autoScrollInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [nextImage, autoScrollInterval, images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex}`}
        className="carousel-image"
      />
    </div>
  );
};

export default ImageCarousel;
