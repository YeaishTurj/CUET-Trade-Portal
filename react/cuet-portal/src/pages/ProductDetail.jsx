// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom"
import { getProductById } from "../data/products"

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)

  if (!product) {
    return <div className="p-10 text-center text-red-500 text-xl">Product not found</div>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Top Section: Image + Info */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover rounded-xl shadow"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.title}</h1>
          {product.price && (
            <p className="text-xl font-semibold text-green-700">{product.price}</p>
          )}
          {product.seller && (
            <p className="text-sm text-gray-500">Seller: <span className="font-medium text-gray-700">{product.seller}</span></p>
          )}

          {product.type === "fashion" && product.sizes && (
            <div>
              <h3 className="text-sm font-semibold mb-1">Available Sizes</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <span key={size} className="px-3 py-1 border rounded-full text-sm">{size}</span>
                ))}
              </div>
            </div>
          )}

          {product.type === "electronics" && product.features && (
            <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
              {product.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          )}

          {product.type === "digital" && product.features && (
            <div>
              <h3 className="text-sm font-semibold mb-1">What's Included</h3>
              <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                {product.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition">
                Subscribe Now
              </button>
            </div>
          )}

          {product.type === "bidding" && (
            <div>
              <p className="text-sm text-red-500 font-medium">⏳ Ends in: {product.endsIn}</p>
              <h4 className="mt-3 text-sm font-semibold">Recent Bids:</h4>
              <ul className="text-sm ml-4 text-gray-600 space-y-1">
                {product.bids.map((b, i) => (
                  <li key={i}>• {b.user}: <strong className="text-gray-800">৳ {b.amount}</strong></li>
                ))}
              </ul>
              <button className="mt-4 bg-yellow-500 text-white px-5 py-2 rounded-full hover:bg-yellow-600 transition">
                Place a Bid
              </button>
            </div>
          )}

          {product.type === "lost" && (
            <div className="text-sm space-y-1">
              <p className="text-gray-600">📍 Location: <strong>{product.location}</strong></p>
              <p className="text-gray-600">🛈 Status: <span className={`font-semibold ${product.status === "Found" ? "text-green-600" : "text-red-600"}`}>{product.status}</span></p>
              {product.contact && (
                <p className="text-gray-600">📞 Contact: <strong>{product.contact}</strong></p>
              )}
            </div>
          )}

          {product.description && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-1">Description</h3>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
