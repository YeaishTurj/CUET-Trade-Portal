import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBaseURL } from "../utils/baseURL";
import { useEffect } from "react";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reload protection
  if (!location.state) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-red-600">
          ❌ No order details found. Please return to the cart.
        </h2>
        <button
          onClick={() => navigate("/cart")}
          className="mt-4 p-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Go to Cart
        </button>
      </div>
    );
  }

  const { products, orderedProducts, totalPrice, deliveryOption } =
    location.state;
  const deliveryCharge = deliveryOption === "home_delivery" ? 50 : 0;
  const finalTotalPrice = totalPrice + deliveryCharge;

  //   console.log(
  //     orderedProducts,
  //     totalPrice,
  //     deliveryOption,
  //     deliveryCharge,
  //     finalTotalPrice
  //   );

  const [user, setUser] = useState(null);

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

  useEffect(() => {
    fetchUser(); // Fetch user data on component mount
  }, []);

  const handleConfirmOrder = () => {
    setIsSubmitting(true);

    fetch(`${getBaseURL()}/api/orders/create-order`, {
      method: "POST",
      credentials: "include", // Include cookies for authentication
      headers: {
        "Content-Type": "application/json", // ✅ Add this!
      },
      body: JSON.stringify({
        products: orderedProducts,
        deliveryOption,
        amount: finalTotalPrice,
        shippingAddress:
          deliveryOption === "home_delivery" ? user?.address : "",
        status: "processing",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("🎉 Order Confirmed! Thank you for your purchase.");
        navigate("/order-success", { state: { orderId: data.orderId } });
      })
      .catch((error) => {
        alert("❌ Something went wrong, please try again.");
        console.error("Error confirming order:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // console.log(
  //   JSON.stringify({
  //     products: orderedProducts,
  //     deliveryOption,
  //     amount: finalTotalPrice, // Send the final total price as amount
  //     shippingAddress: deliveryOption === "home_delivery" ? user?.address : "", // Optional, used for home delivery only
  //     status: "processing", // Default order status
  //   })
  // );

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Order Confirmation
      </h2>

      <div className="mb-4">
        <h3 className="text-gray-700">🧾 Review Your Order:</h3>
        {products.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div>
              {item.title} (x{item.quantity}){" "}
              {item.size ? `(Size: ${item.size})` : ""}
            </div>
            <div>৳{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
        <hr className="my-2" />
        <h3 className="text-gray-800">Subtotal: ৳{totalPrice.toFixed(2)}</h3>
      </div>

      {deliveryOption === "home_delivery" && (
        <div className="mb-4">
          <h3 className="text-gray-700">🚚 Delivery Charge: ৳50</h3>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-gray-800">
          💰 Final Total: ৳{finalTotalPrice.toFixed(2)}
        </h3>
      </div>

      <div className="mb-4">
        <h3 className="text-gray-700">
          🏠 Delivery Option: {deliveryOption.replace("_", " ")}
        </h3>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleConfirmOrder}
          disabled={isSubmitting}
          className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "✅ Confirm Order"}
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="p-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          🛒 Edit Cart
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
