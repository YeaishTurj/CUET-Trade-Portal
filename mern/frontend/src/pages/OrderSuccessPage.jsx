import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the orderId from the previous page
  const { orderId } = location.state;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Success</h2>

      <div>
        <h3 className="text-gray-700">Thank you for your order!</h3>
        <p>Your order has been successfully placed.</p>
        <p className="mt-2 text-sm text-gray-600">Order ID: {orderId}</p>

        <div className="mt-4">
          <button
            onClick={() => window.location.href = '/'}
            className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
