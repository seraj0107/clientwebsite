import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
    FaBars,
    FaTimes,
    FaHome,
    FaInfoCircle,
    FaEnvelope,
    FaChevronRight,
} from "react-icons/fa";
import companyThemes from "../config/companyThemes.json";

const Navbar = () => {
    const { company } = useParams();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const companyData = companyThemes[company];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const navLinks = [
        {
            label: "Home",
            path: `/${company}`,
            icon: <FaHome className="text-lg" />,
        },
        {
            label: "About",
            path: `/${company}/about`,
            icon: <FaInfoCircle className="text-lg" />,
        },
        {
            label: "Contact",
            path: `/${company}/contact`,
            icon: <FaEnvelope className="text-lg" />,
        },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Main Header */}
            <header
                className={`w-full fixed top-0  left-0  z-50 transition-all duration-300 ${
                    companyData.theme.navbarbgcolor
                } ${companyData.theme.text} ${
                    isScrolled
                        ? "shadow-lg backdrop-blur-md bg-opacity-95"
                        : "shadow-md"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 p-2 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        {/* Logo Section */}
                        <div className="flex items-center gap-3">
                            <Link
                                to={`/${company}`}
                                className="flex items-center gap-3 group"
                            >
                                <div className="relative">
                                    {/* Glow effect behind logo */}
                                    <div className="absolute  rounded-full  transition duration-300"></div>
                                    <img
                                        src={companyData.logo}
                                        alt={companyData.name}
                                        className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full object-contain border-2 border-white/20 shadow-md group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-5 py-2.5 rounded-lg font-medium transition-all duration-300 group ${
                                        isActive(link.path)
                                            ? `${companyData.theme.primary} bg-white/10 shadow-md`
                                            : `${companyData.theme.text} hover:bg-white/5`
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`transition-transform duration-300 ${
                                                isActive(link.path)
                                                    ? "scale-110"
                                                    : "group-hover:scale-110"
                                            }`}
                                        >
                                            {link.icon}
                                        </span>
                                        {link.label}
                                    </div>

                                    {/* Animated bottom border */}
                                    {isActive(link.path) && (
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                                    )}

                                    {/* Hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-yellow-500/0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                                </Link>
                            ))}
                        </nav>

                        {/* Gautam Solar Logo - Desktop View */}
                        <a
                            href="https://gautamsolar.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center group relative"
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                                <img
                                    src="/gautamLogo.png"
                                    alt="Gautam Solar"
                                    className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-contain border-2 border-white/20 shadow-md group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            {/* Tooltip on hover - Desktop */}
                            <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none z-10">
                                Visit Gautam Solar →
                            </span>
                        </a>

                        {/* Mobile Right Actions */}
                        <div className="md:hidden flex items-center gap-3">
                            {/* Gautam Solar Logo */}
                            <a
                                href="https://gautamsolar.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                                <img
                                    src="/gautamLogo.png"
                                    alt="Gautam Solar"
                                    className="relative w-14 h-14 rounded-full object-contain border border-white/20 shadow-md group-hover:scale-110 transition-transform duration-300"
                                />
                            </a>

                            {/* Menu Button */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                                aria-label="Toggle menu"
                            >
                                <div className="relative w-6 h-6">
                                    <span
                                        className={`absolute left-0 top-1 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                                            open
                                                ? "rotate-45 translate-y-2"
                                                : ""
                                        }`}
                                    />
                                    <span
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                                            open ? "opacity-0" : ""
                                        }`}
                                    />
                                    <span
                                        className={`absolute left-0 bottom-1 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                                            open
                                                ? "-rotate-45 -translate-y-2"
                                                : ""
                                        }`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
                    open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setOpen(false)}
            ></div>

            {/* Mobile Drawer Menu */}
            <aside
                className={`fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl z-50 transition-transform duration-500 ease-out md:hidden ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Drawer Header */}
                <div className="relative p-6 border-b border-gray-700/50 bg-gradient-to-r from-orange-900/20 to-yellow-900/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={companyData.logo}
                                alt={companyData.name}
                                className="w-10 h-10 rounded-full object-contain border-2 border-orange-500/30"
                            />
                            <div>
                                <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                    {companyData.name}
                                </h2>
                               
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:rotate-90"
                            aria-label="Close menu"
                        >
                            <FaTimes className="text-orange-400 text-xl" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="p-4 space-y-2">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className={`relative flex items-center gap-3 px-4 py-4 rounded-xl font-semibold transition-all duration-300 group overflow-hidden ${
                                isActive(link.path)
                                    ? "bg-gradient-to-r from-orange-900/40 to-yellow-900/40 border-l-4 border-orange-500 text-white shadow-lg"
                                    : "text-gray-300 hover:text-white hover:bg-white/5"
                            }`}
                            style={{
                                animation: open
                                    ? `slideIn 0.5s ease ${index * 0.1}s both`
                                    : "none",
                            }}
                        >
                            {/* Background animation */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                            {/* Icon */}
                            <span
                                className={`transition-transform duration-300 group-hover:scale-110 ${
                                    isActive(link.path)
                                        ? "text-orange-400"
                                        : "text-gray-400"
                                }`}
                            >
                                {link.icon}
                            </span>

                            {/* Label */}
                            <span className="flex-1">{link.label}</span>

                            {/* Arrow */}
                            <FaChevronRight
                                className={`text-sm transition-all duration-300 group-hover:translate-x-1 ${
                                    isActive(link.path)
                                        ? "text-orange-400"
                                        : "text-gray-500"
                                }`}
                            />

                            {/* Active indicator dot */}
                            {isActive(link.path) && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section - Gautam Solar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50">
                    
                    <a
                        href="https://gautamsolar.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center group"
                        onClick={() => setOpen(false)}
                    >
                        <div className="relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300 group-hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img
                                src="/gautamLogo.png"
                                alt="Gautam Solar"
                                className="relative w-32 object-contain"
                            />
                        </div>
                        <p className="mt-2 text-orange-400 text-sm font-medium group-hover:text-yellow-400 transition-colors">
                            Visit Gautam Solar →
                        </p>
                    </a>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
