import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"

import fashionImg from "../assets/fashion_image.jpg"
import elecImg from "../assets/elec_image.jpg"
import digImg from "../assets/dig_image.jpg"
import doiImg from "../assets/doi_chira.jpg"

const newProducts = [
  {
    id: "fashion-1",
    image: fashionImg,
    title: "Classic Cotton T-Shirt",
    description: "100% cotton, breathable, modern fit",
    price: "৳ 500",
    badge: "New",
    badgeColor: "bg-emerald-600",
    type: "new",
  },
  {
    id: "elec-2",
    image: elecImg,
    title: "20000mAh PD Power Bank",
    description: "Dual USB-C charging | LED power",
    price: "৳ 500",
    badge: "New",
    badgeColor: "bg-emerald-600",
    type: "new",
  },
  {
    id: "dig-3",
    image: digImg,
    title: "Netflix Premium Plan",
    description: "4K, 4 screens, Unlimited content",
    price: "৳ 800/month",
    badge: "Popular",
    badgeColor: "bg-indigo-500",
    type: "new",
  },
  {
    id: "doi-4",
    image: doiImg,
    title: "Traditional Doi Chira",
    description: "Yogurt, banana & fruits — fresh made",
    price: "৳ 50",
    badge: "Homemade",
    badgeColor: "bg-yellow-500",
    type: "new",
  },
]

export default function NewArrivalsPreview() {
  return (
    <section className="py-14 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center">
        🆕 New Arrivals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/new-products"
          className="inline-block px-6 py-2 text-sm font-semibold border border-blue-700 text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition"
        >
          View All New Arrivals
        </Link>
      </div>
    </section>
  )
}
