import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            {/* <a
                href="https://gautamsolar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className=" fixed right-1 bottom-20 z-50 hover:opacity-80 transition-opacity "
            >
                <img
                    src="/gautamLogo.png"
                    alt="Gautam Solar"
                    className="w-20 sm:w-24 md:w-32 lg:w-36 h-auto"
                />
            </a> */}

            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
