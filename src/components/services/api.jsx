// const API_BASE_URL = import.meta.env.VITE_TECH_PRO;

// // Local Storage Helper Functions
// const saveToLocalStorage = (key, data) => {
//     try {
//         const timestamp = new Date().toISOString();
//         const backupData = {
//             data: data,
//             savedAt: timestamp,
//             synced: false
//         };
//         localStorage.setItem(key, JSON.stringify(backupData));
//         console.log(`✓ Backup saved locally: ${key} at ${timestamp}`);
//         return true;
//     } catch (error) {
//         console.error('Local storage error:', error);
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
//         console.error('Error marking as synced:', error);
//     }
// };

// const getLocalBackup = (key) => {
//     try {
//         const data = localStorage.getItem(key);
//         return data ? JSON.parse(data) : null;
//     } catch (error) {
//         console.error('Error loading backup:', error);
//         return null;
//     }
// };

// // Main API Call Function with Backup
// const apiCallWithBackup = async (endpoint, data, localStorageKey) => {
//     // Step 1: Save to local storage as backup
//     saveToLocalStorage(localStorageKey, data);

//     try {
//         // Step 2: Send to backend
//         const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add your API key if needed
//                 // 'Authorization': 'Bearer YOUR_API_KEY'
//             },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'API call failed');
//         }

//         const result = await response.json();

//         // Step 3: Mark as synced if successful
//         markAsSynced(localStorageKey);
//         console.log('✓ Data synced to backend successfully');

//         return result;

//     } catch (error) {
//         console.error('Backend save failed, but backup is safe locally');
//         throw error;
//     }
// };

// // Navbar API
// export const saveNavbarConfig = async (navbarData, clientSlug) => {
//     const payload = {
//         clientSlug: clientSlug,
//         pageSlug: "home",
//         section: {
//             name: "navbarSection",
//             data: navbarData
//         }
//     };
//     return await apiCallWithBackup(
//         '/client/section/update',
//         payload,
//         `navbar_${clientSlug}`
//     );
// };

// // Footer API
// export const saveFooterConfig = async (footerData, clientSlug) => {
//     const payload = {
//         clientSlug: clientSlug,
//         pageSlug: "home",
//         section: {
//             name: "footerSection",
//             data: footerData
//         }
//     };
//     return await apiCallWithBackup(
//         '/client/section/update',
//         payload,
//         `footer_${clientSlug}`
//     );
// };

// // Section 1 API
// export const saveSection1Config = async (section1Data, clientSlug) => {
//     const payload = {
//         clientSlug: clientSlug,
//         pageSlug: "home",
//         section: {
//             name: "heroSection",
//             data: section1Data
//         }
//     };
//     return await apiCallWithBackup(
//         '/client/section/update',
//         payload,
//         `section1_${clientSlug}`
//     );
// };

// // Section 2 API
// export const saveSection2Config = async (section2Data, clientSlug) => {
//     const payload = {
//         clientSlug: clientSlug,
//         pageSlug: "home",
//         section: {
//             name: "aboutSection",
//             data: section2Data
//         }
//     };
//     return await apiCallWithBackup(
//         '/client/section/update',
//         payload,
//         `section2_${clientSlug}`
//     );
// };

// // Utility: Get backup status
// export const getBackupStatus = (clientSlug) => {
//     const navbar = getLocalBackup(`navbar_${clientSlug}`);
//     const footer = getLocalBackup(`footer_${clientSlug}`);
//     const section1 = getLocalBackup(`section1_${clientSlug}`);
//     const section2 = getLocalBackup(`section2_${clientSlug}`);

//     return {
//         navbar: navbar ? { synced: navbar.synced, savedAt: navbar.savedAt } : null,
//         footer: footer ? { synced: footer.synced, savedAt: footer.savedAt } : null,
//         section1: section1 ? { synced: section1.synced, savedAt: section1.savedAt } : null,
//         section2: section2 ? { synced: section2.synced, savedAt: section2.savedAt } : null,
//     };
// };

// // Utility: Load backup data
// export const loadBackupData = (clientSlug, section) => {
//     const key = `${section}_${clientSlug}`;
//     const backup = getLocalBackup(key);
//     return backup ? backup.data : null;
// };

// // Utility: Clear all backups
// export const clearAllBackups = (clientSlug) => {
//     localStorage.removeItem(`navbar_${clientSlug}`);
//     localStorage.removeItem(`footer_${clientSlug}`);
//     localStorage.removeItem(`section1_${clientSlug}`);
//     localStorage.removeItem(`section2_${clientSlug}`);
//     console.log('All backups cleared');
// };

// services/api.js

const API_BASE_URL = import.meta.env.VITE_TECH_PRO;

// ========================================
// LOCAL STORAGE HELPER FUNCTIONS
// ========================================

const saveToLocalStorage = (key, data) => {
    try {
        const timestamp = new Date().toISOString();
        const backupData = {
            data: data,
            savedAt: timestamp,
            synced: false,
        };
        localStorage.setItem(key, JSON.stringify(backupData));
        console.log(`✓ Backup saved locally: ${key} at ${timestamp}`);
        return true;
    } catch (error) {
        console.error("Local storage error:", error);
        return false;
    }
};

const markAsSynced = (key) => {
    try {
        const existing = localStorage.getItem(key);
        if (existing) {
            const parsed = JSON.parse(existing);
            parsed.synced = true;
            parsed.syncedAt = new Date().toISOString();
            localStorage.setItem(key, JSON.stringify(parsed));
        }
    } catch (error) {
        console.error("Error marking as synced:", error);
    }
};

const getLocalBackup = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error loading backup:", error);
        return null;
    }
};

// ========================================
// INDIVIDUAL SECTION SAVE (Local Only)
// ========================================

export const saveSectionData = async (sectionName, sectionData, clientSlug) => {
    const localStorageKey = `${sectionName}_${clientSlug}`;

    // Save to local storage only
    const saved = saveToLocalStorage(localStorageKey, sectionData);

    if (saved) {
        console.log(`✓ ${sectionName} saved locally`);
        return {
            success: true,
            message: `${sectionName} saved locally. Use "Publish All" to sync to server.`,
        };
    } else {
        throw new Error("Failed to save to local storage");
    }
};

// ========================================
// AGGREGATE ALL COMPONENT DATA
// ========================================

export const aggregateClientData = (clientSlug) => {
    const sections = [
        "navbar",
        "footer",
        "section1",
        "section2",
        "section3",
        "section4",
        "section5",
        "section6",
    ];

    const aggregatedData = {};

    sections.forEach((section) => {
        const backup = getLocalBackup(`${section}_${clientSlug}`);
        if (backup && backup.data) {
            aggregatedData[section] = backup.data;
        }
    });

    return aggregatedData;
};

// ========================================
// MAP TO API STRUCTURE
// ========================================

export const mapToAPIStructure = (allComponentsData, clientSlug) => {
    const {
        navbar,
        footer,
        section1,
        section2,
        section3,
        section4,
        section5,
        section6,
    } = allComponentsData;

    // Build sections array dynamically
    const sections = [];

    if (navbar) {
        sections.push({
            name: "navbarSection",
            data: navbar,
        });
    }

    if (section1) {
        sections.push({
            name: "heroSection",
            data: section1,
        });
    }

    if (section2) {
        sections.push({
            name: "aboutSection",
            data: section2,
        });
    }

    if (section3) {
        sections.push({
            name: "servicesSection",
            data: section3,
        });
    }

    if (section4) {
        sections.push({
            name: "faqSection",
            data: section4,
        });
    }

    if (section5) {
        sections.push({
            name: "testimonialsSection",
            data: section5,
        });
    }

    if (section6) {
        sections.push({
            name: "portfolioSection",
            data: section6,
        });
    }

    if (footer) {
        sections.push({
            name: "footerSection",
            data: footer,
        });
    }

    return {
        name: navbar?.companyName || "",
        slug: clientSlug,
        logo: {
            url: navbar?.logo || "",
            alt: `${navbar?.companyName || "Company"} logo`,
        },
        contact: {
            email: navbar?.email || footer?.email || "",
            phone: navbar?.phone || footer?.phone || "",
            location: footer?.address || "",
            socialLinks: footer?.socialLinks || [],
        },
        pages: [
            {
                pageTitle: "Home",
                pageSlug: "home",
                section: sections,
            },
        ],
        style: {
            primary: navbar?.hoverBgColor || "text-orange-500",
            secondary: navbar?.hoverTextColor || "text-yellow-600",
            gradientText:
                "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-600",
            bg: navbar?.navbarBgColor || "bg-sky-50",
            text: navbar?.textColor || "text-black",
            overlay: "bg-black/50",
            logoBg: "bg-black",
            navbarbgcolor: navbar?.navbarBgColor || "bg-sky-50",
            navbarcloseicon: "text-gray-800",
            navmenubgcolor: "bg-white",
        },
    };
};

// ========================================
// PUBLISH ALL SECTIONS TO SERVER
// ========================================

export const publishAllSections = async (clientSlug) => {
    try {
        // Step 1: Aggregate all component data
        const allData = aggregateClientData(clientSlug);

        // Check if we have any data
        if (Object.keys(allData).length === 0) {
            throw new Error(
                "No data to publish. Please save at least one section first.",
            );
        }

        // Step 2: Map to API structure
        const apiPayload = mapToAPIStructure(allData, clientSlug);

        console.log("Publishing to server:", apiPayload);

        // Step 3: Send to backend
        const response = await fetch(`${API_BASE_URL}/client/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiPayload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "API call failed");
        }

        const result = await response.json();

        // Step 4: Mark all sections as synced
        const sections = [
            "navbar",
            "footer",
            "section1",
            "section2",
            "section3",
            "section4",
            "section5",
            "section6",
        ];
        sections.forEach((section) => {
            const key = `${section}_${clientSlug}`;
            if (getLocalBackup(key)) {
                markAsSynced(key);
            }
        });

        console.log("✓ All data published successfully");

        return {
            success: true,
            data: result,
            message: "All sections published successfully!",
        };
    } catch (error) {
        console.error("Publish failed:", error);
        return {
            success: false,
            message: error.message || "Failed to publish data",
            error: error,
        };
    }
};

// ========================================
// GET SYNC STATUS
// ========================================

export const getSyncStatus = (clientSlug) => {
    const sections = [
        "navbar",
        "footer",
        "section1",
        "section2",
        "section3",
        "section4",
        "section5",
        "section6",
    ];

    const status = {};
    let totalSections = 0;
    let syncedSections = 0;

    sections.forEach((section) => {
        const backup = getLocalBackup(`${section}_${clientSlug}`);
        if (backup) {
            totalSections++;
            if (backup.synced) {
                syncedSections++;
            }
            status[section] = {
                exists: true,
                synced: backup.synced || false,
                savedAt: backup.savedAt,
                syncedAt: backup.syncedAt || null,
            };
        } else {
            status[section] = {
                exists: false,
                synced: false,
            };
        }
    });

    return {
        sections: status,
        totalSections,
        syncedSections,
        allSynced: totalSections > 0 && totalSections === syncedSections,
        readyToPublish: totalSections > 0,
    };
};

// ========================================
// LEGACY FUNCTIONS (Keep for backward compatibility)
// ========================================

// Main API Call Function with Backup
const apiCallWithBackup = async (endpoint, data, localStorageKey) => {
    // Step 1: Save to local storage as backup
    saveToLocalStorage(localStorageKey, data);

    try {
        // Step 2: Send to backend
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "API call failed");
        }

        const result = await response.json();

        // Step 3: Mark as synced if successful
        markAsSynced(localStorageKey);
        console.log("✓ Data synced to backend successfully");

        return result;
    } catch (error) {
        console.error("Backend save failed, but backup is safe locally");
        throw error;
    }
};

// Navbar API
export const saveNavbarConfig = async (navbarData, clientSlug) => {
    const payload = {
        clientSlug: clientSlug,
        pageSlug: "home",
        section: {
            name: "navbarSection",
            data: navbarData,
        },
    };
    return await apiCallWithBackup(
        "/client/section/update",
        payload,
        `navbar_${clientSlug}`,
    );
};

// Footer API
export const saveFooterConfig = async (footerData, clientSlug) => {
    const payload = {
        clientSlug: clientSlug,
        pageSlug: "home",
        section: {
            name: "footerSection",
            data: footerData,
        },
    };
    return await apiCallWithBackup(
        "/client/section/update",
        payload,
        `footer_${clientSlug}`,
    );
};

// Section 1 API
export const saveSection1Config = async (section1Data, clientSlug) => {
    const payload = {
        clientSlug: clientSlug,
        pageSlug: "home",
        section: {
            name: "heroSection",
            data: section1Data,
        },
    };
    return await apiCallWithBackup(
        "/client/section/update",
        payload,
        `section1_${clientSlug}`,
    );
};

// Section 2 API
export const saveSection2Config = async (section2Data, clientSlug) => {
    const payload = {
        clientSlug: clientSlug,
        pageSlug: "home",
        section: {
            name: "aboutSection",
            data: section2Data,
        },
    };
    return await apiCallWithBackup(
        "/client/section/update",
        payload,
        `section2_${clientSlug}`,
    );
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Utility: Get backup status
export const getBackupStatus = (clientSlug) => {
    const navbar = getLocalBackup(`navbar_${clientSlug}`);
    const footer = getLocalBackup(`footer_${clientSlug}`);
    const section1 = getLocalBackup(`section1_${clientSlug}`);
    const section2 = getLocalBackup(`section2_${clientSlug}`);

    return {
        navbar: navbar
            ? { synced: navbar.synced, savedAt: navbar.savedAt }
            : null,
        footer: footer
            ? { synced: footer.synced, savedAt: footer.savedAt }
            : null,
        section1: section1
            ? { synced: section1.synced, savedAt: section1.savedAt }
            : null,
        section2: section2
            ? { synced: section2.synced, savedAt: section2.savedAt }
            : null,
    };
};

// Utility: Load backup data
export const loadBackupData = (clientSlug, section) => {
    const key = `${section}_${clientSlug}`;
    const backup = getLocalBackup(key);
    return backup ? backup.data : null;
};

// Utility: Load section data (alias for consistency)
export const loadSectionData = loadBackupData;

// Utility: Clear all backups
export const clearAllBackups = (clientSlug) => {
    const sections = [
        "navbar",
        "footer",
        "section1",
        "section2",
        "section3",
        "section4",
        "section5",
        "section6",
    ];
    sections.forEach((section) => {
        localStorage.removeItem(`${section}_${clientSlug}`);
    });
    console.log("All backups cleared");
};

// Utility: Clear all data (alias)
export const clearAllData = clearAllBackups;
