import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    FaHome,
    FaBuilding,
    FaPalette,
    FaUsers,
    FaCog,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight,
    FaChevronDown,
    FaChevronUp,
    FaEnvelope,
} from "react-icons/fa";

import { TbLayoutNavbar } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen = true, onToggle }) => {
    const { clientSlug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(isOpen);
    const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);

    // const menuItems = [
    //     {
    //         icon: <TbLayoutNavbar />,
    //         label: "Navbar Form",
    //         path: "/admin/addcompany/adminnavbarform",
    //     },
    //     {
    //         icon: <FaBuilding />,
    //         label: "Home",
    //         path: "/admin/addcompany/homesection",

    //         hasDropdown: true,
    //         subItems: [
    //             {
    //                 label: "Section Form 1",
    //                 path: "/admin/addcompany/sectionform1",
    //             },
    //             { label: "Section Form 2", path: "/admin/addcompany/sectionform2" },
    //         ],
    //     },
    //     {
    //         icon: <FaPalette />,
    //         label: "About Form",
    //         path: "/admin/addcompany/aboutform",
    //     },
    //     {
    //         icon: <FaUsers />,
    //         label: "Contact Form",
    //         path: "/admin/addcompany/contectform",
    //     },
    //     {
    //         icon: <FaEnvelope />,
    //         label: "Footer Form",
    //         path: "/admin/addcompany/footerform",
    //     },
    //      {
    //         icon: <FaEnvelope />,
    //         label: "Submit",
    //         path: "/admin/addcompany/daminmain",
    //     },
    // ];

    const menuItems = [
        {
            icon: <TbLayoutNavbar />,
            label: "Navbar Form",
            path: `/admin/addcompany/${clientSlug}/adminnavbarform`,
        },
        {
            icon: <FaBuilding />,
            label: "Home",
            hasDropdown: true,
            subItems: [
                {
                    label: "Section Form 1",
                    path: `/admin/addcompany/${clientSlug}/sectionform1`,
                },
                {
                    label: "Section Form 2",
                    path: `/admin/addcompany/${clientSlug}/sectionform2`,
                },
            ],
        },
        {
            icon: <FaPalette />,
            label: "About Form",
            path: `/admin/addcompany/${clientSlug}/aboutform`,
        },
        {
            icon: <FaUsers />,
            label: "Contact Form",
            path: `/admin/addcompany/${clientSlug}/contactform`,
        },
        {
            icon: <FaEnvelope />,
            label: "Footer Form",
            path: `/admin/addcompany/${clientSlug}/footerform`,
        },
        {
            icon: <FaEnvelope />,
            label: "Submit",
            path: `/admin/addcompany/${clientSlug}/daminmain`,
        },
    ];

    const handleToggle = () => {
        const newState = !sidebarOpen;
        setSidebarOpen(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    // const isActive = (path) => {
    //     return location.pathname === path;
    // };

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <aside
            className={`${
                sidebarOpen ? "w-64" : "w-20"
            } bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col shadow-xl relative`}
        >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    {sidebarOpen && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <FaBuilding className="text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg">
                                    Solar Admin
                                </h2>
                                <p className="text-xs text-gray-400">
                                    Management Panel
                                </p>
                            </div>
                        </div>
                    )}
                    {!sidebarOpen && (
                        <div className="w-full flex justify-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <FaBuilding className="text-white" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                className="absolute -right-3 top-20 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
            >
                {sidebarOpen ? (
                    <FaChevronLeft className="text-white text-xs" />
                ) : (
                    <FaChevronRight className="text-white text-xs" />
                )}
            </button>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <button
                            onClick={() => {
                                if (item.hasDropdown) {
                                    setHomeDropdownOpen(!homeDropdownOpen);
                                } else {
                                    navigate(item.path);
                                }
                            }}
                            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all group ${
                                isActive(item.path)
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
                                    : "hover:bg-gray-700"
                            }`}
                            title={!sidebarOpen ? item.label : ""}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className={`text-xl ${!sidebarOpen && "mx-auto"}`}
                                >
                                    {item.icon}
                                </span>
                                {sidebarOpen && (
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                )}
                            </div>
                            {sidebarOpen && item.hasDropdown && (
                                <span className="text-sm">
                                    {homeDropdownOpen ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </span>
                            )}
                            {!sidebarOpen && (
                                <span className="absolute left-full ml-6 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {item.label}
                                </span>
                            )}
                        </button>

                        {/* Dropdown Submenu */}
                        {item.hasDropdown &&
                            homeDropdownOpen &&
                            sidebarOpen && (
                                <div className="ml-4 mt-2 space-y-1">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <button
                                            key={subIndex}
                                            onClick={() =>
                                                navigate(subItem.path)
                                            }
                                            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                                                isActive(subItem.path)
                                                    ? "bg-indigo-500 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                            }`}
                                        >
                                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                            <span>{subItem.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
