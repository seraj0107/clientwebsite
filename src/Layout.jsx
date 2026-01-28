import { Outlet, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
    const { company } = useParams();
    return (
        <div key={company}>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
