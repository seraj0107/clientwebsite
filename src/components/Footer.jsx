import companyThemes from "../config/companyThemes.json";
import { useParams } from "react-router-dom";

const Footer = () => {
    const { company } = useParams();
    const companyData = companyThemes[company];
    const phone = companyData?.phone;
    const email = companyData?.email;
    const address = companyData?.location;
    const isMobile =
        typeof navigator !== "undefined" &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const phoneLink = phone ? `tel:${phone}` : "";
    const emailLink = email
        ? isMobile
            ? `mailto:${email}`
            : `https://mail.google.com/mail/?view=cm&to=${email}`
        : "";

    const mapLink = address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              address,
          )}`
        : "";

    return (
        <footer
            className={`${companyData?.theme?.text} ${companyData?.theme?.bg} p-7 font-[Be_Vietnam_Pro]`}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border border-gray-700 rounded-xl p-6 md:p-8">
                {/* Logo & Description */}
                <div className="flex flex-col gap-4 md:col-span-2">
                    <div className={`  w-fit p-2 rounded-lg overflow-hidden`}>
                        <img
                            src={companyData?.logo}
                            alt={companyData?.name}
                            className="w-28 object-contain rounded-full"
                        />
                    </div>

                    <p className="text-sm md:text-base leading-relaxed max-w-2xl">
                        Driving a sustainable future with next-generation solar
                        innovation. At{" "}
                        <span
                            className={`font-semibold ${companyData?.theme?.gradientText}`}
                        >
                            {companyData?.name}
                        </span>
                        , we combine advanced technology and engineering
                        expertise to deliver reliable, high-performance solar
                        solutions.
                    </p>

                    <p className="text-sm">
                        {" "}
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
                        className={`text-lg font-semibold ${companyData?.theme?.primary}`}
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

                        {address && (
                            <div className="flex items-center gap-2">
                                <span>📍</span>
                                <a
                                    href={mapLink}
                                    target={!isMobile ? "_blank" : undefined}
                                    rel={
                                        !isMobile
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="hover:underline text-sm md:text-base"
                                >
                                    {address}
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
                        className={`font-semibold ${companyData?.theme?.gradientText}`}
                    >
                        {companyData?.name}
                    </span>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
