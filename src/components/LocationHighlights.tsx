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
    <section id="highlights" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-emerald-600 font-bold tracking-widest uppercase text-[10px] md:text-sm mb-3 md:mb-4">The Neighborhood</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-emerald-950">Why Farm Masters Village ?</h3>
          <p className="text-emerald-800/60 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Farm Masters Village is strategically located in Pulong Bayabas, San Miguel, Bulacan to give you the perfect balance of rural peace and urban convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {highlights.map((item, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-emerald-100 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 md:mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <item.icon size={24} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-emerald-950 mb-2 md:mb-3">{item.title}</h4>
              <p className="text-emerald-800/60 leading-relaxed text-sm md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationHighlights;