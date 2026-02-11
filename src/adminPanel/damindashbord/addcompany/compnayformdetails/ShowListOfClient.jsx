import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ShowListOfClient = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [statusFilter, setStatusFilter] = useState("draft");
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_TECH_PRO;

    const fetchClients = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`${API_BASE_URL}/client/show`, {
                params: {
                    status: statusFilter,
                },
                withCredentials: true,
            });

            console.log("Client List API Response:", response.data);
            setClients(response.data.data || []);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to fetch clients.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, [statusFilter]);

    // Format ID to show first and last few characters
    const formatId = (id) => {
        if (!id) return "N/A";
        if (id.length <= 12) return id;
        return `${id.substring(0, 6)}...${id.substring(id.length - 6)}`;
    };

    const handleNameClick = (clientId, clientName) => {
        console.log("kkkk", clientId)
        navigate(`/admin/addcompany/${clientId}`, {
            state: { clientName },
        });
    };

    const handleCopyId = (id) => {
        navigator.clipboard
            .writeText(id)
            .then(() => {
                // You can add a toast notification here
                alert("ID copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy ID: ", err);
            });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Client List
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Showing{" "}
                        <span className="font-semibold capitalize">
                            {statusFilter}
                        </span>{" "}
                        clients
                        {clients.length > 0 &&
                            ` • ${clients.length} client${clients.length !== 1 ? "s" : ""} found`}
                    </p>
                </div>

                {/* Status Filter Buttons */}
                <div className="flex space-x-2">
                    {["draft", "published", "archived"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-md font-medium capitalize transition-all duration-200 ${
                                statusFilter === status
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">
                        Loading clients...
                    </span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-red-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && clients.length === 0 && !error && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No clients found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        No {statusFilter} clients available at the moment.
                    </p>
                </div>
            )}

            {/* Table View */}
            {!loading && clients.length > 0 && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Client Name
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        ID
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {clients.map((client) => (
                                    <tr
                                        key={client._id}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        {/* Name Column - Clickable */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div
                                                className="flex items-center cursor-pointer group"
                                                onClick={() =>
                                                    handleNameClick(
                                                        client._id,
                                                        client.name,
                                                    )
                                                }
                                            >
                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                    <span className="text-blue-600 font-semibold">
                                                        {client.name
                                                            ? client.name
                                                                  .charAt(0)
                                                                  .toUpperCase()
                                                            : "C"}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex items-center">
                                                        {client.name ||
                                                            "Unnamed Client"}
                                                        <svg
                                                            className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                            />
                                                        </svg>
                                                    </div>
                                                    {client.email && (
                                                        <div className="text-sm text-gray-500">
                                                            {client.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* ID Column - Click to copy */}
                                        <td
                                            className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                            onClick={() =>
                                                handleCopyId(client._id)
                                            }
                                            title="Click to copy ID"
                                        >
                                            <div className="text-sm text-gray-900">
                                                <div className="font-mono text-xs group">
                                                    {formatId(client._id)}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 flex items-center">
                                                    <svg
                                                        className="w-3 h-3 mr-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    Click to copy
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Footer Summary */}
            {!loading && clients.length > 0 && (
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                    <div>
                        Showing {clients.length} of {clients.length} clients
                    </div>
                    <div className="text-xs">
                        Click on client names to view details
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowListOfClient;
