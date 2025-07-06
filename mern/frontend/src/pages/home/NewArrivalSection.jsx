import React from "react";
import { Link } from "react-router-dom";
import ProductCards from "../../components/ProductCards";
import products from "../../data/products";

function NewArrivalSection() {
  const newArrivalProducts = products.filter((p) =>
    ["fashion", "electronics", "digital", "others"].includes(p.category)
  ).slice(0, 4); // Preview only 4 if you want to limit

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            🆕 Discover the latest additions from your campus community — from
            digital essentials to trendy fashion items.
          </p>
        </div>

        {/* Product Grid */}
        <ProductCards
          products={newArrivalProducts}
          categories={["fashion", "electronics", "digital", "others"]}
        />

        {/* View All Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/new-arrivals"
            className="px-6 py-3 bg-white text-blue-700 border border-blue-700 rounded-full text-lg font-semibold transition-all duration-300 transform hover:bg-blue-700 hover:text-white hover:scale-105 shadow-md"
          >
            Show All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NewArrivalSection;
