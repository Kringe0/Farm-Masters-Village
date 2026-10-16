"use client";

import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { cn } from '@/lib/utils';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(() => setIsVisible(false), 1200);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-all duration-1000 ease-in-out",
      isExiting ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
    )}>
      {/* Background Layer with Deep Cinematic Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/hero-bg.jpg" 
          alt="" 
          className="w-full h-full object-cover scale-110 animate-[slow-zoom_20s_linear_infinite]"
        />
        {/* Deep Blur and Light Tint for Visual Impact and Logo Contrast */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/30 via-transparent to-white/40"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <div className={cn(
          "mb-12 transition-all duration-1000 transform",
          isExiting ? "translate-y-[-20px] opacity-0" : "translate-y-0 opacity-100"
        )}>
          <Logo className="scale-150 md:scale-[2]" variant="dark" />
        </div>

        {/* Progress Container */}
        <div className="w-64 md:w-80 space-y-4">
          <div className="h-[2px] w-full bg-emerald-900/10 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-emerald-900 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(6,78,59,0.3)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.3em] animate-pulse">
              Preparing Your Sanctuary
            </span>
            <span className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Professional Tagline */}
        <div className={cn(
          "absolute -bottom-32 w-full text-center transition-all duration-1000 delay-300",
          isExiting ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
        )}>
          <p className="text-emerald-900/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">
            Premium Living • San Miguel, Bulacan
          </p>
        </div>
      </div>

      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-20" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}} />
    </div>
  );
};

export default LoadingScreen;