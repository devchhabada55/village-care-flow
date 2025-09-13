import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Send,
  Signal,
  SignalLow,
  SignalMedium,
  SignalHigh,
  User,
  Clock,
  FileText,
  Camera,
  Volume2,
  Settings,
  Maximize,
  Minimize
} from "lucide-react";

const VideoConsultation = () => {
  const { t, speak } = useLanguage();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [connectionQuality, setConnectionQuality] = useState<'poor' | 'medium' | 'good'>('medium');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Preet Singh',
      message: 'Hello! How are you feeling today?',
      time: '10:30 AM',
      isDoctor: true
    },
    {
      id: 2,
      sender: 'You',
      message: 'I have been having fever for 2 days',
      time: '10:31 AM',
      isDoctor: false
    }
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [callDuration, setCallDuration] = useState(0);

  const mockPatientData = {
    name: "Rajveer Singh",
    age: 45,
    village: "Nabha",
    condition: "Fever and throat pain",
    lastVisit: "2024-01-10",
    allergies: ["Penicillin"],
    currentMedications: ["Paracetamol 500mg"]
  };

  const mockDoctor = {
    name: "Dr. Preet Singh",
    specialization: "General Medicine",
    experience: "8 years",
    rating: 4.8,
    languages: ["English", "Punjabi", "Hindi"]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    speak("Call started with Dr. Preet Singh");
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    speak("Call ended");
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDoctor: false
      }]);
      setChatMessage('');
    }
  };

  const getSignalIcon = () => {
    switch (connectionQuality) {
      case 'poor': return <SignalLow className="h-4 w-4 text-destructive" />;
      case 'medium': return <SignalMedium className="h-4 w-4 text-warning" />;
      case 'good': return <SignalHigh className="h-4 w-4 text-accent" />;
    }
  };

  const getConnectionBadge = () => {
    const variants = {
      poor: 'destructive',
      medium: 'secondary',
      good: 'default'
    } as const;
    
    const labels = {
      poor: 'Poor Connection - Audio Recommended',
      medium: 'Moderate Connection',
      good: 'Good Connection'
    };

    return (
      <Badge variant={variants[connectionQuality]} className={connectionQuality === 'good' ? 'bg-accent text-accent-foreground' : ''}>
        {getSignalIcon()}
        <span className="ml-1">{labels[connectionQuality]}</span>
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isCallActive ? (
          // Pre-call interface
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{t('consultation.title')}</CardTitle>
                      <p className="text-muted-foreground">Scheduled appointment with {mockDoctor.name}</p>
                    </div>
                    {getConnectionBadge()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        Doctor Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">{mockDoctor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Specialization:</span>
                          <span className="font-medium">{mockDoctor.specialization}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Experience:</span>
                          <span className="font-medium">{mockDoctor.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rating:</span>
                          <span className="font-medium">⭐ {mockDoctor.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        Patient Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">{mockPatientData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Age:</span>
                          <span className="font-medium">{mockPatientData.age} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Village:</span>
                          <span className="font-medium">{mockPatientData.village}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Condition:</span>
                          <span className="font-medium">{mockPatientData.condition}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Connection Options</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button 
                        size="lg" 
                        onClick={handleStartCall}
                        className="flex items-center justify-center space-x-2"
                        disabled={connectionQuality === 'poor'}
                      >
                        <Video className="h-5 w-5" />
                        <span>Start Video Call</span>
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => {
                          setIsVideoEnabled(false);
                          handleStartCall();
                        }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <Phone className="h-5 w-5" />
                        <span>{t('consultation.audio_only')}</span>
                      </Button>
                    </div>
                    {connectionQuality === 'poor' && (
                      <p className="text-sm text-muted-foreground mt-2 text-center">
                        {t('consultation.poor_connection')}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Allergies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {mockPatientData.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Current Medications:</h4>
                    <div className="flex flex-wrap gap-1">
                      {mockPatientData.currentMedications.map((med, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {med}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Last visit:</span>
                    <span className="ml-2 font-medium">{mockPatientData.lastVisit}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Active call interface
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-elevated">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/10 rounded-full">
                        <User className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{mockDoctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mockDoctor.specialization}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getConnectionBadge()}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDuration(callDuration)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`relative bg-muted rounded-lg ${isFullscreen ? 'h-96' : 'h-64'} flex items-center justify-center`}>
                    {isVideoEnabled ? (
                      <div className="text-center">
                        <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Video call active</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Phone className="h-16 w-16 text-primary mx-auto mb-2" />
                        <p className="text-muted-foreground">Audio call active</p>
                      </div>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-4 right-4"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-center space-x-4 mt-6">
                    <Button
                      size="lg"
                      variant={isAudioEnabled ? "outline" : "destructive"}
                      onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                      className="rounded-full w-12 h-12 p-0"
                    >
                      {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </Button>
                    
                    <Button
                      size="lg"
                      variant={isVideoEnabled ? "outline" : "secondary"}
                      onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                      className="rounded-full w-12 h-12 p-0"
                    >
                      {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </Button>
                    
                    <Button
                      size="lg"
                      variant="destructive"
                      onClick={handleEndCall}
                      className="rounded-full w-12 h-12 p-0"
                    >
                      <PhoneOff className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full w-12 h-12 p-0"
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-96 flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-3">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isDoctor ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-xs p-3 rounded-lg ${
                            msg.isDoctor 
                              ? 'bg-muted text-foreground' 
                              : 'bg-primary text-primary-foreground'
                          }`}>
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1 min-h-0 resize-none"
                      rows={2}
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoConsultation;