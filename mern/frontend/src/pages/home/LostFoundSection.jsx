import React from "react";
import { Link } from "react-router-dom";
import ProductCards from "../../components/ProductCards";
import products from "../../data/products";

function LostFoundSection() {
  const previewProducts = products
    .filter((p) => p.category === "lost" || p.category === "found")
    .slice(0, 4); // Show only first 4

  return (
    <>
      <ProductCards products={previewProducts} categories={["lost", "found"]} />
    </>
  );
}

export default LostFoundSection;
