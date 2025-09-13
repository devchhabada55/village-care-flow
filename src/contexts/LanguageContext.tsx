import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  speak: (text: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.records': 'Health Records',
    'nav.medications': 'Medications',
    'nav.consultations': 'Consultations',
    'nav.pharmacies': 'Pharmacies',
    'nav.monitoring': 'Monitoring',
    'nav.emergency': 'Emergency',
    'nav.chatbot': 'AI Assistant',
    'nav.admin': 'Admin Panel',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.book_now': 'Book Now',
    'common.view_details': 'View Details',
    'common.emergency_call': 'Call 108 - Emergency',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to Village Care',
    'dashboard.upcoming_appointment': 'Upcoming Appointment',
    'dashboard.next_medication': 'Next Medication',
    'dashboard.health_alerts': 'Health Alerts',
    'dashboard.book_consultation': 'Book Consultation',
    'dashboard.symptom_checker': 'Symptom Checker',
    'dashboard.view_records': 'View Records',
    'dashboard.nearby_pharmacies': 'Nearby Pharmacies',
    
    // Symptom Checker
    'symptom.title': 'Symptom Checker',
    'symptom.subtitle': 'Answer a few questions to get personalized health guidance',
    'symptom.question_1': 'What is your main health concern today?',
    'symptom.upload_image': 'Upload Photo (Optional)',
    'symptom.ai_analysis': 'AI Analysis Available',
    
    // Health Records
    'records.title': 'Health Records',
    'records.prescriptions': 'Prescriptions',
    'records.lab_reports': 'Lab Reports',
    'records.doctor_notes': 'Doctor Notes',
    'records.offline_available': 'Available Offline',
    
    // Medications
    'medication.title': 'Medications & Reminders',
    'medication.current': 'Current Medications',
    'medication.reminders': 'Reminders',
    'medication.refill_needed': 'Refill Needed',
    
    // Consultations
    'consultation.title': 'Video Consultation',
    'consultation.audio_only': 'Audio Only',
    'consultation.poor_connection': 'Poor Connection - Audio Recommended',
    'consultation.join_call': 'Join Call',
    
    // Pharmacy
    'pharmacy.title': 'Local Pharmacies',
    'pharmacy.in_stock': 'In Stock',
    'pharmacy.low_stock': 'Low Stock',
    'pharmacy.out_of_stock': 'Out of Stock',
    'pharmacy.reserve': 'Reserve',
    'pharmacy.pickup': 'Pickup Available',
    'pharmacy.delivery': 'Home Delivery',
    
    // Monitoring
    'monitoring.title': 'Health Monitoring',
    'monitoring.bp': 'Blood Pressure',
    'monitoring.glucose': 'Blood Glucose',
    'monitoring.weight': 'Weight',
    'monitoring.temperature': 'Temperature',
    
    // Admin
    'admin.title': 'Health Department Dashboard',
    'admin.disease_patterns': 'Disease Patterns',
    'admin.medicine_shortage': 'Medicine Shortages',
    'admin.patient_load': 'Patient Load',
    'admin.health_camps': 'Health Camps',
    
    // Chatbot
    'chatbot.title': 'AI Health Assistant',
    'chatbot.placeholder': 'Ask me about your health concerns...',
    'chatbot.voice_input': 'Voice Input',
  },
  hi: {
    // Navigation - Hindi
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.records': 'स्वास्थ्य रिकॉर्ड',
    'nav.medications': 'दवाईयां',
    'nav.consultations': 'परामर्श',
    'nav.pharmacies': 'दवाखाना',
    'nav.monitoring': 'निगरानी',
    'nav.emergency': 'आपातकाल',
    'nav.chatbot': 'AI सहायक',
    'nav.admin': 'एडमिन पैनल',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.book_now': 'अभी बुक करें',
    'common.view_details': 'विवरण देखें',
    'common.emergency_call': '108 पर कॉल करें - आपातकाल',
    
    // Dashboard
    'dashboard.welcome': 'विलेज केयर में आपका स्वागत है',
    'dashboard.upcoming_appointment': 'आगामी अपॉइंटमेंट',
    'dashboard.next_medication': 'अगली दवा',
    'dashboard.health_alerts': 'स्वास्थ्य अलर्ट',
    'dashboard.book_consultation': 'परामर्श बुक करें',
    'dashboard.symptom_checker': 'लक्षण जांचकर्ता',
    'dashboard.view_records': 'रिकॉर्ड देखें',
    'dashboard.nearby_pharmacies': 'नजदीकी दवाखाने',
  },
  pa: {
    // Navigation - Punjabi
    'nav.home': 'ਘਰ',
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.records': 'ਸਿਹਤ ਰਿਕਾਰਡ',
    'nav.medications': 'ਦਵਾਈਆਂ',
    'nav.consultations': 'ਸਲਾਹ',
    'nav.pharmacies': 'ਦਵਾਈ ਦੀ ਦੁਕਾਨ',
    'nav.monitoring': 'ਨਿਗਰਾਨੀ',
    'nav.emergency': 'ਐਮਰਜੈਂਸੀ',
    'nav.chatbot': 'AI ਸਹਾਇਕ',
    'nav.admin': 'ਐਡਮਿਨ ਪੈਨਲ',
    
    // Common
    'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    'common.save': 'ਸੇਵ ਕਰੋ',
    'common.cancel': 'ਰੱਦ ਕਰੋ',
    'common.next': 'ਅਗਲਾ',
    'common.previous': 'ਪਿਛਲਾ',
    'common.book_now': 'ਹੁਣੇ ਬੁੱਕ ਕਰੋ',
    'common.view_details': 'ਵੇਰਵੇ ਵੇਖੋ',
    'common.emergency_call': '108 ਤੇ ਕਾਲ ਕਰੋ - ਐਮਰਜੈਂਸੀ',
    
    // Dashboard
    'dashboard.welcome': 'ਵਿਲੇਜ ਕੇਅਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    'dashboard.upcoming_appointment': 'ਆਉਣ ਵਾਲੀ ਮੁਲਾਕਾਤ',
    'dashboard.next_medication': 'ਅਗਲੀ ਦਵਾਈ',
    'dashboard.health_alerts': 'ਸਿਹਤ ਅਲਰਟ',
    'dashboard.book_consultation': 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    'dashboard.symptom_checker': 'ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    'dashboard.view_records': 'ਰਿਕਾਰਡ ਵੇਖੋ',
    'dashboard.nearby_pharmacies': 'ਨੇੜਲੀਆਂ ਦਵਾਈ ਦੀਆਂ ਦੁਕਾਨਾਂ',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || 
           translations.en[key as keyof typeof translations.en] || 
           key;
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'pa' ? 'pa-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, speak }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};