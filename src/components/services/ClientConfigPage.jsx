// import { useState } from 'react';
// import AdminNavbarForm from './components/AdminNavbarForm';
// import FooterForm from './components/FooterForm';
// import SectionForm1 from './components/SectionForm1';
// import SectionForm2 from './components/SectionForm2';
// import AboutForm from './components/AboutForm';  // Add this import
// import ContactForm from './components/ContactForm';  // Add this import
// import MasterControlPanel from './components/MasterControlPanel';
// import MasterPreview from './components/MasterPreview';

// const ClientConfigPage = () => {
//     const clientSlug = "man-hunt-co";
//     const [publishSuccess, setPublishSuccess] = useState(null);

//     const handlePublishSuccess = (result) => {
//         setPublishSuccess(result);
//         alert(`🎉 Success! Website published successfully!\n\nClient: ${clientSlug}\nSections: ${result.data?.pages?.[0]?.section?.length || 0}`);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8">
//             <div className="max-w-7xl mx-auto px-4">
//                 <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
//                     Website Configuration Dashboard
//                 </h1>
//                 <p className="text-center text-gray-600 mb-8">
//                     Client: <span className="font-semibold text-indigo-600">{clientSlug}</span>
//                     <span className="ml-4 text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
//                         6 Sections Total
//                     </span>
//                 </p>

//                 {/* Success Banner */}
//                 {publishSuccess && (
//                     <div className="mb-6 p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl shadow-2xl animate-bounce">
//                         <h2 className="text-2xl font-bold mb-2">🎉 Website Published!</h2>
//                         <p>All 6 sections published successfully. Your website is now live!</p>
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Left Side - All 6 Forms */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <AdminNavbarForm clientSlug={clientSlug} />
//                         <SectionForm1 clientSlug={clientSlug} />
//                         <SectionForm2 clientSlug={clientSlug} />
//                         <AboutForm clientSlug={clientSlug} />
//                         <ContactForm clientSlug={clientSlug} />
//                         <FooterForm clientSlug={clientSlug} />
//                     </div>

//                     {/* Right Side - Control Panel */}
//                     <div className="lg:col-span-1">
//                         <MasterControlPanel 
//                             clientSlug={clientSlug}
//                             onPublishSuccess={handlePublishSuccess}
//                         />
//                     </div>
//                 </div>

//                 {/* Full Width Preview */}
//                 <div className="mt-8">
//                     <MasterPreview clientSlug={clientSlug} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ClientConfigPage;





// pages/ClientConfigPage.jsx - SIMPLIFIED VERSION
import { useState } from 'react';
import { WebsiteDataProvider } from '../../context/WebsiteDataContext';
import AdminNavbarForm from './components/AdminNavbarForm';
import FooterForm from './components/FooterForm';
import SectionForm1 from './components/SectionForm1';
import SectionForm2 from './components/SectionForm2';
import AboutForm from './components/AboutForm';
import ContactForm from './components/ContactForm';
import MasterControlPanel from './components/MasterControlPanel';
import MasterPreview from './components/MasterPreview';

const ClientConfigPage = () => {
    const clientSlug = "man-hunt-co";
    const [publishSuccess, setPublishSuccess] = useState(null);

    const handlePublishSuccess = (result) => {
        setPublishSuccess(result);
        setTimeout(() => setPublishSuccess(null), 5000);
    };

    return (
        <WebsiteDataProvider clientSlug={clientSlug}>
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
                        Website Configuration Dashboard
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        Client: <span className="font-semibold text-indigo-600">{clientSlug}</span>
                    </p>

                    {/* Success Banner */}
                    {publishSuccess && (
                        <div className="mb-6 p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl shadow-2xl">
                            <h2 className="text-2xl font-bold mb-2">🎉 Website Published!</h2>
                            <p>All sections published successfully. Your website is now live!</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Side - All Forms */}
                        <div className="lg:col-span-2 space-y-8">
                            <AdminNavbarForm />
                            <SectionForm1 />
                            <SectionForm2 />
                            <AboutForm />
                            <ContactForm />
                            <FooterForm />
                        </div>

                        {/* Right Side - Control Panel */}
                        <div className="lg:col-span-1">
                            <MasterControlPanel onPublishSuccess={handlePublishSuccess} />
                        </div>
                    </div>

                    {/* Full Width Preview */}
                    <div className="mt-8">
                        <MasterPreview />
                    </div>
                </div>
            </div>
        </WebsiteDataProvider>
    );
};

export default ClientConfigPage;