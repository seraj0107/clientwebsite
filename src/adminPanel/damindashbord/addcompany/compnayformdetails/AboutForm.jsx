// import { useState, useEffect } from "react";
// import {
//     FaEye,
//     FaEyeSlash,
//     FaImage,
//     FaDesktop,
//     FaMobileAlt,
//     FaTimes,
//     FaPlus,
//     FaSave,
//     FaCheckCircle,
//     FaExclamationTriangle
// } from "react-icons/fa";
// import { saveSectionData } from "../../../../components/services/api";

// const AboutForm = ({ initialData, onSave, clientSlug = "default-client" }) => {
//     const [showPreview, setShowPreview] = useState(false);
//     const [previewMode, setPreviewMode] = useState("desktop");
//     const [loading, setLoading] = useState(false);
//     const [saveStatus, setSaveStatus] = useState(null);

//     // Default data structure
//     const defaultData = {
//         // Company Name
//         companyName: "Gautam Solar",

//         // Images
//         logo: "",
//         bgimg3: "", // Hero background image
//         bgimg4: "", // Certificate image (shared for all)

//         // Theme Colors
//         backgroundColor: "#ffffff",
//         textColor: "#1f2937",
//         gradientFrom: "#f97316",
//         gradientTo: "#eab308",
//         imageBgColor: "rgba(255, 255, 255, 0.1)",

//         // About Section Content
//         aboutSection: {
//             paragraphs: [
//                 "offers complete solar energy solutions through expert Engineering, Procurement, and Construction (EPC) services. We deliver efficient, customized systems designed to reduce energy costs and support a sustainable future.",
//                 "In partnership with Gautam Solar, we use globally certified solar panels that ensure long-lasting performance, reliability, and trusted results for every installation.",
//                 "With a proven track record across residential, commercial, and industrial sectors, we bring innovation, quality, and sustainability to every project we undertake."
//             ],
//             certifications: [
//                 {
//                     title: "Authorized Channel Partner - Gautam Solar",
//                     description: "We are proud to be an authorized channel partner of Gautam Solar, one of India's leading solar panel manufacturers. This partnership ensures that every installation meets the highest quality standards with certified, reliable solar products.",
//                     link: "https://gautamsolar.com/",
//                     certificateImage: "" // Optional individual image
//                 }
//             ]
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
//         logo: formData.logo,
//         bgimg3: formData.bgimg3,
//         bgimg4: formData.bgimg4
//     });

//     // Track certificate image previews separately
//     const [certImagePreviews, setCertImagePreviews] = useState(
//         formData.aboutSection.certifications.map(cert => cert.certificateImage || "")
//     );

//     // Sync with initialData when it changes
//     useEffect(() => {
//         if (initialData) {
//             setFormData({
//                 ...defaultData,
//                 ...initialData
//             });
//             setImagePreviews({
//                 logo: initialData.logo || "",
//                 bgimg3: initialData.bgimg3 || "",
//                 bgimg4: initialData.bgimg4 || ""
//             });
//             setCertImagePreviews(
//                 initialData.aboutSection?.certifications?.map(cert => cert.certificateImage || "") || [""]
//             );
//         }
//     }, [initialData]);

//     // Load from localStorage on mount if no initialData
//     useEffect(() => {
//         if (!initialData) {
//             const savedData = localStorage.getItem(`about_${clientSlug}`);
//             if (savedData) {
//                 try {
//                     const parsed = JSON.parse(savedData);
//                     if (parsed.data) {
//                         setFormData({
//                             ...defaultData,
//                             ...parsed.data
//                         });
//                         setImagePreviews({
//                             logo: parsed.data.logo || "",
//                             bgimg3: parsed.data.bgimg3 || "",
//                             bgimg4: parsed.data.bgimg4 || ""
//                         });
//                         setCertImagePreviews(
//                             parsed.data.aboutSection?.certifications?.map(cert => cert.certificateImage || "") || [""]
//                         );
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

//     const handleCertificateImageUpload = (e, certIndex) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 const newPreviews = [...certImagePreviews];
//                 newPreviews[certIndex] = reader.result;
//                 setCertImagePreviews(newPreviews);
//                 updateCertification(certIndex, "certificateImage", reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Handle Paragraphs
//     const addParagraph = () => {
//         const updated = { ...formData.aboutSection };
//         updated.paragraphs.push("");
//         setFormData({ ...formData, aboutSection: updated });
//     };

//     const updateParagraph = (index, value) => {
//         const updated = { ...formData.aboutSection };
//         updated.paragraphs[index] = value;
//         setFormData({ ...formData, aboutSection: updated });
//     };

//     const removeParagraph = (index) => {
//         const updated = { ...formData.aboutSection };
//         updated.paragraphs = updated.paragraphs.filter((_, i) => i !== index);
//         setFormData({ ...formData, aboutSection: updated });
//     };

//     // Handle Certifications
//     const addCertification = () => {
//         const updated = { ...formData.aboutSection };
//         updated.certifications.push({
//             title: "",
//             description: "",
//             link: "",
//             certificateImage: ""
//         });
//         setFormData({ ...formData, aboutSection: updated });
//         setCertImagePreviews([...certImagePreviews, ""]);
//     };

//     const updateCertification = (index, field, value) => {
//         const updated = { ...formData.aboutSection };
//         updated.certifications[index][field] = value;
//         setFormData({ ...formData, aboutSection: updated });
//     };

//     const removeCertification = (index) => {
//         const updated = { ...formData.aboutSection };
//         updated.certifications = updated.certifications.filter((_, i) => i !== index);
//         setFormData({ ...formData, aboutSection: updated });
//         setCertImagePreviews(certImagePreviews.filter((_, i) => i !== index));
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
//         setSaveStatus(null);

//         try {
//             // Save to API
//             const result = await saveSectionData('about', formData, clientSlug);

//             // Save to localStorage as backup
//             try {
//                 localStorage.setItem(`about_${clientSlug}`, JSON.stringify({
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

//     const resetToDefaults = () => {
//         if (window.confirm("Are you sure you want to reset all values to default? This action cannot be undone.")) {
//             setFormData(defaultData);
//             setImagePreviews({
//                 logo: "",
//                 bgimg3: "",
//                 bgimg4: ""
//             });
//             setCertImagePreviews(defaultData.aboutSection.certifications.map(cert => cert.certificateImage || ""));
//         }
//     };

//     return (
//         <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
//                 <h2 className="text-2xl font-bold text-white flex items-center justify-between">
//                     <span>About Page Configuration</span>
//                     <div className="flex items-center gap-2">
//                         <button
//                             onClick={resetToDefaults}
//                             className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition text-sm"
//                         >
//                             Reset to Defaults
//                         </button>
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
//                                     <p className="text-sm">About page configuration saved successfully.</p>
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
//                         <div className={`space-y-8 ${previewMode === "mobile" ? "max-w-md mx-auto" : ""}`}>
//                             {/* Hero Section Preview */}
//                             <div className={`grid ${previewMode === "desktop" ? "grid-cols-2" : "grid-cols-1"} min-h-[400px] rounded-xl overflow-hidden shadow-xl`}>
//                                 {/* LEFT SIDE - Content */}
//                                 <div
//                                     className="flex items-center justify-center p-8"
//                                     style={{ backgroundColor: formData.backgroundColor, color: formData.textColor }}
//                                 >
//                                     <div className="max-w-xl w-full space-y-6">
//                                         {/* Heading */}
//                                         <h1 className="text-3xl font-bold uppercase tracking-tight leading-tight">
//                                             About{" "}
//                                             <span
//                                                 style={{
//                                                     background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                     WebkitBackgroundClip: "text",
//                                                     WebkitTextFillColor: "transparent",
//                                                 }}
//                                             >
//                                                 Us
//                                             </span>
//                                         </h1>

//                                         {/* Content Paragraphs */}
//                                         <div className="space-y-4 text-sm leading-relaxed">
//                                             {formData.aboutSection.paragraphs.slice(0, previewMode === "mobile" ? 2 : 3).map((text, index) => (
//                                                 <p key={index}>
//                                                     {index === 0 && (
//                                                         <span
//                                                             className="font-bold"
//                                                             style={{
//                                                                 background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                                 WebkitBackgroundClip: "text",
//                                                                 WebkitTextFillColor: "transparent",
//                                                             }}
//                                                         >
//                                                             {formData.companyName}{" "}
//                                                         </span>
//                                                     )}
//                                                     {text.substring(0, 150)}...
//                                                 </p>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* RIGHT SIDE - Image with Logo Overlay */}
//                                 <div className="relative h-[400px] overflow-hidden">
//                                     {/* Background Image */}
//                                     {imagePreviews.bgimg3 ? (
//                                         <img
//                                             src={imagePreviews.bgimg3}
//                                             alt="Hero Background"
//                                             className="absolute inset-0 w-full h-full object-cover"
//                                         />
//                                     ) : (
//                                         <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
//                                             No Hero Image
//                                         </div>
//                                     )}

//                                     {/* Overlay */}
//                                     <div className="absolute inset-0 bg-black/20"></div>

//                                     {/* Logo - Centered on Image */}
//                                     <div className="absolute inset-0 flex items-center justify-center">
//                                         <div>
//                                             {imagePreviews.logo ? (
//                                                 <img
//                                                     src={imagePreviews.logo}
//                                                     alt="Logo"
//                                                     className="w-24 h-24 object-contain rounded-full shadow-2xl"
//                                                     style={{ backgroundColor: formData.imageBgColor }}
//                                                 />
//                                             ) : (
//                                                 <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-gray-600 text-xs">
//                                                     Logo
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Certifications Section Preview */}
//                             {formData.aboutSection.certifications.length > 0 && (
//                                 <div
//                                     className="py-12 px-8 rounded-xl"
//                                     style={{ backgroundColor: formData.backgroundColor, color: formData.textColor }}
//                                 >
//                                     {/* Section Header */}
//                                     <div className="text-center mb-12">
//                                         <h2 className="text-3xl font-bold">
//                                             Authorized &{" "}
//                                             <span
//                                                 style={{
//                                                     background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                     WebkitBackgroundClip: "text",
//                                                     WebkitTextFillColor: "transparent",
//                                                 }}
//                                             >
//                                                 Certified
//                                             </span>
//                                         </h2>
//                                         <p className="text-gray-600 text-base max-w-3xl mx-auto mt-4">
//                                             Recognized and certified by leading industry authorities
//                                         </p>
//                                     </div>

//                                     {/* Certifications Grid */}
//                                     <div className="space-y-10">
//                                         {formData.aboutSection.certifications.slice(0, previewMode === "mobile" ? 1 : 2).map((cert, index) => (
//                                             <div
//                                                 key={index}
//                                                 className={`flex ${previewMode === "desktop" ? "flex-row" : "flex-col"} items-center gap-8`}
//                                             >
//                                                 {/* LEFT IMAGE */}
//                                                 <div className={`${previewMode === "desktop" ? "w-1/2" : "w-full"} flex justify-center`}>
//                                                     {certImagePreviews[index] || imagePreviews.bgimg4 ? (
//                                                         <img
//                                                             src={certImagePreviews[index] || imagePreviews.bgimg4}
//                                                             alt={cert.title}
//                                                             className="w-full max-w-md aspect-square object-cover rounded-xl shadow-lg"
//                                                         />
//                                                     ) : (
//                                                         <div className="w-full max-w-md aspect-square bg-gray-300 rounded-xl flex items-center justify-center text-gray-500">
//                                                             Certificate Image
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 {/* RIGHT CONTENT */}
//                                                 <div className={`${previewMode === "desktop" ? "w-1/2" : "w-full"} space-y-4 text-center lg:text-left`}>
//                                                     <h3 className="text-xl font-bold">{cert.title || "Certificate Title"}</h3>
//                                                     <p className="text-sm text-gray-600 leading-relaxed">
//                                                         {cert.description ? cert.description.substring(0, 150) + "..." : "Certificate description..."}
//                                                     </p>
//                                                     {cert.link && (
//                                                         <a
//                                                             href={cert.link}
//                                                             target="_blank"
//                                                             rel="noopener noreferrer"
//                                                             className="inline-flex items-center gap-2 font-semibold text-sm"
//                                                             style={{ color: formData.gradientFrom }}
//                                                         >
//                                                             <span>Verify Authorization</span>
//                                                             <svg
//                                                                 className="w-4 h-4"
//                                                                 fill="none"
//                                                                 viewBox="0 0 24 24"
//                                                                 stroke="currentColor"
//                                                             >
//                                                                 <path
//                                                                     strokeLinecap="round"
//                                                                     strokeLinejoin="round"
//                                                                     strokeWidth={2}
//                                                                     d="M17 8l4 4m0 0l-4 4m4-4H3"
//                                                                 />
//                                                             </svg>
//                                                         </a>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Company Information */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Company Information
//                     </h3>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Company Name
//                         </label>
//                         <input
//                             type="text"
//                             value={formData.companyName}
//                             onChange={(e) => handleChange("companyName", e.target.value)}
//                             placeholder="Enter company name"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                         />
//                     </div>
//                 </section>

//                 {/* Images */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Page Images
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {/* Logo */}
//                         <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Company Logo
//                             </label>

//                             {imagePreviews.logo ? (
//                                 <div className="space-y-2">
//                                     <div className="relative">
//                                         <img
//                                             src={imagePreviews.logo}
//                                             alt="Logo"
//                                             className="w-full h-48 object-contain rounded-lg border-2 border-gray-300 bg-gray-100"
//                                         />
//                                         <button
//                                             onClick={() => {
//                                                 setImagePreviews({ ...imagePreviews, logo: "" });
//                                                 handleChange("logo", "");
//                                             }}
//                                             className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
//                                         >
//                                             <FaTimes />
//                                         </button>
//                                     </div>
//                                     <label className="cursor-pointer block">
//                                         <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
//                                             <FaImage />
//                                             <span className="text-sm">Replace Logo</span>
//                                         </div>
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) => handleImageUpload(e, "logo")}
//                                             className="hidden"
//                                         />
//                                     </label>
//                                 </div>
//                             ) : (
//                                 <label className="cursor-pointer block">
//                                     <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
//                                         <FaImage className="text-3xl text-gray-400" />
//                                         <span className="text-sm text-gray-600">Upload Logo</span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) => handleImageUpload(e, "logo")}
//                                         className="hidden"
//                                     />
//                                 </label>
//                             )}
//                         </div>

//                         {/* Hero Background Image */}
//                         <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Hero Background Image
//                             </label>

//                             {imagePreviews.bgimg3 ? (
//                                 <div className="space-y-2">
//                                     <div className="relative">
//                                         <img
//                                             src={imagePreviews.bgimg3}
//                                             alt="Hero Background"
//                                             className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
//                                         />
//                                         <button
//                                             onClick={() => {
//                                                 setImagePreviews({ ...imagePreviews, bgimg3: "" });
//                                                 handleChange("bgimg3", "");
//                                             }}
//                                             className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
//                                         >
//                                             <FaTimes />
//                                         </button>
//                                     </div>
//                                     <label className="cursor-pointer block">
//                                         <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
//                                             <FaImage />
//                                             <span className="text-sm">Replace Image</span>
//                                         </div>
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) => handleImageUpload(e, "bgimg3")}
//                                             className="hidden"
//                                         />
//                                     </label>
//                                 </div>
//                             ) : (
//                                 <label className="cursor-pointer block">
//                                     <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
//                                         <FaImage className="text-3xl text-gray-400" />
//                                         <span className="text-sm text-gray-600">Upload Hero Image</span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) => handleImageUpload(e, "bgimg3")}
//                                         className="hidden"
//                                     />
//                                 </label>
//                             )}
//                         </div>

//                         {/* Certificate Image */}
//                         <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Certificate Image (Shared)
//                             </label>

//                             {imagePreviews.bgimg4 ? (
//                                 <div className="space-y-2">
//                                     <div className="relative">
//                                         <img
//                                             src={imagePreviews.bgimg4}
//                                             alt="Certificate"
//                                             className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
//                                         />
//                                         <button
//                                             onClick={() => {
//                                                 setImagePreviews({ ...imagePreviews, bgimg4: "" });
//                                                 handleChange("bgimg4", "");
//                                             }}
//                                             className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
//                                         >
//                                             <FaTimes />
//                                         </button>
//                                     </div>
//                                     <label className="cursor-pointer block">
//                                         <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
//                                             <FaImage />
//                                             <span className="text-sm">Replace Image</span>
//                                         </div>
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) => handleImageUpload(e, "bgimg4")}
//                                             className="hidden"
//                                         />
//                                     </label>
//                                 </div>
//                             ) : (
//                                 <label className="cursor-pointer block">
//                                     <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
//                                         <FaImage className="text-3xl text-gray-400" />
//                                         <span className="text-sm text-gray-600">Upload Certificate</span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) => handleImageUpload(e, "bgimg4")}
//                                         className="hidden"
//                                     />
//                                 </label>
//                             )}
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

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Logo Background
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.imageBgColor}
//                                 onChange={(e) => handleChange("imageBgColor", e.target.value)}
//                                 placeholder="rgba(255,255,255,0.1)"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* About Section Paragraphs */}
//                 <section className="space-y-4">
//                     <div className="flex justify-between items-center border-b pb-2">
//                         <h3 className="text-lg font-bold text-gray-800">
//                             About Section - Paragraphs
//                         </h3>
//                         <button
//                             onClick={addParagraph}
//                             className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
//                         >
//                             <FaPlus /> Add Paragraph
//                         </button>
//                     </div>

//                     <div className="space-y-3">
//                         {formData.aboutSection.paragraphs.map((paragraph, index) => (
//                             <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                                 <div className="flex justify-between items-center mb-2">
//                                     <label className="font-medium text-gray-700">
//                                         Paragraph {index + 1}
//                                         {index === 0 && (
//                                             <span className="text-xs text-gray-500 ml-2">
//                                                 (Company name will be prepended automatically)
//                                             </span>
//                                         )}
//                                     </label>
//                                     <button
//                                         onClick={() => removeParagraph(index)}
//                                         className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                                 <textarea
//                                     value={paragraph}
//                                     onChange={(e) => updateParagraph(index, e.target.value)}
//                                     placeholder="Enter paragraph text..."
//                                     rows="3"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Certifications Section */}
//                 <section className="space-y-4">
//                     <div className="flex justify-between items-center border-b pb-2">
//                         <h3 className="text-lg font-bold text-gray-800">
//                             Certifications & Authorizations
//                         </h3>
//                         <button
//                             onClick={addCertification}
//                             className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
//                         >
//                             <FaPlus /> Add Certification
//                         </button>
//                     </div>

//                     <div className="space-y-4">
//                         {formData.aboutSection.certifications.map((cert, index) => (
//                             <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
//                                 <div className="flex justify-between items-center">
//                                     <h4 className="font-semibold text-gray-700">Certification {index + 1}</h4>
//                                     <button
//                                         onClick={() => removeCertification(index)}
//                                         className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Title
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={cert.title}
//                                         onChange={(e) => updateCertification(index, "title", e.target.value)}
//                                         placeholder="Certification Title"
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Description
//                                     </label>
//                                     <textarea
//                                         value={cert.description}
//                                         onChange={(e) => updateCertification(index, "description", e.target.value)}
//                                         placeholder="Certification description"
//                                         rows="3"
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Verification Link (Optional)
//                                     </label>
//                                     <input
//                                         type="url"
//                                         value={cert.link}
//                                         onChange={(e) => updateCertification(index, "link", e.target.value)}
//                                         placeholder="https://example.com/verify"
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Certificate Image
//                                     </label>

//                                     {certImagePreviews[index] ? (
//                                         <div className="space-y-2">
//                                             <div className="relative">
//                                                 <img
//                                                     src={certImagePreviews[index]}
//                                                     alt={`Certificate ${index + 1}`}
//                                                     className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
//                                                 />
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => {
//                                                         const newPreviews = [...certImagePreviews];
//                                                         newPreviews[index] = "";
//                                                         setCertImagePreviews(newPreviews);
//                                                         updateCertification(index, "certificateImage", "");
//                                                     }}
//                                                     className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
//                                                 >
//                                                     <FaTimes />
//                                                 </button>
//                                             </div>
//                                             <label className="cursor-pointer block">
//                                                 <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
//                                                     <FaImage />
//                                                     <span className="text-sm">Replace Image</span>
//                                                 </div>
//                                                 <input
//                                                     type="file"
//                                                     accept="image/*"
//                                                     onChange={(e) => handleCertificateImageUpload(e, index)}
//                                                     className="hidden"
//                                                 />
//                                             </label>
//                                         </div>
//                                     ) : (
//                                         <label className="cursor-pointer block">
//                                             <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
//                                                 <FaImage className="text-2xl text-gray-400" />
//                                                 <span className="text-sm text-gray-600">Upload Certificate Image</span>
//                                                 <span className="text-xs text-gray-500">
//                                                     (Or leave empty to use shared image)
//                                                 </span>
//                                             </div>
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={(e) => handleCertificateImageUpload(e, index)}
//                                                 className="hidden"
//                                             />
//                                         </label>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
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
//                                 <span>Save About Page Configuration</span>
//                             </>
//                         )}
//                     </button>
//                 </div>

//                 {/* Info Box */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
//                     <FaCheckCircle className="text-blue-600 text-xl mt-0.5" />
//                     <div className="text-sm text-blue-800">
//                         <p className="font-semibold mb-1">About Page Configuration</p>
//                         <p>This page showcases company information, certifications, and authorizations. Data is automatically saved to localStorage and your API.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AboutForm;

import { useState, useEffect } from "react";
import {
    FaEye,
    FaEyeSlash,
    FaImage,
    FaDesktop,
    FaMobileAlt,
    FaTimes,
    FaPlus,
    FaSave,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";
import { useWebsiteData } from "../../../../context/WebsiteDataContext";

const AboutForm = ({ initialData = null }) => {
    const { websiteData, saveSectionData, clientSlug } = useWebsiteData();
    const [showPreview, setShowPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState("desktop");
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    // Default data structure
    const defaultData = {
        // Company Name
        companyName: "Gautam Solar",

        // Images
        logo: "",
        bgimg3: "", // Hero background image
        bgimg4: "", // Certificate image (shared for all)

        // Theme Colors
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        gradientFrom: "#f97316",
        gradientTo: "#eab308",
        imageBgColor: "rgba(255, 255, 255, 0.1)",

        // About Section Content
        aboutSection: {
            paragraphs: [
                "offers complete solar energy solutions through expert Engineering, Procurement, and Construction (EPC) services. We deliver efficient, customized systems designed to reduce energy costs and support a sustainable future.",
                "In partnership with Gautam Solar, we use globally certified solar panels that ensure long-lasting performance, reliability, and trusted results for every installation.",
                "With a proven track record across residential, commercial, and industrial sectors, we bring innovation, quality, and sustainability to every project we undertake.",
            ],
            certifications: [
                {
                    title: "Authorized Channel Partner - Gautam Solar",
                    description:
                        "We are proud to be an authorized channel partner of Gautam Solar, one of India's leading solar panel manufacturers. This partnership ensures that every installation meets the highest quality standards with certified, reliable solar products.",
                    link: "https://gautamsolar.com/",
                    certificateImage: "", // Optional individual image
                },
            ],
        },
    };

    const [formData, setFormData] = useState(defaultData);
    const [imagePreviews, setImagePreviews] = useState({
        logo: "",
        bgimg3: "",
        bgimg4: "",
    });
    const [certImagePreviews, setCertImagePreviews] = useState([""]);

    // Initialize form data
    useEffect(() => {
        let dataToUse = defaultData;

        // Priority: 1. initialData prop, 2. websiteData context, 3. localStorage, 4. defaultData
        if (initialData) {
            dataToUse = { ...defaultData, ...initialData };
        } else if (websiteData?.about) {
            dataToUse = { ...defaultData, ...websiteData.about };
        } else {
            // Try to load from localStorage
            const savedData = localStorage.getItem(`about_${clientSlug}`);
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    if (parsed.data) {
                        dataToUse = { ...defaultData, ...parsed.data };
                    }
                } catch (error) {
                    console.error("Error loading saved data:", error);
                }
            }
        }

        setFormData(dataToUse);
        setImagePreviews({
            logo: dataToUse.logo || "",
            bgimg3: dataToUse.bgimg3 || "",
            bgimg4: dataToUse.bgimg4 || "",
        });
        setCertImagePreviews(
            dataToUse.aboutSection?.certifications?.map(
                (cert) => cert.certificateImage || "",
            ) || [""],
        );
    }, [websiteData?.about, initialData, clientSlug]);

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setSaveStatus(null);

        try {
            const result = await saveSectionData("about", formData);

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
                setImagePreviews((prev) => ({
                    ...prev,
                    [imageKey]: reader.result,
                }));
                handleChange(imageKey, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCertificateImageUpload = (e, certIndex) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPreviews = [...certImagePreviews];
                newPreviews[certIndex] = reader.result;
                setCertImagePreviews(newPreviews);
                updateCertification(
                    certIndex,
                    "certificateImage",
                    reader.result,
                );
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle Paragraphs
    const addParagraph = () => {
        setFormData((prev) => ({
            ...prev,
            aboutSection: {
                ...prev.aboutSection,
                paragraphs: [...prev.aboutSection.paragraphs, ""],
            },
        }));
    };

    const updateParagraph = (index, value) => {
        setFormData((prev) => {
            const updatedParagraphs = [...prev.aboutSection.paragraphs];
            updatedParagraphs[index] = value;
            return {
                ...prev,
                aboutSection: {
                    ...prev.aboutSection,
                    paragraphs: updatedParagraphs,
                },
            };
        });
    };

    const removeParagraph = (index) => {
        setFormData((prev) => ({
            ...prev,
            aboutSection: {
                ...prev.aboutSection,
                paragraphs: prev.aboutSection.paragraphs.filter(
                    (_, i) => i !== index,
                ),
            },
        }));
    };

    // Handle Certifications
    const addCertification = () => {
        setFormData((prev) => ({
            ...prev,
            aboutSection: {
                ...prev.aboutSection,
                certifications: [
                    ...prev.aboutSection.certifications,
                    {
                        title: "",
                        description: "",
                        link: "",
                        certificateImage: "",
                    },
                ],
            },
        }));
        setCertImagePreviews((prev) => [...prev, ""]);
    };

    const updateCertification = (index, field, value) => {
        setFormData((prev) => {
            const updatedCerts = [...prev.aboutSection.certifications];
            updatedCerts[index] = {
                ...updatedCerts[index],
                [field]: value,
            };
            return {
                ...prev,
                aboutSection: {
                    ...prev.aboutSection,
                    certifications: updatedCerts,
                },
            };
        });
    };

    const removeCertification = (index) => {
        setFormData((prev) => ({
            ...prev,
            aboutSection: {
                ...prev.aboutSection,
                certifications: prev.aboutSection.certifications.filter(
                    (_, i) => i !== index,
                ),
            },
        }));
        setCertImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

  

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
                <h2 className="text-2xl font-bold text-white flex items-center justify-between">
                    <span>About Page Configuration</span>
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
                                        About page configuration saved
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

                        {/* Preview Content */}
                        <div
                            className={`space-y-8 ${previewMode === "mobile" ? "max-w-md mx-auto" : ""}`}
                        >
                            {/* Hero Section Preview */}
                            <div
                                className={`grid ${previewMode === "desktop" ? "grid-cols-2" : "grid-cols-1"} min-h-[400px] rounded-xl overflow-hidden shadow-xl`}
                            >
                                {/* LEFT SIDE - Content */}
                                <div
                                    className="flex items-center justify-center p-8"
                                    style={{
                                        backgroundColor:
                                            formData.backgroundColor,
                                        color: formData.textColor,
                                    }}
                                >
                                    <div className="max-w-xl w-full space-y-6">
                                        {/* Heading */}
                                        <h1 className="text-3xl font-bold uppercase tracking-tight leading-tight">
                                            About{" "}
                                            <span
                                                style={{
                                                    background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                    WebkitBackgroundClip:
                                                        "text",
                                                    WebkitTextFillColor:
                                                        "transparent",
                                                }}
                                            >
                                                Us
                                            </span>
                                        </h1>

                                        {/* Content Paragraphs */}
                                        <div className="space-y-4 text-sm leading-relaxed">
                                            {formData.aboutSection.paragraphs
                                                .slice(
                                                    0,
                                                    previewMode === "mobile"
                                                        ? 2
                                                        : 3,
                                                )
                                                .map((text, index) => (
                                                    <p key={index}>
                                                        {index === 0 && (
                                                            <span
                                                                className="font-bold"
                                                                style={{
                                                                    background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                                    WebkitBackgroundClip:
                                                                        "text",
                                                                    WebkitTextFillColor:
                                                                        "transparent",
                                                                }}
                                                            >
                                                                {
                                                                    formData.companyName
                                                                }{" "}
                                                            </span>
                                                        )}
                                                        {text.substring(0, 150)}
                                                        ...
                                                    </p>
                                                ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT SIDE - Image with Logo Overlay */}
                                <div className="relative h-[400px] overflow-hidden">
                                    {/* Background Image */}
                                    {imagePreviews.bgimg3 ? (
                                        <img
                                            src={imagePreviews.bgimg3}
                                            alt="Hero Background"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                                            No Hero Image
                                        </div>
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/20"></div>

                                    {/* Logo - Centered on Image */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div>
                                            {imagePreviews.logo ? (
                                                <img
                                                    src={imagePreviews.logo}
                                                    alt="Logo"
                                                    className="w-24 h-24 object-contain rounded-full shadow-2xl"
                                                    style={{
                                                        backgroundColor:
                                                            formData.imageBgColor,
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-gray-600 text-xs">
                                                    Logo
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Certifications Section Preview */}
                            {formData.aboutSection.certifications.length >
                                0 && (
                                <div
                                    className="py-12 px-8 rounded-xl"
                                    style={{
                                        backgroundColor:
                                            formData.backgroundColor,
                                        color: formData.textColor,
                                    }}
                                >
                                    {/* Section Header */}
                                    <div className="text-center mb-12">
                                        <h2 className="text-3xl font-bold">
                                            Authorized &{" "}
                                            <span
                                                style={{
                                                    background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                    WebkitBackgroundClip:
                                                        "text",
                                                    WebkitTextFillColor:
                                                        "transparent",
                                                }}
                                            >
                                                Certified
                                            </span>
                                        </h2>
                                        <p className="text-gray-600 text-base max-w-3xl mx-auto mt-4">
                                            Recognized and certified by leading
                                            industry authorities
                                        </p>
                                    </div>

                                    {/* Certifications Grid */}
                                    <div className="space-y-10">
                                        {formData.aboutSection.certifications
                                            .slice(
                                                0,
                                                previewMode === "mobile"
                                                    ? 1
                                                    : 2,
                                            )
                                            .map((cert, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex ${previewMode === "desktop" ? "flex-row" : "flex-col"} items-center gap-8`}
                                                >
                                                    {/* LEFT IMAGE */}
                                                    <div
                                                        className={`${previewMode === "desktop" ? "w-1/2" : "w-full"} flex justify-center`}
                                                    >
                                                        {certImagePreviews[
                                                            index
                                                        ] ||
                                                        imagePreviews.bgimg4 ? (
                                                            <img
                                                                src={
                                                                    certImagePreviews[
                                                                        index
                                                                    ] ||
                                                                    imagePreviews.bgimg4
                                                                }
                                                                alt={cert.title}
                                                                className="w-full max-w-md aspect-square object-cover rounded-xl shadow-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-full max-w-md aspect-square bg-gray-300 rounded-xl flex items-center justify-center text-gray-500">
                                                                Certificate
                                                                Image
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* RIGHT CONTENT */}
                                                    <div
                                                        className={`${previewMode === "desktop" ? "w-1/2" : "w-full"} space-y-4 text-center lg:text-left`}
                                                    >
                                                        <h3 className="text-xl font-bold">
                                                            {cert.title ||
                                                                "Certificate Title"}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 leading-relaxed">
                                                            {cert.description
                                                                ? cert.description.substring(
                                                                      0,
                                                                      150,
                                                                  ) + "..."
                                                                : "Certificate description..."}
                                                        </p>
                                                        {cert.link && (
                                                            <a
                                                                href={cert.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 font-semibold text-sm"
                                                                style={{
                                                                    color: formData.gradientFrom,
                                                                }}
                                                            >
                                                                <span>
                                                                    Verify
                                                                    Authorization
                                                                </span>
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                                    />
                                                                </svg>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Company Information */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Company Information
                    </h3>

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
                </section>

                {/* Images */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Page Images
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Logo */}
                        <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <label className="block font-medium text-gray-700 mb-2">
                                Company Logo
                            </label>

                            {imagePreviews.logo ? (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.logo}
                                            alt="Logo"
                                            className="w-full h-48 object-contain rounded-lg border-2 border-gray-300 bg-gray-100"
                                        />
                                        <button
                                            onClick={() => {
                                                setImagePreviews((prev) => ({
                                                    ...prev,
                                                    logo: "",
                                                }));
                                                handleChange("logo", "");
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    <label className="cursor-pointer block">
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

                        {/* Hero Background Image */}
                        <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <label className="block font-medium text-gray-700 mb-2">
                                Hero Background Image
                            </label>

                            {imagePreviews.bgimg3 ? (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.bgimg3}
                                            alt="Hero Background"
                                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                                        />
                                        <button
                                            onClick={() => {
                                                setImagePreviews((prev) => ({
                                                    ...prev,
                                                    bgimg3: "",
                                                }));
                                                handleChange("bgimg3", "");
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    <label className="cursor-pointer block">
                                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
                                            <FaImage />
                                            <span className="text-sm">
                                                Replace Image
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleImageUpload(e, "bgimg3")
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
                                            Upload Hero Image
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageUpload(e, "bgimg3")
                                        }
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* Certificate Image */}
                        <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <label className="block font-medium text-gray-700 mb-2">
                                Certificate Image (Shared)
                            </label>

                            {imagePreviews.bgimg4 ? (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.bgimg4}
                                            alt="Certificate"
                                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                                        />
                                        <button
                                            onClick={() => {
                                                setImagePreviews((prev) => ({
                                                    ...prev,
                                                    bgimg4: "",
                                                }));
                                                handleChange("bgimg4", "");
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    <label className="cursor-pointer block">
                                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
                                            <FaImage />
                                            <span className="text-sm">
                                                Replace Image
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleImageUpload(e, "bgimg4")
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
                                            Upload Certificate
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageUpload(e, "bgimg4")
                                        }
                                        className="hidden"
                                    />
                                </label>
                            )}
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

                        <div>
                            <label className="block font-medium text-gray-700 mb-2 text-sm">
                                Logo Background
                            </label>
                            <input
                                type="text"
                                value={formData.imageBgColor}
                                onChange={(e) =>
                                    handleChange("imageBgColor", e.target.value)
                                }
                                placeholder="rgba(255,255,255,0.1)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                            />
                        </div>
                    </div>
                </section>

                {/* About Section Paragraphs */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                            About Section - Paragraphs
                        </h3>
                        <button
                            onClick={addParagraph}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
                        >
                            <FaPlus /> Add Paragraph
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.aboutSection.paragraphs.map(
                            (paragraph, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="font-medium text-gray-700">
                                            Paragraph {index + 1}
                                            {index === 0 && (
                                                <span className="text-xs text-gray-500 ml-2">
                                                    (Company name will be
                                                    prepended automatically)
                                                </span>
                                            )}
                                        </label>
                                        <button
                                            onClick={() =>
                                                removeParagraph(index)
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <textarea
                                        value={paragraph}
                                        onChange={(e) =>
                                            updateParagraph(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter paragraph text..."
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            ),
                        )}
                    </div>
                </section>

                {/* Certifications Section */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                            Certifications & Authorizations
                        </h3>
                        <button
                            onClick={addCertification}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
                        >
                            <FaPlus /> Add Certification
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.aboutSection.certifications.map(
                            (cert, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
                                >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-gray-700">
                                            Certification {index + 1}
                                        </h4>
                                        <button
                                            onClick={() =>
                                                removeCertification(index)
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={cert.title}
                                            onChange={(e) =>
                                                updateCertification(
                                                    index,
                                                    "title",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Certification Title"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={cert.description}
                                            onChange={(e) =>
                                                updateCertification(
                                                    index,
                                                    "description",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Certification description"
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Verification Link (Optional)
                                        </label>
                                        <input
                                            type="url"
                                            value={cert.link}
                                            onChange={(e) =>
                                                updateCertification(
                                                    index,
                                                    "link",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://example.com/verify"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Certificate Image
                                        </label>

                                        {certImagePreviews[index] ? (
                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <img
                                                        src={
                                                            certImagePreviews[
                                                                index
                                                            ]
                                                        }
                                                        alt={`Certificate ${index + 1}`}
                                                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newPreviews =
                                                                [
                                                                    ...certImagePreviews,
                                                                ];
                                                            newPreviews[index] =
                                                                "";
                                                            setCertImagePreviews(
                                                                newPreviews,
                                                            );
                                                            updateCertification(
                                                                index,
                                                                "certificateImage",
                                                                "",
                                                            );
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                                <label className="cursor-pointer block">
                                                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition border border-blue-300">
                                                        <FaImage />
                                                        <span className="text-sm">
                                                            Replace Image
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            handleCertificateImageUpload(
                                                                e,
                                                                index,
                                                            )
                                                        }
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer block">
                                                <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
                                                    <FaImage className="text-2xl text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        Upload Certificate Image
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        (Or leave empty to use
                                                        shared image)
                                                    </span>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleCertificateImageUpload(
                                                            e,
                                                            index,
                                                        )
                                                    }
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            ),
                        )}
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
                                <span>Save About Page Configuration</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutForm;
