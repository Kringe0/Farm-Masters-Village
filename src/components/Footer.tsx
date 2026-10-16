"use client";

import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-white py-12 md:py-16 overflow-hidden relative">
      {/* Subtle Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-4">
          
          {/* Brand & Description */}
          <div className="flex flex-col items-center lg:items-start max-w-xs text-center lg:text-left">
            <Logo variant="footer" className="mb-4" />
            <p className="text-emerald-100/40 text-xs font-medium leading-relaxed">
              “Experience a premium, flood-free community in San Miguel, Bulacan—where modern living meets timeless tranquility.”
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="flex items-center gap-3 group">
              <MapPin size={16} className="text-emerald-500" />
              <div className="text-center md:text-left">
                <p className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest">Location</p>
                <p className="text-xs font-bold text-white/90">Pulong Bayabas, San Miguel, Bulacan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <Phone size={16} className="text-emerald-500" />
              <div className="text-center md:text-left">
                <p className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest">Call Us</p>
                <p className="text-xs font-bold text-white/90">0976 063 8627</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <Mail size={16} className="text-emerald-500" />
              <div className="text-center md:text-left">
                <p className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest">Email</p>
                <p className="text-xs font-bold text-white/90">analizacatacutan24@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a 
              href="https://www.facebook.com/fmastersv" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 text-emerald-400 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 border border-white/5"
            >
              <Facebook size={18} />
            </a>
            {[Instagram, Linkedin, Twitter].map((Icon, idx) => (
              <a 
                key={idx}
                href="#" 
                className="w-10 h-10 bg-white/5 text-emerald-400 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 border border-white/5"
              >
                <Icon size={18} />
              </a>
            ))}
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
          
          <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-100/10">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;