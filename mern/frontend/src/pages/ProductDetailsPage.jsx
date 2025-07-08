import { useParams } from "react-router-dom";
import products from "../data/products";
import ProductDetailsCard from "../components/ProductDetailsCard";

function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

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
        </div>
      </section>
    </>
  );
}

export default ProductDetailsPage;
