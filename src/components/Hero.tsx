"use client";

import React from 'react';
import { 
  MessageSquare, 
  ShieldCheck, 
  ChevronDown,
  Home,
  CheckCircle2,
  Building2,
  MessageCircle,
  Phone,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToProperties = () => {
    const element = document.getElementById('properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Farm Masters Village III Landscape" 
          className="w-full h-full object-cover object-center md:object-center animate-slow-zoom"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/40 to-emerald-950/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 md:pt-32">
        <div className="flex flex-col items-center text-center animate-fade-in-up">
          {/* Glass Emerald Status Badge */}
          <div className="mb-10 md:mb-12 relative group">
            {/* Subtle Glow Effect */}
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 bg-emerald-950/40 backdrop-blur-xl rounded-full border border-emerald-500/30 shadow-2xl shadow-emerald-900/20 transition-all duration-500 group-hover:border-emerald-400/50">
              <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-500/20 text-emerald-400">
                <Home size={12} className="md:w-[14px] md:h-[14px]" />
              </div>
              
              <span className="text-[8px] md:text-xs font-black tracking-[0.15em] uppercase text-emerald-50 whitespace-nowrap">
                Limited Units Available <span className="text-emerald-500/50 mx-1">•</span> Phase 3 Open
              </span>

              <Sparkles size={12} className="text-amber-400 group-hover:rotate-12 transition-transform md:w-[14px] md:h-[14px]" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-white leading-[1.1] md:leading-[0.95] tracking-tighter mb-6 md:mb-8">
            MODERN HOMES<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">TIMELESS PEACE</span>
          </h1>

          <p className="text-base md:text-2xl text-emerald-50/70 mb-10 md:mb-12 leading-relaxed max-w-2xl px-4 font-medium">
            Secure your family's future in our premium flood-free community in the heart of San Miguel.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-2xl px-4">
            <Button 
              asChild
              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl px-8 md:px-10 py-6 md:py-8 h-auto text-lg md:text-xl font-black shadow-2xl shadow-emerald-600/40 transition-all active:scale-95 w-full sm:w-auto"
            >
              <Link to="/contact">
                <MessageSquare className="mr-3" size={20} />
                INQUIRE NOW
              </Link>
            </Button>
            
            <div className="flex gap-3 md:gap-4 w-full sm:w-auto">
              <a 
                href="http://m.me/fmastersv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none w-14 h-14 md:w-16 md:h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-blue-500 transition-all active:scale-90 group relative"
                title="Chat on Messenger"
              >
                <MessageCircle size={24} />
              </a>
              
              <a 
                href="tel:09760638627" 
                className="flex-1 sm:flex-none w-14 h-14 md:w-16 md:h-16 bg-white text-emerald-900 rounded-2xl flex items-center justify-center shadow-xl hover:bg-emerald-50 transition-all active:scale-90 group relative"
                title="Call Now"
              >
                <Phone size={24} />
              </a>
            </div>
          </div>

          {/* Trust Bar - Improved Mobile Layout */}
          <div className="mt-16 md:mt-20 w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-10 border-t border-white/10 pt-10 md:pt-12 px-4">
              {[
                { icon: ShieldCheck, text: "Flood Free" },
                { icon: CheckCircle2, text: "Pag-IBIG Ready" },
                { icon: Home, text: "Modern Units" },
                { icon: Building2, text: "Amenities" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 md:gap-4 group cursor-default">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 border border-white/10">
                    <item.icon size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-white/80 font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-center leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToProperties}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors animate-bounce cursor-pointer z-20"
        aria-label="Scroll to properties"
      >
        <ChevronDown size={32} />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slow-zoom {
          from { transform: scale(1.05); }
          to { transform: scale(1); }
        }
        @media (min-width: 768px) {
          @keyframes slow-zoom {
            from { transform: scale(1.1); }
            to { transform: scale(1); }
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-slow-zoom {
          animation: slow-zoom 3s ease-out forwards;
        }
      `}} />
    </section>
  );
};

export default Hero;