import React from "react";
import { Link } from "react-router-dom";
import ProductCards from "../../components/ProductCards";
import products from "../../data/products";

function NewArrivalSection() {
  const newArrivalProducts = products
    .filter((p) =>
      ["fashion", "electronics", "digital", "others"].includes(p.category)
    )
    .slice(0, 4); // Preview only 4 if you want to limit

  return (
    <>
      {" "}
      <ProductCards
        products={newArrivalProducts}
        categories={["fashion", "electronics", "digital", "others"]}
      />
    </>
  );
}

export default NewArrivalSection;
