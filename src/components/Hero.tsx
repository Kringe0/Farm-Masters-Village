"use client";

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { publicAssetUrl } from '@/lib/utils';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[62svh] items-center overflow-hidden bg-emerald-950 lg:min-h-[84svh]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={publicAssetUrl('hero-bg.jpg')}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/75 via-emerald-950/40 to-emerald-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/45 via-transparent to-emerald-950/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-24 sm:px-8 md:pb-20 md:pt-32">
        <div className="max-w-3xl">
          <h1 className="text-[clamp(2.3rem,8vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-white">
            Find a place to call home.
          </h1>
          <p className="mt-4 text-base font-normal leading-relaxed text-white/85 sm:mt-6 sm:text-2xl">
            Discover welcoming homes at Farm Masters Village III.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-6 h-12 rounded-lg border-white/55 bg-white/5 px-5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/15 hover:text-white sm:mt-9"
          >
            <Link to="/#properties">
              Explore properties
              <ArrowDown className="ml-2" size={16} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
