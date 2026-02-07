// import { useState } from "react";
// import {
//     FaUpload,
//     FaEye,
//     FaEyeSlash,
//     FaImage,
//     FaEnvelope,
//     FaPhone,
//     FaMapMarkerAlt,
//     FaDesktop,
//     FaMobileAlt,
//     FaTimes
// } from "react-icons/fa";

// const SectionForm1 = ({ initialData, onSave }) => {
//     const [showPreview, setShowPreview] = useState(false);
//     const [previewMode, setPreviewMode] = useState("desktop"); // "desktop" or "mobile"
//     const [formData, setFormData] = useState({
//         // Company Basic Info
//         companyName: initialData?.companyName || "Gautam Solar",
//         logo: initialData?.logo || "",
//         email: initialData?.email || "gautamsolar@gmail.com",
//         phone: initialData?.phone || "99999999999",
//         location: initialData?.location || "Govind puri okhla",

//         // Background Images
//         bgimg1: initialData?.bgimg1 || "",
//         bgimg2: initialData?.bgimg2 || "",
//         bgimg3: initialData?.bgimg3 || "",
//         bgimg4: initialData?.bgimg4 || "",
//         bgimg5: initialData?.bgimg5 || "",

//         // Section Content
//         sectioncontent1: initialData?.sectioncontent1 || "We are a locally based solar EPC service provider specializing in rooftop and ground-mounted solar power plant installations for residential, commercial, and industrial customers. We deliver complete end-to-end EPC services, including site assessment, system design, engineering, installation, commissioning, and long-term after-sales support across the region.",
//         sectioncontent2: initialData?.sectioncontent2 || "As an authorized and certified solar dealer, we install ALMM-approved, high-efficiency solar modules designed to ensure long-term performance, safety, and dependable energy generation under Indian climatic conditions.",

//         // Theme Colors
//         backgroundColor: initialData?.backgroundColor || "#0f172a",
//         textColor: initialData?.textColor || "#ffffff",
//         primaryColor: initialData?.primaryColor || "#f97316",
//         secondaryColor: initialData?.secondaryColor || "#eab308",

//         // Gradient Text Colors
//         gradientFrom: initialData?.gradientFrom || "#f97316",
//         gradientTo: initialData?.gradientTo || "#eab308",

//         // Logo Overlay Settings
//         logoOverlayBg: initialData?.logoOverlayBg || "rgba(255, 255, 255, 0.1)",
//         logoSize: initialData?.logoSize || "96", // in pixels

//         // Gautam Solar Link
//         gautamSolarLink: initialData?.gautamSolarLink || "https://gautamsolar.com/",
//     });

//     const [imagePreviews, setImagePreviews] = useState({
//         logo: formData.logo,
//         bgimg1: formData.bgimg1,
//         bgimg2: formData.bgimg2,
//         bgimg3: formData.bgimg3,
//         bgimg4: formData.bgimg4,
//         bgimg5: formData.bgimg5,
//     });

//     const handleChange = (key, value) => {
//         setFormData({ ...formData, [key]: value });
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

//     const handleSubmit = () => {
//         onSave(formData);
//     };

//     return (
//         <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
//                 <h2 className="text-2xl font-bold text-white flex items-center justify-between">
//                     <span>Section 1 Configuration</span>
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

//                         {/* Desktop Preview */}
//                         {previewMode === "desktop" && (
//                             <div className="rounded-lg overflow-hidden shadow-lg">
//                                 <div className="grid grid-cols-2 min-h-[500px]">
//                                     {/* Left Side - Content */}
//                                     <div
//                                         className="flex items-center justify-center p-8"
//                                         style={{
//                                             backgroundColor: formData.backgroundColor,
//                                             color: formData.textColor,
//                                         }}
//                                     >
//                                         <div className="max-w-2xl w-full space-y-6">
//                                             {/* Heading */}
//                                             <h1
//                                                 className="text-2xl font-bold uppercase text-center lg:text-left"
//                                                 style={{
//                                                     background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                     WebkitBackgroundClip: "text",
//                                                     WebkitTextFillColor: "transparent",
//                                                 }}
//                                             >
//                                                 {formData.companyName}
//                                             </h1>

//                                             {/* Content */}
//                                             <div className="space-y-4 text-sm leading-relaxed">
//                                                 <p>
//                                                     At{" "}
//                                                     <span
//                                                         className="font-semibold"
//                                                         style={{
//                                                             background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                             WebkitBackgroundClip: "text",
//                                                             WebkitTextFillColor: "transparent",
//                                                         }}
//                                                     >
//                                                         {formData.companyName}
//                                                     </span>
//                                                     , {formData.sectioncontent1}
//                                                 </p>

//                                                 <p>
//                                                     As an Authorized{" "}
//                                                     <a
//                                                         href={formData.gautamSolarLink}
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="text-red-500 font-semibold hover:underline"
//                                                     >
//                                                         Gautam Solar Tec Pro Certified Dealer
//                                                     </a>
//                                                     , {formData.sectioncontent2}
//                                                 </p>

//                                                 <p className="text-xs opacity-90">
//                                                     We are a trusted EPC provider delivering end-to-end solar solutions. Specializing in high-performance turnkey systems, we combine innovation and sustainability to power a brighter, greener future.
//                                                 </p>
//                                             </div>

//                                             {/* Contact Info */}
//                                             <div className="flex gap-4 pt-4 text-sm">
//                                                 {formData.email && (
//                                                     <a
//                                                         href={`mailto:${formData.email}`}
//                                                         className="hover:underline flex items-center gap-2"
//                                                         style={{ color: formData.primaryColor }}
//                                                     >
//                                                         <span>📧</span>
//                                                         <span>{formData.email}</span>
//                                                     </a>
//                                                 )}

//                                                 {formData.phone && (
//                                                     <a
//                                                         href={`tel:${formData.phone}`}
//                                                         className="hover:underline flex items-center gap-2"
//                                                         style={{ color: formData.primaryColor }}
//                                                     >
//                                                         <span>📞</span>
//                                                         <span>{formData.phone}</span>
//                                                     </a>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Right Side - Image with Logo */}
//                                     <div className="relative h-[500px] overflow-hidden">
//                                         {imagePreviews.bgimg1 ? (
//                                             <img
//                                                 src={imagePreviews.bgimg1}
//                                                 alt="Background"
//                                                 className="absolute inset-0 w-full h-full object-cover"
//                                             />
//                                         ) : (
//                                             <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
//                                                 No Image
//                                             </div>
//                                         )}

//                                         {/* Gradient Overlay */}
//                                         <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

//                                         {/* Logo Overlay */}
//                                         {imagePreviews.logo && (
//                                             <div className="absolute inset-0 flex items-center justify-center">
//                                                 <div
//                                                     className="rounded-full overflow-hidden p-6 shadow-2xl backdrop-blur-sm"
//                                                     style={{ backgroundColor: formData.logoOverlayBg }}
//                                                 >
//                                                     <img
//                                                         src={imagePreviews.logo}
//                                                         alt="Logo"
//                                                         className="object-contain rounded-full"
//                                                         style={{
//                                                             width: `${formData.logoSize}px`,
//                                                             height: `${formData.logoSize}px`,
//                                                         }}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Mobile Preview */}
//                         {previewMode === "mobile" && (
//                             <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg">
//                                 {/* Image Section (Top on Mobile) */}
//                                 <div className="relative h-[300px] overflow-hidden">
//                                     {imagePreviews.bgimg1 ? (
//                                         <img
//                                             src={imagePreviews.bgimg1}
//                                             alt="Background"
//                                             className="absolute inset-0 w-full h-full object-cover"
//                                         />
//                                     ) : (
//                                         <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
//                                             No Image
//                                         </div>
//                                     )}

//                                     {/* Gradient Overlay */}
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

//                                     {/* Logo Overlay */}
//                                     {imagePreviews.logo && (
//                                         <div className="absolute inset-0 flex items-center justify-center">
//                                             <div
//                                                 className="rounded-full overflow-hidden p-4 shadow-2xl backdrop-blur-sm"
//                                                 style={{ backgroundColor: formData.logoOverlayBg }}
//                                             >
//                                                 <img
//                                                     src={imagePreviews.logo}
//                                                     alt="Logo"
//                                                     className="w-16 h-16 object-contain rounded-full"
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Content Section */}
//                                 <div
//                                     className="p-6 space-y-4"
//                                     style={{
//                                         backgroundColor: formData.backgroundColor,
//                                         color: formData.textColor,
//                                     }}
//                                 >
//                                     <h1
//                                         className="text-lg font-bold uppercase text-center"
//                                         style={{
//                                             background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                             WebkitBackgroundClip: "text",
//                                             WebkitTextFillColor: "transparent",
//                                         }}
//                                     >
//                                         {formData.companyName}
//                                     </h1>

//                                     <div className="space-y-3 text-xs leading-relaxed">
//                                         <p>
//                                             At{" "}
//                                             <span
//                                                 className="font-semibold"
//                                                 style={{
//                                                     background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                     WebkitBackgroundClip: "text",
//                                                     WebkitTextFillColor: "transparent",
//                                                 }}
//                                             >
//                                                 {formData.companyName}
//                                             </span>
//                                             , {formData.sectioncontent1}
//                                         </p>

//                                         <p>
//                                             As an Authorized{" "}
//                                             <a
//                                                 href={formData.gautamSolarLink}
//                                                 className="text-red-500 font-semibold"
//                                             >
//                                                 Gautam Solar Tec Pro Certified Dealer
//                                             </a>
//                                             , {formData.sectioncontent2}
//                                         </p>
//                                     </div>

//                                     {/* Contact Info */}
//                                     <div className="flex flex-col gap-2 pt-3 text-xs">
//                                         {formData.email && (
//                                             <a
//                                                 href={`mailto:${formData.email}`}
//                                                 className="flex items-center gap-2 break-all"
//                                                 style={{ color: formData.primaryColor }}
//                                             >
//                                                 <span>📧</span>
//                                                 <span>{formData.email}</span>
//                                             </a>
//                                         )}

//                                         {formData.phone && (
//                                             <a
//                                                 href={`tel:${formData.phone}`}
//                                                 className="flex items-center gap-2"
//                                                 style={{ color: formData.primaryColor }}
//                                             >
//                                                 <span>📞</span>
//                                                 <span>{formData.phone}</span>
//                                             </a>
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
//                                 onChange={(e) => handleChange("companyName", e.target.value)}
//                                 placeholder="Enter company name"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 value={formData.email}
//                                 onChange={(e) => handleChange("email", e.target.value)}
//                                 placeholder="company@example.com"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Phone
//                             </label>
//                             <input
//                                 type="tel"
//                                 value={formData.phone}
//                                 onChange={(e) => handleChange("phone", e.target.value)}
//                                 placeholder="99999999999"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Location
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.location}
//                                 onChange={(e) => handleChange("location", e.target.value)}
//                                 placeholder="City, State"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div className="md:col-span-2">
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Gautam Solar Link
//                             </label>
//                             <input
//                                 type="url"
//                                 value={formData.gautamSolarLink}
//                                 onChange={(e) => handleChange("gautamSolarLink", e.target.value)}
//                                 placeholder="https://gautamsolar.com/"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Logo Upload */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Company Logo
//                     </h3>

//                     <div className="flex gap-4 items-center">
//                         {imagePreviews.logo && (
//                             <img
//                                 src={imagePreviews.logo}
//                                 alt="Logo Preview"
//                                 className="w-24 h-24 rounded-full object-contain border-2 border-gray-300"
//                             />
//                         )}
//                         <label className="flex-1 cursor-pointer">
//                             <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition border border-gray-300">
//                                 <FaUpload />
//                                 <span>Upload Company Logo</span>
//                             </div>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={(e) => handleImageUpload(e, "logo")}
//                                 className="hidden"
//                             />
//                         </label>
//                     </div>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Logo Size (px)
//                         </label>
//                         <input
//                             type="range"
//                             min="64"
//                             max="200"
//                             step="8"
//                             value={formData.logoSize}
//                             onChange={(e) => handleChange("logoSize", e.target.value)}
//                             className="w-full"
//                         />
//                         <p className="text-sm text-gray-600 mt-1">{formData.logoSize}px</p>
//                     </div>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Logo Overlay Background
//                         </label>
//                         <input
//                             type="text"
//                             value={formData.logoOverlayBg}
//                             onChange={(e) => handleChange("logoOverlayBg", e.target.value)}
//                             placeholder="rgba(255, 255, 255, 0.1)"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                         />
//                     </div>
//                 </section>

//                 {/* Background Images */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Background Images
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {[1, 2, 3, 4, 5].map((num) => (
//                             <div key={num} className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                                 <label className="block font-medium text-gray-700 mb-2">
//                                     Background Image {num}
//                                 </label>

//                                 {imagePreviews[`bgimg${num}`] ? (
//                                     <div className="space-y-2">
//                                         <div className="relative">
//                                             <img
//                                                 src={imagePreviews[`bgimg${num}`]}
//                                                 alt={`Background ${num}`}
//                                                 className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
//                                             />
//                                             {/* Remove Button */}
//                                             <button
//                                                 onClick={() => {
//                                                     setImagePreviews({ ...imagePreviews, [`bgimg${num}`]: "" });
//                                                     handleChange(`bgimg${num}`, "");
//                                                 }}
//                                                 className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
//                                                 title="Remove Image"
//                                             >
//                                                 <FaTimes />
//                                             </button>
//                                         </div>

//                                         {/* Replace Button */}
//                                         <label className="cursor-pointer block">
//                                             <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
//                                                 <FaImage />
//                                                 <span className="text-sm">Replace Image</span>
//                                             </div>
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={(e) => handleImageUpload(e, `bgimg${num}`)}
//                                                 className="hidden"
//                                             />
//                                         </label>
//                                     </div>
//                                 ) : (
//                                     <label className="cursor-pointer block">
//                                         <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
//                                             <FaImage className="text-3xl text-gray-400" />
//                                             <span className="text-sm text-gray-600">Upload Image {num}</span>
//                                         </div>
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) => handleImageUpload(e, `bgimg${num}`)}
//                                             className="hidden"
//                                         />
//                                     </label>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Section Content */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Section Content
//                     </h3>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Section Content 1
//                         </label>
//                         <textarea
//                             value={formData.sectioncontent1}
//                             onChange={(e) => handleChange("sectioncontent1", e.target.value)}
//                             rows="4"
//                             placeholder="Enter first paragraph content..."
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Section Content 2
//                         </label>
//                         <textarea
//                             value={formData.sectioncontent2}
//                             onChange={(e) => handleChange("sectioncontent2", e.target.value)}
//                             rows="4"
//                             placeholder="Enter second paragraph content..."
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                         />
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
//                                 Background Color
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
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Text Color
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
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Primary Color
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
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Secondary Color
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.secondaryColor}
//                                 onChange={(e) => handleChange("secondaryColor", e.target.value)}
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">{formData.secondaryColor}</p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
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
//                             <label className="block font-medium text-gray-700 mb-2">
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

//                 {/* Save Button */}
//                 <div className="flex gap-4 pt-6 border-t">
//                     <button
//                         onClick={handleSubmit}
//                         className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition shadow-lg"
//                     >
//                         Save Section 1 Configuration
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SectionForm1;

import { useState, useEffect } from "react";
import {
    FaUpload,
    FaEye,
    FaEyeSlash,
    FaImage,
    FaDesktop,
    FaMobileAlt,
    FaTimes,
    FaSave,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";
import { saveSectionData } from "../../../../components/services/api";

const SectionForm1 = ({
    initialData,
    onSave,
    clientSlug = "default-client",
}) => {
    const [showPreview, setShowPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState("desktop");
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    // Default data structure
    const defaultData = {
        companyName: "Gautam Solar",
        logo: "",
        email: "gautamsolar@gmail.com",
        phone: "99999999999",
        location: "Govind puri okhla",
        bgimg: "", // Only one background image now
        sectioncontent1:
            "We are a locally based solar EPC service provider specializing in rooftop and ground-mounted solar power plant installations for residential, commercial, and industrial customers. We deliver complete end-to-end EPC services, including site assessment, system design, engineering, installation, commissioning, and long-term after-sales support across the region.",
        sectioncontent2:
            "As an authorized and certified solar dealer, we install ALMM-approved, high-efficiency solar modules designed to ensure long-term performance, safety, and dependable energy generation under Indian climatic conditions.",
        backgroundColor: "#0f172a",
        textColor: "#ffffff",
        primaryColor: "#f97316",
        secondaryColor: "#eab308",
        gradientFrom: "#f97316",
        gradientTo: "#eab308",
        logoOverlayBg: "rgba(255, 255, 255, 0.1)",
        logoSize: "96",
        gautamSolarLink: "https://gautamsolar.com/",
    };

    const [formData, setFormData] = useState(() => {
        if (initialData) {
            return {
                ...defaultData,
                ...initialData,
            };
        }
        return defaultData;
    });

    const [imagePreviews, setImagePreviews] = useState({
        logo: formData.logo,
        bgimg: formData.bgimg,
    });

    // Sync with initialData when it changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...defaultData,
                ...initialData,
            });
            setImagePreviews({
                logo: initialData.logo || "",
                bgimg: initialData.bgimg || "",
            });
        }
    }, [initialData]);

    // Load from localStorage on mount if no initialData
    useEffect(() => {
        if (!initialData) {
            const savedData = localStorage.getItem(`section1_${clientSlug}`);
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    if (parsed.data) {
                        setFormData({
                            ...defaultData,
                            ...parsed.data,
                        });
                        setImagePreviews({
                            logo: parsed.data.logo || "",
                            bgimg: parsed.data.bgimg || "",
                        });
                    }
                } catch (error) {
                    console.error("Error loading saved data:", error);
                }
            }
        }
    }, [clientSlug]);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
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

    const handleSubmit = async () => {
        setLoading(true);
        setSaveStatus(null);

        try {
            const result = await saveSectionData(
                "section1",
                formData,
                clientSlug,
            );

            if (result.success) {
                setSaveStatus("success");

                if (onSave) {
                    onSave(formData);
                }

                setTimeout(() => {
                    setSaveStatus(null);
                }, 5000);
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

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
                <h2 className="text-2xl font-bold text-white flex items-center justify-between">
                    <span>Section 1 Configuration (Hero Section)</span>
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
                                        Section 1 configuration saved
                                        successfully.
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
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <div className="grid grid-cols-2 min-h-[500px]">
                                    {/* Left Side - Content */}
                                    <div
                                        className="flex items-center justify-center p-8"
                                        style={{
                                            backgroundColor:
                                                formData.backgroundColor,
                                            color: formData.textColor,
                                        }}
                                    >
                                        <div className="max-w-2xl w-full space-y-6">
                                            {/* Heading */}
                                            <h1
                                                className="text-2xl font-bold uppercase text-center lg:text-left"
                                                style={{
                                                    background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                    WebkitBackgroundClip:
                                                        "text",
                                                    WebkitTextFillColor:
                                                        "transparent",
                                                }}
                                            >
                                                {formData.companyName}
                                            </h1>

                                            {/* Content */}
                                            <div className="space-y-4 text-sm leading-relaxed">
                                                <p>
                                                    At{" "}
                                                    <span
                                                        className="font-semibold"
                                                        style={{
                                                            background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                            WebkitBackgroundClip:
                                                                "text",
                                                            WebkitTextFillColor:
                                                                "transparent",
                                                        }}
                                                    >
                                                        {formData.companyName}
                                                    </span>
                                                    , {formData.sectioncontent1}
                                                </p>

                                                <p>
                                                    As an Authorized{" "}
                                                    <a
                                                        href={
                                                            formData.gautamSolarLink
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-red-500 font-semibold hover:underline"
                                                    >
                                                        Gautam Solar Tec Pro
                                                        Certified Dealer
                                                    </a>
                                                    , {formData.sectioncontent2}
                                                </p>

                                                <p className="text-xs opacity-90">
                                                    We are a trusted EPC
                                                    provider delivering
                                                    end-to-end solar solutions.
                                                    Specializing in
                                                    high-performance turnkey
                                                    systems, we combine
                                                    innovation and
                                                    sustainability to power a
                                                    brighter, greener future.
                                                </p>
                                            </div>

                                            {/* Contact Info */}
                                            <div className="flex gap-4 pt-4 text-sm">
                                                {formData.email && (
                                                    <a
                                                        href={`mailto:${formData.email}`}
                                                        className="hover:underline flex items-center gap-2"
                                                        style={{
                                                            color: formData.primaryColor,
                                                        }}
                                                    >
                                                        <span>📧</span>
                                                        <span>
                                                            {formData.email}
                                                        </span>
                                                    </a>
                                                )}

                                                {formData.phone && (
                                                    <a
                                                        href={`tel:${formData.phone}`}
                                                        className="hover:underline flex items-center gap-2"
                                                        style={{
                                                            color: formData.primaryColor,
                                                        }}
                                                    >
                                                        <span>📞</span>
                                                        <span>
                                                            {formData.phone}
                                                        </span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side - Image with Logo */}
                                    <div className="relative h-[500px] overflow-hidden">
                                        {imagePreviews.bgimg ? (
                                            <img
                                                src={imagePreviews.bgimg}
                                                alt="Background"
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600">
                                                <div className="text-center">
                                                    <FaImage className="text-6xl mb-2 mx-auto opacity-50" />
                                                    <p>No Background Image</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

                                        {/* Logo Overlay */}
                                        {imagePreviews.logo && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div
                                                    className="rounded-full overflow-hidden p-6 shadow-2xl backdrop-blur-sm"
                                                    style={{
                                                        backgroundColor:
                                                            formData.logoOverlayBg,
                                                    }}
                                                >
                                                    <img
                                                        src={imagePreviews.logo}
                                                        alt="Logo"
                                                        className="object-contain rounded-full"
                                                        style={{
                                                            width: `${formData.logoSize}px`,
                                                            height: `${formData.logoSize}px`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mobile Preview */}
                        {previewMode === "mobile" && (
                            <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg">
                                {/* Image Section (Top on Mobile) */}
                                <div className="relative h-[300px] overflow-hidden">
                                    {imagePreviews.bgimg ? (
                                        <img
                                            src={imagePreviews.bgimg}
                                            alt="Background"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600">
                                            <div className="text-center">
                                                <FaImage className="text-5xl mb-2 mx-auto opacity-50" />
                                                <p className="text-sm">
                                                    No Background Image
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                                    {/* Logo Overlay */}
                                    {imagePreviews.logo && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                className="rounded-full overflow-hidden p-4 shadow-2xl backdrop-blur-sm"
                                                style={{
                                                    backgroundColor:
                                                        formData.logoOverlayBg,
                                                }}
                                            >
                                                <img
                                                    src={imagePreviews.logo}
                                                    alt="Logo"
                                                    className="w-16 h-16 object-contain rounded-full"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div
                                    className="p-6 space-y-4"
                                    style={{
                                        backgroundColor:
                                            formData.backgroundColor,
                                        color: formData.textColor,
                                    }}
                                >
                                    <h1
                                        className="text-lg font-bold uppercase text-center"
                                        style={{
                                            background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {formData.companyName}
                                    </h1>

                                    <div className="space-y-3 text-xs leading-relaxed">
                                        <p>
                                            At{" "}
                                            <span
                                                className="font-semibold"
                                                style={{
                                                    background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                    WebkitBackgroundClip:
                                                        "text",
                                                    WebkitTextFillColor:
                                                        "transparent",
                                                }}
                                            >
                                                {formData.companyName}
                                            </span>
                                            , {formData.sectioncontent1}
                                        </p>

                                        <p>
                                            As an Authorized{" "}
                                            <a
                                                href={formData.gautamSolarLink}
                                                className="text-red-500 font-semibold"
                                            >
                                                Gautam Solar Tec Pro Certified
                                                Dealer
                                            </a>
                                            , {formData.sectioncontent2}
                                        </p>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="flex flex-col gap-2 pt-3 text-xs">
                                        {formData.email && (
                                            <a
                                                href={`mailto:${formData.email}`}
                                                className="flex items-center gap-2 break-all"
                                                style={{
                                                    color: formData.primaryColor,
                                                }}
                                            >
                                                <span>📧</span>
                                                <span>{formData.email}</span>
                                            </a>
                                        )}

                                        {formData.phone && (
                                            <a
                                                href={`tel:${formData.phone}`}
                                                className="flex items-center gap-2"
                                                style={{
                                                    color: formData.primaryColor,
                                                }}
                                            >
                                                <span>📞</span>
                                                <span>{formData.phone}</span>
                                            </a>
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
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    handleChange("email", e.target.value)
                                }
                                placeholder="company@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    handleChange("phone", e.target.value)
                                }
                                placeholder="99999999999"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) =>
                                    handleChange("location", e.target.value)
                                }
                                placeholder="City, State"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block font-medium text-gray-700 mb-2">
                                Gautam Solar Link
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </section>

                {/* Logo Upload */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Company Logo
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="block font-medium text-gray-700 mb-2">
                                Upload Logo
                            </label>
                            {imagePreviews.logo ? (
                                <div className="space-y-3">
                                    <div className="relative inline-block">
                                        <img
                                            src={imagePreviews.logo}
                                            alt="Logo Preview"
                                            className="w-32 h-32 rounded-full object-contain border-2 border-gray-300 bg-gray-50"
                                        />
                                        <button
                                            onClick={() => {
                                                setImagePreviews({
                                                    ...imagePreviews,
                                                    logo: "",
                                                });
                                                handleChange("logo", "");
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                                            title="Remove Logo"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    <label className="cursor-pointer block">
                                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
                                            <FaUpload />
                                            <span>Replace Logo</span>
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
                                    <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
                                        <FaUpload className="text-4xl text-gray-400" />
                                        <span className="text-gray-600 font-medium">
                                            Upload Company Logo
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            PNG, JPG, SVG
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

                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium text-gray-700 mb-2">
                                    Logo Size (px)
                                </label>
                                <input
                                    type="range"
                                    min="64"
                                    max="200"
                                    step="8"
                                    value={formData.logoSize}
                                    onChange={(e) =>
                                        handleChange("logoSize", e.target.value)
                                    }
                                    className="w-full"
                                />
                                <p className="text-sm text-gray-600 mt-1">
                                    {formData.logoSize}px
                                </p>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700 mb-2">
                                    Logo Overlay Background
                                </label>
                                <input
                                    type="text"
                                    value={formData.logoOverlayBg}
                                    onChange={(e) =>
                                        handleChange(
                                            "logoOverlayBg",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="rgba(255, 255, 255, 0.1)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Use rgba format for transparency
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Background Image */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Background Image
                    </h3>

                    <div className="space-y-3">
                        <label className="block font-medium text-gray-700 mb-2">
                            Hero Section Background
                        </label>

                        {imagePreviews.bgimg ? (
                            <div className="space-y-3">
                                <div className="relative">
                                    <img
                                        src={imagePreviews.bgimg}
                                        alt="Background"
                                        className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                                    />
                                    <button
                                        onClick={() => {
                                            setImagePreviews({
                                                ...imagePreviews,
                                                bgimg: "",
                                            });
                                            handleChange("bgimg", "");
                                        }}
                                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition"
                                        title="Remove Image"
                                    >
                                        <FaTimes className="text-lg" />
                                    </button>
                                </div>

                                <label className="cursor-pointer block">
                                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
                                        <FaImage />
                                        <span>Replace Background Image</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageUpload(e, "bgimg")
                                        }
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        ) : (
                            <label className="cursor-pointer block">
                                <div className="flex flex-col items-center justify-center gap-4 px-4 py-16 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
                                    <FaImage className="text-6xl text-gray-400" />
                                    <div className="text-center">
                                        <p className="text-gray-700 font-medium">
                                            Upload Background Image
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Recommended: 1920x1080px
                                        </p>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageUpload(e, "bgimg")
                                    }
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </section>

                {/* Section Content */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Section Content
                    </h3>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Section Content 1
                        </label>
                        <textarea
                            value={formData.sectioncontent1}
                            onChange={(e) =>
                                handleChange("sectioncontent1", e.target.value)
                            }
                            rows="4"
                            placeholder="Enter first paragraph content..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Section Content 2
                        </label>
                        <textarea
                            value={formData.sectioncontent2}
                            onChange={(e) =>
                                handleChange("sectioncontent2", e.target.value)
                            }
                            rows="4"
                            placeholder="Enter second paragraph content..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                </section>

                {/* Theme Colors */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Theme Colors
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Background Color
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
                                Primary Color
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
                            <label className="block font-medium text-gray-700 mb-2">
                                Secondary Color
                            </label>
                            <input
                                type="color"
                                value={formData.secondaryColor}
                                onChange={(e) =>
                                    handleChange(
                                        "secondaryColor",
                                        e.target.value,
                                    )
                                }
                                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.secondaryColor}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
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
                            <label className="block font-medium text-gray-700 mb-2">
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
                                <span>Save Section 1 Configuration</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionForm1;
