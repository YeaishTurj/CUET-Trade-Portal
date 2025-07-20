import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChooseDeliveryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the passed products and totalPrice from the previous page/modal
  const { products, orderedProducts, totalPrice } = location.state;

  console.log(orderedProducts, totalPrice);

  const handleDeliveryOption = (deliveryOption) => {
    // When the user selects the delivery option, navigate to the final order page or confirmation page
    navigate("/order-confirmation", {
      state: { products, orderedProducts, totalPrice, deliveryOption },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Choose Delivery Option
      </h2>

      {/* Display the products, sizes, and the total price */}
      <div className="mb-4">
        <h3 className="text-gray-700">Products in your order:</h3>
        {products.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div>
              {item.title} (Size: {item.size})
            </div>
            <div>৳{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
        <hr className="my-2" />
        <h3 className="text-gray-800">Total Price: ৳{totalPrice.toFixed(2)}</h3>
      </div>

      {/* Delivery options */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleDeliveryOption("home_delivery")}
          className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Home Delivery
        </button>
        <button
          onClick={() => handleDeliveryOption("collect_from_seller")}
          className="p-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Collect from Seller
        </button>
      </div>
    </div>
  );
};

export default ChooseDeliveryPage;
