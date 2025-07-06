// done

import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="CUET Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold text-blue-800 leading-tight">
            CUET Trade &<br className="hidden md:inline" /> Lost-Found Portal
          </span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          <Link to="/new-products" className="hover:text-blue-600 transition">
            New Arrivals
          </Link>
          <Link to="/bidding" className="hover:text-blue-600 transition">
            Pre-Owned
          </Link>
          <Link to="/lost-found" className="hover:text-blue-600 transition">
            Lost & Found
          </Link>
          <Link to="/sell" className="hover:text-green-600 transition">
            Become a Seller
          </Link>
          <Link to="/cart" className="hover:text-yellow-600 transition">
            Cart
          </Link>
          <Link to="/login" className="hover:text-blue-600 transition">
            Login
          </Link>
          <Link
            to="/signup"
            className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow transition"
          >
            Sign Up
          </Link>
        </nav>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 pt-2 space-y-2 shadow">
          <Link
            to="/new-products"
            className="block text-gray-700 hover:text-blue-600"
          >
            New Arrivals
          </Link>
          <Link
            to="/bidding"
            className="block text-gray-700 hover:text-blue-600"
          >
            Pre-Owned
          </Link>
          <Link
            to="/lost-found"
            className="block text-gray-700 hover:text-blue-600"
          >
            Lost & Found
          </Link>
          <Link to="/sell" className="block text-gray-700 hover:text-green-600">
            Become a Seller
          </Link>
          <Link
            to="/cart"
            className="block text-gray-700 hover:text-yellow-600"
          >
            Cart
          </Link>
          <Link to="/login" className="block text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link
            to="/signup"
            className="block text-center mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
