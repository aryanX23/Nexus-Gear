import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Assets/NexusGear.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import Searchbar from './Searchbar';
import Cart from '../Cart/Cart'

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLoginClick = () => {
    setIsLoggedIn(true);
    navigate('/login');
  };

  return (
    <nav className="p-1 ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Make the logo a link to the homepage */}
          <Link to="/" className="text-blue-800 text-xl mx-4">
            <img src={Logo} alt="Logo" className="logo-image" />
          </Link>
          <ul className="flex space-x-20 mx-auto">
            <li>
              <Link to="/" className="text-gray-600 font-bold hover:text-blue-400">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 font-bold hover:text-blue-400">
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-gray-600 font-bold hover:text-blue-400">
                CATEGORIES
              </Link>
            </li>
          </ul>
          <div className="mx-auto">
            <button onClick={toggleSearchBar}>
              <FontAwesomeIcon icon={faSearch} className="text-blue-700" />
            </button>
            {/* Replace the existing search input with the SearchBar component */}
            {searchVisible && (
              <div className="absolute top-0 right-0 mt-5 mr-64">
                <Searchbar />
              </div>
            )}
          </div>
          <div className='mr-10'>
            {isLoggedIn ? (
              <button className="mr-20">
                <FontAwesomeIcon icon={faUserCircle} />
              </button>
            ) : (
              <button onClick={handleLoginClick} className="text-gray-600 font-bold hover:text-blue-400 mr-20">
                LOGIN
              </button>
            )}
            <button onClick={toggleCart}>
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 w-64shadow-lg transform transition-transform ease-in-out duration-300">
          <Cart />
        </div>
      )}
    </nav>

  );
};

export default Navbar;
