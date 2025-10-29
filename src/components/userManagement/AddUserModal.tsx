import React, { useState } from "react";
import { User } from "../../components/userManagement/type";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, "id">) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [role, setRole] = useState("Master Trainer");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nic) return alert("Please fill all fields");
    onSave({ name, nic, role });
    setName("");
    setNic("");
    setRole("Master Trainer");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border p-2 rounded-md focus:ring-green-500 focus:border-green-500"
          />
          <input
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            placeholder="NIC Number"
            className="w-full border p-2 rounded-md focus:ring-green-500 focus:border-green-500"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option>Master Trainer</option>
            <option>TOT</option>
            <option>End User</option>
          </select>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
