// services/validation.js

// Navbar validation
export const validateNavbarData = (data) => {
    const errors = [];
    const warnings = [];
    
    if (!data.companyName || data.companyName.trim() === '') {
        errors.push('Company name is required');
    }
    
    if (!data.logo) {
        warnings.push('Company logo not uploaded');
    }
    
    if (!data.navLinks || data.navLinks.length === 0) {
        errors.push('At least one navigation link is required');
    } else {
        data.navLinks.forEach((link, index) => {
            if (!link.label || !link.path) {
                errors.push(`Navigation link ${index + 1} is incomplete`);
            }
        });
    }
    
    const isValid = errors.length === 0;
    const completionPercentage = calculateCompletion(data, 'navbar');
    
    return {
        isValid,
        errors,
        warnings,
        completionPercentage
    };
};

// Footer validation
export const validateFooterData = (data) => {
    const errors = [];
    const warnings = [];
    
    if (!data.companyName || data.companyName.trim() === '') {
        errors.push('Company name is required');
    }
    
    if (!data.logo) {
        warnings.push('Logo not uploaded');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Valid email is required');
    }
    
    if (!data.phone) {
        warnings.push('Phone number not provided');
    }
    
    if (!data.address) {
        warnings.push('Address not provided');
    }
    
    const isValid = errors.length === 0;
    const completionPercentage = calculateCompletion(data, 'footer');
    
    return {
        isValid,
        errors,
        warnings,
        completionPercentage
    };
};

// Section 1 validation
export const validateSection1Data = (data) => {
    const errors = [];
    const warnings = [];
    
    if (!data.companyName || data.companyName.trim() === '') {
        errors.push('Company name is required');
    }
    
    if (!data.logo) {
        warnings.push('Logo not uploaded');
    }
    
    if (!data.bgimg1) {
        errors.push('Background image 1 is required');
    }
    
    if (!data.sectioncontent1 || data.sectioncontent1.trim() === '') {
        errors.push('Section content 1 is required');
    }
    
    if (!data.sectioncontent2 || data.sectioncontent2.trim() === '') {
        errors.push('Section content 2 is required');
    }
    
    if (!data.email) {
        warnings.push('Email not provided');
    }
    
    if (!data.phone) {
        warnings.push('Phone not provided');
    }
    
    // Check how many background images are uploaded (out of 5)
    const bgImages = [data.bgimg1, data.bgimg2, data.bgimg3, data.bgimg4, data.bgimg5];
    const uploadedImages = bgImages.filter(img => img).length;
    if (uploadedImages < 3) {
        warnings.push(`Only ${uploadedImages}/5 background images uploaded`);
    }
    
    const isValid = errors.length === 0;
    const completionPercentage = calculateCompletion(data, 'section1');
    
    return {
        isValid,
        errors,
        warnings,
        completionPercentage
    };
};

// Section 2 validation
export const validateSection2Data = (data) => {
    const errors = [];
    const warnings = [];
    
    if (!data.companyName || data.companyName.trim() === '') {
        errors.push('Company name is required');
    }
    
    if (!data.bgimg2) {
        warnings.push('Who We Are image not uploaded');
    }
    
    if (!data.whoWeAreContent?.paragraph1) {
        errors.push('Who We Are paragraph 1 is required');
    }
    
    if (!data.whyChooseUs || data.whyChooseUs.length < 4) {
        warnings.push(`Only ${data.whyChooseUs?.length || 0}/4 "Why Choose Us" items added`);
    }
    
    if (!data.servicesSection?.services || data.servicesSection.services.length === 0) {
        errors.push('At least one service is required');
    }
    
    if (!data.faqSection?.items || data.faqSection.items.length < 3) {
        warnings.push('At least 3 FAQ/Process items recommended');
    }
    
    const isValid = errors.length === 0;
    const completionPercentage = calculateCompletion(data, 'section2');
    
    return {
        isValid,
        errors,
        warnings,
        completionPercentage
    };
};

// Helper: Email validation
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Helper: Calculate completion percentage
const calculateCompletion = (data, type) => {
    if (!data) return 0;
    
    let totalFields = 0;
    let filledFields = 0;
    
    switch(type) {
        case 'navbar':
            totalFields = 10; // companyName, logo, navbarBgColor, textColor, primaryColor, secondaryColor, navLinks(3), gautamLogo
            if (data.companyName) filledFields++;
            if (data.logo) filledFields++;
            if (data.navbarBgColor) filledFields++;
            if (data.textColor) filledFields++;
            if (data.primaryColor) filledFields++;
            if (data.secondaryColor) filledFields++;
            if (data.navLinks && data.navLinks.length >= 3) filledFields++;
            if (data.gautamLogoUrl) filledFields++;
            if (data.gautamSolarLink) filledFields++;
            if (data.showGautamLogo !== undefined) filledFields++;
            break;
            
        case 'footer':
            totalFields = 10;
            if (data.companyName) filledFields++;
            if (data.tagline) filledFields++;
            if (data.logo) filledFields++;
            if (data.email) filledFields++;
            if (data.phone) filledFields++;
            if (data.address) filledFields++;
            if (data.website) filledFields++;
            if (data.partnerName) filledFields++;
            if (data.partnerLink) filledFields++;
            if (data.footerContent?.description) filledFields++;
            break;
            
        case 'section1':
            totalFields = 12;
            if (data.companyName) filledFields++;
            if (data.logo) filledFields++;
            if (data.email) filledFields++;
            if (data.phone) filledFields++;
            if (data.location) filledFields++;
            if (data.bgimg1) filledFields++;
            if (data.bgimg2) filledFields++;
            if (data.bgimg3) filledFields++;
            if (data.sectioncontent1) filledFields++;
            if (data.sectioncontent2) filledFields++;
            if (data.backgroundColor) filledFields++;
            if (data.gautamSolarLink) filledFields++;
            break;
            
        case 'section2':
            totalFields = 8;
            if (data.companyName) filledFields++;
            if (data.bgimg2) filledFields++;
            if (data.whoWeAreContent?.paragraph1) filledFields++;
            if (data.whoWeAreContent?.paragraph2) filledFields++;
            if (data.whyChooseUs && data.whyChooseUs.length >= 4) filledFields++;
            if (data.servicesSection?.services && data.servicesSection.services.length >= 3) filledFields++;
            if (data.faqSection?.items && data.faqSection.items.length >= 3) filledFields++;
            if (data.experienceSection?.paragraph1) filledFields++;
            break;
    }
    
    return Math.round((filledFields / totalFields) * 100);
};

// Main validation function
export const validateAllSections = (navbarData, footerData, section1Data, section2Data) => {
    return {
        navbar: validateNavbarData(navbarData),
        footer: validateFooterData(footerData),
        section1: validateSection1Data(section1Data),
        section2: validateSection2Data(section2Data)
    };
};