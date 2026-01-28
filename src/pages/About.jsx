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
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="relative w-full font-[Be_Vietnam_Pro] pt-20 overflow-hidden">
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* LEFT SIDE - Content */}
                <div
                    className={`${compnayData?.theme?.bg} ${compnayData?.theme?.text} flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16 order-2 lg:order-1`}
                    data-aos="fade-up"
                >
                    <div className="max-w-2xl w-full space-y-6 lg:space-y-8 text-center lg:text-left">
                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold uppercase">
                            About{" "}
                            <span
                                className={`${compnayData?.theme?.gradientText}`}
                            >
                                Us
                            </span>
                        </h1>

                        {/* Content */}
                        <div className="space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed">
                            <p>
                                <span
                                    className={`font-bold ${compnayData?.theme?.gradientText} drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.25)]`}
                                >
                                    {compnayData?.name}
                                </span>{" "}
                                {compnayData?.aboutContent1}
                            </p>

                            <p>{compnayData?.aboutContent2}</p>

                            <p>
                                As a{" "}
                                <a
                                    href="https://gautamsolar.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-red-600 hover:underline transition-all"
                                >
                                    Gautam Solar Tec Pro Certified Dealer,
                                </a>
                                {compnayData?.aboutContent3}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="relative  sm:h-[80vh] lg:h-screen overflow-hidden order-1 lg:order-2"
                    data-aos="zoom-out"
                >
                    <img
                        src={compnayData?.bgimg3}
                        alt="Solar Panel"
                        className=" inset-0 w-full h-full object-cover"
                    />

                    {/* Logo - Centered on Image */}
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        data-aos="fade-in"
                    >
                        <div
                            className={`rounded-full overflow-hidden  ${compnayData?.theme?.imagebgcolor} p-4 sm:p-6 lg:p-8 shadow-2xl`}
                        >
                            <img
                                src={compnayData?.logo}
                                alt={`${compnayData?.name} Logo`}
                                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
