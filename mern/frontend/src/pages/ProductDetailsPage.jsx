import { useParams } from "react-router-dom";
import products from "../data/products";
import ProductDetailsCard from "../components/ProductDetailsCard";
import LostFoundSection from "../pages/home/LostFoundSection";
import NewArrivalSection from "./home/NewArrivalSection";
import PreOwnedSection from "./home/PreOwnedSection";
import { Link } from "react-router-dom";

function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const isNewArrival =
    product &&
    ["fashion", "electronics", "digital", "others"].includes(product.category);
  const isPreOwned = product && product.category === "pre-owned";
  const isLostFound = product && ["lost", "found"].includes(product.category);

  return (
    <>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Page Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
              Product Details
            </h1>
          </div>

          {/* Product Details Card */}
          <ProductDetailsCard product={product} />

          {/* Conditional Sections */}
        </div>
      </section>

      <section className="py-10 ">
        <div className="container mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-4">
              Explore Related Products
            </h2>
          </div>

          {isNewArrival && <NewArrivalSection />}
          {isPreOwned && <PreOwnedSection />}
          {isLostFound && <LostFoundSection />}

          {/* View All Button */}
          <div className="mt-10 flex justify-center">
            <Link
              to={
                isNewArrival
                  ? "/new-arrivals"
                  : isPreOwned
                  ? "/pre-owned-products"
                  : "/lost-found-products"
              }
              className="px-6 py-3 bg-white text-blue-700 border border-blue-700 rounded-full text-lg font-semibold transition-all duration-300 transform hover:bg-blue-700 hover:text-white hover:scale-105 shadow-md"
            >
              Show All Related Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetailsPage;
