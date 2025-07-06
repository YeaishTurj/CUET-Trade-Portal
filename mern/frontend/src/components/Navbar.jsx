import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiShoppingCart, FiUser, FiArchive } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="bg-gray-50 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-0 space-x-8 text-black font-semibold text-lg">
        {/* Logo and name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="CUET Logo" className="h-16 w-auto" />
          <span className="text-2xl font-bold text-blue-700">
            CUET Trade & <br /> Lost-Found Portal
          </span>
        </div>
        <Link
          to="/"
          className="transition-transform transition-colors duration-300 hover:scale-105 hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          to="/new-arrivals"
          className="transition-transform transition-colors duration-300 hover:scale-105 hover:text-blue-600"
        >
          New Arrivals
        </Link>
        <Link
          to="/pre-owned-products"
          className="transition-transform transition-colors duration-300 hover:scale-105 hover:text-blue-600"
        >
          Pre-Owned Products
        </Link>
        <Link
          to="/lost-found-products"
          className="transition-transform transition-colors duration-300 hover:scale-105 hover:text-blue-600"
        >
          Lost & Found
        </Link>
        <Link
          to="/become-seller"
          className="flex items-center justify-center transition-transform transition-colors duration-300 hover:scale-105 hover:text-blue-600"
        >
          <FiArchive className="mr-1" />
          Become a Seller
        </Link>
        <Link
          to="/cart"
          className="flex items-center justify-center transition-transform transition-colors duration-300 hover:scale-105 hover:text-blue-600"
        >
          <FiShoppingCart className="mr-1" /> Cart
        </Link>
        <Link
          to="/signin"
          className="flex items-center justify-center transition-transform transition-colors duration-300 hover:scale-105 hover:text-blue-600"
        >
          <FiUser className="mr-1" />
          Sign In
        </Link>
        <Link
          to="/signup"
          className="bg-orange-500 text-white px-5 py-2 rounded-full font-bold hover:bg-orange-600 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
