// import React, { useState, useEffect, useRef } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import companyThemes from "../config/companyThemes.json";

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isScrolled, setIsScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 50);
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const location = useLocation();

//     const toggleMenu = () => setIsOpen(!isOpen);
//     const closeMenu = () => setIsOpen(false);

//     // Close menu on scroll
//     useEffect(() => {
//         const handleScroll = () => {
//             if (isOpen) {
//                 closeMenu();
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [isOpen]);

//     // Close menu on route change
//     useEffect(() => {
//         closeMenu();
//     }, [location.pathname]);

//     const navLinks = [
//         { path: "/", label: "Home" },
//         { path: "/about", label: "About" },
//         { path: "/contact", label: "Contact" },
//     ];

//     const isActive = (path) => location.pathname === path;

//     return (
//         <header
//             className={`w-full fixed top-0 left-0 z-50 ${companyThemes?.suryadoot?.theme?.text} shadow-lg ${companyThemes?.suryadoot?.theme?.navbarbgcolor} backdrop-blur-sm `}
//         >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
//                 {/* Logo */}
//                 {/* <Link to="/" className="flex-shrink-0 items-center">
//                     <img
//                         src={companyThemes?.suryadoot?.logo}
//                         alt=""
//                         className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full"
//                     />
//                 </Link> */}

//                 <Link
//                     to="/"
//                     className={`flex-shrink-0 items-center transition-all duration-300 ${
//                         isScrolled
//                             ? "opacity-0 scale-90 pointer-events-none"
//                             : "opacity-100 scale-100"
//                     }`}
//                 >
//                     <img
//                         src={companyThemes?.suryadoot?.logo}
//                         alt="Company Logo"
//                         className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full"
//                     />
//                 </Link>

//                 <nav className="hidden md:flex items-center space-x-8">
//                     {navLinks.map((link) => (
//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className={`relative text-lg font-medium transition-all duration-300 group ${
//                                 isActive(link.path)
//                                     ? `${companyThemes?.suryadoot?.theme?.primary} font-semibold`
//                                     : `${companyThemes?.suryadoot?.theme?.text} hover:${companyThemes?.suryadoot?.theme?.primary}`
//                             }`}
//                         >
//                             {link.label}
//                             {/* Underline Effect */}
//                             <span
//                                 className={`absolute left-0 bottom-[-4px] h-0.5 bg-gradient-to-r from-orange-500 to-yellow-600 transition-all duration-300 ${
//                                     isActive(link.path)
//                                         ? "w-full"
//                                         : "w-0 group-hover:w-full"
//                                 }`}
//                             />
//                         </Link>
//                     ))}
//                 </nav>

//                 <a
//                     href="https://gautamsolar.com/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-shrink-0 items-center"
//                 >
//                     <img
//                         src="/gautamLogo.png"
//                         className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full"
//                     />
//                 </a>

//                 {/* Desktop Navigation */}

//                 {/* Mobile Menu Button */}
//                 <button
//                     onClick={toggleMenu}
//                     className={`md:hidden ${companyThemes?.suryadoot?.theme?.text} hover:${companyThemes?.suryadoot?.theme?.primary} transition-all duration-200 active:scale-90 p-2`}
//                     aria-label="Toggle menu"
//                 >
//                     {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//                 </button>
//             </div>

//             {/* Backdrop Overlay - covers entire screen */}
//             <div
//                 className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden z-50 ${
//                     isOpen
//                         ? "opacity-50 pointer-events-auto"
//                         : "opacity-0 pointer-events-none"
//                 }`}
//                 onClick={closeMenu}
//             />

//             {/* Mobile Slide-In Drawer */}
//             <aside
//                 className={`fixed top-0 right-0 w-3/4 max-w-xs h-full bg-gradient-to-b from-orange-50 to-yellow-50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden z-50 ${
//                     isOpen ? "translate-x-0" : "translate-x-full"
//                 }`}
//             >
//                 {/* Drawer Header */}
//                 <div className="flex items-center justify-between p-5 border-b border-orange-200">
//                     <h2
//                         className={`text-xl font-bold ${companyThemes?.suryadoot?.theme?.gradientText}`}
//                     >
//                         Menu
//                     </h2>
//                     <button
//                         onClick={closeMenu}
//                         className={`${companyThemes?.suryadoot?.theme?.navbarcloseicon} hover:${companyThemes?.suryadoot?.theme?.primary} transition-all duration-200 active:scale-90 p-2`}
//                         aria-label="Close menu"
//                     >
//                         <FaTimes size={24} />
//                     </button>
//                 </div>

//                 {/* Mobile Navigation Links and Logo Container */}
//                 <div
//                     className={`flex flex-col h-screen ${companyThemes?.suryadoot?.theme?.navmenubgcolor} backdrop-blur-sm`}
//                 >
//                     {/* Scrollable Navigation */}
//                     <nav className="flex flex-col mt-4 px-3 space-y-1 flex-1 overflow-y-auto">
//                         {navLinks.map((link, index) => (
//                             <Link
//                                 key={link.path}
//                                 to={link.path}
//                                 onClick={closeMenu}
//                                 style={{ transitionDelay: `${index * 50}ms` }}
//                                 className={`px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
//                                     isActive(link.path)
//                                         ? `${companyThemes?.suryadoot?.theme?.primary} bg-black border-l-4 border-orange-500 shadow-sm`
//                                         : `${companyThemes?.suryadoot?.theme?.menutextcolor} hover:bg-white/50 hover:${companyThemes?.suryadoot?.theme?.primary}`
//                                 } ${
//                                     isOpen
//                                         ? "opacity-100 translate-x-0"
//                                         : "opacity-0 translate-x-10"
//                                 }`}
//                             >
//                                 {link.label}
//                             </Link>
//                         ))}
//                     </nav>

//                     {/* Fixed Bottom Logo */}
//                     <div className="px-5 pb-50 shrink-0">
//                         <div className="border-t border-orange-200 pt-6">
//                             <a
//                                 href="https://gautamsolar.com/"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex justify-center hover:opacity-80 transition-opacity"
//                                 onClick={closeMenu}
//                             >
//                                 <img
//                                     src="/gautamLogo.png"
//                                     alt="Gautam Solar"
//                                     className="w-32 object-contain"
//                                 />
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </aside>
//         </header>
//     );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import {
//     FaBars,
//     FaTimes,
//     FaChevronDown,
//     FaHome,
//     FaInfoCircle,
//     FaEnvelope,
// } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import companyThemes from "../config/companyThemes.json";

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isHoveringLogo, setIsHoveringLogo] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 30);
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const location = useLocation();

//     const toggleMenu = () => setIsOpen(!isOpen);
//     const closeMenu = () => setIsOpen(false);

//     // Close menu on scroll
//     useEffect(() => {
//         const handleScroll = () => {
//             if (isOpen) {
//                 closeMenu();
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [isOpen]);

//     // Close menu on route change
//     useEffect(() => {
//         closeMenu();
//     }, [location.pathname]);

//     const navLinks = [
//         { path: "/", label: "Home", icon: <FaHome className="mr-2" /> },
//         {
//             path: "/about",
//             label: "About",
//             icon: <FaInfoCircle className="mr-2" />,
//         },
//         {
//             path: "/contact",
//             label: "Contact",
//             icon: <FaEnvelope className="mr-2" />,
//         },
//     ];

//     const isActive = (path) => location.pathname === path;

//     return (
//         <header
//             className={`w-full fixed top-0 left-0 z-50 ${companyThemes?.suryadoot?.theme?.text} shadow-lg ${companyThemes?.suryadoot?.theme?.navbarbgcolor} backdrop-blur-sm `}
//         >
//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
//                 {/* Company Logo with glow effect - disappears when scrolled */}
//                 <Link
//                     to="/"
//                     className={`hidden md:flex flex-shrink-0 items-center transition-all duration-700 transform ${
//                         isScrolled
//                             ? "opacity-0 -translate-x-10 pointer-events-none"
//                             : "opacity-100 translate-x-0 hover:scale-105"
//                     }`}
//                     onMouseEnter={() => setIsHoveringLogo(true)}
//                     onMouseLeave={() => setIsHoveringLogo(false)}
//                 >
//                     <div className="relative">
//                         <div
//                             className={`absolute inset-0 rounded-full blur-lg transition-all duration-500 ${
//                                 isHoveringLogo
//                                     ? "opacity-70 scale-110"
//                                     : "opacity-0 scale-100"
//                             }`}
//                             style={{
//                                 background: `radial-gradient(circle, ${companyThemes?.suryadoot?.theme?.primary} 0%, transparent 70%)`,
//                             }}
//                         />
//                         <img
//                             src={companyThemes?.suryadoot?.logo}
//                             alt="Company Logo"
//                             className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full border-2 border-white/20 shadow-lg z-10"
//                         />
//                     </div>
//                 </Link>

//                 {/* Desktop Navigation with animated underline - Centered */}
//                 <nav className="hidden md:flex items-center space-x-1 mx-auto">
//                     {navLinks.map((link) => (
//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className={`relative px-6 py-3 text-lg font-medium transition-all duration-300 group ${
//                                 isActive(link.path)
//                                     ? `${companyThemes?.suryadoot?.theme?.primary} font-semibold`
//                                     : `${companyThemes?.suryadoot?.theme?.text} hover:text-sky-700`
//                             }`}
//                         >
//                             <div className="flex items-center">
//                                 {link.icon}
//                                 {link.label}
//                             </div>

//                             {/* Animated underline effect */}
//                             <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:w-full group-hover:left-0 transition-all duration-500" />
//                             {isActive(link.path) && (
//                                 <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-600" />
//                             )}

//                             {/* Hover background effect */}
//                             <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
//                         </Link>
//                     ))}
//                 </nav>

//                 {/* Gautam Logo with floating animation - positioned properly */}
//                 <div
//                     className={`flex-shrink-0   transition-all duration-700 ${
//                         isScrolled
//                             ? " left-6 md:left-8 transform hover:scale-110 z-20"
//                             : "transform hover:scale-105"
//                     }`}
//                 >
//                     <a
//                         href="https://gautamsolar.com/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="group"
//                     >
//                         <div className="relative">
//                             <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200" />
//                             <img
//                                 src="/gautamLogo.png"
//                                 alt="Gautam Solar"
//                                 className={`relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full border-2 border-white/20 shadow-lg z-10 transition-all duration-500 ${
//                                     isScrolled ? "scale-100" : ""
//                                 }`}
//                             />

//                             <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
//                                 Visit Gautam Solar
//                                 <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-black/90 rotate-45" />
//                             </div>
//                         </div>
//                     </a>
//                 </div>

//                 <button
//                     onClick={toggleMenu}
//                     className={`md:hidden relative ${companyThemes?.suryadoot?.theme?.text} hover:text-orange-400 transition-all duration-200 active:scale-90 p-2 z-50`}
//                     aria-label="Toggle menu"
//                 >
//                     <div className="relative w-8 h-8">
//                         <div
//                             className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-300 ${
//                                 isOpen ? "rotate-180" : ""
//                             }`}
//                         >
//                             <div
//                                 className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
//                                     isOpen
//                                         ? "rotate-45 translate-y-0"
//                                         : "-translate-y-2"
//                                 }`}
//                             />
//                             <div
//                                 className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 mt-1 ${
//                                     isOpen ? "opacity-0" : "opacity-100"
//                                 }`}
//                             />
//                             <div
//                                 className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 mt-1 ${
//                                     isOpen
//                                         ? "-rotate-45 -translate-y-1"
//                                         : "translate-y-2"
//                                 }`}
//                             />
//                         </div>
//                     </div>

//                     {!isOpen && (
//                         <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping opacity-0" />
//                     )}
//                 </button>
//             </div>

//             {/* Backdrop Overlay with blur */}
//             <div
//                 className={`fixed inset-0 transition-all duration-500 md:hidden z-40 ${
//                     isOpen
//                         ? "bg-black/60 backdrop-blur-sm pointer-events-auto"
//                         : "bg-transparent pointer-events-none"
//                 }`}
//                 onClick={closeMenu}
//             />

//             {/* Enhanced Mobile Drawer with 3D effect */}
//             <aside
//                 className={`fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl transform transition-all duration-500 ease-out md:hidden z-50 ${
//                     isOpen
//                         ? "translate-x-0 opacity-100"
//                         : "translate-x-full opacity-0"
//                 }`}
//                 style={{
//                     boxShadow: isOpen
//                         ? "0 0 40px rgba(251, 146, 60, 0.3)"
//                         : "none",
//                 }}
//             >
//                 {/* Drawer Header with gradient */}
//                 <div className="relative p-6 border-b border-gray-700 bg-gradient-to-r from-orange-900/20 to-yellow-900/20 bg-black">
//                     <div className="absolute inset-0 bg-black" />
//                     <div className="relative flex items-center justify-between">
//                         <div>
//                             <h2
//                                 className={`text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent`}
//                             >
//                                 Navigation
//                             </h2>
//                             <p className="text-gray-400 text-sm mt-1">
//                                 Explore our site
//                             </p>
//                         </div>
//                         <button
//                             onClick={closeMenu}
//                             className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:rotate-90 active:scale-90"
//                             aria-label="Close menu"
//                         >
//                             <FaTimes className="text-orange-400 text-xl" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Navigation Links with enhanced effects - REMOVED SCROLL */}
//                 <div className="h-full flex flex-col bg-black">
//                     <nav className="flex flex-col p-4 bg-black space-y-2 flex-1">
//                         {navLinks.map((link, index) => (
//                             <Link
//                                 key={link.path}
//                                 to={link.path}
//                                 onClick={closeMenu}
//                                 className={`relative px-4 py-4 rounded-xl text-lg font-semibold transition-all duration-300 group overflow-hidden ${
//                                     isActive(link.path)
//                                         ? "bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border-l-4 border-orange-500 text-white shadow-lg"
//                                         : "text-gray-300 hover:text-white hover:bg-white/5"
//                                 } ${
//                                     isOpen
//                                         ? "translate-x-0 opacity-100"
//                                         : "translate-x-10 opacity-0"
//                                 }`}
//                                 style={{
//                                     transitionDelay: `${index * 100}ms`,
//                                     animation: isOpen
//                                         ? `slideInRight 0.5s ease ${index * 0.1}s both`
//                                         : "none",
//                                 }}
//                             >
//                                 {/* Background hover effect */}
//                                 <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

//                                 <div className="relative flex items-center">
//                                     <div
//                                         className={`mr-3 transition-transform duration-300 group-hover:scale-110 ${
//                                             isActive(link.path)
//                                                 ? "text-orange-400"
//                                                 : "text-gray-400"
//                                         }`}
//                                     >
//                                         {link.icon}
//                                     </div>
//                                     <span>{link.label}</span>
//                                     <FaChevronDown
//                                         className={`ml-auto transform -rotate-90 text-gray-400 transition-all duration-300 group-hover:translate-x-1 ${
//                                             isActive(link.path)
//                                                 ? "text-orange-400"
//                                                 : ""
//                                         }`}
//                                     />
//                                 </div>

//                                 {/* Active indicator */}
//                                 {isActive(link.path) && (
//                                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
//                                 )}
//                             </Link>
//                         ))}
//                     </nav>

//                     {/* Enhanced Bottom Section */}
//                     <div className="p-6 border-t border-gray-700 bg-black">
//                         {/* Partner Logo */}
//                         <div className="mb-4">
//                             <p className="text-gray-400 text-sm mb-3 text-center">
//                                 Our Partner
//                             </p>
//                             <a
//                                 href="https://gautamsolar.com/"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex flex-col items-center group"
//                                 onClick={closeMenu}
//                             >
//                                 <div className="relative p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300 group-hover:scale-105">
//                                     <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                     <img
//                                         src="/gautamLogo.png"
//                                         alt="Gautam Solar"
//                                         className="relative w-40 object-contain z-10"
//                                     />
//                                 </div>
//                                 <p className="mt-3 text-orange-400 text-sm font-medium group-hover:text-yellow-400 transition-colors">
//                                     Gautam Solar ↗
//                                 </p>
//                             </a>
//                         </div>

//                         {/* Copyright */}
//                         <div className="text-center">
//                             <p className="text-gray-500 text-xs">
//                                 © {new Date().getFullYear()} All rights reserved
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </aside>

//             {/* CSS Animation for slide in effect */}
//             <style jsx>{`
//                 @keyframes slideInRight {
//                     from {
//                         transform: translateX(30px);
//                         opacity: 0;
//                     }
//                     to {
//                         transform: translateX(0);
//                         opacity: 1;
//                     }
//                 }

//                 @keyframes float {
//                     0%,
//                     100% {
//                         transform: translateY(0px);
//                     }
//                     50% {
//                         transform: translateY(-5px);
//                     }
//                 }

//                 .animate-float {
//                     animation: float 3s ease-in-out infinite;
//                 }
//             `}</style>
//         </header>
//     );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import {
    FaBars,
    FaTimes,
    FaChevronDown,
    FaHome,
    FaInfoCircle,
    FaEnvelope,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import companyThemes from "../config/companyThemes.json";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Close menu on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                closeMenu();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    // Close menu on route change
    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    const navLinks = [
        { path: "/", label: "Home", icon: <FaHome className="mr-2" /> },
        {
            path: "/about",
            label: "About",
            icon: <FaInfoCircle className="mr-2" />,
        },
        {
            path: "/contact",
            label: "Contact",
            icon: <FaEnvelope className="mr-2" />,
        },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header
            className={`w-full fixed top-0 left-0 z-50 ${companyThemes?.suryadoot?.theme?.text} shadow-lg ${companyThemes?.suryadoot?.theme?.navbarbgcolor} backdrop-blur-sm`}
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
                {/* Company Logo - Shows on all screens */}
                <Link
                    to="/"
                    className="flex-shrink-0 flex items-center transition-all duration-300 hover:scale-105"
                >
                    <img
                        src={companyThemes?.suryadoot?.logo}
                        alt="Company Logo"
                        className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain rounded-full border-2 border-white/20 shadow-lg"
                    />
                </Link>

                {/* Desktop Navigation - Centered */}
                <nav className="hidden md:flex items-center space-x-1 mx-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative px-6 py-3 text-lg font-medium transition-all duration-300 group ${
                                isActive(link.path)
                                    ? `${companyThemes?.suryadoot?.theme?.primary} font-semibold`
                                    : `${companyThemes?.suryadoot?.theme?.text} hover:text-sky-700`
                            }`}
                        >
                            <div className="flex items-center">
                                {link.icon}
                                {link.label}
                            </div>

                            {/* Animated underline effect */}
                            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:w-full group-hover:left-0 transition-all duration-500" />
                            {isActive(link.path) && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-600" />
                            )}

                            {/* Hover background effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
                        </Link>
                    ))}
                </nav>

                {/* Gautam Logo - Shows on all screens */}
                <div className="flex-shrink-0 transition-all duration-300">
                    <a
                        href="https://gautamsolar.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-300" />
                            <img
                                src="/gautamLogo.png"
                                alt="Gautam Solar"
                                className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain rounded-full border-2 border-white/20 shadow-lg"
                            />

                            {/* Tooltip - Only on desktop */}
                            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                Visit Gautam Solar
                                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-black/90 rotate-45" />
                            </div>
                        </div>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className={`md:hidden relative ${companyThemes?.suryadoot?.theme?.text} hover:text-orange-400 transition-all duration-200 active:scale-90 p-2 z-50 ml-4`}
                    aria-label="Toggle menu"
                >
                    <div className="relative w-8 h-8">
                        <div
                            className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-300 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            <div
                                className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                                    isOpen
                                        ? "rotate-45 translate-y-0"
                                        : "-translate-y-2"
                                }`}
                            />
                            <div
                                className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 mt-1 ${
                                    isOpen ? "opacity-0" : "opacity-100"
                                }`}
                            />
                            <div
                                className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 mt-1 ${
                                    isOpen
                                        ? "-rotate-45 -translate-y-1"
                                        : "translate-y-2"
                                }`}
                            />
                        </div>
                    </div>
                </button>
            </div>

            {/* Backdrop Overlay with blur */}
            <div
                className={`fixed inset-0 transition-all duration-500 md:hidden z-40 ${
                    isOpen
                        ? "bg-black/60 backdrop-blur-sm pointer-events-auto"
                        : "bg-transparent pointer-events-none"
                }`}
                onClick={closeMenu}
            />

            {/* Enhanced Mobile Drawer */}
            <aside
                className={`fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl transform transition-all duration-500 ease-out md:hidden z-50 ${
                    isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0"
                }`}
                style={{
                    boxShadow: isOpen
                        ? "0 0 40px rgba(251, 146, 60, 0.3)"
                        : "none",
                }}
            >
                {/* Drawer Header */}
                <div className="relative p-6 border-b border-gray-700 bg-gradient-to-r from-orange-900/20 to-yellow-900/20 bg-black">
                    <div className="absolute inset-0 bg-black" />
                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                Navigation
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Explore our site
                            </p>
                        </div>
                        <button
                            onClick={closeMenu}
                            className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:rotate-90 active:scale-90"
                            aria-label="Close menu"
                        >
                            <FaTimes className="text-orange-400 text-xl" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="h-full flex flex-col bg-black">
                    <nav className="flex flex-col p-4 bg-black space-y-2 flex-1">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={closeMenu}
                                className={`relative px-4 py-4 rounded-xl text-lg font-semibold transition-all duration-300 group overflow-hidden ${
                                    isActive(link.path)
                                        ? "bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border-l-4 border-orange-500 text-white shadow-lg"
                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                } ${
                                    isOpen
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-10 opacity-0"
                                }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    animation: isOpen
                                        ? `slideInRight 0.5s ease ${index * 0.1}s both`
                                        : "none",
                                }}
                            >
                                {/* Background hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                                <div className="relative flex items-center">
                                    <div
                                        className={`mr-3 transition-transform duration-300 group-hover:scale-110 ${
                                            isActive(link.path)
                                                ? "text-orange-400"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {link.icon}
                                    </div>
                                    <span>{link.label}</span>
                                    <FaChevronDown
                                        className={`ml-auto transform -rotate-90 text-gray-400 transition-all duration-300 group-hover:translate-x-1 ${
                                            isActive(link.path)
                                                ? "text-orange-400"
                                                : ""
                                        }`}
                                    />
                                </div>

                                {/* Active indicator */}
                                {isActive(link.path) && (
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Enhanced Bottom Section */}
                    <div className="p-6 border-t border-gray-700 bg-black">
                        {/* Partner Logo */}
                        <div className="mb-4">
                            <p className="text-gray-400 text-sm mb-3 text-center">
                                Our Partner
                            </p>
                            <a
                                href="https://gautamsolar.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center group"
                                onClick={closeMenu}
                            >
                                <div className="relative p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300 group-hover:scale-105">
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <img
                                        src="/gautamLogo.png"
                                        alt="Gautam Solar"
                                        className="relative w-40 object-contain z-10"
                                    />
                                </div>
                                <p className="mt-3 text-orange-400 text-sm font-medium group-hover:text-yellow-400 transition-colors">
                                    Gautam Solar ↗
                                </p>
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className="text-center">
                            <p className="text-gray-500 text-xs">
                                © {new Date().getFullYear()} All rights reserved
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* CSS Animation for slide in effect */}
            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </header>
    );
};

export default Navbar;
