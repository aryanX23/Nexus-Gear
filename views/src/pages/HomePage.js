import React from 'react'
import Navbar from '../components/Navbar/navbar'
import HeroSection from '../components/Herosection/HeroSection'
import Footer from '../components/Footer/Footer'
import Category from '../components/Category/Category'

const HomePage = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Category />
            <Footer />
        </>
    )
}

export default HomePage