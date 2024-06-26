import React from 'react';

import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';

import img1 from '../../Assets/1.avif';
import img2 from '../../Assets/2.jpg';
import img3 from '../../Assets/3.jpg';
import img4 from '../../Assets/4.jpg';

import './HeroSection.css';

const images = [
  img1,
  img2,
  img3,
  img4,
];

const HeroSection = () => {

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    categoriesSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section-main app__bg" id="hero">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:gap-16">
          <div className="lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-left">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl mb-6">
              Welcome to NexusGear!
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6">
              Welcome to the OneStop destination for all your gaming needs. Discover a world of premium gaming accessories designed to elevate your gaming experience to the next level. At NexusGear, we are passionate about gaming, and we know that having the right gear can make all the difference.
            </p>
            <button
              className="shop-now-button"
              onClick={scrollToCategories}
            >
              SHOP NOW
            </button>
          </div>
          <div className="lg:w-1/2">
            <div className="image-overlay">
              <ImageCarousel images={images} className="carousel-image rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
