"use client";

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { showSuccess, showError } from '@/utils/toast';
import Logo from '@/components/Logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin/inquiries";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      showSuccess("Welcome back, Admin!");
      navigate(from, { replace: true });
    } catch (error: unknown) {
      console.error("Login attempt failed:", error);
      showError(error instanceof Error ? error.message : "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Logo variant="dark" />
        </div>

        <Card className="rounded-2xl border-stone-200 shadow-xl shadow-stone-900/5 overflow-hidden">
          <CardHeader className="bg-stone-50 border-b border-stone-200 p-8 text-center">
            <div className="w-12 h-12 bg-emerald-800 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <CardTitle className="text-2xl font-semibold text-stone-900 tracking-tight">Admin Portal</CardTitle>
            <CardDescription className="text-emerald-800/60 font-medium">
              Secure access for authorized personnel only.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="admin-email" className="text-[10px] font-black uppercase tracking-widest text-emerald-900/50 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                  <Input 
                    id="admin-email"
                    type="email" 
                    placeholder="admin@farmmasters.com" 
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 rounded-xl border-emerald-100 bg-emerald-50/30 focus-visible:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="admin-password" className="text-[10px] font-black uppercase tracking-widest text-emerald-900/50 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                  <Input 
                    id="admin-password"
                    type="password" 
                    placeholder="••••••••" 
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-14 rounded-xl border-emerald-100 bg-emerald-50/30 focus-visible:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Sign In to Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <button 
          onClick={() => navigate('/')}
          className="mt-8 flex items-center gap-2 text-emerald-900/40 hover:text-emerald-600 font-bold text-sm transition-colors mx-auto"
        >
          <ArrowLeft size={16} />
          Back to Website
        </button>
      </div>
    </div>
  );
};

export default LoginPage;