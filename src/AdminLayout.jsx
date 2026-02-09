import { Outlet } from "react-router-dom";
import { WebsiteDataProvider } from "./context/WebsiteDataContext";
const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Outlet />
        </div>
    );
};

export default AdminLayout;
