import React, { useState } from "react";
import {
    FaBuilding,
    FaSave,
    FaTimes,
    FaImage,
    FaEnvelope,
    FaPhone,
    FaGlobe,
    FaMapMarkerAlt,
    FaPalette,
    FaPlus,
} from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import AdminNavbarForm from "./compnayformdetails/AdminNavbarForm";
import FooterForm from "./compnayformdetails/FooterForm";
// import ContactForm from "./compnayformdetails/ContactForm";
// import AboutForm from "./compnayformdetails/AboutForm";
// import SectionForm2 from "./compnayformdetails/SectionForm2";
const AddCompany = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSubmit = (e) => {};

    const handleReset = () => {};

    const renderForm = () => {
        console.log("Rendering form for:", location.pathname);
        switch (location.pathname) {
            case "/admin/adminnavbarform":
                return (
                    <div className="max-w-4xl mx-auto">
                        <AdminNavbarForm
                        // initialData={navbarTheme}
                        // onSave={handleNavbarSave}
                        />
                    </div>
                );

            case "/admin/sectionform1":
                return (
                    <div className="text-center text-gray-500">
                        <SectionForm1 />
                    </div>
                );
            case "/admin/sectionform2":
                return (
                    <div className="text-center text-gray-500">
                       <SectionForm2/>
                    </div>
                );
            case "/admin/aboutform":
                return (
                    <div className="text-center text-gray-500">
                        <AboutForm/>
                    </div>
                );
            case "/admin/contactform":
                return (
                    <div className="text-center text-gray-500">
                        <ContactForm/>
                    </div>
                );
                case "/admin/footerform":
                    return(
                        <div className="text-center text-gray-500">
                            <FooterForm/>
                        </div>
                    );
                    case "/admin/submit":
                    return(
                        <div className="text-center text-gray-500">
                            <MasterControlPanel/>
                        </div>
                    )
            default:
                return (
                    <div className="text-center text-gray-500">
                        <p>Select a form from the sidebar</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* <main className="flex-1 overflow-y-auto p-6">
                    {renderForm()}
                </main>  */}

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AddCompany;
