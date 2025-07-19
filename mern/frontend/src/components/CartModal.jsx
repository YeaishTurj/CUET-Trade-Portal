import React, { useEffect, useState } from "react";
import { FaWindowClose, FaTrash, FaShoppingCart, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { getBaseURL } from "../utils/baseURL"; // Ensure this function returns the correct API URL

const CartModal = ({ isOpen, onClose, cartRef }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const res = await fetch(`${getBaseURL()}/api/auth/me`, {
        credentials: "include", // Ensure the session or cookie is sent with the request
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data); // Set user data if the response is OK
      } else {
        alert("Failed to load user data. Please log in.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      alert("⚠️ Error fetching user data.");
    }
  };

  // Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Fetch cart items when modal opens and user is available
  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const res = await fetch(`${getBaseURL()}/api/cart/${user._id}`); // Fetch cart items using user._id
      const data = await res.json();

      if (res.ok) {
        setCartItems(data.items); // Update state with cart items
      } else {
        alert("Error fetching cart items.");
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      alert("⚠️ Error fetching cart items.");
    }
  };

  console.log("User:", user); // Debugging line to check user data
  console.log("Cart items:", cartItems); // Debugging line to check cart items

  useEffect(() => {
    if (isOpen && user) {
      fetchCartItems(); // Fetch cart items when modal opens and user is available
    }
  }, [isOpen, user]);

  // Handle removing an item from the cart
  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch(`/api/cart/remove/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        // Optimistically update the cart state after removing the item
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== productId)
        );
      } else {
        alert("Failed to remove item.");
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Handle quantity update
  const handleQuantityChange = async (productId, action) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        if (action === "increase") {
          item.quantity += 1;
        } else if (action === "decrease" && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });

    // Optimistically update the frontend
    setCartItems(updatedCartItems);

    // Send the updated cart to the backend
    try {
      const res = await fetch(`/api/update-cart/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: updatedCartItems }),
      });

      if (!res.ok) {
        throw new Error("Failed to update cart");
      }
      // If everything is OK, the cart state is already updated
    } catch (err) {
      console.error("Error updating cart:", err);
      alert("⚠️ Error updating cart.");
      // Revert to previous cart state if the update fails
      fetchCartItems();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[1000] bg-black/50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={cartRef}
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaShoppingCart className="text-blue-600" /> Your Cart
            </h4>
            <button
              className="text-gray-500 hover:text-red-500 text-2xl"
              onClick={onClose}
              aria-label="Close cart"
            >
              <FaWindowClose />
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div className="flex items-center">
                    <img
                      src={item.product.imageURL}
                      alt={item.product.title}
                      className="w-16 h-16 object-contain"
                    />
                    <div className="ml-4">
                      <h5 className="font-semibold">{item.product.title}</h5>
                      <p className="text-sm text-gray-500">৳{item.price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, "decrease")
                          }
                          className="text-gray-500"
                        >
                          <FaMinusCircle />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, "increase")
                          }
                          className="text-gray-500"
                        >
                          <FaPlusCircle />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
