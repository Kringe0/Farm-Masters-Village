"use client";

import React from 'react';
import { 
  Waves, 
  Trophy, 
  Users
} from 'lucide-react';

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
    <section id="amenities" className="py-16 md:py-32 bg-emerald-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-emerald-600 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[9px] md:text-[10px] mb-3 md:mb-4">Community Features</h2>
          <h3 className="text-3xl md:text-6xl font-black text-emerald-950 tracking-tighter mb-4 md:mb-6">
            Elevated <span className="text-emerald-600">Living</span>
          </h3>
          <p className="text-emerald-900/50 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Experience a lifestyle of comfort and leisure with our thoughtfully designed community amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {amenities.map((item, index) => (
            <div key={index} className="group relative">
              <div className="relative h-[350px] md:h-[450px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-xl">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-white mb-2 md:mb-3 tracking-tight">{item.title}</h4>
                  <p className="text-emerald-50/70 text-xs md:text-sm leading-relaxed font-medium">
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