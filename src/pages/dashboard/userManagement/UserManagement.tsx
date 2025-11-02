import React, { useState, useMemo } from "react";
import { User } from "../../../components/userManagement/type";
import UserFilterBar from "../../../components/userManagement/UserFilterBar";
import UserTable from "../../../components/userManagement/UserTable";
import PaginationControls from "../../../components/userManagement/PaginationControls";
import AddUserModal from "../../../components/userManagement/AddUserModal";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", nic: "991234567V", role: "Master Trainer" },
    { id: 2, name: "Jane Smith", nic: "982345678V", role: "TOT" },
    { id: 3, name: "Alex Perera", nic: "973456789V", role: "End User" },
    { id: 4, name: "Nimal Silva", nic: "963456789V", role: "TOT" },
    { id: 5, name: "Kamal Fernando", nic: "953456789V", role: "Master Trainer" },
    { id: 6, name: "Tharindu Jayasena", nic: "943456789V", role: "End User" },
    { id: 7, name: "Amali Rathnayake", nic: "933456789V", role: "TOT" },
    { id: 8, name: "Sajith Kumara", nic: "923456789V", role: "End User" },
    { id: 9, name: "Nadeesha Madushani", nic: "913456789V", role: "Master Trainer" },
    { id: 10, name: "Ruwan Bandara", nic: "903456789V", role: "TOT" },
    { id: 11, name: "Hiruni Fernando", nic: "993456789V", role: "End User" },
    { id: 12, name: "Charith Silva", nic: "983456789V", role: "Master Trainer" },
    { id: 13, name: "Suresh Perera", nic: "973456780V", role: "TOT" },
    { id: 14, name: "Piumi Jayasinghe", nic: "963456780V", role: "End User" },
    { id: 15, name: "Anuradha Wijesinghe", nic: "953456780V", role: "Master Trainer" },
    { id: 16, name: "Malith Rajapaksha", nic: "943456780V", role: "TOT" },
    { id: 17, name: "Kasuni Udayanga", nic: "933456780V", role: "End User" },
    { id: 18, name: "Iresh Lakshan", nic: "923456780V", role: "Master Trainer" },
    { id: 19, name: "Buddhika Jayasuriya", nic: "913456780V", role: "End User" },
    { id: 20, name: "Menaka Wickramasinghe", nic: "903456780V", role: "TOT" },
  ]);

  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.nic.toLowerCase().includes(search.toLowerCase());
      const matchesRole = selectedRole === "All" || user.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [users, search, selectedRole]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddUser = (user: Omit<User, "id">) => {
    setUsers((prev) => [...prev, { id: Date.now(), ...user }]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-5 text-center sm:text-left">Manage Users</h2>
        <p className="text-gray-600 mb-6text-gray-600 mb-6">Manage all users in the system.</p>
      </div>

      {/* Search, Filter, Add */}
      <UserFilterBar
        search={search}
        selectedRole={selectedRole}
        onSearchChange={setSearch}
        onRoleChange={setSelectedRole}
        onAddUserClick={() => setShowAddModal(true)}
      />

      {/* User Table */}
      <UserTable
        users={paginatedUsers}
        onEdit={(updatedUser) => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
        }}
        onDelete={(id) =>
          setUsers((prev) => prev.filter((user) => user.id !== id))
        }
      />
      
      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddUser}
      />
    </div>
  );
};

export default UserManagement;