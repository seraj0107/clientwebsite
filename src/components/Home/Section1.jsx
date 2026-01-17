import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import companyThemes from "../../config/companyThemes.json";

const Section1 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000 });
    }, []);

    const phone = companyThemes?.vkenergy?.phone;
    const email = companyThemes?.vkenergy?.email;

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
        <div className="relative w-full font-[Be_Vietnam_Pro] pt-20 overflow-hidden">
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* LEFT SIDE - Content (Order: 1) */}
                <div
                    className={`${companyThemes.vkenergy.theme.bg} ${companyThemes.vkenergy.theme.text} flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16 order-2 lg:order-1`}
                    data-aos="fade-up"
                >
                    <div className="max-w-2xl w-full space-y-6 lg:space-y-8">
                        {/* Heading */}
                        <h1
                            className={`text-xl sm:text-4xl lg:text-5xl xl:text-3xl font-bold uppercase ${companyThemes.vkenergy.theme.gradientText} text-center lg:text-left`}
                        >
                            {companyThemes.vkenergy.name}
                        </h1>

                        {/* Paragraphs */}
                        <div className="space-y-4 lg:space-y-6 text-sm sm:text-base lg:text-lg xl:text-lg leading-relaxed">
                            <p>
                                At{" "}
                                <span
                                    className={` font-semibold ${companyThemes.vkenergy.theme.gradientText}`}
                                >
                                    {companyThemes.vkenergy.name}
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
                                    className={`${companyThemes.vkenergy.theme.gradientText} font-bold`}
                                >
                                    {companyThemes.vkenergy.name}
                                </span>
                                , going solar is effortless, empowering, and
                                truly sustainable.
                            </p>

                            <p className="text-sm sm:text-base lg:text-lg opacity-90">
                                We are a trusted leader in EPC (Engineering,
                                Procurement, and Construction), providing fully
                                integrated, end-to-end solar power solutions. We
                                specialize in designing, engineering, and
                                delivering high-performance turnkey systems
                                tailored to meet your unique energy
                                requirements. Guided by innovation and a strong
                                commitment to sustainability, we're not just
                                installing solar—we're empowering a brighter,
                                greener future, one project at a time.
                            </p>
                        </div>

                        {/* Contact Info */}

                        {/* <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 text-sm sm:text-base">
                            <a
                                href={`https://mail.google.com/mail/?view=cm&to=${companyThemes?.vkenergy?.email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${companyThemes.vkenergy.theme.primary} hover:underline transition-all`}
                            >
                                📧{companyThemes.vkenergy.email}
                            </a>
                            <a
                                href={`tel:${companyThemes.vkenergy.phone}`}
                                className={`${companyThemes.vkenergy.theme.primary} hover:underline transition-all`}
                            >
                                📞 {companyThemes.vkenergy.phone}
                            </a>
                        </div> */}

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 text-sm sm:text-base">
                            {email && (
                                <a
                                    href={emailLink}
                                    target={!isMobile ? "_blank" : undefined}
                                    rel={
                                        !isMobile
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className={`${companyThemes.vkenergy.theme.primary} hover:underline transition-all`}
                                >
                                    📧 {email}
                                </a>
                            )}

                            {phone && (
                                <a
                                    href={phoneLink}
                                    className={`${companyThemes.vkenergy.theme.primary} hover:underline transition-all`}
                                >
                                    📞 {phone}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Image with Logo Overlay (Order: 2) */}
                <div
                    className="relative h-[60vh] sm:h-[70vh] lg:h-screen overflow-hidden order-1 lg:order-2"
                    data-aos="zoom-out"
                >
                    {/* Background Image */}
                    <img
                        src="/solarphoto.jpg"
                        alt="Solar Panel"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div
                        className={`absolute inset-0 ${companyThemes.vkenergy.theme.overlay}`}
                    ></div>

                    {/* Logo - Centered on Image */}
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-aos="fade-in"
                    >
                        <div className="rounded-full overflow-hidden bg-white p-4 sm:p-6 lg:p-8 shadow-2xl">
                            <img
                                src={companyThemes.vkenergy.logo}
                                alt={`${companyThemes.vkenergy.name} Logo`}
                                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-38 lg:h-38 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section1;
