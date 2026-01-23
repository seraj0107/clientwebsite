
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import companyThemes from "../config/companyThemes.json";

const About = () => {
   
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
                    className={`${companyThemes?.ArthTechSolution?.theme?.bg} ${companyThemes?.ArthTechSolution?.theme?.text} flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16 order-2 lg:order-1`}
                    data-aos="fade-up"
                >
                    <div className="max-w-2xl w-full space-y-6 lg:space-y-8 text-center lg:text-left">
                        
                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold uppercase">
                            About{" "}
                            <span className={`${companyThemes?.ArthTechSolution?.theme?.gradientText}`}>
                                Us
                            </span>
                        </h1>

                        {/* Content */}
                        <div className="space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed">
                            <p>
                                <span
                                    className={`font-bold ${companyThemes?.ArthTechSolution?.theme?.gradientText} drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.25)]`}
                                >
                                    {companyThemes?.ArthTechSolution?.name}
                                </span>{" "}
                                is redefining how India goes solar. Driven by
                                sustainability and innovation, we offer complete
                                solar solutions—from expert consultation to flawless
                                installation and reliable support.
                            </p>

                            <p>
                                In partnership with{" "}
                                <a 
                                    href="https://gautamsolar.com/" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-red-600 hover:underline transition-all"
                                >
                                    Gautam Solar
                                </a>
                                , we deliver high-efficiency, long-lasting systems
                                tailored for every energy need.
                            </p>

                            <p>
                                From rooftops to large-scale installations, we are here to light the way
                                forward—cleanly and responsibly. Our commitment to quality and customer satisfaction
                                sets us apart in the renewable energy sector.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Image with Logo Overlay */}
                <div 
                    className="relative  sm:h-[80vh] lg:h-screen overflow-hidden order-1 lg:order-2" 
                    data-aos="zoom-out"
                >
                    {/* Background Image */}
                    <img
                        // src="/images/solar.avif"
                        src= {companyThemes?.ArthTechSolution?.bgimg3}
                        alt="Solar Panel"
                        className=" inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    {/* <div className={`absolute inset-0 ${companyThemes?.ArthTechSolution?.theme?.overlay}`}></div> */}
                    
                    {/* Logo - Centered on Image */}
                    <div className="absolute inset-0 flex items-center justify-center" data-aos="fade-in">
                        <div className={`rounded-full overflow-hidden  ${companyThemes?.ArthTechSolution?.theme?.imagebgcolor} p-4 sm:p-6 lg:p-8 shadow-2xl`}>
                            <img
                                src={companyThemes?.ArthTechSolution?.logo}
                                alt={`${companyThemes?.ArthTechSolution?.name} Logo`}
                                // className="w-32 h-32 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain rounded-full"
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
