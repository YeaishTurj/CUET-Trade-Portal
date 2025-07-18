import React, { useEffect, useState } from "react";
import { getBaseURL } from "../utils/baseURL";
import { FiTrash2 } from "react-icons/fi";
import { useGetSignedInUserQuery } from "../redux/features/auth/authApi";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { data: currentUser } = useGetSignedInUserQuery();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${getBaseURL()}/api/auth/users`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [refresh]);

  const handleDelete = async (userId) => {
    if (userId === currentUser?._id) {
      return alert("❌ You cannot delete your own account.");
    }

    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const res = await fetch(`${getBaseURL()}/api/auth/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ User deleted successfully");
        setRefresh((prev) => !prev);
      } else {
        alert(data.message || "❌ Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("❌ Something went wrong");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`${getBaseURL()}/api/auth/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Role updated to ${newRole}`);
        setRefresh((prev) => !prev);
      } else {
        alert(data.message || "❌ Failed to update role");
      }
    } catch (err) {
      console.error("Error updating role:", err);
      alert("❌ Something went wrong");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">👥 Manage All Users</h1>

      {/* 🔍 Search Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 border px-4 py-2 rounded shadow-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Address</th>
              <th className="p-4">Profession</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id} className="border-b text-sm">
                <td className="p-4">{u.fullName}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 capitalize">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="bg-gray-100 px-2 py-1 rounded"
                    disabled={u._id === currentUser?._id}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-4">{u.contactNumber || "N/A"}</td>
                <td className="p-4">{u.address || "N/A"}</td>
                <td className="p-4">{u.profession || "N/A"}</td>
                <td className="p-4">
                  {new Date(u.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className={`${
                      u._id === currentUser?._id
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-600 hover:text-red-800"
                    }`}
                    title="Delete User"
                    disabled={u._id === currentUser?._id}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 py-6">No matching users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;
