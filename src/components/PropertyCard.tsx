"use client";

import React, { useState, useCallback } from 'react';
import { 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Bath, 
  Home, 
  Calculator, 
  X, 
  ZoomIn, 
  ArrowRight, 
  Info,
  ChevronLeft,
  ChevronRight,
  Car
} from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, publicAssetUrl } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface FinancingOption {
  years: number;
  amount: string;
}

interface PropertyProps {
  image: string;
  interiorImages?: string[];
  title: string;
  location: string;
  price: string;
  lotArea: string;
  floorArea?: string;
  beds: number;
  baths: number;
  carpark?: string;
  tag: string;
  propertyType: string;
  description?: string;
  financing?: {
    loanableAmount: string;
    downpayment: string;
    transferEquity: string;
    totalLoan: string;
    amortization: FinancingOption[];
  };
}

const Watermark = ({ size = 'md' }: { size?: 'xs' | 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    xs: "text-[8px] py-0.5 px-2 border-y-[0.5px]",
    sm: "text-xs md:text-sm py-1 px-3 border-y",
    md: "text-lg md:text-xl py-1.5 px-5 border-y",
    lg: "text-3xl md:text-5xl py-3 px-10 border-y-2"
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-30">
      <span className={cn(
        "text-white/30 font-bold tracking-widest -rotate-12 drop-shadow-md border-white/20 whitespace-nowrap",
        sizeClasses[size]
      )} style={{ fontFamily: "'Dancing Script', cursive" }}>
        Analiza Catacutan
      </span>
    </div>
  );
};

const PropertyCard = ({ 
  image, 
  interiorImages = [],
  title, 
  location, 
  price, 
  lotArea, 
  floorArea, 
  beds, 
  baths, 
  carpark,
  tag, 
  propertyType,
  description,
  financing 
}: PropertyProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const allImages = [image, ...interiorImages];

  const openLightbox = (imgList: string[], index: number) => {
    setActiveGallery(imgList);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setCurrentImageIndex(null);
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentImageIndex !== null) {
      setCurrentImageIndex((currentImageIndex + 1) % activeGallery.length);
    }
  }, [currentImageIndex, activeGallery]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentImageIndex !== null) {
      setCurrentImageIndex((currentImageIndex - 1 + activeGallery.length) % activeGallery.length);
    }
  }, [currentImageIndex, activeGallery]);

  // Helper to clean carpark text
  const cleanCarpark = (val?: string) => {
    if (!val) return '';
    return val.replace(/carpark/gi, '').trim();
  };

  return (
    <>
      <Card className="group overflow-hidden border border-stone-200 bg-white flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/5 hover:border-emerald-900/25 rounded-2xl">
        {/* Image Section */}
        <div 
          className="relative h-60 md:h-64 overflow-hidden cursor-zoom-in group/img"
          onClick={() => openLightbox([image], 0)}
        >
          <img 
            src={publicAssetUrl(image)}
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent"></div>
          
          {/* Hover Zoom Indicator */}
          <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-40">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
              <ZoomIn size={24} />
            </div>
          </div>

          <Watermark size="sm" />
          <div className="absolute top-4 left-4 md:top-5 md:left-5 flex gap-2 z-50">
            <Badge className="bg-white/95 text-emerald-900 border-none px-3 py-1 rounded-md text-[9px] md:text-[10px] font-semibold uppercase tracking-wider shadow-sm">
              {tag}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6 md:p-8 flex-grow flex flex-col">
          <div className="mb-5 md:mb-6">
            <p className="text-emerald-800 font-semibold text-[10px] uppercase tracking-[0.14em] mb-2">{propertyType}</p>
            <h3 className="text-xl md:text-[1.35rem] font-semibold text-stone-900 leading-snug mb-2 group-hover:text-emerald-800 transition-colors">
              {title}
            </h3>
            <div className="flex items-center text-stone-500 text-xs gap-2 font-medium">
              <MapPin size={14} className="text-emerald-800" />
              <span className="truncate">{location}</span>
            </div>
          </div>
          
          {/* Specs Grid - With Labels for Main Card */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100 mb-5">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                <Maximize2 size={14} />
              </div>
              <span className="text-[10px] md:text-xs text-emerald-900 font-bold">{lotArea}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                <Home size={14} />
              </div>
              <span className="text-[10px] md:text-xs text-emerald-900 font-bold">{floorArea || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                <BedDouble size={14} />
              </div>
              <span className="text-[10px] md:text-xs text-emerald-900 font-bold">{beds} Bed</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                <Bath size={14} />
              </div>
              <span className="text-[10px] md:text-xs text-emerald-900 font-bold">{baths} Bath</span>
            </div>
            {carpark && (
              <div className="flex items-center gap-2 md:gap-3 col-span-2 border-t border-emerald-100/50 pt-3 mt-1">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                  <Car size={14} />
                </div>
                <span className="text-[10px] md:text-xs text-emerald-900 font-bold">{cleanCarpark(carpark)} Carpark</span>
              </div>
            )}
          </div>

          {/* Simplified TCP Price */}
          <div className="mt-auto pt-4 border-t border-stone-100 flex flex-col">
            <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-widest mb-1">Total contract price</span>
            <span className="text-2xl font-semibold text-stone-900 tracking-tight">{price}</span>
          </div>
        </CardContent>

        {/* Footer Action */}
        <CardFooter className="p-6 md:p-7 pt-0">
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <button className="w-full py-3.5 bg-emerald-900 text-white text-sm font-semibold rounded-lg hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2">
                View Full Details
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border-none shadow-2xl z-[150] p-0 [&>button:not([data-custom-close])]:hidden">
              {/* Professional Custom Close Button - Fixed Position */}
              <DialogClose 
                data-custom-close="true"
                className="absolute right-4 top-4 md:right-6 md:top-6 z-[200] w-10 h-10 md:w-12 md:h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-500 hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-white/20 group/close active:scale-90"
              >
                <X size={24} className="group-hover/close:rotate-90 transition-transform duration-500" />
              </DialogClose>

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto max-h-[90vh] w-full">
                <div className="relative">
                  {/* Hero Image in Dialog */}
                  <div 
                    className="relative h-56 md:h-96 w-full cursor-zoom-in group/dialog-img"
                    onClick={() => openLightbox(allImages, 0)}
                  >
                    <img src={publicAssetUrl(image)} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent"></div>
                    
                    {/* Hover Zoom Indicator */}
                    <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover/dialog-img:opacity-100 transition-opacity flex items-center justify-center z-40">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                        <ZoomIn size={32} />
                      </div>
                    </div>

                    <Watermark size="lg" />
                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-50">
                      <Badge className="bg-emerald-500 text-white mb-3 md:mb-4 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                        {tag}
                      </Badge>
                      <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter">{title}</h2>
                    </div>
                  </div>

                  <div className="p-6 md:p-12 space-y-10 md:space-y-12 bg-white">
                    {/* Quick Stats - Clean Numbers Only for Dialog */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                      {[
                        { icon: Maximize2, label: "Lot Area", value: lotArea },
                        { icon: Home, label: "Floor Area", value: floorArea },
                        { icon: BedDouble, label: "Provision", value: beds > 1 ? `${beds} Bedrooms` : `${beds} Bedroom` },
                        { icon: Bath, label: "Toilet & Bath", value: baths },
                        { icon: Car, label: "Carpark", value: cleanCarpark(carpark) || '0' }
                      ].map((stat, i) => (
                        <div key={i} className="bg-emerald-50 p-4 md:p-6 rounded-[1.25rem] md:rounded-[1.5rem] border border-emerald-100">
                          <stat.icon size={18} className="text-emerald-600 mb-2 md:mb-3" />
                          <p className="text-[8px] md:text-[10px] text-emerald-600/60 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="text-base md:text-lg font-bold text-emerald-950">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
                      <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        <div className="flex items-center gap-3 text-emerald-950">
                          <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                            <Info size={18} />
                          </div>
                          <h4 className="text-xl md:text-2xl font-black tracking-tight">Property Overview</h4>
                        </div>
                        <p className="text-emerald-900/70 text-base md:text-lg leading-relaxed">
                          {description}
                        </p>
                        
                        {/* Interior Gallery */}
                        {interiorImages.length > 0 && (
                          <div className="space-y-4 md:space-y-6 pt-4 md:pt-6">
                            <h5 className="text-[10px] md:text-sm font-black text-emerald-900 uppercase tracking-widest">Interior Gallery</h5>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                              {interiorImages.map((img, idx) => (
                                <div 
                                  key={idx} 
                                  className="group/gallery relative cursor-zoom-in overflow-hidden rounded-[1.5rem] md:rounded-[2rem] aspect-video shadow-md"
                                  onClick={() => openLightbox(interiorImages, idx)}
                                >
                                  <img src={publicAssetUrl(img)} alt="Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover/gallery:scale-110" />
                                  <Watermark size="xs" />
                                  <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover/gallery:opacity-100 transition-opacity flex items-center justify-center">
                                    <ZoomIn className="text-white" size={24} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Financing Sidebar */}
                      <div className="lg:col-span-1">
                        {financing && (
                          <div className="bg-emerald-950 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl sticky top-8">
                            <div className="flex items-center gap-3 mb-6 md:mb-8">
                              <Calculator size={20} className="text-emerald-400" />
                              <h4 className="text-lg md:text-xl font-black tracking-tight">Pag-IBIG Financing</h4>
                            </div>
                            
                            <div className="space-y-5 md:space-y-6 mb-8 md:mb-10">
                              <div>
                                <p className="text-[9px] md:text-[10px] text-emerald-400/60 font-black uppercase tracking-widest mb-1">TCP</p>
                                <p className="text-xl md:text-2xl font-black">{price}</p>
                              </div>
                              <div className="grid grid-cols-1 gap-3 md:gap-4">
                                <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10">
                                  <p className="text-[9px] md:text-[10px] text-emerald-400/60 font-black uppercase tracking-widest mb-1">Loanable</p>
                                  <p className="text-sm md:text-base font-bold">{financing.loanableAmount}</p>
                                </div>
                                <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10">
                                  <p className="text-[9px] md:text-[10px] text-emerald-400/60 font-black uppercase tracking-widest mb-1">Downpayment</p>
                                  <p className="text-sm md:text-base font-bold">{financing.downpayment}</p>
                                </div>
                              </div>
                            </div>

                            <h5 className="text-[9px] md:text-[10px] text-emerald-400/60 font-black uppercase tracking-widest mb-3 md:mb-4">Monthly Amortization</h5>
                            <div className="space-y-2 md:space-y-3">
                              {financing.amortization.map((opt) => (
                                <div key={opt.years} className="flex justify-between items-center py-2.5 md:py-3 border-b border-white/10 last:border-0">
                                  <span className="text-xs md:text-sm font-medium text-emerald-100/60">{opt.years} Years</span>
                                  <span className="text-xs md:text-sm font-black">{opt.amount}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      {/* Zoom Lightbox with Navigation */}
      <Dialog open={currentImageIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none z-[9999] flex items-center justify-center [&>button]:hidden">
          <div className="relative group/zoom w-full h-full flex items-center justify-center">
            {/* Image Container - Controls are now INSIDE this div */}
            <div className="relative inline-block overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-white/10 max-w-full max-h-[85vh]">
              <img 
                src={currentImageIndex !== null ? publicAssetUrl(activeGallery[currentImageIndex]) : ''}
                alt="Gallery view" 
                className="max-w-full max-h-[85vh] object-contain animate-in zoom-in-95 duration-300"
              />
              <Watermark size="lg" />

              {/* Close Button - Inside Photo */}
              <button 
                className="absolute top-4 right-4 w-10 h-10 md:w-14 md:h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all duration-300 z-[10001] shadow-2xl border-2 border-white/20 hover:bg-emerald-500 hover:scale-110 active:scale-90"
                onClick={closeLightbox}
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons - Inside Photo */}
              {activeGallery.length > 1 && (
                <>
                  <button 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 z-[10001] border border-white/20 hover:bg-emerald-600 hover:border-emerald-400 group/nav active:scale-90"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={32} className="group-hover/nav:-translate-x-1 transition-transform" />
                  </button>
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 z-[10001] border border-white/20 hover:bg-emerald-600 hover:border-emerald-400 group/nav active:scale-90"
                    onClick={nextImage}
                  >
                    <ChevronRight size={32} className="group-hover/nav:translate-x-1 transition-transform" />
                  </button>

                  {/* Image Counter - Inside Photo */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-emerald-950/80 backdrop-blur-xl rounded-full border border-white/10 text-white text-xs md:text-sm font-black tracking-widest z-[10001]">
                    {currentImageIndex !== null ? currentImageIndex + 1 : 0} / {activeGallery.length}
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyCard;