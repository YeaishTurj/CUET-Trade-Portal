import React, { useState } from "react";
import products from "../data/products";
import ProductCards from "../components/ProductCards";

const ITEMS_PER_PAGE = 8;

function PreOwnedProductsPage() {
  const preOwnedProducts = products.filter((p) => p.category === "pre-owned");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(preOwnedProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = preOwnedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
            All Pre-Owned Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ♻️ Buy smart, buy second-hand. These campus deals still have life left!
          </p>
        </div>

        {/* Product Grid */}
        <ProductCards products={paginatedProducts} categories={["pre-owned"]} />

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-full border border-blue-600 font-semibold transition-all ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105"
            }`}
          >
            ← Previous
          </button>

          <span className="text-blue-800 font-semibold text-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-full border border-blue-600 font-semibold transition-all ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}

export default PreOwnedProductsPage;
