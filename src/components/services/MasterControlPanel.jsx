// import { useState, useEffect } from "react";
// import {
//     publishAllSections,
//     getSyncStatus,
//     clearAllData,
//     aggregateClientData,
// } from "../services/api";
// import {
//     FaCheckCircle,
//     FaExclamationTriangle,
//     FaTrash,
//     FaClock,
//     FaRocket,
//     FaEye,
//     FaTimes,
//     FaDesktop,
//     FaMobileAlt,
// } from "react-icons/fa";

// const MasterControlPanel = ({
//     clientSlug = "default-client",
//     onPublishSuccess,
// }) => {
//     const [syncStatus, setSyncStatus] = useState(null);
//     const [publishing, setPublishing] = useState(false);
//     const [publishResult, setPublishResult] = useState(null);
//     const [allData, setAllData] = useState(null);
//     const [showPreviewModal, setShowPreviewModal] = useState(false);
//     const [previewMode, setPreviewMode] = useState("desktop");

//     useEffect(() => {
//         loadStatus();
//         const interval = setInterval(loadStatus, 2000);
//         return () => clearInterval(interval);
//     }, [clientSlug]);

//     const loadStatus = () => {
//         const status = getSyncStatus(clientSlug);
//         const data = aggregateClientData(clientSlug);
//         setSyncStatus(status);
//         setAllData(data);
//     };

//     const handlePublish = async () => {
//         if (!syncStatus?.readyToPublish) {
//             alert("Please save at least one section before publishing!");
//             return;
//         }

//         const sectionsList = Object.keys(allData || {})
//             .map((key) => {
//                 const names = {
//                     navbar: "Navbar",
//                     section1: "Hero Section",
//                     section2: "Features Section",
//                     about: "About Section",
//                     contact: "Contact Section",
//                     footer: "Footer"
//                 };
//                 return `• ${names[key] || key}`;
//             })
//             .join("\n");

//         const confirmPublish = window.confirm(
//             `🚀 Ready to Publish!\n\nYou are about to publish:\n${sectionsList}\n\nTotal: ${syncStatus.totalSections} section(s)\n\nProceed?`,
//         );

//         if (!confirmPublish) return;

//         setPublishing(true);
//         setPublishResult(null);

//         try {
//             const result = await publishAllSections(clientSlug);
//             setPublishResult(result);
//             loadStatus();

//             if (result.success && onPublishSuccess) {
//                 onPublishSuccess(result);
//             }

//             setTimeout(() => {
//                 setPublishResult(null);
//             }, 10000);
//         } catch (error) {
//             setPublishResult({
//                 success: false,
//                 message: error.message || "Failed to publish",
//             });
//         } finally {
//             setPublishing(false);
//         }
//     };

//     const handlePreview = () => {
//         if (Object.keys(allData || {}).length === 0) {
//             alert("No saved data to preview. Please save at least one section first.");
//             return;
//         }
//         setShowPreviewModal(true);
//     };

//     const handleClear = () => {
//         const confirmClear = window.confirm(
//             "⚠️ WARNING: This will delete all saved data from local storage!\n\nAre you absolutely sure?",
//         );

//         if (confirmClear) {
//             const doubleConfirm = window.confirm(
//                 "This action cannot be undone. Click OK to proceed with deletion.",
//             );

//             if (doubleConfirm) {
//                 clearAllData(clientSlug);
//                 loadStatus();
//                 setPublishResult({
//                     success: true,
//                     message:
//                         "All local data cleared successfully. Page will refresh.",
//                 });

//                 setTimeout(() => {
//                     window.location.reload();
//                 }, 2000);
//             }
//         }
//     };

//     if (!syncStatus) return null;

//     const getStatusColor = (status) => {
//         if (!status.exists) return "text-gray-400";
//         return status.synced ? "text-green-500" : "text-yellow-500";
//     };

//     const getStatusIcon = (status) => {
//         if (!status.exists) return "⚪";
//         return status.synced ? "✅" : "⏳";
//     };

//     const getSectionDisplayName = (key) => {
//         const names = {
//             navbar: "Navbar",
//             section1: "Hero Section",
//             section2: "Features Section",
//             about: "About Section",
//             contact: "Contact Section",
//             footer: "Footer"
//         };
//         return names[key] || key;
//     };

//     // Calculate total data points
//     const totalDataPoints = Object.values(allData || {}).reduce((total, section) =>
//         total + Object.keys(section || {}).length, 0);

//     // Render preview content for modal
//     const renderPreviewContent = () => {
//         return (
//             <div className="space-y-6">
//                 {/* Navbar Preview */}
//                 {allData?.navbar && (
//                     <div className="border rounded-lg overflow-hidden">
//                         <div className="bg-blue-50 px-4 py-2 border-b">
//                             <h3 className="font-semibold text-blue-800">Navbar</h3>
//                         </div>
//                         <div
//                             className="p-4"
//                             style={{
//                                 backgroundColor: allData.navbar.navbarBgColor,
//                                 color: allData.navbar.textColor
//                             }}
//                         >
//                             <div className="flex justify-between items-center">
//                                 <div className="flex items-center gap-3">
//                                     {allData.navbar.logo && (
//                                         <img src={allData.navbar.logo} alt="Logo" className="w-10 h-10 rounded" />
//                                     )}
//                                     <span className="font-bold">{allData.navbar.companyName}</span>
//                                 </div>
//                                 <div className="flex gap-4">
//                                     {allData.navbar.navLinks?.slice(0, 3).map((link, idx) => (
//                                         <span key={idx} className="text-sm">{link.label}</span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Hero Section Preview */}
//                 {allData?.section1 && (
//                     <div className="border rounded-lg overflow-hidden">
//                         <div className="bg-purple-50 px-4 py-2 border-b">
//                             <h3 className="font-semibold text-purple-800">Hero Section</h3>
//                         </div>
//                         <div
//                             className="p-6"
//                             style={{
//                                 backgroundColor: allData.section1.backgroundColor,
//                                 color: allData.section1.textColor
//                             }}
//                         >
//                             <h1 className="text-2xl font-bold mb-4">{allData.section1.companyName}</h1>
//                             <p className="mb-4">{allData.section1.sectioncontent1?.substring(0, 200)}...</p>
//                             {allData.section1.bgimg && (
//                                 <img src={allData.section1.bgimg} alt="Hero" className="w-full h-48 object-cover rounded" />
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Features Section Preview (Section 2) */}
//                 {allData?.section2 && (
//                     <div className="border rounded-lg overflow-hidden">
//                         <div className="bg-green-50 px-4 py-2 border-b">
//                             <h3 className="font-semibold text-green-800">Features Section</h3>
//                         </div>
//                         <div
//                             className="p-6"
//                             style={{
//                                 backgroundColor: allData.section2.backgroundColor,
//                                 color: allData.section2.textColor
//                             }}
//                         >
//                             <h2 className="text-xl font-bold mb-4">Features</h2>
//                             <div className="grid grid-cols-2 gap-4">
//                                 {allData.section2.whyChooseUs?.slice(0, 4).map((item, idx) => (
//                                     <div key={idx} className="border rounded p-3">
//                                         <h3 className="font-semibold">{item.title}</h3>
//                                         <p className="text-sm">{item.description}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* About Section Preview */}
//                 {allData?.about && (
//                     <div className="border rounded-lg overflow-hidden">
//                         <div className="bg-yellow-50 px-4 py-2 border-b">
//                             <h3 className="font-semibold text-yellow-800">About Section</h3>
//                         </div>
//                         <div className="p-6">
//                             <h2 className="text-xl font-bold mb-4">About Us</h2>
//                             <p>{allData.about.content?.substring(0, 300) || "No about content"}</p>
//                         </div>
//                     </div>
//                 )}

//                 {/* Contact Section Preview */}
//                 {allData?.contact && (
//                     <div className="border rounded-lg overflow-hidden">
//                         <div className="bg-red-50 px-4 py-2 border-b">
//                             <h3 className="font-semibold text-red-800">Contact Section</h3>
//                         </div>
//                         <div className="p-6">
//                             <h2 className="text-xl font-bold mb-4">Contact Information</h2>
//                             <div className="space-y-2">
//                                 {allData.contact.email && <p>📧 {allData.contact.email}</p>}
//                                 {allData.contact.phone && <p>📞 {allData.contact.phone}</p>}
//                                 {allData.contact.address && <p>📍 {allData.contact.address}</p>}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Footer Preview */}
//                 {allData?.footer && (
//                     <div className="border rounded-lg overflow-hidden">
//                         <div className="bg-indigo-50 px-4 py-2 border-b">
//                             <h3 className="font-semibold text-indigo-800">Footer</h3>
//                         </div>
//                         <div
//                             className="p-6"
//                             style={{
//                                 backgroundColor: allData.footer.backgroundColor,
//                                 color: allData.footer.textColor
//                             }}
//                         >
//                             <div className="flex justify-between">
//                                 <span>{allData.footer.companyName}</span>
//                                 <div className="flex gap-4">
//                                     {allData.footer.socialLinks?.map((social, idx) => (
//                                         <span key={idx}>{social.platform}</span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <>
//             <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                     <FaRocket className="text-indigo-600" />
//                     Publish Control Panel
//                 </h2>

//                 {/* Overall Progress */}
//                 <div className="mb-6">
//                     <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-semibold text-gray-700">
//                             Overall Progress
//                         </span>
//                         <span className="text-sm font-bold text-indigo-600">
//                             {syncStatus.totalSections} of 6 sections saved
//                         </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                         <div
//                             className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
//                             style={{
//                                 width: `${(syncStatus.totalSections / 6) * 100}%`,
//                             }}
//                         />
//                     </div>
//                 </div>

//                 {/* Section-wise Status */}
//                 <div className="mb-6">
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3">
//                         All Sections Status
//                     </h3>
//                     <div className="space-y-2 max-h-80 overflow-y-auto">
//                         {Object.entries(syncStatus.sections).map(
//                             ([key, status]) => (
//                                 <div
//                                     key={key}
//                                     className={`flex items-center justify-between p-3 rounded-lg transition-all ${
//                                         status.exists
//                                             ? "bg-gradient-to-r from-green-50 to-blue-50 border border-green-200"
//                                             : "bg-gray-50/50 border border-gray-100 opacity-50"
//                                     }`}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <span className="text-2xl">
//                                             {getStatusIcon(status)}
//                                         </span>
//                                         <div>
//                                             <p
//                                                 className={`text-sm font-medium ${getStatusColor(status)}`}
//                                             >
//                                                 {getSectionDisplayName(key)}
//                                             </p>
//                                             {status.exists && (
//                                                 <p className="text-xs text-gray-500">
//                                                     {status.synced
//                                                         ? `Synced ${new Date(status.syncedAt).toLocaleTimeString()}`
//                                                         : `Saved ${new Date(status.savedAt).toLocaleTimeString()}`}
//                                                 </p>
//                                             )}
//                                         </div>
//                                     </div>
//                                     {status.exists &&
//                                         (status.synced ? (
//                                             <FaCheckCircle className="text-green-500 text-xl" />
//                                         ) : (
//                                             <FaClock className="text-yellow-500 text-xl animate-pulse" />
//                                         ))}
//                                 </div>
//                             ),
//                         )}
//                     </div>
//                 </div>

//                 {/* Publish Result Alert */}
//                 {publishResult && (
//                     <div
//                         className={`p-4 rounded-lg mb-4 border-2 ${
//                             publishResult.success
//                                 ? "bg-green-50 border-green-500 text-green-800 animate-bounce"
//                                 : "bg-red-50 border-red-500 text-red-800 animate-shake"
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             {publishResult.success ? (
//                                 <FaCheckCircle className="text-3xl" />
//                             ) : (
//                                 <FaExclamationTriangle className="text-3xl" />
//                             )}
//                             <div>
//                                 <p className="font-bold text-lg">
//                                     {publishResult.success
//                                         ? "🎉 Published Successfully!"
//                                         : "❌ Publish Failed"}
//                                 </p>
//                                 <p className="text-sm">{publishResult.message}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                     {/* Preview Button */}
//                     <button
//                         onClick={handlePreview}
//                         disabled={!syncStatus.readyToPublish}
//                         className={`w-full py-3 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg ${
//                             syncStatus.readyToPublish
//                                 ? "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
//                                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         }`}
//                     >
//                         <FaEye className="text-xl" />
//                         <span>
//                             Preview Website ({Object.keys(allData || {}).length}/6 sections)
//                         </span>
//                     </button>

//                     {/* Main Publish Button */}
//                     <button
//                         onClick={handlePublish}
//                         disabled={publishing || !syncStatus.readyToPublish}
//                         className={`w-full py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-lg ${
//                             syncStatus.readyToPublish && !publishing
//                                 ? "bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 hover:from-green-600 hover:via-blue-700 hover:to-purple-700 text-white animate-pulse"
//                                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         }`}
//                     >
//                         {publishing ? (
//                             <>
//                                 <svg
//                                     className="animate-spin h-6 w-6"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <circle
//                                         className="opacity-25"
//                                         cx="12"
//                                         cy="12"
//                                         r="10"
//                                         stroke="currentColor"
//                                         strokeWidth="4"
//                                         fill="none"
//                                     />
//                                     <path
//                                         className="opacity-75"
//                                         fill="currentColor"
//                                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                     />
//                                 </svg>
//                                 <span>Publishing to Server...</span>
//                             </>
//                         ) : (
//                             <>
//                                 <FaRocket className="text-2xl" />
//                                 <span>
//                                     {syncStatus.readyToPublish
//                                         ? `🚀 PUBLISH ALL (${syncStatus.totalSections} sections)`
//                                         : "No Data to Publish"}
//                                 </span>
//                             </>
//                         )}
//                     </button>

//                     {/* Clear All Button */}
//                     <button
//                         onClick={handleClear}
//                         disabled={!syncStatus.readyToPublish}
//                         className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
//                             syncStatus.readyToPublish
//                                 ? "bg-red-500 hover:bg-red-600 text-white"
//                                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         }`}
//                     >
//                         <FaTrash />
//                         Clear All Local Data
//                     </button>
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="mt-6 grid grid-cols-3 gap-3">
//                     <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-lg border-2 border-indigo-200">
//                         <p className="text-xs text-gray-600 font-semibold">
//                             Sections Saved
//                         </p>
//                         <p className="text-2xl font-bold text-indigo-600">
//                             {syncStatus.totalSections}/6
//                         </p>
//                     </div>
//                     <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg border-2 border-blue-200">
//                         <p className="text-xs text-gray-600 font-semibold">
//                             Data Points
//                         </p>
//                         <p className="text-2xl font-bold text-blue-600">
//                             {totalDataPoints}
//                         </p>
//                     </div>
//                     <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-200">
//                         <p className="text-xs text-gray-600 font-semibold">
//                             Ready to Publish
//                         </p>
//                         <p className="text-2xl font-bold text-green-600">
//                             {syncStatus.readyToPublish ? "YES ✅" : "NO ⚪"}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Info Box */}
//                 <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg">
//                     <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
//                         <FaCheckCircle />
//                         6-Section Publishing Workflow:
//                     </h4>
//                     <ol className="text-xs text-blue-800 space-y-1 ml-5 list-decimal">
//                         <li>Fill out all 6 section forms</li>
//                         <li>Click "Save" on each form</li>
//                         <li>Review using "Preview Website"</li>
//                         <li>Click "🚀 PUBLISH ALL"</li>
//                         <li>All 6 sections sent to server!</li>
//                     </ol>
//                 </div>
//             </div>

//             {/* Preview Modal */}
//             {showPreviewModal && (
//                 <div className="fixed inset-0 bg-black/90 flex flex-col z-[100] animate-fadeIn">
//                     {/* Modal Header */}
//                     <div className="bg-gradient-to-r from-gray-900 to-black p-4 text-white border-b border-gray-800">
//                         <div className="flex justify-between items-center">
//                             <div className="flex items-center gap-3">
//                                 <FaEye className="text-2xl" />
//                                 <div>
//                                     <h2 className="text-2xl font-bold">Full Website Preview</h2>
//                                     <p className="text-sm text-gray-300">
//                                         Previewing all 6 saved sections together
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 {/* View Mode Toggle */}
//                                 <div className="flex bg-gray-800 rounded-lg p-1">
//                                     <button
//                                         onClick={() => setPreviewMode("desktop")}
//                                         className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${
//                                             previewMode === "desktop"
//                                                 ? "bg-indigo-600 text-white"
//                                                 : "text-gray-300 hover:bg-gray-700"
//                                         }`}
//                                     >
//                                         <FaDesktop />
//                                         Desktop
//                                     </button>
//                                     <button
//                                         onClick={() => setPreviewMode("mobile")}
//                                         className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${
//                                             previewMode === "mobile"
//                                                 ? "bg-indigo-600 text-white"
//                                                 : "text-gray-300 hover:bg-gray-700"
//                                         }`}
//                                     >
//                                         <FaMobileAlt />
//                                         Mobile
//                                     </button>
//                                 </div>

//                                 <button
//                                     onClick={() => setShowPreviewModal(false)}
//                                     className="text-white hover:text-gray-300 p-2 rounded-full hover:bg-gray-800 transition"
//                                 >
//                                     <FaTimes className="text-2xl" />
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Stats Bar */}
//                         <div className="flex gap-4 mt-3 text-sm text-gray-300">
//                             <span className="font-semibold">Client:</span> {clientSlug}
//                             <span className="font-semibold">Sections:</span> {Object.keys(allData || {}).length}/6
//                             <span className="font-semibold">Data Points:</span> {totalDataPoints}
//                             <span className="font-semibold">View:</span> {previewMode}
//                         </div>
//                     </div>

//                     {/* Preview Content - Fullscreen */}
//                     <div className="flex-1 overflow-hidden">
//                         <div className={`h-full ${previewMode === "desktop" ? "" : "flex items-center justify-center"}`}>
//                             <div
//                                 className={`h-full overflow-auto bg-gray-100 p-4 ${
//                                     previewMode === "mobile"
//                                         ? "w-full max-w-md"
//                                         : ""
//                                 }`}
//                             >
//                                 {renderPreviewContent()}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Modal Footer */}
//                     <div className="bg-gray-900 p-4 border-t border-gray-800 text-white">
//                         <div className="flex justify-between items-center">
//                             <div className="text-sm text-gray-300">
//                                 Previewing {Object.keys(allData || {}).length} of 6 sections.
//                                 <span className="text-green-400 ml-2">
//                                     All changes are saved locally until you click "PUBLISH ALL".
//                                 </span>
//                             </div>
//                             <div className="flex gap-3">
//                                 <button
//                                     onClick={() => setShowPreviewModal(false)}
//                                     className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
//                                 >
//                                     Close Preview
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default MasterControlPanel;

import { useState } from "react";
import { useWebsiteData } from "../../context/WebsiteDataContext";
import { publishAllSections } from "../services/api";
import { FaRocket, FaTrash, FaEye } from "react-icons/fa";

const MasterControlPanel = ({ onPublishSuccess }) => {
    const { getAllData, getSectionCount, clearAllData, clientSlug } =
        useWebsiteData();
    const [publishing, setPublishing] = useState(false);

    const handlePublish = async () => {
        const allData = getAllData();
        const sectionCount = getSectionCount();

        if (sectionCount === 0) {
            alert(
                "❌ No sections saved! Please save at least one section first.",
            );
            return;
        }

        const confirm = window.confirm(
            `🚀 Ready to Publish!\n\n` +
                `Sections to publish: ${sectionCount}/6\n` +
                `Sections: ${Object.keys(allData).join(", ")}\n\n` +
                `Proceed?`,
        );

        if (!confirm) return;

        setPublishing(true);

        try {
            const result = await publishAllSections(clientSlug, allData);

            if (result.success) {
                alert(`✅ Success! All ${sectionCount} sections published!`);
                if (onPublishSuccess) {
                    onPublishSuccess(result);
                }
            } else {
                alert(`❌ Publish failed: ${result.message}`);
            }
        } catch (error) {
            alert(`❌ Error: ${error.message}`);
        } finally {
            setPublishing(false);
        }
    };

    const handleClear = () => {
        const confirm = window.confirm(
            "⚠️ WARNING: This will delete all saved data!\n\nAre you sure?",
        );

        if (confirm) {
            clearAllData();
            alert("✅ All data cleared!");
            setTimeout(() => window.location.reload(), 1000);
        }
    };

    const sectionCount = getSectionCount();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaRocket className="text-indigo-600" />
                Publish Control Panel
            </h2>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                        Progress
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                        {sectionCount}/6 sections saved
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(sectionCount / 6) * 100}%` }}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                {/* Publish Button */}
                <button
                    onClick={handlePublish}
                    disabled={publishing || sectionCount === 0}
                    className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                        sectionCount > 0 && !publishing
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    {publishing ? (
                        <>
                            <span className="animate-spin">⏳</span>
                            <span>Publishing...</span>
                        </>
                    ) : (
                        <>
                            <FaRocket />
                            <span>
                                🚀 PUBLISH ALL ({sectionCount} sections)
                            </span>
                        </>
                    )}
                </button>

                {/* Clear Button */}
                <button
                    onClick={handleClear}
                    disabled={sectionCount === 0}
                    className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                        sectionCount > 0
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    <FaTrash />
                    Clear All Data
                </button>
            </div>

           
        </div>
    );
};

export default MasterControlPanel;
