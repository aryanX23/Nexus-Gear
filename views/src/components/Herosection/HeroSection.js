import React from 'react'
import HeroImg from '../../Assets/HeroImg.png'
import './HeroSection.css'

const HeroSection = () => {
  return (
  <>
    <div className="hero-section-main  max-w-full mb-10">
        <div className="mx-25">
            <img src={HeroImg} alt="HeroImg" className='drop-shadow-2xl float-right my-20 h-96 z-10'/>
        </div>
        <div className="mx-24 pt-32 pb-10">
            <span><h1 className='text-5xl text-white font-bold mb-4'>Welcome to NexusGear!</h1></span> 
            <h1 className='text-2xl justify-self-center text-white mb-4 ml-32'>Where Quality meets Style</h1>
            <h2 className='herosection-text text-white'>Welcome to the OneStop destination for all your gaming needs. Discover a world of premium gaming accessories designed to elevate your gaming experience to the next level. At NexusGear, we are passionate about gaming, and we know that having the right gear can make all the difference.</h2>
        </div>
        <div className='mx-52'>
            <button className='ml-10 mb-5 font-medium text-white border-2 border-spacing-1 p-2'>EXPLORE</button>
            <button className='ml-10 mb-5 font-medium text-white border-2 border-spacing-1 p-2'>SHOP</button>
            
        </div>
    </div>
  </>
  )
}

export default HeroSection