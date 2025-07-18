import React, { useEffect, useState } from "react";
import { getBaseURL } from "../utils/baseURL";
import { FiTrash2, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${getBaseURL()}/api/products`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        } else {
          console.error("Failed to fetch products:", data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const res = await fetch(`${getBaseURL()}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Product deleted successfully");
        setRefresh((prev) => !prev);
      } else {
        alert(data.message || "❌ Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("❌ Something went wrong");
    }
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.postedBy?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📦 Manage All Products</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or posted by"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Posted By</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Bids</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-b text-sm">
                <td className="p-4 font-medium text-gray-900">{p.title}</td>
                <td className="p-4 capitalize">{p.category}</td>
                <td className="p-4">{p.postedBy?.fullName || "N/A"}</td>
                <td className="p-4">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-center">{p.bids?.length || 0}</td>
                <td className="p-4 flex gap-3 items-center">
                  <Link to={`/products/${p._id}`} title="View Details">
                    <FiEye className="text-blue-600 hover:text-blue-800" />
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Product"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductManagement;
