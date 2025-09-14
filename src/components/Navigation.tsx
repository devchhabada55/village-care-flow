import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { 
  Home, 
  Map, 
  Pill, 
  Stethoscope, 
  FileText, 
  Video, 
  Activity,
  Building2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { path: '/', icon: <Home className="w-5 h-5" />, label: t('Home') },
    { path: '/healthcare-map', icon: <Map className="w-5 h-5" />, label: t('Healthcare Services') },
    { path: '/pharmacies', icon: <Pill className="w-5 h-5" />, label: t('Pharmacies') },
    { path: '/doctors', icon: <Stethoscope className="w-5 h-5" />, label: t('Doctors') },
    { path: '/clinics', icon: <Building2 className="w-5 h-5" />, label: t('Clinics & Hospitals') },
    { path: '/health-records', icon: <FileText className="w-5 h-5" />, label: t('Health Records') },
    { path: '/video-consultation', icon: <Video className="w-5 h-5" />, label: t('Video Consultation') },
    { path: '/monitoring', icon: <Activity className="w-5 h-5" />, label: t('Patient Monitoring') }
  ];

  return (
    <NavigationMenu className="max-w-full w-full justify-start">
      <NavigationMenuList className="flex flex-wrap gap-2">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link 
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                ${location.pathname === item.path 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent'}`}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;