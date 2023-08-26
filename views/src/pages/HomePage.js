import React, {useEffect,useContext} from 'react'
import Navbar from '../components/Navbar/navbar'
import HeroSection from '../components/Herosection/HeroSection'
import Footer from '../components/Footer/Footer'
import Category from '../components/Category/Category'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthProvider";

const HomePage = () => {
    const axiosprivate = useAxiosPrivate();
    const { setCartItems } = useCart();
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        async function handleFetch() {
            if (auth.userId === "temp") {
                axiosprivate.get(
                "/api/payments/getCart/" + auth?.userId,
                {
                    withCredentials: true,
                }
                ).then(res=>console.log(res));
                return;
            }
            const response = await axiosprivate.get(
                "/api/payments/getCart/" + auth?.userId,
                {
                    withCredentials: true,
                }
            );
            setCartItems(response.data.cartItems);
        }
        handleFetch();
    }, []);
    
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