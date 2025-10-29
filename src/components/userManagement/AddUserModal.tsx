import React, { useState } from "react";
import { User } from "../../components/userManagement/type";
import { MdKeyboardArrowDown } from "react-icons/md";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, "id">) => void;
}

const AddUserModal = ({ isOpen, onClose, onSave } : AddUserModalProps) => {
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
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl text-center font-bold mb-4 text-gray-800 font-sans">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border border-gray-400 text-sm p-2 rounded-md focus:border-gray-500! focus:outline-none"
          />
          <input
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            placeholder="NIC Number"
            className="w-full border border-gray-400 p-2 text-sm rounded-md focus:border-gray-500! focus:outline-none"
          />

          <div className="flex justify-center items-center">
          <div className="relative w-screen">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-400 appearance-none text-sm p-2 rounded-md focus:border-gray-500! focus:outline-none"
          >
            <option>Master Trainer</option>
            <option>TOT</option>
            <option>End User</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <MdKeyboardArrowDown className="w-4 h-4" />
                      </div>
          </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 h-10 bg-gray-200! rounded-md hover:bg-gray-300! focus:outline-none! border-none! text-sm!"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 h-10 bg-green-600! text-white rounded-md hover:bg-green-700! focus:outline-none! border-none! text-sm!"
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
