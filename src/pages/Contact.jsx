
import { useEffect } from "react";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import companyThemes from "../config/companyThemes.json";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000 });
    }, []);

    const phone = companyThemes?.vkenergy?.phone;
    const email = companyThemes?.vkenergy?.email;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const phoneLink = phone ? `tel:${phone}` : "";
    const emailLink = email
        ? isMobile
            ? `mailto:${email}`
            : `https://mail.google.com/mail/?view=cm&to=${email}`
        : "";

    const contactInfo = [
        {
            icon: <FaPhoneAlt size={22} />,
            title: "Phone",
            content: companyThemes?.vkenergy?.phone,
            link: phoneLink,
        },
        {
            icon: <FaEnvelope size={22} />,
            title: "Email",
            content: companyThemes?.vkenergy?.email,
            link: emailLink,
        },
    ];

    return (
        <div className="relative w-full font-[Be_Vietnam_Pro] pt-20 overflow-hidden">
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* LEFT SIDE - Contact Information */}
                <div
                    className={`${companyThemes?.vkenergy?.theme?.bg} ${companyThemes?.vkenergy?.theme?.text} flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16 order-2 lg:order-1`}
                    data-aos="fade-up"
                >
                    <div className="max-w-2xl w-full space-y-8">
                        {/* Heading */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-4xl font-bold uppercase mb-4">
                                Contact{" "}
                                <span
                                    className={`${companyThemes?.vkenergy?.theme?.gradientText}`}
                                >
                                    Us
                                </span>
                            </h1>
                            <p className="text-base lg:text-lg text-gray-600">
                                Get in touch with us for all your solar energy
                                needs. We're here to help!
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                            {contactInfo.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div
                                        className={`${companyThemes?.vkenergy?.theme?.primary} mb-3`}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 className="font-semibold text-sm text-gray-500 mb-2">
                                        {item.title}
                                    </h3>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            className={`text-base lg:text-lg ${companyThemes?.vkenergy?.theme?.text} hover:${companyThemes?.vkenergy?.theme?.primary} transition-all break-all`}
                                        >
                                            {item.content}
                                        </a>
                                    ) : (
                                        <p className="text-base lg:text-lg">
                                            {item.content}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-6 mt-8">
                            <h3
                                className={`text-xl font-bold ${companyThemes?.vkenergy?.theme?.gradientText} mb-2`}
                            >
                                Ready to Go Solar?
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Contact us today for a free consultation and
                                discover how solar energy can transform your
                                property.
                            </p>
                            <a
                                href={`tel:${companyThemes?.vkenergy?.phone}`}
                                className="inline-block bg-gradient-to-r from-orange-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                Call Us Now
                            </a>
                        </div>

                        {/* Social Media or Additional Info */}
                        <div className="text-center lg:text-left pt-4">
                            <p className="text-sm text-gray-600">
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
                    </div>
                </div>

                {/* RIGHT SIDE - Image with Logo Overlay */}
                <div
                    className="relative h-[60vh] sm:h-[70vh] lg:h-screen overflow-hidden order-1 lg:order-2"
                    data-aos="zoom-out"
                >
                    {/* Background Image */}
                    <img
                        src="/images/solar.avif"
                        alt="Solar Panel"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div
                        className={`absolute inset-0 ${companyThemes?.vkenergy?.theme?.overlay}`}
                    ></div>

                    {/* Logo - Centered on Image */}
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-aos="fade-in"
                    >
                        <div className="rounded-full overflow-hidden bg-white p-4 sm:p-6 lg:p-8 shadow-2xl">
                            <img
                                src={companyThemes?.vkenergy?.logo}
                                alt={`${companyThemes?.vkenergy?.name} Logo`}
                                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
