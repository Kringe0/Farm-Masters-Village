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
    <section id="journey" className="py-12 md:py-28 bg-[#fbfaf7] overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-9 md:mb-24">
          <h2 className="text-emerald-800 font-semibold tracking-[0.16em] uppercase text-[10px] md:text-xs mb-2 md:mb-3">The process</h2>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-stone-900 tracking-[-0.04em] mb-3 md:mb-4">
            Your path to homeownership
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
            We've simplified the process to make owning your dream home in San Miguel as smooth and transparent as possible.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-[10%] w-[80%] h-px bg-stone-200 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className={`w-16 h-16 md:w-20 md:h-20 ${step.color} rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-white transition-transform duration-300 group-hover:-translate-y-1 relative`}>
                  <step.icon size={30} />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-stone-900 text-white rounded-lg flex items-center justify-center text-xs font-semibold border-2 border-white shadow">
                    {index + 1}
                  </div>
                </div>

                <h4 className="text-base md:text-xl font-semibold text-stone-900 mb-2 md:mb-3 tracking-tight">{step.title}</h4>
                <p className="text-stone-600 text-sm leading-relaxed px-2">
                  {step.desc}
                </p>

                {/* Arrow for Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-emerald-200">
                    <ArrowRight className="rotate-90 md:rotate-0" size={20} />
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