"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#14251e] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-8 sm:px-6 sm:pt-9 lg:px-8 lg:pt-10">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(7.5rem,0.55fr)_minmax(0,1.25fr)] md:gap-8">
          <div>
            <Logo variant="footer" className="mb-2" />
            <p className="text-sm leading-5 text-white/65">Find a place to call home.</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-200/80">Explore</h2>
            <ul className="flex flex-wrap gap-x-5 md:flex-col md:gap-0">
              <li>
                <Link to="/" className="inline-flex min-h-10 items-center text-sm text-white/75 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#properties" className="inline-flex min-h-10 items-center text-sm text-white/75 transition-colors hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/contact" className="inline-flex min-h-10 items-center text-sm text-white/75 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <section aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-200/80">
              Contact
            </h2>
            <ul className="grid gap-2 text-sm leading-5 text-white/75">
              <li className="flex min-w-0 items-start gap-2.5">
                <MapPin aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                <span>Pulong Bayabas, San Miguel, Bulacan</span>
              </li>
              <li className="flex min-w-0 items-start gap-2.5">
                <Phone aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                <a href="tel:09760638627" className="min-w-0 break-all transition-colors hover:text-white">
                  0976 063 8627
                </a>
              </li>
              <li className="flex min-w-0 items-start gap-2.5">
                <Mail aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                <a href="mailto:analizacatacutan24@gmail.com" className="min-w-0 break-all transition-colors hover:text-white">
                  analizacatacutan24@gmail.com
                </a>
              </li>
              <li className="flex min-w-0 items-start gap-2.5">
                <Facebook aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                <a
                  href="https://www.facebook.com/fmastersv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Facebook
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/50">
          &copy; {currentYear} Farm Masters Village III
        </div>
      </div>
    </footer>
  );
};

export default Footer;