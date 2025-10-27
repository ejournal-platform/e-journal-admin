import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import {  useState } from "react";

interface DashboardLayoutProps {
  nic?: string;
  onLogout?: () => void;
}

const DashboardLayout = ({ nic, onLogout }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [user] = useState({
    name: nic || "User",
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="sm:hidden sm:fixed top-0 left-0 right-0 h-16 bg-white shadow-md border-b border-gray-100 z-40 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700 hover:text-green-600"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* <div className="flex items-center text-lg sm:text-xl font-bold text-gray-800">
            <img src={'logo'} alt="Logo" className="h-8 w-auto sm:h-10 mr-2" />
            <span className="whitespace-nowrap text-sm sm:text-base md:text-lg">
              Food Safety Watch
            </span>
          </div> */}
        </div>
{/* 
        <div className="flex items-center space-x-3 hover:text-green-600 transition">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-green-100 border-2 border-green-500 text-green-700">
            <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">
            Role:{" "}
            <span className="font-semibold text-green-700">{user.role}</span>
          </p>
        </div> */}
      </header>

      {/* Main Body */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar (responsive) */}
        <aside
          className={`fixed top-16 bottom-0 bg-white border-r border-gray-200 shadow-sm z-30 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-64 w-64`}
        >
          <Sidebar
            currentPath={location.pathname}
            navigate={(path) => {
              navigate(path);
              setIsSidebarOpen(false);
            }}
            // userRole={user.role || ""}
            logOut={() => {
              if (onLogout) {
                onLogout();
                navigate("/signIn");
              }
            }}
          />
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          ></div>
        )}

        {/* Page Content */}
        <main
          className={`
            flex-1 p-4 sm:p-6 bg-gray-100 overflow-y-auto
            h-[calc(100vh-4rem)]
            transition-all duration-300
            ${isSidebarOpen ? "blur-sm lg:blur-0" : ""}
            lg:ml-64
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;