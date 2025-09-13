import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FileText,
  Download,
  Calendar,
  User,
  Pill,
  TestTube,
  Heart,
  WifiOff,
  RefreshCw,
  Volume2,
  Image as ImageIcon,
  Lock
} from "lucide-react";

const HealthRecords = () => {
  const { t, speak } = useLanguage();
  const [isOffline] = useState(false);
  const [lastSync] = useState(new Date());

  const mockRecords = {
    prescriptions: [
      {
        id: 1,
        date: "2024-01-15",
        doctor: "Dr. Preet Singh",
        medications: ["Paracetamol 500mg", "Amoxicillin 250mg"],
        condition: "Fever and throat infection",
        notes: "Take with food, complete course",
        encrypted: true
      },
      {
        id: 2,
        date: "2024-01-10",
        doctor: "Dr. Manjeet Kaur",
        medications: ["Metformin 500mg", "Glibenclamide 5mg"],
        condition: "Diabetes management",
        notes: "Monitor blood sugar levels",
        encrypted: true
      }
    ],
    labReports: [
      {
        id: 1,
        date: "2024-01-12",
        type: "Blood Test",
        results: "HbA1c: 7.2%, Normal ranges achieved",
        doctor: "Dr. Harpreet Kaur",
        status: "Normal",
        downloadUrl: "#"
      },
      {
        id: 2,
        date: "2024-01-08",
        type: "X-Ray Chest",
        results: "Clear lungs, no abnormalities detected",
        doctor: "Dr. Rajdeep Singh",
        status: "Normal",
        downloadUrl: "#"
      }
    ],
    doctorNotes: [
      {
        id: 1,
        date: "2024-01-15",
        doctor: "Dr. Preet Singh",
        notes: "Patient responding well to treatment. Fever reduced. Continue medication for 3 more days.",
        followUp: "2024-01-20",
        priority: "normal"
      },
      {
        id: 2,
        date: "2024-01-10",
        doctor: "Dr. Manjeet Kaur",
        notes: "Blood sugar levels stable. Patient educated about dietary restrictions. Regular monitoring required.",
        followUp: "2024-02-10",
        priority: "high"
      }
    ]
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('records.title')}</h1>
            <p className="text-muted-foreground">Secure, encrypted health records available offline</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {isOffline && (
              <Badge variant="secondary" className="bg-warning/10 text-warning">
                <WifiOff className="h-4 w-4 mr-1" />
                Offline Mode
              </Badge>
            )}
            
            <Badge variant="outline" className="bg-accent/10 text-accent">
              <Lock className="h-4 w-4 mr-1" />
              Encrypted
            </Badge>
            
            <div className="text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 inline mr-1" />
              Last synced: {lastSync.toLocaleDateString()}
            </div>
          </div>
        </div>

        <Tabs defaultValue="prescriptions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prescriptions" className="flex items-center space-x-2">
              <Pill className="h-4 w-4" />
              <span>{t('records.prescriptions')}</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <TestTube className="h-4 w-4" />
              <span>{t('records.lab_reports')}</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>{t('records.doctor_notes')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-4">
            {mockRecords.prescriptions.map((prescription) => (
              <Card key={prescription.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Pill className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{prescription.condition}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {prescription.date}
                          </span>
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {prescription.doctor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSpeak(`Prescription for ${prescription.condition}. Medications: ${prescription.medications.join(', ')}. Notes: ${prescription.notes}`)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      {prescription.encrypted && (
                        <Lock className="h-4 w-4 text-accent" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Medications:</h4>
                    <div className="flex flex-wrap gap-2">
                      {prescription.medications.map((med, index) => (
                        <Badge key={index} variant="secondary">{med}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Instructions:</h4>
                    <p className="text-muted-foreground">{prescription.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            {mockRecords.labReports.map((report) => (
              <Card key={report.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <TestTube className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.type}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {report.date}
                          </span>
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {report.doctor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={report.status === 'Normal' ? 'default' : 'destructive'}
                        className={report.status === 'Normal' ? 'bg-accent text-accent-foreground' : ''}
                      >
                        {report.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{report.results}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            {mockRecords.doctorNotes.map((note) => (
              <Card key={note.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Consultation Notes</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {note.date}
                          </span>
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {note.doctor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={note.priority === 'high' ? 'destructive' : 'secondary'}
                      >
                        {note.priority === 'high' ? 'High Priority' : 'Normal'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSpeak(note.notes)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">{note.notes}</p>
                  {note.followUp && (
                    <div className="flex items-center text-sm">
                      <Heart className="h-4 w-4 text-primary mr-2" />
                      <span>Follow-up scheduled: {note.followUp}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthRecords;