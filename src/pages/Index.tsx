"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Amenities from '@/components/Amenities';
import HomeownershipPath from '@/components/HomeownershipPath';
import AgentProfile from '@/components/AgentProfile';
import LocationHighlights from '@/components/LocationHighlights';
import VisitSection from '@/components/VisitSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // The LoadingScreen component handles its own internal timing, 
    // but we can use this to ensure the rest of the page is ready.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Match this with the LoadingScreen's internal duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <LoadingScreen />
      
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
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
    </div>
  );
};

export default Index;