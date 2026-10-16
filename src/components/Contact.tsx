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
    <section id="contact" className="py-16 md:py-24 bg-[#14251e] text-white overflow-hidden relative min-h-[80vh] flex items-center">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/20 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-emerald-300 font-semibold tracking-[0.16em] uppercase text-[10px] md:text-xs mb-3">Get in touch</h2>
          <h3 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] mb-4">Let’s talk about your new home.</h3>
          <p className="text-white/65 text-base md:text-lg max-w-2xl mx-auto">
            Connect with our official development team for site viewings, investment consultations, and exclusive property details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="lg:col-span-5 space-y-8 md:space-y-10">
            <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-7 h-px bg-emerald-300"></span>
                Contact Us
              </h4>
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-emerald-200 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-emerald-200 text-[10px] font-semibold uppercase tracking-wider mb-1">Direct line</p>
                    <a href="tel:09760638627" className="text-lg md:text-xl font-semibold hover:text-emerald-200 transition-colors">0976 063 8627</a>
                    <p className="text-white/45 text-xs mt-1 flex items-center gap-1">
                      <Clock size={12} /> Everyday: 8AM - 6PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-emerald-200 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-emerald-200 text-[10px] font-semibold uppercase tracking-wider mb-1">Email inquiry</p>
                    <a href="mailto:analizacatacutan24@gmail.com" className="text-base md:text-lg font-semibold break-all hover:text-emerald-200 transition-colors">analizacatacutan24@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-emerald-200 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-emerald-200 text-[10px] font-semibold uppercase tracking-wider mb-1">Site location</p>
                    <p className="text-base md:text-lg font-semibold">Pulong Bayabas, San Miguel, Bulacan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-white/[0.04] rounded-xl border border-white/10">
              <ShieldCheck className="text-emerald-200 flex-shrink-0" size={20} />
              <p className="text-xs md:text-sm text-white/65">
                Your inquiry is handled directly by our licensed development consultants. We value your privacy and data security.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl text-stone-900">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-stone-700 font-semibold text-xs uppercase tracking-wider">Full name</label>
                    <Input 
                      name="fullname"
                      placeholder="Enter your name" 
                      className="h-12 bg-stone-50 border-stone-200 text-stone-900 focus-visible:ring-emerald-800 rounded-lg"
                      required 
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-stone-700 font-semibold text-xs uppercase tracking-wider">Email address</label>
                    <Input 
                      name="email"
                      type="email" 
                      placeholder="email@example.com" 
                      className="h-12 bg-stone-50 border-stone-200 text-stone-900 focus-visible:ring-emerald-800 rounded-lg"
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-stone-700 font-semibold text-xs uppercase tracking-wider">Phone number</label>
                    <Input 
                      name="phone"
                      placeholder="+63 900 000 0000" 
                      className="h-12 bg-stone-50 border-stone-200 text-stone-900 focus-visible:ring-emerald-800 rounded-lg"
                      required 
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-stone-700 font-semibold text-xs uppercase tracking-wider">Interested in</label>
                    <select 
                      name="interest"
                      className="w-full h-12 bg-stone-50 border border-stone-200 text-stone-900 focus:ring-2 focus:ring-emerald-800 rounded-lg px-4 outline-none appearance-none text-sm md:text-base"
                    >
                      <option>Rowhouse Inner Unit</option>
                      <option>Rowhouse Corner Unit</option>
                      <option>Duplex Unit</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <label className="text-stone-700 font-semibold text-xs uppercase tracking-wider">Your message</label>
                  <Textarea 
                    name="message"
                    placeholder="Tell us about your requirements..." 
                    className="bg-stone-50 border-stone-200 text-stone-900 focus-visible:ring-emerald-800 min-h-[130px] rounded-lg p-4 text-sm md:text-base"
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white h-12 rounded-lg text-sm md:text-base font-semibold transition-colors shadow-sm disabled:opacity-70"
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