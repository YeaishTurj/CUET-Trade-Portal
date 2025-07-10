// import React from "react";

// function ProductDetailsCard({ product }) {
//   if (!product) {
//     return (
//       <div>
//         <p>Product not found</p>
//       </div>
//     );
//   }

//   const isForSale = ["fashion", "electronics", "digital", "others"].includes(
//     product.category
//   );
//   const isLostFound = ["lost", "found"].includes(product.category);
//   const isPreOwned = product.category === "pre-owned";

//   return (
//     <section className="py-20 min-h-screen">
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between">
//           <div className="w-1/2">
//             <img
//               src={
//                 product.imageURL ||
//                 `https://via.placeholder.com/400?text=${encodeURIComponent(
//                   product.title
//                 )}`
//               }
//               alt={product.title}
//             />
//             {isForSale && (
//               <div className="flex justify-between">
//                 <button>Add to Cart</button>
//                 <button>Buy Now</button>
//               </div>
//             )}
//             {isPreOwned && (
//               <div className="flex">
//                 <input type="number" className="border"></input>
//                 <button>Place a Bid</button>
//               </div>
//             )}
//           </div>
//           <div className="w-1/2 flex flex-col ">
//             <p>Catagory: {product.category}</p>
//             <h2>{product.title}</h2>
//             {product.price && (
//               <p>
//                 Price: ৳{product.price.toLocaleString()}
//                 {product.perWhich && ` per ${product.perWhich}`}
//               </p>
//             )}
//             {product.features && (
//               <div>
//                 <h2>Features:</h2>
//                 <ul>
//                   {product.features?.map((feature, index) => (
//                     <li key={index}>{feature}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {isLostFound && (
//               <div>
//                 <h2>Description:</h2>
//                 <p>
//                   {Array.isArray(product.description)
//                     ? product.description.join(" ")
//                     : product.description}
//                 </p>
//                 <p>
//                   <span>Location:</span> {product.location}
//                 </p>
//               </div>
//             )}
//             {product.availableSizes && (
//               <div className="flex flex-col gap-2">
//                 <h2>Available Sizes:</h2>
//                 <div>
//                   {product.availableSizes.map((size) => (
//                     <label key={size}>
//                       <input
//                         type="radio"
//                         name="size"
//                         value={size}
//                         className="form-radio text-blue-600"
//                       />
//                       {size}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div>
//               <h2>{product.seller ? "Seller" : "Reporter"} Information:</h2>
//               <p>
//                 <span>Name:</span> {product.seller || product.reporter}
//               </p>
//               <p>
//                 <span>Phone:</span> {product.contact}
//               </p>
//             </div>
//           </div>
//         </div>
//         {isForSale && (
//           <div className="flex flex-col">
//             <h2 className="text-center">Description:</h2>
//             <p className="text-justify">
//               {Array.isArray(product.description)
//                 ? product.description.join(" ")
//                 : product.description}
//             </p>
//           </div>
//         )}
//         {isPreOwned && (
//           <div className="flex justify-between gap-4">
//             <div>
//               <h2 className="flex justify-center">Description:</h2>
//               <p>
//                 {Array.isArray(product.description)
//                   ? product.description.join(" ")
//                   : product.description}
//               </p>
//             </div>
//             <div>
//               <h2>Placed Bids</h2>
//               {product.bids.length > 0 ? (
//                 product.bids.map((bid, index) => (
//                   <div key={index}>
//                     <span>{bid.user}</span>
//                     <span>৳{bid.biddingPrice.toLocaleString()}</span>
//                   </div>
//                 ))
//               ) : (
//                 <p>No bids yet. Be the first to bid!</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default ProductDetailsCard;

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";

function ProductDetailsCard({ product }) {
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

  const isForSale = ["fashion", "electronics", "digital", "others"].includes(
    product.category
  );
  const isLostFound = ["lost", "found"].includes(product.category);
  const isPreOwned = product.category === "pre-owned";

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="py-12 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image Section */}
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

            {/* Action Buttons */}
            <div className="mt-6">
              {isForSale && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
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
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="number"
                    className="border border-gray-300 rounded-lg px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your bid amount"
                  />
                  <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex-1">
                    Place a Bid
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                {product.title}
              </h1>

              {product.price && (
                <div className="mt-4">
                  <p className="text-xl font-semibold text-gray-800">
                    Price: ৳{product.price.toLocaleString()}
                    {product.perWhich && (
                      <span className="text-sm text-gray-600">
                        {" "}
                        per {product.perWhich}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Features
                </h2>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lost & Found Details */}
            {isLostFound && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <p className="text-gray-700">
                  {Array.isArray(product.description)
                    ? product.description.join(" ")
                    : product.description}
                </p>
                <p className="mt-2">
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  <span className="text-gray-700">{product.location}</span>
                </p>
              </div>
            )}

            {/* Available Sizes */}
            {product.availableSizes && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Available Sizes
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.availableSizes.map((size) => (
                    <label
                      key={size}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Seller/Reporter Information */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {product.seller ? "Seller" : "Reporter"} Information
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-900">Name:</span>{" "}
                  <span className="text-gray-700">
                    {product.seller || product.reporter}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Phone:</span>{" "}
                  <span className="text-gray-700">{product.contact}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Description Sections */}
        {isForSale && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Product Description
            </h2>
            <p className="text-gray-700 text-justify">
              {Array.isArray(product.description)
                ? product.description.join(" ")
                : product.description}
            </p>
          </div>
        )}

        {isPreOwned && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Description
              </h2>
              <p className="text-gray-700">
                {Array.isArray(product.description)
                  ? product.description.join(" ")
                  : product.description}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Placed Bids
              </h2>
              {product.bids.length > 0 ? (
                <div className="space-y-4">
                  {product.bids.map((bid, index) => (
                    <div
                      key={index}
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
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition duration-200">
                    Place First Bid
                  </button>
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
