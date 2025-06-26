// src/components/ProductCard.jsx
import { Link } from "react-router-dom"

export default function ProductCard({
  id,
  image,
  title,
  description,
  price,
  badge,
  badgeColor = "bg-emerald-600",
  type = "new", // "new" | "bidding" | "lost"
  location,
  timeLeft,
}) {
  return (
    <Link
      to={`/product/${id}`}
      className="block bg-white rounded-2xl overflow-hidden transition-all duration-300 group relative 
        shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <div
            className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded-full z-10 ${badgeColor}`}
          >
            {badge}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{title}</h3>
        <p className="text-xs md:text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>

        {type === "new" && (
          <div className="flex justify-between items-center">
            <span className="font-bold text-green-600 text-sm md:text-base">{price}</span>
          </div>
        )}

        {type === "bidding" && (
          <div>
            <span className="font-bold text-green-600 text-sm md:text-base">{price}</span>
            <p className="text-xs text-red-500 mt-1">Ends in: <strong>{timeLeft}</strong></p>
          </div>
        )}

        {type === "lost" && (
          <div className="text-sm text-center">
            <p className="text-gray-500 text-xs">📍 {location}</p>
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{description}</p>
          </div>
        )}
      </div>
    </Link>
  )
}
