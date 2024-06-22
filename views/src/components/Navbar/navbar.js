import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Searchbar from "./Searchbar";
import Cart from "../Cart/Cart";

import Logo from "../../Assets/NexusGear-Black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const [searchVisible, setSearchVisible] = useState(false);
    const authenticated = localStorage.getItem("authenticated");

    const toggleSearchBar = () => {
        setSearchVisible(!searchVisible);
    };

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogOutClick = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleToggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="p-2 sticky backdrop-filter backdrop-blur-lg top-0 z-50 shadow-md">
            <ToastContainer />
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-blue-800 text-xl mx-4">
                        <img src={Logo} alt="Logo" className="logo-image" />
                    </Link>
                    <div className="hidden lg:flex space-x-20 mx-auto">
                        <ul className="flex space-x-8">
                            <li>
                                <a
                                    href="#hero"
                                    className="text-black-200 font-bold hover:text-purple-400"
                                >
                                    HOME
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#footer"
                                    className="text-black-200 font-bold hover:text-purple-400"
                                >
                                    ABOUT
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#categories"
                                    className="text-black-200 font-bold hover:text-purple-400"
                                >
                                    CATEGORIES
                                </a>
                            </li>
                        </ul>
                        <button onClick={toggleSearchBar}>
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="text-black-100"
                                color="black"
                            />
                        </button>
                        {searchVisible && (
                            <div className="absolute top-0 right-0 mt-5 mr-64">
                                <Searchbar />
                            </div>
                        )}
                    </div>
                    <div className="flex lg:hidden">
                        <button onClick={handleToggleMobileMenu} className="p-2">
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-black-100" />
                        </button>
                    </div>
                    <div className="hidden lg:flex mr-10 items-center space-x-4">
                        {authenticated ? (
                            <button
                                onClick={handleLogOutClick}
                                className="text-black-200 font-bold hover:text-blue-400"
                            >
                                LOGOUT
                            </button>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="text-black-200 font-bold hover:text-blue-400"
                            >
                                LOGIN
                            </button>
                        )}
                        <button onClick={toggleCart}>
                            <FontAwesomeIcon icon={faCartShopping} color="black" />
                        </button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white w-full px-4 py-2 absolute top-14 left-0 shadow-md transition-all duration-300 transform ease-in-out">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <a
                                href="#hero"
                                className="text-black-200 font-bold hover:text-purple-400"
                                onClick={handleToggleMobileMenu}
                            >
                                HOME
                            </a>
                        </li>
                        <li>
                            <a
                                href="#footer"
                                className="text-black-200 font-bold hover:text-purple-400"
                                onClick={handleToggleMobileMenu}
                            >
                                ABOUT
                            </a>
                        </li>
                        <li>
                            <a
                                href="#categories"
                                className="text-black-200 font-bold hover:text-purple-400"
                                onClick={handleToggleMobileMenu}
                            >
                                CATEGORIES
                            </a>
                        </li>
                        <li>
                            {authenticated ? (
                                <button
                                    onClick={() => {
                                        handleLogOutClick();
                                        handleToggleMobileMenu();
                                    }}
                                    className="text-black-200 font-bold hover:text-blue-400"
                                >
                                    LOGOUT
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleLoginClick();
                                        handleToggleMobileMenu();
                                    }}
                                    className="text-black-200 font-bold hover:text-blue-400"
                                >
                                    LOGIN
                                </button>
                            )}
                        </li>
                        <li>
                            <button onClick={toggleCart}>
                                <FontAwesomeIcon icon={faCartShopping} color="black" />
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            <div className={` shadow-lg transform transition-transform ease-in-out duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
                <Cart setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
            </div>
        </nav>
    );
};

export default Navbar;
