"use client";

import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { supabase } from '@/lib/supabase';
import { Loader2, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyRecord {
  image_url: string | null;
  interior_images: string[] | string | null;
  title: string | null;
  location: string | null;
  price: string | null;
  property_type: string | null;
  lot_area: string | null;
  floor_area: string | null;
  beds: number | null;
  baths: number | null;
  carpark: string | null;
  tag: string | null;
  description: string | null;
  loanable_amount: string | null;
  downpayment: string | null;
  transfer_equity: string | null;
  amortization: { years: number; amount: string }[] | null;
}

interface FeaturedProperty {
  image: string;
  interiorImages: string[];
  title: string;
  location: string;
  price: string;
  propertyType: string;
  lotArea: string;
  floorArea: string;
  beds: number | null;
  baths: number | null;
  carpark: string | null;
  tag: string;
  description: string;
  financing: {
    loanableAmount: string;
    downpayment: string;
    transferEquity: string;
    totalLoan: string;
    amortization: { years: number; amount: string }[];
  };
}

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<FeaturedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('id', { ascending: true })
          .limit(3);

        if (error) throw error;
        
        if (data && data.length > 0) {
          // Map Supabase snake_case to component camelCase with robust array handling
          const mappedData = data.map((p: PropertyRecord) => {
            // Ensure interior_images is always an array
            let interiorImages: string[] = [];
            if (Array.isArray(p.interior_images)) {
              interiorImages = p.interior_images;
            } else if (typeof p.interior_images === 'string' && p.interior_images.trim() !== '') {
              interiorImages = p.interior_images.split(',').map((s: string) => s.trim());
            }

            return {
              image: p.image_url ?? "",
              interiorImages: interiorImages,
              title: p.title ?? "Listing details pending",
              location: p.location ?? "Location not provided",
              price: p.price ?? "Contact for pricing",
              propertyType: p.property_type ?? "Type not provided",
              lotArea: p.lot_area ?? "Not provided",
              floorArea: p.floor_area ?? "",
              beds: p.beds,
              baths: p.baths,
              carpark: p.carpark,
              tag: p.tag ?? "Status not provided",
              description: p.description ?? "Description not provided.",
              financing: {
                loanableAmount: p.loanable_amount ?? "",
                downpayment: p.downpayment ?? "",
                transferEquity: p.transfer_equity ?? "",
                totalLoan: p.price ?? "",
                amortization: p.amortization ?? []
              }
            };
          });
          setProperties(mappedData);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section id="properties" className="py-12 md:py-28 bg-[#fbfaf7] relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 md:mb-14 max-w-2xl">
          <p className="text-emerald-800 font-semibold tracking-[0.16em] uppercase text-[10px] md:text-xs mb-2 md:mb-3">Find your place</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-stone-900 tracking-[-0.04em] mb-3 md:mb-4">
            Homes made for living well.
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-stone-600">
            Explore available homes in Farm Masters Village III, thoughtfully planned for everyday comfort in San Miguel, Bulacan.
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white py-12 text-emerald-800" role="status">
            <Loader2 size={20} className="animate-spin" />
            <p className="text-sm font-medium">Loading available homes…</p>
          </div>
        ) : fetchError ? (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center">
            <SearchX className="mx-auto mb-3 text-emerald-800" size={28} />
            <h3 className="font-semibold text-stone-900">Property listings are temporarily unavailable</h3>
            <p className="mt-2 text-sm text-stone-600">Contact us for current availability and details.</p>
            <Link to="/contact" className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-emerald-900 px-5 text-sm font-semibold text-white hover:bg-emerald-800">
              Ask about available homes
            </Link>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {properties.map((prop, index) => (
              <div key={`${prop.title}-${index}`} className="flex h-full">
                <PropertyCard {...prop} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center">
            <SearchX className="mx-auto mb-3 text-emerald-800" size={28} />
            <h3 className="font-semibold text-stone-900">No properties to show right now</h3>
            <p className="mt-2 text-sm text-stone-600">Contact us for current availability and details.</p>
            <Link to="/contact" className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-emerald-900 px-5 text-sm font-semibold text-white hover:bg-emerald-800">
              Contact us
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;