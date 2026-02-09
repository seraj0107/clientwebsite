// import { useState, useEffect } from "react";
// import { 
//     FaEye, 
//     FaEyeSlash, 
//     FaCheckCircle,
//     FaExclamationCircle,
//     FaDesktop,
//     FaMobileAlt,
//     FaBars,
//     FaHome,
//     FaInfoCircle,
//     FaPhone,
//     FaEnvelope,
//     FaMapMarkerAlt,
//     FaFacebook,
//     FaTwitter,
//     FaInstagram,
//     FaLinkedin
// } from "react-icons/fa";
// import { getSyncStatus, aggregateClientData } from "../services/api";

// const MasterPreview = ({ clientSlug }) => {
//     const [showPreview, setShowPreview] = useState(false);
//     const [previewMode, setPreviewMode] = useState("desktop");
//     const [allData, setAllData] = useState(null);
//     const [syncStatus, setSyncStatus] = useState(null);

//     useEffect(() => {
//         loadAllData();
//         const interval = setInterval(loadAllData, 2000);
//         return () => clearInterval(interval);
//     }, [clientSlug]);

//     const loadAllData = () => {
//         const data = aggregateClientData(clientSlug);
//         const status = getSyncStatus(clientSlug);
//         setAllData(data);
//         setSyncStatus(status);
//     };

//     if (!allData || !syncStatus) return null;

//     const hasData = Object.keys(allData).length > 0;

//     const getIconForPlatform = (platform) => {
//         switch(platform.toLowerCase()) {
//             case 'facebook': return <FaFacebook />;
//             case 'twitter': return <FaTwitter />;
//             case 'instagram': return <FaInstagram />;
//             case 'linkedin': return <FaLinkedin />;
//             default: return <FaEnvelope />;
//         }
//     };

//     return (
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <h2 className="text-2xl font-bold text-white flex items-center gap-2">
//                             <FaEye />
//                             Complete Website Preview
//                         </h2>
//                         <p className="text-white/80 text-sm mt-1">
//                             Preview all 6 sections before publishing
//                         </p>
//                     </div>
                    
//                     <button
//                         onClick={() => setShowPreview(!showPreview)}
//                         disabled={!hasData}
//                         className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
//                             hasData
//                                 ? "bg-white/20 hover:bg-white/30 text-white"
//                                 : "bg-gray-400 text-gray-600 cursor-not-allowed"
//                         }`}
//                     >
//                         {showPreview ? <FaEyeSlash /> : <FaEye />}
//                         {showPreview ? "Hide" : "Show"} Preview
//                     </button>
//                 </div>
//             </div>

//             {/* Status Summary */}
//             <div className="p-6 bg-gray-50 border-b">
//                 <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//                     {[
//                         { key: "navbar", label: "Navbar", color: "blue", icon: <FaBars /> },
//                         { key: "section1", label: "Hero", color: "purple", icon: <FaHome /> },
//                         { key: "section2", label: "Features", color: "green", icon: <FaInfoCircle /> },
//                         { key: "about", label: "About", color: "yellow", icon: <FaInfoCircle /> },
//                         { key: "contact", label: "Contact", color: "red", icon: <FaPhone /> },
//                         { key: "footer", label: "Footer", color: "indigo", icon: <FaBars /> },
//                     ].map((section) => (
//                         <div key={section.key} className={`text-center p-3 bg-white rounded-lg border border-${section.color}-200`}>
//                             <div className="text-lg mb-1" style={{color: `var(--color-${section.color}-500)`}}>
//                                 {section.icon}
//                             </div>
//                             <p className="text-sm text-gray-600">{section.label}</p>
//                             <p className="text-xl mt-1">
//                                 {allData[section.key] ? "✅" : "⚪"}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Preview Content */}
//             {showPreview && hasData && (
//                 <div className="p-6">
//                     {/* Device Mode Selector */}
//                     <div className="flex justify-center gap-3 mb-6">
//                         <button
//                             onClick={() => setPreviewMode("desktop")}
//                             className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
//                                 previewMode === "desktop"
//                                     ? "bg-indigo-600 text-white"
//                                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                             }`}
//                         >
//                             <FaDesktop /> Desktop View
//                         </button>
//                         <button
//                             onClick={() => setPreviewMode("mobile")}
//                             className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
//                                 previewMode === "mobile"
//                                     ? "bg-indigo-600 text-white"
//                                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                             }`}
//                         >
//                             <FaMobileAlt /> Mobile View
//                         </button>
//                     </div>

//                     {/* Preview Container */}
//                     <div className={`mx-auto transition-all ${
//                         previewMode === "mobile" ? "max-w-md" : "max-w-full"
//                     }`}>
//                         <div className="border-4 border-gray-800 rounded-xl overflow-hidden shadow-2xl bg-white">
//                             {/* Navbar Preview */}
//                             {allData.navbar && (
//                                 <div
//                                     style={{
//                                         backgroundColor: allData.navbar.navbarBgColor || "#ffffff",
//                                         color: allData.navbar.textColor || "#000000",
//                                     }}
//                                     className="px-6 py-4 border-b"
//                                 >
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex items-center gap-3">
//                                             {allData.navbar.logo && (
//                                                 <img
//                                                     src={allData.navbar.logo}
//                                                     alt="Logo"
//                                                     className="w-10 h-10 rounded-full"
//                                                 />
//                                             )}
//                                             <span className="font-bold text-lg">
//                                                 {allData.navbar.companyName || "Company Name"}
//                                             </span>
//                                         </div>
//                                         <div className={`flex gap-4 ${
//                                             previewMode === "mobile" ? "hidden" : ""
//                                         }`}>
//                                             {allData.navbar.navLinks?.slice(0, 4).map((link, idx) => (
//                                                 <span key={idx} className="text-sm hover:underline cursor-pointer">
//                                                     {link.label || `Link ${idx + 1}`}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                         {previewMode === "mobile" && (
//                                             <FaBars className="text-xl" />
//                                         )}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Section 1 Preview */}
//                             {allData.section1 && (
//                                 <div
//                                     style={{
//                                         backgroundColor: allData.section1.backgroundColor || "#f8fafc",
//                                         color: allData.section1.textColor || "#000000",
//                                     }}
//                                     className="p-8"
//                                 >
//                                     <div className={`grid ${
//                                         previewMode === "desktop" ? "grid-cols-2" : "grid-cols-1"
//                                     } gap-6`}>
//                                         <div>
//                                             <h1 className="text-2xl font-bold mb-4">
//                                                 {allData.section1.companyName || "Company Name"}
//                                             </h1>
//                                             <p className="text-sm mb-3">
//                                                 {allData.section1.sectioncontent1?.substring(0, 150) || "Hero section content..."}
//                                             </p>
//                                             <div className="flex gap-4 text-xs">
//                                                 {allData.section1.email && (
//                                                     <span>📧 {allData.section1.email}</span>
//                                                 )}
//                                                 {allData.section1.phone && (
//                                                     <span>📞 {allData.section1.phone}</span>
//                                                 )}
//                                             </div>
//                                         </div>
//                                         {allData.section1.bgimg && (
//                                             <div className="relative h-48">
//                                                 <img
//                                                     src={allData.section1.bgimg}
//                                                     alt="Hero"
//                                                     className="w-full h-full object-cover rounded-lg"
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Section 2 Preview */}
//                             {allData.section2 && (
//                                 <div className="p-8 bg-gray-50">
//                                     <h2 className="text-xl font-bold text-center mb-6">
//                                         {allData.section2.companyName || "Features"}
//                                     </h2>
//                                     <div className={`grid ${
//                                         previewMode === "desktop" ? "grid-cols-4" : "grid-cols-2"
//                                     } gap-4`}>
//                                         {allData.section2.whyChooseUs?.slice(0, 4).map((item, idx) => (
//                                             <div key={idx} className="bg-white p-4 rounded-lg border shadow-sm">
//                                                 <div className="text-2xl mb-2">⭐</div>
//                                                 <h3 className="font-semibold text-sm">{item.title || "Feature"}</h3>
//                                                 <p className="text-xs text-gray-600 mt-1">
//                                                     {item.description || "Feature description"}
//                                                 </p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* About Section Preview */}
//                             {allData.about && (
//                                 <div className="p-8 bg-white">
//                                     <h2 className="text-xl font-bold text-center mb-6">About Us</h2>
//                                     <p className="text-center text-gray-600 mb-4">
//                                         {allData.about.content?.substring(0, 200) || "About section content..."}
//                                     </p>
//                                 </div>
//                             )}

//                             {/* Contact Section Preview */}
//                             {allData.contact && (
//                                 <div className="p-8 bg-gray-50">
//                                     <h2 className="text-xl font-bold text-center mb-6">Contact Us</h2>
//                                     <div className={`grid ${
//                                         previewMode === "desktop" ? "grid-cols-3" : "grid-cols-1"
//                                     } gap-6`}>
//                                         {allData.contact.email && (
//                                             <div className="text-center">
//                                                 <FaEnvelope className="text-2xl mx-auto mb-2 text-blue-500" />
//                                                 <p className="text-sm">{allData.contact.email}</p>
//                                             </div>
//                                         )}
//                                         {allData.contact.phone && (
//                                             <div className="text-center">
//                                                 <FaPhone className="text-2xl mx-auto mb-2 text-green-500" />
//                                                 <p className="text-sm">{allData.contact.phone}</p>
//                                             </div>
//                                         )}
//                                         {allData.contact.address && (
//                                             <div className="text-center">
//                                                 <FaMapMarkerAlt className="text-2xl mx-auto mb-2 text-red-500" />
//                                                 <p className="text-sm">{allData.contact.address}</p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Footer Preview */}
//                             {allData.footer && (
//                                 <div
//                                     style={{
//                                         backgroundColor: allData.footer.backgroundColor || "#1f2937",
//                                         color: allData.footer.textColor || "#ffffff",
//                                     }}
//                                     className="p-6"
//                                 >
//                                     <div className={`grid ${
//                                         previewMode === "desktop" ? "grid-cols-3" : "grid-cols-1"
//                                     } gap-6`}>
//                                         <div>
//                                             {allData.footer.logo && (
//                                                 <img
//                                                     src={allData.footer.logo}
//                                                     alt="Logo"
//                                                     className="w-16 h-16 rounded-full mb-3"
//                                                 />
//                                             )}
//                                             <p className="text-sm">
//                                                 {allData.footer.tagline || "Company tagline"}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <h4 className="font-semibold mb-2">Contact</h4>
//                                             <div className="text-xs space-y-1">
//                                                 {allData.footer.email && (
//                                                     <p>📧 {allData.footer.email}</p>
//                                                 )}
//                                                 {allData.footer.phone && (
//                                                     <p>📞 {allData.footer.phone}</p>
//                                                 )}
//                                                 {allData.footer.address && (
//                                                     <p>📍 {allData.footer.address}</p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="text-center">
//                                             <h4 className="font-semibold mb-2">Follow Us</h4>
//                                             <div className="flex justify-center gap-3">
//                                                 {allData.footer.socialLinks?.map((social, idx) => (
//                                                     <div key={idx} className="text-xl">
//                                                         {getIconForPlatform(social.platform)}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="text-center mt-6 pt-4 border-t border-white/20 text-xs">
//                                         <p>© 2024 {allData.footer.companyName || "Company Name"}</p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Data Summary */}
//                     <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
//                         <h4 className="font-semibold text-blue-900 mb-3">
//                             📊 All Sections Data Summary
//                         </h4>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
//                             {Object.entries(allData).map(([key, value]) => {
//                                 const sectionNames = {
//                                     navbar: "Navbar",
//                                     section1: "Hero Section", 
//                                     section2: "Features Section",
//                                     about: "About Section",
//                                     contact: "Contact Section",
//                                     footer: "Footer"
//                                 };
                                
//                                 return (
//                                     <div key={key} className="flex items-center gap-2">
//                                         <FaCheckCircle className="text-green-500" />
//                                         <span className="capitalize">{sectionNames[key] || key}</span>
//                                         <span className="text-xs text-gray-500">
//                                             ({Object.keys(value || {}).length} fields)
//                                         </span>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* No Data Message */}
//             {!hasData && (
//                 <div className="p-12 text-center">
//                     <FaExclamationCircle className="text-6xl text-gray-300 mx-auto mb-4" />
//                     <p className="text-gray-500 text-lg">
//                         No data available for preview
//                     </p>
//                     <p className="text-gray-400 text-sm mt-2">
//                         Please fill and save at least one section to see the preview
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MasterPreview;



// components/MasterPreview.jsx - SIMPLIFIED VERSION
import { useState } from 'react';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { FaDesktop, FaMobileAlt, FaTimes } from 'react-icons/fa';

const MasterPreview = () => {
    const { websiteData, getSectionCount } = useWebsiteData();
    const [showPreview, setShowPreview] = useState(false);
    const [viewMode, setViewMode] = useState('desktop');

    const sectionCount = getSectionCount();

    const handlePreview = () => {
        if (sectionCount === 0) {
            alert('❌ No data to preview! Please save at least one section first.');
            return;
        }
        setShowPreview(true);
    };

    const renderSection = (sectionName, sectionData) => {
        if (!sectionData) return null;

        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">
                    {sectionName} Section
                </h3>
                <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(sectionData, null, 2)}
                </pre>
            </div>
        );
    };

    return (
        <>
            {/* Preview Trigger Button */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Website Preview
                </h2>
                <button
                    onClick={handlePreview}
                    disabled={sectionCount === 0}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                        sectionCount > 0
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    👁️ Preview Website ({sectionCount}/6 sections)
                </button>
            </div>

            {/* Fullscreen Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
                    {/* Header */}
                    <div className="bg-gray-900 text-white p-4 border-b border-gray-700">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">Website Preview</h2>
                                <p className="text-sm text-gray-400">
                                    Previewing {sectionCount}/6 sections
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* View Mode Toggle */}
                                <div className="flex bg-gray-800 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('desktop')}
                                        className={`px-4 py-2 rounded flex items-center gap-2 transition ${
                                            viewMode === 'desktop'
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-700'
                                        }`}
                                    >
                                        <FaDesktop />
                                        Desktop
                                    </button>
                                    <button
                                        onClick={() => setViewMode('mobile')}
                                        className={`px-4 py-2 rounded flex items-center gap-2 transition ${
                                            viewMode === 'mobile'
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-700'
                                        }`}
                                    >
                                        <FaMobileAlt />
                                        Mobile
                                    </button>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 rounded-full hover:bg-gray-800 transition"
                                >
                                    <FaTimes className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Preview Content */}
                    <div className="flex-1 overflow-hidden">
                        <div className={`h-full ${viewMode === 'desktop' ? '' : 'flex items-center justify-center'}`}>
                            <div 
                                className={`h-full overflow-auto bg-gray-100 p-8 ${
                                    viewMode === 'mobile' ? 'w-full max-w-md' : ''
                                }`}
                            >
                                {/* Render all saved sections */}
                                {renderSection('navbar', websiteData.navbar)}
                                {renderSection('section1', websiteData.section1)}
                                {renderSection('section2', websiteData.section2)}
                                {renderSection('about', websiteData.about)}
                                {renderSection('contact', websiteData.contact)}
                                {renderSection('footer', websiteData.footer)}

                                {sectionCount === 0 && (
                                    <div className="text-center text-gray-500 mt-20">
                                        No sections saved yet
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-900 text-white p-4 border-t border-gray-700">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                                Changes are saved locally until you click "PUBLISH ALL"
                            </div>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MasterPreview;