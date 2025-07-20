// import React, { useEffect, useState } from "react";
// import { getBaseURL } from "../utils/baseURL";

// const OrdersPageSeller = () => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch seller's orders
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch(`${getBaseURL()}/api/orders/seller-orders`, {
//           credentials: "include", // Include cookies with the request
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setOrders(data.orders); // Set orders fetched from the server
//         } else {
//           console.error("Failed to fetch orders:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Update order status (delivered or canceled)
//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       const res = await fetch(
//         `${getBaseURL()}/api/orders/update-order/${orderId}`,
//         {
//           method: "PATCH",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status }),
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         alert("Order status updated successfully.");
//         // Update the orders array with the new status
//         setOrders(
//           orders.map((order) =>
//             order.orderId === orderId ? { ...order, status } : order
//           )
//         );
//       } else {
//         alert(data.message || "Failed to update order status.");
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       alert("⚠️ Error updating order status.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold text-gray-800">Manage My Orders</h2>

//       {isLoading ? (
//         <p>Loading orders...</p>
//       ) : orders.length > 0 ? (
//         orders.map((order) => (
//           <div key={order.orderId} className="border-b mb-4 pb-4">
//             <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
//             <p>Status: {order.status}</p>
//             <p>Amount: ৳{order.amount}</p>

//             {/* Display delivery option and shipping address if home delivery */}
//             {order.deliveryOption === "home_delivery" ? (
//               <div className="mt-2">
//                 <h4 className="text-md font-semibold">Delivery Option: Home Delivery</h4>
//                 <p className="text-gray-600">Shipping Address: {order.shippingAddress}</p>
//               </div>
//             ) : (
//               <div className="mt-2">
//                 <h4 className="text-md font-semibold">Delivery Option: Pickup</h4>
//               </div>
//             )}

//             <div className="mb-4">
//               <h4 className="text-md font-semibold">Products:</h4>
//               {order.products.map((product, index) => (
//                 <div key={index}>
//                   <p>
//                     {product.title} - {product.size} x {product.quantity}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Button to update order status */}
//             <div className="flex gap-4">
//               {/* Conditionally render buttons and status text */}
//               {order.status !== "delivered" && order.status !== "canceled" ? (
//                 <>
//                   <button
//                     onClick={() => updateOrderStatus(order.orderId, "delivered")}
//                     className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                   >
//                     Mark as Delivered
//                   </button>

//                   <button
//                     onClick={() => updateOrderStatus(order.orderId, "canceled")}
//                     className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                   >
//                     Cancel Order
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   {/* Show status text if order is delivered or canceled */}
//                   <p className="text-gray-600 mt-2">
//                     {order.status === "delivered" ? "Order has been delivered" : "Order has been canceled"}
//                   </p>

//                   {/* Disable both buttons if status is delivered or canceled */}
//                   <button
//                     disabled
//                     className="p-2 bg-green-300 text-white rounded-md"
//                   >
//                     Mark as Delivered
//                   </button>

//                   <button
//                     disabled
//                     className="p-2 bg-red-300 text-white rounded-md"
//                   >
//                     Cancel Order
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default OrdersPageSeller;

import React, { useEffect, useState } from "react";
import { getBaseURL } from "../utils/baseURL";

const OrdersPageSeller = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch seller's orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${getBaseURL()}/api/orders/seller-orders`, {
          credentials: "include", // Include cookies with the request
        });
        const data = await res.json();
        if (res.ok) {
          const ordersWithBuyerInfo = await Promise.all(
            data.orders.map(async (order) => {
              // Fetch buyer's information using order.userId (buyer ID)
              const buyerRes = await fetch(
                `${getBaseURL()}/api/auth/users/${order.userId}`,
                { credentials: "include" }
              );
              const buyerData = await buyerRes.json();

              return {
                ...order,
                buyerInfo: buyerData, // Add buyer's info to each order
              };
            })
          );
          setOrders(ordersWithBuyerInfo); // Set orders with buyer info
        } else {
          console.error("Failed to fetch orders:", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status (delivered or canceled)
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `${getBaseURL()}/api/orders/update-order/${orderId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Order status updated successfully.");
        // Update the orders array with the new status
        setOrders(
          orders.map((order) =>
            order.orderId === orderId ? { ...order, status } : order
          )
        );
      } else {
        alert(data.message || "Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("⚠️ Error updating order status.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800">Manage My Orders</h2>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} className="border-b mb-4 pb-4">
            <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
            <p>Status: {order.status}</p>
            <p>Amount: ৳{order.amount}</p>

            {/* Display delivery option and shipping address if home delivery */}
            {order.deliveryOption === "home_delivery" ? (
              <div className="mt-2">
                <h4 className="text-md font-semibold">Delivery Option: Home Delivery</h4>
                <p className="text-gray-600">Shipping Address: {order.shippingAddress}</p>
              </div>
            ) : (
              <div className="mt-2">
                <h4 className="text-md font-semibold">Delivery Option: Pickup</h4>
              </div>
            )}

            {/* Display User Info (Buyer Info) */}
            <div className="mt-2">
              <h4 className="text-md font-semibold">Buyer Information</h4>
              <p className="text-gray-600">Full Name: {order.buyerInfo?.fullName}</p>
              <p className="text-gray-600">Email: {order.buyerInfo?.email}</p>
              <p className="text-gray-600">Contact Number: {order.buyerInfo?.contactNumber}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold">Products:</h4>
              {order.products.map((product, index) => (
                <div key={index} className="flex gap-4 mb-2">
                  <img
                    src={product.imageURL || "/path/to/fallback-image.jpg"} // Fallback image if imageURL is missing
                    alt={product.title}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <p>{product.title}</p>
                    <p>Size: {product.size}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button to update order status */}
            <div className="flex gap-4">
              {/* Conditionally render buttons and status text */}
              {order.status !== "delivered" && order.status !== "canceled" ? (
                <>
                  <button
                    onClick={() => updateOrderStatus(order.orderId, "delivered")}
                    className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Mark as Delivered
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.orderId, "canceled")}
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                </>
              ) : (
                <>
                  {/* Show status text if order is delivered or canceled */}
                  <p className="text-gray-600 mt-2">
                    {order.status === "delivered" ? "Order has been delivered" : "Order has been canceled"}
                  </p>

                  {/* Disable both buttons if status is delivered or canceled */}
                  <button
                    disabled
                    className="p-2 bg-green-300 text-white rounded-md"
                  >
                    Mark as Delivered
                  </button>

                  <button
                    disabled
                    className="p-2 bg-red-300 text-white rounded-md"
                  >
                    Cancel Order
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPageSeller;
