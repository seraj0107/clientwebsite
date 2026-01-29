
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import companyThemes from "../config/companyThemes.json";
import { useParams } from "react-router-dom";

const About = () => {
    const { company } = useParams();
    const compnayData = companyThemes[company];

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="relative w-full font-[Be_Vietnam_Pro] overflow-hidden">
            {/* Hero Section with Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* LEFT SIDE - Content */}
                <div
                    className={`${compnayData?.theme?.bg} ${compnayData?.theme?.text} flex items-center justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 order-2 lg:order-1`}
                    data-aos="fade-right"
                >
                    <div className="max-w-xl w-full space-y-8">
                        {/* Heading */}
                        <h1 className="text-4xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight leading-tight">
                            About{" "}
                            <span
                                className={`${compnayData?.theme?.gradientText}`}
                            >
                                Us
                            </span>
                        </h1>

                        {/* Content Paragraphs */}
                        <div className="space-y-6 text-base sm:text-lg leading-relaxed">
                            {compnayData?.aboutSection?.paragraphs?.map(
                                (text, index) => (
                                    <p
                                        key={index}
                                        data-aos="fade-up"
                                        data-aos-delay={100 + index * 50}
                                    >
                                        {index === 0 && (
                                            <span
                                                className={`font-bold ${compnayData?.theme?.gradientText}`}
                                            >
                                                {compnayData?.name}{" "}
                                            </span>
                                        )}
                                        {text}
                                    </p>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Image with Logo Overlay */}
                <div
                    className="relative h-[60vh] sm:h-[70vh] lg:h-screen overflow-hidden order-1 lg:order-2"
                    data-aos="fade-left"
                >
                    {/* Background Image */}
                    <img
                        src={compnayData?.bgimg3}
                        alt="Solar Panel Installation"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Logo - Centered on Image */}
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        <div
                        // className={`rounded-full ${compnayData?.theme?.imagebgcolor} p-6 sm:p-8 shadow-2xl backdrop-blur-sm`}
                        // className={` ${compnayData?.theme?.imagebgcolor} p-6 sm:p-8`}
                        >
                            <img
                                src={compnayData?.logo}
                                alt={`${compnayData?.name} Logo`}
                                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Certifications Section */}
            {compnayData?.aboutSection?.certifications?.length > 0 && (
                <section
                    className={`py-20 sm:py-24 lg:py-32 ${compnayData?.theme?.bg} ${compnayData?.theme?.text} `}
                >
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        {/* Section Header */}
                        <div
                            className="text-center mb-16 sm:mb-20"
                            data-aos="fade-up"
                        >
                            <h2 className="text-4xl sm:text-3xl lg:text-4xl font-bold">
                                Authorized &{" "}
                                <span
                                    className={compnayData?.theme?.gradientText}
                                >
                                    Certified
                                </span>
                            </h2>
                            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto mt-6">
                                Recognized and certified by leading industry
                                authorities
                            </p>
                        </div>

                        {/* Certifications Grid */}
                        <div className="grid grid-cols-1 gap-12 lg:gap-16">
                            {compnayData?.aboutSection?.certifications.map(
                                (cert, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 150}
                                    >
                                        {/* LEFT IMAGE */}
                                        <div className="w-full lg:w-1/2 flex justify-center">
                                            <img
                                                src={
                                                    compnayData?.bgimg4 ||
                                                    cert.certificateImage
                                                }
                                                alt={cert.title}
                                                // className="w-full max-w-md rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 object-contain"
                                                className="w-full max-w-md aspect-[3/3] object-cover"
                                            />
                                        </div>

                                        {/* RIGHT CONTENT */}
                                        <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                                {cert.title}
                                            </h3>

                                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                                                {cert.description}
                                            </p>

                                            {cert.link && (
                                                <a
                                                    href={cert.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-red-600 font-semibold text-lg hover:text-red-700 transition-colors group"
                                                >
                                                    <span>
                                                        Verify Authorization
                                                    </span>
                                                    <svg
                                                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default About;
