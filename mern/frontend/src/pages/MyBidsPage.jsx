import React, { useEffect, useState } from "react";
import { getBaseURL } from "../utils/baseURL";
import { Link } from "react-router-dom";

const MyBidsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // State to store user data

  // Fetch the logged-in user's data
  const fetchUser = async () => {
    try {
      const res = await fetch(`${getBaseURL()}/api/auth/me`, {
        credentials: "include", // Include cookies with the request
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data); // Set user data in the state
      } else {
        alert("Failed to load user data. Please log in.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      alert("⚠️ Error fetching user data.");
    }
  };

  // Fetch products that the user has placed bids on
  const fetchMyBids = async () => {
    if (!user?._id) return;

    try {
      const res = await fetch(
        `${getBaseURL()}/api/auth/my-bids/${user._id}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) setProducts(data);
      else alert(data.message || "Failed to fetch bids");
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Failed to fetch your bids");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data on component mount
  }, []);

  useEffect(() => {
    if (user) {
      fetchMyBids(); // Fetch bids only after user data is fetched
    }
  }, [user]);

  const handleRemoveBid = async (productId) => {
    try {
      const res = await fetch(`${getBaseURL()}/api/products/remove-bid/${productId}`, {
        method: "POST",
        credentials: "include", // Include cookies with the request
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Bid removed successfully");
        // Remove the bid from the local state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, bids: product.bids.filter((b) => b.user !== user._id) }
              : product
          )
        );
      } else {
        alert(data.message || "Failed to remove bid");
      }
    } catch (err) {
      console.error("Error removing bid:", err);
      alert("⚠️ Failed to remove your bid");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📈 My Bids</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          You haven't placed any bids yet.
        </p>
      ) : (
        <div className="grid gap-5">
          {products.map((product) => {
            const myBid = product.bids.find((b) => b.user === user._id);
            const isWinner = product.winningBid?.user === myBid?.user;

            return (
              <div
                key={product._id}
                className="border p-5 rounded-lg bg-white shadow"
              >
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className="text-blue-600 font-bold mt-1">
                  Your Bid: ৳{myBid?.biddingPrice || "N/A"}
                </p>
                {isWinner && (
                  <p className="text-green-600 font-medium mt-1">
                    🏆 You've won this bid!
                  </p>
                )}
                <button
                  onClick={() => handleRemoveBid(product._id)}
                  className="mt-3 text-red-500 hover:underline"
                  disabled={!myBid}
                >
                  {myBid ? "Remove Bid" : "No Bid to Remove"}
                </button>
                <Link
                  to={`/products/${product._id}`}
                  className="inline-block mt-3 text-blue-500 underline"
                >
                  View Product
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBidsPage;
