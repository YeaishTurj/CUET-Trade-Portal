import React, { useState, useEffect } from "react";
import {
  useEditProfileMutation,
  useGetSignedInUserQuery,
} from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast"; // Optional
import { uploadImageToCloudinary } from "../utils/cloudinary"; // ✅ Import the Cloudinary upload function

const EditProfile = () => {
  const { data: user, isLoading } = useGetSignedInUserQuery();
  const [editProfile, { isLoading: isUpdating }] = useEditProfileMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
    profession: "",
    profileImage: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFormData({
      fullName: user?.fullName || "",
      contactNumber: user?.contactNumber || "",
      address: user?.address || "",
      profession: user?.profession || "",
      profileImage: user?.profileImage || "",
    });
    setImagePreview(user?.profileImage || "");
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (name, type = "text") => (
    <div key={name}>
      <label className="block text-gray-600 mb-1 capitalize">
        {name.replace(/([A-Z])/g, " $1")}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-300"
      />
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.contactNumber) {
      alert("Full name and contact number are required.");
      return;
    }

    try {
      await editProfile(formData).unwrap();
      alert("Profile updated successfully!");
      // toast.success("Profile updated!"); // optional
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile. Try again.");
      // toast.error("Profile update failed"); // optional
    }
  };

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-700">
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["fullName", "contactNumber", "address", "profession"].map((field) =>
          renderInput(field)
        )}

        {/* ✅ Profile Image Upload & Preview */}
        <div>
          <label className="block text-gray-600 mb-1">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              try {
                setUploading(true);
                const imageUrl = await uploadImageToCloudinary(file, "profile");
                console.log("Image uploaded:", imageUrl);
                setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
                setImagePreview(imageUrl);
              } catch (err) {
                console.error("Upload failed", err);
                alert("Image upload failed");
              } finally {
                setUploading(false);
              }
            }}
            className="w-full border rounded px-3 py-2"
          />

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading image...</p>
          )}

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-28 h-28 object-cover rounded-full border mx-auto"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
