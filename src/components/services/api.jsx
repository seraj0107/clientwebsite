// const API_BASE_URL = import.meta.env.VITE_TECH_PRO;

// const saveToLocalStorage = (key, data) => {
//     try {
//         const timestamp = new Date().toISOString();
//         const backupData = {
//             data: data,
//             savedAt: timestamp,
//             synced: false,
//         };
//         localStorage.setItem(key, JSON.stringify(backupData));
//         console.log(`✓ Backup saved locally: ${key} at ${timestamp}`);
//         return true;
//     } catch (error) {
//         console.error("Local storage error:", error);
//         return false;
//     }
// };

// const markAsSynced = (key) => {
//     try {
//         const existing = localStorage.getItem(key);
//         if (existing) {
//             const parsed = JSON.parse(existing);
//             parsed.synced = true;
//             parsed.syncedAt = new Date().toISOString();
//             localStorage.setItem(key, JSON.stringify(parsed));
//         }
//     } catch (error) {
//         console.error("Error marking as synced:", error);
//     }
// };

// const getLocalBackup = (key) => {
//     try {
//         const data = localStorage.getItem(key);
//         return data ? JSON.parse(data) : null;
//     } catch (error) {
//         console.error("Error loading backup:", error);
//         return null;
//     }
// };

// // ========================================
// // INDIVIDUAL SECTION SAVE (Local Only)
// // ========================================

// export const saveSectionData = async (sectionName, sectionData, clientSlug) => {
//     const localStorageKey = `${sectionName}_${clientSlug}`;

//     // Save to local storage only
//     const saved = saveToLocalStorage(localStorageKey, sectionData);

//     if (saved) {
//         console.log(`✓ ${sectionName} saved locally`);
//         return {
//             success: true,
//             message: `${sectionName} saved locally. Use "Publish All" to sync to server.`,
//         };
//     } else {
//         throw new Error("Failed to save to local storage");
//     }
// };

// // ========================================
// // AGGREGATE ALL COMPONENT DATA
// // ========================================

// export const aggregateClientData = (clientSlug) => {
//     const sections = [
//         "navbar",
//         "section1",
//         "section2",
//         "about",
//         "contact", // Fixed spelling
//         "footer",
//     ];

//     const aggregatedData = {};

//     sections.forEach((section) => {
//         const backup = getLocalBackup(`${section}_${clientSlug}`);
//         if (backup && backup.data) {
//             aggregatedData[section] = backup.data;
//         }
//     });

//     return aggregatedData;
// };

// // ========================================
// // MAP TO API STRUCTURE
// // ========================================

// // export const mapToAPIStructure = (allComponentsData, clientSlug) => {
// //     if (!allComponentsData || Object.keys(allComponentsData).length === 0) {
// //         throw new Error("No component data provided");
// //     }

// //     if (!clientSlug || typeof clientSlug !== "string") {
// //         throw new Error("Valid clientSlug is required");
// //     }

// //     const { navbar, section1, section2, about, contact, footer } =
// //         allComponentsData;

// //     // Build sections array dynamically
// //     const sections = [];

// //     if (navbar && Object.keys(navbar).length > 0) {
// //         sections.push({
// //             name: "navbarSection",
// //             data: navbar,
// //         });
// //     }

// //     if (section1 && Object.keys(section1).length > 0) {
// //         sections.push({
// //             name: "heroSection",
// //             data: section1,
// //         });
// //     }

// //     if (section2 && Object.keys(section2).length > 0) {
// //         sections.push({
// //             name: "heroSection",
// //             data: section2,
// //         });
// //     }

// //     if (about && Object.keys(about).length > 0) {
// //         sections.push({
// //             name: "aboutSection",
// //             data: about,
// //         });
// //     }

// //     if (contact && Object.keys(contact).length > 0) {
// //         sections.push({
// //             name: "contectSection",
// //             data: contact,
// //         });
// //     }

// //     if (footer && Object.keys(footer).length > 0) {
// //         sections.push({
// //             name: "footerSection",
// //             data: footer,
// //         });
// //     }

// //     // If no sections, throw error
// //     if (sections.length === 0) {
// //         throw new Error("No valid section data found");
// //     }

// //     return {
// //         name: navbar?.companyName || "Untitled Client",
// //         slug: clientSlug,
// //         logo: {
// //             url: navbar?.logo || "",
// //             alt: `${navbar?.companyName || "Company"} logo`,
// //         },
// //         contact: {
// //             email: navbar?.email || footer?.email || "",
// //             phone: navbar?.phone || footer?.phone || "",
// //             location: footer?.address || "",
// //             socialLinks: footer?.socialLinks || [],
// //         },
// //         pages: [
// //             {
// //                 pageTitle: "Home",
// //                 pageSlug: "home",
// //                 section: sections,
// //             },
// //         ],
// //         style: {
// //             primary: navbar?.hoverBgColor || "text-orange-500",
// //             secondary: navbar?.hoverTextColor || "text-yellow-600",
// //             gradientText:
// //                 "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-600",
// //             bg: navbar?.navbarBgColor || "bg-sky-50",
// //             text: navbar?.textColor || "text-black",
// //             overlay: "bg-black/50",
// //             logoBg: "bg-black",
// //             navbarbgcolor: navbar?.navbarBgColor || "bg-sky-50",
// //             navbarcloseicon: "text-gray-800",
// //             navmenubgcolor: "bg-white",
// //         },
// //     };
// // };

// // In your api.js - Add these mappings for the new sections

// // Update mapToAPIStructure function to handle about and contact sections:
// export const mapToAPIStructure = (allComponentsData, clientSlug) => {
//     if (!allComponentsData || Object.keys(allComponentsData).length === 0) {
//         throw new Error("No component data provided");
//     }

//     if (!clientSlug || typeof clientSlug !== "string") {
//         throw new Error("Valid clientSlug is required");
//     }

//     const {
//         navbar = {},
//         section1 = {},
//         section2 = {},
//         about = {},
//         contact = {},
//         footer = {},
//     } = allComponentsData;

//     // Build sections array dynamically
//     const sections = [];

//     if (navbar && Object.keys(navbar).length > 0) {
//         sections.push({
//             name: "navbarSection",
//             data: navbar,
//         });
//     }

//     if (section1 && Object.keys(section1).length > 0) {
//         sections.push({
//             name: "heroSection",
//             data: section1,
//         });
//     }

//     if (section2 && Object.keys(section2).length > 0) {
//         sections.push({
//             name: "featuresSection",
//             data: section2,
//         });
//     }

//     if (about && Object.keys(about).length > 0) {
//         sections.push({
//             name: "aboutSection",
//             data: {
//                 // Map your about form structure to API expected structure
//                 companyName: about.companyName,
//                 logo: about.logo,
//                 heroImage: about.bgimg3,
//                 certificateImage: about.bgimg4,
//                 backgroundColor: about.backgroundColor,
//                 textColor: about.textColor,
//                 gradientFrom: about.gradientFrom,
//                 gradientTo: about.gradientTo,
//                 paragraphs: about.aboutSection?.paragraphs || [],
//                 certifications: about.aboutSection?.certifications || [],
//             },
//         });
//     }

//     if (contact && Object.keys(contact).length > 0) {
//         sections.push({
//             name: "contactSection",
//             data: {
//                 // Map your contact form structure to API expected structure
//                 companyName: contact.companyName,
//                 logo: contact.logo,
//                 backgroundImage: contact.bgimg4,
//                 backgroundColor: contact.backgroundColor,
//                 textColor: contact.textColor,
//                 primaryColor: contact.primaryColor,
//                 gradientFrom: contact.gradientFrom,
//                 gradientTo: contact.gradientTo,
//                 imageBgColor: contact.imageBgColor,
//                 email: contact.email,
//                 phone: contact.phone,
//                 location: contact.location,
//                 heading: contact.contactSection?.heading || "Contact Us",
//                 subheading: contact.contactSection?.subheading || "",
//                 ctaHeading: contact.contactSection?.ctaHeading || "",
//                 ctaDescription: contact.contactSection?.ctaDescription || "",
//                 ctaButtonText: contact.contactSection?.ctaButtonText || "",
//             },
//         });
//     }

//     if (footer && Object.keys(footer).length > 0) {
//         sections.push({
//             name: "footerSection",
//             data: footer,
//         });
//     }

//     // If no sections, throw error
//     if (sections.length === 0) {
//         throw new Error("No valid section data found");
//     }

//     return {
//         name:
//             navbar?.companyName ||
//             about?.companyName ||
//             contact?.companyName ||
//             "Untitled Client",
//         slug: clientSlug,
//         logo: {
//             url: navbar?.logo || about?.logo || contact?.logo || "",
//             alt: `${navbar?.companyName || about?.companyName || contact?.companyName || "Company"} logo`,
//         },
//         contact: {
//             email: contact?.email || navbar?.email || footer?.email || "",
//             phone: contact?.phone || navbar?.phone || footer?.phone || "",
//             location: contact?.location || footer?.address || "",
//             socialLinks: footer?.socialLinks || [],
//         },
//         pages: [
//             {
//                 pageTitle: "Home",
//                 pageSlug: "home",
//                 section: sections,
//             },
//         ],
//         style: {
//             primary:
//                 contact?.primaryColor ||
//                 navbar?.hoverBgColor ||
//                 section1?.primaryColor ||
//                 "text-orange-500",
//             secondary:
//                 navbar?.hoverTextColor ||
//                 section1?.secondaryColor ||
//                 "text-yellow-600",
//             gradientText:
//                 "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-600",
//             bg:
//                 navbar?.navbarBgColor ||
//                 section1?.backgroundColor ||
//                 "bg-sky-50",
//             text: navbar?.textColor || section1?.textColor || "text-black",
//             overlay: "bg-black/50",
//             logoBg: "bg-black",
//             navbarbgcolor: navbar?.navbarBgColor || "bg-sky-50",
//             navbarcloseicon: "text-gray-800",
//             navmenubgcolor: "bg-white",
//         },
//     };
// };

// export const publishAllSections = async (clientSlug) => {
//     try {
//         if (!clientSlug) {
//             throw new Error("Client slug is required");
//         }

//         // Step 1: Aggregate all component data
//         const allData = aggregateClientData(clientSlug);

//         // Check if we have any data
//         if (Object.keys(allData).length === 0) {
//             throw new Error(
//                 "No data to publish. Please save at least one section first.",
//             );
//         }

//         // Step 2: Map to API structure
//         const apiPayload = mapToAPIStructure(allData, clientSlug);

//         console.log("Publishing to server:", apiPayload);

//         // Step 3: Send to backend
//         const response = await fetch(`${API_BASE_URL}/client/create`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(apiPayload),
//         });

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(
//                 errorData.message ||
//                     `API call failed with status ${response.status}`,
//             );
//         }

//         const result = await response.json();

//         // Step 4: Mark all sections as synced
//         const sections = [
//             "navbar",
//             "section1",
//             "section2",
//             "about",
//             "contact",
//             "footer",
//         ];
//         sections.forEach((section) => {
//             const key = `${section}_${clientSlug}`;
//             if (getLocalBackup(key)) {
//                 markAsSynced(key);
//             }
//         });

//         console.log("✓ All data published successfully");

//         return {
//             success: true,
//             data: result,
//             message: "All sections published successfully!",
//         };
//     } catch (error) {
//         console.error("Publish failed:", error);
//         return {
//             success: false,
//             message: error.message || "Failed to publish data",
//             error: error.toString(),
//         };
//     }
// };

// // ========================================
// // GET SYNC STATUS
// // ========================================

// export const getSyncStatus = (clientSlug) => {
//     if (!clientSlug) {
//         return {
//             sections: {},
//             totalSections: 0,
//             syncedSections: 0,
//             allSynced: false,
//             readyToPublish: false,
//             error: "Client slug is required",
//         };
//     }

//     const sections = [
//         "navbar",
//         "section1",
//         "section2",
//         "about",
//         "contact",
//         "footer",
//     ];
//     const status = {};
//     let totalSections = 0;
//     let syncedSections = 0;

//     sections.forEach((section) => {
//         const backup = getLocalBackup(`${section}_${clientSlug}`);
//         if (backup && backup.data) {
//             totalSections++;
//             if (backup.synced) {
//                 syncedSections++;
//             }
//             status[section] = {
//                 exists: true,
//                 synced: backup.synced || false,
//                 savedAt: backup.savedAt,
//                 syncedAt: backup.syncedAt || null,
//             };
//         } else {
//             status[section] = {
//                 exists: false,
//                 synced: false,
//             };
//         }
//     });

//     return {
//         sections: status,
//         totalSections,
//         syncedSections,
//         allSynced: totalSections > 0 && totalSections === syncedSections,
//         readyToPublish: totalSections > 0,
//     };
// };

// // ========================================
// // LEGACY FUNCTIONS (Keep for backward compatibility)
// // ========================================

// // Main API Call Function with Backup
// const apiCallWithBackup = async (
//     endpoint,
//     data,
//     localStorageKey,
//     clientSlug,
// ) => {
//     if (!clientSlug) {
//         throw new Error("Client slug is required");
//     }

//     // Step 1: Save to local storage as backup
//     saveToLocalStorage(localStorageKey, data);

//     try {
//         // Step 2: Send to backend
//         const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(
//                 errorData.message ||
//                     `API call failed with status ${response.status}`,
//             );
//         }

//         const result = await response.json();

//         // Step 3: Mark as synced if successful
//         markAsSynced(localStorageKey);
//         console.log("✓ Data synced to backend successfully");

//         return result;
//     } catch (error) {
//         console.error("Backend save failed, but backup is safe locally");
//         throw error;
//     }
// };

// // Navbar API
// export const saveNavbarConfig = async (navbarData, clientSlug) => {
//     if (!clientSlug) {
//         throw new Error("Client slug is required");
//     }

//     const payload = {
//         clientSlug: clientSlug,
//         pageSlug: "home",
//         section: {
//             name: "navbarSection",
//             data: navbarData,
//         },
//     };
//     return await apiCallWithBackup(
//         "/client/section/update",
//         payload,
//         `navbar_${clientSlug}`,
//         clientSlug,
//     );
// };

// // Footer API
// export const saveFooterConfig = async (footerData, clientSlug) => {
//     if (!clientSlug) {
//         throw new Error("Client slug is required");
//     }

//     const payload = {
//         clientSlug: clientSlug,
//         pageSlug: "home",
//         section: {
//             name: "footerSection",
//             data: footerData,
//         },
//     };
//     return await apiCallWithBackup(
//         "/client/section/update",
//         payload,
//         `footer_${clientSlug}`,
//         clientSlug,
//     );
// };

// // Section 1 API
// export const saveSection1Config = async (section1Data, clientSlug) => {
//     if (!clientSlug) {
//         throw new Error("Client slug is required");
//     }

//     const payload = {
//         clientSlug: clientSlug,
//         pageSlug: "home",
//         section: {
//             name: "heroSection",
//             data: section1Data,
//         },
//     };
//     return await apiCallWithBackup(
//         "/client/section/update",
//         payload,
//         `section1_${clientSlug}`,
//         clientSlug,
//     );
// };

// // Section 2 API
// export const saveSection2Config = async (section2Data, clientSlug) => {
//     if (!clientSlug) {
//         throw new Error("Client slug is required");
//     }

//     const payload = {
//         clientSlug: clientSlug,
//         pageSlug: "home",
//         section: {
//             name: "aboutSection",
//             data: section2Data,
//         },
//     };
//     return await apiCallWithBackup(
//         "/client/section/update",
//         payload,
//         `section2_${clientSlug}`,
//         clientSlug,
//     );
// };

// // ========================================
// // UTILITY FUNCTIONS
// // ========================================

// // Utility: Get backup status
// export const getBackupStatus = (clientSlug) => {
//     if (!clientSlug) {
//         return {
//             error: "Client slug is required",
//         };
//     }

//     const navbar = getLocalBackup(`navbar_${clientSlug}`);
//     const section1 = getLocalBackup(`section1_${clientSlug}`);
//     const section2 = getLocalBackup(`section2_${clientSlug}`);
//     const about = getLocalBackup(`about_${clientSlug}`);
//     const contact = getLocalBackup(`contact${clientSlug}`);
//     const footer = getLocalBackup(`footer_${clientSlug}`);

//     return {
//         navbar: navbar
//             ? { synced: navbar.synced, savedAt: navbar.savedAt, exists: true }
//             : { exists: false },
//         footer: footer
//             ? { synced: footer.synced, savedAt: footer.savedAt, exists: true }
//             : { exists: false },
//         section1: section1
//             ? {
//                   synced: section1.synced,
//                   savedAt: section1.savedAt,
//                   exists: true,
//               }
//             : { exists: false },
//         section2: section2
//             ? {
//                   synced: section2.synced,
//                   savedAt: section2.savedAt,
//                   exists: true,
//               }
//             : { exists: false },
//         about: about
//             ? { synced: about.synced, savedAt: about.savedAt, exists: true }
//             : { exists: false },
//         contact: contact
//             ? { synced: contact.synced, savedAt: contact.savedAt, exists: true }
//             : { exists: false },
//     };
// };

// // Utility: Load backup data
// export const loadBackupData = (clientSlug, section) => {
//     if (!clientSlug || !section) {
//         console.error("Client slug and section name are required");
//         return null;
//     }

//     const key = `${section}_${clientSlug}`;
//     const backup = getLocalBackup(key);
//     return backup ? backup.data : null;
// };

// // Utility: Load section data (alias for consistency)
// export const loadSectionData = loadBackupData;

// // Utility: Clear all backups
// export const clearAllBackups = (clientSlug) => {
//     if (!clientSlug) {
//         console.error("Client slug is required to clear backups");
//         return false;
//     }

//     const sections = [
//         "navbar",
//         "footer",
//         "section1",
//         "section2",
//         "about",
//         "contact",
//     ];
//     sections.forEach((section) => {
//         localStorage.removeItem(`${section}_${clientSlug}`);
//     });
//     console.log("All backups cleared for client:", clientSlug);
//     return true;
// };

// // Utility: Clear all data (alias)
// export const clearAllData = clearAllBackups;

// // New utility: Check if any section exists
// export const hasAnySectionData = (clientSlug) => {
//     if (!clientSlug) return false;

//     const sections = [
//         "navbar",
//         "section1",
//         "section2",
//         "about",
//         "contact",
//         "footer",
//     ];

//     return sections.some((section) => {
//         const backup = getLocalBackup(`${section}_${clientSlug}`);
//         return backup && backup.data && Object.keys(backup.data).length > 0;
//     });
// };

// services/api.js - SIMPLIFIED VERSION
const API_BASE_URL = import.meta.env.VITE_TECH_PRO;

/**
 * Publish all sections to backend
 * @param {string} clientSlug - Client identifier
 * @param {object} allData - All section data { navbar: {...}, section1: {...}, etc. }
 */
export const publishAllSections = async (clientSlug, allData) => {
    try {
        // Transform data into backend format
        const sections = Object.entries(allData).map(([key, data]) => ({
            name: getSectionName(key),
            data: data,
        }));

        const payload = {
            clientSlug: clientSlug,
            pageSlug: "home",
            sections: sections,
        };

        console.log("📤 Publishing to backend:", payload);

        const response = await fetch(`${API_BASE_URL}/client/pages/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message ||
                    `API call failed with status ${response.status}`,
            );
        }

        const result = await response.json();
        console.log("✅ Published successfully:", result);

        return {
            success: true,
            message: "All sections published successfully!",
            data: result,
        };
    } catch (error) {
        console.error(" Publish failed:", error);
        return {
            success: false,
            message: error.message || "Failed to publish",
        };
    }
};

// Helper to map section keys to backend section names
const getSectionName = (key) => {
    const mapping = {
        navbar: "navbarSection",
        footer: "footerSection",
        section1: "heroSection",
        section2: "featuresSection",
        about: "aboutSection",
        contact: "contactSection",
    };
    return mapping[key] || key;
};
