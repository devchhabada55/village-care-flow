import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Stethoscope,
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  Search,
  Bell,
  AlertTriangle,
  CheckCircle,
  User,
  Pill,
  FileText,
  Activity,
  BarChart3,
  Settings,
  Wifi,
  WifiOff,
  Plus,
  Edit,
  Send,
  Download,
  Upload,
  Heart,
  Thermometer,
  TrendingUp,
  Users,
  Calendar as CalendarIcon,
  RefreshCw,
  Bookmark,
  Star,
  Flag,
  Volume2,
  Pause,
  Play
} from "lucide-react";

const DoctorDashboard = () => {
  const { t, speak } = useLanguage();
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isInCall, setIsInCall] = useState(false);

  // Mock data for doctor dashboard
  const mockDoctor = {
    name: "Dr. Rajesh Kumar",
    specialization: "General Medicine",
    id: "DOC001",
    avatar: "/placeholder.svg",
    rating: 4.8,
    totalPatients: 342,
    yearsOfExperience: 15
  };

  const mockAppointments = [
    {
      id: 1,
      patientName: "Simran Kaur",
      time: "09:00 AM",
      type: "video",
      condition: "Fever, Headache",
      priority: "urgent",
      status: "waiting",
      phone: "+91-98765-43210",
      age: 28,
      avatar: "/placeholder.svg",
      lastVisit: "2024-01-10"
    },
    {
      id: 2,
      patientName: "Harpreet Singh",
      time: "09:30 AM", 
      type: "audio",
      condition: "Follow-up Diabetes",
      priority: "normal",
      status: "scheduled",
      phone: "+91-98765-43211",
      age: 45,
      avatar: "/placeholder.svg",
      lastVisit: "2024-01-15"
    },
    {
      id: 3,
      patientName: "Gurdeep Kaur",
      time: "10:00 AM",
      type: "video",
      condition: "Chest Pain",
      priority: "urgent",
      status: "scheduled",
      phone: "+91-98765-43212", 
      age: 52,
      avatar: "/placeholder.svg",
      lastVisit: "2024-01-12"
    }
  ];

  const mockPatients = [
    {
      id: "P001",
      name: "Simran Kaur",
      age: 28,
      gender: "Female",
      phone: "+91-98765-43210",
      village: "Nabha",
      conditions: ["Hypertension", "Diabetes Type 2"],
      lastVisit: "2024-01-15",
      vitals: { bp: "140/90", pulse: 78, temp: 98.6, weight: 65 },
      avatar: "/placeholder.svg",
      riskLevel: "medium"
    },
    {
      id: "P002", 
      name: "Harpreet Singh",
      age: 45,
      gender: "Male",
      phone: "+91-98765-43211",
      village: "Rajpura",
      conditions: ["Diabetes Type 2"],
      lastVisit: "2024-01-10",
      vitals: { bp: "130/85", pulse: 72, temp: 98.2, weight: 78 },
      avatar: "/placeholder.svg",
      riskLevel: "high"
    }
  ];

  const mockAlerts = [
    {
      id: 1,
      type: "critical",
      patient: "Gurdeep Kaur",
      message: "Reported severe chest pain - requires immediate attention",
      time: "5 minutes ago"
    },
    {
      id: 2,
      type: "medicine",
      patient: "Harpreet Singh", 
      message: "Prescribed Metformin is out of stock at nearby pharmacy",
      time: "15 minutes ago"
    },
    {
      id: 3,
      type: "appointment",
      patient: "Simran Kaur",
      message: "Patient has been waiting for 10 minutes",
      time: "2 minutes ago"
    }
  ];

  const mockStats = {
    todayAppointments: 12,
    completedToday: 8,
    waitingPatients: 3,
    weeklyPatients: 67,
    avgConsultationTime: "15 min",
    patientSatisfaction: 4.8
  };

  const handleStartConsultation = (appointment: any) => {
    setSelectedPatient(appointment);
    setIsInCall(true);
    speak(`Starting consultation with ${appointment.patientName}`);
  };

  const handleEndConsultation = () => {
    setIsInCall(false);
    setSelectedPatient(null);
    speak("Consultation ended");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-4 pt-20 space-y-6">
        {/* Doctor Header */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={mockDoctor.avatar} alt={mockDoctor.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {mockDoctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{mockDoctor.name}</h1>
                  <p className="text-muted-foreground">{mockDoctor.specialization}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{mockDoctor.rating}</span>
                    </Badge>
                    <Badge variant="outline">{mockDoctor.yearsOfExperience}+ Years Experience</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {isOnline ? <Wifi className="h-4 w-4 text-accent" /> : <WifiOff className="h-4 w-4 text-destructive" />}
                  <span className="text-sm font-medium">
                    {isOnline ? 'Online' : 'Offline Mode'}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                  <p className="text-2xl font-bold text-primary">{mockStats.todayAppointments}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold text-accent">{mockStats.completedToday}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>
          
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Waiting Patients</p>
                      <p className="text-2xl font-bold text-destructive">{mockStats.waitingPatients}</p>
                    </div>
                    <Clock className="h-8 w-8 text-destructive/60" />
                  </div>
                </CardContent>
              </Card>
          
          <Card className="border-destructive/20 hover:border-destructive/40 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <p className="text-2xl font-bold text-destructive">{mockStats.patientSatisfaction}</p>
                </div>
                <Heart className="h-8 w-8 text-destructive/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-secondary/50">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Patients</span>
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center space-x-2">
              <Pill className="h-4 w-4" />
              <span>Prescriptions</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="consultation" className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span>Live Call</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Today's Schedule</span>
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback>{appointment.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{appointment.patientName}</p>
                            <p className="text-sm text-muted-foreground">{appointment.condition}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">{appointment.time}</span>
                              {appointment.type === 'video' ? <Video className="h-3 w-3" /> : <Phone className="h-3 w-3" />}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getPriorityColor(appointment.priority)}>
                            {appointment.priority}
                          </Badge>
                          {appointment.status === 'waiting' ? (
                            <Button onClick={() => handleStartConsultation(appointment)} size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Start
                            </Button>
                          ) : (
                            <Badge variant="outline">{appointment.status}</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Alerts & Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-warning" />
                    <span>Alerts & Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 rounded-lg border border-border/50 bg-background/50">
                      <div className="flex items-start space-x-2">
                        {alert.type === 'critical' && <AlertTriangle className="h-4 w-4 text-destructive mt-1" />}
                        {alert.type === 'medicine' && <Pill className="h-4 w-4 text-warning mt-1" />}
                        {alert.type === 'appointment' && <Clock className="h-4 w-4 text-primary mt-1" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{alert.patient}</p>
                          <p className="text-xs text-muted-foreground">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Appointment Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Slot
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Availability
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    {mockAppointments.map((appointment) => (
                      <Card key={appointment.id} className="border border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={appointment.avatar} />
                                <AvatarFallback>{appointment.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                                <p className="text-sm text-muted-foreground">{appointment.condition}</p>
                                <p className="text-xs text-muted-foreground">Age: {appointment.age} • Last visit: {appointment.lastVisit}</p>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium">{appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {appointment.type === 'video' ? <Video className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                                <Badge variant={getPriorityColor(appointment.priority)}>
                                  {appointment.priority}
                                </Badge>
                              </div>
                              <Button onClick={() => handleStartConsultation(appointment)} size="sm" className="w-full">
                                Start Consultation
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Schedule Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Available Hours</label>
                        <div className="flex items-center space-x-2 mt-2">
                          <Input placeholder="09:00" className="w-20" />
                          <span>to</span>
                          <Input placeholder="17:00" className="w-20" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Slot Duration</label>
                        <Select defaultValue="30">
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Emergency Hours</span>
                        <Switch />
                      </div>
                      <Button className="w-full">
                        Update Schedule
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Patient Records</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search patients..." 
                        className="pl-8 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {mockPatients.map((patient) => (
                    <Card key={patient.id} className="border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={patient.avatar} />
                              <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-foreground">{patient.name}</h3>
                              <p className="text-sm text-muted-foreground">{patient.age} years • {patient.gender}</p>
                              <p className="text-xs text-muted-foreground">{patient.village} • {patient.phone}</p>
                            </div>
                          </div>
                          <Badge variant={patient.riskLevel === 'high' ? 'destructive' : patient.riskLevel === 'medium' ? 'outline' : 'secondary'}>
                            {patient.riskLevel} risk
                          </Badge>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>BP: {patient.vitals.bp}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Activity className="h-3 w-3" />
                              <span>Pulse: {patient.vitals.pulse}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Thermometer className="h-3 w-3" />
                              <span>Temp: {patient.vitals.temp}°F</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>Weight: {patient.vitals.weight}kg</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {patient.conditions.map((condition, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</span>
                            <Button size="sm" variant="outline">
                              <FileText className="h-3 w-3 mr-1" />
                              View Full Record
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <span>E-Prescriptions & Lab Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Create New Prescription</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Patient</label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockPatients.map((patient) => (
                              <SelectItem key={patient.id} value={patient.id}>
                                {patient.name} - {patient.phone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Medication</label>
                        <Input placeholder="Enter medication name" className="mt-1" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">Dosage</label>
                          <Input placeholder="e.g., 500mg" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Frequency</label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="once">Once daily</SelectItem>
                              <SelectItem value="twice">Twice daily</SelectItem>
                              <SelectItem value="thrice">Three times daily</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Duration</label>
                        <Input placeholder="e.g., 7 days" className="mt-1" />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Special Instructions</label>
                        <Textarea placeholder="After meals, with water..." className="mt-1" />
                      </div>
                      
                      <Button className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Send Prescription
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Lab Test Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Patient</label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockPatients.map((patient) => (
                              <SelectItem key={patient.id} value={patient.id}>
                                {patient.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Test Type</label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select test" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blood">Blood Test</SelectItem>
                            <SelectItem value="urine">Urine Test</SelectItem>
                            <SelectItem value="xray">X-Ray</SelectItem>
                            <SelectItem value="ecg">ECG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Priority</label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="routine">Routine</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea placeholder="Additional instructions..." className="mt-1" />
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Order Lab Test
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                      <p className="text-2xl font-bold text-primary">{mockDoctor.totalPatients}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary/60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold text-accent">{mockStats.weeklyPatients}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-accent/60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Consultation</p>
                      <p className="text-2xl font-bold text-warning">{mockStats.avgConsultationTime}</p>
                    </div>
                    <Clock className="h-8 w-8 text-warning/60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Satisfaction</p>
                      <p className="text-2xl font-bold text-destructive">{mockStats.patientSatisfaction}/5</p>
                    </div>
                    <Star className="h-8 w-8 text-destructive/60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Common Conditions Treated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { condition: "Diabetes Type 2", patients: 45, percentage: 32 },
                    { condition: "Hypertension", patients: 38, percentage: 27 },
                    { condition: "Fever & Cold", patients: 28, percentage: 20 },
                    { condition: "Digestive Issues", patients: 18, percentage: 13 },
                    { condition: "Skin Conditions", patients: 12, percentage: 8 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.condition}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-secondary rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{item.patients} patients</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Consultation Tab */}
          <TabsContent value="consultation" className="space-y-6">
            {!isInCall ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Active Consultation</h3>
                  <p className="text-muted-foreground mb-6">
                    Select a patient from appointments to start a consultation
                  </p>
                  <Button onClick={() => setActiveTab("appointments")}>
                    <Calendar className="h-4 w-4 mr-2" />
                    View Appointments
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Video className="h-5 w-5" />
                        <span>Consultation with {selectedPatient?.patientName}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          15:32
                        </Badge>
                        <Button variant="destructive" size="sm" onClick={handleEndConsultation}>
                          End Call
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <Avatar className="h-24 w-24 mx-auto mb-4">
                            <AvatarImage src={selectedPatient?.avatar} />
                            <AvatarFallback className="text-2xl">
                              {selectedPatient?.patientName.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-lg font-semibold">{selectedPatient?.patientName}</p>
                          <p className="text-muted-foreground">Video call in progress</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-4">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Patient Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm">
                        <p><span className="font-medium">Age:</span> {selectedPatient?.age}</p>
                        <p><span className="font-medium">Condition:</span> {selectedPatient?.condition}</p>
                        <p><span className="font-medium">Last Visit:</span> {selectedPatient?.lastVisit}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Consultation Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea placeholder="Enter consultation notes..." className="min-h-32" />
                      <Button className="w-full mt-2" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Save Notes
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;