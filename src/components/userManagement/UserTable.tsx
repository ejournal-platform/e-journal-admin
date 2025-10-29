import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { User } from "../../components/userManagement/type";

interface UserTableProps {
  users: User[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserTable = ({ users, onEdit, onDelete } : UserTableProps ) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              NIC Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Role
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.nic}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
              <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                <button
                  onClick={() => onEdit(user.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <FaEdit className="inline-block mr-1" /> Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FaTrashAlt className="inline-block mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
