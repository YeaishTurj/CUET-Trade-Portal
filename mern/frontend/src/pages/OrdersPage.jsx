import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseURL } from "../utils/baseURL";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all user orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${getBaseURL()}/api/orders/user-orders`, {
        credentials: "include", // Include cookies with the request
      });
      const data = await res.json();
      if (res.ok) {
        // Populate the products with their details like title and imageURL
        const populatedOrders = await Promise.all(
          data.orders.map(async (order) => {
            // Fetch product details for each product in the order
            const productDetails = await Promise.all(
              order.products.map(async (product) => {
                const productRes = await fetch(
                  `${getBaseURL()}/api/products/${product.productId}`
                );
                const productData = await productRes.json();
                return productData;
              })
            );
            return { ...order, products: productDetails };
          })
        );
        setOrders(populatedOrders); // Set fetched orders with product details
      } else {
        alert("Failed to fetch orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("⚠️ Error fetching orders.");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(orders);

  // Cancel an order
  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch(
        `${getBaseURL()}/api/orders/cancel-order/${orderId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Order canceled successfully.");
        setOrders(orders.filter((order) => order.orderId !== orderId)); // Remove the canceled order from the list
      } else {
        alert(data.message || "Failed to cancel order.");
      }
    } catch (err) {
      console.error("Error canceling order:", err);
      alert("⚠️ Error canceling order.");
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when component mounts
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Orders</h2>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="border-b mb-4">
            <h3 className="text-gray-800">Order #{order.orderId}</h3>
            <p>Status: {order.status}</p>
            <p>Amount: ৳{order.amount}</p>
            <p>Delivery Option: {order.deliveryOption.replace("_", " ")}</p>

            <div className="mb-4">
              <h4 className="text-gray-800">Products:</h4>
              {order.products.map((product, productIndex) => (
                <div key={productIndex} className="flex items-center mb-2">
                  <img
                    src={product.imageURL}
                    alt={product.title}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <p>{product.title}</p>
                    <p>Quantity: {order.products[productIndex].quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {order.status === "processing" && (
              <button
                onClick={() => cancelOrder(order.orderId)}
                className="mt-2 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  );
};

export default OrdersPage;
