// import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
// import {
//   FiShoppingCart,
//   FiUser,
//   FiArchive,
//   FiHeart,
//   FiChevronDown,
//   FiChevronUp,
// } from "react-icons/fi";

// const navLinks = [
//   { to: "/", text: "Home" },
//   { to: "/new-arrivals", text: "New Arrivals" },
//   { to: "/pre-owned-products", text: "Pre-Owned" },
//   { to: "/lost-found-products", text: "Lost & Found" },
// ];

// const dropdownLinks = [
//   { to: "/profile", text: "My Profile", icon: <FiUser className="mr-3" /> },
//   { to: "/orders", text: "Orders", icon: <FiArchive className="mr-3" /> },
//   { to: "/wishlist", text: "Wishlist", icon: <FiHeart className="mr-3" /> },
// ];

// const Navbar = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   React.useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     }
//     if (showDropdown) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showDropdown]);

//   // Keyboard accessibility for dropdown
//   function handleDropdownKey(e) {
//     if (e.key === "Escape") setShowDropdown(false);
//     if (e.key === "Enter" || e.key === " ") setShowDropdown((s) => !s);
//   }

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo and name */}
//           <Link
//             to="/"
//             className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
//             aria-label="CUET Trade & Lost-Found Portal Home"
//           >
//             <div className="bg-blue-50 rounded-full p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
//               <img
//                 src={logo}
//                 alt="CUET Logo"
//                 className="h-12 w-12 object-contain"
//               />
//             </div>
//             <span className="flex flex-col leading-tight">
//               <span className="text-xl md:text-2xl font-extrabold font-serif text-blue-700 group-hover:text-blue-800 transition-colors">
//                 CUET Trade
//               </span>
//               <span className="text-sm md:text-base font-semibold text-gray-700 tracking-tight">
//                 & Lost-Found Portal
//               </span>
//             </span>
//           </Link>

//           {/* Main Navigation */}
//           <nav className="hidden lg:flex items-center space-x-6">
//             {navLinks.map((link) => (
//               <NavLink key={link.to} to={link.to} text={link.text} />
//             ))}
//           </nav>

//           {/* Right side actions */}
//           <div className="flex items-center space-x-6">
//             <ActionLink
//               to="/become-seller"
//               icon={<FiArchive className="mr-2" />}
//               text="Become Seller"
//               className="hidden md:flex"
//             />
//             <ActionLink
//               to="/cart"
//               icon={<FiShoppingCart className="mr-2" />}
//               text="Cart"
//               className="hidden md:flex"
//             />

//             {/* Sign In Dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 type="button"
//                 aria-haspopup="true"
//                 aria-expanded={showDropdown}
//                 tabIndex={0}
//                 onClick={() => setShowDropdown((s) => !s)}
//                 onKeyDown={handleDropdownKey}
//                 onMouseEnter={() => setShowDropdown(true)}
//                 className="flex items-center text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
//               >
//                 <FiUser className="mr-2 text-xl" />
//                 <span className="hidden md:inline">Sign In</span>
//                 {showDropdown ? (
//                   <FiChevronUp className="ml-1 transition-transform duration-200" />
//                 ) : (
//                   <FiChevronDown className="ml-1 transition-transform duration-200" />
//                 )}
//               </button>

//               {/* Dropdown Menu */}
//               {showDropdown && (
//                 <div
//                   className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 transition-all duration-200 origin-top-right z-50 animate-fade-in"
//                   onMouseLeave={() => setShowDropdown(false)}
//                 >
//                   <div className="px-4 py-3 flex justify-between items-center">
//                     <p className="text-sm text-gray-500">New customer?</p>
//                     <Link
//                       to="/signup"
//                       className="text-sm font-medium text-blue-600 hover:text-blue-500"
//                       tabIndex={0}
//                     >
//                       Sign up
//                     </Link>
//                   </div>
//                   <div className="py-1">
//                     {dropdownLinks.map((link) => (
//                       <DropdownLink key={link.to} {...link} />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// // Reusable NavLink
// function NavLink({ to, text }) {
//   return (
//     <Link
//       to={to}
//       className="relative py-3 px-1 text-gray-700 hover:text-blue-600 font-medium text-base uppercase tracking-wider transition-colors duration-300
//         after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300
//         hover:after:w-full"
//     >
//       {text}
//     </Link>
//   );
// }

// // Reusable ActionLink (for seller/cart)
// function ActionLink({ to, icon, text, className = "" }) {
//   return (
//     <Link
//       to={to}
//       className={`${className} items-center text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-300`}
//     >
//       {icon}
//       <span className="hidden lg:inline">{text}</span>
//     </Link>
//   );
// }

// // Reusable DropdownLink
// function DropdownLink({ to, text, icon }) {
//   return (
//     <Link
//       to={to}
//       className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
//     >
//       {icon}
//       {text}
//     </Link>
//   );
// }

// export default Navbar;

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FiShoppingCart,
  FiUser,
  FiArchive,
  FiHeart,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/new-arrivals", text: "New Arrivals" },
  { to: "/pre-owned-products", text: "Pre-Owned" },
  { to: "/lost-found-products", text: "Lost & Found" },
];

const dropdownLinks = [
  { to: "/profile", text: "My Profile", icon: <FiUser className="mr-3" /> },
  { to: "/orders", text: "Orders", icon: <FiArchive className="mr-3" /> },
  { to: "/wishlist", text: "Wishlist", icon: <FiHeart className="mr-3" /> },
];

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  // Keyboard accessibility for dropdown
  function handleDropdownKey(e) {
    if (e.key === "Escape") setShowDropdown(false);
    if (e.key === "Enter" || e.key === " ") setShowDropdown((s) => !s);
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and name */}
          <Link
            to="/"
            className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            aria-label="CUET Trade & Lost-Found Portal Home"
          >
            <div className="relative h-14 w-14 flex items-center justify-center bg-blue-50 rounded-full p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 border-2 border-blue-700 rounded-full opacity-30"></div>
              <img
                src={logo}
                alt="CUET Logo"
                className="h-12 w-12 object-contain"
              />
            </div>

            <span className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-extrabold font-serif text-blue-700 group-hover:text-blue-800 transition-colors">
                CUET Trade
              </span>
              <span className="text-sm md:text-base font-semibold text-gray-700 tracking-tight">
                & Lost-Found Portal
              </span>
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} text={link.text} />
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-6">
            <ActionLink
              to="/become-seller"
              icon={<FiArchive className="mr-2" />}
              text="Become Seller"
              className="hidden md:flex"
            />
            <ActionLink
              to="/cart"
              icon={<FiShoppingCart className="mr-2" />}
              text="Cart"
              className="hidden md:flex"
            />

            {/* Sign In Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={showDropdown}
                tabIndex={0}
                onClick={() => setShowDropdown((s) => !s)}
                onKeyDown={handleDropdownKey}
                onMouseEnter={() => setShowDropdown(true)}
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                <FiUser className="mr-2 text-xl" />
                <span className="hidden md:inline">Sign In</span>
                {showDropdown ? (
                  <FiChevronUp className="ml-1 transition-transform duration-200" />
                ) : (
                  <FiChevronDown className="ml-1 transition-transform duration-200" />
                )}
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 transition-all duration-200 origin-top-right z-50 animate-fade-in"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="px-4 py-3 flex justify-between items-center">
                    <p className="text-sm text-gray-500">New customer?</p>
                    <Link
                      to="/signup"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      tabIndex={0}
                    >
                      Sign up
                    </Link>
                  </div>
                  <div className="py-1">
                    {dropdownLinks.map((link) => (
                      <DropdownLink key={link.to} {...link} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Reusable NavLink
function NavLink({ to, text }) {
  return (
    <Link
      to={to}
      className="relative py-3 px-1 text-gray-700 hover:text-blue-600 font-medium text-base uppercase tracking-wider transition-colors duration-300
        after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300
        hover:after:w-full"
    >
      {text}
    </Link>
  );
}

// Reusable ActionLink (for seller/cart)
function ActionLink({ to, icon, text, className = "" }) {
  return (
    <Link
      to={to}
      className={`${className} items-center text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-300`}
    >
      {icon}
      <span className="hidden lg:inline">{text}</span>
    </Link>
  );
}

// Reusable DropdownLink
function DropdownLink({ to, text, icon }) {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
    >
      {icon}
      {text}
    </Link>
  );
}

export default Navbar;
