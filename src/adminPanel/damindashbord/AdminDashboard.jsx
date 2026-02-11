import React from "react";
import {
    FaSignOutAlt,
    FaUsers,
    FaCog,
    FaChartBar,
    FaShieldAlt,
    FaPlus,
    FaEdit,
    FaEye,
    FaBell,
    FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    const stats = [
        {
            label: "Total Companies",
            value: "12",
            icon: <FaUsers className="w-8 h-8" />,
            gradient: "from-blue-500 to-blue-600",
            change: "+2 this month",
        },
        {
            label: "Active Themes",
            value: "8",
            icon: <FaCog className="w-8 h-8" />,
            gradient: "from-emerald-500 to-emerald-600",
            change: "+1 new theme",
        },
        {
            label: "Today's Views",
            value: "20",
            icon: <FaChartBar className="w-8 h-8" />,
            gradient: "from-purple-500 to-purple-600",
            change: "+12% vs yesterday",
        },
        {
            label: "Admin Access",
            value: "3",
            icon: <FaShieldAlt className="w-8 h-8" />,
            gradient: "from-rose-500 to-rose-600",
            change: "Active now",
        },
    ];

    // const quickActions = [
    //     { title: "Add Company", icon: <FaPlus />, color: "bg-blue-500", action: () => {} },
    //     { title: "Edit Themes", icon: <FaEdit />, color: "bg-purple-500", action: () => {} },
    //     { title: "View Reports", icon: <FaEye />, color: "bg-emerald-500", action: () => {} },
    // ];

    const quickActions = [
        {
            title: "Create Client",
            icon: <FaPlus />,
            color: "bg-blue-500",
            action: () => navigate("/admin/createclient"),
        },
        
        // {
        //     title: "Add Company",
        //     icon: <FaPlus />,
        //     color: "bg-blue-500",
        //     action: () => navigate("/admin/addcompany"),
        // },
         {
            title: "Show Client List",
            icon: <FaUsers/>,
            color: "bg-blue-500",
            // action: () => navigate("/admin/addcompany"),
            action: () => navigate("/admin/showclient"),
        },
        {
            title: "Edit Themes",
            icon: <FaEdit />,
            color: "bg-purple-500",
            action: () => navigate("/admin/themes"),
        },
        {
            title: "View Reports",
            icon: <FaEye />,
            color: "bg-emerald-500",
            action: () => navigate("/admin/reports"),
        },
    ];

    const recentActivity = [
        {
            text: "Company 'Sun Energy' theme updated",
            time: "2 hours ago",
            type: "update",
        },
        {
            text: "New company 'Green Solar' added",
            time: "5 hours ago",
            type: "new",
        },
        {
            text: "Theme 'Modern Blue' published",
            time: "1 day ago",
            type: "publish",
        },
        {
            text: "Admin user 'John' logged in",
            time: "1 day ago",
            type: "login",
        },
    ];

    const companies = [
        {
            name: "Sun Energy Co.",
            theme: "Solar Blue",
            status: "Active",
            views: 1234,
        },
        {
            name: "Green Solar Ltd.",
            theme: "Eco Green",
            status: "Active",
            views: 987,
        },
        {
            name: "PowerSun Inc.",
            theme: "Modern Orange",
            status: "Inactive",
            views: 654,
        },
        {
            name: "Bright Future",
            theme: "Clean White",
            status: "Active",
            views: 543,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            {/* Modern Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
                                <FaShieldAlt className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    Admin Dashboard
                                </h1>
                                <p className="text-xs text-gray-500">
                                    Solar Company Manager
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Search Bar */}
                            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
                                <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent outline-none text-sm w-64"
                                />
                            </div>

                            {/* Notifications */}
                            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                                <FaBell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/30"
                            >
                                <FaSignOutAlt className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-xl text-white shadow-lg`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                                {stat.label}
                            </p>
                            <p className="text-xs text-green-600 font-medium">
                                {stat.change}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.action}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`${action.color} p-4 rounded-xl text-white text-xl group-hover:scale-110 transition-transform`}
                                >
                                    {action.icon}
                                </div>
                                <span className="text-lg font-semibold text-gray-800">
                                    {action.title}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Companies Table */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                Companies Overview
                            </h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                View All →
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                            Company
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                            Theme
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                            Status
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                            Views
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.map((company, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition"
                                        >
                                            <td className="py-4 px-4">
                                                <div className="font-medium text-gray-800">
                                                    {company.name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-sm text-gray-600">
                                                    {company.theme}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        company.status ===
                                                        "Active"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-100 text-gray-700"
                                                    }`}
                                                >
                                                    {company.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {company.views.toLocaleString()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-0"
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                            activity.type === "new"
                                                ? "bg-green-500"
                                                : activity.type === "update"
                                                  ? "bg-blue-500"
                                                  : activity.type === "publish"
                                                    ? "bg-purple-500"
                                                    : "bg-gray-400"
                                        }`}
                                    ></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-800 font-medium">
                                            {activity.text}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Demo Company Links */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-indigo-900 mb-6">
                        Quick Access to Demo Companies
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((num) => (
                            <a
                                key={num}
                                href={`/company${num}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 text-center group hover:-translate-y-1 border border-indigo-100"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                                    {num}
                                </div>
                                <div className="font-semibold text-gray-800 mb-1">
                                    Company {num}
                                </div>
                                <div className="text-xs text-gray-500">
                                    View Site →
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            Admin Panel v1.0 • {new Date().getFullYear()} All
                            rights reserved
                        </p>
                        <div className="flex gap-4 text-sm text-gray-500">
                            <a
                                href="#"
                                className="hover:text-indigo-600 transition"
                            >
                                Documentation
                            </a>
                            <a
                                href="#"
                                className="hover:text-indigo-600 transition"
                            >
                                Support
                            </a>
                            <a
                                href="#"
                                className="hover:text-indigo-600 transition"
                            >
                                Settings
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdminDashboard;
