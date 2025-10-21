import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { DoubleSliderAuth } from "@/components/auth/DoubleSliderAuth";
import ProjectInfo from "./pages/ProjectInfo";
import EnvironmentalData from "./pages/EnvironmentalData";
import PoleGeometry from "./pages/PoleGeometry";
import ConductorData from "./pages/ConductorData";
import LoadCalculations from "./pages/LoadCalculations";
import StructuralAnalysis from "./pages/StructuralAnalysis";
import DesignChecks from "./pages/DesignChecks";
import Serviceability from "./pages/Serviceability";
import Connections from "./pages/Connections";
import OutputReport from "./pages/OutputReport";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Authentication Pages */}
          <Route path="/auth" element={<DoubleSliderAuth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Main Application */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ProjectInfo />} />
            <Route path="environmental" element={<EnvironmentalData />} />
            <Route path="geometry" element={<PoleGeometry />} />
            <Route path="conductor" element={<ConductorData />} />
            <Route path="loads" element={<LoadCalculations />} />
            <Route path="analysis" element={<StructuralAnalysis />} />
            <Route path="checks" element={<DesignChecks />} />
            <Route path="serviceability" element={<Serviceability />} />
            <Route path="connections" element={<Connections />} />
            <Route path="report" element={<OutputReport />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
