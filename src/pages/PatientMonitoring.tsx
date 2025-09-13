import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Heart,
  Activity,
  Thermometer,
  Weight,
  Droplets,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Bluetooth,
  Wifi,
  Battery
} from "lucide-react";

const PatientMonitoring = () => {
  const { t, speak } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newReading, setNewReading] = useState({
    bp_systolic: '',
    bp_diastolic: '',
    glucose: '',
    weight: '',
    temperature: ''
  });

  const mockVitals = {
    bloodPressure: {
      current: { systolic: 128, diastolic: 82, timestamp: "2024-01-15 09:30 AM" },
      trend: "stable",
      history: [
        { date: "2024-01-15", systolic: 128, diastolic: 82, time: "09:30 AM" },
        { date: "2024-01-14", systolic: 135, diastolic: 85, time: "08:45 AM" },
        { date: "2024-01-13", systolic: 132, diastolic: 80, time: "09:15 AM" },
        { date: "2024-01-12", systolic: 130, diastolic: 83, time: "08:30 AM" },
        { date: "2024-01-11", systolic: 125, diastolic: 78, time: "09:00 AM" }
      ]
    },
    glucose: {
      current: { value: 145, unit: "mg/dL", timestamp: "2024-01-15 08:00 AM", type: "Fasting" },
      trend: "increasing",
      history: [
        { date: "2024-01-15", value: 145, type: "Fasting", time: "08:00 AM" },
        { date: "2024-01-14", value: 140, type: "Fasting", time: "08:15 AM" },
        { date: "2024-01-13", value: 138, type: "Fasting", time: "08:30 AM" },
        { date: "2024-01-12", value: 142, type: "Fasting", time: "08:00 AM" },
        { date: "2024-01-11", value: 135, type: "Fasting", time: "08:45 AM" }
      ]
    },
    weight: {
      current: { value: 72.5, unit: "kg", timestamp: "2024-01-15 07:00 AM" },
      trend: "decreasing",
      history: [
        { date: "2024-01-15", value: 72.5, time: "07:00 AM" },
        { date: "2024-01-12", value: 73.0, time: "07:15 AM" },
        { date: "2024-01-09", value: 73.2, time: "07:30 AM" },
        { date: "2024-01-06", value: 73.8, time: "07:00 AM" },
        { date: "2024-01-03", value: 74.1, time: "07:45 AM" }
      ]
    },
    temperature: {
      current: { value: 98.6, unit: "°F", timestamp: "2024-01-15 06:30 AM" },
      trend: "stable",
      history: [
        { date: "2024-01-15", value: 98.6, time: "06:30 AM" },
        { date: "2024-01-14", value: 98.4, time: "06:45 AM" },
        { date: "2024-01-13", value: 98.8, time: "06:15 AM" },
        { date: "2024-01-12", value: 98.5, time: "06:30 AM" }
      ]
    }
  };

  const mockConnectedDevices = [
    {
      id: 1,
      name: "BP Monitor Pro",
      type: "Blood Pressure Monitor",
      isConnected: true,
      batteryLevel: 85,
      lastSync: "2024-01-15 09:30 AM"
    },
    {
      id: 2,
      name: "GlucoTrack Smart",
      type: "Glucose Monitor",
      isConnected: true,
      batteryLevel: 92,
      lastSync: "2024-01-15 08:00 AM"
    },
    {
      id: 3,
      name: "SmartScale Plus",
      type: "Digital Scale",
      isConnected: false,
      batteryLevel: 45,
      lastSync: "2024-01-12 07:15 AM"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-warning" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-accent" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "increasing":
        return "text-warning";
      case "decreasing":
        return "text-accent";
      default:
        return "text-muted-foreground";
    }
  };

  const getVitalStatus = (type: string, value: number) => {
    switch (type) {
      case "bp_systolic":
        if (value > 140) return { status: "high", color: "destructive" };
        if (value < 90) return { status: "low", color: "warning" };
        return { status: "normal", color: "accent" };
      case "glucose":
        if (value > 140) return { status: "high", color: "destructive" };
        if (value < 70) return { status: "low", color: "warning" };
        return { status: "normal", color: "accent" };
      default:
        return { status: "normal", color: "accent" };
    }
  };

  const handleInputReading = (field: string, value: string) => {
    setNewReading(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveReading = (type: string) => {
    // Simulate saving reading
    speak(`New ${type} reading saved successfully`);
    setNewReading(prev => ({ ...prev, [type]: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('monitoring.title')}</h1>
            <p className="text-muted-foreground">Track your health vitals and chronic conditions</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-accent/10 text-accent">
              <Wifi className="h-4 w-4 mr-1" />
              Synced 5 min ago
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Reading</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>Devices</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Blood Pressure */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <Heart className="h-5 w-5 text-destructive" />
                    </div>
                    <span>{t('monitoring.bp')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {mockVitals.bloodPressure.current.systolic}/
                        {mockVitals.bloodPressure.current.diastolic}
                      </div>
                      <div className="text-sm text-muted-foreground">mmHg</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        {getTrendIcon(mockVitals.bloodPressure.trend)}
                        <span className={getTrendColor(mockVitals.bloodPressure.trend)}>
                          {mockVitals.bloodPressure.trend}
                        </span>
                      </span>
                      <Badge variant="outline" className="bg-accent/10 text-accent">
                        Normal
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last: {mockVitals.bloodPressure.current.timestamp}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blood Glucose */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Droplets className="h-5 w-5 text-primary" />
                    </div>
                    <span>{t('monitoring.glucose')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {mockVitals.glucose.current.value}
                      </div>
                      <div className="text-sm text-muted-foreground">mg/dL</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        {getTrendIcon(mockVitals.glucose.trend)}
                        <span className={getTrendColor(mockVitals.glucose.trend)}>
                          {mockVitals.glucose.trend}
                        </span>
                      </span>
                      <Badge variant="secondary" className="bg-warning/10 text-warning">
                        High
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {mockVitals.glucose.current.type} - {mockVitals.glucose.current.timestamp}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weight */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Weight className="h-5 w-5 text-accent" />
                    </div>
                    <span>{t('monitoring.weight')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {mockVitals.weight.current.value}
                      </div>
                      <div className="text-sm text-muted-foreground">kg</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        {getTrendIcon(mockVitals.weight.trend)}
                        <span className={getTrendColor(mockVitals.weight.trend)}>
                          {mockVitals.weight.trend}
                        </span>
                      </span>
                      <Badge variant="outline" className="bg-accent/10 text-accent">
                        Good
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last: {mockVitals.weight.current.timestamp}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Temperature */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Thermometer className="h-5 w-5 text-warning" />
                    </div>
                    <span>{t('monitoring.temperature')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {mockVitals.temperature.current.value}
                      </div>
                      <div className="text-sm text-muted-foreground">°F</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        {getTrendIcon(mockVitals.temperature.trend)}
                        <span className={getTrendColor(mockVitals.temperature.trend)}>
                          {mockVitals.temperature.trend}
                        </span>
                      </span>
                      <Badge variant="outline" className="bg-accent/10 text-accent">
                        Normal
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last: {mockVitals.temperature.current.timestamp}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Alerts */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <span>Health Alerts & Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium">Elevated Blood Glucose</p>
                      <p className="text-sm text-muted-foreground">Your fasting glucose is above normal range. Consider consulting your doctor.</p>
                      <p className="text-xs text-muted-foreground mt-1">Alert generated: Today at 8:15 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Weight Loss Progress</p>
                      <p className="text-sm text-muted-foreground">Great job! You've lost 1.6 kg in the past 2 weeks.</p>
                      <p className="text-xs text-muted-foreground mt-1">Progress tracked: Last 14 days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Blood Pressure Trend */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Blood Pressure Trend (5 days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockVitals.bloodPressure.history.map((reading, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{reading.date}</p>
                            <p className="text-xs text-muted-foreground">{reading.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{reading.systolic}/{reading.diastolic}</p>
                          <p className="text-xs text-muted-foreground">mmHg</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Glucose Trend */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Blood Glucose Trend (5 days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockVitals.glucose.history.map((reading, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{reading.date}</p>
                            <p className="text-xs text-muted-foreground">{reading.time} - {reading.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{reading.value}</p>
                          <p className="text-xs text-muted-foreground">mg/dL</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Blood Pressure Input */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-destructive" />
                    <span>Add Blood Pressure Reading</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bp_systolic">Systolic</Label>
                      <Input
                        id="bp_systolic"
                        type="number"
                        placeholder="120"
                        value={newReading.bp_systolic}
                        onChange={(e) => handleInputReading('bp_systolic', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bp_diastolic">Diastolic</Label>
                      <Input
                        id="bp_diastolic"
                        type="number"
                        placeholder="80"
                        value={newReading.bp_diastolic}
                        onChange={(e) => handleInputReading('bp_diastolic', e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleSaveReading('blood pressure')}
                    disabled={!newReading.bp_systolic || !newReading.bp_diastolic}
                  >
                    Save Blood Pressure
                  </Button>
                </CardContent>
              </Card>

              {/* Glucose Input */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    <span>Add Glucose Reading</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
                    <Input
                      id="glucose"
                      type="number"
                      placeholder="120"
                      value={newReading.glucose}
                      onChange={(e) => handleInputReading('glucose', e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleSaveReading('glucose')}
                    disabled={!newReading.glucose}
                  >
                    Save Glucose Reading
                  </Button>
                </CardContent>
              </Card>

              {/* Weight Input */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Weight className="h-5 w-5 text-accent" />
                    <span>Add Weight Reading</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="70.5"
                      value={newReading.weight}
                      onChange={(e) => handleInputReading('weight', e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleSaveReading('weight')}
                    disabled={!newReading.weight}
                  >
                    Save Weight Reading
                  </Button>
                </CardContent>
              </Card>

              {/* Temperature Input */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5 text-warning" />
                    <span>Add Temperature Reading</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="temperature">Temperature (°F)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="98.6"
                      value={newReading.temperature}
                      onChange={(e) => handleInputReading('temperature', e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleSaveReading('temperature')}
                    disabled={!newReading.temperature}
                  >
                    Save Temperature Reading
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid gap-4">
              {mockConnectedDevices.map((device) => (
                <Card key={device.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${device.isConnected ? 'bg-accent/10' : 'bg-muted'}`}>
                          <Smartphone className={`h-6 w-6 ${device.isConnected ? 'text-accent' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{device.name}</h3>
                          <p className="text-sm text-muted-foreground">{device.type}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Last sync: {device.lastSync}
                            </span>
                            <span className="flex items-center">
                              <Battery className="h-3 w-3 mr-1" />
                              {device.batteryLevel}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={device.isConnected ? 'default' : 'secondary'}
                               className={device.isConnected ? 'bg-accent text-accent-foreground' : ''}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${device.isConnected ? 'bg-current' : 'bg-muted-foreground'}`}></div>
                          {device.isConnected ? 'Connected' : 'Disconnected'}
                        </Badge>
                        <Button size="sm" variant={device.isConnected ? 'outline' : 'default'}>
                          <Bluetooth className="h-4 w-4 mr-1" />
                          {device.isConnected ? 'Disconnect' : 'Connect'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Add New Device</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Bluetooth className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Connect new health monitoring devices via Bluetooth
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Scan for Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientMonitoring;