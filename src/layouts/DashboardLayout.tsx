import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import {  useState } from "react";

interface DashboardLayoutProps {
  nic?: string;
  onLogout?: () => void;
}

interface logoutProps {

}

const DashboardLayout = ({ nic, onLogout }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [user] = useState({
    name: nic || "User",
  });

  const handleLogOut = () => {
    if (onLogout) {
      onLogout();
      navigate('/signIn')
    } else {
      console.warn('LogOut function not provided')
    }
  }

  return (
    <div className="min-h-full bg-red-500 font-sans flex flex-col">
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
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 min-w-screen">
        {/* Sidebar (responsive) */}
        <aside
          className={`fixed bottom-0 bg-white border-r border-gray-200 shadow-sm z-30 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-64 w-64`}
        >
          <Sidebar
            currentPath={location.pathname}
            navigate={(path) => {
              navigate(path);
              setIsSidebarOpen(false);
            }}
            openLogoutModel={() => setShowLogoutConfirm(true)}
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
            h-[calc(100vh)]
            transition-all duration-300
            ${isSidebarOpen ? "blur-sm lg:blur-0" : ""}
            lg:ml-64
          `}
        >
          <Outlet />
        </main>
      </div>

       {/* --- Confirm Logout Modal --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600/60 bg-opacity-1000 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center space-x-8">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-200! text-gray-800 text-sm! px-4 py-2 rounded-lg font-semibold hover:bg-gray-300! transition focus:outline-none! border-none!"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogOut();
                }}
                className="bg-red-500! text-white text-sm! px-4 py-2 rounded-lg font-semibold hover:bg-red-600! transition focus:outline-none! border-none!"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardLayout;