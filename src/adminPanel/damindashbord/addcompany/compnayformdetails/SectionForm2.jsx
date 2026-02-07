// import { useState } from "react";
// import {
//     FaUpload,
//     FaEye,
//     FaEyeSlash,
//     FaImage,
//     FaDesktop,
//     FaMobileAlt,
//     FaTimes,
//     FaPlus,
// } from "react-icons/fa";

// const SectionForm2 = ({ initialData, onSave }) => {
//     const [showPreview, setShowPreview] = useState(false);
//     const [previewMode, setPreviewMode] = useState("desktop");
//     const [formData, setFormData] = useState({
//         // Company Name
//         companyName: initialData?.companyName || "Gautam Solar",

//         // Background Images
//         bgimg2: initialData?.bgimg2 || "", // Who We Are section image
//         decorativeImage:
//             initialData?.decorativeImage || "/images/Group 438.png",

//         // Theme Colors
//         backgroundColor: initialData?.backgroundColor || "#0f172a",
//         textColor: initialData?.textColor || "#ffffff",
//         primaryColor: initialData?.primaryColor || "#f97316",
//         secondaryColor: initialData?.secondaryColor || "#eab308",
//         gradientFrom: initialData?.gradientFrom || "#f97316",
//         gradientTo: initialData?.gradientTo || "#eab308",

//         // Who We Are Content
//         whoWeAreContent: initialData?.whoWeAreContent || {
//             paragraph1:
//                 "offers complete solar energy solutions through expert Engineering, Procurement, and Construction (EPC) services. We deliver efficient, customized systems designed to reduce energy costs and support a sustainable future.",
//             paragraph2:
//                 "In partnership with Gautam Solar, we use globally certified solar panels that ensure long-lasting performance, reliability, and trusted results for every installation.",
//             paragraph3:
//                 "With a proven track record across residential, commercial, and industrial sectors, we bring innovation, quality, and sustainability to every project we undertake.",
//             gautamSolarLink: "https://gautamsolar.com/",
//         },

//         // Why Choose Us
//         whyChooseUs: initialData?.whyChooseUs || [
//             {
//                 icon: "🏆",
//                 title: "Certified Excellence",
//                 description:
//                     "Industry-leading certifications and quality standards",
//             },
//             {
//                 icon: "⚡",
//                 title: "High Efficiency",
//                 description:
//                     "Maximum energy output with cutting-edge technology",
//             },
//             {
//                 icon: "🛡️",
//                 title: "Reliable Support",
//                 description: "24/7 customer service and maintenance",
//             },
//             {
//                 icon: "🌱",
//                 title: "Eco-Friendly",
//                 description: "Sustainable solutions for a greener future",
//             },
//         ],

//         // Services Section
//         servicesSection: initialData?.servicesSection || {
//             heading: "Our Services",
//             services: [
//                 {
//                     title: "Residential Solar",
//                     description: "Custom solar solutions for homes",
//                     systemSizes: ["1kW", "3kW", "5kW", "10kW"],
//                     points: [
//                         "Rooftop installations",
//                         "Net metering support",
//                         "Government subsidy assistance",
//                         "25-year performance warranty",
//                     ],
//                 },
//                 {
//                     title: "Commercial Solar",
//                     description: "Scalable solutions for businesses",
//                     systemSizes: ["10kW", "50kW", "100kW", "500kW+"],
//                     points: [
//                         "Cost reduction strategies",
//                         "Tax benefit optimization",
//                         "Quick ROI calculations",
//                         "Minimal business disruption",
//                     ],
//                 },
//                 {
//                     title: "Industrial Solar",
//                     description: "Large-scale power generation",
//                     systemSizes: ["100kW", "500kW", "1MW", "5MW+"],
//                     points: [
//                         "High-capacity systems",
//                         "Grid integration",
//                         "Energy storage solutions",
//                         "Performance monitoring",
//                     ],
//                 },
//             ],
//         },

//         // FAQ/Process Section
//         faqSection: initialData?.faqSection || {
//             heading: "Our Process",
//             items: [
//                 {
//                     step: "01",
//                     title: "Consultation & Site Assessment",
//                     description:
//                         "Our experts visit your location, analyze energy needs, and evaluate site conditions to design the perfect solar solution.",
//                 },
//                 {
//                     step: "02",
//                     title: "Custom System Design",
//                     description:
//                         "We create a tailored solar system blueprint optimized for maximum efficiency, aesthetics, and long-term performance.",
//                 },
//                 {
//                     step: "03",
//                     title: "Professional Installation",
//                     description:
//                         "Our certified technicians install your system with precision, ensuring safety, quality, and minimal disruption to your routine.",
//                 },
//                 {
//                     step: "04",
//                     title: "Activation & Monitoring",
//                     description:
//                         "We activate your system, set up real-time monitoring, and provide comprehensive training on system management.",
//                 },
//                 {
//                     step: "05",
//                     title: "Ongoing Support & Maintenance",
//                     description:
//                         "Enjoy peace of mind with our 24/7 support, regular maintenance checks, and performance optimization services.",
//                 },
//             ],
//         },

//         // Experience Section
//         experienceSection: initialData?.experienceSection || {
//             paragraph1:
//                 "Choosing {companyName} means aligning with a forward-focused company dedicated to sustainable innovation and client success—from ideation to implementation.",
//             paragraph2:
//                 "With us, sustainability is more than a promise—it's our core principle and long-term vision. We're committed to making clean energy accessible, affordable, and reliable for everyone.",
//         },
//     });

//     const [imagePreviews, setImagePreviews] = useState({
//         bgimg2: formData.bgimg2,
//         decorativeImage: formData.decorativeImage,
//     });

//     const handleChange = (key, value) => {
//         setFormData({ ...formData, [key]: value });
//     };

//     const handleNestedChange = (section, key, value) => {
//         setFormData({
//             ...formData,
//             [section]: {
//                 ...formData[section],
//                 [key]: value,
//             },
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

//     // Handle Why Choose Us items
//     const addWhyChooseUsItem = () => {
//         setFormData({
//             ...formData,
//             whyChooseUs: [
//                 ...formData.whyChooseUs,
//                 { icon: "⭐", title: "", description: "" },
//             ],
//         });
//     };

//     const updateWhyChooseUsItem = (index, field, value) => {
//         const updated = [...formData.whyChooseUs];
//         updated[index][field] = value;
//         setFormData({ ...formData, whyChooseUs: updated });
//     };

//     const removeWhyChooseUsItem = (index) => {
//         const updated = formData.whyChooseUs.filter((_, i) => i !== index);
//         setFormData({ ...formData, whyChooseUs: updated });
//     };

//     // Handle Services
//     const addService = () => {
//         const updated = { ...formData.servicesSection };
//         updated.services.push({
//             title: "",
//             description: "",
//             systemSizes: [],
//             points: [],
//         });
//         setFormData({ ...formData, servicesSection: updated });
//     };

//     const updateService = (index, field, value) => {
//         const updated = { ...formData.servicesSection };
//         updated.services[index][field] = value;
//         setFormData({ ...formData, servicesSection: updated });
//     };

//     const removeService = (index) => {
//         const updated = { ...formData.servicesSection };
//         updated.services = updated.services.filter((_, i) => i !== index);
//         setFormData({ ...formData, servicesSection: updated });
//     };

//     const addServicePoint = (serviceIndex) => {
//         const updated = { ...formData.servicesSection };
//         updated.services[serviceIndex].points.push("");
//         setFormData({ ...formData, servicesSection: updated });
//     };

//     const updateServicePoint = (serviceIndex, pointIndex, value) => {
//         const updated = { ...formData.servicesSection };
//         updated.services[serviceIndex].points[pointIndex] = value;
//         setFormData({ ...formData, servicesSection: updated });
//     };

//     const removeServicePoint = (serviceIndex, pointIndex) => {
//         const updated = { ...formData.servicesSection };
//         updated.services[serviceIndex].points = updated.services[
//             serviceIndex
//         ].points.filter((_, i) => i !== pointIndex);
//         setFormData({ ...formData, servicesSection: updated });
//     };

//     // Handle FAQ/Process items
//     const addFaqItem = () => {
//         const updated = { ...formData.faqSection };
//         const nextStep = String(updated.items.length + 1).padStart(2, "0");
//         updated.items.push({
//             step: nextStep,
//             title: "",
//             description: "",
//         });
//         setFormData({ ...formData, faqSection: updated });
//     };

//     const updateFaqItem = (index, field, value) => {
//         const updated = { ...formData.faqSection };
//         updated.items[index][field] = value;
//         setFormData({ ...formData, faqSection: updated });
//     };

//     const removeFaqItem = (index) => {
//         const updated = { ...formData.faqSection };
//         updated.items = updated.items.filter((_, i) => i !== index);
//         setFormData({ ...formData, faqSection: updated });
//     };

//     const handleSubmit = () => {
//         onSave(formData);
//     };

//     return (
//         <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
//                 <h2 className="text-2xl font-bold text-white flex items-center justify-between">
//                     <span>Section 2 Configuration</span>
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
//                             {/* Who We Are Section Preview */}
//                             <div
//                                 className="border border-gray-700 rounded-3xl shadow-xl p-6"
//                                 style={{
//                                     backgroundColor: formData.backgroundColor,
//                                 }}
//                             >
//                                 <div
//                                     className={`grid ${previewMode === "desktop" ? "grid-cols-2" : "grid-cols-1"} gap-6 items-center`}
//                                 >
//                                     {/* Image */}
//                                     <div>
//                                         {imagePreviews.bgimg2 ? (
//                                             <img
//                                                 src={imagePreviews.bgimg2}
//                                                 alt="Solar"
//                                                 className="rounded-2xl shadow-xl w-full h-48 object-cover"
//                                             />
//                                         ) : (
//                                             <div className="rounded-2xl bg-gray-300 w-full h-48 flex items-center justify-center text-gray-500">
//                                                 No Image
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Content */}
//                                     <div className="space-y-4">
//                                         <h1 className="text-xl font-bold text-gray-500">
//                                             Who{" "}
//                                             <span
//                                                 style={{
//                                                     background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                     WebkitBackgroundClip:
//                                                         "text",
//                                                     WebkitTextFillColor:
//                                                         "transparent",
//                                                 }}
//                                             >
//                                                 We Are
//                                             </span>
//                                         </h1>
//                                         <p
//                                             className="text-sm"
//                                             style={{
//                                                 color: formData.textColor,
//                                             }}
//                                         >
//                                             <span
//                                                 className="font-semibold"
//                                                 style={{
//                                                     background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                     WebkitBackgroundClip:
//                                                         "text",
//                                                     WebkitTextFillColor:
//                                                         "transparent",
//                                                 }}
//                                             >
//                                                 {formData.companyName}
//                                             </span>{" "}
//                                             {formData.whoWeAreContent.paragraph1.substring(
//                                                 0,
//                                                 150,
//                                             )}
//                                             ...
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Why Choose Us Preview */}
//                             <div
//                                 className="border border-gray-600 rounded-3xl shadow-xl p-6"
//                                 style={{
//                                     backgroundColor: formData.backgroundColor,
//                                 }}
//                             >
//                                 <h1 className="text-xl font-bold text-center mb-6 text-gray-500">
//                                     Why{" "}
//                                     <span
//                                         style={{
//                                             background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                             WebkitBackgroundClip: "text",
//                                             WebkitTextFillColor: "transparent",
//                                         }}
//                                     >
//                                         Choose Us?
//                                     </span>
//                                 </h1>
//                                 <div
//                                     className={`grid ${previewMode === "desktop" ? "grid-cols-4" : "grid-cols-2"} gap-4`}
//                                 >
//                                     {formData.whyChooseUs
//                                         .slice(0, 4)
//                                         .map((feature, index) => (
//                                             <div
//                                                 key={index}
//                                                 className="border rounded-2xl border-gray-100 p-4 shadow-md"
//                                                 style={{
//                                                     backgroundColor: "white",
//                                                 }}
//                                             >
//                                                 <div className="text-2xl mb-2">
//                                                     {feature.icon}
//                                                 </div>
//                                                 <h2
//                                                     className="text-sm font-semibold mb-1"
//                                                     style={{
//                                                         color: formData.primaryColor,
//                                                     }}
//                                                 >
//                                                     {feature.title}
//                                                 </h2>
//                                                 <p className="text-xs text-gray-600">
//                                                     {feature.description}
//                                                 </p>
//                                             </div>
//                                         ))}
//                                 </div>
//                             </div>

//                             {/* Services Preview */}
//                             <div className="space-y-4">
//                                 <h1 className="text-xl font-bold text-center text-gray-500">
//                                     {
//                                         formData.servicesSection.heading?.split(
//                                             " ",
//                                         )[0]
//                                     }{" "}
//                                     <span
//                                         style={{
//                                             background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                             WebkitBackgroundClip: "text",
//                                             WebkitTextFillColor: "transparent",
//                                         }}
//                                     >
//                                         {formData.servicesSection.heading
//                                             ?.split(" ")
//                                             .slice(1)
//                                             .join(" ")}
//                                     </span>
//                                 </h1>

//                                 <div
//                                     className={`grid ${previewMode === "desktop" ? "grid-cols-3" : "grid-cols-1"} gap-4`}
//                                 >
//                                     {formData.servicesSection.services
//                                         .slice(0, 3)
//                                         .map((service, index) => (
//                                             <div
//                                                 key={index}
//                                                 className="border rounded-3xl p-4 shadow-lg"
//                                                 style={{
//                                                     backgroundColor:
//                                                         formData.backgroundColor,
//                                                 }}
//                                             >
//                                                 <h2
//                                                     className="text-sm font-bold mb-2"
//                                                     style={{
//                                                         color: formData.primaryColor,
//                                                     }}
//                                                 >
//                                                     {service.title}
//                                                 </h2>
//                                                 <p
//                                                     className="text-xs mb-2"
//                                                     style={{
//                                                         color: formData.textColor,
//                                                     }}
//                                                 >
//                                                     {service.description}
//                                                 </p>
//                                                 {service.points &&
//                                                     service.points.length >
//                                                         0 && (
//                                                         <ul className="space-y-1">
//                                                             {service.points
//                                                                 .slice(0, 2)
//                                                                 .map(
//                                                                     (
//                                                                         point,
//                                                                         idx,
//                                                                     ) => (
//                                                                         <li
//                                                                             key={
//                                                                                 idx
//                                                                             }
//                                                                             className="flex gap-1 text-xs"
//                                                                         >
//                                                                             <span
//                                                                                 style={{
//                                                                                     color: formData.primaryColor,
//                                                                                 }}
//                                                                             >
//                                                                                 ✓
//                                                                             </span>
//                                                                             <span
//                                                                                 style={{
//                                                                                     color: formData.textColor,
//                                                                                 }}
//                                                                             >
//                                                                                 {
//                                                                                     point
//                                                                                 }
//                                                                             </span>
//                                                                         </li>
//                                                                     ),
//                                                                 )}
//                                                         </ul>
//                                                     )}
//                                             </div>
//                                         ))}
//                                 </div>
//                             </div>

//                             {/* Process Preview */}
//                             <div
//                                 className="border border-gray-700 rounded-3xl shadow-xl p-6"
//                                 style={{
//                                     backgroundColor: formData.backgroundColor,
//                                 }}
//                             >
//                                 <h1 className="text-xl font-bold text-center mb-6">
//                                     <span
//                                         style={{
//                                             background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                             WebkitBackgroundClip: "text",
//                                             WebkitTextFillColor: "transparent",
//                                         }}
//                                     >
//                                         {formData.faqSection.heading}
//                                     </span>
//                                 </h1>
//                                 <div className="space-y-4">
//                                     {formData.faqSection.items
//                                         .slice(0, 3)
//                                         .map((item, index) => (
//                                             <div
//                                                 key={index}
//                                                 className="flex gap-4 items-start"
//                                             >
//                                                 <div
//                                                     className="text-lg font-bold opacity-50"
//                                                     style={{
//                                                         background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
//                                                         WebkitBackgroundClip:
//                                                             "text",
//                                                         WebkitTextFillColor:
//                                                             "transparent",
//                                                     }}
//                                                 >
//                                                     {item.step}
//                                                 </div>
//                                                 <div className="flex-1">
//                                                     <h3
//                                                         className="text-sm font-bold mb-1"
//                                                         style={{
//                                                             color: formData.primaryColor,
//                                                         }}
//                                                     >
//                                                         {item.title}
//                                                     </h3>
//                                                     <p
//                                                         className="text-xs"
//                                                         style={{
//                                                             color: formData.textColor,
//                                                         }}
//                                                     >
//                                                         {item.description.substring(
//                                                             0,
//                                                             100,
//                                                         )}
//                                                         ...
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                 </div>
//                             </div>

//                             {/* Decorative Image Preview (Separate) */}
//                             {imagePreviews.decorativeImage && (
//                                 <div className="border border-gray-300 rounded-3xl overflow-hidden shadow-lg">
//                                     <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
//                                         <p className="text-sm font-medium text-gray-600">
//                                             Decorative Image
//                                         </p>
//                                     </div>
//                                     <img
//                                         src={imagePreviews.decorativeImage}
//                                         alt="Decorative"
//                                         className="w-full h-64 object-contain bg-gray-50"
//                                     />
//                                 </div>
//                             )}

//                             {/* Experience Section Preview */}
//                             <div
//                                 className="border border-gray-700 rounded-3xl shadow-xl p-6"
//                                 style={{
//                                     backgroundColor: formData.backgroundColor,
//                                 }}
//                             >
//                                 <div className="max-w-6xl mx-auto space-y-4">
//                                     <h1
//                                         className="text-lg font-bold"
//                                         style={{ color: formData.textColor }}
//                                     >
//                                         Experience {formData.companyName}
//                                     </h1>
//                                     <p
//                                         className="text-xs"
//                                         style={{ color: formData.textColor }}
//                                     >
//                                         {formData.experienceSection.paragraph1.replace(
//                                             "{companyName}",
//                                             formData.companyName,
//                                         )}
//                                     </p>
//                                     <p
//                                         className="text-xs"
//                                         style={{ color: formData.textColor }}
//                                     >
//                                         {formData.experienceSection.paragraph2}
//                                     </p>
//                                 </div>
//                             </div>
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
//                         Section Images
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {/* Who We Are Image */}
//                         <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Who We Are Image
//                             </label>

//                             {imagePreviews.bgimg2 ? (
//                                 <div className="space-y-2">
//                                     <div className="relative">
//                                         <img
//                                             src={imagePreviews.bgimg2}
//                                             alt="Who We Are"
//                                             className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
//                                         />
//                                         <button
//                                             onClick={() => {
//                                                 setImagePreviews({
//                                                     ...imagePreviews,
//                                                     bgimg2: "",
//                                                 });
//                                                 handleChange("bgimg2", "");
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
//                                                 handleImageUpload(e, "bgimg2")
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
//                                             Upload Who We Are Image
//                                         </span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) =>
//                                             handleImageUpload(e, "bgimg2")
//                                         }
//                                         className="hidden"
//                                     />
//                                 </label>
//                             )}
//                         </div>

//                         {/* Decorative Image */}
//                         <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Decorative Image
//                             </label>

//                             {imagePreviews.decorativeImage ? (
//                                 <div className="space-y-2">
//                                     <div className="relative">
//                                         <img
//                                             src={imagePreviews.decorativeImage}
//                                             alt="Decorative"
//                                             className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
//                                         />
//                                         <button
//                                             onClick={() => {
//                                                 setImagePreviews({
//                                                     ...imagePreviews,
//                                                     decorativeImage: "",
//                                                 });
//                                                 handleChange(
//                                                     "decorativeImage",
//                                                     "",
//                                                 );
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
//                                                 handleImageUpload(
//                                                     e,
//                                                     "decorativeImage",
//                                                 )
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
//                                             Upload Decorative Image
//                                         </span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) =>
//                                             handleImageUpload(
//                                                 e,
//                                                 "decorativeImage",
//                                             )
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
//                                 Secondary
//                             </label>
//                             <input
//                                 type="color"
//                                 value={formData.secondaryColor}
//                                 onChange={(e) =>
//                                     handleChange(
//                                         "secondaryColor",
//                                         e.target.value,
//                                     )
//                                 }
//                                 className="w-full h-12 cursor-pointer rounded-lg border border-gray-300"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {formData.secondaryColor}
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
//                     </div>
//                 </section>

//                 {/* Who We Are Content */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Who We Are Section
//                     </h3>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Gautam Solar Link
//                         </label>
//                         <input
//                             type="url"
//                             value={formData.whoWeAreContent.gautamSolarLink}
//                             onChange={(e) =>
//                                 handleNestedChange(
//                                     "whoWeAreContent",
//                                     "gautamSolarLink",
//                                     e.target.value,
//                                 )
//                             }
//                             placeholder="https://gautamsolar.com/"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Paragraph 1
//                         </label>
//                         <textarea
//                             value={formData.whoWeAreContent.paragraph1}
//                             onChange={(e) =>
//                                 handleNestedChange(
//                                     "whoWeAreContent",
//                                     "paragraph1",
//                                     e.target.value,
//                                 )
//                             }
//                             rows="3"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Paragraph 2
//                         </label>
//                         <textarea
//                             value={formData.whoWeAreContent.paragraph2}
//                             onChange={(e) =>
//                                 handleNestedChange(
//                                     "whoWeAreContent",
//                                     "paragraph2",
//                                     e.target.value,
//                                 )
//                             }
//                             rows="3"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Paragraph 3
//                         </label>
//                         <textarea
//                             value={formData.whoWeAreContent.paragraph3}
//                             onChange={(e) =>
//                                 handleNestedChange(
//                                     "whoWeAreContent",
//                                     "paragraph3",
//                                     e.target.value,
//                                 )
//                             }
//                             rows="3"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </div>
//                 </section>

//                 {/* Why Choose Us */}
//                 <section className="space-y-4">
//                     <div className="flex justify-between items-center border-b pb-2">
//                         <h3 className="text-lg font-bold text-gray-800">
//                             Why Choose Us Section
//                         </h3>
//                         <button
//                             onClick={addWhyChooseUsItem}
//                             className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
//                         >
//                             <FaPlus /> Add Feature
//                         </button>
//                     </div>

//                     <div className="space-y-3">
//                         {formData.whyChooseUs.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
//                             >
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Icon (Emoji)
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={item.icon}
//                                         onChange={(e) =>
//                                             updateWhyChooseUsItem(
//                                                 index,
//                                                 "icon",
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="🏆"
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Title
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={item.title}
//                                         onChange={(e) =>
//                                             updateWhyChooseUsItem(
//                                                 index,
//                                                 "title",
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="Feature Title"
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Description
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={item.description}
//                                         onChange={(e) =>
//                                             updateWhyChooseUsItem(
//                                                 index,
//                                                 "description",
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="Feature description"
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                     />
//                                 </div>

//                                 <div className="flex items-end">
//                                     <button
//                                         onClick={() =>
//                                             removeWhyChooseUsItem(index)
//                                         }
//                                         className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Services Section */}
//                 <section className="space-y-4">
//                     <div className="flex justify-between items-center border-b pb-2">
//                         <h3 className="text-lg font-bold text-gray-800">
//                             Services Section
//                         </h3>
//                         <button
//                             onClick={addService}
//                             className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
//                         >
//                             <FaPlus /> Add Service
//                         </button>
//                     </div>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Section Heading
//                         </label>
//                         <input
//                             type="text"
//                             value={formData.servicesSection.heading}
//                             onChange={(e) => {
//                                 const updated = { ...formData.servicesSection };
//                                 updated.heading = e.target.value;
//                                 setFormData({
//                                     ...formData,
//                                     servicesSection: updated,
//                                 });
//                             }}
//                             placeholder="Our Services"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </div>

//                     <div className="space-y-4">
//                         {formData.servicesSection.services.map(
//                             (service, serviceIndex) => (
//                                 <div
//                                     key={serviceIndex}
//                                     className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
//                                 >
//                                     <div className="flex justify-between items-center">
//                                         <h4 className="font-semibold text-gray-700">
//                                             Service {serviceIndex + 1}
//                                         </h4>
//                                         <button
//                                             onClick={() =>
//                                                 removeService(serviceIndex)
//                                             }
//                                             className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
//                                         >
//                                             Remove Service
//                                         </button>
//                                     </div>

//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                 Title
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={service.title}
//                                                 onChange={(e) =>
//                                                     updateService(
//                                                         serviceIndex,
//                                                         "title",
//                                                         e.target.value,
//                                                     )
//                                                 }
//                                                 placeholder="Service Title"
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                 System Sizes (comma-separated)
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={
//                                                     service.systemSizes?.join(
//                                                         ", ",
//                                                     ) || ""
//                                                 }
//                                                 onChange={(e) =>
//                                                     updateService(
//                                                         serviceIndex,
//                                                         "systemSizes",
//                                                         e.target.value
//                                                             .split(",")
//                                                             .map((s) =>
//                                                                 s.trim(),
//                                                             ),
//                                                     )
//                                                 }
//                                                 placeholder="1kW, 3kW, 5kW"
//                                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Description
//                                         </label>
//                                         <textarea
//                                             value={service.description}
//                                             onChange={(e) =>
//                                                 updateService(
//                                                     serviceIndex,
//                                                     "description",
//                                                     e.target.value,
//                                                 )
//                                             }
//                                             placeholder="Service description"
//                                             rows="2"
//                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                         />
//                                     </div>

//                                     <div>
//                                         <div className="flex justify-between items-center mb-2">
//                                             <label className="block text-sm font-medium text-gray-700">
//                                                 Service Points
//                                             </label>
//                                             <button
//                                                 onClick={() =>
//                                                     addServicePoint(
//                                                         serviceIndex,
//                                                     )
//                                                 }
//                                                 className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
//                                             >
//                                                 + Add Point
//                                             </button>
//                                         </div>
//                                         <div className="space-y-2">
//                                             {service.points?.map(
//                                                 (point, pointIndex) => (
//                                                     <div
//                                                         key={pointIndex}
//                                                         className="flex gap-2"
//                                                     >
//                                                         <input
//                                                             type="text"
//                                                             value={point}
//                                                             onChange={(e) =>
//                                                                 updateServicePoint(
//                                                                     serviceIndex,
//                                                                     pointIndex,
//                                                                     e.target
//                                                                         .value,
//                                                                 )
//                                                             }
//                                                             placeholder="Service point"
//                                                             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                                         />
//                                                         <button
//                                                             onClick={() =>
//                                                                 removeServicePoint(
//                                                                     serviceIndex,
//                                                                     pointIndex,
//                                                                 )
//                                                             }
//                                                             className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
//                                                         >
//                                                             <FaTimes />
//                                                         </button>
//                                                     </div>
//                                                 ),
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ),
//                         )}
//                     </div>
//                 </section>

//                 {/* FAQ/Process Section */}
//                 <section className="space-y-4">
//                     <div className="flex justify-between items-center border-b pb-2">
//                         <h3 className="text-lg font-bold text-gray-800">
//                             Process/FAQ Section
//                         </h3>
//                         <button
//                             onClick={addFaqItem}
//                             className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
//                         >
//                             <FaPlus /> Add Step
//                         </button>
//                     </div>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Section Heading
//                         </label>
//                         <input
//                             type="text"
//                             value={formData.faqSection.heading}
//                             onChange={(e) => {
//                                 const updated = { ...formData.faqSection };
//                                 updated.heading = e.target.value;
//                                 setFormData({
//                                     ...formData,
//                                     faqSection: updated,
//                                 });
//                             }}
//                             placeholder="Our Process"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </div>

//                     <div className="space-y-3">
//                         {formData.faqSection.items.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
//                             >
//                                 <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-gray-700">
//                                         Step {item.step}
//                                     </span>
//                                     <button
//                                         onClick={() => removeFaqItem(index)}
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
//                                         value={item.title}
//                                         onChange={(e) =>
//                                             updateFaqItem(
//                                                 index,
//                                                 "title",
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="Step title"
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Description
//                                     </label>
//                                     <textarea
//                                         value={item.description}
//                                         onChange={(e) =>
//                                             updateFaqItem(
//                                                 index,
//                                                 "description",
//                                                 e.target.value,
//                                             )
//                                         }
//                                         placeholder="Step description"
//                                         rows="2"
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Experience Section */}
//                 <section className="space-y-4">
//                     <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
//                         Experience Section
//                     </h3>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Paragraph 1
//                         </label>
//                         <textarea
//                             value={formData.experienceSection.paragraph1}
//                             onChange={(e) =>
//                                 handleNestedChange(
//                                     "experienceSection",
//                                     "paragraph1",
//                                     e.target.value,
//                                 )
//                             }
//                             rows="3"
//                             placeholder="Use {companyName} placeholder for dynamic company name"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">
//                             Use {"{companyName}"} to dynamically insert the
//                             company name
//                         </p>
//                     </div>

//                     <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                             Paragraph 2
//                         </label>
//                         <textarea
//                             value={formData.experienceSection.paragraph2}
//                             onChange={(e) =>
//                                 handleNestedChange(
//                                     "experienceSection",
//                                     "paragraph2",
//                                     e.target.value,
//                                 )
//                             }
//                             rows="3"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </div>
//                 </section>

//                 {/* Save Button */}
//                 <div className="flex gap-4 pt-6 border-t">
//                     <button
//                         onClick={handleSubmit}
//                         className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition shadow-lg"
//                     >
//                         Save Section 2 Configuration
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SectionForm2;

import { useState, useEffect } from "react";
import {
    FaUpload,
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
    FaTrophy,
    FaBolt,
    FaShieldAlt,
    FaLeaf,
    FaStar,
    FaHome,
    FaBuilding,
    FaIndustry,
    FaCheck,
} from "react-icons/fa";
import { saveSectionData } from "../../../../components/services/api";

const SectionForm2 = ({
    initialData,
    onSave,
    clientSlug = "default-client",
}) => {
    const [showPreview, setShowPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState("desktop");
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    // Available icon options for dropdown
    const iconOptions = [
        { value: "FaTrophy", label: "Trophy", icon: <FaTrophy /> },
        { value: "FaBolt", label: "Bolt", icon: <FaBolt /> },
        { value: "FaShieldAlt", label: "Shield", icon: <FaShieldAlt /> },
        { value: "FaLeaf", label: "Leaf", icon: <FaLeaf /> },
        { value: "FaStar", label: "Star", icon: <FaStar /> },
        { value: "FaHome", label: "Home", icon: <FaHome /> },
        { value: "FaBuilding", label: "Building", icon: <FaBuilding /> },
        { value: "FaIndustry", label: "Industry", icon: <FaIndustry /> },
        { value: "FaCheck", label: "Check", icon: <FaCheck /> },
    ];

    // Function to get icon component by value
    const getIconComponent = (iconValue) => {
        const iconMap = {
            FaTrophy: FaTrophy,
            FaBolt: FaBolt,
            FaShieldAlt: FaShieldAlt,
            FaLeaf: FaLeaf,
            FaStar: FaStar,
            FaHome: FaHome,
            FaBuilding: FaBuilding,
            FaIndustry: FaIndustry,
            FaCheck: FaCheck,
        };

        const IconComponent = iconMap[iconValue];
        return IconComponent ? <IconComponent /> : <FaStar />;
    };

    // Default data structure with React Icons
    const defaultData = {
        companyName: "Gautam Solar",

        // Background Images
        bgimg2: "",
        decorativeImage: "/images/Group 438.png",

        // Theme Colors
        backgroundColor: "#0f172a",
        textColor: "#ffffff",
        primaryColor: "#f97316",
        secondaryColor: "#eab308",
        gradientFrom: "#f97316",
        gradientTo: "#eab308",

        // Who We Are Content
        whoWeAreContent: {
            paragraph1:
                "offers complete solar energy solutions through expert Engineering, Procurement, and Construction (EPC) services. We deliver efficient, customized systems designed to reduce energy costs and support a sustainable future.",
            paragraph2:
                "In partnership with Gautam Solar, we use globally certified solar panels that ensure long-lasting performance, reliability, and trusted results for every installation.",
            paragraph3:
                "With a proven track record across residential, commercial, and industrial sectors, we bring innovation, quality, and sustainability to every project we undertake.",
            gautamSolarLink: "https://gautamsolar.com/",
        },

        // Why Choose Us
        whyChooseUs: [
            {
                icon: "FaTrophy",
                title: "Certified Excellence",
                description:
                    "Industry-leading certifications and quality standards",
            },
            {
                icon: "FaBolt",
                title: "High Efficiency",
                description:
                    "Maximum energy output with cutting-edge technology",
            },
            {
                icon: "FaShieldAlt",
                title: "Reliable Support",
                description: "24/7 customer service and maintenance",
            },
            {
                icon: "FaLeaf",
                title: "Eco-Friendly",
                description: "Sustainable solutions for a greener future",
            },
        ],

        // Services Section
        servicesSection: {
            heading: "Our Services",
            services: [
                {
                    title: "Residential Solar",
                    description: "Custom solar solutions for homes",
                    systemSizes: ["1kW", "3kW", "5kW", "10kW"],
                    points: [
                        "Rooftop installations",
                        "Net metering support",
                        "Government subsidy assistance",
                        "25-year performance warranty",
                    ],
                },
                {
                    title: "Commercial Solar",
                    description: "Scalable solutions for businesses",
                    systemSizes: ["10kW", "50kW", "100kW", "500kW+"],
                    points: [
                        "Cost reduction strategies",
                        "Tax benefit optimization",
                        "Quick ROI calculations",
                        "Minimal business disruption",
                    ],
                },
                {
                    title: "Industrial Solar",
                    description: "Large-scale power generation",
                    systemSizes: ["100kW", "500kW", "1MW", "5MW+"],
                    points: [
                        "High-capacity systems",
                        "Grid integration",
                        "Energy storage solutions",
                        "Performance monitoring",
                    ],
                },
            ],
        },

        // FAQ/Process Section
        faqSection: {
            heading: "Our Process",
            items: [
                {
                    step: "01",
                    title: "Consultation & Site Assessment",
                    description:
                        "Our experts visit your location, analyze energy needs, and evaluate site conditions to design the perfect solar solution.",
                },
                {
                    step: "02",
                    title: "Custom System Design",
                    description:
                        "We create a tailored solar system blueprint optimized for maximum efficiency, aesthetics, and long-term performance.",
                },
                {
                    step: "03",
                    title: "Professional Installation",
                    description:
                        "Our certified technicians install your system with precision, ensuring safety, quality, and minimal disruption to your routine.",
                },
                {
                    step: "04",
                    title: "Activation & Monitoring",
                    description:
                        "We activate your system, set up real-time monitoring, and provide comprehensive training on system management.",
                },
                {
                    step: "05",
                    title: "Ongoing Support & Maintenance",
                    description:
                        "Enjoy peace of mind with our 24/7 support, regular maintenance checks, and performance optimization services.",
                },
            ],
        },

        // Experience Section
        experienceSection: {
            paragraph1:
                "Choosing {companyName} means aligning with a forward-focused company dedicated to sustainable innovation and client success—from ideation to implementation.",
            paragraph2:
                "With us, sustainability is more than a promise—it's our core principle and long-term vision. We're committed to making clean energy accessible, affordable, and reliable for everyone.",
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
        bgimg2: formData.bgimg2,
        decorativeImage: formData.decorativeImage,
    });

    // Sync with initialData when it changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...defaultData,
                ...initialData,
            });
            setImagePreviews({
                bgimg2: initialData.bgimg2 || "",
                decorativeImage: initialData.decorativeImage || "",
            });
        }
    }, [initialData]);

    // Load from localStorage on mount if no initialData
    useEffect(() => {
        if (!initialData) {
            const savedData = localStorage.getItem(`section2_${clientSlug}`);
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    if (parsed.data) {
                        setFormData({
                            ...defaultData,
                            ...parsed.data,
                        });
                        setImagePreviews({
                            bgimg2: parsed.data.bgimg2 || "",
                            decorativeImage: parsed.data.decorativeImage || "",
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

    const handleNestedChange = (section, key, value) => {
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                [key]: value,
            },
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

    // Handle Why Choose Us items
    const addWhyChooseUsItem = () => {
        setFormData({
            ...formData,
            whyChooseUs: [
                ...formData.whyChooseUs,
                { icon: "FaStar", title: "", description: "" },
            ],
        });
    };

    const updateWhyChooseUsItem = (index, field, value) => {
        const updated = [...formData.whyChooseUs];
        updated[index][field] = value;
        setFormData({ ...formData, whyChooseUs: updated });
    };

    const removeWhyChooseUsItem = (index) => {
        const updated = formData.whyChooseUs.filter((_, i) => i !== index);
        setFormData({ ...formData, whyChooseUs: updated });
    };

    // Handle Services
    const addService = () => {
        const updated = { ...formData.servicesSection };
        updated.services.push({
            title: "",
            description: "",
            systemSizes: [],
            points: [],
        });
        setFormData({ ...formData, servicesSection: updated });
    };

    const updateService = (index, field, value) => {
        const updated = { ...formData.servicesSection };
        updated.services[index][field] = value;
        setFormData({ ...formData, servicesSection: updated });
    };

    const removeService = (index) => {
        const updated = { ...formData.servicesSection };
        updated.services = updated.services.filter((_, i) => i !== index);
        setFormData({ ...formData, servicesSection: updated });
    };

    const addServicePoint = (serviceIndex) => {
        const updated = { ...formData.servicesSection };
        updated.services[serviceIndex].points.push("");
        setFormData({ ...formData, servicesSection: updated });
    };

    const updateServicePoint = (serviceIndex, pointIndex, value) => {
        const updated = { ...formData.servicesSection };
        updated.services[serviceIndex].points[pointIndex] = value;
        setFormData({ ...formData, servicesSection: updated });
    };

    const removeServicePoint = (serviceIndex, pointIndex) => {
        const updated = { ...formData.servicesSection };
        updated.services[serviceIndex].points = updated.services[
            serviceIndex
        ].points.filter((_, i) => i !== pointIndex);
        setFormData({ ...formData, servicesSection: updated });
    };

    // Handle FAQ/Process items
    const addFaqItem = () => {
        const updated = { ...formData.faqSection };
        const nextStep = String(updated.items.length + 1).padStart(2, "0");
        updated.items.push({
            step: nextStep,
            title: "",
            description: "",
        });
        setFormData({ ...formData, faqSection: updated });
    };

    const updateFaqItem = (index, field, value) => {
        const updated = { ...formData.faqSection };
        updated.items[index][field] = value;
        setFormData({ ...formData, faqSection: updated });
    };

    const removeFaqItem = (index) => {
        const updated = { ...formData.faqSection };
        updated.items = updated.items.filter((_, i) => i !== index);
        setFormData({ ...formData, faqSection: updated });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setSaveStatus(null);

        try {
            // Save to API
            const result = await saveSectionData(
                "section2",
                formData,
                clientSlug,
            );

            // Save to localStorage as backup
            try {
                localStorage.setItem(
                    `section2_${clientSlug}`,
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

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
                <h2 className="text-2xl font-bold text-white flex items-center justify-between">
                    <span>Section 2 Configuration</span>
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
                                        Section 2 configuration saved
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
                            {/* Who We Are Section Preview */}
                            <div
                                className="border border-gray-700 rounded-3xl shadow-xl p-6"
                                style={{
                                    backgroundColor: formData.backgroundColor,
                                }}
                            >
                                <div
                                    className={`grid ${previewMode === "desktop" ? "grid-cols-2" : "grid-cols-1"} gap-6 items-center`}
                                >
                                    {/* Image */}
                                    <div>
                                        {imagePreviews.bgimg2 ? (
                                            <img
                                                src={imagePreviews.bgimg2}
                                                alt="Solar"
                                                className="rounded-2xl shadow-xl w-full h-48 object-cover"
                                            />
                                        ) : (
                                            <div className="rounded-2xl bg-gray-300 w-full h-48 flex items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <h1 className="text-xl font-bold text-gray-500">
                                            Who{" "}
                                            <span
                                                style={{
                                                    background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                    WebkitBackgroundClip:
                                                        "text",
                                                    WebkitTextFillColor:
                                                        "transparent",
                                                }}
                                            >
                                                We Are
                                            </span>
                                        </h1>
                                        <p
                                            className="text-sm"
                                            style={{
                                                color: formData.textColor,
                                            }}
                                        >
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
                                            </span>{" "}
                                            {formData.whoWeAreContent.paragraph1.substring(
                                                0,
                                                150,
                                            )}
                                            ...
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Why Choose Us Preview */}
                            <div
                                className="border border-gray-600 rounded-3xl shadow-xl p-6"
                                style={{
                                    backgroundColor: formData.backgroundColor,
                                }}
                            >
                                <h1 className="text-xl font-bold text-center mb-6 text-gray-500">
                                    Why{" "}
                                    <span
                                        style={{
                                            background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        Choose Us?
                                    </span>
                                </h1>
                                <div
                                    className={`grid ${previewMode === "desktop" ? "grid-cols-4" : "grid-cols-2"} gap-4`}
                                >
                                    {formData.whyChooseUs
                                        .slice(0, 4)
                                        .map((feature, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-2xl border-gray-100 p-4 shadow-md"
                                                style={{
                                                    backgroundColor: "white",
                                                }}
                                            >
                                                <div
                                                    className="text-2xl mb-2"
                                                    style={{
                                                        color: formData.primaryColor,
                                                    }}
                                                >
                                                    {getIconComponent(
                                                        feature.icon,
                                                    )}
                                                </div>
                                                <h2
                                                    className="text-sm font-semibold mb-1"
                                                    style={{
                                                        color: formData.primaryColor,
                                                    }}
                                                >
                                                    {feature.title}
                                                </h2>
                                                <p className="text-xs text-gray-600">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Services Preview */}
                            <div className="space-y-4">
                                <h1 className="text-xl font-bold text-center text-gray-500">
                                    {
                                        formData.servicesSection.heading?.split(
                                            " ",
                                        )[0]
                                    }{" "}
                                    <span
                                        style={{
                                            background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {formData.servicesSection.heading
                                            ?.split(" ")
                                            .slice(1)
                                            .join(" ")}
                                    </span>
                                </h1>

                                <div
                                    className={`grid ${previewMode === "desktop" ? "grid-cols-3" : "grid-cols-1"} gap-4`}
                                >
                                    {formData.servicesSection.services
                                        .slice(0, 3)
                                        .map((service, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-3xl p-4 shadow-lg"
                                                style={{
                                                    backgroundColor:
                                                        formData.backgroundColor,
                                                }}
                                            >
                                                <h2
                                                    className="text-sm font-bold mb-2"
                                                    style={{
                                                        color: formData.primaryColor,
                                                    }}
                                                >
                                                    {service.title}
                                                </h2>
                                                <p
                                                    className="text-xs mb-2"
                                                    style={{
                                                        color: formData.textColor,
                                                    }}
                                                >
                                                    {service.description}
                                                </p>
                                                {service.points &&
                                                    service.points.length >
                                                        0 && (
                                                        <ul className="space-y-1">
                                                            {service.points
                                                                .slice(0, 2)
                                                                .map(
                                                                    (
                                                                        point,
                                                                        idx,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="flex gap-1 text-xs"
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    color: formData.primaryColor,
                                                                                }}
                                                                            >
                                                                                <FaCheck
                                                                                    size={
                                                                                        10
                                                                                    }
                                                                                />
                                                                            </span>
                                                                            <span
                                                                                style={{
                                                                                    color: formData.textColor,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    point
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    ),
                                                                )}
                                                        </ul>
                                                    )}
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Process Preview */}
                            <div
                                className="border border-gray-700 rounded-3xl shadow-xl p-6"
                                style={{
                                    backgroundColor: formData.backgroundColor,
                                }}
                            >
                                <h1 className="text-xl font-bold text-center mb-6">
                                    <span
                                        style={{
                                            background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {formData.faqSection.heading}
                                    </span>
                                </h1>
                                <div className="space-y-4">
                                    {formData.faqSection.items
                                        .slice(0, 3)
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 items-start"
                                            >
                                                <div
                                                    className="text-lg font-bold opacity-50"
                                                    style={{
                                                        background: `linear-gradient(to right, ${formData.gradientFrom}, ${formData.gradientTo})`,
                                                        WebkitBackgroundClip:
                                                            "text",
                                                        WebkitTextFillColor:
                                                            "transparent",
                                                    }}
                                                >
                                                    {item.step}
                                                </div>
                                                <div className="flex-1">
                                                    <h3
                                                        className="text-sm font-bold mb-1"
                                                        style={{
                                                            color: formData.primaryColor,
                                                        }}
                                                    >
                                                        {item.title}
                                                    </h3>
                                                    <p
                                                        className="text-xs"
                                                        style={{
                                                            color: formData.textColor,
                                                        }}
                                                    >
                                                        {item.description.substring(
                                                            0,
                                                            100,
                                                        )}
                                                        ...
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Decorative Image Preview (Separate) */}
                            {imagePreviews.decorativeImage && (
                                <div className="border border-gray-300 rounded-3xl overflow-hidden shadow-lg">
                                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                                        <p className="text-sm font-medium text-gray-600">
                                            Decorative Image
                                        </p>
                                    </div>
                                    <img
                                        src={imagePreviews.decorativeImage}
                                        alt="Decorative"
                                        className="w-full h-64 object-contain bg-gray-50"
                                    />
                                </div>
                            )}

                            {/* Experience Section Preview */}
                            <div
                                className="border border-gray-700 rounded-3xl shadow-xl p-6"
                                style={{
                                    backgroundColor: formData.backgroundColor,
                                }}
                            >
                                <div className="max-w-6xl mx-auto space-y-4">
                                    <h1
                                        className="text-lg font-bold"
                                        style={{ color: formData.textColor }}
                                    >
                                        Experience {formData.companyName}
                                    </h1>
                                    <p
                                        className="text-xs"
                                        style={{ color: formData.textColor }}
                                    >
                                        {formData.experienceSection.paragraph1.replace(
                                            "{companyName}",
                                            formData.companyName,
                                        )}
                                    </p>
                                    <p
                                        className="text-xs"
                                        style={{ color: formData.textColor }}
                                    >
                                        {formData.experienceSection.paragraph2}
                                    </p>
                                </div>
                            </div>
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
                        Section Images
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Who We Are Image */}
                        <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <label className="block font-medium text-gray-700 mb-2">
                                Who We Are Image
                            </label>

                            {imagePreviews.bgimg2 ? (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.bgimg2}
                                            alt="Who We Are"
                                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                                        />
                                        <button
                                            onClick={() => {
                                                setImagePreviews({
                                                    ...imagePreviews,
                                                    bgimg2: "",
                                                });
                                                handleChange("bgimg2", "");
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
                                                handleImageUpload(e, "bgimg2")
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
                                            Upload Who We Are Image
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageUpload(e, "bgimg2")
                                        }
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* Decorative Image */}
                        <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <label className="block font-medium text-gray-700 mb-2">
                                Decorative Image
                            </label>

                            {imagePreviews.decorativeImage ? (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.decorativeImage}
                                            alt="Decorative"
                                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                                        />
                                        <button
                                            onClick={() => {
                                                setImagePreviews({
                                                    ...imagePreviews,
                                                    decorativeImage: "",
                                                });
                                                handleChange(
                                                    "decorativeImage",
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
                                                handleImageUpload(
                                                    e,
                                                    "decorativeImage",
                                                )
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
                                            Upload Decorative Image
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageUpload(
                                                e,
                                                "decorativeImage",
                                            )
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
                                Secondary
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

                {/* Who We Are Content */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Who We Are Section
                    </h3>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Gautam Solar Link
                        </label>
                        <input
                            type="url"
                            value={formData.whoWeAreContent.gautamSolarLink}
                            onChange={(e) =>
                                handleNestedChange(
                                    "whoWeAreContent",
                                    "gautamSolarLink",
                                    e.target.value,
                                )
                            }
                            placeholder="https://gautamsolar.com/"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Paragraph 1
                        </label>
                        <textarea
                            value={formData.whoWeAreContent.paragraph1}
                            onChange={(e) =>
                                handleNestedChange(
                                    "whoWeAreContent",
                                    "paragraph1",
                                    e.target.value,
                                )
                            }
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Paragraph 2
                        </label>
                        <textarea
                            value={formData.whoWeAreContent.paragraph2}
                            onChange={(e) =>
                                handleNestedChange(
                                    "whoWeAreContent",
                                    "paragraph2",
                                    e.target.value,
                                )
                            }
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Paragraph 3
                        </label>
                        <textarea
                            value={formData.whoWeAreContent.paragraph3}
                            onChange={(e) =>
                                handleNestedChange(
                                    "whoWeAreContent",
                                    "paragraph3",
                                    e.target.value,
                                )
                            }
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                            Why Choose Us Section
                        </h3>
                        <button
                            onClick={addWhyChooseUsItem}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
                        >
                            <FaPlus /> Add Feature
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.whyChooseUs.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Icon
                                    </label>
                                    <select
                                        value={item.icon}
                                        onChange={(e) =>
                                            updateWhyChooseUsItem(
                                                index,
                                                "icon",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    >
                                        {iconOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="mt-2 text-xl text-center text-gray-600">
                                        {getIconComponent(item.icon)}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) =>
                                            updateWhyChooseUsItem(
                                                index,
                                                "title",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Feature Title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) =>
                                            updateWhyChooseUsItem(
                                                index,
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Feature description"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>

                                <div className="flex items-end">
                                    <button
                                        onClick={() =>
                                            removeWhyChooseUsItem(index)
                                        }
                                        className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services Section */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                            Services Section
                        </h3>
                        <button
                            onClick={addService}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
                        >
                            <FaPlus /> Add Service
                        </button>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Section Heading
                        </label>
                        <input
                            type="text"
                            value={formData.servicesSection.heading}
                            onChange={(e) => {
                                const updated = { ...formData.servicesSection };
                                updated.heading = e.target.value;
                                setFormData({
                                    ...formData,
                                    servicesSection: updated,
                                });
                            }}
                            placeholder="Our Services"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="space-y-4">
                        {formData.servicesSection.services.map(
                            (service, serviceIndex) => (
                                <div
                                    key={serviceIndex}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
                                >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-gray-700">
                                            Service {serviceIndex + 1}
                                        </h4>
                                        <button
                                            onClick={() =>
                                                removeService(serviceIndex)
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                                        >
                                            Remove Service
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={service.title}
                                                onChange={(e) =>
                                                    updateService(
                                                        serviceIndex,
                                                        "title",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Service Title"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                System Sizes (comma-separated)
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    service.systemSizes?.join(
                                                        ", ",
                                                    ) || ""
                                                }
                                                onChange={(e) =>
                                                    updateService(
                                                        serviceIndex,
                                                        "systemSizes",
                                                        e.target.value
                                                            .split(",")
                                                            .map((s) =>
                                                                s.trim(),
                                                            ),
                                                    )
                                                }
                                                placeholder="1kW, 3kW, 5kW"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={service.description}
                                            onChange={(e) =>
                                                updateService(
                                                    serviceIndex,
                                                    "description",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Service description"
                                            rows="2"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Service Points
                                            </label>
                                            <button
                                                onClick={() =>
                                                    addServicePoint(
                                                        serviceIndex,
                                                    )
                                                }
                                                className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                            >
                                                + Add Point
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {service.points?.map(
                                                (point, pointIndex) => (
                                                    <div
                                                        key={pointIndex}
                                                        className="flex gap-2"
                                                    >
                                                        <input
                                                            type="text"
                                                            value={point}
                                                            onChange={(e) =>
                                                                updateServicePoint(
                                                                    serviceIndex,
                                                                    pointIndex,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Service point"
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                removeServicePoint(
                                                                    serviceIndex,
                                                                    pointIndex,
                                                                )
                                                            }
                                                            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </section>

                {/* FAQ/Process Section */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                            Process/FAQ Section
                        </h3>
                        <button
                            onClick={addFaqItem}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
                        >
                            <FaPlus /> Add Step
                        </button>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Section Heading
                        </label>
                        <input
                            type="text"
                            value={formData.faqSection.heading}
                            onChange={(e) => {
                                const updated = { ...formData.faqSection };
                                updated.heading = e.target.value;
                                setFormData({
                                    ...formData,
                                    faqSection: updated,
                                });
                            }}
                            placeholder="Our Process"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="space-y-3">
                        {formData.faqSection.items.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">
                                        Step {item.step}
                                    </span>
                                    <button
                                        onClick={() => removeFaqItem(index)}
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
                                        value={item.title}
                                        onChange={(e) =>
                                            updateFaqItem(
                                                index,
                                                "title",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Step title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={item.description}
                                        onChange={(e) =>
                                            updateFaqItem(
                                                index,
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Step description"
                                        rows="2"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Experience Section
                    </h3>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Paragraph 1
                        </label>
                        <textarea
                            value={formData.experienceSection.paragraph1}
                            onChange={(e) =>
                                handleNestedChange(
                                    "experienceSection",
                                    "paragraph1",
                                    e.target.value,
                                )
                            }
                            rows="3"
                            placeholder="Use {companyName} placeholder for dynamic company name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Use {"{companyName}"} to dynamically insert the
                            company name
                        </p>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Paragraph 2
                        </label>
                        <textarea
                            value={formData.experienceSection.paragraph2}
                            onChange={(e) =>
                                handleNestedChange(
                                    "experienceSection",
                                    "paragraph2",
                                    e.target.value,
                                )
                            }
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
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
                                <span>Save Section 2 Configuration</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionForm2;
