import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Video, 
  Pill, 
  Activity, 
  MapPin,
  CheckCircle,
  ArrowRight,
  Building2,
  Stethoscope
} from "lucide-react";
import heroImage from "@/assets/hero-telemedicine.jpg";
import { useLanguage } from '@/contexts/LanguageContext';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      icon: Video,
      title: "Video Consultations",
      description: "Connect with qualified doctors via video or audio calls from your village"
    },
    {
      icon: Activity,
      title: "Health Monitoring", 
      description: "Track your health with AI-powered symptom checker and health reminders"
    },
    {
      icon: Pill,
      title: "Medicine Management",
      description: "View local pharmacy stock and manage your prescriptions digitally"
    },
    {
      icon: MapPin,
      title: "Local Healthcare",
      description: "Find nearby healthcare facilities and health workers in your area"
    }
  ];

  const features = [
    "Works offline for basic health records",
    "Available in Punjabi, Hindi, and English", 
    "Low bandwidth optimized for rural areas",
    "Free basic health services",
    "SMS and voice call support",
    "Government healthcare integration"
  ];

  const serviceCategories = [
    {
      icon: <Building2 className="h-12 w-12 text-red-500" />,
      title: t('Clinics & Hospitals'),
      titleHindi: 'अस्पताल',
      titlePunjabi: 'ਹਸਪਤਾਲ',
      path: '/clinics'
    },
    {
      icon: <Pill className="h-12 w-12 text-blue-500" />,
      title: t('Pharmacies'),
      titleHindi: 'फार्मेसी',
      titlePunjabi: 'ਫਾਰਮੇਸੀ',
      path: '/pharmacies'
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-purple-500" />,
      title: t('Doctors'),
      titleHindi: 'डॉक्टर',
      titlePunjabi: 'ਡਾਕਟਰ',
      path: '/doctors'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Healthcare at Your
                  <span className="text-primary block">Fingertips</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Digital healthcare services for Nabha and surrounding villages. 
                  Connect with doctors, manage medicines, and access health records - even offline.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto shadow-button">
                    <Heart className="h-5 w-5 mr-2" />
                    Start Using Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Video className="h-5 w-5 mr-2" />
                  Book Consultation
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Government Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="text-sm text-muted-foreground">24/7 Emergency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="text-sm text-muted-foreground">10,000+ Users</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Telemedicine consultation" 
                className="w-full h-auto rounded-2xl shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Comprehensive Healthcare Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access quality healthcare from your village with our digital platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <service.icon className="h-12 w-12 text-primary mx-auto" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Built for Rural Communities
              </h2>
              <p className="text-lg text-muted-foreground">
                Our platform is specifically designed to work in areas with limited 
                internet connectivity and serves users across different literacy levels.
              </p>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/dashboard">
                <Button size="lg" className="shadow-button">
                  Get Started
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <Card className="p-8 shadow-elevated bg-gradient-primary text-primary-foreground">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Emergency Services</h3>
                <p className="text-primary-foreground/90">
                  Access emergency healthcare services 24/7. Our platform connects 
                  you with on-call doctors and emergency services.
                </p>
                <Button variant="secondary" size="lg" className="w-full">
                  Emergency Contact: 108
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Find Healthcare Services Near You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access medical services in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceCategories.map((category) => (
              <Card 
                key={category.path}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(category.path)}
              >
                <CardContent className="p-6 text-center">
                  {category.icon}
                  <h2 className="text-xl font-semibold mt-4 mb-2">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {category.titleHindi} / {category.titlePunjabi}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6" />
                <span className="text-lg font-semibold">TelemediNabha</span>
              </div>
              <p className="text-background/70">
                Digital healthcare for everyone, everywhere.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <div className="space-y-2 text-background/70">
                <div>Video Consultations</div>
                <div>Health Records</div>
                <div>Medicine Tracking</div>
                <div>Emergency Services</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-background/70">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Emergency: 108</div>
                <div>Technical Support</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Government</h4>
              <div className="space-y-2 text-background/70">
                <div>Punjab Health Dept</div>
                <div>Nabha District</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/70">
            © 2024 TelemediNabha. Government of Punjab Healthcare Initiative.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;