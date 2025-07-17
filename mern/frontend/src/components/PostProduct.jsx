import React, { useState } from "react";
import { getBaseURL } from "../utils/baseURL";

const PostProduct = ({ category }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    perWhich: "",
    description: "",
    availableSizes: [],
    features: [],
    location: "",
    endsIn: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [postedProduct, setPostedProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleListInput = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()),
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  let endsIn = formData.endsIn;
  if (formData.endsInParts) {
    const { days = 0, hours = 0, minutes = 0, seconds = 0 } = formData.endsInParts;
    endsIn = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostedProduct(null);

    try {
      let imageURL = "";

      if (imageFile) {
        const imageForm = new FormData();
        imageForm.append("image", imageFile);
        imageForm.append("type", "product");

        setIsUploading(true);

        const uploadRes = await fetch(`${getBaseURL()}/api/upload/image`, {
          method: "POST",
          body: imageForm,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

        imageURL = uploadData.url;
        setIsUploading(false);
      }

      const productData = {
        ...formData,
        imageURL,
        category,
        endsIn,
      };

      const res = await fetch(`${getBaseURL()}/api/products/create-product`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Product successfully posted!");
        setPostedProduct(data);
        setFormData({
          title: "",
          price: "",
          perWhich: "",
          description: "",
          availableSizes: [],
          features: [],
          location: "",
          endsIn: "",
        });
        setImageFile(null);
        setImagePreview(null);
      } else {
        alert(`❌ ${data.message || "Failed to post product"}`);
      }
    } catch (error) {
      console.error("Error posting product:", error);
      alert("⚠️ Something went wrong.");
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-4">
        Post a Product
      </h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Vintage Jacket"
          required
          className="w-full border p-3 rounded-lg"
        />
      </div>

      {/* Price & Per Which */}
      {category !== "lost" && category !== "found" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 500"
                required
                className="w-full border p-3 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Per
              </label>
              <input
                type="text"
                name="perWhich"
                value={formData.perWhich}
                onChange={handleChange}
                placeholder="e.g., piece, hour"
                className="w-full border p-3 rounded-lg"
              />
            </div>
          </div>
        </>
      )}

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a short product description..."
          className="w-full border p-3 rounded-lg"
          rows={4}
        />
      </div>

      {/* Conditional Fields */}
      {category === "fashion" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Sizes
          </label>
          <div className="flex flex-wrap gap-3">
            {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={size}
                  checked={formData.availableSizes.includes(size)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData((prev) => ({
                      ...prev,
                      availableSizes: checked
                        ? [...prev.availableSizes, size]
                        : prev.availableSizes.filter((s) => s !== size),
                    }));
                  }}
                />
                {size}
              </label>
            ))}
          </div>
        </div>
      )}

      {(category === "electronics" || category === "digital" || category === "pre-owned") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Features (comma separated)
          </label>
          <input
            type="text"
            name="features"
            value={formData.features.join(", ")}
            onChange={(e) => handleListInput("features", e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>
      )}

      {(category === "lost" || category === "found") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Found/Lost
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>
      )}

      {category === "pre-owned" && (
        <div>
          <label className="block mb-2 font-medium">Ends In</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["days", "hours", "minutes", "seconds"].map((field) => (
              <input
                key={field}
                type="number"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border p-3 rounded-lg"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    endsInParts: {
                      ...(prev.endsInParts || {}),
                      [field]: e.target.value,
                    },
                  }))
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Image Upload */}
      {category !== "lost" && category !== "found" && (
        <div className="w-full border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <p className="text-gray-500 mb-2">Drag & Drop image or click to select</p>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {isUploading && (
            <p className="text-sm text-blue-600 mt-2 font-medium">Uploading...</p>
          )}
          {imagePreview && !isUploading && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 mx-auto h-48 object-contain rounded"
            />
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition w-full"
      >
        Submit Product
      </button>

      {/* Live Preview */}
      {postedProduct && (
        <div className="mt-6 p-4 border rounded-lg bg-green-50">
          <h3 className="font-bold mb-2 text-green-700">Live Preview</h3>
          <p><strong>Title:</strong> {postedProduct.title}</p>
          {postedProduct.imageURL && (
            <img
              src={postedProduct.imageURL}
              alt="Posted"
              className="mt-2 h-40 object-contain rounded"
            />
          )}
        </div>
      )}
    </form>
  );
};

export default PostProduct;
