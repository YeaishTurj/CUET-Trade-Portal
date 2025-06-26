// src/components/LostFoundPreview.jsx
import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"

import foundImg from "../assets/found_image.jpg"
import lostImg from "../assets/lost_image.jpg"

const lostFoundItems = [
  {
    id: "found-1",
    image: foundImg,
    title: "Black Leather Wallet",
    description: "Contains ID cards and credit cards",
    badge: "Found",
    badgeColor: "bg-green-600",
    type: "lost",
    location: "Main Cafeteria",
  },
  {
    id: "lost-5",
    image: lostImg,
    title: "CUET Student ID Card",
    description: "ID No: CUET-2023-XXXXX",
    badge: "Lost",
    badgeColor: "bg-red-500",
    type: "lost",
    location: "Central Library",
  },
  {
    id: "found-3",
    image: foundImg,
    title: "USB Pen Drive",
    description: "32GB black SanDisk drive",
    badge: "Found",
    badgeColor: "bg-green-600",
    type: "lost",
    location: "EEE Building",
  },
]

export default function LostFoundPreview() {
  return (
    <section className="py-14 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center">
        🔎 Recent Lost & Found
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostFoundItems.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/lost-found"
          className="inline-block px-6 py-2 text-sm font-semibold border border-blue-700 text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition"
        >
          View All Lost & Found
        </Link>
      </div>
    </section>
  )
}
