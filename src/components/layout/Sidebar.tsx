import { useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdAssignment, MdCampaign, MdLibraryBooks, MdGroups } from "react-icons/md";

interface SidebarProps {
//   userRole: string;
  currentPath: string;
  navigate: (path: string) => void;
  openLogoutModel?: () => void; 
}

const navItems = [
  { name: "Content Moderation", icon: MdGroups, path: "/dashboard/moderation" },
  { name: "User Management", icon: MdLibraryBooks, path: "/dashboard/user_management" },
  { name: "Announcements", icon: MdCampaign, path: "/dashboard/announcements" },
];

const Sidebar = ({ currentPath, navigate, openLogoutModel }: SidebarProps) => {

  return (
    <>
      <aside className="flex flex-col w-76 bg-white border-r border-gray-200 p-8 min-h-screen sticky top-0">
        {/* Header */}
        <div className=" justify-center ">
          <div className="mb-8 bg-green-400 p-2 rounded-lg text-center">
            <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="grow space-y-3 font-semibold">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex text-md items-center w-full text-left p-3 rounded-lg transition focus:outline-none! border-none! ${isActive
                  ? "bg-green-100! text-green-700 font-bold!"
                  : "text-gray-600! hover:bg-gray-100!"
                  }`}
              >
                {item.icon({ className: 'h-5 w-5 mr-3' })}
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* logout */}
        <div className="-mb-5 space-y-2 font-semibold">
          <button
            onClick={() => openLogoutModel?.()}
            className='flex bg-white! text-md text-gray-600 hover:text-red-500 hover:font-bold! items-center w-full text-left p-3 transition focus:outline-none! border-none!'>
            <FiLogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>    
    </>
  );
};

export default Sidebar;
