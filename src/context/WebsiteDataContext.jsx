import { createContext, useContext, useState, useEffect } from "react";

const WebsiteDataContext = createContext();

// Simple localStorage helpers
const saveToLocal = (key, data) => {
    try {
        localStorage.setItem(
            key,
            JSON.stringify({
                data,
                savedAt: new Date().toISOString(),
            }),
        );
        return true;
    } catch (error) {
        console.log("Save failed:", error);
        return false;
    }
};

const loadFromLocal = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item).data : null;
    } catch (error) {
        console.log("Load failed:", error);
        return null;
    }
};

export const WebsiteDataProvider = ({ children, clientSlug }) => {
    const [clientId, setClientId] = useState(loadFromLocal("clientId") || null);
    // console.log("Initial Client ID from localStorage:", clientId);
    // Single state object for all sections
    const [websiteData, setWebsiteData] = useState({
        navbar: null,
        section1: null,
        section2: null,
        about: null,
        contact: null,
        footer: null,
    });

    // Load all data on mount
    useEffect(() => {
        const loadAllData = () => {
            const sections = [
                "navbar",
                "section1",
                "section2",
                "about",
                "contact",
                "footer",
            ];
            const loadedData = {};

            sections.forEach((section) => {
                const data = loadFromLocal(`${section}_${clientSlug}`);
                if (data) loadedData[section] = data;
            });

            setWebsiteData((prev) => ({ ...prev, ...loadedData }));
        };

        loadAllData();
    }, [clientSlug]);

    // Save individual section data
    const saveSectionData = (sectionName, data) => {
        const key = `${sectionName}_${clientSlug}`;
        const saved = saveToLocal(key, data);

        if (saved) {
            setWebsiteData((prev) => ({
                ...prev,
                [sectionName]: data,
            }));
            return { success: true, message: `${sectionName} saved!` };
        }
        return { success: false, message: "Save failed" };
    };

    // saving client id in local storage;
    const saveClientId = (id) => {
        const key = "clientId";
        saveToLocal(key, id);
        setClientId(id);
    };

    // Get all data for preview/publish
    const getAllData = () => {
        return Object.entries(websiteData)
            .filter(([_, data]) => data !== null)
            .reduce((acc, [key, data]) => {
                acc[key] = data;
                return acc;
            }, {});
    };

    // Get section count
    const getSectionCount = () => {
        return Object.values(websiteData).filter((data) => data !== null)
            .length;
    };

    // Clear all data
    const clearAllData = () => {
        const sections = [
            "navbar",
            "section1",
            "section2",
            "about",
            "contact",
            "footer",
        ];
        sections.forEach((section) => {
            localStorage.removeItem(`${section}_${clientSlug}`);
        });
        setWebsiteData({
            navbar: null,
            section1: null,
            section2: null,
            about: null,
            contact: null,
            footer: null,
        });
        setClientId(null);
    };

    return (
        <WebsiteDataContext.Provider
            value={{
                websiteData,
                saveSectionData,
                getAllData,
                getSectionCount,
                clearAllData,
                clientId,
                saveClientId,
                clientSlug,
            }}
        >
            {children}
        </WebsiteDataContext.Provider>
    );
};

// Custom hook to use the context
export const useWebsiteData = () => {
    const context = useContext(WebsiteDataContext);
    if (!context) {
        throw new Error(
            "useWebsiteData must be used within WebsiteDataProvider",
        );
    }
    return context;
};
