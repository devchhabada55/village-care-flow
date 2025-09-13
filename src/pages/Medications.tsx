import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Pill,
  Clock,
  Bell,
  BellOff,
  Phone,
  MessageSquare,
  Volume2,
  AlertTriangle,
  CheckCircle,
  Calendar,
  ShoppingCart,
  RefreshCw
} from "lucide-react";

const Medications = () => {
  const { t, speak } = useLanguage();
  const [smsReminders, setSmsReminders] = useState(true);
  const [voiceReminders, setVoiceReminders] = useState(true);

  const mockMedications = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      dosage: "1 tablet",
      frequency: "3 times daily",
      timings: ["8:00 AM", "2:00 PM", "8:00 PM"],
      nextDose: "2:00 PM",
      daysLeft: 5,
      condition: "Fever",
      prescribedBy: "Dr. Preet Singh",
      instructions: "Take with food",
      refillNeeded: false,
      imageUrl: "#"
    },
    {
      id: 2,
      name: "Metformin 500mg",
      dosage: "1 tablet",
      frequency: "2 times daily",
      timings: ["8:00 AM", "8:00 PM"],
      nextDose: "8:00 PM",
      daysLeft: 2,
      condition: "Diabetes",
      prescribedBy: "Dr. Manjeet Kaur",
      instructions: "Take with meals, monitor blood sugar",
      refillNeeded: true,
      imageUrl: "#"
    },
    {
      id: 3,
      name: "Amoxicillin 250mg",
      dosage: "1 capsule",
      frequency: "3 times daily",
      timings: ["8:00 AM", "2:00 PM", "8:00 PM"],
      nextDose: "8:00 PM",
      daysLeft: 3,
      condition: "Throat infection",
      prescribedBy: "Dr. Preet Singh",
      instructions: "Complete full course, take with water",
      refillNeeded: false,
      imageUrl: "#"
    }
  ];

  const mockReminders = [
    {
      id: 1,
      time: "8:00 AM",
      medication: "Paracetamol 500mg",
      status: "taken",
      date: "Today"
    },
    {
      id: 2,
      time: "8:00 AM",
      medication: "Metformin 500mg",
      status: "taken",
      date: "Today"
    },
    {
      id: 3,
      time: "2:00 PM",
      medication: "Paracetamol 500mg",
      status: "upcoming",
      date: "Today"
    },
    {
      id: 4,
      time: "2:00 PM",
      medication: "Amoxicillin 250mg",
      status: "missed",
      date: "Yesterday"
    }
  ];

  const handleMedicationReminder = (medication: any) => {
    if (voiceReminders) {
      speak(`Time to take your medication: ${medication.name}, ${medication.dosage}. ${medication.instructions}`);
    }
    
    // Simulate SMS reminder
    if (smsReminders) {
      console.log(`SMS sent: Time to take ${medication.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('medication.title')}</h1>
            <p className="text-muted-foreground">Manage your medications with smart reminders</p>
          </div>
          
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">SMS Reminders</span>
                </div>
                <Switch 
                  checked={smsReminders} 
                  onCheckedChange={setSmsReminders}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Voice Reminders</span>
                </div>
                <Switch 
                  checked={voiceReminders} 
                  onCheckedChange={setVoiceReminders}
                />
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current" className="flex items-center space-x-2">
              <Pill className="h-4 w-4" />
              <span>{t('medication.current')}</span>
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>{t('medication.reminders')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockMedications.map((medication) => (
                <Card key={medication.id} className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Pill className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{medication.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{medication.condition}</p>
                        </div>
                      </div>
                      {medication.refillNeeded && (
                        <Badge variant="destructive" className="text-xs">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          {t('medication.refill_needed')}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Dosage:</span>
                        <span className="font-medium">{medication.dosage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frequency:</span>
                        <span className="font-medium">{medication.frequency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Next dose:</span>
                        <span className="font-medium text-primary">{medication.nextDose}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Days left:</span>
                        <span className={`font-medium ${medication.daysLeft <= 3 ? 'text-warning' : 'text-accent'}`}>
                          {medication.daysLeft} days
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-xs text-muted-foreground mb-2">Daily schedule:</p>
                      <div className="flex flex-wrap gap-1">
                        {medication.timings.map((time, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-xs text-muted-foreground mb-1">Instructions:</p>
                      <p className="text-xs">{medication.instructions}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleMedicationReminder(medication)}
                      >
                        <Bell className="h-4 w-4 mr-1" />
                        Test Reminder
                      </Button>
                      {medication.refillNeeded && (
                        <Button size="sm" className="flex-1">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Order Refill
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Today's Schedule</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockReminders.filter(r => r.date === 'Today').map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            reminder.status === 'taken' ? 'bg-accent/10' :
                            reminder.status === 'upcoming' ? 'bg-primary/10' :
                            'bg-destructive/10'
                          }`}>
                            {reminder.status === 'taken' ? (
                              <CheckCircle className="h-4 w-4 text-accent" />
                            ) : reminder.status === 'upcoming' ? (
                              <Clock className="h-4 w-4 text-primary" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{reminder.medication}</p>
                            <p className="text-sm text-muted-foreground">{reminder.time}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            reminder.status === 'taken' ? 'default' :
                            reminder.status === 'upcoming' ? 'secondary' :
                            'destructive'
                          }
                          className={reminder.status === 'taken' ? 'bg-accent text-accent-foreground' : ''}
                        >
                          {reminder.status === 'taken' ? 'Taken' :
                           reminder.status === 'upcoming' ? 'Upcoming' :
                           'Missed'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <span>Missed Reminders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockReminders.filter(r => r.status === 'missed').map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-full bg-destructive/10">
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          </div>
                          <div>
                            <p className="font-medium">{reminder.medication}</p>
                            <p className="text-sm text-muted-foreground">{reminder.date} at {reminder.time}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Mark as Taken
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Medications;