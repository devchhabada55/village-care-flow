import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import {
  Calendar,
  Activity,
  Pill,
  MapPin,
  AlertCircle,
  Clock,
  User,
  Heart,
  Phone,
  Video,
  Bell,
  Wifi,
  WifiOff
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [isOnline] = useState(true); // This would be dynamic in a real app
  
  const upcomingAppointments = [
    {
      doctor: "Dr. Rajesh Kumar",
      specialty: "General Medicine",
      time: "Today, 3:00 PM",
      type: "video"
    },
    {
      doctor: "Dr. Priya Sharma", 
      specialty: "Pediatrics",
      time: "Tomorrow, 10:00 AM",
      type: "audio"
    }
  ];

  const medications = [
    {
      name: "Paracetamol 500mg",
      nextDose: "In 2 hours",
      remaining: "5 tablets"
    },
    {
      name: "Cough Syrup",
      nextDose: "Before bed",
      remaining: "50ml"
    }
  ];

  const nearbyPharmacies = [
    {
      name: "Nabha Medical Store",
      distance: "0.5 km",
      status: "Open",
      stock: "Good"
    },
    {
      name: "Singh Pharmacy",
      distance: "1.2 km", 
      status: "Open",
      stock: "Limited"
    }
  ];

  const healthAlerts = [
    {
      type: "reminder",
      message: "Annual health checkup due next week"
    },
    {
      type: "alert",
      message: "Monsoon health advisory - Prevent dengue"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Online/Offline Status */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="h-4 w-4 text-accent" />
              ) : (
                <WifiOff className="h-4 w-4 text-warning" />
              )}
              <span className="text-sm text-muted-foreground">
                {isOnline ? "Online - Last synced now" : "Offline mode - Last synced 2 hours ago"}
              </span>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Rajesh Singh
          </h1>
          <p className="text-muted-foreground">
            Village: Bhadson, District: Nabha, Punjab
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/symptom-checker">
            <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <Activity className="h-8 w-8 text-primary mx-auto" />
                <div>
                  <div className="font-semibold">Symptom Checker</div>
                  <div className="text-sm text-muted-foreground">Check your symptoms</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/book-appointment">
            <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <Video className="h-8 w-8 text-primary mx-auto" />
                <div>
                  <div className="font-semibold">Book Consult</div>
                  <div className="text-sm text-muted-foreground">Video or audio call</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-3">
              <Pill className="h-8 w-8 text-primary mx-auto" />
              <div>
                <div className="font-semibold">My Records</div>
                <div className="text-sm text-muted-foreground">View health history</div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-3">
              <MapPin className="h-8 w-8 text-primary mx-auto" />
              <div>
                <div className="font-semibold">Pharmacies</div>
                <div className="text-sm text-muted-foreground">Find medicines</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Upcoming Appointments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 space-y-1">
                  <div className="font-medium">{appointment.doctor}</div>
                  <div className="text-sm text-muted-foreground">{appointment.specialty}</div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{appointment.time}</span>
                    {appointment.type === "video" ? (
                      <Video className="h-4 w-4 text-accent" />
                    ) : (
                      <Phone className="h-4 w-4 text-accent" />
                    )}
                  </div>
                </div>
              ))}
              <Link to="/book-appointment">
                <Button variant="outline" className="w-full">
                  Book New Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Medications */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="h-5 w-5 text-primary" />
                <span>My Medications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((med, index) => (
                <div key={index} className="border border-border rounded-lg p-3">
                  <div className="font-medium text-sm">{med.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Next dose: {med.nextDose}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Remaining: {med.remaining}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Bell className="h-4 w-4 mr-2" />
                Set Reminders
              </Button>
            </CardContent>
          </Card>

          {/* Health Alerts & Nearby Services */}
          <div className="space-y-6">
            {/* Health Alerts */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <span>Health Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {healthAlerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <div className="text-sm">{alert.message}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nearby Pharmacies */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Nearby Pharmacies</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyPharmacies.map((pharmacy, index) => (
                  <div key={index} className="border border-border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{pharmacy.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {pharmacy.distance} • {pharmacy.status}
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        pharmacy.stock === "Good" ? "bg-accent text-accent-foreground" : "bg-warning text-warning-foreground"
                      }`}>
                        {pharmacy.stock}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Section */}
        <Card className="mt-8 bg-gradient-primary text-primary-foreground shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Heart className="h-8 w-8" />
                <div>
                  <div className="text-lg font-semibold">Emergency Services</div>
                  <div className="text-primary-foreground/80">24/7 emergency support available</div>
                </div>
              </div>
              <Button variant="secondary" size="lg">
                Call 108
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;