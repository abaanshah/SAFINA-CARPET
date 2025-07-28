import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar"; // adjust path if needed

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
