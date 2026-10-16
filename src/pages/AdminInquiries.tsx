"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Loader2, 
  RefreshCw, 
  Copy, 
  Check,
  Clock,
  Bell
} from 'lucide-react';
import { format } from 'date-fns';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  created_at: string;
}

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error: any) {
      console.error('Error fetching inquiries:', error);
      showError(error.message || "Failed to fetch inquiries from the database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'inquiries',
        },
        (payload) => {
          const newInquiry = payload.new as Inquiry;
          setInquiries((prev) => [newInquiry, ...prev]);
          
          // Notify the admin with a toast and a sound (optional)
          showSuccess(`New Inquiry from ${newInquiry.name}!`);
          
          // Play a subtle notification sound if desired
          try {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.volume = 0.5;
            audio.play();
          } catch (e) {
            console.log("Audio playback blocked by browser");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showSuccess(`Copied: ${text}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Live Dashboard
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-stone-900 tracking-[-0.04em]">
              Client <span className="text-emerald-600">Inquiries</span>
            </h1>
            <p className="text-emerald-800/50 font-medium text-sm md:text-base">
              Manage and track potential leads for Farm Masters Village III.
            </p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-xs font-bold">
              <Bell size={14} className="animate-bounce" />
              Real-time Active
            </div>
            <button 
              onClick={fetchInquiries}
              disabled={loading}
              className="group flex items-center gap-3 bg-white border border-emerald-100 text-emerald-700 px-6 py-3 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-sm active:scale-95 disabled:opacity-50 flex-1 md:flex-none justify-center"
            >
              <RefreshCw size={18} className={cn("transition-transform duration-500", loading ? "animate-spin" : "group-hover:rotate-180")} />
              Refresh
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          {loading && inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-emerald-600">
              <div className="relative">
                <Loader2 size={48} className="animate-spin mb-4" />
                <div className="absolute inset-0 blur-xl bg-emerald-400/20 animate-pulse"></div>
              </div>
              <p className="font-black text-xs uppercase tracking-widest animate-pulse">Syncing Database...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-32 px-6">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-200 mx-auto mb-8">
                <MessageSquare size={48} />
              </div>
              <h3 className="text-2xl font-black text-emerald-950 tracking-tight">No inquiries yet</h3>
              <p className="text-emerald-800/40 mt-2 max-w-xs mx-auto font-medium">
                When users fill out the contact form on your website, their details will appear here instantly.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader className="bg-emerald-50/30">
                    <TableRow className="hover:bg-transparent border-emerald-100">
                      <TableHead className="w-[220px] font-black text-emerald-900 uppercase tracking-widest text-[10px] py-8 px-8">Received</TableHead>
                      <TableHead className="font-black text-emerald-900 uppercase tracking-widest text-[10px] py-8">Client Details</TableHead>
                      <TableHead className="font-black text-emerald-900 uppercase tracking-widest text-[10px] py-8">Interest</TableHead>
                      <TableHead className="font-black text-emerald-900 uppercase tracking-widest text-[10px] py-8 px-8">Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id} className="hover:bg-emerald-50/20 border-emerald-50 transition-colors group animate-in fade-in slide-in-from-left-4 duration-500">
                        <TableCell className="py-8 px-8">
                          <div className="flex items-center gap-3 text-emerald-950 font-bold">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                              <Calendar size={14} />
                            </div>
                            {format(new Date(inquiry.created_at), 'MMM dd, yyyy')}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-emerald-800/40 font-black uppercase tracking-wider mt-2 ml-11">
                            <Clock size={10} />
                            {format(new Date(inquiry.created_at), 'hh:mm a')}
                          </div>
                        </TableCell>
                        <TableCell className="py-8">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 font-black text-emerald-950 text-base">
                              <User size={16} className="text-emerald-500" />
                              {inquiry.name}
                            </div>
                            <div className="flex flex-col gap-2">
                              <button 
                                onClick={() => copyToClipboard(inquiry.email, `email-${inquiry.id}`)}
                                className="flex items-center gap-2 text-sm text-emerald-800/60 hover:text-emerald-600 transition-colors group/btn w-fit"
                              >
                                <Mail size={14} />
                                {inquiry.email}
                                {copiedId === `email-${inquiry.id}` ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />}
                              </button>
                              <button 
                                onClick={() => copyToClipboard(inquiry.phone, `phone-${inquiry.id}`)}
                                className="flex items-center gap-2 text-sm text-emerald-800/60 hover:text-emerald-600 transition-colors group/btn w-fit"
                              >
                                <Phone size={14} />
                                {inquiry.phone}
                                {copiedId === `phone-${inquiry.id}` ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />}
                              </button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-8">
                          <Badge className="bg-emerald-100 text-emerald-700 border-none px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm">
                            {inquiry.interest}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-8 px-8 max-w-md">
                          <div className="relative">
                            <p className="text-sm text-emerald-900/70 leading-relaxed line-clamp-3 italic font-medium">
                              "{inquiry.message}"
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="lg:hidden divide-y divide-emerald-50">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-6 space-y-6 hover:bg-emerald-50/30 transition-colors animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-emerald-950 tracking-tight">{inquiry.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-800/40 uppercase tracking-widest">
                          <Calendar size={12} />
                          {format(new Date(inquiry.created_at), 'MMM dd, yyyy')}
                          <span className="mx-1">•</span>
                          {format(new Date(inquiry.created_at), 'hh:mm a')}
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-widest">
                        {inquiry.interest}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <button 
                        onClick={() => copyToClipboard(inquiry.email, `m-email-${inquiry.id}`)}
                        className="flex items-center justify-between w-full p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 active:scale-[0.98] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm">
                            <Mail size={14} />
                          </div>
                          <span className="text-sm font-bold text-emerald-900 truncate max-w-[200px]">{inquiry.email}</span>
                        </div>
                        {copiedId === `m-email-${inquiry.id}` ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-emerald-300" />}
                      </button>

                      <button 
                        onClick={() => copyToClipboard(inquiry.phone, `m-phone-${inquiry.id}`)}
                        className="flex items-center justify-between w-full p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 active:scale-[0.98] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm">
                            <Phone size={14} />
                          </div>
                          <span className="text-sm font-bold text-emerald-900">{inquiry.phone}</span>
                        </div>
                        {copiedId === `m-phone-${inquiry.id}` ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-emerald-300" />}
                      </button>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest mb-2">Message</p>
                      <p className="text-sm text-emerald-900/70 leading-relaxed italic font-medium">
                        "{inquiry.message}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminInquiries;