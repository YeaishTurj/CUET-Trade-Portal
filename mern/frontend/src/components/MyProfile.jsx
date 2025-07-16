import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetSignedInUserQuery,
  useDeleteUserMutation,
} from "../redux/features/auth/authApi";
import { signOut } from "../redux/features/auth/authSlice";
import avatarImg from "../assets/avatar.jpg";

const MyProfile = () => {
  const { data: user, isLoading, isError } = useGetSignedInUserQuery();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (!confirmed) return;

    try {
      await deleteUser(user._id).unwrap(); // Use _id if that's what your backend returns
      dispatch(signOut());
      alert("Account deleted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert(
        error?.data?.message || "Failed to delete account. Try again later."
      );
    }
  };

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );
  }

  if (isError || !user) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load profile.</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-700">
        My Profile
      </h2>

      <div className="flex justify-center">
        <img
          src={user.profileImage || avatarImg}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border border-gray-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="font-medium">{user.fullName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Contact Number</p>
          <p className="font-medium">{user.contactNumber || "Not set"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">{user.address || "Not set"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Profession</p>
          <p className="font-medium">{user.profession || "Not set"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="font-medium capitalize">{user.role}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="text-center">
        <Link
          to="/dashboard/profile/edit"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-md mt-4 transition"
        >
          Edit Profile
        </Link>
      </div>

      {/* Delete Account Button */}
      <div className="text-center">
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className={`inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-md mt-2 transition ${
            deleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
