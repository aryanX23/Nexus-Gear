import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/NexusGear-Black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Cart from "../Cart/Cart";
import "./navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const authenticated = localStorage.getItem("authenticated");

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLoginClick = () => navigate("/login");
    const handleRegisterClick = () => navigate("/register");
    const handleLogOutClick = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <nav className="sticky top-0 z-50 bg-opacity-70 bg-white backdrop-filter backdrop-blur-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <img src={Logo} alt="NexusGear Logo" className="h-10 w-auto" />
                    </Link>

                    <div className="hidden md:flex items-center space-x-4">
                        {authenticated ? (
                            <button onClick={handleLogOutClick} className="nav-button">
                                Logout
                            </button>
                        ) : (
                            <>
                                <button onClick={handleLoginClick} className="nav-button">
                                    Login
                                </button>
                                <button onClick={handleRegisterClick} className="nav-button bg-blue-500 text-white">
                                    Register
                                </button>
                            </>
                        )}
                        <button onClick={toggleCart} className="nav-icon" aria-label="Cart">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className="p-2" aria-label="Menu">
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg px-4 py-2 shadow-md">
                    <div className="flex flex-col space-y-4">
                        {authenticated ? (
                            <button onClick={handleLogOutClick} className="nav-button w-full">
                                Logout
                            </button>
                        ) : (
                            <>
                                <button onClick={handleLoginClick} className="nav-button w-full">
                                    Login
                                </button>
                                <button onClick={handleRegisterClick} className="nav-button w-full bg-blue-500 text-white">
                                    Register
                                </button>
                            </>
                        )}
                        <button onClick={toggleCart} className="nav-button w-full flex items-center justify-center" aria-label="Cart">
                            <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                            Cart
                        </button>
                    </div>
                </div>
            )}

            {/* Cart Sidebar */}
            <div className={`h-full w-80 bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
                <Cart setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
            </div>
        </nav>
    );
};

export default Navbar;