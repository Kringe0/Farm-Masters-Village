"use client";

import React from 'react';
import { 
  Waves, 
  Trophy, 
  Users
} from 'lucide-react';
import { publicAssetUrl } from '@/lib/utils';

const Amenities = () => {
  const amenities = [
    {
      title: "Modern Clubhouse",
      desc: "A spacious venue for community gatherings, celebrations, and social events.",
      icon: Users,
      image: "/clubhouse.jpg"
    },
    {
      title: "Swimming Pool",
      desc: "A refreshing escape for families to relax and enjoy sunny afternoons.",
      icon: Waves,
      image: "/pool.jpg"
    },
    {
      title: "Basketball Court",
      desc: "Full-sized court for sports enthusiasts and active community living.",
      icon: Trophy,
      image: "/court.jpg"
    }
  ];

  return (
    <section id="amenities" className="py-20 md:py-28 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-emerald-800 font-semibold tracking-[0.16em] uppercase text-[10px] md:text-xs mb-3">Community features</h2>
          <h3 className="text-3xl md:text-5xl font-semibold text-stone-900 tracking-[-0.04em] mb-4">
            Room to enjoy life.
          </h3>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto">
            Experience a lifestyle of comfort and leisure with our thoughtfully designed community amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {amenities.map((item, index) => (
            <div key={index} className="group relative">
              <div className="relative h-[340px] md:h-[390px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                <img 
                  src={publicAssetUrl(item.image)}
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                  <div className="w-11 h-11 bg-emerald-700 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-white/75 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;