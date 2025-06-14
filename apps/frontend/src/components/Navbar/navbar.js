import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../Assets/NexusGear-Black.png';
import Cart from '../Cart/Cart';
import './navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const authenticated = localStorage.getItem('authenticated');

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLoginClick = () => navigate('/login');
    const handleRegisterClick = () => navigate('/register');
    const handleLogOutClick = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <img src={Logo} alt="NexusGear Logo" className="h-10 w-auto" />
                        </Link>

                        <div className="hidden md:flex items-center space-x-4">
                            {authenticated ? (
                                <button
                                    onClick={handleLogOutClick}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleLoginClick}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={handleRegisterClick}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                            <button
                                onClick={toggleCart}
                                className="p-2 text-gray-700 hover:text-gray-900"
                                aria-label="Cart"
                            >
                                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                            </button>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleCart}
                                className="p-2 text-gray-700 hover:text-gray-900"
                                aria-label="Cart"
                            >
                                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                            </button>
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 text-gray-700 hover:text-gray-900 ml-2"
                                aria-label="Menu"
                            >
                                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white/80 backdrop-blur-md">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {authenticated ? (
                                <button
                                    onClick={handleLogOutClick}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleLoginClick}
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={handleRegisterClick}
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Cart Sidebar */}
            <div
                className={`nav-button w-full flex items-center justify-center`}
            >
                <Cart setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
            </div>
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={toggleCart}
                ></div>
            )}
        </>
    );
};

export default Navbar;