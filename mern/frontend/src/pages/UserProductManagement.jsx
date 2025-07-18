import React, { useEffect, useState } from "react";
import { getBaseURL } from "../utils/baseURL";
import { FiTrash2, FiEdit, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetSignedInUserQuery } from "../redux/features/auth/authApi";

const UserProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  const { data: user, isLoading, isError } = useGetSignedInUserQuery();

  console.log(user._id);

  // ✅ Always call hooks first (before return!)
  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(
          `${getBaseURL()}/api/products?postedBy=${user._id}`,
          { credentials: "include" }
        );
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
  }, [refresh, user]);

  console.log("User Products:", products);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
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
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Safe to render after hooks
  if (isLoading) return <p className="p-10">Loading your products...</p>;
  if (isError || !user)
    return <p className="p-10 text-red-500">Error loading user data.</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🧾 Manage Uploaded Products</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title"
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
                <td className="p-4">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  {p.category === "pre-owned" ? p.bids?.length || 0 : "-"}
                </td>
                <td className="p-4 flex gap-3 items-center">
                  <Link to={`/edit-product/${p._id}`} title="Edit">
                    <FiEdit className="text-green-600 hover:text-green-800" />
                  </Link>
                  {p.category === "pre-owned" && (
                    <Link to={`/dashboard/bids/${p._id}`} title="Manage Bids">
                      <FiUsers className="text-blue-600 hover:text-blue-800" />
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
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

export default UserProductManagement;
