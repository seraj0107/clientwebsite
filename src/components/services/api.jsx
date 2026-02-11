const API_BASE_URL = import.meta.env.VITE_TECH_PRO;

/**
 * Publish all sections to backend
 * @param {string} clientSlug - Client identifier
 * @param {object} allData - All section data { navbar: {...}, section1: {...}, etc. }
 * @param {string} clientId - Client ID
 */
export const publishAllSections = async (clientSlug, allData, clientId) => {
    console.log(
        "Publishing sections for client:",
        { clientSlug },
        "Client ID:",
        clientId,
    );
    try {
        // Transform data into backend format
        const sections = Object.entries(allData).map(([key, data]) => ({
            name: getSectionName(key),
            data: data,
        }));

        const payload = {
            clientId: clientId,
            clientSlug: clientSlug,
            pageSlug: "home",
            sections: sections,
        };

        console.log("📤 Publishing to backend:", payload);

        const response = await fetch(`${API_BASE_URL}/client/addData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Changed from withCredentials to credentials
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
        console.error("❌ Publish failed:", error);
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
