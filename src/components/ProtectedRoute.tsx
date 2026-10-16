"use client";

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setAuthenticated(!!session);
      } catch (error: unknown) {
        console.error("Failed to verify protected route access:", error);
        setVerificationFailed(true);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      setVerificationFailed(false);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 size={48} className="animate-spin text-emerald-600 mb-4" />
        <p className="text-emerald-900 font-bold animate-pulse">Verifying access...</p>
      </div>
    );
  }

  if (verificationFailed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#fbfaf7] px-6 text-center">
        <h1 className="text-xl font-semibold text-stone-900">Unable to verify access</h1>
        <p className="max-w-md text-sm text-stone-600">Refresh the page to retry, or return to the website. Protected content remains unavailable until your session can be verified.</p>
        <button onClick={() => window.location.reload()} className="mt-2 min-h-11 rounded-lg bg-emerald-900 px-5 text-sm font-semibold text-white hover:bg-emerald-800">
          Retry
        </button>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;