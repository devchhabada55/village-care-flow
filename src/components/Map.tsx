import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  Star,
  Stethoscope,
  Pill,
  Building2,
  Truck
} from "lucide-react";

interface MapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  showNearbyServices?: boolean;
}

const Map: React.FC<MapProps> = ({ 
  center = [30.3752, 76.4141], // Nabha, Punjab coordinates
  zoom = 13,
  height = "400px",
  showNearbyServices = true 
}) => {
  // Mock data for nearby healthcare services
  const nearbyServices = [
    {
      id: 1,
      type: 'hospital',
      name: 'Civil Hospital Nabha',
      address: 'Hospital Road, Nabha',
      distance: '0.8 km',
      rating: 4.2,
      isOpen: true,
      phone: '+91 1765-222001',
      services: ['Emergency', 'General Medicine', 'Surgery'],
      coordinates: [30.3745, 76.4135]
    },
    {
      id: 2,
      type: 'pharmacy',
      name: 'Nabha Medical Store',
      address: 'Main Market, Nabha',
      distance: '0.5 km',
      rating: 4.8,
      isOpen: true,
      phone: '+91 98765-43210',
      services: ['General Medicines', 'Baby Care'],
      coordinates: [30.3758, 76.4145]
    },
    {
      id: 3,
      type: 'clinic',
      name: 'Dr. Preet Singh Clinic',
      address: 'Bus Stand Road, Nabha',
      distance: '1.2 km',
      rating: 4.9,
      isOpen: true,
      phone: '+91 98765-43211',
      services: ['General Medicine', 'Consultation'],
      coordinates: [30.3740, 76.4150]
    },
    {
      id: 4,
      type: 'pharmacy',
      name: 'Apollo Pharmacy',
      address: 'Civil Hospital Road, Nabha',
      distance: '2.1 km',
      rating: 4.6,
      isOpen: false,
      phone: '+91 98765-43212',
      services: ['24/7 Delivery', 'Lab Tests'],
      coordinates: [30.3760, 76.4120]
    }
  ];

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return <Building2 className="h-5 w-5 text-destructive" />;
      case 'pharmacy':
        return <Pill className="h-5 w-5 text-primary" />;
      case 'clinic':
        return <Stethoscope className="h-5 w-5 text-accent" />;
      default:
        return <MapPin className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'hospital':
        return 'border-destructive bg-destructive/10';
      case 'pharmacy':
        return 'border-primary bg-primary/10';
      case 'clinic':
        return 'border-accent bg-accent/10';
      default:
        return 'border-muted bg-muted/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Healthcare Services Near You</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center"
            style={{ height }}
          >
            {/* Mock Map Interface */}
            <div className="absolute inset-0 p-4">
              {/* Location markers */}
              {nearbyServices.map((service, index) => (
                <div
                  key={service.id}
                  className={`absolute w-8 h-8 rounded-full border-2 ${getServiceColor(service.type)} flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${30 + (index % 2) * 30}%`,
                  }}
                  title={service.name}
                >
                  {getServiceIcon(service.type)}
                </div>
              ))}
              
              {/* Current location marker */}
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-pulse"
                   style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full opacity-75 animate-ping"></div>
              </div>
            </div>

            {/* Center overlay */}
            <div className="text-center z-10">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive Map</p>
              <p className="text-sm text-muted-foreground">Click markers to view details</p>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                <Navigation className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                +
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                -
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Services List */}
      {showNearbyServices && (
        <div className="grid gap-4 md:grid-cols-2">
          {nearbyServices.map((service) => (
            <Card key={service.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getServiceColor(service.type)}`}>
                    {getServiceIcon(service.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm truncate">{service.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{service.address}</p>
                      </div>
                      <Badge variant={service.isOpen ? 'default' : 'secondary'} 
                             className={`text-xs ${service.isOpen ? 'bg-accent text-accent-foreground' : ''}`}>
                        {service.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{service.rating}</span>
                      </div>
                      <span className="text-muted-foreground">{service.distance}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.services.slice(0, 2).map((serviceType, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {serviceType}
                        </Badge>
                      ))}
                      {service.services.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.services.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        <Navigation className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Map Legend */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Map Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border-2 border-destructive bg-destructive/10"></div>
              <span className="text-xs">Hospitals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary/10"></div>
              <span className="text-xs">Pharmacies</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border-2 border-accent bg-accent/10"></div>
              <span className="text-xs">Clinics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-xs">Your Location</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Map;