"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook,
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#14251e] text-white py-12 md:py-16 overflow-hidden relative">
      {/* Subtle Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-8">
          
          {/* Brand & Description */}
          <div className="flex flex-col items-center lg:items-start max-w-xs text-center lg:text-left">
            <Logo variant="footer" className="mb-4" />
            <p className="text-white/55 text-sm leading-relaxed">
              “Experience a premium, flood-free community in San Miguel, Bulacan—where modern living meets timeless tranquility.”
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="flex items-center gap-3 group">
              <MapPin size={16} className="text-emerald-300" />
              <div className="text-center md:text-left">
                <p className="text-[10px] font-semibold text-emerald-200/70 uppercase tracking-widest">Location</p>
                <p className="text-xs font-medium text-white/90">Pulong Bayabas, San Miguel, Bulacan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <Phone size={16} className="text-emerald-300" />
              <div className="text-center md:text-left">
                <p className="text-[10px] font-semibold text-emerald-200/70 uppercase tracking-widest">Call us</p>
                <a href="tel:09760638627" className="text-xs font-medium text-white/90 hover:text-emerald-200">0976 063 8627</a>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <Mail size={16} className="text-emerald-300" />
              <div className="text-center md:text-left">
                <p className="text-[10px] font-semibold text-emerald-200/70 uppercase tracking-widest">Email</p>
                <a href="mailto:analizacatacutan24@gmail.com" className="text-xs font-medium text-white/90 hover:text-emerald-200">analizacatacutan24@gmail.com</a>
              </div>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs font-medium text-white/70">
            <Link to="/#properties" className="hover:text-white transition-colors">Homes</Link>
            <Link to="/#highlights" className="hover:text-white transition-colors">Neighborhood</Link>
            <Link to="/#visit" className="hover:text-white transition-colors">Location</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Schedule a viewing</Link>
          </nav>

          {/* Social Links */}
          <div className="flex gap-3" aria-label="Social media">
            <a 
              href="https://www.facebook.com/fmastersv" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Farm Masters Village on Facebook"
              className="w-10 h-10 bg-white/5 text-emerald-400 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 border border-white/5"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-emerald-500/30">
            <ShieldCheck size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">
              &copy; {currentYear} Farm Masters Village III
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;