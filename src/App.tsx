import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Map from './components/Map';
import Landing from './pages/Landing';
import Pharmacies from './pages/Pharmacies';
import HealthRecords from './pages/HealthRecords';
import VideoConsultation from './pages/VideoConsultation';
import PatientMonitoring from './pages/PatientMonitoring';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/toaster';

interface MapProps {
  showNearbyServices?: boolean;
  defaultFilter?: string;
  // other props
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container p-4">
              <Navigation />
            </div>
          </header>

          <main className="container p-4">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/healthcare-map" element={<Map />} />
              <Route path="/pharmacies" element={<Pharmacies />} />
              <Route path="/doctors" element={
                <Map 
                  showNearbyServices={true}
                  defaultFilter="doctor"
                />
              } />
              <Route path="/clinics" element={
                <Map 
                  showNearbyServices={true}
                  defaultFilter="hospital"
                />
              } />
              <Route path="/health-records" element={<HealthRecords />} />
              <Route path="/video-consultation" element={<VideoConsultation />} />
              <Route path="/monitoring" element={<PatientMonitoring />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </Router>
    </LanguageProvider>
  );
};

export default App;
