// import { useState, useEffect } from "react";
// import {
//     FaEye,
//     FaEyeSlash,
//     FaImage,
//     FaDesktop,
//     FaMobileAlt,
//     FaTimes,
//     FaEnvelope,
//     FaPhoneAlt,
//     FaMapMarkerAlt,
//     FaGlobe,
//     FaEdit,
//     FaSave,
//     FaCheckCircle,
//     FaExclamationTriangle
// } from "react-icons/fa";
// import { saveSectionData } from "../../../../components/services/api";

// const FooterForm = ({ initialData, onSave, clientSlug = "default-client" }) => {
//     const [showPreview, setShowPreview] = useState(false);
//     const [previewMode, setPreviewMode] = useState("desktop");
//     const [loading, setLoading] = useState(false);
//     const [saveStatus, setSaveStatus] = useState(null);

//     // Default data structure
//     const defaultData = {
//         // Company Information
//         companyName: "Solar Solutions",
//         tagline: "Driving a sustainable future with next-generation solar innovation.",

//         // Logo
//         logo: "",

//         // Contact Information
//         phone: "+91 9876543210",
//         email: "info@company.com",
//         address: "123 Solar Street, Green City, India 123456",
//         website: "www.company.com",

//         // Partner Information
//         partnerName: "Gautam Solar",
//         partnerLink: "https://gautamsolar.com/",
//         partnerColor: "#dc2626", // Red-600

//         // Theme Colors
//         backgroundColor: "#1f2937", // Gray-800
//         textColor: "#f9fafb", // Gray-50
//         primaryColor: "#f97316", // Orange-500
//         gradientFrom: "#f97316",
//         gradientTo: "#eab308",

//         // Footer Content
//         footerContent: {
//             description: "At [Company Name], we combine advanced technology and engineering expertise to deliver reliable, high-performance solar solutions.",
//             contactHeading: "Contact Us"
//         }
//     };

//     const [formData, setFormData] = useState(() => {
//         if (initialData) {
//             return {
//                 ...defaultData,
//                 ...initialData
//             };
//         }
//         return defaultData;
//     });

//     const [imagePreviews, setImagePreviews] = useState({
//         logo: formData.logo
//     });

//     // Sync with initialData when it changes
//     useEffect(() => {
//         if (initialData) {
//             setFormData({
//                 ...defaultData,
//                 ...initialData
//             });
//             setImagePreviews({
//                 logo: initialData.logo || ""
//             });
//         }
//     }, [initialData]);

//     // Load from localStorage on mount if no initialData
//     useEffect(() => {
//         if (!initialData) {
//             const savedData = localStorage.getItem(`footer_${clientSlug}`);
//             if (savedData) {
//                 try {
//                     const parsed = JSON.parse(savedData);
//                     if (parsed.data) {
//                         setFormData({
//                             ...defaultData,
//                             ...parsed.data
//                         });
//                         setImagePreviews({
//                             logo: parsed.data.logo || ""
//                         });
//                     }
//                 } catch (error) {
//                     console.error('Error loading saved data:', error);
//                 }
//             }
//         }
//     }, [clientSlug]);

//     const handleChange = (key, value) => {
//         setFormData({ ...formData, [key]: value });
//     };

//     const handleContentChange = (key, value) => {
//         setFormData({
//             ...formData,
//             footerContent: { ...formData.footerContent, [key]: value }
//         });
//     };

//     const handleImageUpload = (e, imageKey) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreviews({ ...imagePreviews, [imageKey]: reader.result });
//                 handleChange(imageKey, reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
//         setSaveStatus(null);

//         try {
//             // Save to API
//             const result = await saveSectionData('footer', formData, clientSlug);

//             // Save to localStorage as backup
//             try {
//                 localStorage.setItem(`footer_${clientSlug}`, JSON.stringify({
//                     data: formData,
//                     timestamp: new Date().toISOString(),
//                     clientSlug
//                 }));
//             } catch (localStorageError) {
//                 console.warn('Failed to save to localStorage:', localStorageError);
//             }

//             if (result.success) {
//                 setSaveStatus('success');

//                 if (onSave) {
//                     onSave(formData);
//                 }

//                 setTimeout(() => {
//                     setSaveStatus(null);
//                 }, 5000);
//             }

//         } catch (error) {
//             console.error('Save failed:', error);
//             setSaveStatus('error');

//             setTimeout(() => {
//                 setSaveStatus(null);
//             }, 8000);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
//                 <h2 className="text-2xl font-bold text-white flex items-center justify-between">
//                     <span>Footer Configuration</span>
//                     <div className="flex items-center gap-2">

//                         <button
//                             onClick={() => setShowPreview(!showPreview)}
//                             className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition text-sm"
//                         >
//                             {showPreview ? <FaEyeSlash /> : <FaEye />}
//                             {showPreview ? "Hide Preview" : "Show Preview"}
//                         </button>
//                     </div>
//                 </h2>
//             </div>

//             <div className="p-6 space-y-8">
//                 {/* Status Alert */}
//                 {saveStatus && (
//                     <div className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
//                         saveStatus === 'success'
//                             ? 'bg-green-50 border-green-500 text-green-800'
//                             : 'bg-red-50 border-red-500 text-red-800'
//                     }`}>
//                         {saveStatus === 'success' && (
//                             <>
//                                 <FaCheckCircle className="text-2xl" />
//                                 <div>
//                                     <p className="font-bold">✓ Successfully Saved!</p>
//                                     <p className="text-sm">Footer configuration saved successfully.</p>
//                                 </div>
//                             </>
//                         )}
//                         {saveStatus === 'error' && (
//                             <>
//                                 <FaExclamationTriangle className="text-2xl" />
//                                 <div>
//                                     <p className="font-bold">✗ Save Failed</p>
//                                     <p className="text-sm">Failed to save configuration. Please try again.</p>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 )}

//                 {/* Preview Section */}
//                 {showPreview && (
//                     <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-lg font-semibold">Live Preview</h3>
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

//                         {/* Preview Content */}
//                         <div className={`${previewMode === "mobile" ? "max-w-md mx-auto" : ""}`}>
//                             <footer
//                                 style={{
//                                     backgroundColor: formData.backgroundColor,
//                                     color: formData.textColor
//                                 }}
//                                 className="p-6 rounded-xl"
//                             >
//                                 <div className={`grid ${previewMode === "desktop" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"} gap-6 md:gap-8 items-start border border-gray-700 rounded-xl p-5 md:p-6`}>
//                                     {/* Logo & Description - Left Side */}
//                                     <div className={`flex flex-col gap-4 ${previewMode === "desktop" ? "md:col-span-2" : ""}`}>
//                                         {/* Logo */}
//                                         <div className="w-fit p-2 rounded-lg overflow-hidden">
//                                             {imagePreviews.logo ? (
//                                                 <img
//                                                     src={imagePreviews.logo}
//                                                     alt={formData.companyName}
//                                                     className=" w-38 h-38 object-cover rounded-full"
//                                                 />
//                                             ) : (
//                                                 <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-gray-600 text-xs">
//                                                     Logo
//                                                 </div>
//                                             )}
//                                         </div>

//                                         {/* Description */}
//                                         <div className="space-y-3">
//                                             <p className="text-sm md:text-base leading-relaxed">
//                                                 {formData.tagline}
//                                             </p>
//                                             <p className="text-sm md:text-base leading-relaxed max-w-2xl">
//                                                 {formData.footerContent.description.replace(
//                                                     "[Company Name]",
//                                                     formData.companyName
//                                                 )}
//                                             </p>
//                                             <p className="text-sm">
//                                                 In partnership with{" "}
//                                                 <a
//                                                     href={formData.partnerLink}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="font-bold hover:underline"
//                                                     style={{ color: formData.partnerColor }}
//                                                 >
//                                                     {formData.partnerName}
//                                                 </a>
//                                             </p>
//                                         </div>
//                                     </div>

//                                     {/* Contact Info - Right Side */}
//                                     <div className="flex flex-col gap-4">
//                                         <h4
//                                             style={{ color: formData.primaryColor }}
//                                             className="text-lg font-semibold"
//                                         >
//                                             {formData.footerContent.contactHeading}
//                                         </h4>

//                                         <div className="space-y-3">
//                                             {formData.phone && (
//                                                 <div className="flex items-center gap-3">
//                                                     <FaPhoneAlt className="text-gray-400" />
//                                                     <a
//                                                         href={`tel:${formData.phone}`}
//                                                         className="hover:underline text-sm md:text-base"
//                                                     >
//                                                         {formData.phone}
//                                                     </a>
//                                                 </div>
//                                             )}

//                                             {formData.email && (
//                                                 <div className="flex items-center gap-3">
//                                                     <FaEnvelope className="text-gray-400" />
//                                                     <a
//                                                         href={`mailto:${formData.email}`}
//                                                         className="hover:underline text-sm md:text-base"
//                                                     >
//                                                         {formData.email}
//                                                     </a>
//                                                 </div>
//                                             )}

//                                             {formData.address && (
//                                                 <div className="flex items-center gap-3">
//                                                     <FaMapMarkerAlt className="text-gray-400" />
//                                                     <a
//                                                         href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.address)}`}
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="hover:underline text-sm md:text-base"
//                                                     >
//                                                         {formData.address}
//                                                     </a>
//                                                 </div>
//                                             )}

//                                             {formData.website && (
//                                                 <div className="flex items-center gap-3">
//                                                     <FaGlobe className="text-gray-400" />
//                                                     <a
//                                                         href={`https://${formData.website}`}
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="hover:underline text-sm md:text-base"
//                                                     >
//                                                         {formData.website}
//                                                     </a>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Copyright */}
//                                 <div className="text-center mt-6">
//                                     <p className="text-sm">
//                                         © {new Date().getFullYear()}{" "}
//                                         <span
//                                             style={{
//                                                 background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                 WebkitBackgroundClip: "text",
//                                                 WebkitTextFillColor: "transparent",
//                                             }}
//                                             className="font-semibold"
//                                         >
//                                             {formData.companyName}
//                                         </span>
//                                         . All rights reserved.
//                                     </p>
//                                 </div>
//                             </footer>
//                         </div>
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
//                                 onChange={(e) => handleChange("companyName", e.target.value)}
//                                 placeholder="Enter company name"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Tagline
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.tagline}
//                                 onChange={(e) => handleChange("tagline", e.target.value)}
//                                 placeholder="Enter company tagline"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Logo */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Company Logo
//                     </h3>

//                     <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Logo Image
//                         </label>

//                         {imagePreviews.logo ? (
//                             <div className="space-y-2">
//                                 <div className="relative">
//                                     <div className="flex items-center justify-center">
//                                         <img
//                                             src={imagePreviews.logo}
//                                             alt="Logo"
//                                             className="w-48 h-48 object-cover rounded-full border-4 border-gray-300 bg-gray-100"
//                                         />
//                                     </div>
//                                     <button
//                                         onClick={() => {
//                                             setImagePreviews({ ...imagePreviews, logo: "" });
//                                             handleChange("logo", "");
//                                         }}
//                                         className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
//                                     >
//                                         <FaTimes />
//                                     </button>
//                                 </div>
//                                 <label className="cursor-pointer block max-w-xs">
//                                     <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
//                                         <FaImage />
//                                         <span className="text-sm">Replace Logo</span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) => handleImageUpload(e, "logo")}
//                                         className="hidden"
//                                     />
//                                 </label>
//                             </div>
//                         ) : (
//                             <label className="cursor-pointer block">
//                                 <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
//                                     <FaImage className="text-3xl text-gray-400" />
//                                     <span className="text-sm text-gray-600">Upload Logo</span>
//                                     <span className="text-xs text-gray-500">
//                                         Recommended: Square or round logo, transparent background
//                                     </span>
//                                 </div>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={(e) => handleImageUpload(e, "logo")}
//                                     className="hidden"
//                                 />
//                             </label>
//                         )}
//                     </div>
//                 </section>

//                 {/* Contact Information */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Contact Information
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Phone Number
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.phone}
//                                 onChange={(e) => handleChange("phone", e.target.value)}
//                                 placeholder="+91 9876543210"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Email Address
//                             </label>
//                             <input
//                                 type="email"
//                                 value={formData.email}
//                                 onChange={(e) => handleChange("email", e.target.value)}
//                                 placeholder="info@company.com"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Address
//                             </label>
//                             <textarea
//                                 value={formData.address}
//                                 onChange={(e) => handleChange("address", e.target.value)}
//                                 placeholder="123 Solar Street, Green City, India 123456"
//                                 rows="2"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Website
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.website}
//                                 onChange={(e) => handleChange("website", e.target.value)}
//                                 placeholder="www.company.com"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Partner Information */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Partner Information
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Partner Name
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.partnerName}
//                                 onChange={(e) => handleChange("partnerName", e.target.value)}
//                                 placeholder="Gautam Solar"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Partner Link
//                             </label>
//                             <input
//                                 type="url"
//                                 value={formData.partnerLink}
//                                 onChange={(e) => handleChange("partnerLink", e.target.value)}
//                                 placeholder="https://gautamsolar.com/"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Partner Link Color
//                             </label>
//                             <div className="flex items-center gap-3">
//                                 <input
//                                     type="color"
//                                     value={formData.partnerColor}
//                                     onChange={(e) => handleChange("partnerColor", e.target.value)}
//                                     className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
//                                 />
//                                 <input
//                                     type="text"
//                                     value={formData.partnerColor}
//                                     onChange={(e) => handleChange("partnerColor", e.target.value)}
//                                     placeholder="#dc2626"
//                                     className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Theme Colors */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Theme Colors
//                     </h3>

//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Background
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.backgroundColor}
//                                 onChange={(e) => handleChange("backgroundColor", e.target.value)}
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">{formData.backgroundColor}</p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Text
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.textColor}
//                                 onChange={(e) => handleChange("textColor", e.target.value)}
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">{formData.textColor}</p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Primary
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.primaryColor}
//                                 onChange={(e) => handleChange("primaryColor", e.target.value)}
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">{formData.primaryColor}</p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Gradient From
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.gradientFrom}
//                                 onChange={(e) => handleChange("gradientFrom", e.target.value)}
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">{formData.gradientFrom}</p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Gradient To
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.gradientTo}
//                                 onChange={(e) => handleChange("gradientTo", e.target.value)}
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">{formData.gradientTo}</p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Footer Content */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Footer Content
//                     </h3>

//                     <div className="space-y-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Description
//                                 <span className="text-sm text-gray-500 ml-2">
//                                     (Use [Company Name] where you want the company name to appear)
//                                 </span>
//                             </label>
//                             <textarea
//                                 value={formData.footerContent.description}
//                                 onChange={(e) => handleContentChange("description", e.target.value)}
//                                 placeholder="At [Company Name], we combine advanced technology and engineering expertise to deliver reliable, high-performance solar solutions."
//                                 rows="3"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Contact Section Heading
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.footerContent.contactHeading}
//                                 onChange={(e) => handleContentChange("contactHeading", e.target.value)}
//                                 placeholder="Contact Us"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Save Button */}
//                 <div className="flex gap-4 pt-6 border-t">
//                     <button
//                         onClick={handleSubmit}
//                         disabled={loading}
//                         className={`flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition shadow-lg flex items-center justify-center gap-2 ${
//                             loading ? 'opacity-50 cursor-not-allowed' : ''
//                         }`}
//                     >
//                         {loading ? (
//                             <>
//                                 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                                 </svg>
//                                 <span>Saving...</span>
//                             </>
//                         ) : (
//                             <>
//                                 <FaSave />
//                                 <span>Save Footer Configuration</span>
//                             </>
//                         )}
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default FooterForm;

import { useState, useEffect } from "react";
import {
    FaEye,
    FaEyeSlash,
    FaImage,
    FaDesktop,
    FaMobileAlt,
    FaTimes,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaGlobe,
    FaSave,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";
import { useWebsiteData } from "../../../../context/WebsiteDataContext";

const FooterForm = () => {
    const { websiteData, saveSectionData, clientSlug } = useWebsiteData();
    const [showPreview, setShowPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState("desktop");
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    const defaultData = {
        companyName: "Gautam Solar",
        logo: "",
        tagline: "Powering a Sustainable Future",
        phone: "+91 9876543210",
        email: "info@company.com",
        address: "123 Street, City, Country",
        website: "www.company.com",
        partnerName: "Gautam Solar",
        partnerLink: "https://gautamsolar.com/",
        partnerColor: "#dc2626",
        backgroundColor: "#1f2937",
        textColor: "#ffffff",
        primaryColor: "#3b82f6",
        gradientFrom: "#3b82f6",
        gradientTo: "#8b5cf6",

        // Footer content structure
        footerContent: {
            description:
                "At [Company Name], we combine advanced technology and engineering expertise to deliver reliable, high-performance solar solutions.",
            contactHeading: "Contact Us",
        },
    };

    const [formData, setFormData] = useState(defaultData);
    const [imagePreviews, setImagePreviews] = useState({
        logo: "",
    });

    // Load from context
    useEffect(() => {
        if (websiteData.footer) {
            const loadedData = {
                ...defaultData,
                ...websiteData.footer,
                // Ensure nested objects exist
                footerContent: {
                    ...defaultData.footerContent,
                    ...(websiteData.footer.footerContent || {}),
                },
            };

            setFormData(loadedData);
            setImagePreviews({
                logo: websiteData.footer.logo || "",
            });
        }
    }, [websiteData.footer]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem(`footer_${clientSlug}`);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed.data) {
                    const loadedData = {
                        ...defaultData,
                        ...parsed.data,
                        // Ensure nested objects exist
                        footerContent: {
                            ...defaultData.footerContent,
                            ...(parsed.data.footerContent || {}),
                        },
                    };

                    setFormData(loadedData);
                    setImagePreviews({
                        logo: parsed.data.logo || "",
                    });
                }
            } catch (error) {
                console.error("Error loading saved data:", error);
            }
        }
    }, [clientSlug]);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleContentChange = (key, value) => {
        setFormData({
            ...formData,
            footerContent: { ...formData.footerContent, [key]: value },
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setSaveStatus(null);

        try {
            const result = saveSectionData("footer", formData);

            if (result.success) {
                setSaveStatus("success");
                setTimeout(() => setSaveStatus(null), 5000);
            } else {
                setSaveStatus("error");
            }
        } catch (error) {
            console.error("Save failed:", error);
            setSaveStatus("error");
            setTimeout(() => setSaveStatus(null), 8000);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e, imageKey) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews({
                    ...imagePreviews,
                    [imageKey]: reader.result,
                });
                handleChange(imageKey, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
                <h2 className="text-2xl font-bold text-white flex items-center justify-between">
                    <span>Footer Configuration</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition text-sm"
                        >
                            {showPreview ? <FaEyeSlash /> : <FaEye />}
                            {showPreview ? "Hide Preview" : "Show Preview"}
                        </button>
                    </div>
                </h2>
            </div>

            <div className="p-6 space-y-8">
                {/* Status Alert */}
                {saveStatus && (
                    <div
                        className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
                            saveStatus === "success"
                                ? "bg-green-50 border-green-500 text-green-800"
                                : "bg-red-50 border-red-500 text-red-800"
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
                                        Footer configuration saved successfully.
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

                        {/* Preview Content */}
                        <div
                            className={`${previewMode === "mobile" ? "max-w-md mx-auto" : ""}`}
                        >
                            <footer
                                style={{
                                    backgroundColor: formData.backgroundColor,
                                    color: formData.textColor,
                                }}
                                className="p-6 rounded-xl"
                            >
                                <div
                                    className={`grid ${previewMode === "desktop" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"} gap-6 md:gap-8 items-start border border-gray-700 rounded-xl p-5 md:p-6`}
                                >
                                    {/* Logo & Description - Left Side */}
                                    <div
                                        className={`flex flex-col gap-4 ${previewMode === "desktop" ? "md:col-span-2" : ""}`}
                                    >
                                        {/* Logo */}
                                        <div className="w-fit p-2 rounded-lg overflow-hidden">
                                            {imagePreviews.logo ? (
                                                <img
                                                    src={imagePreviews.logo}
                                                    alt={formData.companyName}
                                                    className="w-38 h-38 object-cover rounded-full"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-gray-600 text-xs">
                                                    Logo
                                                </div>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-3">
                                            <p className="text-sm md:text-base leading-relaxed">
                                                {formData.tagline}
                                            </p>
                                            <p className="text-sm md:text-base leading-relaxed max-w-2xl">
                                                {formData.footerContent?.description?.replace(
                                                    "[Company Name]",
                                                    formData.companyName,
                                                )}
                                            </p>
                                            <p className="text-sm">
                                                In partnership with{" "}
                                                <a
                                                    href={formData.partnerLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-bold hover:underline"
                                                    style={{
                                                        color: formData.partnerColor,
                                                    }}
                                                >
                                                    {formData.partnerName}
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Contact Info - Right Side */}
                                    <div className="flex flex-col gap-4">
                                        <h4
                                            style={{
                                                color: formData.primaryColor,
                                            }}
                                            className="text-lg font-semibold"
                                        >
                                            {formData.footerContent
                                                ?.contactHeading ||
                                                "Contact Us"}
                                        </h4>

                                        <div className="space-y-3">
                                            {formData.phone && (
                                                <div className="flex items-center gap-3">
                                                    <FaPhoneAlt className="text-gray-400" />
                                                    <a
                                                        href={`tel:${formData.phone}`}
                                                        className="hover:underline text-sm md:text-base"
                                                    >
                                                        {formData.phone}
                                                    </a>
                                                </div>
                                            )}

                                            {formData.email && (
                                                <div className="flex items-center gap-3">
                                                    <FaEnvelope className="text-gray-400" />
                                                    <a
                                                        href={`mailto:${formData.email}`}
                                                        className="hover:underline text-sm md:text-base"
                                                    >
                                                        {formData.email}
                                                    </a>
                                                </div>
                                            )}

                                            {formData.address && (
                                                <div className="flex items-center gap-3">
                                                    <FaMapMarkerAlt className="text-gray-400" />
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.address)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline text-sm md:text-base"
                                                    >
                                                        {formData.address}
                                                    </a>
                                                </div>
                                            )}

                                            {formData.website && (
                                                <div className="flex items-center gap-3">
                                                    <FaGlobe className="text-gray-400" />
                                                    <a
                                                        href={`https://${formData.website}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline text-sm md:text-base"
                                                    >
                                                        {formData.website}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Copyright */}
                                <div className="text-center mt-6">
                                    <p className="text-sm">
                                        © {new Date().getFullYear()}{" "}
                                        <span
                                            style={{
                                                background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor:
                                                    "transparent",
                                            }}
                                            className="font-semibold"
                                        >
                                            {formData.companyName}
                                        </span>
                                        . All rights reserved.
                                    </p>
                                </div>
                            </footer>
                        </div>
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
                                Tagline
                            </label>
                            <input
                                type="text"
                                value={formData.tagline}
                                onChange={(e) =>
                                    handleChange("tagline", e.target.value)
                                }
                                placeholder="Enter company tagline"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </section>

                {/* Logo */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Company Logo
                    </h3>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <label className="block font-medium text-gray-700 mb-2">
                            Logo Image
                        </label>

                        {imagePreviews.logo ? (
                            <div className="space-y-2">
                                <div className="relative">
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={imagePreviews.logo}
                                            alt="Logo"
                                            className="w-48 h-48 object-cover rounded-full border-4 border-gray-300 bg-gray-100"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            setImagePreviews({
                                                ...imagePreviews,
                                                logo: "",
                                            });
                                            handleChange("logo", "");
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <label className="cursor-pointer block max-w-xs">
                                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
                                        <FaImage />
                                        <span className="text-sm">
                                            Replace Logo
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageUpload(e, "logo")
                                        }
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        ) : (
                            <label className="cursor-pointer block">
                                <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
                                    <FaImage className="text-3xl text-gray-400" />
                                    <span className="text-sm text-gray-600">
                                        Upload Logo
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Recommended: Square or round logo,
                                        transparent background
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageUpload(e, "logo")
                                    }
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </section>

                {/* Contact Information */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Contact Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) =>
                                    handleChange("phone", e.target.value)
                                }
                                placeholder="+91 9876543210"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    handleChange("email", e.target.value)
                                }
                                placeholder="info@company.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Address
                            </label>
                            <textarea
                                value={formData.address}
                                onChange={(e) =>
                                    handleChange("address", e.target.value)
                                }
                                placeholder="123 Solar Street, Green City, India 123456"
                                rows="2"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Website
                            </label>
                            <input
                                type="text"
                                value={formData.website}
                                onChange={(e) =>
                                    handleChange("website", e.target.value)
                                }
                                placeholder="www.company.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Partner Information */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Partner Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Partner Name
                            </label>
                            <input
                                type="text"
                                value={formData.partnerName}
                                onChange={(e) =>
                                    handleChange("partnerName", e.target.value)
                                }
                                placeholder="Gautam Solar"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Partner Link
                            </label>
                            <input
                                type="url"
                                value={formData.partnerLink}
                                onChange={(e) =>
                                    handleChange("partnerLink", e.target.value)
                                }
                                placeholder="https://gautamsolar.com/"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Partner Link Color
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={formData.partnerColor}
                                    onChange={(e) =>
                                        handleChange(
                                            "partnerColor",
                                            e.target.value,
                                        )
                                    }
                                    className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
                                />
                                <input
                                    type="text"
                                    value={formData.partnerColor}
                                    onChange={(e) =>
                                        handleChange(
                                            "partnerColor",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="#dc2626"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Theme Colors */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Theme Colors
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2 text-sm">
                                Background
                            </label>
                            <input
                                type="color"
                                value={formData.backgroundColor}
                                onChange={(e) =>
                                    handleChange(
                                        "backgroundColor",
                                        e.target.value,
                                    )
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.backgroundColor}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2 text-sm">
                                Text
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
                            <label className="block font-medium text-gray-700 mb-2 text-sm">
                                Primary
                            </label>
                            <input
                                type="color"
                                value={formData.primaryColor}
                                onChange={(e) =>
                                    handleChange("primaryColor", e.target.value)
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.primaryColor}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2 text-sm">
                                Gradient From
                            </label>
                            <input
                                type="color"
                                value={formData.gradientFrom}
                                onChange={(e) =>
                                    handleChange("gradientFrom", e.target.value)
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.gradientFrom}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2 text-sm">
                                Gradient To
                            </label>
                            <input
                                type="color"
                                value={formData.gradientTo}
                                onChange={(e) =>
                                    handleChange("gradientTo", e.target.value)
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.gradientTo}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer Content */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Footer Content
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Description
                                <span className="text-sm text-gray-500 ml-2">
                                    (Use [Company Name] where you want the
                                    company name to appear)
                                </span>
                            </label>
                            <textarea
                                value={
                                    formData.footerContent?.description || ""
                                }
                                onChange={(e) =>
                                    handleContentChange(
                                        "description",
                                        e.target.value,
                                    )
                                }
                                placeholder="At [Company Name], we combine advanced technology and engineering expertise to deliver reliable, high-performance solar solutions."
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Contact Section Heading
                            </label>
                            <input
                                type="text"
                                value={
                                    formData.footerContent?.contactHeading || ""
                                }
                                onChange={(e) =>
                                    handleContentChange(
                                        "contactHeading",
                                        e.target.value,
                                    )
                                }
                                placeholder="Contact Us"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
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
                                <span>Save Footer Configuration</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FooterForm;
