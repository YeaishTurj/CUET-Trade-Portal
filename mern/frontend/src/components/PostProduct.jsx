import React, { useState } from "react";

const PostProduct = ({ category }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    perWhich: "",
    imageURL: "",
    description: "",
    seller: "",
    contact: "",
    availableSizes: [],
    availableColors: [],
    features: [],
    location: "",
    reporter: "",
    endsIn: "",
  });

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

  let endsIn = formData.endsIn;
  if (formData.endsInParts) {
    const {
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0,
    } = formData.endsInParts;
    endsIn = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted product:", {
      category,
      ...formData,
      endsIn,
    });

    // Future: Send to backend or update local state
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6"
    >
      {/* Common Fields */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Product Title"
        className="w-full border p-3 rounded-lg"
        required
      />

      {category !== "lost" && category !== "found" && (
        <>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (e.g. 500)"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="perWhich"
            value={formData.perWhich}
            onChange={handleChange}
            placeholder="per Which (e.g. piece, month)"
            className="w-full border p-3 rounded-lg"
          />
        </>
      )}

      {/* Description */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-3 rounded-lg"
        rows={4}
      />

      {/* Category-specific fields */}
      {category === "fashion" && (
        <div>
          <label className="block mb-2 font-semibold">Available Sizes</label>
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

      {(category === "electronics" || category === "digital") && (
        <input
          type="text"
          name="features"
          placeholder="Features (comma separated)"
          onChange={(e) => handleListInput("features", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />
      )}

{(category === "lost" || category === "found") && (
  <>
    <input
      type="text"
      name="location"
      placeholder={`Location where you ${category === "lost" ? "lost" : "found"} the item`}
      value={formData.location}
      onChange={handleChange}
      className="w-full border p-3 rounded-lg"
      required
    />
  </>
)}


      {category === "pre-owned" && (
        <div>
          <label className="block mb-2 font-semibold">Ends In</label>
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

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition"
      >
        Submit Product
      </button>
    </form>
  );
};

export default PostProduct;
