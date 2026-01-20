import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import companyThemes from "../config/companyThemes.json";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
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
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header
            className={`w-full fixed top-0 left-0 z-50 ${companyThemes?.ArthTechSolution?.theme?.text} shadow-lg ${companyThemes?.ArthTechSolution?.theme?.navbarbgcolor} backdrop-blur-sm `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0 items-center">
                    <img
                        src={companyThemes?.ArthTechSolution?.logo}
                        // alt={companyThemes?.ArthTechSolution?.name}
                        // className="h-18 sm:h-24 md:h-24 w-auto object-contain rounded-full items-center"
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full"

                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative text-lg font-medium transition-all duration-300 group ${
                                isActive(link.path)
                                    ? `${companyThemes?.ArthTechSolution?.theme?.primary} font-semibold`
                                    : `${companyThemes?.ArthTechSolution?.theme?.text} hover:${companyThemes?.ArthTechSolution?.theme?.primary}`
                            }`}
                        >
                            {link.label}
                            {/* Underline Effect */}
                            <span
                                className={`absolute left-0 bottom-[-4px] h-0.5 bg-gradient-to-r from-orange-500 to-yellow-600 transition-all duration-300 ${
                                    isActive(link.path)
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                }`}
                            />
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className={`md:hidden ${companyThemes?.ArthTechSolution?.theme?.text} hover:${companyThemes?.ArthTechSolution?.theme?.primary} transition-all duration-200 active:scale-90 p-2`}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Backdrop Overlay - covers entire screen */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden z-50 ${
                    isOpen
                        ? "opacity-50 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={closeMenu}
            />

            {/* Mobile Slide-In Drawer */}
            <aside
                className={`fixed top-0 right-0 w-3/4 max-w-xs h-full bg-gradient-to-b from-orange-50 to-yellow-50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden z-50 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-orange-200">
                    <h2
                        className={`text-xl font-bold ${companyThemes?.ArthTechSolution?.theme?.gradientText}`}
                    >
                        Menu
                    </h2>
                    <button
                        onClick={closeMenu}
                        className={`${companyThemes?.ArthTechSolution?.theme?.navbarcloseicon} hover:${companyThemes?.ArthTechSolution?.theme?.primary} transition-all duration-200 active:scale-90 p-2`}
                        aria-label="Close menu"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Mobile Navigation Links and Logo Container */}
                <div className={`flex flex-col h-screen ${companyThemes?.ArthTechSolution?.theme?.navmenubgcolor} backdrop-blur-sm`}>
                    {/* Scrollable Navigation */}
                    <nav className="flex flex-col mt-4 px-3 space-y-1 flex-1 overflow-y-auto">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={closeMenu}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                className={`px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
                                    isActive(link.path)
                                        ? `${companyThemes?.ArthTechSolution?.theme?.primary} bg-black border-l-4 border-orange-500 shadow-sm`
                                        : `${companyThemes?.ArthTechSolution?.theme?.menutextcolor} hover:bg-white/50 hover:${companyThemes?.ArthTechSolution?.theme?.primary}`
                                } ${
                                    isOpen
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 translate-x-10"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Fixed Bottom Logo */}
                    <div className="px-5 pb-50 shrink-0">
                        <div className="border-t border-orange-200 pt-6">
                            <a
                                href="https://gautamsolar.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-center hover:opacity-80 transition-opacity"
                                onClick={closeMenu}
                            >
                                <img
                                    src="/gautamLogo.png"
                                    alt="Gautam Solar"
                                    className="w-32 object-contain"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
        </header>
    );
};

export default Navbar;
