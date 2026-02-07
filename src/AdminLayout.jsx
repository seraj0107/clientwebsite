import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Simple layout for admin pages */}
            <Outlet />
        </div>
    );
};

export default AdminLayout;