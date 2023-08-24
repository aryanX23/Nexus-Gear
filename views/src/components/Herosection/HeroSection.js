import React from 'react';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import img1 from '../../Assets/1.jpg';
import img2 from '../../Assets/2.jpg';
import img3 from '../../Assets/3.jpg';
import './HeroSection.css';
import logo from '../../Assets/HeroImg.png';

const images = [
  img1,
  img2,
  img3
];

const HeroSection = () => {

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    categoriesSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="app__bg" id="hero">
      <div className="grid max-w-screen-3xl mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ">
        <div className="py-10 mx-5 place-self-center lg:col-span-7">
          <div className="flex lg:flex-row-reverse">
            <div className="lg:w-1/2 lg:ml-10">
              <ImageCarousel images={images} className="h-96" />
            </div>
            <div className="lg:w-1/2">
              <h1 className="max-w-2xl mb-10 text-4xl my-5 font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Welcome to NexusGear!
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Welcome to the OneStop destination for all your gaming needs. Discover a world of premium gaming accessories designed to elevate your gaming experience to the next level. At NexusGear, we are passionate about gaming, and we know that having the right gear can make all the difference.
              </p>
              <button className="bg-transparent hover:bg-white text-violet-600 font-semibold hover:text-blue-600 py-2 px-4 border border-violet-700 hover:border-transparent rounded" onClick={scrollToCategories} >SHOP NOW</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
