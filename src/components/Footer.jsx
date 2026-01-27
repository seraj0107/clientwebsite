import React from "react";
import companyThemes from "../config/companyThemes.json";

const Footer = () => {
    const company = companyThemes?.ArthTechSolution;

    const phone = company?.phone;
    const email = company?.email;
    const address = company?.location;
    const isMobile =
        typeof navigator !== "undefined" &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const phoneLink = phone ? `tel:${phone}` : "";
    const emailLink = email
        ? isMobile
            ? `mailto:${email}`
            : `https://mail.google.com/mail/?view=cm&to=${email}`
        : "";

    const mapLink = address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              address,
          )}`
        : "";

    return (
        <footer
            className={`${company?.theme?.text} ${company?.theme?.bg} p-7 font-[Be_Vietnam_Pro]`}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border border-gray-700 rounded-xl p-6 md:p-8">
                {/* Logo & Description */}
                <div className="flex flex-col gap-4 md:col-span-2">
                    <div className={`  w-fit p-2 rounded-lg overflow-hidden`}>
                        <img
                            src={company?.logo}
                            alt={company?.name}
                            className="w-28 object-contain rounded-full"
                        />
                    </div>

                    <p className="text-sm md:text-base leading-relaxed max-w-2xl">
                        Driving a sustainable future with next-generation solar
                        innovation. At{" "}
                        <span
                            className={`font-semibold ${company?.theme?.gradientText}`}
                        >
                            {company?.name}
                        </span>
                        , we combine advanced technology and engineering
                        expertise to deliver reliable, high-performance solar
                        solutions.
                    </p>

                    <p className="text-sm">
                        {" "}
                        <a
                            href="https://gautamsolar.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-red-600 hover:underline"
                        >
                            Gautam Solar
                        </a>
                    </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4">
                    <h4
                        className={`text-lg font-semibold ${company?.theme?.primary}`}
                    >
                        Contact Us
                    </h4>

                    <div className="space-y-3">
                        {phone && (
                            <div className="flex items-center gap-2">
                                <span>📞</span>
                                <a
                                    href={phoneLink}
                                    className="hover:underline text-sm md:text-base"
                                >
                                    {phone}
                                </a>
                            </div>
                        )}

                        {email && (
                            <div className="flex items-center gap-2">
                                <span>📧</span>
                                <a
                                    href={emailLink}
                                    target={!isMobile ? "_blank" : undefined}
                                    rel={
                                        !isMobile
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="hover:underline text-sm md:text-base"
                                >
                                    {email}
                                </a>
                            </div>
                        )}

                        {address && (
                            <div className="flex items-center gap-2">
                                <span>📍</span>
                                <a
                                    href={mapLink}
                                    target={!isMobile ? "_blank" : undefined}
                                    rel={
                                        !isMobile
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="hover:underline text-sm md:text-base"
                                >
                                    {address}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-6">
                <p className="text-sm">
                    © {new Date().getFullYear()}{" "}
                    <span
                        className={`font-semibold ${company?.theme?.gradientText}`}
                    >
                        {company?.name}
                    </span>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

//import React, { useState, useEffect } from "react";
// import {
//     FaBars,
//     FaTimes,
//     FaChevronDown,
//     FaHome,
//     FaInfoCircle,
//     FaEnvelope,
//     FaCaretDown,
// } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import companyThemes from "../config/companyThemes.json";

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isHoveringLogo, setIsHoveringLogo] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false);

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
//     const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//     // Close menu on scroll
//     useEffect(() => {
//         const handleScroll = () => {
//             if (isOpen) {
//                 closeMenu();
//             }
//             if (dropdownOpen) {
//                 setDropdownOpen(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [isOpen, dropdownOpen]);

//     // Close menu on route change
//     useEffect(() => {
//         closeMenu();
//         setDropdownOpen(false);
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
//             className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
//                 isScrolled ? "bg-white shadow-lg" : "bg-transparent"
//             }`}
//         >
//             {/* Mobile Navbar - Compact Design */}
//             <div className="md:hidden">
//                 <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 bg-white">
//                     {/* Left: Both Logos in a compact group */}
//                     <div className="flex items-center space-x-3">
//                         {/* Company Logo */}
//                         <Link to="/" className="flex-shrink-0">
//                             <div className="relative group">
//                                 <img
//                                     src={companyThemes?.suryadoot?.logo}
//                                     alt="Company Logo"
//                                     className="w-10 h-10 object-contain rounded-full border-2 border-gray-200"
//                                 />
//                                 <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                                     Our Company
//                                 </div>
//                             </div>
//                         </Link>

//                         {/* Separator */}
//                         <div className="h-6 w-px bg-gray-300" />

//                         {/* Gautam Logo */}
//                         <a
//                             href="https://gautamsolar.com/"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex-shrink-0 group"
//                         >
//                             <div className="relative">
//                                 <img
//                                     src="/gautamLogo.png"
//                                     alt="Gautam Solar"
//                                     className="w-10 h-10 object-contain rounded-full border-2 border-gray-200"
//                                 />
//                                 <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                                     Our Partner
//                                 </div>
//                             </div>
//                         </a>

//                         {/* Vertical Divider */}
//                         <div className="h-6 w-px bg-gray-300" />
//                     </div>

//                     {/* Right: Menu Button for full drawer */}
//                     <button
//                         onClick={toggleMenu}
//                         className={`p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 active:scale-95`}
//                         aria-label="Open full menu"
//                     >
//                         <FaBars className="text-gray-700 text-lg" />
//                     </button>
//                 </div>
//             </div>

//             {/* DESKTOP VIEW - Logo position swap on scroll */}
//             <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 py-3">
//                 <div className="flex justify-between items-center">
//                     {/* LEFT LOGO POSITION */}
//                     <div className="w-24 h-24 flex-shrink-0">
//                         {/* Company logo shows when NOT scrolled */}
//                         <Link
//                             to="/"
//                             className={`transition-all duration-500 transform ${
//                                 isScrolled
//                                     ? "opacity-0 scale-90 pointer-events-none absolute"
//                                     : "opacity-100 scale-100 relative"
//                             }`}
//                             onMouseEnter={() => setIsHoveringLogo(true)}
//                             onMouseLeave={() => setIsHoveringLogo(false)}
//                         >
//                             <div className="relative">
//                                 <div
//                                     className={`absolute inset-0 rounded-full blur-lg transition-all duration-500 ${
//                                         isHoveringLogo
//                                             ? "opacity-70 scale-110"
//                                             : "opacity-0 scale-100"
//                                     }`}
//                                     style={{
//                                         background: `radial-gradient(circle, ${companyThemes?.suryadoot?.theme?.primary} 0%, transparent 70%)`,
//                                     }}
//                                 />
//                                 <img
//                                     src={companyThemes?.suryadoot?.logo}
//                                     alt="Company Logo"
//                                     className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full border-2 border-white/20 shadow-lg z-10"
//                                 />
//                             </div>
//                         </Link>

//                         {/* Gautam logo shows when SCROLLED (moves to left) */}
//                         <a
//                             href="https://gautamsolar.com/"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={`group transition-all duration-500 transform ${
//                                 isScrolled
//                                     ? "opacity-100 scale-100 relative"
//                                     : "opacity-0 scale-90 pointer-events-none absolute"
//                             }`}
//                         >
//                             <div className="relative">
//                                 <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200" />
//                                 <img
//                                     src="/gautamLogo.png"
//                                     alt="Gautam Solar"
//                                     className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full border-2 border-white/20 shadow-lg z-10"
//                                 />
//                             </div>
//                         </a>
//                     </div>

//                     {/* DESKTOP NAVIGATION - Center */}
//                     <nav className="flex items-center space-x-1 mx-auto">
//                         {navLinks.map((link) => (
//                             <Link
//                                 key={link.path}
//                                 to={link.path}
//                                 className={`relative px-6 py-3 text-lg font-medium transition-all duration-300 group ${
//                                     isActive(link.path)
//                                         ? `${companyThemes?.suryadoot?.theme?.primary} font-semibold`
//                                         : `${companyThemes?.suryadoot?.theme?.text} hover:text-sky-700`
//                                 }`}
//                             >
//                                 <div className="flex items-center">
//                                     {link.icon}
//                                     {link.label}
//                                 </div>

//                                 {/* Animated underline effect */}
//                                 <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:w-full group-hover:left-0 transition-all duration-500" />
//                                 {isActive(link.path) && (
//                                     <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-600" />
//                                 )}

//                                 {/* Hover background effect */}
//                                 <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
//                             </Link>
//                         ))}
//                     </nav>

//                     {/* RIGHT LOGO POSITION */}
//                     <div className="w-24 h-24 flex-shrink-0 flex justify-end">
//                         {/* Gautam logo shows when NOT scrolled (right side) */}
//                         <a
//                             href="https://gautamsolar.com/"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={`group transition-all duration-500 transform ${
//                                 isScrolled
//                                     ? "opacity-0 scale-90 pointer-events-none absolute"
//                                     : "opacity-100 scale-100 relative"
//                             }`}
//                         >
//                             <div className="relative">
//                                 <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200" />
//                                 <img
//                                     src="/gautamLogo.png"
//                                     alt="Gautam Solar"
//                                     className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full border-2 border-white/20 shadow-lg z-10"
//                                 />
//                                 {/* Desktop Tooltip */}
//                                 <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
//                                     Visit Gautam Solar
//                                     <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-black/90 rotate-45" />
//                                 </div>
//                             </div>
//                         </a>
//                     </div>
//                 </div>
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

//             {/* Mobile Drawer - Full Menu */}
//             <aside
//                 className={`fixed top-0 right-0 w-full max-w-xs h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden z-50 ${
//                     isOpen ? "translate-x-0" : "translate-x-full"
//                 }`}
//             >
//                 {/* Drawer Header */}
//                 <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-yellow-50">
//                     <div className="relative flex items-center justify-between">
//                         <div>
//                             <h2 className="text-2xl font-bold text-gray-800">
//                                 Full Menu
//                             </h2>
//                             <p className="text-gray-600 text-sm mt-1">
//                                 All navigation options
//                             </p>
//                         </div>
//                         <button
//                             onClick={closeMenu}
//                             className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90 active:scale-90"
//                             aria-label="Close menu"
//                         >
//                             <FaTimes className="text-gray-700 text-xl" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Navigation Links */}
//                 <div className="h-full flex flex-col bg-white">
//                     <nav className="flex flex-col p-4 space-y-2 flex-1">
//                         {navLinks.map((link, index) => (
//                             <Link
//                                 key={link.path}
//                                 to={link.path}
//                                 onClick={closeMenu}
//                                 className={`relative px-4 py-4 rounded-xl text-lg font-semibold transition-all duration-300 group ${
//                                     isActive(link.path)
//                                         ? "bg-gradient-to-r from-orange-100 to-yellow-100 border-l-4 border-orange-500 text-orange-700 shadow-sm"
//                                         : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
//                                 }`}
//                                 style={{
//                                     transitionDelay: `${index * 100}ms`,
//                                 }}
//                             >
//                                 <div className="relative flex items-center">
//                                     <div
//                                         className={`mr-3 transition-transform duration-300 group-hover:scale-110 ${
//                                             isActive(link.path)
//                                                 ? "text-orange-500"
//                                                 : "text-gray-500"
//                                         }`}
//                                     >
//                                         {link.icon}
//                                     </div>
//                                     <span>{link.label}</span>
//                                 </div>

//                                 {/* Active indicator */}
//                                 {isActive(link.path) && (
//                                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
//                                 )}
//                             </Link>
//                         ))}
//                     </nav>

//                     {/* Bottom Section */}
//                     <div className="p-6 border-t border-gray-200 bg-gray-50">
//                         {/* Partner Logo */}
//                         <div className="mb-4">
//                             <p className="text-gray-600 text-sm mb-3 text-center">
//                                 Our Partner
//                             </p>
//                             <a
//                                 href="https://gautamsolar.com/"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex flex-col items-center group"
//                                 onClick={closeMenu}
//                             >
//                                 <div className="relative p-3 bg-white rounded-2xl shadow-lg group-hover:shadow-orange-200 transition-all duration-300 group-hover:scale-105">
//                                     <img
//                                         src="/gautamLogo.png"
//                                         alt="Gautam Solar"
//                                         className="relative w-32 object-contain"
//                                     />
//                                 </div>
//                                 <p className="mt-3 text-orange-600 text-sm font-medium group-hover:text-orange-700 transition-colors">
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

//             {/* Close dropdown when clicking outside */}
//             {dropdownOpen && (
//                 <div
//                     className="fixed inset-0 z-30 md:hidden"
//                     onClick={() => setDropdownOpen(false)}
//                 />
//             )}
//         </header>
//     );
// };

// export default Navbar;
