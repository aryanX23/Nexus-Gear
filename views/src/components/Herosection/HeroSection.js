import React from 'react';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import img1 from '../../Assets/1.avif';
import img2 from '../../Assets/2.jpg';
import img3 from '../../Assets/3.jpg';
import img4 from '../../Assets/4.jpg';

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
    <section className="app__bg" id="hero">
      <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:gap-16">
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <h1 className="text-4xl font-bold text-black leading-tight sm:text-5xl lg:text-6xl mb-6">
              Welcome to NexusGear!
            </h1>
            <p className="text-lg text-gray-600 sm:text-xl lg:text-2xl mb-6">
              Welcome to the OneStop destination for all your gaming needs. Discover a world of premium gaming accessories designed to elevate your gaming experience to the next level. At NexusGear, we are passionate about gaming, and we know that having the right gear can make all the difference.
            </p>
            <button
              className="bg-violet-700 text-white font-semibold py-2 px-4 rounded hover:bg-violet-600 transition duration-300"
              onClick={scrollToCategories}
            >
              SHOP NOW
            </button>
          </div>
          <div className="lg:w-1/2">
            <ImageCarousel images={images} className="h-64 sm:h-80 lg:h-96" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
