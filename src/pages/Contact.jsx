import { useEffect } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import companyThemes from "../config/companyThemes.json";
import { useParams } from "react-router-dom";

const Contact = () => {
    const { company } = useParams();
    const companyData = companyThemes[company];

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000 });
    }, []);

    const phone = companyData?.phone;
    const email = companyData?.email;
    const address = companyData?.location;

    // Google Maps link
    const mapLink = address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              address,
          )}`
        : "";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const phoneLink = phone ? `tel:${phone}` : "";
    const emailLink = email
        ? isMobile
            ? `mailto:${email}`
            : `https://mail.google.com/mail/?view=cm&to=${email}`
        : "";

    const contactInfo = [
        phone && {
            icon: <FaPhoneAlt size={22} />,
            title: "Phone",
            content: phone,
            link: phoneLink,
        },
        email && {
            icon: <FaEnvelope size={22} />,
            title: "Email",
            content: email,
            link: emailLink,
        },
        address && {
            icon: <FaMapMarkerAlt size={22} />,
            title: "Location",
            content: address,
            link: mapLink,
        },
    ].filter(Boolean); // removes empty items

    return (
        <div className="relative w-full font-[Be_Vietnam_Pro] pt-20 overflow-hidden">
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* LEFT SIDE - Contact Information */}
                <div
                    className={`${companyData?.theme?.bg} ${companyData?.theme?.text} flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16 order-2 lg:order-1`}
                    data-aos="fade-up"
                >
                    <div className="max-w-2xl w-full space-y-8">
                        {/* Heading */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-4xl font-bold uppercase mb-4">
                                Contact{" "}
                                <span
                                    className={`${companyData?.theme?.gradientText}`}
                                >
                                    Us
                                </span>
                            </h1>
                            <p className="text-base lg:text-lg text-gray-500">
                                Get in touch with us for all your solar energy
                                needs. We're here to help!
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                            {contactInfo.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${companyData?.theme?.bg} 
                                    border border-gray-200 rounded-xl p-5 shadow-md 
                                    hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div
                                        className={`${companyData?.theme?.primary} mb-3`}
                                    >
                                        {item.icon}
                                    </div>

                                    <h3 className="font-semibold text-sm text-gray-500 mb-2">
                                        {item.title}
                                    </h3>

                                    <a
                                        href={item.link}
                                        className={`text-base lg:text-lg 
                                        ${companyData?.theme?.text}
                                        hover:${companyData?.theme?.primary}
                                        transition-all break-all`}
                                    >
                                        {item.content}
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div
                            className={`${companyData?.theme?.bg} from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-6 mt-8`}
                        >
                            <h3
                                className={`text-xl font-bold ${companyData?.theme?.gradientText} mb-2`}
                            >
                                Ready to Go Solar?
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Contact us today for a free consultation and
                                discover how solar energy can transform your
                                property.
                            </p>
                            <a
                                href={`tel:${companyData?.phone}`}
                                className="inline-block bg-gradient-to-r from-orange-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                Call Us Now
                            </a>
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
                        src={companyData?.bgimg4}
                        alt="Solar Panel"
                        className="w-full h-full object-cover"
                    />

                    {/* Logo - Centered on Image */}
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-aos="fade-in"
                    >
                        <div
                            className={`rounded-full overflow-hidden p-4 sm:p-6 lg:p-8 shadow-2xl ${
                                companyData?.theme?.imagebgcolor ||
                                "bg-white/10"
                            } backdrop-blur-sm`}
                        >
                            <img
                                src={companyData?.logo}
                                alt={`${companyData?.name} Logo`}
                                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
