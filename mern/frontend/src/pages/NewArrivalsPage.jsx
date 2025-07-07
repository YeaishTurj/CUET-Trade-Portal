import React, { useState } from "react";
import products from "../data/products";
import ProductCards from "../components/ProductCards";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";

// Category config
const categories = [
  { key: "fashion", label: "👗 Fashion & Lifestyle" },
  { key: "electronics", label: "📱 Electronics & Accessories" },
  { key: "digital", label: "💻 Digital Services" },
  { key: "others", label: "🧰 Other Essentials" },
];

function NewArrivalsPage() {
  // Control visible product count for each category
  const [visibleCounts, setVisibleCounts] = useState({
    fashion: 4,
    electronics: 4,
    digital: 4,
    others: 4,
  });

  const handleViewMore = (key) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [key]: prev[key] + 4,
    }));
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Page Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
            All New Arrivals
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            🎉 Discover the newest additions from your campus — gadgets,
            fashion, services, and more!
          </p>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-2 mb-10">
            <SearchBar />
            <SortDropdown />
          </div>
        </div>

        {/* Category-wise Sections */}
        {categories.map(({ key, label }) => {
          const filteredProducts = products.filter((p) => p.category === key);
          const visibleProducts = filteredProducts.slice(0, visibleCounts[key]);

          if (filteredProducts.length === 0) return null;

          return (
            <div key={key} className="container mx-auto px-6 mb-16">
              {/* Category Heading */}
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{label}</h2>

              {/* Product Grid */}
              <ProductCards products={visibleProducts} categories={[key]} />

              {/* View More Button */}
              {visibleCounts[key] < filteredProducts.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleViewMore(key)}
                    className="px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    View More
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NewArrivalsPage;
