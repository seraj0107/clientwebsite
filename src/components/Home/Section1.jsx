import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import companyThemes from "../../config/companyThemes.json";

const Section1 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000 });
    }, []);

    const phone = companyThemes?.ArthTechSolution?.phone;
    const email = companyThemes?.ArthTechSolution?.email;

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
        <div className="relative w-full font-[Be_Vietnam_Pro] pt-16 md:pt-20 overflow-hidden">
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* LEFT SIDE - Content (Order: 1) */}
                <div
                    className={`${companyThemes.ArthTechSolution.theme.bg} ${companyThemes.ArthTechSolution.theme.text} flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-16 order-2 lg:order-1`}
                    data-aos="fade-up"
                >
                    <div className="max-w-2xl w-full space-y-4 md:space-y-6 lg:space-y-8">
                        {/* Heading */}
                        <h1
                            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase ${companyThemes.ArthTechSolution.theme.gradientText} text-center lg:text-left leading-tight`}
                        >
                            {companyThemes.ArthTechSolution.name}
                        </h1>

                        {/* Paragraphs */}
                        <div className="space-y-3 md:space-y-4 lg:space-y-6 text-sm sm:text-sm md:text-base lg:text-lg leading-relaxed md:leading-relaxed">
                            <p>
                                At{" "}
                                <span
                                    className={`font-semibold ${companyThemes.ArthTechSolution.theme.gradientText}`}
                                >
                                    {companyThemes.ArthTechSolution.name}
                                </span>
                                , we're dedicated to powering a cleaner, greener
                                tomorrow with turnkey solar solutions. From
                                design to installation and ongoing support, we
                                handle every step with expert care—ensuring
                                seamless, high-performance systems for homes,
                                businesses, and industries.
                            </p>

                            <p>
                                As proud partners of{" "}
                                <a
                                    href="https://gautamsolar.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 font-semibold hover:underline transition-all duration-300"
                                >
                                    Gautam Solar
                                </a>
                                , we deliver cutting-edge, high-efficiency solar
                                panels renowned for durability and innovation.
                            </p>

                            <p>
                                With{" "}
                                <span
                                    className={`${companyThemes.ArthTechSolution.theme.gradientText} font-bold`}
                                >
                                    {companyThemes.ArthTechSolution.name}
                                </span>
                                , going solar is effortless, empowering, and
                                truly sustainable.
                            </p>

                            <p className="text-xs sm:text-sm md:text-base opacity-90">
                                We are a trusted EPC provider delivering
                                end-to-end solar solutions. Specializing in
                                high-performance turnkey systems, we combine
                                innovation and sustainability to power a
                                brighter, greener future
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pt-3 md:pt-4 text-xs sm:text-sm md:text-base">
                            {email && (
                                <a
                                    href={emailLink}
                                    target={!isMobile ? "_blank" : undefined}
                                    rel={
                                        !isMobile
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className={`${companyThemes.ArthTechSolution.theme.primary} hover:underline transition-all flex items-center gap-1 md:gap-2`}
                                >
                                    <span>📧</span>
                                    <span className="break-all">{email}</span>
                                </a>
                            )}

                            {phone && (
                                <a
                                    href={phoneLink}
                                    className={`${companyThemes.ArthTechSolution.theme.primary} hover:underline transition-all flex items-center gap-1 md:gap-2`}
                                >
                                    <span>📞</span>
                                    <span>{phone}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Image with Logo Overlay (Order: 2) */}
                <div
                    className={`relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden order-1 lg:order-2`}
                    data-aos="zoom-out"
                >
                    <img
                        src={companyThemes?.ArthTechSolution?.bgimg1}
                        alt="Solar Panel"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Gradient overlay for better text contrast if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/20 lg:to-transparent"></div>

                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-aos="fade-in"
                    >
                        <div
                            className={`rounded-full overflow-hidden p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl ${companyThemes?.ArthTechSolution?.theme?.imagebgcolor} backdrop-blur-sm `}
                        >
                            <img
                                src={companyThemes.ArthTechSolution.logo}
                                alt={`${companyThemes.ArthTechSolution.name} Logo`}
                                // className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-38 lg:h-38 object-contain rounded-full"
                                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section1;
