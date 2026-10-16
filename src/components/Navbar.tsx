"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Home, MapPin, UserCheck, LogOut, LayoutDashboard, Sparkles, Route } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { showSuccess } from '@/utils/toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showSuccess("Logged out successfully");
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Properties', href: '/#properties', icon: MapPin },
    { name: 'Journey', href: '/#journey', icon: Route },
    { name: 'Agent', href: '/#agent', icon: UserCheck },
    { name: 'Highlights', href: '/#highlights', icon: Sparkles },
  ];

  const isTransparent = !scrolled && location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <nav className={cn(
      "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
      !isTransparent ? "bg-white/95 backdrop-blur-xl py-3 shadow-sm border-b border-stone-200/80" : "bg-gradient-to-b from-black/20 to-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-12">
          <Link to="/" aria-label="Farm Masters Village III home" className="flex-shrink-0 transition-opacity hover:opacity-85">
            <Logo variant="dark" forceLightText={isTransparent} />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            {!isAdminPage ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "text-[13px] font-semibold transition-colors tracking-wide hover:text-emerald-700",
                      !isTransparent ? "text-stone-700" : "text-white/90"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </>
            ) : (
              <>
                <Link to="/admin/inquiries" className="text-sm font-semibold text-stone-700 hover:text-emerald-700">Inquiries</Link>
                <Link to="/admin/properties" className="text-sm font-semibold text-stone-700 hover:text-emerald-700">Properties</Link>
              </>
            )}

            {user ? (
              <div className="flex items-center gap-4">
                {!isAdminPage && (
                  <Link 
                    to="/admin/inquiries" 
                    className="flex items-center gap-2 text-emerald-700 font-semibold text-sm hover:text-emerald-900"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-stone-100 text-stone-700 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-stone-200 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/contact" 
                className="bg-emerald-800 text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-900 transition-colors shadow-sm"
              >
                Inquire Now
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className={cn(
                "p-2.5 rounded-lg transition-colors",
                !isTransparent ? "text-stone-800 bg-stone-100" : "text-white bg-white/10"
              )}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "absolute top-full left-0 w-full bg-white border-b border-stone-200 shadow-xl md:hidden transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div id="mobile-navigation" className="px-4 pt-3 pb-6 space-y-1">
          {!isAdminPage ? (
            navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-4 px-4 py-3 text-stone-800 hover:bg-stone-50 rounded-xl font-semibold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-800">
                  <link.icon size={20} />
                </div>
                {link.name}
              </Link>
            ))
          ) : (
            <>
              <Link 
                to="/admin/inquiries" 
                className="flex items-center gap-4 px-4 py-3 text-stone-800 hover:bg-stone-50 rounded-xl font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/properties" 
                className="flex items-center gap-4 px-4 py-3 text-stone-800 hover:bg-stone-50 rounded-xl font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Properties
              </Link>
            </>
          )}
          
          <div className="pt-3 px-1">
            {user ? (
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="flex items-center justify-center gap-3 w-full bg-stone-100 text-stone-700 py-3.5 rounded-xl font-semibold"
              >
                <LogOut size={20} />
                Logout
              </button>
            ) : (
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="block w-full bg-emerald-800 text-white text-center py-3.5 rounded-xl font-semibold shadow-sm"
              >
                Inquire Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;