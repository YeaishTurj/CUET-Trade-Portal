import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBaseURL } from "../utils/baseURL";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    perWhich: "piece",
    features: "",
    availableSizes: "",
    location: "",
    endsIn: "",
    imageURL: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${getBaseURL()}/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            ...data,
            features: data.features?.join(", ") || "",
            availableSizes: data.availableSizes?.join(", ") || "",
          });
          setImagePreview(data.imageURL);
        } else {
          setErrorMsg(data.message || "Failed to load product");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to fetch product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      let imageURL = formData.imageURL;

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
        setIsUploading(false);

        if (!uploadRes.ok) throw new Error(uploadData.message || "Image upload failed");
        imageURL = uploadData.url;
      }

      const payload = {
        ...formData,
        imageURL,
        features: formData.features.split(",").map((f) => f.trim()),
        availableSizes: formData.availableSizes.split(",").map((s) => s.trim()),
      };

      if (formData.category === "pre-owned" && formData.endsIn) {
        payload.endsIn = formData.endsIn;
      }

      const res = await fetch(`${getBaseURL()}/api/products/update-product/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("✅ Product updated successfully");
        setTimeout(() => navigate("/dashboard/listings"), 1500);
      } else {
        setErrorMsg(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      setErrorMsg("Something went wrong");
    }
  };

  const showPrice = !["lost", "found"].includes(formData.category);
  const showSizes = formData.category === "fashion";
  const showFeatures = !["lost", "found"].includes(formData.category);
  const showAuction = formData.category === "pre-owned";
  const showLocation = ["lost", "found"].includes(formData.category);

  return (
    <form
      onSubmit={handleSubmit}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold mb-2">Edit Product</h2>

      {successMsg && <p className="text-green-600">{successMsg}</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        placeholder="Title"
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
        disabled
      >
        <option value="">Select Category</option>
        <option value="fashion">Fashion</option>
        <option value="electronics">Electronics</option>
        <option value="digital">Digital</option>
        <option value="others">Others</option>
        <option value="pre-owned">Pre-Owned</option>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        placeholder="Description"
      />

      {showPrice && (
        <>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Price"
          />
          <input
            type="text"
            name="perWhich"
            value={formData.perWhich}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Per (piece/day/month)"
          />
        </>
      )}

      {showFeatures && (
        <input
          type="text"
          name="features"
          value={formData.features}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Features (comma separated)"
        />
      )}

      {showSizes && (
        <input
          type="text"
          name="availableSizes"
          value={formData.availableSizes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Available Sizes (comma separated)"
        />
      )}

      {showAuction && (
        <input
          type="text"
          name="endsIn"
          value={formData.endsIn}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Auction duration (e.g. 1d 4h 20m)"
        />
      )}

      {showLocation && (
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Location"
        />
      )}

      <div className="w-full border-2 border-dashed p-4 rounded text-center">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <p className="text-blue-600 underline">Click or drag an image here</p>
        </label>
        {isUploading && <p className="text-sm mt-2 text-blue-500">Uploading...</p>}
        {imagePreview && !isUploading && (
          <img
            src={imagePreview}
            alt="Product"
            className="mt-3 mx-auto h-40 object-contain rounded"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;
