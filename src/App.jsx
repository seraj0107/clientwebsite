import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./components/Home/NotFound";
import companyThemes from "./config/companyThemes.json";
import { useEffect } from "react";

const ValidateCompany = () => {
    const { company } = useParams();

    useEffect(() => {
   
        document.title = companyThemes[company]?.name;

        const favicon = document.querySelector("link[rel='icon']");

        if (favicon) {
            favicon.href = companyThemes[company]?.logo;
        }
    }, [company]);
    if (!companyThemes[company]) {
        return <NotFound />;
    }

    return <Layout />;
};

const App = () => {
    return (
        <Routes>
            <Route path="/:company" element={<ValidateCompany />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
