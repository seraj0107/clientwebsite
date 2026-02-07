// components/MasterControlPanel.jsx

import { useState, useEffect } from "react";
import {
    publishAllSections,
    getSyncStatus,
    clearAllData,
} from "../services/api";
import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaSync,
    FaTrash,
    FaClock,
    FaDatabase,
} from "react-icons/fa";

const MasterControlPanel = ({
    clientSlug = "default-client",
    onPublishSuccess,
}) => {
    const [syncStatus, setSyncStatus] = useState(null);
    const [publishing, setPublishing] = useState(false);
    const [publishResult, setPublishResult] = useState(null);

    useEffect(() => {
        loadStatus();
        // Refresh status every 2 seconds to show real-time updates
        const interval = setInterval(loadStatus, 2000);
        return () => clearInterval(interval);
    }, [clientSlug]);

    const loadStatus = () => {
        const status = getSyncStatus(clientSlug);
        setSyncStatus(status);
    };

    const handlePublish = async () => {
        if (!syncStatus.readyToPublish) {
            alert("Please save at least one section before publishing!");
            return;
        }

        const confirmPublish = window.confirm(
            `Are you sure you want to publish all ${syncStatus.totalSections} section(s) to the server?`,
        );

        if (!confirmPublish) return;

        setPublishing(true);
        setPublishResult(null);

        try {
            const result = await publishAllSections(clientSlug);
            setPublishResult(result);
            loadStatus(); // Refresh status after publish

            if (result.success && onPublishSuccess) {
                onPublishSuccess(result);
            }

            // Auto-hide success message after 10 seconds
            setTimeout(() => {
                setPublishResult(null);
            }, 10000);
        } catch (error) {
            setPublishResult({
                success: false,
                message: error.message || "Failed to publish",
            });
        } finally {
            setPublishing(false);
        }
    };

    const handleClear = () => {
        const confirmClear = window.confirm(
            "⚠️ WARNING: This will delete all saved data from local storage!\n\nAre you absolutely sure?",
        );

        if (confirmClear) {
            const doubleConfirm = window.confirm(
                "This action cannot be undone. Click OK to proceed with deletion.",
            );

            if (doubleConfirm) {
                clearAllData(clientSlug);
                loadStatus();
                setPublishResult({
                    success: true,
                    message: "All local data cleared successfully",
                });

                setTimeout(() => {
                    setPublishResult(null);
                }, 5000);
            }
        }
    };

    if (!syncStatus) return null;

    const getStatusColor = (status) => {
        if (!status.exists) return "text-gray-400";
        return status.synced ? "text-green-500" : "text-yellow-500";
    };

    const getStatusIcon = (status) => {
        if (!status.exists) return "⚪";
        return status.synced ? "✅" : "⏳";
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaDatabase />
                Publish Control Panel
            </h2>

            {/* Overall Progress */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                        Overall Progress
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                        {syncStatus.totalSections} section
                        {syncStatus.totalSections !== 1 ? "s" : ""} saved
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{
                            width: `${syncStatus.totalSections > 0 ? 100 : 0}%`,
                        }}
                    />
                </div>
            </div>

            {/* Sync Status */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                        Sync Status
                    </span>
                    <span
                        className={`text-sm font-bold ${
                            syncStatus.allSynced
                                ? "text-green-600"
                                : "text-yellow-600"
                        }`}
                    >
                        {syncStatus.syncedSections}/{syncStatus.totalSections}{" "}
                        synced
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                            syncStatus.allSynced
                                ? "bg-gradient-to-r from-green-500 to-green-600"
                                : "bg-gradient-to-r from-yellow-500 to-orange-600"
                        }`}
                        style={{
                            width: `${
                                syncStatus.totalSections > 0
                                    ? (syncStatus.syncedSections /
                                          syncStatus.totalSections) *
                                      100
                                    : 0
                            }%`,
                        }}
                    />
                </div>
            </div>

            {/* Section-wise Status */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Section Details
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {Object.entries(syncStatus.sections).map(
                        ([key, status]) => (
                            <div
                                key={key}
                                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                                    status.exists
                                        ? "bg-gray-50 border border-gray-200"
                                        : "bg-gray-50/50 border border-gray-100 opacity-50"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">
                                        {getStatusIcon(status)}
                                    </span>
                                    <div>
                                        <p
                                            className={`text-sm font-medium capitalize ${getStatusColor(status)}`}
                                        >
                                            {key.replace(
                                                /section(\d+)/,
                                                "Section $1",
                                            )}
                                        </p>
                                        {status.exists && (
                                            <p className="text-xs text-gray-500">
                                                {status.synced
                                                    ? `Synced ${new Date(status.syncedAt).toLocaleString()}`
                                                    : `Saved ${new Date(status.savedAt).toLocaleString()}`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {status.exists &&
                                    (status.synced ? (
                                        <FaCheckCircle className="text-green-500 text-lg" />
                                    ) : (
                                        <FaClock className="text-yellow-500 text-lg" />
                                    ))}
                            </div>
                        ),
                    )}
                </div>
            </div>

            {/* Publish Result Alert */}
            {publishResult && (
                <div
                    className={`p-4 rounded-lg mb-4 border-2 animate-pulse ${
                        publishResult.success
                            ? "bg-green-50 border-green-500 text-green-800"
                            : "bg-red-50 border-red-500 text-red-800"
                    }`}
                >
                    <div className="flex items-center gap-3">
                        {publishResult.success ? (
                            <FaCheckCircle className="text-2xl" />
                        ) : (
                            <FaExclamationTriangle className="text-2xl" />
                        )}
                        <div>
                            <p className="font-bold">
                                {publishResult.success
                                    ? "✓ Success!"
                                    : "✗ Error"}
                            </p>
                            <p className="text-sm">{publishResult.message}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
                {/* Main Publish Button */}
                <button
                    onClick={handlePublish}
                    disabled={publishing || !syncStatus.readyToPublish}
                    className={`w-full py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg ${
                        syncStatus.readyToPublish && !publishing
                            ? "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    {publishing ? (
                        <>
                            <svg
                                className="animate-spin h-6 w-6"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            <span>Publishing to Server...</span>
                        </>
                    ) : (
                        <>
                            <FaSync
                                className={
                                    syncStatus.readyToPublish
                                        ? "animate-pulse"
                                        : ""
                                }
                            />
                            <span>
                                {syncStatus.readyToPublish
                                    ? `Publish All (${syncStatus.totalSections} sections)`
                                    : "No Data to Publish"}
                            </span>
                        </>
                    )}
                </button>

                {/* Clear All Button */}
                <button
                    onClick={handleClear}
                    disabled={!syncStatus.readyToPublish}
                    className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                        syncStatus.readyToPublish
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    <FaTrash />
                    Clear All Local Data
                </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <FaCheckCircle />
                    How it works:
                </h4>
                <ul className="text-xs text-blue-700 space-y-1 ml-5 list-disc">
                    <li>Fill out each component form</li>
                    <li>Click "Save" on each form (saves locally)</li>
                    <li>Once all sections are ready, click "Publish All"</li>
                    <li>All data will be sent to server in one request</li>
                    <li>Green checkmarks = synced to server ✅</li>
                    <li>Yellow clock = saved locally only ⏳</li>
                </ul>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-200">
                    <p className="text-xs text-gray-600">Total Sections</p>
                    <p className="text-2xl font-bold text-indigo-600">
                        {syncStatus.totalSections}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-gray-600">Synced</p>
                    <p className="text-2xl font-bold text-green-600">
                        {syncStatus.syncedSections}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MasterControlPanel;
