"use client";

import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

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
    <section id="properties" className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3 md:mb-4">
              Featured Properties
            </h2>
            <p className="text-slate-500 text-base md:text-lg max-w-xl">
              Explore our selection of modern residential units in San Miguel, Bulacan.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map((prop, index) => (
            <div key={index} className="flex h-full">
              <PropertyCard {...prop} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;