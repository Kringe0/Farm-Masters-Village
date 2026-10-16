"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Clock, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/lib/supabase';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get('fullname'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      interest: formData.get('interest'),
      message: formData.get('message'),
    };

    try {
      // 1. Save to Database
      const { data, error } = await supabase
        .from('inquiries')
        .insert([payload])
        .select();

      if (error) throw error;

      // 2. Trigger Notification Function
      try {
        // Use just the function name 'notify-admin'
        // The Supabase client automatically handles the base URL
        await supabase.functions.invoke('notify-admin', {
          body: { record: data[0] }
        });
      } catch (fnError) {
        console.error("Notification trigger failed:", fnError);
      }

      showSuccess("Thank you! Your inquiry has been received.");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error("Submission error:", error);
      showError("Failed to send inquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-emerald-950 text-white overflow-hidden relative min-h-[80vh] flex items-center">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/20 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-emerald-400 font-bold tracking-widest uppercase text-[10px] md:text-sm mb-3 md:mb-4">Get in Touch</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Inquiries</h3>
          <p className="text-emerald-100/60 text-base md:text-lg max-w-2xl mx-auto">
            Connect with our official development team for site viewings, investment consultations, and exclusive property details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="lg:col-span-5 space-y-8 md:space-y-10">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] md:rounded-3xl p-6 md:p-10">
              <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                Contact Us
              </h4>
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/20 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">Direct Line</p>
                    <p className="text-lg md:text-xl font-semibold">0976 063 8627</p>
                    <p className="text-emerald-100/40 text-xs mt-1 flex items-center gap-1">
                      <Clock size={12} /> Everyday: 8AM - 6PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/20 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">Email Inquiry</p>
                    <p className="text-lg md:text-xl font-semibold break-all">analizacatacutan24@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/20 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">Site Location</p>
                    <p className="text-lg md:text-xl font-semibold">Pulong Bayabas, San Miguel, Bulacan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 md:p-6 bg-emerald-900/40 rounded-2xl border border-emerald-800/50">
              <ShieldCheck className="text-emerald-400 flex-shrink-0" size={20} />
              <p className="text-xs md:text-sm text-emerald-100/70">
                Your inquiry is handled directly by our licensed development consultants. We value your privacy and data security.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl text-emerald-950">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-emerald-900 font-bold text-[10px] md:text-sm uppercase tracking-wider">Full Name</label>
                    <Input 
                      name="fullname"
                      placeholder="Enter your name" 
                      className="h-12 md:h-14 bg-emerald-50/50 border-emerald-100 text-emerald-900 focus-visible:ring-emerald-600 rounded-xl" 
                      required 
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-emerald-900 font-bold text-[10px] md:text-sm uppercase tracking-wider">Email Address</label>
                    <Input 
                      name="email"
                      type="email" 
                      placeholder="email@example.com" 
                      className="h-12 md:h-14 bg-emerald-50/50 border-emerald-100 text-emerald-900 focus-visible:ring-emerald-600 rounded-xl" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-emerald-900 font-bold text-[10px] md:text-sm uppercase tracking-wider">Phone Number</label>
                    <Input 
                      name="phone"
                      placeholder="+63 900 000 0000" 
                      className="h-12 md:h-14 bg-emerald-50/50 border-emerald-100 text-emerald-900 focus-visible:ring-emerald-600 rounded-xl" 
                      required 
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-emerald-900 font-bold text-[10px] md:text-sm uppercase tracking-wider">Interested In</label>
                    <select 
                      name="interest"
                      className="w-full h-12 md:h-14 bg-emerald-50/50 border border-emerald-100 text-emerald-900 focus:ring-2 focus:ring-emerald-600 rounded-xl px-4 outline-none appearance-none text-sm md:text-base"
                    >
                      <option>Rowhouse Inner Unit</option>
                      <option>Rowhouse Corner Unit</option>
                      <option>Duplex Unit</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <label className="text-emerald-900 font-bold text-[10px] md:text-sm uppercase tracking-wider">Your Message</label>
                  <Textarea 
                    name="message"
                    placeholder="Tell us about your requirements..." 
                    className="bg-emerald-50/50 border-emerald-100 text-emerald-900 focus-visible:ring-emerald-600 min-h-[120px] md:min-h-[160px] rounded-xl p-4 md:p-5 text-sm md:text-base" 
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 md:h-16 rounded-2xl text-base md:text-lg font-bold transition-all duration-300 shadow-lg shadow-emerald-200 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-3 animate-spin" size={20} />
                  ) : (
                    <Send className="mr-3" size={20} />
                  )}
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;