// import { Routes, Route, Navigate, useParams } from "react-router-dom";
// import Layout from "./Layout";
// import AdminLayout from "./AdminLayout"; // Import separate admin layout
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import NotFound from "./components/Home/NotFound";
// import companyThemes from "./config/companyThemes.json";
// import { useEffect } from "react";

// // Import Admin Components
// import AdminLogin from "./adminPanel/adminlogin/AdminLogin";
// import AdminDashboard from "./adminPanel/damindashbord/AdminDashboard";
// import AddCompany from "./adminPanel/damindashbord/addcompany/AddCompany";
// import AdminNavbarForm from "./adminPanel/damindashbord/addcompany/compnayformdetails/AdminNavbarForm";
// import SectionForm1 from "./adminPanel/damindashbord/addcompany/compnayformdetails/SectionForm1";
// import SectionForm2 from "./adminPanel/damindashbord/addcompany/compnayformdetails/SectionForm2";
// import AboutForm from "./adminPanel/damindashbord/addcompany/compnayformdetails/AboutForm";
// import ContactForm from "./adminPanel/damindashbord/addcompany/compnayformdetails/ContactForm";
// import FooterForm from "./adminPanel/damindashbord/addcompany/compnayformdetails/FooterForm";
// import MasterControlPanel from "./components/services/MasterControlPanel"
// // import ProtectedRoute from "./components/ProtectedRoute";

// const ValidateCompany = () => {
//     const { company } = useParams();

//     useEffect(() => {
//         document.title = companyThemes[company]?.name || "Solar Company";

//         const favicon = document.querySelector("link[rel='icon']");
//         if (favicon && companyThemes[company]?.logo) {
//             favicon.href = companyThemes[company]?.logo;
//         }
//     }, [company]);

//     if (!companyThemes[company]) {
//         return <NotFound />;
//     }

//     return <Layout />; // This uses company-specific layout
// };

// const App = () => {
//     return (
//         <Routes>
//             {/* Admin Routes - Use AdminLayout */}
//             <Route path="/admin" element={<AdminLayout />}>
//                 <Route
//                     index
//                     element={<Navigate to="/admin/dashboard" replace />}
//                 />
//                 <Route path="login" element={<AdminLogin />} />
//                 <Route path="dashboard" element={<AdminDashboard />} />
//                 <Route path="addcompany" element={<AddCompany />}>
//                     <Route
//                         path="adminnavbarform"
//                         element={<AdminNavbarForm />}
//                     />

//                     <Route path="sectionform1" element={<SectionForm1 />} />
//                     <Route path="sectionform2" element={<SectionForm2 />} />
//                     <Route path="aboutform" element={<AboutForm/>}/>
//                     <Route path="contectform" element={<ContactForm/>}/>
//                     <Route path="footerform" element={<FooterForm/>}/>
//                     <Route path="daminmain" element={<MasterControlPanel/>}/>
//                 </Route>
//             </Route>

//             {/* Company Routes - Use regular Layout */}
//             <Route path="/:company" element={<ValidateCompany />}>
//                 <Route index element={<Home />} />
//                 <Route path="about" element={<About />} />
//                 <Route path="contact" element={<Contact />} />
//             </Route>

//             {/* Root redirect - You might want to redirect to a default company */}
//             <Route path="/" element={<Navigate to="/default" replace />} />
//             <Route path="*" element={<NotFound />} />
//         </Routes>
//     );
// };

// export default App;

import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "./Layout";
import AdminLayout from "./AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./components/Home/NotFound";
import companyThemes from "./config/companyThemes.json";
import { useEffect } from "react";
import { WebsiteDataProvider } from "./context/WebsiteDataContext";

// Import Admin Components
import AdminLogin from "./adminPanel/adminlogin/AdminLogin";
import AdminDashboard from "./adminPanel/damindashbord/AdminDashboard";
import AddCompany from "./adminPanel/damindashbord/addcompany/AddCompany";
import AdminNavbarForm from "./adminPanel/damindashbord/addcompany/compnayformdetails/AdminNavbarForm";
import SectionForm1 from "./adminPanel/damindashbord/addcompany/compnayformdetails/SectionForm1";
import SectionForm2 from "./adminPanel/damindashbord/addcompany/compnayformdetails/SectionForm2";
import AboutForm from "./adminPanel/damindashbord/addcompany/compnayformdetails/AboutForm";
import ContactForm from "./adminPanel/damindashbord/addcompany/compnayformdetails/ContactForm";
import FooterForm from "./adminPanel/damindashbord/addcompany/compnayformdetails/FooterForm";
import MasterControlPanel from "./components/services/MasterControlPanel";
import CreateClient from "./adminPanel/damindashbord/addcompany/compnayformdetails/CreateClient";
import ShowListOfClient from "./adminPanel/damindashbord/addcompany/compnayformdetails/ShowListOfClient";
const ValidateCompany = () => {
    const { company } = useParams();

    useEffect(() => {
        document.title = companyThemes[company]?.name || "Solar Company";

        const favicon = document.querySelector("link[rel='icon']");
        if (favicon && companyThemes[company]?.logo) {
            favicon.href = companyThemes[company]?.logo;
        }
    }, [company]);

    if (!companyThemes[company]) {
        return <NotFound />;
    }

    return <Layout />;
};

// URL format: /admin/addcompany/:clientSlug/adminnavbarform
const AddCompanyWithContext = () => {
    const { clientId } = useParams();

    console.log("Client Slug from URL:", clientId);

    // Fallback to default if no clientSlug in URL
    // const slug = clientSlug || "man-hunt-co";
    const slug = clientId || "man-hunt-co";

    return (
        <WebsiteDataProvider clientSlug={slug}>
            <AddCompany />
        </WebsiteDataProvider>
    );
};

const App = () => {
    return (
        <Routes>
            {/* Admin Routes - Use AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route
                    index
                    element={<Navigate to="/admin/dashboard" replace />}
                />
                <Route path="login" element={<AdminLogin />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="createclient" element={<CreateClient />} />
                <Route path="showclient" element={<ShowListOfClient />} />
                <Route
                    // path="addcompany/:clientSlug"
                    path="addcompany/:clientId"
                    element={<AddCompanyWithContext />}
                >
                    <Route
                        path="adminnavbarform"
                        element={<AdminNavbarForm />}
                    />
                    <Route path="sectionform1" element={<SectionForm1 />} />
                    <Route path="sectionform2" element={<SectionForm2 />} />
                    <Route path="aboutform" element={<AboutForm />} />
                    <Route path="contactform" element={<ContactForm />} />
                    <Route path="footerform" element={<FooterForm />} />
                    <Route path="daminmain" element={<MasterControlPanel />} />
                </Route>

                <Route
                    path="addcompany"
                    element={
                        <Navigate
                            to="/admin/addcompany/man-hunt-co/adminnavbarform"
                            replace
                        />
                    }
                />
            </Route>

            {/* Company Routes - Use regular Layout */}
            <Route path="/:company" element={<ValidateCompany />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
            </Route>

            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/default" replace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
