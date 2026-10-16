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
import { publicAssetUrl } from '@/lib/utils';

const Hero = () => {
  const scrollToProperties = () => {
    const element = document.getElementById('properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92svh] flex items-center overflow-hidden bg-emerald-950">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={publicAssetUrl("hero-bg.jpg")}
          alt="Farm Masters Village III Landscape" 
          className="w-full h-full object-cover object-center md:object-center animate-slow-zoom"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/40 to-emerald-950/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 md:pt-32">
        <div className="max-w-5xl text-left animate-fade-in-up">
          {/* Glass Emerald Status Badge */}
          <div className="mb-7 md:mb-9 relative group">
            {/* Subtle Glow Effect */}
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 transition-colors group-hover:border-white/40">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300">
                <Home size={12} className="md:w-[14px] md:h-[14px]" />
              </div>
              
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.12em] uppercase text-white/90">
                Farm Masters Village III <span className="text-white/40 mx-1">·</span> San Miguel, Bulacan
              </span>

              <Sparkles size={12} className="text-amber-300 group-hover:rotate-12 transition-transform md:w-[14px] md:h-[14px]" />
            </div>
          </div>

          <h1 className="text-[clamp(2.8rem,7vw,5.8rem)] font-semibold text-white leading-[1.04] tracking-[-0.055em] mb-6 md:mb-7">
            A home for a<br className="hidden sm:block" /> more peaceful life.
          </h1>

          <p className="text-base md:text-xl text-white/75 mb-8 md:mb-10 leading-relaxed max-w-2xl font-normal">
            Discover thoughtfully planned homes in a welcoming, flood-free community in San Miguel, Bulacan.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button 
              asChild
              className="bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg px-7 py-6 h-auto text-sm md:text-base font-semibold shadow-xl shadow-black/15 transition-colors w-full sm:w-auto"
            >
              <Link to="/contact">
                <MessageSquare className="mr-3" size={20} />
                Explore available homes
              </Link>
            </Button>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <a 
                href="http://m.me/fmastersv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none w-12 h-12 bg-white/10 text-white rounded-lg flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                title="Chat on Messenger"
              >
                <MessageCircle size={24} />
              </a>
              
              <a 
                href="tel:09760638627" 
                className="flex-1 sm:flex-none w-12 h-12 bg-white text-emerald-900 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors"
                title="Call Now"
              >
                <Phone size={24} />
              </a>
            </div>
          </div>

          {/* Trust Bar - Improved Mobile Layout */}
          <div className="mt-12 md:mt-16 w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4 border-t border-white/20 pt-6 md:pt-7">
              {[
                { icon: ShieldCheck, text: "Flood Free" },
                { icon: CheckCircle2, text: "Pag-IBIG Ready" },
                { icon: Home, text: "Modern Units" },
                { icon: Building2, text: "Amenities" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 group cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex-shrink-0 flex items-center justify-center text-emerald-300 border border-white/10">
                    <item.icon size={17} />
                  </div>
                  <span className="text-white/80 font-medium text-[10px] md:text-xs leading-tight">
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
        className="absolute bottom-7 right-8 hidden md:block text-white/50 hover:text-white transition-colors cursor-pointer z-20"
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
          from { transform: scale(1.04); }
          to { transform: scale(1); }
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