import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaUser, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import axios from "axios";


const AdminLogin = () => {
    
    const [formData, setFormData] = useState({
        userId: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const baseURL = import.meta.env.VITE_TECH_PRO;
    console.log("showing the url", baseURL);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError("");
    };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   setError("");

    //   if (!formData.userId.trim() || !formData.password.trim()) {
    //     setError("Please enter both User ID and Password");
    //     return;
    //   }

    //   setIsLoading(true);

    //   setTimeout(() => {
    //     if (formData.userId === "admin" && formData.password === "admin123") {
    //       localStorage.setItem("adminToken", "demo-token");
    //       navigate("/admin/dashboard");
    //     } else {
    //       setError("Invalid User ID or Password");
    //     }
    //     setIsLoading(false);
    //   }, 1000);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.userId.trim() || !formData.password.trim()) {
            setError("Please enter both User ID and Password");
            return;
        }

        try {
            setIsLoading(true);

            const { data } = await axios.post(`${baseURL}/user/login`, {
                userId: formData.userId,
                password: formData.password,
            }, {withCredentials: true});
            console.log("Attempting login to:", `${baseURL}/user/login`);
console.log("showing the data", data)
            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("adminData", JSON.stringify(data.user));

            navigate("/admin/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid User ID or Password",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Back to Home */}
                <div className="text-center mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                    {/* Header with Icon */}
                    <div className="relative bg-gradient-to-r from-gray-700 to-gray-800 p-8 text-center">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 border-2 border-white/30">
                                <FaShieldAlt className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Admin Portal
                            </h1>
                            <p className="text-gray-200 text-sm">
                                Secure Access • Authorized Personnel Only
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg backdrop-blur-sm animate-shake">
                                <p className="text-red-200 text-sm text-center font-medium">
                                    {error}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* User ID Input */}
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    User ID
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaUser className="h-5 w-5 text-indigo-300" />
                                    </div>
                                    <input
                                        type="text"
                                        name="userId"
                                        value={formData.userId}
                                        onChange={handleChange}
                                        placeholder="Enter your user ID"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300/50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all backdrop-blur-sm"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-indigo-300" />
                                    </div>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300/50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all backdrop-blur-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-300 hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5" />
                                        ) : (
                                            <FaEye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Authenticating...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Sign In to Dashboard</span>
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
