import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useGetSignedInUserQuery } from "../redux/features/auth/authApi";
import { getBaseURL } from "../utils/baseURL";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductDetailsCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: user } = useGetSignedInUserQuery();
  const [product, setProduct] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [bidUsers, setBidUsers] = useState({});
  const [isWinner, setIsWinner] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningPrice, setWinningPrice] = useState(null);
  const [selectedSize, setSelectedSize] = useState("regular");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${getBaseURL()}/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
          if (data.winningBid?.user === user?._id) {
            setIsWinner(true);
          }
          setWinner(data.winningBid?.user);
          setWinningPrice(data.winningBid?.biddingPrice);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id, user?._id]);

  useEffect(() => {
    if (!product?.expiresAt || product.category !== "pre-owned") return;
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
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [product?.expiresAt, product?.category]);

  useEffect(() => {
    if (!product?.bids?.length) return;
    const fetchBidUsers = async () => {
      const uniqueUserIds = [...new Set(product.bids.map((b) => b.user))];
      const results = {};
      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          try {
            const res = await fetch(`${getBaseURL()}/api/auth/users/${userId}`);
            const data = await res.json();
            if (res.ok) results[userId] = data;
          } catch (err) {
            console.error(`Failed to fetch user ${userId}`, err);
          }
        })
      );
      setBidUsers(results);
    };
    fetchBidUsers();
  }, [product?.bids]);

  // console.log(winningPrice);

  const handleAddToCart = async () => {
    if (!user) return alert("Please log in to add items to your cart.");
    try {
      const price = isWinner ? winningPrice : product.price;

      const res = await fetch(`${getBaseURL()}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          price: price,
          size: selectedSize,
        }), // Passing price along with productId and quantity
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

  const navigate = useNavigate();

  const handleBuyNow = () => {
    const quantity = 1;
    const totalPrice =
      (winner === currUserId ? winningPrice : product.price) * quantity;

    const orderedProduct = {
      productId: product._id, // ✅ keep _id as string
      quantity,
      size: selectedSize,
    };

    console.log({
      products: [orderedProduct],
      orderedProducts: [orderedProduct],
      totalPrice,
    });

    navigate("/choose-delivery", {
      state: {
        products: [orderedProduct],
        orderedProducts: [orderedProduct],
        totalPrice,
      },
    });
  };

  const handlePlaceBid = async () => {
    if (!user) return alert("You must log in to place a bid.");
    if (countdown === "⏰ Auction expired") return;
    if (!bidAmount || Number(bidAmount) <= 0)
      return alert("Please enter a valid bid amount.");

    try {
      setIsPlacingBid(true);
      const res = await fetch(
        `${getBaseURL()}/api/products/place-bid/${product._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ biddingPrice: Number(bidAmount) }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("✅ Bid placed successfully!");
        window.location.reload();
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong.");
    } finally {
      setIsPlacingBid(false);
    }
  };

  if (!product) return <p className="text-center">Loading product...</p>;

  const category = product.category || "";
  const isForSale = ["fashion", "electronics", "digital", "others"].includes(
    category
  );
  const isPreOwned = category === "pre-owned";
  const isLostFound = ["lost", "found"].includes(category);

  const currUserId = user?._id || "";
  // console.log("Selected Size:", selectedSize);

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
              <>
                <div className="text-sm font-semibold text-red-600 mb-2">
                  {countdown === "⏰ Auction expired"
                    ? "⚠️ This auction has ended"
                    : `⏳ Auction ends in: ${countdown}`}
                </div>

                {isWinner && winner === currUserId && (
                  <div className="text-sm font-semibold text-green-600 mb-2">
                    🎉 You are the highest bidder!
                  </div>
                )}

                {!isWinner && winner === currUserId && (
                  <div className="text-sm font-semibold text-gray-600 mb-2">
                    Highest Bid: ৳
                    {winningPrice ? winningPrice.toLocaleString() : "N/A"}
                  </div>
                )}
              </>
            )}

            {/* Action Buttons */}
            <div className="mt-6">
              {(isForSale || (winner !== null && winner === user._id)) && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex-1"
                  >
                    Add to Cart
                    {isWinner && (
                      <span className="ml-2 text-sm text-yellow-300">
                        at ৳{winningPrice.toLocaleString()}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex-1"
                  >
                    Buy Now
                    {isWinner && (
                      <span className="ml-2 text-sm text-yellow-300">
                        at ৳{winningPrice.toLocaleString()}
                      </span>
                    )}
                  </button>
                </div>
              )}

              {isPreOwned && winner && (
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter your bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 flex-1"
                    disabled={
                      countdown === "⏰ Auction expired" ||
                      isPlacingBid ||
                      isWinner
                    }
                  />
                  <button
                    onClick={handlePlaceBid}
                    disabled={
                      countdown === "⏰ Auction expired" ||
                      isPlacingBid ||
                      isWinner
                    }
                    className={`py-3 px-6 rounded-lg font-medium flex-1 ${
                      countdown === "⏰ Auction expired" ||
                      isPlacingBid ||
                      isWinner
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {countdown === "⏰ Auction expired" || isWinner
                      ? "Bidding Closed"
                      : isPlacingBid
                      ? "Placing..."
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

            {product.availableSizes?.length > 0 &&
              product.category === "fashion" && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Available Sizes
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {product.availableSizes.map((size) => (
                      <label
                        key={size}
                        className={`cursor-pointer px-3 py-1 border rounded-full text-sm transition-all
            ${
              selectedSize === size
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-800"
            }`}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          className="hidden"
                          onChange={() => setSelectedSize(size)}
                          checked={selectedSize === size}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
              )}

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {isLostFound ? "Reporter" : "Seller"} Information
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Name:</strong> {product.postedBy?.fullName || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {product.contact || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {product.postedBy?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bid History */}
        {product.bids
          ?.slice()
          .reverse()
          .map((bid, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-3 last:border-0"
            >
              <div>
                <span className="font-medium text-gray-900">
                  {bidUsers[bid.user]?.fullName || "Anonymous"}
                </span>
                <br />
                <span className="text-xs text-gray-500">
                  {bidUsers[bid.user]?.email || "N/A"}
                </span>
              </div>
              <span className="text-blue-600 font-semibold">
                ৳{bid.biddingPrice.toLocaleString()}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductDetailsCard;
