// import React from "react";
// import companyThemes from "../config/companyThemes.json";

// const Footer = () => {
//  const phone = companyThemes?.vkenergy?.phone;
//     const email = companyThemes?.vkenergy?.email;

//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//     const phoneLink = phone ? `tel:${phone}` : "";
//     const emailLink = email
//         ? isMobile
//             ? `mailto:${email}`
//             : `https://mail.google.com/mail/?view=cm&to=${email}`
//         : "";

//     return (
//         <footer
//             className={`${companyThemes?.vkenergy?.theme?.text} p-7 font-[Be_Vietnam_Pro] ${companyThemes?.vkenergy?.theme?.bg}`}
//         >
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border p-6 md:p-8 rounded-xl border-gray-700">
//                 {/* Logo and Description */}
//                 <div className="flex flex-col gap-4 md:col-span-2">
//                     <div className="rounded-lg overflow-hidden bg-white w-fit p-2">
//                         <img
//                             src={companyThemes?.vkenergy?.logo}
//                             alt={companyThemes?.vkenergy?.name}
//                             className="w-28 object-contain"
//                         />
//                     </div>
//                     <p
//                         className={`${companyThemes?.vkenergy?.theme?.text} text-sm md:text-base leading-relaxed max-w-2xl`}
//                     >
//                         Driving a sustainable future with next-generation solar
//                         innovation. At{" "}
//                         <span
//                             className={`font-semibold ${companyThemes?.vkenergy?.theme?.gradientText}`}
//                         >
//                             {companyThemes?.vkenergy?.name}
//                         </span>
//                         , we combine advanced technology and engineering
//                         expertise to deliver reliable, high-performance solar
//                         solutions.
//                     </p>
//                     <p
//                         className={`${companyThemes?.vkenergy?.theme?.text} text-sm`}
//                     >
//                         {" "}
//                         <a
//                             href="https://gautamsolar.com/"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="font-bold text-red-600 hover:underline"
//                         >
//                             Gautam Solar
//                         </a>
//                     </p>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="flex flex-col gap-4">
//                     <h4
//                         className={`text-lg font-semibold ${companyThemes?.vkenergy?.theme?.primary}`}
//                     >
//                         Contact Us
//                     </h4>

//                     <div className="space-y-3">
//                         <div className="flex items-center gap-2">
//                             <span>📞</span>
//                             <a
//                                 href={phoneLink}
//                                 className={`${companyThemes?.vkenergy?.theme?.text} hover:underline text-sm md:text-base`}
//                             >
//                                 {companyThemes?.vkenergy?.phone}
//                             </a>
//                         </div>

//                         <div className="flex items-center gap-2">
//                             <span>📧</span>
//                             <a
//                                 href={emailLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="hover:underline"
//                             >
//                                 {companyThemes?.vkenergy?.email}
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Copyright */}
//             <div className="text-center mt-6">
//                 <p
//                     className={`${companyThemes?.vkenergy?.theme?.text} text-sm`}
//                 >
//                     © {new Date().getFullYear()}{" "}
//                     <span
//                         className={`font-semibold ${companyThemes?.vkenergy?.theme?.gradientText}`}
//                     >
//                         {companyThemes?.vkenergy?.name}
//                     </span>
//                     . All rights reserved.
//                 </p>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from "react";
import companyThemes from "../config/companyThemes.json";

const Footer = () => {
    const company = companyThemes?.vkenergy;

    const phone = company?.phone;
    const email = company?.email;

    const isMobile =
        typeof navigator !== "undefined" &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const phoneLink = phone ? `tel:${phone}` : "";
    const emailLink = email
        ? isMobile
            ? `mailto:${email}`
            : `https://mail.google.com/mail/?view=cm&to=${email}`
        : "";

    return (
        <footer
            className={`${company?.theme?.text} ${company?.theme?.bg} p-7 font-[Be_Vietnam_Pro]`}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border border-gray-700 rounded-xl p-6 md:p-8">
                {/* Logo & Description */}
                <div className="flex flex-col gap-4 md:col-span-2">
                    <div className="bg-white w-fit p-2 rounded-lg overflow-hidden">
                        <img
                            src={company?.logo}
                            alt={company?.name}
                            className="w-28 object-contain"
                        />
                    </div>

                    <p className="text-sm md:text-base leading-relaxed max-w-2xl">
                        Driving a sustainable future with next-generation solar
                        innovation. At{" "}
                        <span
                            className={`font-semibold ${company?.theme?.gradientText}`}
                        >
                            {company?.name}
                        </span>
                        , we combine advanced technology and engineering
                        expertise to deliver reliable, high-performance solar
                        solutions.
                    </p>

                    <p className="text-sm">
                        Partnered with{" "}
                        <a
                            href="https://gautamsolar.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-red-600 hover:underline"
                        >
                            Gautam Solar
                        </a>
                    </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4">
                    <h4
                        className={`text-lg font-semibold ${company?.theme?.primary}`}
                    >
                        Contact Us
                    </h4>

                    <div className="space-y-3">
                        {phone && (
                            <div className="flex items-center gap-2">
                                <span>📞</span>
                                <a
                                    href={phoneLink}
                                    className="hover:underline text-sm md:text-base"
                                >
                                    {phone}
                                </a>
                            </div>
                        )}

                        {email && (
                            <div className="flex items-center gap-2">
                                <span>📧</span>
                                <a
                                    href={emailLink}
                                    target={!isMobile ? "_blank" : undefined}
                                    rel={
                                        !isMobile
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="hover:underline text-sm md:text-base"
                                >
                                    {email}
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
                        className={`font-semibold ${company?.theme?.gradientText}`}
                    >
                        {company?.name}
                    </span>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
