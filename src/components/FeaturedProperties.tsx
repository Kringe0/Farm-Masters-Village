"use client";

import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { supabase } from '@/lib/supabase';
import { Loader2, SearchX } from 'lucide-react';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        
        if (data && data.length > 0) {
          // Map Supabase snake_case to component camelCase with robust array handling
          const mappedData = data.map(p => {
            // Ensure interior_images is always an array
            let interiorImages: string[] = [];
            if (Array.isArray(p.interior_images)) {
              interiorImages = p.interior_images;
            } else if (typeof p.interior_images === 'string' && p.interior_images.trim() !== '') {
              interiorImages = p.interior_images.split(',').map((s: string) => s.trim());
            }

            // Logic for Corner and Duplex units to have 1 Carpark
            const isCornerOrDuplex = 
              p.property_type?.toLowerCase().includes('corner') || 
              p.property_type?.toLowerCase().includes('duplex') ||
              p.title?.toLowerCase().includes('corner') ||
              p.title?.toLowerCase().includes('duplex');

            return {
              image: p.image_url,
              interiorImages: interiorImages,
              title: p.title,
              location: p.location,
              price: p.price,
              propertyType: p.property_type,
              lotArea: p.lot_area,
              floorArea: p.floor_area,
              beds: p.beds,
              baths: p.baths,
              carpark: p.carpark || (isCornerOrDuplex ? "1 Carpark" : null),
              tag: p.tag,
              description: p.description,
              financing: {
                loanableAmount: p.loanable_amount, // Fixed mapping to camelCase
                downpayment: p.downpayment,
                transferEquity: p.transfer_equity, // Fixed mapping to camelCase
                totalLoan: p.price,
                amortization: p.amortization
              }
            };
          });
          setProperties(mappedData);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-emerald-600">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-bold animate-pulse">Loading properties...</p>
      </div>
    );
  }

  return (
    <section id="properties" className="py-20 md:py-28 bg-[#fbfaf7] relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <p className="text-emerald-800 font-semibold tracking-[0.16em] uppercase text-[10px] md:text-xs mb-3">Find your place</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-900 tracking-[-0.04em] mb-4">
            Homes made for living well.
          </h2>
          <p className="text-stone-600 text-base md:text-lg leading-relaxed">
            Explore available homes in Farm Masters Village III, thoughtfully planned for everyday comfort in San Miguel, Bulacan.
          </p>
        </div>
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {properties.map((prop, index) => (
              <div key={index} className="flex h-full">
                <PropertyCard {...prop} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center">
            <SearchX className="mx-auto mb-3 text-emerald-800" size={28} />
            <h3 className="font-semibold text-stone-900">No properties to show right now</h3>
            <p className="mt-2 text-sm text-stone-600">Please check back soon or contact us for current availability.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;