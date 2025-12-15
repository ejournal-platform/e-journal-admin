import React, { useState, useMemo } from "react";
import { User } from "../../../components/userManagement/type";
import { useUsers, useDeleteUser, useUpdateUser, useCreateAuthorizedUser } from "../../../api/hooks/user";

import UserFilterBar from "../../../components/userManagement/UserFilterBar";
import UserTable from "../../../components/userManagement/UserTable";
import PaginationControls from "../../../components/userManagement/PaginationControls";
import AddUserModal from "../../../components/userManagement/AddUserModal";

const UserManagement = () => {
  const { data: usersData, isLoading, error } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: createUser } = useCreateAuthorizedUser();

  const users: User[] = useMemo(() => {
    if (!usersData) return [];
    return usersData.map(u => ({
      id: u.id || "", // Backend should return ID
      name: `${u.firstName} ${u.lastName}`,
      nic: u.nic,
      role: u.role,
      phoneNumber: u.phoneNumber ? String(u.phoneNumber) : '',
      whatsAppNumber: u.whatsAppNumber ? String(u.whatsAppNumber) : '',
      district: u.district,
    }));
  }, [usersData]);

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
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "User"; // Default last name if missing

    createUser({
      nic: user.nic,
      firstName,
      lastName,
      role: user.role,
    }, {
      onSuccess: () => {
        // alert("User added successfully");
      },
      onError: (err) => {
        console.error("Failed to add user", err);
        alert("Failed to add user");
      }
    });
  };

  const handleUpdateUser = (updatedUser: User) => {
    const nameParts = updatedUser.name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "User";

    updateUser({
      id: updatedUser.id,
      data: {
        firstName,
        lastName,
        role: updatedUser.role
      }
    }, {
      onSuccess: () => {
        // alert("User updated successfully");
      },
      onError: (err) => {
        console.error("Failed to update user", err);
        alert("Failed to update user");
      }
    });
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id, {
        onSuccess: () => {
          // alert("User deleted successfully");
        },
        onError: (err) => {
          console.error("Failed to delete user", err);
          alert("Failed to delete user");
        }
      });
    }
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
        onEdit={handleUpdateUser}
        onDelete={handleDeleteUser}
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