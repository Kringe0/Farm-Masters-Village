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
          alt="Brand-new home at Farm Masters Village III"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center animate-slow-zoom"
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
                Featured brand-new home <span className="text-white/40 mx-1">·</span> San Miguel, Bulacan
              </span>

              <Sparkles size={12} className="text-amber-300 group-hover:rotate-12 transition-transform md:w-[14px] md:h-[14px]" />
            </div>
          </div>

          <h1 className="text-[clamp(2.8rem,7vw,5.8rem)] font-semibold text-white leading-[1.04] tracking-[-0.055em] mb-6 md:mb-7">
            A brand-new home<br className="hidden sm:block" /> for a peaceful life.
          </h1>

          <p className="text-base md:text-xl text-white/75 mb-8 md:mb-10 leading-relaxed max-w-2xl font-normal">
            Find room to grow in Farm Masters Village, San Miguel, Bulacan. Explore the home, get the details, and arrange a personal viewing.
          </p>

          <div className="mb-8 grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-0 max-w-4xl border-y border-white/20 py-4">
            <div className="col-span-2 sm:col-span-1 sm:pr-4 sm:border-r border-white/20">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Asking price</p>
              <p className="mt-1 text-xl md:text-2xl font-semibold text-white">₱3,500,000</p>
            </div>
            {[
              { label: "Bedrooms", value: "3" },
              { label: "Bathrooms", value: "2" },
              { label: "Lot area", value: "120 sqm" },
              { label: "Floor area", value: "80 sqm" },
            ].map((detail) => (
              <div key={detail.label} className="sm:px-4 sm:border-r last:border-r-0 border-white/20">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">{detail.label}</p>
                <p className="mt-1 text-base md:text-lg font-semibold text-white">{detail.value}</p>
              </div>
            ))}
            <span className="col-span-2 sm:hidden inline-flex items-center gap-2 text-xs font-medium text-emerald-100">
              <CheckCircle2 size={14} aria-hidden="true" /> Brand-new condition
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button 
              asChild
              className="bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg px-7 py-6 h-auto text-sm md:text-base font-semibold shadow-xl shadow-black/15 transition-colors w-full sm:w-auto"
            >
              <Link to="/#properties">
                <Home className="mr-2" size={18} />
                View property details
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white rounded-lg px-6 py-6 h-auto text-sm font-semibold transition-colors w-full sm:w-auto"
            >
              <Link to="/contact">
                <MessageSquare className="mr-2" size={18} />
                Schedule a viewing
              </Link>
            </Button>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <a 
                href="http://m.me/fmastersv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none w-12 h-12 bg-white/10 text-white rounded-lg flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                aria-label="Chat with us on Messenger"
                title="Chat on Messenger"
              >
                <MessageCircle size={24} />
              </a>
              
              <a 
                href="tel:09760638627" 
                className="flex-1 sm:flex-none w-12 h-12 bg-white text-emerald-900 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors"
                aria-label="Call 0976 063 8627"
                title="Call Now"
              >
                <Phone size={24} />
              </a>
            </div>
          </div>

          <div className="mt-5 hidden sm:flex items-center gap-2 text-xs text-white/75">
            <CheckCircle2 size={15} className="text-emerald-300" aria-hidden="true" />
            Brand-new condition
            <span className="mx-1 text-white/30">·</span>
            <ShieldCheck size={15} className="text-emerald-300" aria-hidden="true" />
            Flood-free community
            <span className="mx-1 text-white/30">·</span>
            <Building2 size={15} className="text-emerald-300" aria-hidden="true" />
            Community amenities
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