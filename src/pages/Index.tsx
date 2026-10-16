"use client";

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Amenities from '@/components/Amenities';
import HomeownershipPath from '@/components/HomeownershipPath';
import AgentProfile from '@/components/AgentProfile';
import LocationHighlights from '@/components/LocationHighlights';
import VisitSection from '@/components/VisitSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProperties />
        <Amenities />
        <HomeownershipPath />
        <AgentProfile />
        <LocationHighlights />
        <VisitSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;