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
        "relative flex-shrink-0 flex items-center justify-center transition-all duration-500 group-hover:scale-110",
        "w-12 h-12 md:w-14 md:h-14"
      )}>
        {isFooter && (
          <>
            <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border border-emerald-500/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-700"></div>
          </>
        )}
        
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