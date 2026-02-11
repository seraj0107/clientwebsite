// import { useState } from "react";
// import { useWebsiteData } from "../../context/WebsiteDataContext";
// import { publishAllSections } from "../services/api";
// import { FaRocket, FaTrash, FaEye } from "react-icons/fa";

// const MasterControlPanel = ({ onPublishSuccess }) => {
//     const { getAllData, getSectionCount, clearAllData, clientSlug } =
//         useWebsiteData();
//     const [publishing, setPublishing] = useState(false);

//     const handlePublish = async () => {
//         const allData = getAllData();
//         const sectionCount = getSectionCount();

//         if (sectionCount === 0) {
//             alert(
//                 "❌ No sections saved! Please save at least one section first.",
//             );
//             return;
//         }

//         const confirm = window.confirm(
//             `🚀 Ready to Publish!\n\n` +
//                 `Sections to publish: ${sectionCount}/6\n` +
//                 `Sections: ${Object.keys(allData).join(", ")}\n\n` +
//                 `Proceed?`,
//         );

//         if (!confirm) return;

//         setPublishing(true);

//         try {
//             const result = await publishAllSections(clientSlug, allData);

//             if (result.success) {
//                 alert(`✅ Success! All ${sectionCount} sections published!`);
//                 if (onPublishSuccess) {
//                     onPublishSuccess(result);
//                 }
//             } else {
//                 alert(`❌ Publish failed: ${result.message}`);
//             }
//         } catch (error) {
//             alert(`❌ Error: ${error.message}`);
//         } finally {
//             setPublishing(false);
//         }
//     };

//     const handleClear = () => {
//         const confirm = window.confirm(
//             "⚠️ WARNING: This will delete all saved data!\n\nAre you sure?",
//         );

//         if (confirm) {
//             clearAllData();
//             alert("✅ All data cleared!");
//             setTimeout(() => window.location.reload(), 1000);
//         }
//     };

//     const sectionCount = getSectionCount();

//     return (
//         <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                 <FaRocket className="text-indigo-600" />
//                 Publish Control Panel
//             </h2>

//             {/* Progress Bar */}
//             <div className="mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-semibold text-gray-700">
//                         Progress
//                     </span>
//                     <span className="text-sm font-bold text-indigo-600">
//                         {sectionCount}/6 sections saved
//                     </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-3">
//                     <div
//                         className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
//                         style={{ width: `${(sectionCount / 6) * 100}%` }}
//                     />
//                 </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3">
//                 {/* Publish Button */}
//                 <button
//                     onClick={handlePublish}
//                     disabled={publishing || sectionCount === 0}
//                     className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
//                         sectionCount > 0 && !publishing
//                             ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
//                             : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                 >
//                     {publishing ? (
//                         <>
//                             <span className="animate-spin">⏳</span>
//                             <span>Publishing...</span>
//                         </>
//                     ) : (
//                         <>
//                             <FaRocket />
//                             <span>
//                                 🚀 PUBLISH ALL ({sectionCount} sections)
//                             </span>
//                         </>
//                     )}
//                 </button>

//                 {/* Clear Button */}
//                 <button
//                     onClick={handleClear}
//                     disabled={sectionCount === 0}
//                     className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
//                         sectionCount > 0
//                             ? "bg-red-500 hover:bg-red-600 text-white"
//                             : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                 >
//                     <FaTrash />
//                     Clear All Data
//                 </button>
//             </div>

//         </div>
//     );
// };

// export default MasterControlPanel;

// components/MasterControlPanel.jsx - Fixed Preview


import { useState } from "react";
import { useWebsiteData } from "../../context/WebsiteDataContext";
import { publishAllSections } from "../services/api";
import {
    FaRocket,
    FaEye,
    FaEyeSlash,
    FaDesktop,
    FaMobileAlt,
    FaCheckCircle,
    FaClock,
    FaSpinner,
    FaExclamationTriangle,
    FaInfoCircle,
} from "react-icons/fa";

const MasterControlPanel = ({ onPublishSuccess }) => {
    const { getAllData, getSectionCount, clearAllData, clientSlug } =
        useWebsiteData();
    const [publishing, setPublishing] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState("desktop");
    const [publishStatus, setPublishStatus] = useState(null);
    const allDatat = getAllData();
    console.log("showing the all data", allDatat);

    const handlePublish = async () => {
        const allData = getAllData();
        const sectionCount = getSectionCount();

        if (sectionCount === 0) {
            alert(
                "❌ No sections saved! Please save at least one section first.",
            );
            return;
        }

        const sectionsList = Object.keys(allData)
            .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
            .join(", ");

        const confirm = window.confirm(
            `🚀 Ready to Publish!\n\n` +
                `Client: ${clientSlug}\n` +
                `Sections: ${sectionCount}/6\n` +
                `Components: ${sectionsList}\n\n` +
                `Proceed with publishing?`,
        );

        if (!confirm) return;

        setPublishing(true);
        setPublishStatus(null);

        try {
            const result = await publishAllSections(clientSlug, allData);

            if (result.success) {
                setPublishStatus("success");

                setTimeout(() => {
                    clearAllData();

                    if (onPublishSuccess) {
                        onPublishSuccess(result);
                    }

                    alert(
                        `✅ SUCCESS!\n\nAll ${sectionCount} sections published successfully!\nLocal storage has been cleared.\n\nPage will reload now.`,
                    );

                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }, 1000);
            } else {
                setPublishStatus("error");
                alert(`❌ Publish Failed!\n\n${result.message}`);
                setTimeout(() => setPublishStatus(null), 5000);
            }
        } catch (error) {
            setPublishStatus("error");
            alert(`❌ Error!\n\n${error.message}`);
            setTimeout(() => setPublishStatus(null), 5000);
        } finally {
            setPublishing(false);
        }
    };

    const sectionCount = getSectionCount();
    const allData = getAllData();
    const hasData = sectionCount > 0;

    // Calculate missing sections
    const missingSections = [
        "navbar",
        "section1",
        "section2",
        "about",
        "contact",
        "footer",
    ].filter((section) => !allData[section]);

    return (
        <div className="space-y-6">
            {/* Main Control Panel */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 sticky top-4 border border-gray-200">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
                        <FaRocket className="text-white text-2xl" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Publish Control Panel
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Client:{" "}
                        <span className="font-semibold text-indigo-600">
                            {clientSlug}
                        </span>
                    </p>
                </div>

                {/* Progress Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                            Completion Status
                        </span>
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-2xl font-black ${
                                    sectionCount === 0
                                        ? "text-gray-400"
                                        : sectionCount < 3
                                          ? "text-yellow-500"
                                          : sectionCount < 6
                                            ? "text-blue-500"
                                            : "text-green-500"
                                }`}
                            >
                                {sectionCount}
                            </span>
                            <span className="text-gray-400 font-bold">/</span>
                            <span className="text-xl text-gray-600 font-bold">
                                6
                            </span>
                        </div>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ease-out ${
                                sectionCount === 0
                                    ? "bg-gray-400"
                                    : sectionCount < 3
                                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                                      : sectionCount < 6
                                        ? "bg-gradient-to-r from-blue-400 to-indigo-500"
                                        : "bg-gradient-to-r from-green-400 to-emerald-500"
                            }`}
                            style={{ width: `${(sectionCount / 6) * 100}%` }}
                        >
                            {sectionCount > 0 && (
                                <div className="w-full h-full bg-white/30 animate-pulse"></div>
                            )}
                        </div>

                        {sectionCount > 0 && (
                            <div
                                className="absolute top-0 right-2 h-full flex items-center"
                                style={{
                                    left: `${Math.min((sectionCount / 6) * 100, 85)}%`,
                                }}
                            >
                                <span className="text-xs font-bold text-white drop-shadow-lg">
                                    {Math.round((sectionCount / 6) * 100)}%
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mt-3 text-center">
                        {sectionCount === 0 && (
                            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                                <FaClock className="animate-pulse" />
                                No sections saved yet
                            </p>
                        )}
                        {sectionCount > 0 && sectionCount < 6 && (
                            <p className="text-sm text-blue-600 flex items-center justify-center gap-2">
                                <FaClock className="animate-pulse" />
                                {6 - sectionCount} more section
                                {6 - sectionCount > 1 ? "s" : ""} to complete
                            </p>
                        )}
                        {sectionCount === 6 && (
                            <p className="text-sm text-green-600 font-semibold flex items-center justify-center gap-2">
                                <FaCheckCircle className="animate-bounce" />
                                All sections completed! Ready to publish
                            </p>
                        )}
                    </div>

                    {/* Missing Sections Warning */}
                    {sectionCount > 0 && sectionCount < 6 && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                            <div className="flex items-start gap-3">
                                <FaExclamationTriangle className="text-yellow-600 text-xl mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-yellow-800 mb-2">
                                        Missing Sections ({6 - sectionCount})
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {missingSections.map((section) => (
                                            <span
                                                key={section}
                                                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold border border-yellow-300"
                                            >
                                                {section
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    section.slice(1)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Publish Status Alert */}
                {publishStatus && (
                    <div
                        className={`mb-6 p-4 rounded-xl border-2 animate-pulse ${
                            publishStatus === "success"
                                ? "bg-green-50 border-green-500"
                                : "bg-red-50 border-red-500"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {publishStatus === "success" ? (
                                <>
                                    <FaCheckCircle className="text-green-500 text-3xl" />
                                    <div>
                                        <p className="font-bold text-green-800 text-lg">
                                            🎉 Published Successfully!
                                        </p>
                                        <p className="text-sm text-green-700">
                                            Clearing local storage and
                                            reloading...
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-red-500 text-3xl">
                                        ❌
                                    </div>
                                    <div>
                                        <p className="font-bold text-red-800 text-lg">
                                            Publish Failed
                                        </p>
                                        <p className="text-sm text-red-700">
                                            Please try again
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Buttons - Fixed with better layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Preview Button */}
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        disabled={!hasData}
                        className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all transform ${
                            hasData
                                ? showPreview
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {showPreview ? (
                            <>
                                <FaEyeSlash className="text-xl" />
                                <span className="whitespace-nowrap">
                                    Hide Preview
                                </span>
                            </>
                        ) : (
                            <>
                                <FaEye className="text-xl" />
                                <span className="whitespace-nowrap">
                                    Show Preview
                                </span>
                            </>
                        )}
                    </button>

                    {/* Publish Button */}
                    <button
                        onClick={handlePublish}
                        disabled={publishing || sectionCount === 0}
                        className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all transform ${
                            sectionCount > 0 && !publishing
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {publishing ? (
                            <>
                                <FaSpinner className="animate-spin text-xl" />
                                <span>Publishing...</span>
                            </>
                        ) : (
                            <>
                                <FaRocket className="text-xl" />
                                <span className="whitespace-nowrap">
                                    {sectionCount > 0
                                        ? `Publish (${sectionCount})`
                                        : "No Data"}
                                </span>
                            </>
                        )}
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-200 shadow-md hover:shadow-lg transition-shadow">
                        <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-1">
                            Saved Sections
                        </p>
                        <p className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {sectionCount}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">of 6 total</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
                        <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-1">
                            Status
                        </p>
                        <p className="text-2xl font-black">
                            {sectionCount > 0 ? "✅ READY" : "⚪ WAITING"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {sectionCount > 0
                                ? "Can publish"
                                : "Save data first"}
                        </p>
                    </div>
                </div>

                {/* Saved Components List */}
                {hasData && (
                    <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">
                            Saved Components
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(allData).map((key) => (
                                <span
                                    key={key}
                                    className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold border border-green-300 flex items-center gap-1"
                                >
                                    <FaCheckCircle className="text-green-500" />
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Improved Preview Section */}
            {showPreview && hasData && (
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-fadeIn">
                    {/* Preview Header */}
                    <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-black text-white flex items-center justify-center md:justify-start gap-3 mb-2">
                                    <FaEye className="text-4xl" />
                                    Complete Website Preview
                                </h2>
                                <p className="text-white/90 text-sm font-medium">
                                    Review all sections before publishing •
                                    Client:{" "}
                                    <span className="font-bold">
                                        {clientSlug}
                                    </span>
                                </p>
                            </div>

                            {/* Device Toggle - Better styled buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setPreviewMode("desktop")}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform shadow-md ${
                                        previewMode === "desktop"
                                            ? "bg-white text-blue-600 shadow-lg scale-105"
                                            : "bg-white/20 text-white hover:bg-white/30 hover:scale-105"
                                    }`}
                                >
                                    <FaDesktop className="text-xl" /> Desktop
                                </button>
                                <button
                                    onClick={() => setPreviewMode("mobile")}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform shadow-md ${
                                        previewMode === "mobile"
                                            ? "bg-white text-blue-600 shadow-lg scale-105"
                                            : "bg-white/20 text-white hover:bg-white/30 hover:scale-105"
                                    }`}
                                >
                                    <FaMobileAlt className="text-xl" /> Mobile
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Preview Content */}
                    <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-100">
                        <div
                            className={`transition-all duration-500 ${
                                previewMode === "mobile"
                                    ? "max-w-md mx-auto"
                                    : "max-w-full"
                            }`}
                        >
                            {/* Preview Container with better styling */}
                            <div className="relative">
                                {/* Browser/Device Frame */}
                                <div
                                    className={`${previewMode === "mobile" ? "rounded-[40px] border-8 border-gray-900" : "rounded-t-2xl border-2 border-gray-300"} overflow-hidden shadow-2xl bg-white mb-8`}
                                >
                                    {/* Browser Top Bar for Desktop */}
                                    {previewMode === "desktop" && (
                                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-3 flex items-center gap-3">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            </div>
                                            <div className="flex-1 bg-gray-700 text-gray-300 text-sm py-1 px-4 rounded-lg truncate">
                                                {clientSlug}.example.com
                                            </div>
                                        </div>
                                    )}

                                    {/* Mobile Status Bar */}
                                    {previewMode === "mobile" && (
                                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 flex justify-between items-center">
                                            <div className="text-white text-sm font-semibold">
                                                {new Date().getHours()}:
                                                {new Date()
                                                    .getMinutes()
                                                    .toString()
                                                    .padStart(2, "0")}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="text-white text-xs">
                                                    📶
                                                </div>
                                                <div className="text-white text-xs">
                                                    🔋
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navbar Preview */}
                                    {allData.navbar && (
                                        <div
                                            style={{
                                                backgroundColor:
                                                    allData.navbar
                                                        .navbarBgColor ||
                                                    "#0f172a",
                                                color:
                                                    allData.navbar.textColor ||
                                                    "#ffffff",
                                            }}
                                            className={`${previewMode === "mobile" ? "px-4 py-3" : "px-8 py-5"}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    {allData.navbar.logo && (
                                                        <img
                                                            src={
                                                                allData.navbar
                                                                    .logo
                                                            }
                                                            alt="Logo"
                                                            className="w-10 h-10 rounded-full object-contain ring-2 ring-white/30"
                                                        />
                                                    )}
                                                    <span
                                                        className={`font-bold ${previewMode === "mobile" ? "text-sm" : "text-lg"}`}
                                                    >
                                                        {allData.navbar
                                                            .companyName ||
                                                            "Company Name"}
                                                    </span>
                                                </div>
                                                {previewMode === "desktop" && (
                                                    <div className="flex gap-6">
                                                        {allData.navbar.navLinks?.map(
                                                            (link, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-sm font-medium hover:opacity-80 cursor-pointer transition-opacity"
                                                                >
                                                                    {link.label}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Section 1 Preview - Fixed layout */}
                                    {allData.section1 && (
                                        <div
                                            style={{
                                                backgroundColor:
                                                    allData.section1
                                                        .backgroundColor ||
                                                    "#0f172a",
                                                color:
                                                    allData.section1
                                                        .textColor || "#ffffff",
                                            }}
                                            className={
                                                previewMode === "mobile"
                                                    ? "p-6"
                                                    : "p-12"
                                            }
                                        >
                                            <div
                                                className={`grid ${previewMode === "desktop" ? "grid-cols-2 gap-12" : "grid-cols-1 gap-8"} items-center`}
                                            >
                                                <div className="space-y-4">
                                                    <h1
                                                        className={`font-black ${previewMode === "mobile" ? "text-2xl" : "text-4xl"}`}
                                                        style={{
                                                            background: `linear-gradient(to right, ${allData.section1.gradientFrom || "#f97316"}, ${allData.section1.gradientTo || "#eab308"})`,
                                                            WebkitBackgroundClip:
                                                                "text",
                                                            WebkitTextFillColor:
                                                                "transparent",
                                                        }}
                                                    >
                                                        {allData.section1
                                                            .companyName ||
                                                            "Company Name"}
                                                    </h1>
                                                    <p
                                                        className={`opacity-90 ${previewMode === "mobile" ? "text-sm" : "text-base"}`}
                                                    >
                                                        {allData.section1.sectioncontent1?.substring(
                                                            0,
                                                            150,
                                                        ) || "Content preview"}
                                                        ...
                                                    </p>
                                                    <div className="flex flex-wrap gap-4 text-sm font-medium">
                                                        {allData.section1
                                                            .email && (
                                                            <span className="flex items-center gap-2">
                                                                <span>📧</span>
                                                                {
                                                                    allData
                                                                        .section1
                                                                        .email
                                                                }
                                                            </span>
                                                        )}
                                                        {allData.section1
                                                            .phone && (
                                                            <span className="flex items-center gap-2">
                                                                <span>📞</span>
                                                                {
                                                                    allData
                                                                        .section1
                                                                        .phone
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {allData.section1.bgimg && (
                                                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                                                        <img
                                                            src={
                                                                allData.section1
                                                                    .bgimg
                                                            }
                                                            alt="Hero"
                                                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Add other sections here similarly... */}

                                    {/* Footer Preview */}
                                    {allData.footer && (
                                        <div
                                            style={{
                                                backgroundColor:
                                                    allData.footer
                                                        .backgroundColor ||
                                                    "#1f2937",
                                                color:
                                                    allData.footer.textColor ||
                                                    "#ffffff",
                                            }}
                                            className={
                                                previewMode === "mobile"
                                                    ? "p-6"
                                                    : "p-8"
                                            }
                                        >
                                            <div
                                                className={`grid ${previewMode === "desktop" ? "grid-cols-3 gap-8" : "grid-cols-1 gap-6"}`}
                                            >
                                                <div>
                                                    {allData.footer.logo && (
                                                        <img
                                                            src={
                                                                allData.footer
                                                                    .logo
                                                            }
                                                            alt="Logo"
                                                            className={`${previewMode === "mobile" ? "w-16 h-16" : "w-20 h-20"} rounded-full mb-4 object-contain ring-2 ring-white/20`}
                                                        />
                                                    )}
                                                    <p
                                                        className={`opacity-80 ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}
                                                    >
                                                        {allData.footer
                                                            .tagline ||
                                                            "Company tagline"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4
                                                        className={`font-bold mb-3 ${previewMode === "mobile" ? "text-base" : "text-lg"}`}
                                                    >
                                                        Contact
                                                    </h4>
                                                    <div className="space-y-2 opacity-90">
                                                        {allData.footer
                                                            .email && (
                                                            <p
                                                                className={`flex items-center gap-2 ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}
                                                            >
                                                                <span>📧</span>{" "}
                                                                {
                                                                    allData
                                                                        .footer
                                                                        .email
                                                                }
                                                            </p>
                                                        )}
                                                        {allData.footer
                                                            .phone && (
                                                            <p
                                                                className={`flex items-center gap-2 ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}
                                                            >
                                                                <span>📞</span>{" "}
                                                                {
                                                                    allData
                                                                        .footer
                                                                        .phone
                                                                }
                                                            </p>
                                                        )}
                                                        {allData.footer
                                                            .address && (
                                                            <p
                                                                className={`flex items-center gap-2 ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}
                                                            >
                                                                <span>📍</span>{" "}
                                                                {
                                                                    allData
                                                                        .footer
                                                                        .address
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className={`text-center opacity-70 ${previewMode === "mobile" ? "text-xs mt-4" : "text-sm"}`}
                                                >
                                                    <p>
                                                        © 2024{" "}
                                                        {allData.footer
                                                            .companyName ||
                                                            allData.navbar
                                                                ?.companyName ||
                                                            "Company"}
                                                    </p>
                                                    <p className="mt-2">
                                                        All rights reserved
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Preview Controls */}
                                <div className="flex justify-center gap-4 mt-6">
                                    <button
                                        onClick={() =>
                                            setPreviewMode("desktop")
                                        }
                                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                            previewMode === "desktop"
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                        }`}
                                    >
                                        Desktop View
                                    </button>
                                    <button
                                        onClick={() => setPreviewMode("mobile")}
                                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                            previewMode === "mobile"
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                        }`}
                                    >
                                        Mobile View
                                    </button>
                                </div>
                            </div>

                            {/* Data Summary */}
                            <div className="mt-10 bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-lg">
                                <h4 className="font-black text-blue-900 mb-4 text-lg flex items-center gap-2">
                                    <span className="text-2xl">📊</span>
                                    Preview Data Summary
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Object.entries(allData).map(
                                        ([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow"
                                            >
                                                <FaCheckCircle className="text-blue-500 text-2xl flex-shrink-0" />
                                                <div>
                                                    <p className="font-bold text-gray-800 capitalize text-sm">
                                                        {key
                                                            .replace(
                                                                /([A-Z])/g,
                                                                " $1",
                                                            )
                                                            .trim()}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {
                                                            Object.keys(
                                                                value || {},
                                                            ).length
                                                        }{" "}
                                                        fields saved
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MasterControlPanel;
