import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationCircle,
    FaSpinner,
    FaUser,
    FaLink,
    FaInfoCircle,
    FaPlus,
    FaBook,
} from "react-icons/fa";
import { useWebsiteData } from "../../../../context/WebsiteDataContext";
const CreateClient = () => {
    const [clientName, setClientName] = useState("");
    const [clientSlug, setClientSlug] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_TECH_PRO;
    const { saveClientId } = useWebsiteData();
    console.log("save the client id in context and localStorage:",saveClientId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!clientName || !clientSlug) {
            setError("Both fields are required.");
            return;
        }

        const slugRegex = /^[a-z0-9-]+$/;
        if (!slugRegex.test(clientSlug)) {
            setError(
                "Slug must contain only lowercase letters, numbers, and hyphens.",
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/client/create`,
                {
                    name: clientName,
                    slug: clientSlug,
                },
                { withCredentials: true },
            );

            console.log("Client Created:", response.data);
            const clientId = response?.data?.data?._id;
            const clientSlug = response?.data?.data?.slug;
            console.log("Saving Client ID: hi", clientId);
            saveClientId(clientId);
            setSuccessMessage("Client created successfully!");

            // Clear form
            setClientName("");
            setClientSlug("");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "An error occurred. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 group transition-colors duration-200"
                >
                    <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Previous
                </button>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                                    <FaPlus className="w-4 h-4 text-blue-600" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    Create New Client
                                </h1>
                                <p className="text-blue-100 mt-1">
                                    Add a new client to your system
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-10">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Client Name Field */}
                            <div className="space-y-3">
                                <label
                                    htmlFor="clientName"
                                    className="block text-sm font-semibold text-gray-900"
                                >
                                    Client Name
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="clientName"
                                        value={clientName}
                                        onChange={(e) =>
                                            setClientName(e.target.value)
                                        }
                                        className="w-full px-4 py-3.5 pl-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
                                        placeholder="Enter client name"
                                        disabled={isSubmitting}
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaUser className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Client Slug Field */}
                            <div className="space-y-3">
                                <label
                                    htmlFor="clientSlug"
                                    className="block text-sm font-semibold text-gray-900"
                                >
                                    Client Slug
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="clientSlug"
                                        value={clientSlug}
                                        onChange={(e) =>
                                            setClientSlug(
                                                e.target.value
                                                    .toLowerCase()
                                                    .replace(
                                                        /[^a-z0-9-]/g,
                                                        "-",
                                                    ),
                                            )
                                        }
                                        className="w-full px-4 py-3.5 pl-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
                                        placeholder="e.g., company-name"
                                        disabled={isSubmitting}
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaLink className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="rounded-xl bg-red-50 border border-red-100 p-4 animate-in fade-in">
                                    <div className="flex items-start space-x-3">
                                        <FaExclamationCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-red-700">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Success Message */}
                            {successMessage && (
                                <div className="rounded-xl bg-green-50 border border-green-100 p-4 animate-in fade-in">
                                    <div className="flex items-start space-x-3">
                                        <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-green-800">
                                                Success!
                                            </p>
                                            <p className="text-sm text-green-700 mt-0.5">
                                                {successMessage}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                                                Creating Client...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                Create Client
                                                <FaPlus className="w-4 h-4 ml-2" />
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateClient;
