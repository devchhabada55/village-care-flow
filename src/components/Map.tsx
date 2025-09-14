import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  Star,
  Stethoscope,
  Pill,
  Building2,
  Truck,
  Mic,
  MicOff,
  List,
  Map as MapIcon,
  Filter,
  Search,
  Calendar,
  Heart,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  MapPinned,
  Bookmark,
  Volume2
} from "lucide-react";

// Update the ServiceType interface to include multilingual support
interface ServiceType {
  id: number;
  type: 'hospital' | 'pharmacy' | 'clinic' | 'doctor';
  name: string;
  namePunjabi: string;
  nameHindi: string;
  address: string;
  addressPunjabi: string;
  addressHindi: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  phone: string;
  services: string[];
  servicesPunjabi: string[];
  servicesHindi: string[];
  coordinates: [number, number];
  photo?: string;
  availability?: string;
  emergencyAvailable?: boolean;
  onlineConsultation?: boolean;
  description?: string;
  specialization?: string[];
}

// Update the MapProps interface
interface MapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  showNearbyServices?: boolean;
  defaultFilter?: 'all' | 'hospital' | 'pharmacy' | 'doctor' | 'clinic';
}

const Map: React.FC<MapProps> = ({ 
  center = [30.3752, 76.4141], // Nabha, Punjab coordinates
  zoom = 13,
  height = "400px",
  showNearbyServices = true,
  defaultFilter = 'all'
}) => {
  const { currentLanguage, t, speak } = useLanguage();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>(defaultFilter);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Enhanced mock data for nearby healthcare services
  const nearbyServices: ServiceType[] = [
    {
      id: 1,
      type: 'hospital',
      name: 'Civil Hospital Nabha',
      namePunjabi: 'ਸਿਵਲ ਹਸਪਤਾਲ ਨਭਾ',
      nameHindi: 'सिविल अस्पताल नाभा',
      address: 'Hospital Road, Nabha',
      addressPunjabi: 'ਹਸਪਤਾਲ ਰੋਡ, ਨਭਾ',
      addressHindi: 'अस्पताल रोड, नाभा',
      distance: '0.8 km',
      rating: 4.2,
      isOpen: true,
      phone: '+91 1765-222001',
      services: ['Emergency', 'General Medicine', 'Surgery', 'Lab Tests'],
      servicesPunjabi: ['ਐਮਰਜੈਂਸੀ', 'ਜਨਰਲ ਮੈਡੀਸਿਨ', 'ਸਰਜਰੀ', 'ਲੈਬ ਟੈਸਟ'],
      servicesHindi: ['आपातकाल', 'सामान्य चिकित्सा', 'शल्य चिकित्सा', 'लैब टेस्ट'],
      coordinates: [30.3745, 76.4135],
      photo: '/api/placeholder/300/200',
      availability: '24/7',
      emergencyAvailable: true,
      onlineConsultation: true,
      description: 'Government hospital with 24/7 emergency services',
      specialization: ['Emergency Medicine', 'General Surgery', 'Internal Medicine']
    },
    {
      id: 2,
      type: 'pharmacy',
      name: 'Nabha Medical Store',
      namePunjabi: 'ਨਭਾ ਮੈਡੀਕਲ ਸਟੋਰ',
      nameHindi: 'नाभा मेडिकल स्टोर',
      address: 'Main Market, Nabha',
      addressPunjabi: 'ਮੁੱਖ ਬਾਜ਼ਾਰ, ਨਭਾ',
      addressHindi: 'मुख्य बाजार, नाभा',
      distance: '0.5 km',
      rating: 4.8,
      isOpen: true,
      phone: '+91 98765-43210',
      services: ['General Medicines', 'Baby Care', 'Home Delivery'],
      servicesPunjabi: ['ਜਨਰਲ ਦਵਾਈਆਂ', 'ਬੱਚਿਆਂ ਦੀ ਦੇਖਭਾਲ', 'ਘਰ ਡਿਲੀਵਰੀ'],
      servicesHindi: ['सामान्य दवाएं', 'बाल देखभाल', 'होम डिलीवरी'],
      coordinates: [30.3758, 76.4145],
      photo: '/api/placeholder/300/200',
      availability: '9 AM - 9 PM',
      emergencyAvailable: false,
      onlineConsultation: false
    },
    {
      id: 3,
      type: 'doctor',
      name: 'Dr. Preet Singh - General Physician',
      namePunjabi: 'ਡਾ. ਪ੍ਰੀਤ ਸਿੰਘ - ਜਨਰਲ ਫਿਜ਼ੀਸ਼ੀਅਨ',
      nameHindi: 'डॉ. प्रीत सिंह - सामान्य चिकित्सक',
      address: 'Bus Stand Road, Nabha',
      addressPunjabi: 'ਬੱਸ ਸਟੈਂਡ ਰੋਡ, ਨਭਾ',
      addressHindi: 'बस स्टैंड रोड, नाभा',
      distance: '1.2 km',
      rating: 4.9,
      isOpen: true,
      phone: '+91 98765-43211',
      services: ['General Medicine', 'Consultation', 'Health Checkup'],
      servicesPunjabi: ['ਜਨਰਲ ਮੈਡੀਸਿਨ', 'ਸਲਾਹ', 'ਸਿਹਤ ਜਾਂਚ'],
      servicesHindi: ['सामान्य चिकित्सा', 'परामर्श', 'स्वास्थ्य जांच'],
      coordinates: [30.3740, 76.4150],
      photo: '/api/placeholder/300/200',
      availability: 'Mon-Sat 10 AM - 6 PM',
      emergencyAvailable: false,
      onlineConsultation: true,
      specialization: ['Family Medicine', 'Preventive Care']
    },
    {
      id: 4,
      type: 'clinic',
      name: 'Healthy Life Clinic',
      namePunjabi: 'ਸਿਹਤਮੰਦ ਜੀਵਨ ਕਲੀਨਿਕ',
      nameHindi: 'स्वस्थ जीवन क्लिनिक',
      address: 'Civil Hospital Road, Nabha',
      addressPunjabi: 'ਸਿਵਲ ਹਸਪਤਾਲ ਰੋਡ, ਨਭਾ',
      addressHindi: 'सिविल अस्पताल रोड, नाभा',
      distance: '2.1 km',
      rating: 4.6,
      isOpen: false,
      phone: '+91 98765-43212',
      services: ['Diabetes Care', 'Heart Checkup', 'Lab Tests'],
      servicesPunjabi: ['ਡਾਇਬੀਟਿਜ਼ ਦੇਖਭਾਲ', 'ਦਿਲ ਦੀ ਜਾਂਚ', 'ਲੈਬ ਟੈਸਟ'],
      servicesHindi: ['डायबिटीज देखभाल', 'हृदय जांच', 'लैब टेस्ट'],
      coordinates: [30.3760, 76.4120],
      photo: '/api/placeholder/300/200',
      availability: 'Mon-Fri 9 AM - 5 PM',
      emergencyAvailable: false,
      onlineConsultation: true,
      specialization: ['Diabetes', 'Cardiology']
    }
  ];

  // Voice Navigation
  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage === 'pa' ? 'pa-IN' : 
                        currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => setIsVoiceActive(true);
      recognition.onend = () => setIsVoiceActive(false);
      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        // Handle voice commands
        if (command.includes('doctor') || command.includes('डॉक्टर') || command.includes('ਡਾਕਟਰ')) {
          setSelectedFilter('doctor');
          speak(t('Found doctor services near you'));
        } else if (command.includes('pharmacy') || command.includes('फार्मेसी') || command.includes('ਫਾਰਮੇਸੀ')) {
          setSelectedFilter('pharmacy');
          speak(t('Found pharmacy services near you'));
        } else if (command.includes('hospital') || command.includes('अस्पताल') || command.includes('ਹਸਪਤਾਲ')) {
          setSelectedFilter('hospital');
          speak(t('Found hospital services near you'));
        }
      };

      recognition.start();
    }
  };

  const getServiceIcon = (type: string, size = 'h-5 w-5') => {
    const iconClass = `${size}`;
    switch (type) {
      case 'hospital':
        return <Building2 className={`${iconClass} text-red-500`} />;
      case 'pharmacy':
        return <Pill className={`${iconClass} text-blue-500`} />;
      case 'clinic':
        return <Stethoscope className={`${iconClass} text-green-500`} />;
      case 'doctor':
        return <Stethoscope className={`${iconClass} text-purple-500`} />;
      default:
        return <MapPin className={`${iconClass} text-muted-foreground`} />;
    }
  };

  const getServiceColor = (type: string, isAvailable = true) => {
    const opacity = isAvailable ? '20' : '10';
    switch (type) {
      case 'hospital':
        return `border-red-500 bg-red-500/${opacity} ${isAvailable ? 'shadow-red-200' : ''}`;
      case 'pharmacy':
        return `border-blue-500 bg-blue-500/${opacity} ${isAvailable ? 'shadow-blue-200' : ''}`;
      case 'clinic':
        return `border-green-500 bg-green-500/${opacity} ${isAvailable ? 'shadow-green-200' : ''}`;
      case 'doctor':
        return `border-purple-500 bg-purple-500/${opacity} ${isAvailable ? 'shadow-purple-200' : ''}`;
      default:
        return 'border-muted bg-muted/10';
    }
  };

  const getServiceName = (service: ServiceType) => {
    switch (currentLanguage) {
      case 'pa': return service.namePunjabi;
      case 'hi': return service.nameHindi;
      default: return service.name;
    }
  };

  const getServiceAddress = (service: ServiceType) => {
    switch (currentLanguage) {
      case 'pa': return service.addressPunjabi;
      case 'hi': return service.addressHindi;
      default: return service.address;
    }
  };

  const getServiceServices = (service: ServiceType) => {
    switch (currentLanguage) {
      case 'pa': return service.servicesPunjabi;
      case 'hi': return service.servicesHindi;
      default: return service.services;
    }
  };

  const filteredServices = nearbyServices.filter(service => {
    const matchesFilter = selectedFilter === 'all' || service.type === selectedFilter;
    const matchesSearch = searchQuery === '' || 
      getServiceName(service).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getServiceAddress(service).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleFavorite = (serviceId: number) => {
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };


  // Add service category buttons with icons and multilingual support
  const ServiceCategories: React.FC = () => {
    const { t } = useLanguage();
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Button
          variant="outline"
          size="lg"
          className="h-24 flex-col space-y-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-500/5 group-hover:scale-105 transition-transform" />
          <Building2 className="h-8 w-8 text-red-500" />
          <div className="space-y-1">
            <span className="text-sm font-medium block">{t('Hospitals & Clinics')}</span>
            <span className="text-xs text-muted-foreground block">🏥 अस्पताल / ਹਸਪਤਾਲ</span>
          </div>
        </Button>

        <Button
          variant="outline"
          size="lg" 
          className="h-24 flex-col space-y-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 group-hover:scale-105 transition-transform" />
          <Pill className="h-8 w-8 text-blue-500" />
          <div className="space-y-1">
            <span className="text-sm font-medium block">{t('Pharmacies')}</span>
            <span className="text-xs text-muted-foreground block">💊 फार्मेसी / ਫਾਰਮੇਸੀ</span>
          </div>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="h-24 flex-col space-y-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-500/5 group-hover:scale-105 transition-transform" />
          <Stethoscope className="h-8 w-8 text-purple-500" />
          <div className="space-y-1">
            <span className="text-sm font-medium block">{t('Doctors')}</span>
            <span className="text-xs text-muted-foreground block">👨‍⚕️ डॉक्टर / ਡਾਕਟਰ</span>
          </div>
        </Button>
      </div>
    );
  };

  // Add offline caching functionality
const useOfflineCache = () => {
  const [offlineData, setOfflineData] = useState<ServiceType[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load cached data from localStorage
    const cached = localStorage.getItem('healthcareServices');
    if (cached) {
      setOfflineData(JSON.parse(cached));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateCache = (services: ServiceType[]) => {
    localStorage.setItem('healthcareServices', JSON.stringify(services));
    setOfflineData(services);
  };

  return {
    isOffline,
    offlineData,
    updateCache
  };
};

  return (
    <div className="space-y-6">
      {/* Service Category Buttons */}
      <ServiceCategories />

      {/* Search and Voice Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('Search healthcare services...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={isVoiceActive ? 'default' : 'outline'}
              size="icon"
              onClick={startVoiceSearch}
              className={isVoiceActive ? 'animate-pulse' : ''}
            >
              {isVoiceActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                {t('All Services')}
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                {t('Filters')}
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <MapIcon className="h-4 w-4 mr-1" />
                {t('Map')}
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-1" />
                {t('List')}
              </Button>
            </div>
          </div>

          {/* Voice Instructions */}
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Volume2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{t('Voice Navigation')}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {t('Tap the mic and say')} "{t('doctor')}", "{t('pharmacy')}", "{t('hospital')}" {t('in your language')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Map/List View */}
      {viewMode === 'map' ? (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPinned className="h-5 w-5 text-primary" />
                <span>{t('Healthcare Services Map')}</span>
              </div>
              <Badge variant="outline">
                {filteredServices.length} {t('services found')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-lg border-2 border-dashed border-muted-foreground/20"
              style={{ height }}
            >
              {/* Enhanced Map Interface */}
              <div className="absolute inset-0 p-4">
                {/* Location markers */}
                {filteredServices.map((service, index) => (
                  <div
                    key={service.id}
                    className={`absolute w-10 h-10 rounded-full border-2 ${getServiceColor(service.type, service.isOpen)} flex items-center justify-center shadow-lg cursor-pointer hover:scale-125 transition-all duration-200 ${service.isOpen ? 'animate-pulse' : 'opacity-60'}`}
                    style={{
                      left: `${15 + (index % 4) * 20}%`,
                      top: `${20 + Math.floor(index / 4) * 25}%`,
                    }}
                    onClick={() => setSelectedService(service)}
                    title={getServiceName(service)}
                  >
                    {getServiceIcon(service.type, 'h-5 w-5')}
                  </div>
                ))}
                
                {/* Current location marker */}
                <div className="absolute w-6 h-6 bg-blue-500 rounded-full shadow-lg animate-pulse border-2 border-white"
                     style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-500 rounded-full opacity-75 animate-ping"></div>
                  <MapPin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-white" />
                </div>
              </div>

              {/* Map controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white/80 backdrop-blur">
                  <Navigation className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white/80 backdrop-blur">
                  +
                </Button>
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white/80 backdrop-blur">
                  -
                </Button>
              </div>

              {/* Offline indicator */}
              <div className="absolute bottom-4 left-4">
                <Badge variant="outline" className="bg-white/80 backdrop-blur">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  {t('Offline Ready')}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredServices.map((service) => (
            <Card key={service.id} className="shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedService(service)}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${getServiceColor(service.type, service.isOpen)} shadow-sm`}>
                    {getServiceIcon(service.type, 'h-6 w-6')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base mb-1">{getServiceName(selectedService)}</h3>
                        <p className="text-sm text-muted-foreground">{getServiceAddress(selectedService)}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(service.id);
                          }}
                        >
                          <Bookmark className={`h-4 w-4 ${favorites.includes(service.id) ? 'fill-current text-yellow-500' : ''}`} />
                        </Button>
                        <Badge variant={service.isOpen ? 'default' : 'secondary'} 
                               className={`text-xs ${service.isOpen ? 'bg-green-100 text-green-800 border-green-200' : ''}`}>
                          {service.isOpen ? t('Open') : t('Closed')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{service.rating}</span>
                      </div>
                      <span className="text-muted-foreground">📍 {service.distance}</span>
                      {service.onlineConsultation && (
                        <Badge variant="outline" className="text-xs">
                          💻 {t('Online')}
                        </Badge>
                      )}
                      {service.emergencyAvailable && (
                        <Badge variant="outline" className="text-xs">
                          🚨 24/7
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {getServiceServices(service).slice(0, 3).map((serviceType, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {serviceType}
                        </Badge>
                      ))}
                      {service.services.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{service.services.length - 3} {t('more')}
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {t('Call')}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Navigation className="h-3 w-3 mr-1" />
                        {t('Directions')}
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {t('Book')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getServiceColor(selectedService.type, selectedService.isOpen)}`}>
                    {getServiceIcon(selectedService.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{getServiceName(selectedService)}</h3>
                    <p className="text-sm text-muted-foreground">{getServiceAddress(selectedService)}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Photo */}
                {selectedService.photo && (
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                {/* Status and Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs font-medium">{selectedService.availability}</p>
                    <p className="text-xs text-muted-foreground">{t('Hours')}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                    <p className="text-xs font-medium">{selectedService.rating}/5</p>
                    <p className="text-xs text-muted-foreground">{t('Rating')}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <MapPin className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-xs font-medium">{selectedService.distance}</p>
                    <p className="text-xs text-muted-foreground">{t('Distance')}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      {selectedService.isOpen ? 
                        <CheckCircle className="h-4 w-4 text-green-500" /> :
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      }
                    </div>
                    <p className="text-xs font-medium">{selectedService.isOpen ? t('Open') : t('Closed')}</p>
                    <p className="text-xs text-muted-foreground">{t('Status')}</p>
                  </div>
                </div>

                {/* Services Offered */}
                <div>
                  <h4 className="font-semibold mb-3">{t('Services Offered')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {getServiceServices(selectedService).map((service, index) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                {selectedService.specialization && (
                  <div>
                    <h4 className="font-semibold mb-3">{t('Specializations')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.specialization.map((spec, index) => (
                        <Badge key={index} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    {t('Call Now')}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Navigation className="h-4 w-4 mr-2" />
                    {t('Get Directions')}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    {t('Book Appointment')}
                  </Button>
                </div>

                {/* Additional Options */}
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleFavorite(selectedService.id)}
                  >
                    <Bookmark className={`h-4 w-4 mr-1 ${favorites.includes(selectedService.id) ? 'fill-current text-yellow-500' : ''}`} />
                    {favorites.includes(selectedService.id) ? t('Remove from Favorites') : t('Save to My Services')}
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {t('Send SMS')}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Map Legend */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-4">{t('Map Legend')}</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-red-500 bg-red-500/20 flex items-center justify-center">
                {getServiceIcon('hospital', 'h-3 w-3')}
              </div>
              <span className="text-sm">{t('Hospitals')} 🟢</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-500/20 flex items-center justify-center">
                {getServiceIcon('pharmacy', 'h-3 w-3')}
              </div>
              <span className="text-sm">{t('Pharmacies')} 🔵</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-purple-500 bg-purple-500/20 flex items-center justify-center">
                {getServiceIcon('doctor', 'h-3 w-3')}
              </div>
              <span className="text-sm">{t('Doctors')} 🟣</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-green-500 bg-green-500/20 flex items-center justify-center">
                {getServiceIcon('clinic', 'h-3 w-3')}
              </div>
              <span className="text-sm">{t('Clinics')} 🏥</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm">{t('Your Location')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Map;