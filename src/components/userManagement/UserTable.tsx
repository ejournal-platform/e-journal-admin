import { useState } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { User } from "../../components/userManagement/type";
import { MdKeyboardArrowDown } from "react-icons/md";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [editName, setEditName] = useState("");
  const [editNic, setEditNic] = useState("");
  const [editRole, setEditRole] = useState("End User");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  // const [editPhone, setEditPhone] = useState<number>(0);
  // const [editWhatsApp, setEditWhatsApp] = useState<number>(0);
  // const [editDistrict, setEditDistrict] = useState("");

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditNic(user.nic);
    setEditRole(user.role);
    setIsEditOpen(true);
  };

  const handleViewClick = (user: User) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };


  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updateUser = {
      ...editingUser,
      name: editName,
      nic: editNic,
      role: editRole,
    };

    onEdit(updateUser);
    setIsEditOpen(false);
    setEditingUser(null);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setEditingUser(null);
  }

  const handleViewClose = () => {
    setIsViewOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
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
                    onClick={() => handleViewClick(user)}
                    className="text-green-600 hover:text-green-900 focus:outline-none! border-none!"
                  >
                    <FaEye className="inline-block mr-1" /> View
                  </button>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-600 hover:text-blue-900 focus:outline-none! border-none!"
                  >
                    <FaEdit className="inline-block mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:text-red-900! focus:outline-none! border-none!"
                  >
                    <FaTrashAlt className="inline-block mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Edit User
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-green-400 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  NIC Number
                </label>
                <input
                  type="text"
                  value={editNic}
                  onChange={(e) => setEditNic(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-green-400 focus:outline-none text-gray-900 bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Role
                </label>
                <div className="flex justify-center items-center">
                  <div className="relative w-screen">
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg appearance-none py-2 px-3 focus:ring-green-400 focus:outline-none text-gray-900"
                    >
                      <option value="Master Trainer">Master Trainer</option>
                      <option value="TOT">TOT</option>
                      <option value="End User">End User</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <MdKeyboardArrowDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-7">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 h-10 bg-gray-200! rounded-md hover:bg-gray-300! focus:outline-none! border-none! text-sm!"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 h-10 bg-green-600! text-white rounded-md hover:bg-green-700! focus:outline-none! border-none! text-sm!"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View model */}
      {isViewOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg text-center font-sans font-bold mb-4 text-gray-800">
              User Details
            </h2>

            <div className="space-y-3 text-gray-700">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>NIC:</strong> {selectedUser.nic || "N/A"}</p>
              <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
              <p><strong>WhatsApp:</strong> {selectedUser.whatsapp || "N/A"}</p>
              <p><strong>District:</strong> {selectedUser.district || "N/A"}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleViewClose}
                className="px-4 py-2 bg-blue-600! text-white rounded-md hover:bg-blue-700! focus:outline-none! border-none! text-sm!"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
