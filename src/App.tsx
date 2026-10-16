import { lazy, Suspense, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import Index from "./pages/Index";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminInquiries = lazy(() => import("./pages/AdminInquiries"));
const AdminProperties = lazy(() => import("./pages/AdminProperties"));
const NotFound = lazy(() => import("./pages/NotFound"));

const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousLocation = useRef(location);

  useEffect(() => {
    const previous = previousLocation.current;
    previousLocation.current = location;

    if (location.hash) {
      const targetId = location.hash.slice(1);
      let attempts = 0;
      let frameId = 0;

      const scrollToTarget = () => {
        const target = document.getElementById(targetId);
        if (target) {
          const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
          return;
        }

        if (attempts++ < 120) {
          frameId = window.requestAnimationFrame(scrollToTarget);
        }
      };

      frameId = window.requestAnimationFrame(scrollToTarget);
      return () => window.cancelAnimationFrame(frameId);
    }

    if (
      navigationType !== "POP" &&
      (previous.pathname !== location.pathname || previous.hash !== location.hash)
    ) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location, navigationType]);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/Farm-Masters-Village">
          <ScrollManager />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#fbfaf7]" role="status">
              <p className="text-sm font-medium text-stone-600">Loading page…</p>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/admin/inquiries"
                element={
                  <ProtectedRoute>
                    <AdminInquiries />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/properties"
                element={
                  <ProtectedRoute>
                    <AdminProperties />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;