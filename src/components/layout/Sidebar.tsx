import { useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdAssignment, MdCampaign, MdLibraryBooks, MdGroups } from "react-icons/md";

interface SidebarProps {
//   userRole: string;
  currentPath: string;
  navigate: (path: string) => void;
  logOut?: () => void;
}

const navItems = [
  { name: "Content Moderation", icon: MdGroups, path: "/dashboard/moderation" },
  { name: "User Management", icon: MdLibraryBooks, path: "/dashboard/user_management" },
  { name: "Announcements", icon: MdCampaign, path: "/dashboard/announcements" },
];

const Sidebar = ({ currentPath, navigate, logOut }: SidebarProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogOut = () => {
    if (logOut) {
      logOut();
      navigate('/signIn')
    } else {
      console.warn('LogOut function not provided')
    }
  }

  const isProfileActive = currentPath === '/dashboard/profile'

  return (
    <>
      <aside className="flex flex-col w-64 bg-white border-r border-gray-200 p-6 min-h-screen sticky top-0">
        {/* Header */}
        <div className=" justify-center ">
          <div className="mb-4 bg-green-600 p-2 rounded-lg text-center">
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="grow space-y-2 font-semibold">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex text-md items-center w-full text-left p-3 rounded-lg transition ${isActive
                  ? "bg-green-100 text-green-700 font-bold"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {item.icon({ className: 'h-5 w-5 mr-3' })}
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* profile */}
        <div className="mb-15 space-y-2 font-semibold">
          {/* <button
            onClick={handleProfileClick}
            className={`flex text-md items-center w-full text-left p-3 rounded-lg transition ${isProfileActive
              ? "bg-green-100 text-green-700 font-bold"
              : "text-gray-600 hover:bg-gray-100 font-semibold"
              }`}
          >
            <FiSettings className="h-5 w-5 mr-3" />
            Profile Settings
          </button> */}

          <button
            onClick={() => setShowConfirm(true)}
            className='flex text-md text-gray-600 hover:text-red-500 hover:font-bold items-center w-full text-left p-3 transition'>
            <FiLogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* --- Confirm Logout Modal --- */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600/60 bg-opacity-1000 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowConfirm(false);
                  handleLogOut();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
