// import { useState, useEffect } from "react";
// import {
//     FaUpload,
//     FaEye,
//     FaEyeSlash,
//     FaHome,
//     FaInfoCircle,
//     FaEnvelope,
//     FaPhone,
//     FaServicestack,
//     FaBriefcase,
//     FaUser,
//     FaCog,
//     FaMobileAlt,
//     FaDesktop,
//     FaSave,
//     FaCheckCircle,
//     FaExclamationTriangle,
// } from "react-icons/fa";

// import { saveSectionData } from "../../../../components/services/api";
// const AdminNavbarForm = ({
//     initialData,
//     onSave,
//     clientSlug = "default-client",
// }) => {
//     const [showPreview, setShowPreview] = useState(false);
//     const [previewMode, setPreviewMode] = useState("desktop");
//     const [hoveredIndex, setHoveredIndex] = useState(null);

//     // Default data structure
//     const defaultData = {
//         companyName: "",
//         logo: "",
//         navbarBgColor: "#0f172a",
//         textColor: "#ffffff",
//         hoverBgColor: "#f97316",
//         hoverTextColor: "#ffffff",
//         activeBgOpacity: "0.10",
//         scrolledShadow: true,
//         backdropBlur: true,
//         bgOpacity: "0.95",
//         logoBorderColor: "rgba(255, 255, 255, 0.2)",
//         glowEffect: true,
//         glowColor: "#ea580c",
//         navLinks: [
//             { label: "Home", path: "/home", icon: "FaHome" },
//             { label: "About", path: "/about", icon: "FaInfoCircle" },
//             { label: "Contact", path: "/contact", icon: "FaEnvelope" },
//         ],
//         gautamLogoUrl: "/gautamLogo.png",
//         gautamSolarLink: "https://gautamsolar.com/",
//         showGautamLogo: true,
//     };

//     // Initialize formData with proper fallback
//     const [formData, setFormData] = useState(() => {
//         // If initialData exists, merge it with defaults
//         if (initialData) {
//             return {
//                 ...defaultData,
//                 ...initialData,
//                 // Ensure navLinks is always an array
//                 navLinks: Array.isArray(initialData.navLinks)
//                     ? initialData.navLinks
//                     : defaultData.navLinks,
//             };
//         }
//         return defaultData;
//     });

//     console.log("navbarform", { formData });
//     const [logoPreview, setLogoPreview] = useState(formData.logo || "");
//     const [loading, setLoading] = useState(false);
//     const [saveStatus, setSaveStatus] = useState(null);

//     // Icon mapping
//     const iconMap = {
//         FaHome: FaHome,
//         FaInfoCircle: FaInfoCircle,
//         FaEnvelope: FaEnvelope,
//         FaPhone: FaPhone,
//         FaServicestack: FaServicestack,
//         FaBriefcase: FaBriefcase,
//         FaUser: FaUser,
//         FaCog: FaCog,
//     };

//     const iconOptions = [
//         "FaHome",
//         "FaInfoCircle",
//         "FaEnvelope",
//         "FaPhone",
//         "FaServicestack",
//         "FaBriefcase",
//         "FaUser",
//         "FaCog",
//     ];

//     // Sync with initialData when it changes
//     useEffect(() => {
//         if (initialData) {
//             setFormData({
//                 ...defaultData,
//                 ...initialData,
//                 navLinks: Array.isArray(initialData.navLinks)
//                     ? initialData.navLinks
//                     : defaultData.navLinks,
//             });
//             setLogoPreview(initialData.logo || "");
//         }
//     }, [initialData]);

//     // Load from localStorage on mount if no initialData
//     useEffect(() => {
//         if (!initialData) {
//             const savedData = localStorage.getItem(`navbar_${clientSlug}`);
//             if (savedData) {
//                 try {
//                     const parsed = JSON.parse(savedData);
//                     if (parsed.data) {
//                         setFormData({
//                             ...defaultData,
//                             ...parsed.data,
//                             navLinks: Array.isArray(parsed.data.navLinks)
//                                 ? parsed.data.navLinks
//                                 : defaultData.navLinks,
//                         });
//                         setLogoPreview(parsed.data.logo || "");
//                     }
//                 } catch (error) {
//                     console.error("Error loading saved data:", error);
//                 }
//             }
//         }
//     }, [clientSlug]);

//     const handleChange = (key, value) => {
//         setFormData({ ...formData, [key]: value });
//     };

//     // const handleLogoUpload = (e) => {
//     //     const file = e.target.files[0];
//     //     if (file) {
//     //         const reader = new FileReader();
//     //         reader.onloadend = () => {
//     //             setLogoPreview(reader.result);
//     //             handleChange("logo", reader.result);
//     //         };
//     //         reader.readAsDataURL(file);
//     //     }
//     // };

//     const handleLogoUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         try {
//             const formDataUpload = new FormData();
//             formDataUpload.append("file", file);

//             // Example API call
//             const res = await fetch("/api/upload-logo", {
//                 method: "POST",
//                 body: formDataUpload,
//             });

//             const data = await res.json();

//             if (data.url) {
//                 setLogoPreview(data.url);
//                 handleChange("logo", data.url); // ✅ Save URL not Base64
//             }
//         } catch (error) {
//             console.error("Upload failed:", error);
//         }
//     };

//     const handleNavLinkChange = (index, field, value) => {
//         const updatedLinks = [...formData.navLinks];
//         updatedLinks[index][field] = value;
//         handleChange("navLinks", updatedLinks);
//     };

//     const addNavLink = () => {
//         handleChange("navLinks", [
//             ...formData.navLinks,
//             { label: "", path: "", icon: "FaHome" },
//         ]);
//     };

//     const removeNavLink = (index) => {
//         const updatedLinks = formData.navLinks.filter((_, i) => i !== index);
//         handleChange("navLinks", updatedLinks);
//     };

//     // const handleSubmit = async () => {
//     //     setLoading(true);
//     //     setSaveStatus(null);

//     //     try {
//     //         // Save to localStorage
//     //         const timestamp = new Date().toISOString();
//     //         const backupData = {
//     //             data: formData,
//     //             savedAt: timestamp,
//     //             synced: false,
//     //         };
//     //         localStorage.setItem(
//     //             `navbar_${clientSlug}`,
//     //             JSON.stringify(backupData),
//     //         );
//     //         console.log("✓ Data saved to localStorage");

//     //         // Simulate API call
//     //         await new Promise((resolve) => setTimeout(resolve, 1000));

//     //         setSaveStatus("success");

//     //         if (onSave) {
//     //             onSave(formData);
//     //         }

//     //         // Clear success message after 5 seconds
//     //         setTimeout(() => {
//     //             setSaveStatus(null);
//     //         }, 5000);
//     //     } catch (error) {
//     //         console.error("Save failed:", error);
//     //         setSaveStatus("error");

//     //         setTimeout(() => {
//     //             setSaveStatus(null);
//     //         }, 8000);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const handleSubmit = async () => {
//         setLoading(true);
//         setSaveStatus(null);

//         try {
//             const result = await saveSectionData(
//                 "navbar",
//                 formData,
//                 clientSlug,
//             );

//             if (result.success) {
//                 setSaveStatus("success");

//                 if (onSave) {
//                     onSave(formData);
//                 }

//                 setTimeout(() => {
//                     setSaveStatus(null);
//                 }, 5000);
//             }
//         } catch (error) {
//             console.error("Save failed:", error);
//             setSaveStatus("error");

//             setTimeout(() => {
//                 setSaveStatus(null);
//             }, 8000);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const renderIcon = (iconName) => {
//         const IconComponent = iconMap[iconName];
//         return IconComponent ? <IconComponent /> : null;
//     };

//     return (
//         <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
//                 <h2 className="text-2xl font-bold text-white flex items-center justify-between">
//                     <span>Navbar Configuration</span>
//                     <button
//                         onClick={() => setShowPreview(!showPreview)}
//                         className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition text-sm"
//                     >
//                         {showPreview ? <FaEyeSlash /> : <FaEye />}
//                         {showPreview ? "Hide Preview" : "Show Preview"}
//                     </button>
//                 </h2>
//             </div>

//             <div className="p-6 space-y-8">
//                 {/* Status Alert */}
//                 {saveStatus && (
//                     <div
//                         className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
//                             saveStatus === "success"
//                                 ? "bg-green-50 border-green-500 text-green-800"
//                                 : saveStatus === "error"
//                                   ? "bg-red-50 border-red-500 text-red-800"
//                                   : "bg-yellow-50 border-yellow-500 text-yellow-800"
//                         }`}
//                     >
//                         {saveStatus === "success" && (
//                             <>
//                                 <FaCheckCircle className="text-2xl" />
//                                 <div>
//                                     <p className="font-bold">
//                                         ✓ Successfully Saved!
//                                     </p>
//                                     <p className="text-sm">
//                                         Navbar configuration saved successfully.
//                                     </p>
//                                 </div>
//                             </>
//                         )}
//                         {saveStatus === "error" && (
//                             <>
//                                 <FaExclamationTriangle className="text-2xl" />
//                                 <div>
//                                     <p className="font-bold">✗ Save Failed</p>
//                                     <p className="text-sm">
//                                         Failed to save configuration. Please try
//                                         again.
//                                     </p>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 )}

//                 {/* Preview Section */}
//                 {showPreview && (
//                     <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-lg font-semibold">
//                                 Live Preview
//                             </h3>
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={() => setPreviewMode("desktop")}
//                                     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
//                                         previewMode === "desktop"
//                                             ? "bg-indigo-600 text-white"
//                                             : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                                     }`}
//                                 >
//                                     <FaDesktop /> Desktop
//                                 </button>
//                                 <button
//                                     onClick={() => setPreviewMode("mobile")}
//                                     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
//                                         previewMode === "mobile"
//                                             ? "bg-indigo-600 text-white"
//                                             : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                                     }`}
//                                 >
//                                     <FaMobileAlt /> Mobile
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Desktop Preview */}
//                         {previewMode === "desktop" && (
//                             <div
//                                 className="rounded-lg overflow-hidden shadow-lg"
//                                 style={{
//                                     backgroundColor: formData.navbarBgColor,
//                                     color: formData.textColor,
//                                 }}
//                             >
//                                 <div className="px-6 py-4 flex justify-between items-center">
//                                     <div className="flex items-center gap-3">
//                                         {logoPreview && (
//                                             <img
//                                                 src={logoPreview}
//                                                 alt="Logo"
//                                                 className="w-12 h-12 rounded-full object-contain"
//                                                 style={{
//                                                     border: `2px solid ${formData.logoBorderColor}`,
//                                                 }}
//                                             />
//                                         )}
//                                         <span className="font-bold">
//                                             {formData.companyName ||
//                                                 "Company Name"}
//                                         </span>
//                                     </div>
//                                     <div className="flex gap-4">
//                                         {formData.navLinks &&
//                                             formData.navLinks.map(
//                                                 (link, index) => (
//                                                     <div
//                                                         key={index}
//                                                         className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
//                                                         style={{
//                                                             backgroundColor:
//                                                                 hoveredIndex ===
//                                                                 index
//                                                                     ? formData.hoverBgColor
//                                                                     : "transparent",
//                                                             color:
//                                                                 hoveredIndex ===
//                                                                 index
//                                                                     ? formData.hoverTextColor
//                                                                     : formData.textColor,
//                                                         }}
//                                                         onMouseEnter={() =>
//                                                             setHoveredIndex(
//                                                                 index,
//                                                             )
//                                                         }
//                                                         onMouseLeave={() =>
//                                                             setHoveredIndex(
//                                                                 null,
//                                                             )
//                                                         }
//                                                     >
//                                                         {renderIcon(link.icon)}
//                                                         <span>
//                                                             {link.label}
//                                                         </span>
//                                                     </div>
//                                                 ),
//                                             )}
//                                     </div>
//                                     {formData.showGautamLogo && (
//                                         <div className="flex items-center">
//                                             <img
//                                                 src={formData.gautamLogoUrl}
//                                                 alt="Partner Logo"
//                                                 className="h-10 object-contain"
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Mobile Preview */}
//                         {previewMode === "mobile" && (
//                             <div className="max-w-sm mx-auto">
//                                 <div
//                                     className="rounded-lg overflow-hidden shadow-lg"
//                                     style={{
//                                         backgroundColor: formData.navbarBgColor,
//                                         color: formData.textColor,
//                                     }}
//                                 >
//                                     <div className="px-4 py-3 flex justify-between items-center">
//                                         <div className="flex items-center gap-2">
//                                             {logoPreview && (
//                                                 <img
//                                                     src={logoPreview}
//                                                     alt="Logo"
//                                                     className="w-10 h-10 rounded-full object-contain"
//                                                     style={{
//                                                         border: `2px solid ${formData.logoBorderColor}`,
//                                                     }}
//                                                 />
//                                             )}
//                                             <span className="font-bold text-sm">
//                                                 {formData.companyName ||
//                                                     "Company Name"}
//                                             </span>
//                                         </div>
//                                         <div className="flex flex-col gap-1">
//                                             <div className="w-6 h-0.5 bg-white"></div>
//                                             <div className="w-6 h-0.5 bg-white"></div>
//                                             <div className="w-6 h-0.5 bg-white"></div>
//                                         </div>
//                                     </div>

//                                     <div className="border-t border-white/20">
//                                         {formData.navLinks &&
//                                             formData.navLinks.map(
//                                                 (link, index) => (
//                                                     <div
//                                                         key={index}
//                                                         className="flex items-center gap-3 px-4 py-3 border-b border-white/10 cursor-pointer transition-all duration-300"
//                                                         style={{
//                                                             backgroundColor:
//                                                                 hoveredIndex ===
//                                                                 index
//                                                                     ? formData.hoverBgColor
//                                                                     : "transparent",
//                                                             color:
//                                                                 hoveredIndex ===
//                                                                 index
//                                                                     ? formData.hoverTextColor
//                                                                     : formData.textColor,
//                                                         }}
//                                                         onMouseEnter={() =>
//                                                             setHoveredIndex(
//                                                                 index,
//                                                             )
//                                                         }
//                                                         onMouseLeave={() =>
//                                                             setHoveredIndex(
//                                                                 null,
//                                                             )
//                                                         }
//                                                     >
//                                                         <span className="text-lg">
//                                                             {renderIcon(
//                                                                 link.icon,
//                                                             )}
//                                                         </span>
//                                                         <span className="text-sm">
//                                                             {link.label}
//                                                         </span>
//                                                     </div>
//                                                 ),
//                                             )}
//                                         {formData.showGautamLogo && (
//                                             <div className="flex justify-center py-3">
//                                                 <img
//                                                     src={formData.gautamLogoUrl}
//                                                     alt="Partner Logo"
//                                                     className="h-8 object-contain"
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* Company Information */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Company Information
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Company Name
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.companyName}
//                                 onChange={(e) =>
//                                     handleChange("companyName", e.target.value)
//                                 }
//                                 placeholder="Enter company name"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Company Logo
//                             </label>
//                             <div className="flex gap-3 items-center">
//                                 {logoPreview && (
//                                     <img
//                                         src={logoPreview}
//                                         alt="Logo Preview"
//                                         className="w-16 h-16 rounded-full object-contain border-2 border-gray-300"
//                                     />
//                                 )}
//                                 <label className="flex-1 cursor-pointer">
//                                     <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition border border-gray-300">
//                                         <FaUpload />
//                                         <span>Upload Logo</span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleLogoUpload}
//                                         className="hidden"
//                                     />
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Theme Colors */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Theme Colors
//                     </h3>

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Navbar Background
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.navbarBgColor}
//                                 onChange={(e) =>
//                                     handleChange(
//                                         "navbarBgColor",
//                                         e.target.value,
//                                     )
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.navbarBgColor}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Text Color
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.textColor}
//                                 onChange={(e) =>
//                                     handleChange("textColor", e.target.value)
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.textColor}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Hover Background Color
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.hoverBgColor}
//                                 onChange={(e) =>
//                                     handleChange("hoverBgColor", e.target.value)
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.hoverBgColor}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Hover Text Color
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.hoverTextColor}
//                                 onChange={(e) =>
//                                     handleChange(
//                                         "hoverTextColor",
//                                         e.target.value,
//                                     )
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.hoverTextColor}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Glow Effect Color
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.glowColor}
//                                 onChange={(e) =>
//                                     handleChange("glowColor", e.target.value)
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.glowColor}
//                             </p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Navigation Links */}
//                 <section className="space-y-4">
//                     <div className="flex justify-between items-center border-b pb-2">
//                         <h3 className="text-lg font-bold text-gray-800">
//                             Navigation Links
//                         </h3>
//                         <button
//                             onClick={addNavLink}
//                             className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
//                         >
//                             + Add Link
//                         </button>
//                     </div>

//                     <div className="space-y-3">
//                         {formData.navLinks &&
//                             formData.navLinks.map((link, index) => (
//                                 <div
//                                     key={index}
//                                     className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
//                                 >
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Label
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={link.label}
//                                             onChange={(e) =>
//                                                 handleNavLinkChange(
//                                                     index,
//                                                     "label",
//                                                     e.target.value,
//                                                 )
//                                             }
//                                             placeholder="Home"
//                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Path
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={link.path}
//                                             onChange={(e) =>
//                                                 handleNavLinkChange(
//                                                     index,
//                                                     "path",
//                                                     e.target.value,
//                                                 )
//                                             }
//                                             placeholder="/home"
//                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Icon
//                                         </label>
//                                         <select
//                                             value={link.icon}
//                                             onChange={(e) =>
//                                                 handleNavLinkChange(
//                                                     index,
//                                                     "icon",
//                                                     e.target.value,
//                                                 )
//                                             }
//                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                         >
//                                             {iconOptions.map((icon) => (
//                                                 <option key={icon} value={icon}>
//                                                     {icon.replace("Fa", "")}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <div className="mt-1 flex items-center gap-2 text-gray-600">
//                                             <span className="text-xs">
//                                                 Preview:
//                                             </span>
//                                             <span className="text-lg">
//                                                 {renderIcon(link.icon)}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-end">
//                                         <button
//                                             onClick={() => removeNavLink(index)}
//                                             className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm"
//                                         >
//                                             Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                     </div>
//                 </section>

//                 {/* Visual Effects */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Visual Effects
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Active Background Opacity
//                             </label>
//                             <input
//                                 type="range"
//                                 min="0"
//                                 max="1"
//                                 step="0.05"
//                                 value={formData.activeBgOpacity}
//                                 onChange={(e) =>
//                                     handleChange(
//                                         "activeBgOpacity",
//                                         e.target.value,
//                                     )
//                                 }
//                                 className="w-full"
//                             />
//                             <p className="text-sm text-gray-600 mt-1">
//                                 {formData.activeBgOpacity}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Background Opacity (Scrolled)
//                             </label>
//                             <input
//                                 type="range"
//                                 min="0"
//                                 max="1"
//                                 step="0.05"
//                                 value={formData.bgOpacity}
//                                 onChange={(e) =>
//                                     handleChange("bgOpacity", e.target.value)
//                                 }
//                                 className="w-full"
//                             />
//                             <p className="text-sm text-gray-600 mt-1">
//                                 {formData.bgOpacity}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <label className="flex items-center gap-2 cursor-pointer">
//                             <input
//                                 type="checkbox"
//                                 checked={formData.scrolledShadow}
//                                 onChange={(e) =>
//                                     handleChange(
//                                         "scrolledShadow",
//                                         e.target.checked,
//                                     )
//                                 }
//                                 className="w-5 h-5 text-indigo-600 rounded"
//                             />
//                             <span className="text-gray-700">
//                                 Enable Scrolled Shadow
//                             </span>
//                         </label>

//                         <label className="flex items-center gap-2 cursor-pointer">
//                             <input
//                                 type="checkbox"
//                                 checked={formData.backdropBlur}
//                                 onChange={(e) =>
//                                     handleChange(
//                                         "backdropBlur",
//                                         e.target.checked,
//                                     )
//                                 }
//                                 className="w-5 h-5 text-indigo-600 rounded"
//                             />
//                             <span className="text-gray-700">
//                                 Enable Backdrop Blur
//                             </span>
//                         </label>

//                         <label className="flex items-center gap-2 cursor-pointer">
//                             <input
//                                 type="checkbox"
//                                 checked={formData.glowEffect}
//                                 onChange={(e) =>
//                                     handleChange("glowEffect", e.target.checked)
//                                 }
//                                 className="w-5 h-5 text-indigo-600 rounded"
//                             />
//                             <span className="text-gray-700">
//                                 Enable Glow Effect
//                             </span>
//                         </label>
//                     </div>
//                 </section>

//                 {/* Gautam Solar Logo Settings */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Partner Logo (Gautam Solar)
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Logo URL
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.gautamLogoUrl}
//                                 onChange={(e) =>
//                                     handleChange(
//                                         "gautamLogoUrl",
//                                         e.target.value,
//                                     )
//                                 }
//                                 placeholder="/gautamLogo.png"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Partner Link
//                             </label>
//                             <input
//                                 type="url"
//                                 value={formData.gautamSolarLink}
//                                 onChange={(e) =>
//                                     handleChange(
//                                         "gautamSolarLink",
//                                         e.target.value,
//                                     )
//                                 }
//                                 placeholder="https://gautamsolar.com/"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                             />
//                         </div>
//                     </div>

//                     <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                             type="checkbox"
//                             checked={formData.showGautamLogo}
//                             onChange={(e) =>
//                                 handleChange("showGautamLogo", e.target.checked)
//                             }
//                             className="w-5 h-5 text-indigo-600 rounded"
//                         />
//                         <span className="text-gray-700">Show Partner Logo</span>
//                     </label>
//                 </section>

//                 {/* Save Button */}
//                 <div className="flex gap-4 pt-6 border-t">
//                     <button
//                         onClick={handleSubmit}
//                         disabled={loading}
//                         className={`flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition shadow-lg flex items-center justify-center gap-2 ${
//                             loading ? "opacity-50 cursor-not-allowed" : ""
//                         }`}
//                     >
//                         {loading ? (
//                             <>
//                                 <svg
//                                     className="animate-spin h-5 w-5"
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
//                                 <span>Saving...</span>
//                             </>
//                         ) : (
//                             <>
//                                 <FaSave />
//                                 <span>Save Navbar Configuration</span>
//                             </>
//                         )}
//                     </button>
//                 </div>

//                 {/* Info Box */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
//                     <FaCheckCircle className="text-blue-600 text-xl mt-0.5" />
//                     <div className="text-sm text-blue-800">
//                         <p className="font-semibold mb-1">
//                             Configuration Manager
//                         </p>
//                         <p>
//                             Fill in all the required fields to configure your
//                             navbar. Changes will be saved when you click the
//                             save button. Hover over the navigation links in the
//                             preview to see the hover effect!
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminNavbarForm;







import { useState, useEffect } from "react";
import {
    FaUpload,
    FaEye,
    FaEyeSlash,
    FaHome,
    FaInfoCircle,
    FaEnvelope,
    FaPhone,
    FaServicestack,
    FaBriefcase,
    FaUser,
    FaCog,
    FaMobileAlt,
    FaDesktop,
    FaSave,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";

// ✅ NEW: Import the context hook
import { useWebsiteData } from "../../../../context/WebsiteDataContext";

const AdminNavbarForm = () => {
    // ✅ NEW: Get context functions and data
    const { websiteData, saveSectionData, clientSlug } = useWebsiteData();

    const [showPreview, setShowPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState("desktop");
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Default data structure
    const defaultData = {
        companyName: "",
        logo: "",
        navbarBgColor: "#0f172a",
        textColor: "#ffffff",
        hoverBgColor: "#f97316",
        hoverTextColor: "#ffffff",
        activeBgOpacity: "0.10",
        scrolledShadow: true,
        backdropBlur: true,
        bgOpacity: "0.95",
        logoBorderColor: "rgba(255, 255, 255, 0.2)",
        glowEffect: true,
        glowColor: "#ea580c",
        navLinks: [
            { label: "Home", path: "/home", icon: "FaHome" },
            { label: "About", path: "/about", icon: "FaInfoCircle" },
            { label: "Contact", path: "/contact", icon: "FaEnvelope" },
        ],
        gautamLogoUrl: "/gautamLogo.png",
        gautamSolarLink: "https://gautamsolar.com/",
        showGautamLogo: true,
    };

    // ✅ UPDATED: Initialize with context data or defaults
    const [formData, setFormData] = useState(defaultData);
    const [logoPreview, setLogoPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    // Icon mapping
    const iconMap = {
        FaHome: FaHome,
        FaInfoCircle: FaInfoCircle,
        FaEnvelope: FaEnvelope,
        FaPhone: FaPhone,
        FaServicestack: FaServicestack,
        FaBriefcase: FaBriefcase,
        FaUser: FaUser,
        FaCog: FaCog,
    };

    const iconOptions = [
        "FaHome",
        "FaInfoCircle",
        "FaEnvelope",
        "FaPhone",
        "FaServicestack",
        "FaBriefcase",
        "FaUser",
        "FaCog",
    ];

    // ✅ UPDATED: Load data from context when available
    useEffect(() => {
        if (websiteData.navbar) {
            setFormData({
                ...defaultData,
                ...websiteData.navbar,
                navLinks: Array.isArray(websiteData.navbar.navLinks)
                    ? websiteData.navbar.navLinks
                    : defaultData.navLinks,
            });
            setLogoPreview(websiteData.navbar.logo || "");
        }
    }, [websiteData.navbar]);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);

            // Example API call
            const res = await fetch("/api/upload-logo", {
                method: "POST",
                body: formDataUpload,
            });

            const data = await res.json();

            if (data.url) {
                setLogoPreview(data.url);
                handleChange("logo", data.url);
            }
        } catch (error) {
            console.error("Upload failed:", error);

            // ✅ Fallback to base64 if upload fails
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
                handleChange("logo", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNavLinkChange = (index, field, value) => {
        const updatedLinks = [...formData.navLinks];
        updatedLinks[index][field] = value;
        handleChange("navLinks", updatedLinks);
    };

    const addNavLink = () => {
        handleChange("navLinks", [
            ...formData.navLinks,
            { label: "", path: "", icon: "FaHome" },
        ]);
    };

    const removeNavLink = (index) => {
        const updatedLinks = formData.navLinks.filter((_, i) => i !== index);
        handleChange("navLinks", updatedLinks);
    };

    // ✅ SIMPLIFIED: New save function using context
    const handleSubmit = async () => {
        setLoading(true);
        setSaveStatus(null);

        try {
            // Save to context (which handles localStorage automatically)
            const result = saveSectionData("navbar", formData);

            if (result.success) {
                setSaveStatus("success");
                console.log("✅ Navbar saved successfully!");

                setTimeout(() => {
                    setSaveStatus(null);
                }, 5000);
            } else {
                setSaveStatus("error");
            }
        } catch (error) {
            console.error("Save failed:", error);
            setSaveStatus("error");

            setTimeout(() => {
                setSaveStatus(null);
            }, 8000);
        } finally {
            setLoading(false);
        }
    };

    const renderIcon = (iconName) => {
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent /> : null;
    };

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
                <h2 className="text-2xl font-bold text-white flex items-center justify-between">
                    <span>
                        Navbar Configuration
                        <span className="ml-3 text-sm font-normal opacity-80">
                            ({clientSlug})
                        </span>
                    </span>
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition text-sm"
                    >
                        {showPreview ? <FaEyeSlash /> : <FaEye />}
                        {showPreview ? "Hide Preview" : "Show Preview"}
                    </button>
                </h2>
            </div>

            <div className="p-6 space-y-8">
                {/* Status Alert */}
                {saveStatus && (
                    <div
                        className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
                            saveStatus === "success"
                                ? "bg-green-50 border-green-500 text-green-800"
                                : saveStatus === "error"
                                  ? "bg-red-50 border-red-500 text-red-800"
                                  : "bg-yellow-50 border-yellow-500 text-yellow-800"
                        }`}
                    >
                        {saveStatus === "success" && (
                            <>
                                <FaCheckCircle className="text-2xl" />
                                <div>
                                    <p className="font-bold">
                                        ✓ Successfully Saved!
                                    </p>
                                    <p className="text-sm">
                                        Navbar saved locally. Click "Publish
                                        All" to sync to server.
                                    </p>
                                </div>
                            </>
                        )}
                        {saveStatus === "error" && (
                            <>
                                <FaExclamationTriangle className="text-2xl" />
                                <div>
                                    <p className="font-bold">✗ Save Failed</p>
                                    <p className="text-sm">
                                        Failed to save configuration. Please try
                                        again.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Preview Section */}
                {showPreview && (
                    <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                Live Preview
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPreviewMode("desktop")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                        previewMode === "desktop"
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    <FaDesktop /> Desktop
                                </button>
                                <button
                                    onClick={() => setPreviewMode("mobile")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                        previewMode === "mobile"
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    <FaMobileAlt /> Mobile
                                </button>
                            </div>
                        </div>

                        {/* Desktop Preview */}
                        {previewMode === "desktop" && (
                            <div
                                className="rounded-lg overflow-hidden shadow-lg"
                                style={{
                                    backgroundColor: formData.navbarBgColor,
                                    color: formData.textColor,
                                }}
                            >
                                <div className="px-6 py-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        {logoPreview && (
                                            <img
                                                src={logoPreview}
                                                alt="Logo"
                                                className="w-12 h-12 rounded-full object-contain"
                                                style={{
                                                    border: `2px solid ${formData.logoBorderColor}`,
                                                }}
                                            />
                                        )}
                                        <span className="font-bold">
                                            {formData.companyName ||
                                                "Company Name"}
                                        </span>
                                    </div>
                                    <div className="flex gap-4">
                                        {formData.navLinks &&
                                            formData.navLinks.map(
                                                (link, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
                                                        style={{
                                                            backgroundColor:
                                                                hoveredIndex ===
                                                                index
                                                                    ? formData.hoverBgColor
                                                                    : "transparent",
                                                            color:
                                                                hoveredIndex ===
                                                                index
                                                                    ? formData.hoverTextColor
                                                                    : formData.textColor,
                                                        }}
                                                        onMouseEnter={() =>
                                                            setHoveredIndex(
                                                                index,
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setHoveredIndex(
                                                                null,
                                                            )
                                                        }
                                                    >
                                                        {renderIcon(link.icon)}
                                                        <span>
                                                            {link.label}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                    </div>
                                    {formData.showGautamLogo && (
                                        <div className="flex items-center">
                                            <img
                                                src={formData.gautamLogoUrl}
                                                alt="Partner Logo"
                                                className="h-10 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Mobile Preview */}
                        {previewMode === "mobile" && (
                            <div className="max-w-sm mx-auto">
                                <div
                                    className="rounded-lg overflow-hidden shadow-lg"
                                    style={{
                                        backgroundColor: formData.navbarBgColor,
                                        color: formData.textColor,
                                    }}
                                >
                                    <div className="px-4 py-3 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            {logoPreview && (
                                                <img
                                                    src={logoPreview}
                                                    alt="Logo"
                                                    className="w-10 h-10 rounded-full object-contain"
                                                    style={{
                                                        border: `2px solid ${formData.logoBorderColor}`,
                                                    }}
                                                />
                                            )}
                                            <span className="font-bold text-sm">
                                                {formData.companyName ||
                                                    "Company Name"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="w-6 h-0.5 bg-white"></div>
                                            <div className="w-6 h-0.5 bg-white"></div>
                                            <div className="w-6 h-0.5 bg-white"></div>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/20">
                                        {formData.navLinks &&
                                            formData.navLinks.map(
                                                (link, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 px-4 py-3 border-b border-white/10 cursor-pointer transition-all duration-300"
                                                        style={{
                                                            backgroundColor:
                                                                hoveredIndex ===
                                                                index
                                                                    ? formData.hoverBgColor
                                                                    : "transparent",
                                                            color:
                                                                hoveredIndex ===
                                                                index
                                                                    ? formData.hoverTextColor
                                                                    : formData.textColor,
                                                        }}
                                                        onMouseEnter={() =>
                                                            setHoveredIndex(
                                                                index,
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setHoveredIndex(
                                                                null,
                                                            )
                                                        }
                                                    >
                                                        <span className="text-lg">
                                                            {renderIcon(
                                                                link.icon,
                                                            )}
                                                        </span>
                                                        <span className="text-sm">
                                                            {link.label}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        {formData.showGautamLogo && (
                                            <div className="flex justify-center py-3">
                                                <img
                                                    src={formData.gautamLogoUrl}
                                                    alt="Partner Logo"
                                                    className="h-8 object-contain"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Company Information */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Company Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) =>
                                    handleChange("companyName", e.target.value)
                                }
                                placeholder="Enter company name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Company Logo
                            </label>
                            <div className="flex gap-3 items-center">
                                {logoPreview && (
                                    <img
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        className="w-16 h-16 rounded-full object-contain border-2 border-gray-300"
                                    />
                                )}
                                <label className="flex-1 cursor-pointer">
                                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition border border-gray-300">
                                        <FaUpload />
                                        <span>Upload Logo</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Theme Colors */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Theme Colors
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Navbar Background
                            </label>
                            <input
                                type="color"
                                value={formData.navbarBgColor}
                                onChange={(e) =>
                                    handleChange(
                                        "navbarBgColor",
                                        e.target.value,
                                    )
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.navbarBgColor}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Text Color
                            </label>
                            <input
                                type="color"
                                value={formData.textColor}
                                onChange={(e) =>
                                    handleChange("textColor", e.target.value)
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.textColor}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Hover Background Color
                            </label>
                            <input
                                type="color"
                                value={formData.hoverBgColor}
                                onChange={(e) =>
                                    handleChange("hoverBgColor", e.target.value)
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.hoverBgColor}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Hover Text Color
                            </label>
                            <input
                                type="color"
                                value={formData.hoverTextColor}
                                onChange={(e) =>
                                    handleChange(
                                        "hoverTextColor",
                                        e.target.value,
                                    )
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.hoverTextColor}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Glow Effect Color
                            </label>
                            <input
                                type="color"
                                value={formData.glowColor}
                                onChange={(e) =>
                                    handleChange("glowColor", e.target.value)
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.glowColor}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Navigation Links */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                            Navigation Links
                        </h3>
                        <button
                            onClick={addNavLink}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
                        >
                            + Add Link
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.navLinks &&
                            formData.navLinks.map((link, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Label
                                        </label>
                                        <input
                                            type="text"
                                            value={link.label}
                                            onChange={(e) =>
                                                handleNavLinkChange(
                                                    index,
                                                    "label",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Home"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Path
                                        </label>
                                        <input
                                            type="text"
                                            value={link.path}
                                            onChange={(e) =>
                                                handleNavLinkChange(
                                                    index,
                                                    "path",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="/home"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Icon
                                        </label>
                                        <select
                                            value={link.icon}
                                            onChange={(e) =>
                                                handleNavLinkChange(
                                                    index,
                                                    "icon",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            {iconOptions.map((icon) => (
                                                <option key={icon} value={icon}>
                                                    {icon.replace("Fa", "")}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="mt-1 flex items-center gap-2 text-gray-600">
                                            <span className="text-xs">
                                                Preview:
                                            </span>
                                            <span className="text-lg">
                                                {renderIcon(link.icon)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            onClick={() => removeNavLink(index)}
                                            className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Visual Effects */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Visual Effects
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Active Background Opacity
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={formData.activeBgOpacity}
                                onChange={(e) =>
                                    handleChange(
                                        "activeBgOpacity",
                                        e.target.value,
                                    )
                                }
                                className="w-full"
                            />
                            <p className="text-sm text-gray-600 mt-1">
                                {formData.activeBgOpacity}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Background Opacity (Scrolled)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={formData.bgOpacity}
                                onChange={(e) =>
                                    handleChange("bgOpacity", e.target.value)
                                }
                                className="w-full"
                            />
                            <p className="text-sm text-gray-600 mt-1">
                                {formData.bgOpacity}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.scrolledShadow}
                                onChange={(e) =>
                                    handleChange(
                                        "scrolledShadow",
                                        e.target.checked,
                                    )
                                }
                                className="w-5 h-5 text-indigo-600 rounded"
                            />
                            <span className="text-gray-700">
                                Enable Scrolled Shadow
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.backdropBlur}
                                onChange={(e) =>
                                    handleChange(
                                        "backdropBlur",
                                        e.target.checked,
                                    )
                                }
                                className="w-5 h-5 text-indigo-600 rounded"
                            />
                            <span className="text-gray-700">
                                Enable Backdrop Blur
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.glowEffect}
                                onChange={(e) =>
                                    handleChange("glowEffect", e.target.checked)
                                }
                                className="w-5 h-5 text-indigo-600 rounded"
                            />
                            <span className="text-gray-700">
                                Enable Glow Effect
                            </span>
                        </label>
                    </div>
                </section>

                {/* Gautam Solar Logo Settings */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Partner Logo (Gautam Solar)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Logo URL
                            </label>
                            <input
                                type="text"
                                value={formData.gautamLogoUrl}
                                onChange={(e) =>
                                    handleChange(
                                        "gautamLogoUrl",
                                        e.target.value,
                                    )
                                }
                                placeholder="/gautamLogo.png"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Partner Link
                            </label>
                            <input
                                type="url"
                                value={formData.gautamSolarLink}
                                onChange={(e) =>
                                    handleChange(
                                        "gautamSolarLink",
                                        e.target.value,
                                    )
                                }
                                placeholder="https://gautamsolar.com/"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.showGautamLogo}
                            onChange={(e) =>
                                handleChange("showGautamLogo", e.target.checked)
                            }
                            className="w-5 h-5 text-indigo-600 rounded"
                        />
                        <span className="text-gray-700">Show Partner Logo</span>
                    </label>
                </section>

                {/* Save Button */}
                <div className="flex gap-4 pt-6 border-t">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition shadow-lg flex items-center justify-center gap-2 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5"
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
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <FaSave />
                                Save Navbar Configuration
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbarForm;






