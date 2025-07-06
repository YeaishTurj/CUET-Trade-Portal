import React, { useState } from "react";
import products from "../data/products";
import ProductCards from "../components/ProductCards";

function LostFoundProductsPage() {
  const LOST_COUNT = 4;
  const FOUND_COUNT = 4;

  const lostItems = products.filter((p) => p.category === "lost");
  const foundItems = products.filter((p) => p.category === "found");

  const [visibleLost, setVisibleLost] = useState(LOST_COUNT);
  const [visibleFound, setVisibleFound] = useState(FOUND_COUNT);

  const handleViewMoreLost = () => {
    setVisibleLost((prev) => prev + LOST_COUNT);
  };

  const handleViewMoreFound = () => {
    setVisibleFound((prev) => prev + FOUND_COUNT);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
            Lost & Found Items
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            🧭 Reconnect with your belongings — report or recover lost items around campus.
          </p>
        </div>

        {/* LOST Section */}
        {lostItems.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-red-700 mb-6">🚨 Lost Items</h2>
            <ProductCards products={lostItems.slice(0, visibleLost)} categories={["lost"]} />

            {visibleLost < lostItems.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleViewMoreLost}
                  className="px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  View More Lost Items
                </button>
              </div>
            )}
          </div>
        )}

        {/* FOUND Section */}
        {foundItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-6">🟢 Found Items</h2>
            <ProductCards products={foundItems.slice(0, visibleFound)} categories={["found"]} />

            {visibleFound < foundItems.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleViewMoreFound}
                  className="px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  View More Found Items
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default LostFoundProductsPage;
