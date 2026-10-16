"use client";

import React from 'react';
import { MapPin, Navigation, Calendar, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Map from './Map';
import { Link } from 'react-router-dom';

const VisitSection = () => {
  const googleMapsUrl = "https://maps.app.goo.gl/stah2jXDh7WjKCA18";

  return (
    <section id="visit" className="py-20 md:py-28 bg-[#fbfaf7] overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div>
              <h2 className="text-emerald-800 font-semibold tracking-[0.16em] uppercase text-[10px] md:text-xs mb-3">Come see for yourself</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-stone-900 tracking-[-0.04em] mb-4">
                Visit Farm Masters <span className="text-emerald-600">Village III</span>
              </h3>
              <p className="text-stone-600 text-base md:text-lg leading-relaxed">
                Nothing compares to seeing your future home in person. An exclusive site viewing offers a real glimpse of the peaceful surroundings and the community coming to life.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4 p-5 md:p-6 bg-emerald-50 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-100">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-stone-900 font-semibold text-sm md:text-base">Pulong Bayabas, San Miguel, Bulacan</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 md:p-6 bg-emerald-50 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-100">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-1">Viewing hours</p>
                  <p className="text-stone-900 font-semibold text-sm md:text-base">Every day, 8:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Button asChild className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg px-6 py-5 h-auto font-semibold text-sm shadow-sm transition-colors">
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="mr-2" size={20} />
                  Get Directions
                </a>
              </Button>
              <Button variant="outline" asChild className="border-stone-300 text-stone-700 hover:bg-white rounded-lg px-6 py-5 h-auto font-semibold text-sm transition-colors">
                <Link to="/contact">
                  <Calendar className="mr-2" size={20} />
                  Schedule Tour
                </Link>
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