import React from "react";
import { Link } from "react-router-dom";
import ProductCards from "../../components/ProductCards";
import products from "../../data/products";

function PreOwnedSection() {
  const previewProducts = products
    .filter((p) => p.category === "pre-owned")
    .slice(0, 4); // show only first 4

  return (
    <>
      <ProductCards products={previewProducts} categories={["pre-owned"]} />
    </>
  );
}

export default PreOwnedSection;
