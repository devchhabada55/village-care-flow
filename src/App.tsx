import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SymptomChecker from "./pages/SymptomChecker";
import BookAppointment from "./pages/BookAppointment";
import HealthRecords from "./pages/HealthRecords";
import Medications from "./pages/Medications";
import VideoConsultation from "./pages/VideoConsultation";
import Pharmacies from "./pages/Pharmacies";
import PatientMonitoring from "./pages/PatientMonitoring";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/health-records" element={<HealthRecords />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/video-consultation" element={<VideoConsultation />} />
            <Route path="/pharmacies" element={<Pharmacies />} />
            <Route path="/monitoring" element={<PatientMonitoring />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
