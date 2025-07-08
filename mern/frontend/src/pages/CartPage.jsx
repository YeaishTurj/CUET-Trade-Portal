import React from "react";

const CartPage = () => {
  // Placeholder cart data (replace with context or props)
  const cartItems = []; // Example: [{ id: 1, title: 'Item', price: 500, quantity: 2, perWhich: 'piece', imageURL: '...' }]
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">🛒 Your Cart</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Review your selected items before proceeding to checkout. Make sure everything looks right!
          </p>
        </div>

        {/* If Cart is Empty */}
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Your cart is currently empty. Browse products and add items here.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageURL}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800">
                        {item.title}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {item.perWhich} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-blue-700 font-semibold text-lg">
                    ৳{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Order Summary
              </h2>
              <div className="flex justify-between text-lg mb-4">
                <span>Total</span>
                <span className="font-bold text-blue-700">৳{totalPrice}</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
