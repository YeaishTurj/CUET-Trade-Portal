// done

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import backImg from "../assets/landing.jpg";

const slides = [
  {
    icon: "🛍️",
    title: "Buy Smart",
    description: "Great campus deals at affordable prices.",
    gradient: "from-green-100 to-green-50",
  },
  {
    icon: "📦",
    title: "Sell Easily",
    description: "List your items instantly for others to discover.",
    gradient: "from-blue-100 to-blue-50",
  },
  {
    icon: "💸",
    title: "Smart Bidding",
    description: "Join auctions & grab top picks on a budget.",
    gradient: "from-orange-100 to-orange-50",
  },
  {
    icon: "🔍",
    title: "Lost & Found",
    description: "Report or retrieve lost items around campus.",
    gradient: "from-purple-100 to-purple-50",
  },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundimageURL: `url(${backImg})`,
        minHeight: "420px",
        marginTop: "10px",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/85 to-white/40 backdrop-blur-sm z-0" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-30 z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left Text */}
        <div className="max-w-md text-center lg:text-left">
          <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-2">
            CUET Trade & Lost-Found Portal
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-900 mb-4 leading-tight">
            Buy, Sell & Discover
          </h1>
          <p className="text-gray-700 text-lg italic mb-6">
            <span role="img" aria-label="search">
              🔍
            </span>{" "}
            From found wallets to for-sale tablets — it's all here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/new-products"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-transform transform hover:scale-105"
            >
              Explore Products
            </Link>
            <Link
              to="/lost-found"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-transform transform hover:scale-105"
            >
              Report Lost/Found
            </Link>
          </div>
        </div>
        {/* Right Carousel */}
        <div className="w-full lg:w-[440px]">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            slidesPerView={1}
            spaceBetween={30}
          >
            {slides.map(({ title, icon, description, gradient }, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={`bg-gradient-to-br ${gradient} rounded-[3rem] text-center shadow-xl border border-white/40 backdrop-blur-md flex flex-col items-center justify-center px-6 py-10`}
                  style={{
                    height: "240px",
                    width: "100%",
                  }}
                >
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-white/80 text-2xl shadow-inner">
                    {icon}
                  </div>
                  <h4 className="text-2xl font-bold text-blue-900 mb-2">
                    {title}
                  </h4>
                  <p className="text-base text-gray-700 max-w-xs">
                    {description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
