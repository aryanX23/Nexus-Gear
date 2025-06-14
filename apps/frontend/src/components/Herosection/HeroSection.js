import React from 'react';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import img1 from '../../Assets/1.avif';
import img2 from '../../Assets/2.jpg';
import img3 from '../../Assets/3.jpg';
import img4 from '../../Assets/4.jpg';
import './HeroSection.css';

const images = [img1, img2, img3, img4];

const HeroSection = () => {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gray-900 text-white" id="hero">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Responsive Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content wrapper with responsive padding and layout */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-16 items-center py-16 sm:py-20 lg:py-28">

          {/* Text Content Column */}
          <div className="text-center lg:text-left mt-12 lg:mt-0">
            <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
              Unleash Your Potential
            </p>
            {/* Headline with responsive font sizes */}
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
                NexusGear!
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
              Your one-stop destination for elite gaming accessories. We're passionate about providing the gear that gives you a competitive edge and elevates your entire gaming experience.
            </p>
            {/* Buttons are already mobile-friendly */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <button
                onClick={scrollToCategories}
                className="inline-block px-7 py-3 font-semibold text-base text-white tracking-wider bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-md transition-all duration-300 ease-in-out
                                 hover:bg-gradient-to-l hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-1
                                 focus:outline-none focus:ring-4 focus:ring-cyan-300 w-full sm:w-auto"
              >
                SHOP NOW
              </button>
              <button className="group font-semibold text-base text-white/80 tracking-wider transition-colors duration-300 hover:text-white w-full sm:w-auto">
                Learn More <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Image Carousel Column */}
          <div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-40 
                                         transition-all duration-500 group-hover:opacity-75 group-hover:-inset-2">
              </div>
              <div className="relative p-1 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl shadow-2xl 
                                         transition-all duration-300 group-hover:-translate-y-2">
                <div className="relative rounded-lg overflow-hidden bg-gray-900">
                  <span className="absolute top-2 left-2 w-5 h-5 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-lg"></span>
                  <span className="absolute top-2 right-2 w-5 h-5 border-r-2 border-t-2 border-cyan-400/50 rounded-tr-lg"></span>
                  <span className="absolute bottom-2 left-2 w-5 h-5 border-l-2 border-b-2 border-cyan-400/50 rounded-bl-lg"></span>
                  <span className="absolute bottom-2 right-2 w-5 h-5 border-r-2 border-b-2 border-cyan-400/50 rounded-br-lg"></span>
                  <ImageCarousel images={images} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;