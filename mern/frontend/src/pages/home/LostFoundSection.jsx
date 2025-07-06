import React from "react";
import { Link } from "react-router-dom";
import ProductCards from "../../components/ProductCards";
import products from "../../data/products";

function LostFoundSection() {
  const previewProducts = products
    .filter((p) => p.category === "lost" || p.category === "found")
    .slice(0, 4); // Show only first 4

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-4">
            Lost & Found
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            🔍 Help your community recover valuable items or report ones you’ve found around campus.
          </p>
        </div>

        {/* Product Grid */}
        <ProductCards products={previewProducts} categories={["lost", "found"]} />

        {/* View All Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/lost-found-products"
            className="px-6 py-3 bg-white text-blue-700 border border-blue-700 rounded-full text-lg font-semibold transition-all duration-300 transform hover:bg-blue-700 hover:text-white hover:scale-105 shadow-md"
          >
            Show All Lost & Found Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LostFoundSection;
