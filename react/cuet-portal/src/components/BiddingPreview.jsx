// src/components/BiddingPreview.jsx
import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"

import preImg1 from "../assets/pre_image.jpg"

const biddingProducts = [
  {
    id: "bid-4",
    image: preImg1,
    title: "Road Bicycle (Used - Good Condition)",
    description: "21-speed gear system | Aluminum frame | Includes safety accessories",
    price: "৳ 3,500",
    badge: "Pre-Owned",
    badgeColor: "bg-amber-500",
    type: "bidding",
    timeLeft: "5h 10m",
  },
  {
    id: "bid-2",
    image: preImg1,
    title: "Mountain Bike (Used)",
    description: "Sturdy frame | 18-speed | Trail-ready",
    price: "৳ 2,800",
    badge: "Pre-Owned",
    badgeColor: "bg-amber-500",
    type: "bidding",
    timeLeft: "2h 30m",
  },
  {
    id: "bid-3",
    image: preImg1,
    title: "Electric Kettle (Used)",
    description: "1500W fast boil | Auto shut-off | Stainless steel",
    price: "৳ 600",
    badge: "Pre-Owned",
    badgeColor: "bg-amber-500",
    type: "bidding",
    timeLeft: "1h 15m",
  },
]

export default function BiddingPreview() {
  return (
    <section className="py-14 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center">
        🔨 Pre-Owned Bidding Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {biddingProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/bidding"
          className="inline-block px-6 py-2 text-sm font-semibold border border-blue-700 text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition"
        >
          View All Pre-Owned
        </Link>
      </div>
    </section>
  )
}
