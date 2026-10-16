"use client";

import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Phone, 
  UserCheck, 
  Star, 
  ShieldCheck, 
  ExternalLink,
  MessageSquare,
  BadgeCheck
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { publicAssetUrl } from '@/lib/utils';

const AgentProfile = () => {
  return (
    <section id="agent" className="py-20 md:py-28 bg-[#fbfaf7] overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 border border-stone-200 shadow-sm">
          {/* Decorative Background Element */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl opacity-50 -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Image Column */}
            <div className="lg:col-span-4 relative">
              <div className="relative z-10">
                {/* Main Image Frame */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-emerald-100 group">
                  <img 
                    src={publicAssetUrl("agent.jpg")}
                    alt="Analiza Catacutan" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Experience Seal */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-emerald-600 rounded-full flex flex-col items-center justify-center text-white shadow-xl border-4 border-white transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-80">Experience</p>
                    <p className="text-2xl md:text-4xl font-black leading-none my-0.5">9+</p>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-80">Years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-8 space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] border border-emerald-100">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  REAL ESTATE SALESPERSON
                </div>
                
                <div className="flex items-center gap-3 md:gap-4">
                  <h2 className="text-3xl md:text-5xl font-semibold text-stone-900 tracking-[-0.045em] leading-tight">
                    Analiza Catacutan
                  </h2>
                  <div className="flex-shrink-0 text-blue-500 bg-blue-50 p-1.5 md:p-2 rounded-full shadow-sm border border-blue-100">
                    <BadgeCheck size={28} className="md:w-10 md:h-10 fill-blue-500 text-white" />
                  </div>
                </div>

                {/* Accreditation Details */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-black text-emerald-900/50 uppercase tracking-[0.15em]">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>DHSUD ACCREDITATION NCR-A-25604</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-black text-emerald-900/50 uppercase tracking-[0.15em]">
                    <Award size={14} className="text-emerald-600" />
                    <span>PRC REGISTRATION NO. 24208</span>
                  </div>
                </div>
              </div>

              <p className="text-base md:text-lg text-stone-600 leading-relaxed border-l-2 border-emerald-700 pl-5">
                "Committed to integrity and excellence, I provide expert guidance to help you secure a future of peace and comfort for your family."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: UserCheck, title: "Personalized Tours", desc: "Tailored site viewings." },
                  { icon: CheckCircle2, title: "Pag-IBIG Expert", desc: "Financing assistance." },
                  { icon: MessageSquare, title: "Direct Support", desc: "Clear communication." },
                  { icon: Award, title: "Verified Listings", desc: "Official inventory." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-stone-50 rounded-lg flex items-center justify-center text-emerald-800 border border-stone-200 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm">{item.title}</h4>
                      <p className="text-[11px] text-emerald-900/50 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg px-6 py-5 h-auto text-sm font-semibold shadow-sm transition-colors">
                  <Link to="/contact">
                    Book Site Viewing
                    <ExternalLink className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="bg-white border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg px-6 py-5 h-auto text-sm font-semibold transition-colors">
                  <a href="tel:09760638627">
                    <Phone className="mr-2" size={18} />
                    Call Direct
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentProfile;