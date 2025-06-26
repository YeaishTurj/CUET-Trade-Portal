// done

export default function FeatureGrid() {
  const features = [
    {
      icon: "📦",
      title: "Seamless Buying & Selling",
      description: "List anything from books to electronics within seconds.",
      gradient: "from-green-100 to-white",
      iconBg: "bg-green-200",
    },
    {
      icon: "🔍",
      title: "Lost & Found",
      description: "Post a lost item or browse found ones reported by peers.",
      gradient: "from-purple-100 to-white",
      iconBg: "bg-purple-200",
    },
    {
      icon: "💸",
      title: "Smart Bidding",
      description: "Bid on useful pre-owned items — highest bidder wins.",
      gradient: "from-orange-100 to-white",
      iconBg: "bg-yellow-200",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {features.map(({ icon, title, description, gradient, iconBg }, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${gradient} p-8 rounded-3xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.03] transition-transform duration-300`}
          >
            <div
              className={`w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full ${iconBg} text-3xl shadow`}
            >
              {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
