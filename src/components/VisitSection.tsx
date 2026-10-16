"use client";

import React from 'react';
import { MapPin, Navigation, Calendar, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Map from './Map';

const VisitSection = () => {
  const googleMapsUrl = "https://maps.app.goo.gl/stah2jXDh7WjKCA18";

  return (
    <section id="visit" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div>
              <h2 className="text-emerald-600 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[9px] md:text-[10px] mb-3 md:mb-4">Site Experience</h2>
              <h3 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter mb-4 md:mb-6">
                Visit Farm Masters <span className="text-emerald-600">Village III</span>
              </h3>
              <p className="text-emerald-900/60 text-base md:text-lg leading-relaxed font-medium">
                Nothing compares to seeing your future home in person. An exclusive site viewing offers a real glimpse of the peaceful surroundings and the community coming to life.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4 p-5 md:p-6 bg-emerald-50 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-100">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[9px] md:text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-emerald-950 font-bold text-sm md:text-base">Pulong Bayabas, San Miguel, Bulacan</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 md:p-6 bg-emerald-50 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-100">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[9px] md:text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">Viewing Hours</p>
                  <p className="text-emerald-950 font-bold text-sm md:text-base">Everyday: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-8 py-6 md:py-7 h-auto font-bold text-base md:text-lg shadow-lg shadow-emerald-200 transition-all hover:scale-105">
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="mr-2" size={20} />
                  Get Directions
                </a>
              </Button>
              <Button variant="outline" asChild className="border-emerald-100 text-emerald-700 hover:bg-emerald-50 rounded-2xl px-8 py-6 md:py-7 h-auto font-bold text-base md:text-lg transition-all">
                <a href="/contact">
                  <Calendar className="mr-2" size={20} />
                  Schedule Tour
                </a>
              </Button>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-4 bg-emerald-100/50 rounded-[2.5rem] md:rounded-[3rem] blur-2xl -z-10"></div>
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitSection;