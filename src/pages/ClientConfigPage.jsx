// pages/ClientConfigPage.jsx

import { useState, useEffect } from "react";
import { getBackupStatus, loadBackupData } from "./services/api";
import { validateAllSections } from "./services/validation";
import AdminNavbarForm from "./AdminNavbarForm";
import FooterForm from "./FooterForm";
import SectionForm1 from "./SectionForm1";
import SectionForm2 from "./SectionForm2";
import ProgressTracker from "./components/ProgressTracker";

const ClientConfigPage = () => {
    const clientSlug = "man-hunt-co";

    // Load data from backups
    const [navbarData, setNavbarData] = useState(() =>
        loadBackupData(clientSlug, "navbar"),
    );
    const [footerData, setFooterData] = useState(() =>
        loadBackupData(clientSlug, "footer"),
    );
    const [section1Data, setSection1Data] = useState(() =>
        loadBackupData(clientSlug, "section1"),
    );
    const [section2Data, setSection2Data] = useState(() =>
        loadBackupData(clientSlug, "section2"),
    );

    const [validation, setValidation] = useState(null);
    const [backupStatus, setBackupStatus] = useState(null);

    // Update validation whenever data changes
    useEffect(() => {
        const validationResult = validateAllSections(
            navbarData,
            footerData,
            section1Data,
            section2Data,
        );
        setValidation(validationResult);
    }, [navbarData, footerData, section1Data, section2Data]);

    useEffect(() => {
        const status = getBackupStatus(clientSlug);
        setBackupStatus(status);
    }, []);

    const refreshData = () => {
        setNavbarData(loadBackupData(clientSlug, "navbar"));
        setFooterData(loadBackupData(clientSlug, "footer"));
        setSection1Data(loadBackupData(clientSlug, "section1"));
        setSection2Data(loadBackupData(clientSlug, "section2"));
        setBackupStatus(getBackupStatus(clientSlug));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Client Configuration Dashboard
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        <AdminNavbarForm
                            clientSlug={clientSlug}
                            onSave={(data) => {
                                setNavbarData(data);
                                refreshData();
                            }}
                        />

                        <SectionForm1
                            clientSlug={clientSlug}
                            onSave={(data) => {
                                setSection1Data(data);
                                refreshData();
                            }}
                        />

                        <SectionForm2
                            clientSlug={clientSlug}
                            onSave={(data) => {
                                setSection2Data(data);
                                refreshData();
                            }}
                        />

                        <FooterForm
                            clientSlug={clientSlug}
                            onSave={(data) => {
                                setFooterData(data);
                                refreshData();
                            }}
                        />
                    </div>

                    {/* Right Side - Progress Tracker */}
                    <div className="lg:col-span-1">
                        <ProgressTracker validation={validation} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientConfigPage;
