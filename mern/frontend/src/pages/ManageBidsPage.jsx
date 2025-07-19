import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBaseURL } from "../utils/baseURL";

const ManageBidsPage = () => {
  const { id } = useParams(); // product ID
  const [product, setProduct] = useState(null);
  const [biddersInfo, setBiddersInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectingBid, setSelectingBid] = useState(false);
  const [removingWinner, setRemovingWinner] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${getBaseURL()}/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
          if (data.bids?.length) {
            const userFetches = await Promise.all(
              data.bids.map((bid) =>
                fetch(`${getBaseURL()}/api/auth/users/${bid.user}`)
                  .then((res) => res.json())
                  .then((user) => ({ [bid.user]: user }))
                  .catch(() => ({ [bid.user]: { fullName: "Unknown", email: "N/A" } }))
              )
            );
            const userMap = Object.assign({}, ...userFetches);
            setBiddersInfo(userMap);
          }
        } else {
          alert(data.message || "Failed to load product");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSelectWinner = async (bid) => {
    if (!window.confirm("Are you sure you want to select this as the winning bid?")) return;
    setSelectingBid(true);

    try {
      const res = await fetch(`${getBaseURL()}/api/products/select-winner/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ winningBid: bid }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Winning bid selected!");
        setProduct(data); // Update local state
      } else {
        alert(data.message || "Failed to select winning bid");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong");
    } finally {
      setSelectingBid(false);
    }
  };

  const handleRemoveWinner = async () => {
    if (!window.confirm("Are you sure you want to remove the selected winner?")) return;
    setRemovingWinner(true);

    try {
      const res = await fetch(`${getBaseURL()}/api/products/remove-winner/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Winner removed.");
        setProduct(data); // update state
      } else {
        alert(data.message || "Failed to remove winner");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong.");
    } finally {
      setRemovingWinner(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Bids for: {product.title}</h1>

      {product.winningBid ? (
        <div className="p-4 border border-green-500 rounded bg-green-50 mb-6">
          <h2 className="font-semibold text-green-700">🏆 Winning Bid Selected</h2>
          <p>
            <strong>Name:</strong> {biddersInfo[product.winningBid.user]?.fullName || "Unknown"} (
            {biddersInfo[product.winningBid.user]?.email || "N/A"})
          </p>
          <p>
            <strong>Price:</strong> ৳{product.winningBid.biddingPrice}
          </p>
          <button
            onClick={handleRemoveWinner}
            className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            disabled={removingWinner}
          >
            {removingWinner ? "Removing..." : "Remove Winner"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-yellow-600 mb-4">⚠️ No winning bid selected yet.</p>
      )}

      {product.bids.length === 0 ? (
        <p className="text-center text-gray-500 italic">No bids placed yet.</p>
      ) : (
        <ul className="space-y-4">
          {product.bids.map((bid, index) => {
            const user = biddersInfo[bid.user] || {};
            return (
              <li
                key={index}
                className="border p-4 rounded flex justify-between items-center bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{user.fullName || "Unknown"}</p>
                  <p className="text-sm text-gray-600">{user.email || "N/A"}</p>
                  <p className="mt-1 text-blue-600 font-semibold">
                    ৳{bid.biddingPrice.toLocaleString()}
                  </p>
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                  onClick={() => handleSelectWinner(bid)}
                  disabled={!!product.winningBid || selectingBid}
                >
                  {product.winningBid?.user === bid.user
                    ? "Selected"
                    : selectingBid
                    ? "Selecting..."
                    : "Select as Winner"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ManageBidsPage;
