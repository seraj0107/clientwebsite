import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import companyThemes from "../../config/companyThemes.json";

const Section2 = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    const company = companyThemes?.suryadoot;
    const servicesData = company?.servicesSection;
    const faqSection = company?.faqSection;
    const process = [
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
    ];

    return (
        <section
            className={`font-[Be_Vietnam_Pro] px-4 sm:px-8 py-14 space-y-20 ${companyThemes?.suryadoot?.theme?.bg}`}
        >
            {/* Who We Are Section - Grid Layout */}
            <div
                className={`${companyThemes?.suryadoot?.theme?.bg} backdrop-blur-lg border border-gray-700 rounded-3xl shadow-xl p-8 md:p-12`}
                data-aos="fade-up"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* LEFT SIDE - Image */}
                    <div className="order-1">
                        <img
                            // src="/solarphot1.jpg"
                            src={companyThemes?.suryadoot?.bgimg2}
                            alt="Solar"
                            className="rounded-2xl shadow-xl w-full"
                            loading="lazy"
                        />
                    </div>

                    {/* RIGHT SIDE - Content */}
                    <div className="space-y-6 order-2">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-500">
                            Who{" "}
                            <span
                                className={`${companyThemes?.suryadoot?.theme?.gradientText}`}
                            >
                                We Are
                            </span>
                        </h1>
                        <p
                            className={`${companyThemes?.suryadoot?.theme?.text} text-base md:text-lg leading-relaxed`}
                        >
                            <span
                                className={`${companyThemes?.suryadoot?.theme?.gradientText} font-semibold`}
                            >
                                {companyThemes?.suryadoot?.name}
                            </span>{" "}
                            offers complete solar energy solutions through
                            expert Engineering, Procurement, and Construction
                            (EPC) services. We deliver efficient, customized
                            systems designed to reduce energy costs and support
                            a sustainable future.
                        </p>
                        <p
                            className={`${companyThemes?.suryadoot?.theme?.text} text-base md:text-lg leading-relaxed`}
                        >
                            In partnership with{" "}
                            <a
                                href="https://gautamsolar.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="font-bold text-red-600 hover:underline">
                                    Gautam Solar
                                </span>
                            </a>
                            , we use globally certified solar panels that ensure
                            long-lasting performance, reliability, and trusted
                            results for every installation.
                        </p>
                        <p
                            className={`${companyThemes?.suryadoot?.theme?.text} text-base md:text-lg leading-relaxed`}
                        >
                            With a proven track record across residential,
                            commercial, and industrial sectors, we bring
                            innovation, quality, and sustainability to every
                            project we undertake.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div
                className={`${companyThemes?.suryadoot?.theme?.bg} border border-gray-600 rounded-3xl shadow-xl p-8 md:p-12`}
                data-aos="fade-up"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-500">
                    Why{" "}
                    <span
                        className={`${companyThemes?.suryadoot?.theme?.gradientText}`}
                    >
                        Choose Us?
                    </span>
                </h1>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {companyThemes?.suryadoot?.whychoose.map(
                        (feature, index) => (
                            <div
                                key={index}
                                className="border rounded-2xl border-gray-100 p-6 shadow-md hover:shadow-xl transition-all hover:shadow-gray-500 duration-200 hover:-translate-y-2"
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                            >
                                <div className="text-2xl mb-4">
                                    {feature.icon}
                                </div>
                                <h2
                                    className={`text-lg font-semibold ${companyThemes?.suryadoot?.theme?.primary} mb-2`}
                                >
                                    {feature.title}
                                </h2>
                                <p
                                    className={`text-sm ${companyThemes?.suryadoot?.theme?.text}`}
                                >
                                    {feature.description}
                                </p>
                            </div>
                        ),
                    )}
                </div>
            </div>

            {/* Our Services Section */}
            <div className="space-y-10" data-aos="fade-up">
                <h1 className="text-4xl font-bold text-center text-gray-500">
                    {servicesData?.heading.split(" ")[0]}{" "}
                    <span className={company.theme.gradientText}>
                        {servicesData?.heading.split(" ").slice(1).join(" ")}
                    </span>
                </h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {servicesData?.services.map((service, index) => (
                        <div
                            key={index}
                            className={`${company.theme.bg} border rounded-3xl p-8 shadow-lg`}
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                        >
                            <h2
                                className={`text-xl font-bold ${company.theme.primary} mb-4`}
                            >
                                {service.title}
                            </h2>

                            <p className={`${company.theme.text} mb-4`}>
                                {service.description}
                            </p>

                            {service.systemSizes && (
                                <p className="text-sm font-semibold mb-3">
                                    System Sizes:{" "}
                                    {service.systemSizes.join(", ")}
                                </p>
                            )}

                            <ul className="space-y-2">
                                {service.points.map((point, idx) => (
                                    <li
                                        key={idx}
                                        className="flex gap-2 text-sm"
                                    >
                                        <span className={company.theme.primary}>
                                            ✓
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <section
                className="max-w-5xl mx-auto space-y-10"
                data-aos="fade-up"
            >
                {/* FAQ Heading */}
                <div className="text-center">
                    <h2
                        className={`${companyThemes?.suryadoot?.theme?.gradientText} text-2xl md:text-4xl font-bold`}
                    >
                        {faqSection?.heading}
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-gray-500">
                        Common questions about solar installation, subsidy, and
                        process
                    </p>
                </div>

                {/* FAQ Cards (THIS IS WHERE YOUR CODE GOES) */}
                <div className="space-y-6">
                    {faqSection?.items.map((faq, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 120}
                            className="rounded-3xl border border-gray-300 bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                {faq.q}
                            </h3>

                            <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Process Section */}
            <div
                className={`${companyThemes?.suryadoot?.theme?.bg} border border-gray-700 rounded-3xl shadow-xl p-8 md:p-12`}
                data-aos="fade-up"
            >
                <h1 className="text-4xl md:text-3xl font-bold text-center mb-12 text-gray-500">
                    Our{" "}
                    <span
                        className={`${companyThemes?.suryadoot?.theme?.gradientText}`}
                    >
                        Process
                    </span>
                </h1>
                <div className="space-y-8">
                    {process.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row gap-6 items-start"
                            data-aos="fade-right"
                            data-aos-delay={index * 100}
                        >
                            <div
                                className={`text-xl font-bold ${companyThemes?.suryadoot?.theme?.gradientText} opacity-50`}
                            >
                                {item.step}
                            </div>
                            <div className="flex-1">
                                <h3
                                    className={`text-lg md:text-xl font-bold ${companyThemes?.suryadoot?.theme?.primary} mb-2`}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className={`${companyThemes?.suryadoot?.theme?.text} text-base leading-relaxed`}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative Image */}
            <div
                className="rounded-3xl overflow-hidden shadow-lg"
                data-aos="zoom-in"
            >
                <img
                    src="/images/Group 438.png"
                    alt="Decorative"
                    className="w-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Experience Section */}
            <div
                className={`relative w-full py-20 ${companyThemes?.suryadoot?.theme?.bg} border border-gray-700 ${companyThemes?.suryadoot?.theme?.text} rounded-3xl overflow-hidden`}
                data-aos="fade-up"
            >
                <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-6">
                    <h1 className="text-2xl md:text-5xl font-bold">
                        Experience {companyThemes?.suryadoot?.name}
                    </h1>
                    <p className="text-md md:text-lg">
                        Choosing{" "}
                        <span
                            className={`${companyThemes?.suryadoot?.theme?.gradientText} font-semibold`}
                        >
                            {companyThemes?.suryadoot?.name}
                        </span>{" "}
                        means aligning with a forward-focused company dedicated
                        to sustainable innovation and client success—from
                        ideation to implementation.
                    </p>
                    <p className="text-md md:text-lg">
                        With us, sustainability is more than a promise—it's our
                        core principle and long-term vision. We're committed to
                        making clean energy accessible, affordable, and reliable
                        for everyone.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section2;
















