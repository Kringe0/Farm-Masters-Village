"use client";

import React from 'react';
import { cn, publicAssetUrl } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'footer';
  forceLightText?: boolean;
}

const Logo = ({ className, variant = 'dark', forceLightText }: LogoProps) => {
  const isFooter = variant === 'footer';
  const useLightText = forceLightText || variant === 'light' || isFooter;

  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className={cn(
        "relative flex-shrink-0 flex items-center justify-center",
        isFooter
          ? "w-10 h-10 sm:w-11 sm:h-11"
          : "transition-all duration-500 group-hover:scale-110 w-12 h-12 md:w-14 md:h-14"
      )}>
        <img 
          src={publicAssetUrl("logo.png")}
          alt="Farm Masters Village III Logo" 
          className="relative z-10 object-contain transition-all w-full h-full scale-125"
        />
      </div>

      <div className="flex flex-col -space-y-1">
        <span className={cn(
          "font-black tracking-tighter uppercase leading-none transition-colors",
          isFooter ? "text-lg md:text-xl" : "text-xl md:text-2xl",
          useLightText ? "text-white" : "text-zinc-950"
        )}>
          Farm Masters
        </span>
        <span className={cn(
          "font-black uppercase transition-colors",
          isFooter ? "text-[9px] md:text-[10px] tracking-[0.35em]" : "text-[11px] md:text-[12px] tracking-[0.35em]",
          useLightText ? "text-emerald-400" : "text-emerald-800"
        )}>
          Village III
        </span>
      </div>
    </div>
  );
};

export default Logo;