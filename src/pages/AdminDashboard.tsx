import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Pill,
  Stethoscope,
  Phone,
  MessageSquare,
  Download,
  Filter,
  RefreshCw,
  Building2,
  Activity,
  Heart,
  Thermometer
} from "lucide-react";

const AdminDashboard = () => {
  const { t, speak } = useLanguage();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [selectedVillage, setSelectedVillage] = useState('all');

  const mockStats = {
    totalPatients: 2847,
    activeConsultations: 23,
    medicineShortages: 8,
    healthCamps: 3,
    weeklyGrowth: {
      patients: 8.2,
      consultations: 12.5,
      prescriptions: 15.3
    }
  };

  const mockDiseaseData = [
    { disease: 'Fever', cases: 145, trend: 'up', percentage: 12.5, villages: ['Nabha', 'Rajpura', 'Patiala'] },
    { disease: 'Diabetes', cases: 89, trend: 'stable', percentage: 7.6, villages: ['Nabha', 'Sanour'] },
    { disease: 'Hypertension', cases: 76, trend: 'down', percentage: -3.2, villages: ['Rajpura', 'Ghanaur'] },
    { disease: 'Respiratory Issues', cases: 54, trend: 'up', percentage: 8.9, villages: ['Nabha', 'Patiala'] },
    { disease: 'Skin Conditions', cases: 42, trend: 'stable', percentage: 1.2, villages: ['Sanour', 'Ghanaur'] }
  ];

  const mockMedicineShortages = [
    {
      medicine: 'Paracetamol 500mg',
      currentStock: 45,
      requiredStock: 200,
      shortage: 155,
      affectedPharmacies: ['Nabha Medical', 'Singh Pharma'],
      priority: 'high',
      estimatedRestockDate: '2024-01-18'
    },
    {
      medicine: 'Metformin 500mg',
      currentStock: 12,
      requiredStock: 80,
      shortage: 68,
      affectedPharmacies: ['Apollo Pharmacy'],
      priority: 'medium',
      estimatedRestockDate: '2024-01-20'
    },
    {
      medicine: 'Amoxicillin 250mg',
      currentStock: 0,
      requiredStock: 50,
      shortage: 50,
      affectedPharmacies: ['Singh Pharma', 'Local Pharmacy'],
      priority: 'critical',
      estimatedRestockDate: '2024-01-16'
    }
  ];

  const mockHealthCamps = [
    {
      id: 1,
      title: 'Free Diabetes Screening',
      date: '2024-01-20',
      time: '10:00 AM - 4:00 PM',
      location: 'Village Community Center, Nabha',
      expectedAttendees: 150,
      registeredAttendees: 89,
      organizers: ['Dr. Preet Singh', 'Dr. Manjeet Kaur'],
      services: ['Blood Sugar Test', 'BP Check', 'Consultation'],
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Children Vaccination Drive',
      date: '2024-01-25',
      time: '9:00 AM - 3:00 PM',
      location: 'Primary School, Rajpura',
      expectedAttendees: 200,
      registeredAttendees: 156,
      organizers: ['Dr. Harpreet Singh', 'Nurse Gurpreet'],
      services: ['Polio Drops', 'MMR Vaccine', 'Health Check'],
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'General Health Checkup Camp',
      date: '2024-01-15',
      time: '8:00 AM - 5:00 PM',
      location: 'Civil Hospital, Nabha',
      expectedAttendees: 300,
      registeredAttendees: 287,
      organizers: ['Multiple Doctors'],
      services: ['General Checkup', 'Lab Tests', 'Medicine Distribution'],
      status: 'completed'
    }
  ];

  const mockVillageStats = [
    { village: 'Nabha', population: 8950, patients: 1245, consultations: 156, pharmacies: 5, doctors: 8 },
    { village: 'Rajpura', population: 12400, patients: 890, consultations: 98, pharmacies: 3, doctors: 5 },
    { village: 'Patiala', population: 15600, patients: 567, consultations: 67, pharmacies: 8, doctors: 12 },
    { village: 'Sanour', population: 6700, patients: 234, consultations: 34, pharmacies: 2, doctors: 3 },
    { village: 'Ghanaur', population: 4200, patients: 156, consultations: 23, pharmacies: 2, doctors: 2 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-warning" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-accent" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'secondary';
      case 'medium':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const handleSendAlert = (type: string, target: string) => {
    speak(`Alert sent to ${target} regarding ${type}`);
    console.log(`Sending ${type} alert to ${target}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('admin.title')}</h1>
            <p className="text-muted-foreground">Punjab Health Department Analytics & Management</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hours">24 Hours</SelectItem>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="90days">90 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold">{mockStats.totalPatients.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-accent mr-1" />
                    <span className="text-sm text-accent">+{mockStats.weeklyGrowth.patients}%</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Consultations</p>
                  <p className="text-2xl font-bold">{mockStats.activeConsultations}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-accent mr-1" />
                    <span className="text-sm text-accent">+{mockStats.weeklyGrowth.consultations}%</span>
                  </div>
                </div>
                <div className="p-3 bg-accent/10 rounded-full">
                  <Stethoscope className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Medicine Shortages</p>
                  <p className="text-2xl font-bold text-destructive">{mockStats.medicineShortages}</p>
                  <div className="flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 text-destructive mr-1" />
                    <span className="text-sm text-destructive">Requires Attention</span>
                  </div>
                </div>
                <div className="p-3 bg-destructive/10 rounded-full">
                  <Pill className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Health Camps</p>
                  <p className="text-2xl font-bold">{mockStats.healthCamps}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-primary mr-1" />
                    <span className="text-sm text-muted-foreground">This Month</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="diseases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="diseases" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>{t('admin.disease_patterns')}</span>
            </TabsTrigger>
            <TabsTrigger value="medicines" className="flex items-center space-x-2">
              <Pill className="h-4 w-4" />
              <span>{t('admin.medicine_shortage')}</span>
            </TabsTrigger>
            <TabsTrigger value="camps" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{t('admin.health_camps')}</span>
            </TabsTrigger>
            <TabsTrigger value="villages" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Village Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diseases" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Disease Outbreak Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDiseaseData.map((disease, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {disease.disease === 'Fever' && <Thermometer className="h-5 w-5 text-primary" />}
                          {disease.disease === 'Diabetes' && <Heart className="h-5 w-5 text-primary" />}
                          {disease.disease === 'Hypertension' && <Activity className="h-5 w-5 text-primary" />}
                          {!['Fever', 'Diabetes', 'Hypertension'].includes(disease.disease) && 
                            <Stethoscope className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{disease.disease}</h3>
                          <p className="text-sm text-muted-foreground">
                            Affected villages: {disease.villages.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="text-lg font-bold">{disease.cases}</p>
                            <p className="text-sm text-muted-foreground">cases</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(disease.trend)}
                            <span className="text-sm font-medium">
                              {disease.percentage > 0 ? '+' : ''}{disease.percentage}%
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Alert
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medicines" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Critical Medicine Shortages</span>
                  <Button size="sm" onClick={() => handleSendAlert('medicine shortage', 'all pharmacies')}>
                    <Phone className="h-4 w-4 mr-2" />
                    Send Bulk Alert
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMedicineShortages.map((shortage, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{shortage.medicine}</h3>
                          <p className="text-sm text-muted-foreground">
                            Affected: {shortage.affectedPharmacies.join(', ')}
                          </p>
                        </div>
                        <Badge variant={getPriorityColor(shortage.priority)}>
                          {shortage.priority.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Stock</p>
                          <p className="font-bold text-destructive">{shortage.currentStock}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Required</p>
                          <p className="font-bold">{shortage.requiredStock}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Shortage</p>
                          <p className="font-bold text-warning">{shortage.shortage}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Est. restock: {shortage.estimatedRestockDate}
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            SMS Alert
                          </Button>
                          <Button size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Call Suppliers
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="camps" className="space-y-6">
            <div className="grid gap-4">
              {mockHealthCamps.map((camp) => (
                <Card key={camp.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{camp.title}</CardTitle>
                      <Badge variant={camp.status === 'upcoming' ? 'default' : camp.status === 'completed' ? 'secondary' : 'outline'}
                             className={camp.status === 'upcoming' ? 'bg-primary text-primary-foreground' : 
                                       camp.status === 'completed' ? 'bg-accent text-accent-foreground' : ''}>
                        {camp.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{camp.date} • {camp.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{camp.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{camp.registeredAttendees} / {camp.expectedAttendees} registered</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Services Offered:</p>
                        <div className="flex flex-wrap gap-1">
                          {camp.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Organizers: {camp.organizers.join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Send Reminders
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Attendee List
                      </Button>
                      {camp.status === 'upcoming' && (
                        <Button size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Manage Camp
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="villages" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Village-wise Health Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVillageStats.map((village, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{village.village}</h3>
                          <p className="text-sm text-muted-foreground">
                            Population: {village.population.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Patient Coverage</p>
                          <p className="font-bold">
                            {((village.patients / village.population) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <p className="text-lg font-bold text-primary">{village.patients}</p>
                          <p className="text-xs text-muted-foreground">Registered Patients</p>
                        </div>
                        <div className="text-center p-3 bg-accent/10 rounded-lg">
                          <p className="text-lg font-bold text-accent">{village.consultations}</p>
                          <p className="text-xs text-muted-foreground">This Month</p>
                        </div>
                        <div className="text-center p-3 bg-secondary rounded-lg">
                          <p className="text-lg font-bold">{village.pharmacies}</p>
                          <p className="text-xs text-muted-foreground">Pharmacies</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-lg font-bold">{village.doctors}</p>
                          <p className="text-xs text-muted-foreground">Doctors</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;