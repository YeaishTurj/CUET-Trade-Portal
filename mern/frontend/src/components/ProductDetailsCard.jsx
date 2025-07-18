// import React from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/features/cart/cartSlice";
// import { useGetSignedInUserQuery } from "../redux/features/auth/authApi";
// import { getBaseURL } from "../utils/baseURL";
// import { useEffect, useState } from "react";

// function ProductDetailsCard({ product }) {
//   const dispatch = useDispatch();
//   const { data: user, isLoading } = useGetSignedInUserQuery();

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-white p-8 rounded-lg shadow-md text-center">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Product not found
//           </h2>
//           <p className="text-gray-600 mt-2">
//             The requested product could not be located.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const category = product.category || "";
//   const isForSale = ["fashion", "electronics", "digital", "others"].includes(
//     category
//   );
//   const isLostFound = ["lost", "found"].includes(category);
//   const isPreOwned = category === "pre-owned";
//   const [bidUsers, setBidUsers] = useState({});

//   const handleAddToCart = async () => {
//     if (!user) return alert("Please log in to add items to your cart.");

//     try {
//       const res = await fetch(`${getBaseURL()}/api/cart/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ productId: product._id, quantity: 1 }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         dispatch(addToCart({ ...product, id: product._id }));
//         alert("✅ Added to cart!");
//       } else {
//         alert(data.message || "❌ Failed to add to cart.");
//       }
//     } catch (err) {
//       console.error("Failed to add to cart:", err);
//       alert("⚠️ Network error.");
//     }
//   };

//   const postedBy = typeof product.postedBy === "object" ? product.postedBy : {};
//   const name = postedBy?.fullName || "N/A";
//   const contact = postedBy?.contactNumber || product.contact || "N/A";
//   const email = postedBy?.email || "N/A";

//   const [countdown, setCountdown] = useState("");

//   useEffect(() => {
//     if (!product.expiresAt || product.category !== "pre-owned") return;

//     const targetTime = new Date(product.expiresAt);

//     const interval = setInterval(() => {
//       const now = new Date();
//       const diff = targetTime - now;

//       if (diff <= 0) {
//         setCountdown("⏰ Auction expired");
//         clearInterval(interval);
//         return;
//       }

//       const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
//       const m = Math.floor((diff / (1000 * 60)) % 60);
//       const s = Math.floor((diff / 1000) % 60);

//       setCountdown(`${d}d ${h}h ${m}m ${s}s`);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [product.expiresAt, product.category]);

//   const [bidAmount, setBidAmount] = useState("");
//   const [isPlacingBid, setIsPlacingBid] = useState(false);

//   useEffect(() => {
//     if (!product?.bids?.length) return;

//     const fetchBidUsers = async () => {
//       const uniqueUserIds = [...new Set(product.bids.map((b) => b.user))];

//       const results = {};
//       await Promise.all(
//         uniqueUserIds.map(async (userId) => {
//           try {
//             const res = await fetch(`${getBaseURL()}/api/auth/users/${userId}`);
//             const data = await res.json();
//             if (res.ok) results[userId] = data;
//           } catch (err) {
//             console.error(`Failed to fetch user ${userId}`, err);
//           }
//         })
//       );

//       setBidUsers(results);
//     };

//     fetchBidUsers();
//   }, [product.bids]);

//   return (
//     <section className="py-12 min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Product Image + Action */}
//           <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
//             <div className="aspect-w-1 aspect-h-1 mb-6">
//               <img
//                 src={
//                   product.imageURL ||
//                   `https://via.placeholder.com/600?text=${encodeURIComponent(
//                     product.title
//                   )}`
//                 }
//                 alt={product.title}
//                 className="w-full h-auto object-contain rounded-lg"
//               />
//             </div>

//             {isPreOwned && (
//               <div className="text-sm font-semibold text-red-600 mb-2">
//                 {countdown
//                   ? countdown === "⏰ Auction expired"
//                     ? "⚠️ This auction has ended"
//                     : `⏳ Auction ends in: ${countdown}`
//                   : "⏳ Calculating time..."}
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="mt-6">
//               {isForSale && (
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <button
//                     onClick={handleAddToCart}
//                     className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex-1"
//                   >
//                     Add to Cart
//                   </button>
//                   <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex-1">
//                     Buy Now
//                   </button>
//                 </div>
//               )}

//               {isPreOwned && (
//                 <div className="flex flex-col sm:flex-row gap-4 mt-4">
//                   <input
//                     type="number"
//                     min="1"
//                     placeholder="Enter your bid amount"
//                     value={bidAmount}
//                     onChange={(e) => setBidAmount(e.target.value)}
//                     className="border border-gray-300 rounded-lg px-4 py-3 flex-1"
//                     disabled={
//                       countdown === "⏰ Auction expired" || isPlacingBid
//                     }
//                   />
//                   <button
//                     onClick={async () => {
//                       if (!user)
//                         return alert("You must log in to place a bid.");
//                       if (countdown === "⏰ Auction expired") return;

//                       if (!bidAmount || Number(bidAmount) <= 0) {
//                         return alert("Please enter a valid bid amount.");
//                       }

//                       try {
//                         setIsPlacingBid(true);
//                         const res = await fetch(
//                           `${getBaseURL()}/api/products/place-bid/${
//                             product._id
//                           }`,
//                           {
//                             method: "POST",
//                             headers: { "Content-Type": "application/json" },
//                             credentials: "include",
//                             body: JSON.stringify({
//                               biddingPrice: Number(bidAmount),
//                             }),
//                           }
//                         );

//                         const data = await res.json();
//                         if (res.ok) {
//                           alert("✅ Bid placed successfully!");
//                           window.location.reload(); // or trigger a re-fetch if you have query
//                         } else {
//                           alert(`❌ ${data.message}`);
//                         }
//                       } catch (err) {
//                         console.error(err);
//                         alert("⚠️ Something went wrong.");
//                       } finally {
//                         setIsPlacingBid(false);
//                       }
//                     }}
//                     disabled={
//                       countdown === "⏰ Auction expired" || isPlacingBid
//                     }
//                     className={`py-3 px-6 rounded-lg font-medium flex-1 ${
//                       countdown === "⏰ Auction expired" || isPlacingBid
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-purple-600 hover:bg-purple-700 text-white"
//                     }`}
//                   >
//                     {countdown === "⏰ Auction expired"
//                       ? "Bidding Closed"
//                       : isPlacingBid
//                       ? "Placing..."
//                       : "Place a Bid"}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
//             <div className="mb-6">
//               <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
//                 {category}
//               </span>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
//                 {product.title}
//               </h1>

//               {product.price && (
//                 <p className="text-xl font-semibold text-gray-800 mt-4">
//                   Price: ৳{product.price.toLocaleString()}
//                   {product.perWhich && (
//                     <span className="text-sm text-gray-600">
//                       {" "}
//                       per {product.perWhich}
//                     </span>
//                   )}
//                 </p>
//               )}
//             </div>

//             {/* Features */}
//             {product.features?.length > 0 && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                   Features
//                 </h2>
//                 <ul className="list-disc pl-5 space-y-1">
//                   {product.features.map((feature, i) => (
//                     <li key={i} className="text-gray-700">
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Lost/Found Info */}
//             {isLostFound && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                   Description
//                 </h2>
//                 <p className="text-gray-700">{product.description}</p>
//                 {product.location && (
//                   <p className="mt-2">
//                     <span className="font-medium text-gray-900">Location:</span>{" "}
//                     <span className="text-gray-700">{product.location}</span>
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Sizes */}
//             {product.availableSizes?.length > 0 && (
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-3">
//                   Available Sizes
//                 </h2>
//                 <div className="flex flex-wrap gap-3">
//                   {product.availableSizes.map((size) => (
//                     <span
//                       key={size}
//                       className="px-3 py-1 border rounded-full bg-gray-100 text-gray-800 text-sm"
//                     >
//                       {size}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Seller Info */}
//             <div className="border-t pt-6">
//               <h2 className="text-lg font-semibold text-gray-900 mb-3">
//                 {isLostFound ? "Reporter" : "Seller"} Information
//               </h2>
//               <div className="space-y-2 text-sm text-gray-700">
//                 <p>
//                   <strong>Name:</strong> {name}
//                 </p>
//                 <p>
//                   <strong>Phone:</strong> {contact}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {email}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Product Description */}
//         {isForSale && (
//           <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//               Product Description
//             </h2>
//             <p className="text-gray-700 text-justify">{product.description}</p>
//           </div>
//         )}

//         {/* Pre-owned Bid Display */}
//         {product.bids
//           .slice()
//           .reverse()
//           .map((bid, i) => (
//             <div
//               key={i}
//               className="flex justify-between items-center border-b pb-3 last:border-0"
//             >
//               <div>
//                 <span className="font-medium text-gray-900">
//                   {bidUsers[bid.user]?.fullName || "Anonymous"}
//                 </span>
//                 <br />
//                 <span className="text-xs text-gray-500">
//                   {bidUsers[bid.user]?.email || "N/A"}
//                 </span>
//               </div>
//               <span className="text-blue-600 font-semibold">
//                 ৳{bid.biddingPrice.toLocaleString()}
//               </span>
//             </div>
//           ))}
//       </div>
//     </section>
//   );
// }

// export default ProductDetailsCard;





// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   useFetchProductByIdQuery,
//   usePlaceBidMutation,
// } from "../redux/features/products/productsApi";
// import { useSelector } from "react-redux";

// const ProductDetailsCard = () => {
//   const { id } = useParams();
//   const { user } = useSelector((state) => state.auth);
//   const { data: product, isLoading, error, refetch } = useFetchProductByIdQuery(id);
//   const [placeBid] = usePlaceBidMutation();

//   const [bidAmount, setBidAmount] = useState("");
//   const [countdown, setCountdown] = useState("");
//   const [hasExpired, setHasExpired] = useState(false);

//   useEffect(() => {
//     if (product?.expiresAt) {
//       const timer = setInterval(() => {
//         const diff = new Date(product.expiresAt) - new Date();
//         if (diff <= 0) {
//           setHasExpired(true);
//           setCountdown("Auction expired");
//           clearInterval(timer);
//         } else {
//           const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const m = Math.floor((diff / 1000 / 60) % 60);
//           const s = Math.floor((diff / 1000) % 60);
//           setCountdown(`${d}d ${h}h ${m}m ${s}s`);
//         }
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [product]);

//   const handlePlaceBid = async () => {
//     if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
//       return alert("❌ Enter a valid bid amount");
//     }

//     try {
//       await placeBid({ id: product._id, biddingPrice: parseFloat(bidAmount) }).unwrap();
//       alert("✅ Bid placed successfully");
//       setBidAmount("");
//       refetch();
//     } catch (err) {
//       alert(err?.data?.message || "❌ Failed to place bid");
//     }
//   };

//   if (isLoading) return <p>Loading product...</p>;
//   if (error || !product) return <p>Error loading product.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Image & Title */}
//         <div>
//           <img
//             src={product.imageURL || "/placeholder.jpg"}
//             alt={product.title}
//             className="w-full h-64 object-contain rounded"
//           />
//           <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
//           <p className="text-sm text-gray-500 mt-1 capitalize">
//             Category: {product.category}
//           </p>
//         </div>

//         {/* Details */}
//         <div>
//           {product.description && (
//             <p className="mb-4 text-gray-700">{product.description}</p>
//           )}

//           {["fashion", "digital", "electronics", "others", "pre-owned"].includes(
//             product.category
//           ) && (
//             <>
//               <p className="text-lg font-semibold">
//                 Price: ৳{product.price} / {product.perWhich}
//               </p>
//               {product.features?.length > 0 && (
//                 <p className="mt-2 text-sm">
//                   Features: {product.features.join(", ")}
//                 </p>
//               )}
//               {product.availableSizes?.length > 0 && (
//                 <p className="text-sm">
//                   Sizes: {product.availableSizes.join(", ")}
//                 </p>
//               )}
//             </>
//           )}

//           {["lost", "found"].includes(product.category) && (
//             <p className="text-lg mt-2">
//               📍 Location {product.category === "lost" ? "Lost" : "Found"}: {" "}
//               <span className="font-semibold">{product.location}</span>
//             </p>
//           )}

//           {/* Auction Section */}
//           {product.category === "pre-owned" && (
//             <div className="mt-6 bg-gray-100 p-4 rounded">
//               <h2 className="text-lg font-semibold mb-2">⏳ Auction Info</h2>
//               <p>
//                 Ends in: {" "}
//                 <span className="font-mono text-blue-600">{countdown}</span>
//               </p>
//               {hasExpired ? (
//                 <p className="text-red-600 font-semibold mt-2">
//                   🚫 This auction has ended
//                 </p>
//               ) : (
//                 <>
//                   <div className="mt-4 flex gap-2">
//                     <input
//                       type="number"
//                       value={bidAmount}
//                       onChange={(e) => setBidAmount(e.target.value)}
//                       placeholder="Your bid (৳)"
//                       className="border px-3 py-2 rounded w-1/2"
//                     />
//                     <button
//                       onClick={handlePlaceBid}
//                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                       Place Bid
//                     </button>
//                   </div>
//                   {product.bids?.length > 0 && (
//                     <p className="text-sm mt-2">
//                       🏷 Highest Bid: ৳
//                       {
//                         [...product.bids]
//                           .sort((a, b) => b.biddingPrice - a.biddingPrice)[0]
//                           .biddingPrice
//                       }
//                     </p>
//                   )}
//                 </>
//               )}
//             </div>
//           )}

//           {/* Seller Info */}
//           <div className="mt-6 text-sm text-gray-600">
//             <p>
//               👤 Seller: {" "}
//               <span className="font-semibold">
//                 {product.postedBy?.fullName || "N/A"}
//               </span>
//             </p>
//             <p>
//               📞 Contact: {" "}
//               <span className="font-semibold">
//                 {product.contact || product.postedBy?.contactNumber || "Not listed"}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsCard;


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useGetSignedInUserQuery } from "../redux/features/auth/authApi";
import { getBaseURL } from "../utils/baseURL";
import { useParams } from "react-router-dom";

const ProductDetailsCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: user } = useGetSignedInUserQuery();
  const [product, setProduct] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [bidUsers, setBidUsers] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${getBaseURL()}/api/products/${id}`);
        const data = await res.json();
        if (res.ok) setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

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

  if (!product) return <p className="text-center">Loading product...</p>;

  const category = product.category || "";
  const isForSale = ["fashion", "electronics", "digital", "others"].includes(category);
  const isLostFound = ["lost", "found"].includes(category);
  const isPreOwned = category === "pre-owned";

  const postedBy = typeof product.postedBy === "object" ? product.postedBy : {};
  const name = postedBy?.fullName || "N/A";
  const contact = postedBy?.contactNumber || product.contact || "N/A";
  const email = postedBy?.email || "N/A";

  return (
    <section className="py-12 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image + Action */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <div className="aspect-w-1 aspect-h-1 mb-6">
              <img
                src={product.imageURL || `https://via.placeholder.com/600?text=${encodeURIComponent(product.title)}`}
                alt={product.title}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            {isPreOwned && (
              <div className="text-sm font-semibold text-red-600 mb-2">
                {countdown === "⏰ Auction expired" ? "⚠️ This auction has ended" : `⏳ Auction ends in: ${countdown}`}
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
                    min="1"
                    placeholder="Enter your bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 flex-1"
                    disabled={countdown === "⏰ Auction expired" || isPlacingBid}
                  />
                  <button
                    onClick={async () => {
                      if (!user) return alert("You must log in to place a bid.");
                      if (countdown === "⏰ Auction expired") return;
                      if (!bidAmount || Number(bidAmount) <= 0) return alert("Please enter a valid bid amount.");
                      try {
                        setIsPlacingBid(true);
                        const res = await fetch(`${getBaseURL()}/api/products/place-bid/${product._id}`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          credentials: "include",
                          body: JSON.stringify({ biddingPrice: Number(bidAmount) }),
                        });
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
                    }}
                    disabled={countdown === "⏰ Auction expired" || isPlacingBid}
                    className={`py-3 px-6 rounded-lg font-medium flex-1 ${countdown === "⏰ Auction expired" || isPlacingBid ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
                  >
                    {countdown === "⏰ Auction expired" ? "Bidding Closed" : isPlacingBid ? "Placing..." : "Place a Bid"}
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
                    <span className="text-sm text-gray-600"> per {product.perWhich}</span>
                  )}
                </p>
              )}
            </div>

            {product.features?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Features</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, i) => (
                    <li key={i} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {isLostFound && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
                {product.location && (
                  <p className="mt-2">
                    <span className="font-medium text-gray-900">Location:</span> <span className="text-gray-700">{product.location}</span>
                  </p>
                )}
              </div>
            )}

            {product.availableSizes?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Available Sizes</h2>
                <div className="flex flex-wrap gap-3">
                  {product.availableSizes.map((size) => (
                    <span key={size} className="px-3 py-1 border rounded-full bg-gray-100 text-gray-800 text-sm">{size}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {isLostFound ? "Reporter" : "Seller"} Information
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Phone:</strong> {contact}</p>
                <p><strong>Email:</strong> {email}</p>
              </div>
            </div>
          </div>
        </div>

        {isForSale && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Product Description</h2>
            <p className="text-gray-700 text-justify">{product.description}</p>
          </div>
        )}

        {product.bids?.slice().reverse().map((bid, i) => (
          <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0">
            <div>
              <span className="font-medium text-gray-900">{bidUsers[bid.user]?.fullName || "Anonymous"}</span>
              <br />
              <span className="text-xs text-gray-500">{bidUsers[bid.user]?.email || "N/A"}</span>
            </div>
            <span className="text-blue-600 font-semibold">৳{bid.biddingPrice.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetailsCard;
