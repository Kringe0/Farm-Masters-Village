"use client";

import React from 'react';
import { 
  MessageSquare, 
  Map, 
  ClipboardCheck, 
  Key, 
  ArrowRight 
} from 'lucide-react';

const HomeownershipPath = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Inquire & Consult",
      desc: "Connect with Analiza for a free consultation. We'll discuss your budget, needs, and Pag-IBIG eligibility.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: Map,
      title: "Site Viewing",
      desc: "Schedule a personal tour of the village. See the actual units, amenities, and the peaceful neighborhood.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: ClipboardCheck,
      title: "Reservation",
      desc: "Secure your preferred unit with a reservation fee. We'll guide you through the document preparation.",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: Key,
      title: "Move-in",
      desc: "Once Pag-IBIG is approved and the unit is ready, we'll turn over the keys to your brand new home!",
      color: "bg-emerald-600 text-white"
    }
  ];

  return (
    <section id="journey" className="py-16 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-emerald-600 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[9px] md:text-[10px] mb-3 md:mb-4">The Journey</h2>
          <h3 className="text-3xl md:text-6xl font-black text-emerald-950 tracking-tighter mb-4 md:mb-6">
            Path to <span className="text-emerald-600">Homeownership</span>
          </h3>
          <p className="text-emerald-900/50 text-base md:text-lg max-w-2xl mx-auto font-medium">
            We've simplified the process to make owning your dream home in San Miguel as smooth and transparent as possible.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-emerald-100 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className={`w-20 h-20 md:w-28 md:h-28 ${step.color} rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mb-6 md:mb-8 shadow-2xl border-4 border-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 relative`}>
                  <step.icon size={32} className="md:w-10 md:h-10" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 bg-emerald-950 text-white rounded-2xl flex items-center justify-center text-xs md:text-sm font-black border-2 border-white shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <h4 className="text-xl md:text-2xl font-black text-emerald-950 mb-3 md:mb-4 tracking-tight">{step.title}</h4>
                <p className="text-emerald-900/60 text-sm md:text-base leading-relaxed font-medium px-4">
                  {step.desc}
                </p>

                {/* Arrow for Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-emerald-200">
                    <ArrowRight className="rotate-90 md:rotate-0" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeownershipPath;