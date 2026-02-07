// import { useState } from "react";
// import {
//     FaEye,
//     FaEyeSlash,
//     FaImage,
//     FaDesktop,
//     FaMobileAlt,
//     FaTimes,
//     FaPhoneAlt,
//     FaEnvelope,
//     FaMapMarkerAlt,
// } from "react-icons/fa";
// import { saveSectionData } from "../../../../components/services/api";
// const ContactForm = ({ initialData, onSave }) => {
//     const [showPreview, setShowPreview] = useState(false);
//     const [previewMode, setPreviewMode] = useState("desktop");

//     // default data
//     const defaultData = {
//         companyName: "Gautam Solar",
//         logo: "",
//         email: "xyz@gmail.com",
//         phone: "69696969669",
//         location: "Pata nahi",
//         bgimg: "",

//         backgroundColor: "#78a8",
//         textColor: "#FFFF",
//         primaryColor: "#f97316",
//         gradientFrom: "#f97316",
//         gradientTo: "#eab308",
//         logoOverlayBg: "rgba(255, 255, 255, 0.1)",
//         logoSize: "96",
//         gautamSolarLink: "https://gautamsolar.com/",
//     };

//     const [formData, setFormData] = useState({
//         // Company Name
//         companyName: initialData?.companyName || "Gautam Solar",

//         // Images
//         logo: initialData?.logo || "",
//         bgimg4: initialData?.bgimg4 || "", // Contact background image

//         // Theme Colors
//         backgroundColor: initialData?.backgroundColor || "#ffffff",
//         textColor: initialData?.textColor || "#1f2937",
//         gradientFrom: initialData?.gradientFrom || "#f97316",
//         gradientTo: initialData?.gradientTo || "#eab308",
//         primaryColor: initialData?.primaryColor || "#f97316",
//         imageBgColor: initialData?.imageBgColor || "rgba(255, 255, 255, 0.1)",

//         // Contact Information
//         phone: initialData?.phone || "+91 9876543210",
//         email: initialData?.email || "info@company.com",
//         location:
//             initialData?.location ||
//             "123 Solar Street, Green City, India 123456",

//         // Contact Page Content
//         contactSection: initialData?.contactSection || {
//             heading: "Contact Us",
//             subheading:
//                 "Get in touch with us for all your solar energy needs. We're here to help!",
//             ctaHeading: "Ready to Go Solar?",
//             ctaDescription:
//                 "Contact us today for a free consultation and discover how solar energy can transform your property.",
//             ctaButtonText: "Call Us Now",
//         },
//     });

//     const [imagePreviews, setImagePreviews] = useState({
//         logo: formData.logo,
//         bgimg4: formData.bgimg4,
//     });

//     const handleChange = (key, value) => {
//         setFormData({ ...formData, [key]: value });
//     };

//     const handleSectionChange = (key, value) => {
//         setFormData({
//             ...formData,
//             contactSection: { ...formData.contactSection, [key]: value },
//         });
//     };

//     const handleImageUpload = (e, imageKey) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreviews({
//                     ...imagePreviews,
//                     [imageKey]: reader.result,
//                 });
//                 handleChange(imageKey, reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = () => {
//         onSave(formData);
//     };

//     // Contact info array for preview
//     const getContactInfo = () => {
//         return [
//             formData.phone && {
//                 icon: <FaPhoneAlt size={22} />,
//                 title: "Phone",
//                 content: formData.phone,
//                 link: `tel:${formData.phone}`,
//             },
//             formData.email && {
//                 icon: <FaEnvelope size={22} />,
//                 title: "Email",
//                 content: formData.email,
//                 link: `mailto:${formData.email}`,
//             },
//             formData.location && {
//                 icon: <FaMapMarkerAlt size={22} />,
//                 title: "Location",
//                 content: formData.location,
//                 link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.location)}`,
//             },
//         ].filter(Boolean);
//     };

//     return (
//         <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
//                 <h2 className="text-2xl font-bold text-white flex items-center justify-between">
//                     <span>Contact Page Configuration</span>
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

//                         {/* Preview Content */}
//                         <div
//                             className={`space-y-8 ${previewMode === "mobile" ? "max-w-md mx-auto" : ""}`}
//                         >
//                             {/* Desktop Layout */}
//                             {previewMode === "desktop" ? (
//                                 <div className="grid grid-cols-2 min-h-[600px] rounded-xl overflow-hidden shadow-xl">
//                                     {/* LEFT SIDE - Contact Information */}
//                                     <div
//                                         className="flex items-center justify-center p-8"
//                                         style={{
//                                             backgroundColor:
//                                                 formData.backgroundColor,
//                                             color: formData.textColor,
//                                         }}
//                                     >
//                                         <div className="max-w-2xl w-full space-y-8">
//                                             {/* Heading */}
//                                             <div className="text-center lg:text-left">
//                                                 <h1 className="text-4xl font-bold uppercase mb-4">
//                                                     {
//                                                         formData.contactSection.heading.split(
//                                                             " ",
//                                                         )[0]
//                                                     }{" "}
//                                                     <span
//                                                         style={{
//                                                             background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                             WebkitBackgroundClip:
//                                                                 "text",
//                                                             WebkitTextFillColor:
//                                                                 "transparent",
//                                                         }}
//                                                     >
//                                                         {formData.contactSection.heading.split(
//                                                             " ",
//                                                         )[1] || "Us"}
//                                                     </span>
//                                                 </h1>
//                                                 <p className="text-gray-500">
//                                                     {
//                                                         formData.contactSection
//                                                             .subheading
//                                                     }
//                                                 </p>
//                                             </div>

//                                             {/* Contact Cards */}
//                                             <div className="grid grid-cols-2 gap-6">
//                                                 {getContactInfo().map(
//                                                     (item, index) => (
//                                                         <div
//                                                             key={index}
//                                                             className="border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//                                                             style={{
//                                                                 backgroundColor:
//                                                                     formData.backgroundColor,
//                                                             }}
//                                                         >
//                                                             <div
//                                                                 style={{
//                                                                     color: formData.primaryColor,
//                                                                 }}
//                                                                 className="mb-3"
//                                                             >
//                                                                 {item.icon}
//                                                             </div>

//                                                             <h3 className="font-semibold text-sm text-gray-500 mb-2">
//                                                                 {item.title}
//                                                             </h3>

//                                                             <a
//                                                                 href={item.link}
//                                                                 className={`text-lg hover:underline transition-all break-all`}
//                                                                 style={{
//                                                                     color: formData.textColor,
//                                                                 }}
//                                                             >
//                                                                 {item.content}
//                                                             </a>
//                                                         </div>
//                                                     ),
//                                                 )}
//                                             </div>

//                                             {/* CTA Section */}
//                                             <div
//                                                 className="border-l-4 border-orange-500 rounded-lg p-6 mt-8"
//                                                 style={{
//                                                     background:
//                                                         "linear-gradient(to right, #fed7aa, #fef3c7)",
//                                                     backgroundColor: "#fff7ed",
//                                                 }}
//                                             >
//                                                 <h3
//                                                     style={{
//                                                         background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                         WebkitBackgroundClip:
//                                                             "text",
//                                                         WebkitTextFillColor:
//                                                             "transparent",
//                                                     }}
//                                                     className="text-xl font-bold mb-2"
//                                                 >
//                                                     {
//                                                         formData.contactSection
//                                                             .ctaHeading
//                                                     }
//                                                 </h3>
//                                                 <p className="text-gray-500 mb-4">
//                                                     {
//                                                         formData.contactSection
//                                                             .ctaDescription
//                                                     }
//                                                 </p>
//                                                 <button className="inline-block bg-gradient-to-r from-orange-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
//                                                     {
//                                                         formData.contactSection
//                                                             .ctaButtonText
//                                                     }
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* RIGHT SIDE - Image with Logo Overlay */}
//                                     <div className="relative h-full overflow-hidden">
//                                         {/* Background Image */}
//                                         {imagePreviews.bgimg4 ? (
//                                             <img
//                                                 src={imagePreviews.bgimg4}
//                                                 alt="Solar Panel"
//                                                 className="absolute inset-0 w-full h-full object-cover"
//                                             />
//                                         ) : (
//                                             <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
//                                                 No Background Image
//                                             </div>
//                                         )}

//                                         {/* Logo - Centered on Image */}
//                                         <div className="absolute inset-0 flex items-center justify-center">
//                                             <div
//                                                 className="rounded-full overflow-hidden p-8 shadow-2xl backdrop-blur-sm"
//                                                 style={{
//                                                     backgroundColor:
//                                                         formData.imageBgColor,
//                                                 }}
//                                             >
//                                                 {imagePreviews.logo ? (
//                                                     <img
//                                                         src={imagePreviews.logo}
//                                                         alt="Logo"
//                                                         className="w-24 h-24 object-contain rounded-full"
//                                                     />
//                                                 ) : (
//                                                     <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-gray-600 text-xs">
//                                                         Logo
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 /* Mobile Layout */
//                                 <div className="space-y-6">
//                                     {/* Mobile Image Section */}
//                                     <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
//                                         {/* Background Image */}
//                                         {imagePreviews.bgimg4 ? (
//                                             <img
//                                                 src={imagePreviews.bgimg4}
//                                                 alt="Solar Panel"
//                                                 className="absolute inset-0 w-full h-full object-cover"
//                                             />
//                                         ) : (
//                                             <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
//                                                 No Background Image
//                                             </div>
//                                         )}

//                                         {/* Logo Overlay */}
//                                         <div className="absolute inset-0 flex items-center justify-center">
//                                             <div
//                                                 className="rounded-full overflow-hidden"
//                                                 style={{
//                                                     backgroundColor:
//                                                         formData.imageBgColor,
//                                                 }}
//                                             >
//                                                 {imagePreviews.logo ? (
//                                                     <img
//                                                         src={imagePreviews.logo}
//                                                         alt="Logo"
//                                                         className="w-20 h-20 object-cover rounded-full"
//                                                     />
//                                                 ) : (
//                                                     <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-gray-600 text-xs">
//                                                         Logo
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Contact Content */}
//                                     <div
//                                         className="p-6 rounded-xl shadow-lg"
//                                         style={{
//                                             backgroundColor:
//                                                 formData.backgroundColor,
//                                             color: formData.textColor,
//                                         }}
//                                     >
//                                         {/* Heading */}
//                                         <div className="text-center mb-8">
//                                             <h1 className="text-3xl font-bold uppercase mb-4">
//                                                 {
//                                                     formData.contactSection.heading.split(
//                                                         " ",
//                                                     )[0]
//                                                 }{" "}
//                                                 <span
//                                                     style={{
//                                                         background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                         WebkitBackgroundClip:
//                                                             "text",
//                                                         WebkitTextFillColor:
//                                                             "transparent",
//                                                     }}
//                                                 >
//                                                     {formData.contactSection.heading.split(
//                                                         " ",
//                                                     )[1] || "Us"}
//                                                 </span>
//                                             </h1>
//                                             <p className="text-gray-500 text-sm">
//                                                 {
//                                                     formData.contactSection
//                                                         .subheading
//                                                 }
//                                             </p>
//                                         </div>

//                                         {/* Contact Cards - Vertical Stack */}
//                                         <div className="space-y-4 mb-8">
//                                             {getContactInfo().map(
//                                                 (item, index) => (
//                                                     <div
//                                                         key={index}
//                                                         className="border border-gray-200 rounded-xl p-4 shadow-sm"
//                                                         style={{
//                                                             backgroundColor:
//                                                                 formData.backgroundColor,
//                                                         }}
//                                                     >
//                                                         <div className="flex items-start gap-4">
//                                                             <div
//                                                                 style={{
//                                                                     color: formData.primaryColor,
//                                                                 }}
//                                                                 className="mt-1"
//                                                             >
//                                                                 {item.icon}
//                                                             </div>
//                                                             <div className="flex-1">
//                                                                 <h3 className="font-semibold text-sm text-gray-500 mb-1">
//                                                                     {item.title}
//                                                                 </h3>
//                                                                 <a
//                                                                     href={
//                                                                         item.link
//                                                                     }
//                                                                     className="text-base hover:underline transition-all break-all"
//                                                                     style={{
//                                                                         color: formData.textColor,
//                                                                     }}
//                                                                 >
//                                                                     {
//                                                                         item.content
//                                                                     }
//                                                                 </a>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 ),
//                                             )}
//                                         </div>

//                                         {/* CTA Section */}
//                                         <div
//                                             className="border-l-4 border-orange-500 rounded-lg p-5"
//                                             style={{
//                                                 background:
//                                                     "linear-gradient(to right, #fed7aa, #fef3c7)",
//                                                 backgroundColor: "#fff7ed",
//                                             }}
//                                         >
//                                             <h3
//                                                 style={{
//                                                     background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                     WebkitBackgroundClip:
//                                                         "text",
//                                                     WebkitTextFillColor:
//                                                         "transparent",
//                                                 }}
//                                                 className="text-lg font-bold mb-2"
//                                             >
//                                                 {
//                                                     formData.contactSection
//                                                         .ctaHeading
//                                                 }
//                                             </h3>
//                                             <p className="text-gray-500 text-sm mb-4">
//                                                 {
//                                                     formData.contactSection
//                                                         .ctaDescription
//                                                 }
//                                             </p>
//                                             <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
//                                                 {
//                                                     formData.contactSection
//                                                         .ctaButtonText
//                                                 }
//                                             </button>
//                                         </div>
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
//                             onChange={(e) =>
//                                 handleChange("companyName", e.target.value)
//                             }
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

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//                                             className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 bg-gray-100"
//                                         />
//                                         <button
//                                             onClick={() => {
//                                                 setImagePreviews({
//                                                     ...imagePreviews,
//                                                     logo: "",
//                                                 });
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
//                                             <span className="text-sm">
//                                                 Replace Logo
//                                             </span>
//                                         </div>
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) =>
//                                                 handleImageUpload(e, "logo")
//                                             }
//                                             className="hidden"
//                                         />
//                                     </label>
//                                 </div>
//                             ) : (
//                                 <label className="cursor-pointer block">
//                                     <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
//                                         <FaImage className="text-3xl text-gray-400" />
//                                         <span className="text-sm text-gray-600">
//                                             Upload Logo
//                                         </span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) =>
//                                             handleImageUpload(e, "logo")
//                                         }
//                                         className="hidden"
//                                     />
//                                 </label>
//                             )}
//                         </div>

//                         {/* Background Image */}
//                         <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Background Image
//                             </label>

//                             {imagePreviews.bgimg4 ? (
//                                 <div className="space-y-2">
//                                     <div className="relative">
//                                         <img
//                                             src={imagePreviews.bgimg4}
//                                             alt="Background"
//                                             className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
//                                         />
//                                         <button
//                                             onClick={() => {
//                                                 setImagePreviews({
//                                                     ...imagePreviews,
//                                                     bgimg4: "",
//                                                 });
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
//                                             <span className="text-sm">
//                                                 Replace Image
//                                             </span>
//                                         </div>
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) =>
//                                                 handleImageUpload(e, "bgimg4")
//                                             }
//                                             className="hidden"
//                                         />
//                                     </label>
//                                 </div>
//                             ) : (
//                                 <label className="cursor-pointer block">
//                                     <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition border-2 border-dashed border-gray-300">
//                                         <FaImage className="text-3xl text-gray-400" />
//                                         <span className="text-sm text-gray-600">
//                                             Upload Background Image
//                                         </span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) =>
//                                             handleImageUpload(e, "bgimg4")
//                                         }
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

//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Background
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.backgroundColor}
//                                 onChange={(e) =>
//                                     handleChange(
//                                         "backgroundColor",
//                                         e.target.value,
//                                     )
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.backgroundColor}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Text
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
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Primary
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.primaryColor}
//                                 onChange={(e) =>
//                                     handleChange("primaryColor", e.target.value)
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.primaryColor}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Gradient From
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.gradientFrom}
//                                 onChange={(e) =>
//                                     handleChange("gradientFrom", e.target.value)
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.gradientFrom}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Gradient To
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.gradientTo}
//                                 onChange={(e) =>
//                                     handleChange("gradientTo", e.target.value)
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.gradientTo}
//                             </p>
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2 text-sm">
//                                 Logo Background
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.imageBgColor}
//                                 onChange={(e) =>
//                                     handleChange("imageBgColor", e.target.value)
//                                 }
//                                 placeholder="rgba(255,255,255,0.1)"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Contact Information */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Contact Information
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Phone Number
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.phone}
//                                 onChange={(e) =>
//                                     handleChange("phone", e.target.value)
//                                 }
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
//                                 onChange={(e) =>
//                                     handleChange("email", e.target.value)
//                                 }
//                                 placeholder="info@company.com"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Location
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.location}
//                                 onChange={(e) =>
//                                     handleChange("location", e.target.value)
//                                 }
//                                 placeholder="123 Street, City, Country"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Contact Page Content */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Page Content
//                     </h3>

//                     <div className="space-y-4">
//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Main Heading
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.contactSection.heading}
//                                 onChange={(e) =>
//                                     handleSectionChange(
//                                         "heading",
//                                         e.target.value,
//                                     )
//                                 }
//                                 placeholder="Contact Us"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Subheading
//                             </label>
//                             <textarea
//                                 value={formData.contactSection.subheading}
//                                 onChange={(e) =>
//                                     handleSectionChange(
//                                         "subheading",
//                                         e.target.value,
//                                     )
//                                 }
//                                 placeholder="Get in touch with us for all your solar energy needs. We're here to help!"
//                                 rows="2"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 CTA Heading
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.contactSection.ctaHeading}
//                                 onChange={(e) =>
//                                     handleSectionChange(
//                                         "ctaHeading",
//                                         e.target.value,
//                                     )
//                                 }
//                                 placeholder="Ready to Go Solar?"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 CTA Description
//                             </label>
//                             <textarea
//                                 value={formData.contactSection.ctaDescription}
//                                 onChange={(e) =>
//                                     handleSectionChange(
//                                         "ctaDescription",
//                                         e.target.value,
//                                     )
//                                 }
//                                 placeholder="Contact us today for a free consultation..."
//                                 rows="2"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 CTA Button Text
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.contactSection.ctaButtonText}
//                                 onChange={(e) =>
//                                     handleSectionChange(
//                                         "ctaButtonText",
//                                         e.target.value,
//                                     )
//                                 }
//                                 placeholder="Call Us Now"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Save Button */}
//                 <div className="flex gap-4 pt-6 border-t">
//                     <button
//                         onClick={handleSubmit}
//                         className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition shadow-lg"
//                     >
//                         Save Contact Page Configuration
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContactForm;

import { useState, useEffect } from "react";
import {
    FaEye,
    FaEyeSlash,
    FaImage,
    FaDesktop,
    FaMobileAlt,
    FaTimes,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaSave,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";
import { saveSectionData } from "../../../../components/services/api";

const ContactForm = ({
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
        email: "info@company.com",
        phone: "+91 9876543210",
        location: "123 Solar Street, Green City, India 123456",
        bgimg4: "", // Contact background image

        // Theme Colors
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        primaryColor: "#f97316",
        gradientFrom: "#f97316",
        gradientTo: "#eab308",
        imageBgColor: "rgba(255, 255, 255, 0.1)",

        // Contact Page Content
        contactSection: {
            heading: "Contact Us",
            subheading:
                "Get in touch with us for all your solar energy needs. We're here to help!",
            ctaHeading: "Ready to Go Solar?",
            ctaDescription:
                "Contact us today for a free consultation and discover how solar energy can transform your property.",
            ctaButtonText: "Call Us Now",
        },
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
        bgimg4: formData.bgimg4,
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
                bgimg4: initialData.bgimg4 || "",
            });
        }
    }, [initialData]);

    // Load from localStorage on mount if no initialData
    useEffect(() => {
        if (!initialData) {
            const savedData = localStorage.getItem(`contact_${clientSlug}`);
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
                            bgimg4: parsed.data.bgimg4 || "",
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

    const handleSectionChange = (key, value) => {
        setFormData({
            ...formData,
            contactSection: { ...formData.contactSection, [key]: value },
        });
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
            // Save to API
            const result = await saveSectionData(
                "contact",
                formData,
                clientSlug,
            );

            // Save to localStorage as backup
            try {
                localStorage.setItem(
                    `contact_${clientSlug}`,
                    JSON.stringify({
                        data: formData,
                        timestamp: new Date().toISOString(),
                        clientSlug,
                    }),
                );
            } catch (localStorageError) {
                console.warn(
                    "Failed to save to localStorage:",
                    localStorageError,
                );
            }

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

    // Contact info array for preview
    const getContactInfo = () => {
        return [
            formData.phone && {
                icon: <FaPhoneAlt size={22} />,
                title: "Phone",
                content: formData.phone,
                link: `tel:${formData.phone}`,
            },
            formData.email && {
                icon: <FaEnvelope size={22} />,
                title: "Email",
                content: formData.email,
                link: `mailto:${formData.email}`,
            },
            formData.location && {
                icon: <FaMapMarkerAlt size={22} />,
                title: "Location",
                content: formData.location,
                link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.location)}`,
            },
        ].filter(Boolean);
    };

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
                <h2 className="text-2xl font-bold text-white flex items-center justify-between">
                    <span>Contact Page Configuration</span>
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
                                        Contact page configuration saved
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
                            {/* Desktop Layout */}
                            {previewMode === "desktop" ? (
                                <div className="grid grid-cols-2 min-h-[600px] rounded-xl overflow-hidden shadow-xl">
                                    {/* LEFT SIDE - Contact Information */}
                                    <div
                                        className="flex items-center justify-center p-8"
                                        style={{
                                            backgroundColor:
                                                formData.backgroundColor,
                                            color: formData.textColor,
                                        }}
                                    >
                                        <div className="max-w-2xl w-full space-y-8">
                                            {/* Heading */}
                                            <div className="text-center lg:text-left">
                                                <h1 className="text-4xl font-bold uppercase mb-4">
                                                    {
                                                        formData.contactSection.heading.split(
                                                            " ",
                                                        )[0]
                                                    }{" "}
                                                    <span
                                                        style={{
                                                            background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                            WebkitBackgroundClip:
                                                                "text",
                                                            WebkitTextFillColor:
                                                                "transparent",
                                                        }}
                                                    >
                                                        {formData.contactSection.heading.split(
                                                            " ",
                                                        )[1] || "Us"}
                                                    </span>
                                                </h1>
                                                <p className="text-gray-500">
                                                    {
                                                        formData.contactSection
                                                            .subheading
                                                    }
                                                </p>
                                            </div>

                                            {/* Contact Cards */}
                                            <div className="grid grid-cols-2 gap-6">
                                                {getContactInfo().map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                                            style={{
                                                                backgroundColor:
                                                                    formData.backgroundColor,
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    color: formData.primaryColor,
                                                                }}
                                                                className="mb-3"
                                                            >
                                                                {item.icon}
                                                            </div>

                                                            <h3 className="font-semibold text-sm text-gray-500 mb-2">
                                                                {item.title}
                                                            </h3>

                                                            <a
                                                                href={item.link}
                                                                className={`text-lg hover:underline transition-all break-all`}
                                                                style={{
                                                                    color: formData.textColor,
                                                                }}
                                                            >
                                                                {item.content}
                                                            </a>
                                                        </div>
                                                    ),
                                                )}
                                            </div>

                                            {/* CTA Section */}
                                            <div
                                                className="border-l-4 border-orange-500 rounded-lg p-6 mt-8"
                                                style={{
                                                    background:
                                                        "linear-gradient(to right, #fed7aa, #fef3c7)",
                                                    backgroundColor: "#fff7ed",
                                                }}
                                            >
                                                <h3
                                                    style={{
                                                        background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                        WebkitBackgroundClip:
                                                            "text",
                                                        WebkitTextFillColor:
                                                            "transparent",
                                                    }}
                                                    className="text-xl font-bold mb-2"
                                                >
                                                    {
                                                        formData.contactSection
                                                            .ctaHeading
                                                    }
                                                </h3>
                                                <p className="text-gray-500 mb-4">
                                                    {
                                                        formData.contactSection
                                                            .ctaDescription
                                                    }
                                                </p>
                                                <button className="inline-block bg-gradient-to-r from-orange-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                                                    {
                                                        formData.contactSection
                                                            .ctaButtonText
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE - Image with Logo Overlay */}
                                    <div className="relative h-full overflow-hidden">
                                        {/* Background Image */}
                                        {imagePreviews.bgimg4 ? (
                                            <img
                                                src={imagePreviews.bgimg4}
                                                alt="Solar Panel"
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                                                No Background Image
                                            </div>
                                        )}

                                        {/* Logo - Centered on Image */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                className="rounded-full overflow-hidden p-8 shadow-2xl backdrop-blur-sm"
                                                style={{
                                                    backgroundColor:
                                                        formData.imageBgColor,
                                                }}
                                            >
                                                {imagePreviews.logo ? (
                                                    <img
                                                        src={imagePreviews.logo}
                                                        alt="Logo"
                                                        className="w-24 h-24 object-contain rounded-full"
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
                            ) : (
                                /* Mobile Layout */
                                <div className="space-y-6">
                                    {/* Mobile Image Section */}
                                    <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        {imagePreviews.bgimg4 ? (
                                            <img
                                                src={imagePreviews.bgimg4}
                                                alt="Solar Panel"
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                                                No Background Image
                                            </div>
                                        )}

                                        {/* Logo Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                className="rounded-full overflow-hidden"
                                                style={{
                                                    backgroundColor:
                                                        formData.imageBgColor,
                                                }}
                                            >
                                                {imagePreviews.logo ? (
                                                    <img
                                                        src={imagePreviews.logo}
                                                        alt="Logo"
                                                        className="w-20 h-20 object-cover rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-gray-600 text-xs">
                                                        Logo
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Content */}
                                    <div
                                        className="p-6 rounded-xl shadow-lg"
                                        style={{
                                            backgroundColor:
                                                formData.backgroundColor,
                                            color: formData.textColor,
                                        }}
                                    >
                                        {/* Heading */}
                                        <div className="text-center mb-8">
                                            <h1 className="text-3xl font-bold uppercase mb-4">
                                                {
                                                    formData.contactSection.heading.split(
                                                        " ",
                                                    )[0]
                                                }{" "}
                                                <span
                                                    style={{
                                                        background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                        WebkitBackgroundClip:
                                                            "text",
                                                        WebkitTextFillColor:
                                                            "transparent",
                                                    }}
                                                >
                                                    {formData.contactSection.heading.split(
                                                        " ",
                                                    )[1] || "Us"}
                                                </span>
                                            </h1>
                                            <p className="text-gray-500 text-sm">
                                                {
                                                    formData.contactSection
                                                        .subheading
                                                }
                                            </p>
                                        </div>

                                        {/* Contact Cards - Vertical Stack */}
                                        <div className="space-y-4 mb-8">
                                            {getContactInfo().map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="border border-gray-200 rounded-xl p-4 shadow-sm"
                                                        style={{
                                                            backgroundColor:
                                                                formData.backgroundColor,
                                                        }}
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <div
                                                                style={{
                                                                    color: formData.primaryColor,
                                                                }}
                                                                className="mt-1"
                                                            >
                                                                {item.icon}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="font-semibold text-sm text-gray-500 mb-1">
                                                                    {item.title}
                                                                </h3>
                                                                <a
                                                                    href={
                                                                        item.link
                                                                    }
                                                                    className="text-base hover:underline transition-all break-all"
                                                                    style={{
                                                                        color: formData.textColor,
                                                                    }}
                                                                >
                                                                    {
                                                                        item.content
                                                                    }
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>

                                        {/* CTA Section */}
                                        <div
                                            className="border-l-4 border-orange-500 rounded-lg p-5"
                                            style={{
                                                background:
                                                    "linear-gradient(to right, #fed7aa, #fef3c7)",
                                                backgroundColor: "#fff7ed",
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                    WebkitBackgroundClip:
                                                        "text",
                                                    WebkitTextFillColor:
                                                        "transparent",
                                                }}
                                                className="text-lg font-bold mb-2"
                                            >
                                                {
                                                    formData.contactSection
                                                        .ctaHeading
                                                }
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-4">
                                                {
                                                    formData.contactSection
                                                        .ctaDescription
                                                }
                                            </p>
                                            <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                                                {
                                                    formData.contactSection
                                                        .ctaButtonText
                                                }
                                            </button>
                                        </div>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 bg-gray-100"
                                        />
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

                        {/* Background Image */}
                        <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <label className="block font-medium text-gray-700 mb-2">
                                Background Image
                            </label>

                            {imagePreviews.bgimg4 ? (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.bgimg4}
                                            alt="Background"
                                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                                        />
                                        <button
                                            onClick={() => {
                                                setImagePreviews({
                                                    ...imagePreviews,
                                                    bgimg4: "",
                                                });
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
                                            Upload Background Image
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

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

                {/* Contact Information */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Contact Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                Location
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) =>
                                    handleChange("location", e.target.value)
                                }
                                placeholder="123 Street, City, Country"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Page Content */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Page Content
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Main Heading
                            </label>
                            <input
                                type="text"
                                value={formData.contactSection.heading}
                                onChange={(e) =>
                                    handleSectionChange(
                                        "heading",
                                        e.target.value,
                                    )
                                }
                                placeholder="Contact Us"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Subheading
                            </label>
                            <textarea
                                value={formData.contactSection.subheading}
                                onChange={(e) =>
                                    handleSectionChange(
                                        "subheading",
                                        e.target.value,
                                    )
                                }
                                placeholder="Get in touch with us for all your solar energy needs. We're here to help!"
                                rows="2"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                CTA Heading
                            </label>
                            <input
                                type="text"
                                value={formData.contactSection.ctaHeading}
                                onChange={(e) =>
                                    handleSectionChange(
                                        "ctaHeading",
                                        e.target.value,
                                    )
                                }
                                placeholder="Ready to Go Solar?"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                CTA Description
                            </label>
                            <textarea
                                value={formData.contactSection.ctaDescription}
                                onChange={(e) =>
                                    handleSectionChange(
                                        "ctaDescription",
                                        e.target.value,
                                    )
                                }
                                placeholder="Contact us today for a free consultation..."
                                rows="2"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                CTA Button Text
                            </label>
                            <input
                                type="text"
                                value={formData.contactSection.ctaButtonText}
                                onChange={(e) =>
                                    handleSectionChange(
                                        "ctaButtonText",
                                        e.target.value,
                                    )
                                }
                                placeholder="Call Us Now"
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
                                <span>Save Contact Page Configuration</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
