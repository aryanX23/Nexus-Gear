import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faDiscord, faTwitter, faGithub, faDribbble } from '@fortawesome/free-brands-svg-icons';
import Logo from '../../Assets/NexusGear-Black.png';
import Newsletter from '../NewsLetter/Newsletter';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Newsletter Section */}
        <section className="mb-8">
          <Newsletter
            title="Subscribe to our newsletter"
            subtitle="Get updates on new products, offers, and more."
            buttonText="Subscribe"
            placeholder="Enter your email"
            buttonColor="bg-primary-600 hover:bg-primary-700"
            inputBgColor="bg-gray-100 dark:bg-gray-700"
            inputTextColor="text-gray-900 dark:text-white"
          />
        </section>

        {/* Main Footer Content */}
        <div className="md:flex md:justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src={Logo} className="h-16 mr-3" alt="NexusGear Logo" />
            </a>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-300 uppercase mb-3">Resources</h2>
              <ul className="text-gray-500 dark:text-gray-400">
                <li>
                  <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">NexusGear</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-300 uppercase mb-3">Follow us</h2>
              <ul className="text-gray-500 dark:text-gray-400">
                <li>
                  <a href="https://github.com/aryanX23" className="hover:text-primary-600 dark:hover:text-primary-400">Github</a>
                </li>
                <li>
                  <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-300 uppercase mb-3">Legal</h2>
              <ul className="text-gray-500 dark:text-gray-400">
                <li>
                  <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</a>
                </li>
                <li>
                  <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="my-6 border-gray-200 dark:border-gray-600" />

        {/* Copyright and Social Links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">&copy; 2023 NexusGear™. All Rights Reserved.</span>
          <div className="flex mt-4 md:mt-0 space-x-4">
            <a href="/" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
              <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="/" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
              <FontAwesomeIcon icon={faDiscord} className="w-4 h-4" />
              <span className="sr-only">Discord community</span>
            </a>
            <a href="/" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
              <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="https://github.com/aryanX23" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="/" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
              <FontAwesomeIcon icon={faDribbble} className="w-4 h-4" />
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
