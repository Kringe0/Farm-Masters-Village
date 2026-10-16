"use client";

import React from 'react';
import { MapPin, School, ShoppingBag, Hospital, BusFront, Landmark } from 'lucide-react';

const LocationHighlights = () => {
  const highlights = [
    { 
      icon: School, 
      title: "Education", 
      desc: "Near elementary schools and San Miguel National High School." 
    },
    { 
      icon: ShoppingBag, 
      title: "Markets", 
      desc: "Near Pulong Bayabas Mini Market." 
    },
    { 
      icon: Hospital, 
      title: "Healthcare", 
      desc: "Close to San Miguel District Hospital for emergencies." 
    },
    { 
      icon: BusFront, 
      title: "Transport", 
      desc: "Easy access to public transport and major highways." 
    },
    { 
      icon: Landmark, 
      title: "Heritage", 
      desc: "Near Biak na Bato National Park and historic landmarks." 
    },
    { 
      icon: MapPin, 
      title: "Strategic", 
      desc: "Flood-free area with a peaceful rural atmosphere." 
    },
  ];

  return (
    <section id="highlights" className="py-20 md:py-28 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-emerald-800 font-semibold tracking-[0.16em] uppercase text-[10px] md:text-xs mb-3">The neighborhood</h2>
          <h3 className="text-3xl md:text-5xl font-semibold text-stone-900 tracking-[-0.04em]">Well connected, peacefully placed.</h3>
          <p className="text-stone-600 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Farm Masters Village is strategically located in Pulong Bayabas, San Miguel, Bulacan to give you the perfect balance of rural peace and urban convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {highlights.map((item, index) => (
            <div key={index} className="bg-[#fbfaf7] p-6 md:p-7 rounded-xl border border-stone-200 hover:border-emerald-900/30 hover:shadow-md transition-all duration-300 group">
              <div className="w-11 h-11 bg-white rounded-lg border border-stone-200 flex items-center justify-center text-emerald-800 mb-5 group-hover:bg-emerald-800 group-hover:text-white transition-colors duration-300">
                <item.icon size={24} />
              </div>
              <h4 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h4>
              <p className="text-stone-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationHighlights;