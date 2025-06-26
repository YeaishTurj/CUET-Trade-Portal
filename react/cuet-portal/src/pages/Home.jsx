// src/pages/Home.jsx
import Hero from "../components/Hero";
import FeatureGrid from "../components/FeatureGrid";
import NewArrivalsPreview from "../components/NewArrivalsPreview";
import BiddingPreview from "../components/BiddingPreview";
import LostFoundPreview from "../components/LostFoundPreview";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureGrid />
      <NewArrivalsPreview />
      <BiddingPreview />
      <LostFoundPreview />

      {/* You can insert other sections like NewArrivals, BiddingPreview, LostFoundPreview here */}
      <div className="text-center text-gray-400 mt-10 text-sm italic">
        🚧 More homepage content coming soon...
      </div>
    </div>
  );
}
