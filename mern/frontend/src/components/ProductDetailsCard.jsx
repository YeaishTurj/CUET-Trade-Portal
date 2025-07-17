import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useGetSignedInUserQuery } from "../redux/features/auth/authApi";
import { getBaseURL } from "../utils/baseURL";
import { useEffect, useState } from "react";

function ProductDetailsCard({ product }) {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useGetSignedInUserQuery();

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Product not found
          </h2>
          <p className="text-gray-600 mt-2">
            The requested product could not be located.
          </p>
        </div>
      </div>
    );
  }

  const category = product.category || "";
  const isForSale = ["fashion", "electronics", "digital", "others"].includes(
    category
  );
  const isLostFound = ["lost", "found"].includes(category);
  const isPreOwned = category === "pre-owned";

  const handleAddToCart = async () => {
    if (!user) return alert("Please log in to add items to your cart.");

    try {
      const res = await fetch(`${getBaseURL()}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(addToCart({ ...product, id: product._id }));
        alert("✅ Added to cart!");
      } else {
        alert(data.message || "❌ Failed to add to cart.");
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("⚠️ Network error.");
    }
  };

  const postedBy = typeof product.postedBy === "object" ? product.postedBy : {};
  const name = postedBy?.fullName || "N/A";
  const contact = postedBy?.contactNumber || product.contact || "N/A";
  const email = postedBy?.email || "N/A";

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!product.expiresAt || product.category !== "pre-owned") return;

    const targetTime = new Date(product.expiresAt);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetTime - now;

      if (diff <= 0) {
        setCountdown("⏰ Auction expired");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [product.expiresAt, product.category]);

  console.log(countdown);

  return (
    <section className="py-12 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image + Action */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <div className="aspect-w-1 aspect-h-1 mb-6">
              <img
                src={
                  product.imageURL ||
                  `https://via.placeholder.com/600?text=${encodeURIComponent(
                    product.title
                  )}`
                }
                alt={product.title}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            {isPreOwned && (
              <div className="text-sm font-semibold text-red-600 mb-2">
                {countdown
                  ? countdown === "⏰ Auction expired"
                    ? "⚠️ This auction has ended"
                    : `⏳ Auction ends in: ${countdown}`
                  : "⏳ Calculating time..."}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6">
              {isForSale && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex-1"
                  >
                    Add to Cart
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex-1">
                    Buy Now
                  </button>
                </div>
              )}

              {isPreOwned && (
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <input
                    type="number"
                    placeholder="Enter your bid amount"
                    className="border border-gray-300 rounded-lg px-4 py-3 flex-1"
                    disabled={countdown === "⏰ Auction expired"}
                  />
                  <button
                    disabled={countdown === "⏰ Auction expired"}
                    className={`py-3 px-6 rounded-lg font-medium flex-1 ${
                      countdown === "⏰ Auction expired"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {countdown === "⏰ Auction expired"
                      ? "Bidding Closed"
                      : "Place a Bid"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                {category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                {product.title}
              </h1>

              {product.price && (
                <p className="text-xl font-semibold text-gray-800 mt-4">
                  Price: ৳{product.price.toLocaleString()}
                  {product.perWhich && (
                    <span className="text-sm text-gray-600">
                      {" "}
                      per {product.perWhich}
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Features */}
            {product.features?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Features
                </h2>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, i) => (
                    <li key={i} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lost/Found Info */}
            {isLostFound && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <p className="text-gray-700">{product.description}</p>
                {product.location && (
                  <p className="mt-2">
                    <span className="font-medium text-gray-900">Location:</span>{" "}
                    <span className="text-gray-700">{product.location}</span>
                  </p>
                )}
              </div>
            )}

            {/* Sizes */}
            {product.availableSizes?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Available Sizes
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.availableSizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 border rounded-full bg-gray-100 text-gray-800 text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Info */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {isLostFound ? "Reporter" : "Seller"} Information
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Phone:</strong> {contact}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Description */}
        {isForSale && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Product Description
            </h2>
            <p className="text-gray-700 text-justify">{product.description}</p>
          </div>
        )}

        {/* Pre-owned Bid Display */}
        {isPreOwned && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Description
              </h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Placed Bids
              </h2>
              {product.bids?.length > 0 ? (
                <div className="space-y-4">
                  {product.bids.map((bid, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center border-b pb-3 last:border-0"
                    >
                      <span className="font-medium text-gray-900">
                        {bid.user}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        ৳{bid.biddingPrice.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">
                    No bids yet. Be the first to bid!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetailsCard;
