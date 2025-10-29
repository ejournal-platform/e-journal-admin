import React from "react";
import { MdAdd, MdKeyboardArrowDown } from "react-icons/md";

interface UserFilterBarProps {
  search: string;
  selectedRole: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onAddUserClick: () => void;
}

const UserFilterBar: React.FC<UserFilterBarProps> = ({
  search,
  selectedRole,
  onSearchChange,
  onRoleChange,
  onAddUserClick,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or NIC number"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="grow p-2 border border-gray-300 rounded-md focus:ring-green-500! focus:border-green-500! focus:outline-none text-sm"
        />

        <div className="flex space-x-3 justify-center items-center">
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="appearance-none  bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-green-500! text-sm"
            >
              <option value="All">All Roles</option>
              <option value="Master Trainer">Master Trainer</option>
              <option value="TOT">TOT</option>
              <option value="End User">End User</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <MdKeyboardArrowDown className="w-4 h-4" />
            </div>
          </div>

          <button
            onClick={onAddUserClick}
            className="flex items-center bg-blue-600! text-white py-2 px-4 rounded-md hover:bg-blue-700! transition focus:outline-none! text-sm!"
          >
            <MdAdd className="w-5 h-5 mr-1" />
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFilterBar;
