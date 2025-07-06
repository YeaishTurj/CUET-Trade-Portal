import React from "react";
import Banner from "./Banner";
import HeroSection from "./HeroSection";
import NewArrivalSection from "./NewArrivalSection";
import LostFoundSection from "./LostFoundSection";
import PreOwnedSection from "./PreOwnedSection";

function Home() {
  return (
    <>
      <Banner />
      <HeroSection />
      <NewArrivalSection />
      <PreOwnedSection />
      <LostFoundSection />
    </>
  );
}

export default Home;
