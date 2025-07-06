// src/data/products.js
import fashionImg from "../assets/fashion_image.jpg";
import elecImg from "../assets/elec_image.jpg";
import digImg from "../assets/dig_image.jpg";
import foundImg from "../assets/found_image.jpg";
import bidImg from "../assets/pre_image.jpg";

export const products = [
  {
    id: "fashion-1",
    type: "fashion",
    title: "Classic Cotton T-Shirt",
    price: "৳ 500",
    imageURL: fashionImg,
    sizes: ["S", "M", "L", "XL"],
    description: "Soft, breathable 100% cotton. Perfect for campus casual.",
    seller: "CUET Closet",
  },
  {
    id: "elec-2",
    type: "electronics",
    title: "PD Power Bank",
    price: "৳ 800",
    imageURL: elecImg,
    features: ["20,000mAh", "Dual USB-C", "Fast Charging"],
    seller: "CUET Tech Hub",
  },
  {
    id: "dig-3",
    type: "digital",
    title: "Netflix Subscription (1 Month)",
    price: "৳ 800/month",
    imageURL: digImg,
    features: ["4K", "4 Screens", "Premium Plan"],
    seller: "StreamShare BD",
  },
  {
    id: "bid-4",
    type: "bidding",
    title: "Used Mountain Bike",
    price: "৳ 2800",
    imageURL: bidImg,
    bids: [
      { user: "Tanvir", amount: 2500 },
      { user: "Mitu", amount: 2700 },
    ],
    seller: "CUET Cycle Club",
    endsIn: "4h 20m",
  },
  {
    id: "lost-5",
    type: "lost",
    title: "Black Wallet",
    imageURL: foundImg,
    location: "EEE Building",
    status: "Found",
    description: "Contains ID & cards. Claimed with verification.",
    contact: "018XXXXXXX",
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
