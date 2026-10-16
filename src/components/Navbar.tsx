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
      "fixed w-full z-[100] transition-all duration-500",
      !isTransparent ? "bg-white/95 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
            <Logo variant="dark" forceLightText={isTransparent} />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAdminPage ? (
              <>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-bold transition-all tracking-wide hover:opacity-70",
                      !isTransparent ? "text-emerald-900" : "text-white"
                    )}
                  >
                    {link.name}
                  </a>
                ))}
              </>
            ) : (
              <>
                <Link to="/admin/inquiries" className="text-sm font-bold text-emerald-900 hover:opacity-70">Inquiries</Link>
                <Link to="/admin/properties" className="text-sm font-bold text-emerald-900 hover:opacity-70">Properties</Link>
              </>
            )}

            {user ? (
              <div className="flex items-center gap-4">
                {!isAdminPage && (
                  <Link 
                    to="/admin/inquiries" 
                    className="flex items-center gap-2 text-emerald-600 font-bold text-sm hover:opacity-70"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-100 transition-all active:scale-95"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/contact" 
                className="bg-emerald-600 text-white px-7 py-3 rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
              >
                Inquire Now
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2.5 rounded-2xl transition-all active:scale-90",
                !isTransparent ? "text-emerald-900 bg-emerald-50" : "text-white bg-white/10"
              )}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "absolute top-full left-0 w-full bg-white border-b border-emerald-50 shadow-2xl md:hidden transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 pt-2 pb-10 space-y-2">
          {!isAdminPage ? (
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-4 px-5 py-4 text-emerald-900 hover:bg-emerald-50 rounded-2xl font-bold transition-colors active:scale-[0.98]"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 bg-emerald-100/50 rounded-xl flex items-center justify-center text-emerald-600">
                  <link.icon size={20} />
                </div>
                {link.name}
              </a>
            ))
          ) : (
            <>
              <Link 
                to="/admin/inquiries" 
                className="flex items-center gap-4 px-5 py-4 text-emerald-900 hover:bg-emerald-50 rounded-2xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/properties" 
                className="flex items-center gap-4 px-5 py-4 text-emerald-900 hover:bg-emerald-50 rounded-2xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                Properties
              </Link>
            </>
          )}
          
          <div className="pt-4 px-2">
            {user ? (
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="flex items-center justify-center gap-3 w-full bg-red-50 text-red-600 py-5 rounded-2xl font-bold active:scale-95"
              >
                <LogOut size={20} />
                Logout
              </button>
            ) : (
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="block w-full bg-emerald-600 text-white text-center py-5 rounded-2xl font-bold shadow-xl shadow-emerald-600/20 active:scale-95"
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