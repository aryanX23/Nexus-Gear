import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faDiscord, faTwitter, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// Add these two lines to import the toast function and its CSS
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../../Assets/NexusGear-Black.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle your newsletter submission logic here
    console.log("Subscribed with:", email);
    // This line will now work correctly
    toast.success(`Thank you for subscribing!`);
    setEmail('');
  };

  const footerLinks = {
    products: [
      { name: "Keyboards", href: "#" },
      { name: "Mice", href: "#" },
      { name: "Headsets", href: "#" },
      { name: "Monitors", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Shipping", href: "#" },
      { name: "Returns", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { href: "#", icon: faFacebook, label: "Facebook" },
    { href: "#", icon: faInstagram, label: "Instagram" },
    { href: "#", icon: faTwitter, label: "Twitter" },
    { href: "https://github.com/aryanX23", icon: faGithub, label: "GitHub" },
    { href: "#", icon: faDiscord, label: "Discord" },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Newsletter and Info */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center mb-4">
              <img src={Logo} className="h-10 w-auto" alt="NexusGear Logo" />
              <span className="ml-3 text-2xl font-bold text-slate-900">NexusGear</span>
            </div>
            <p className="text-slate-600 max-w-md">
              The ultimate destination for premium gaming gear. Elevate your play with our high-performance hardware.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-8">
            <h3 className="text-lg font-semibold text-slate-900">Subscribe to our newsletter</h3>
            <p className="mt-2 text-slate-600">Get the latest updates on new products and upcoming sales.</p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Middle Section: Link Columns */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Products</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.products.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-base text-slate-600 hover:text-blue-600 transition">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-base text-slate-600 hover:text-blue-600 transition">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-base text-slate-600 hover:text-blue-600 transition">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-base text-slate-600 hover:text-blue-600 transition">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="py-8 flex flex-col-reverse md:flex-row items-center justify-between border-t border-slate-200">
          <p className="text-sm text-slate-500 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} NexusGear, Inc. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-5">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-500 hover:text-blue-600 transition"
                aria-label={link.label}
              >
                <FontAwesomeIcon icon={link.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;