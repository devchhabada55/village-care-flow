import React from 'react';
import Navigation from '@/components/Navigation';
import Map from '@/components/Map';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Smartphone, 
  Volume2, 
  Globe, 
  Wifi, 
  WifiOff,
  CheckCircle,
  Star,
  Clock
} from 'lucide-react';

const HealthcareMap = () => {
  const { currentLanguage, t } = useLanguage();

  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-blue-500" />,
      title: t('Interactive Maps'),
      titlePa: 'ਇੰਟਰਐਕਟਿਵ ਨਕਸ਼ੇ',
      titleHi: 'इंटरैक्टिव मैप्स',
      description: 'Find nearby hospitals, clinics, doctors & pharmacies',
      descriptionPa: 'ਨੇੜਲੇ ਹਸਪਤਾਲ, ਕਲੀਨਿਕ, ਡਾਕਟਰ ਅਤੇ ਫਾਰਮੇਸੀ ਖੋਜੋ',
      descriptionHi: 'नजदीकी अस्पताल, क्लिनिक, डॉक्टर और फार्मेसी खोजें'
    },
    {
      icon: <Volume2 className="h-6 w-6 text-green-500" />,
      title: t('Voice Navigation'),
      titlePa: 'ਆਵਾਜ਼ ਨੈਵੀਗੇਸ਼ਨ',
      titleHi: 'आवाज़ नेवीगेशन',
      description: 'Search using voice commands in Punjabi, Hindi & English',
      descriptionPa: 'ਪੰਜਾਬੀ, ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਆਵਾਜ਼ ਕਮਾਂਡ ਵਰਤਕੇ ਖੋਜੋ',
      descriptionHi: 'पंजाबी, हिंदी और अंग्रेजी में आवाज़ कमांड का उपयोग करके खोजें'
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-500" />,
      title: t('Multilingual'),
      titlePa: 'ਬਹੁਭਾਸ਼ੀ',
      titleHi: 'बहुभाषी',
      description: 'Complete interface in English, Hindi & Punjabi',
      descriptionPa: 'ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ ਅਤੇ ਪੰਜਾਬੀ ਵਿੱਚ ਪੂਰਾ ਇੰਟਰਫੇਸ',
      descriptionHi: 'अंग्रेजी, हिंदी और पंजाबी में पूरा इंटरफेस'
    },
    {
      icon: <WifiOff className="h-6 w-6 text-orange-500" />,
      title: t('Offline Ready'),
      titlePa: 'ਔਫਲਾਈਨ ਤਿਆਰ',
      titleHi: 'ऑफ़लाइन तैयार',
      description: 'Access cached data when internet is unavailable',
      descriptionPa: 'ਜਦੋਂ ਇੰਟਰਨੈਟ ਉਪਲਬਧ ਨਹੀਂ ਹੈ ਤਾਂ ਕੈਸ਼ਡ ਡੇਟਾ ਦੀ ਵਰਤੋਂ ਕਰੋ',
      descriptionHi: 'जब इंटरनेट उपलब्ध नहीं है तो कैश्ड डेटा का एक्सेस करें'
    }
  ];

  const getFeatureTitle = (feature: any) => {
    switch (currentLanguage) {
      case 'pa': return feature.titlePa;
      case 'hi': return feature.titleHi;
      default: return feature.title;
    }
  };

  const getFeatureDescription = (feature: any) => {
    switch (currentLanguage) {
      case 'pa': return feature.descriptionPa;
      case 'hi': return feature.descriptionHi;
      default: return feature.description;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <MapPin className="h-4 w-4" />
            <span>
              {currentLanguage === 'pa' ? 'ਸਿਹਤ ਸੇਵਾ ਨਕਸ਼ਾ' :
               currentLanguage === 'hi' ? 'स्वास्थ्य सेवा मैप' :
               'Healthcare Services Map'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {currentLanguage === 'pa' ? 'ਆਪਣੇ ਨੇੜੇ ਸਿਹਤ ਸੇਵਾਵਾਂ ਖੋਜੋ' :
             currentLanguage === 'hi' ? 'अपने पास स्वास्थ्य सेवाएं खोजें' :
             'Find Healthcare Services Near You'}
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentLanguage === 'pa' ? 'ਇੰਟਰਐਕਟਿਵ ਨਕਸ਼ੇ, ਆਵਾਜ਼ ਨੈਵੀਗੇਸ਼ਨ ਅਤੇ ਔਫਲਾਈਨ ਸਪੋਰਟ ਦੇ ਨਾਲ ਡਾਕਟਰ, ਹਸਪਤਾਲ ਅਤੇ ਫਾਰਮੇਸੀ ਲੱਭੋ।' :
             currentLanguage === 'hi' ? 'इंटरैक्टिव मैप्स, वॉयस नेवीगेशन और ऑफ़लाइन सपोर्ट के साथ डॉक्टर, अस्पताल और फार्मेसी खोजें।' :
             'Locate doctors, hospitals & pharmacies with interactive maps, voice navigation & offline support.'}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3" />
              <span>{t('Offline Ready')}</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Volume2 className="h-3 w-3" />
              <span>
                {currentLanguage === 'pa' ? 'ਆਵਾਜ਼ ਸਮਰਥਿਤ' :
                 currentLanguage === 'hi' ? 'आवाज़ समर्थित' :
                 'Voice Enabled'}
              </span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Globe className="h-3 w-3" />
              <span>
                {currentLanguage === 'pa' ? '3 ਭਾਸ਼ਾਵਾਂ' :
                 currentLanguage === 'hi' ? '3 भाषाएं' :
                 '3 Languages'}
              </span>
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{getFeatureTitle(feature)}</h3>
                <p className="text-sm text-muted-foreground">{getFeatureDescription(feature)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Voice Command Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5 text-primary" />
              <span>
                {currentLanguage === 'pa' ? 'ਆਵਾਜ਼ ਕਮਾਂਡ ਗਾਈਡ' :
                 currentLanguage === 'hi' ? 'वॉयस कमांड गाइड' :
                 'Voice Command Guide'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">English</h4>
                <p className="text-sm text-muted-foreground mb-2">Say:</p>
                <div className="space-y-1 text-sm">
                  <div>"Doctor" or "Find doctor"</div>
                  <div>"Pharmacy" or "Medicine"</div>
                  <div>"Hospital" or "Emergency"</div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">हिंदी</h4>
                <p className="text-sm text-muted-foreground mb-2">कहें:</p>
                <div className="space-y-1 text-sm">
                  <div>"डॉक्टर" या "चिकित्सक"</div>
                  <div>"दवाखाना" या "दवा"</div>
                  <div>"अस्पताल" या "हॉस्पिटल"</div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">ਪੰਜਾਬੀ</h4>
                <p className="text-sm text-muted-foreground mb-2">ਕਹੋ:</p>
                <div className="space-y-1 text-sm">
                  <div>"ਡਾਕਟਰ" ਜਾਂ "ਵੈਦ"</div>
                  <div>"ਦਵਾਈ ਦੀ ਦੁਕਾਨ" ਜਾਂ "ਫਾਰਮੇਸੀ"</div>
                  <div>"ਹਸਪਤਾਲ"</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Map Component */}
        <Map height="600px" />

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'pa' ? 'ਡਾਕਟਰ ਉਪਲਬਧ' :
                 currentLanguage === 'hi' ? 'डॉक्टर उपलब्ध' :
                 'Doctors Available'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'pa' ? 'ਹਸਪਤਾਲ ਅਤੇ ਕਲੀਨਿਕ' :
                 currentLanguage === 'hi' ? 'अस्पताल और क्लिनिक' :
                 'Hospitals & Clinics'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">80+</div>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'pa' ? 'फार्मेसियां' :
                 currentLanguage === 'hi' ? 'फार्मेसियां' :
                 'Pharmacies'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'pa' ? 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ' :
                 currentLanguage === 'hi' ? 'आपातकालीन सेवाएं' :
                 'Emergency Services'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it works */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentLanguage === 'pa' ? 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ' :
               currentLanguage === 'hi' ? 'यह कैसे काम करता है' :
               'How It Works'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">
                  {currentLanguage === 'pa' ? '1. ਖੋਜੋ ਜਾਂ ਬੋਲੋ' :
                   currentLanguage === 'hi' ? '1. खोजें या बोलें' :
                   '1. Search or Speak'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'pa' ? 'ਟਾਈਪ ਕਰਕੇ ਖੋਜੋ ਜਾਂ ਆਵਾਜ਼ ਕਮਾਂਡ ਵਰਤੋ' :
                   currentLanguage === 'hi' ? 'टाइप करके खोजें या वॉयस कमांड का उपयोग करें' :
                   'Type to search or use voice commands'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">
                  {currentLanguage === 'pa' ? '2. ਨਤੀਜੇ ਵੇਖੋ' :
                   currentLanguage === 'hi' ? '2. परिणाम देखें' :
                   '2. View Results'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'pa' ? 'ਨਕਸ਼ੇ ਉੱਤੇ ਜਾਂ ਸੂਚੀ ਵਿੱਚ ਨੇੜਲੀਆਂ ਸੇਵਾਵਾਂ ਵੇਖੋ' :
                   currentLanguage === 'hi' ? 'मैप पर या सूची में नजदीकी सेवाएं देखें' :
                   'See nearby services on map or in list view'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">
                  {currentLanguage === 'pa' ? '3. ਬੁੱਕ ਕਰੋ ਜਾਂ ਕਾਲ ਕਰੋ' :
                   currentLanguage === 'hi' ? '3. बुक करें या कॉल करें' :
                   '3. Book or Call'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'pa' ? 'ਸਿੱਧਾ ਅਪਾਇਂਟਮੈਂਟ ਬੁੱਕ ਕਰੋ ਜਾਂ ਤਰੁੰਤ ਕਾਲ ਕਰੋ' :
                   currentLanguage === 'hi' ? 'सीधे अपॉइंटमेंट बुक करें या तुरंत कॉल करें' :
                   'Book appointment directly or call instantly'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthcareMap;