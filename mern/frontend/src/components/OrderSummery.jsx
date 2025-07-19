import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaShoppingBasket,
  FaMoneyBillWave,
  FaTruck,
  FaTrashAlt,
  FaArrowRight,
} from "react-icons/fa";
import { clearCart } from "../redux/features/cart/cartSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { selectedItems, totalPrice } = useSelector((store) => store.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="mt-6 rounded-lg bg-gray-50 shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4 flex items-center gap-2">
        <FaShoppingBasket className="text-blue-600" /> Order Summary
      </h2>

      <div className="text-gray-700 space-y-3">
        <p className="flex items-center gap-2">
          <FaShoppingBasket /> Selected Items:{" "}
          <span className="font-medium">{selectedItems}</span>
        </p>

        <hr className="my-3 border-gray-200" />
        <p className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FaMoneyBillWave /> Total: ৳{totalPrice.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 pt-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClearCart();
          }}
          className="w-full md:w-1/2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition flex items-center justify-center gap-2"
        >
          <FaTrashAlt /> Clear Cart
        </button>
        <Link
          to="/checkout"
          className="w-full md:w-1/2 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          Proceed <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
