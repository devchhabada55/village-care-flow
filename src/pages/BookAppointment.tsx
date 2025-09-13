import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Phone,
  User,
  CheckCircle,
  Star,
  MapPin
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  location: string;
  available: boolean;
  image?: string;
}

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    chiefComplaint: "",
    symptoms: "",
    duration: "",
    severity: ""
  });

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      specialty: "General Medicine",
      experience: "15 years",
      rating: 4.8,
      location: "Nabha Civil Hospital",
      available: true
    },
    {
      id: "2", 
      name: "Dr. Priya Sharma",
      specialty: "Pediatrics",
      experience: "12 years",
      rating: 4.9,
      location: "Nabha Civil Hospital",
      available: true
    },
    {
      id: "3",
      name: "Dr. Amit Singh",
      specialty: "Cardiology",
      experience: "18 years",
      rating: 4.7,
      location: "Patiala Medical College",
      available: false
    },
    {
      id: "4",
      name: "Dr. Sunita Kaur",
      specialty: "Dermatology", 
      experience: "10 years",
      rating: 4.6,
      location: "Nabha Civil Hospital",
      available: true
    }
  ];

  const availableDates = [
    { date: "2024-01-15", day: "Today", slots: 3 },
    { date: "2024-01-16", day: "Tomorrow", slots: 7 },
    { date: "2024-01-17", day: "Wed", slots: 5 },
    { date: "2024-01-18", day: "Thu", slots: 8 },
    { date: "2024-01-19", day: "Fri", slots: 4 }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const canProceedStep1 = consultationType !== "";
  const canProceedStep2 = selectedDoctor !== "";
  const canProceedStep3 = selectedDate !== "" && selectedTime !== "";
  const canProceedStep4 = formData.chiefComplaint.trim() !== "" && formData.symptoms.trim() !== "";

  if (step === 5) {
    const doctor = doctors.find(d => d.id === selectedDoctor);
    const dateObj = availableDates.find(d => d.date === selectedDate);
    
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-elevated">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl text-accent">Appointment Confirmed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="border border-accent/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{doctor?.name}</div>
                        <div className="text-sm text-muted-foreground">{doctor?.specialty}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{dateObj?.day}, {selectedDate}</div>
                        <div className="text-sm text-muted-foreground">at {selectedTime}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {consultationType === "video" ? (
                        <Video className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Phone className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <div className="font-semibold">
                          {consultationType === "video" ? "Video Consultation" : "Audio Consultation"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Join link will be sent via SMS
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{doctor?.location}</div>
                        <div className="text-sm text-muted-foreground">Backup physical location</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">What's Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You'll receive SMS confirmation with appointment details</li>
                  <li>• Join link will be sent 15 minutes before appointment</li>
                  <li>• Prepare your questions and any photos if needed</li>
                  <li>• For urgent issues before appointment, call 108</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full">
                    Back to Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full">
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
          <p className="text-muted-foreground">Schedule a consultation with a qualified doctor</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {["Type", "Doctor", "Schedule", "Details", "Confirm"].map((label, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index + 1 <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {index + 1}
              </div>
              <div className="ml-2 text-sm font-medium hidden sm:block">{label}</div>
              {index < 4 && <div className="w-8 sm:w-16 h-0.5 bg-muted mx-2" />}
            </div>
          ))}
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Choose Consultation Type"}
              {step === 2 && "Select Doctor"}
              {step === 3 && "Choose Date & Time"}
              {step === 4 && "Consultation Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Consultation Type */}
            {step === 1 && (
              <RadioGroup value={consultationType} onValueChange={setConsultationType}>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className={`cursor-pointer transition-colors ${consultationType === "video" ? "ring-2 ring-primary" : ""}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="video" id="video" />
                        <Label htmlFor="video" className="flex items-center space-x-3 cursor-pointer">
                          <Video className="h-6 w-6 text-primary" />
                          <span className="font-semibold">Video Consultation</span>
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        Face-to-face consultation with screen sharing and visual examination
                      </p>
                    </CardContent>
                  </Card>

                  <Card className={`cursor-pointer transition-colors ${consultationType === "audio" ? "ring-2 ring-primary" : ""}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="audio" id="audio" />
                        <Label htmlFor="audio" className="flex items-center space-x-3 cursor-pointer">
                          <Phone className="h-6 w-6 text-primary" />
                          <span className="font-semibold">Audio Consultation</span>
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        Voice-only consultation, suitable for low bandwidth areas
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            )}

            {/* Step 2: Doctor Selection */}
            {step === 2 && (
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className={`cursor-pointer transition-colors ${
                    selectedDoctor === doctor.id ? "ring-2 ring-primary" : ""
                  } ${!doctor.available ? "opacity-50" : ""}`}
                    onClick={() => doctor.available && setSelectedDoctor(doctor.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{doctor.name}</h3>
                            {!doctor.available && (
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                Not Available
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-warning fill-current" />
                              <span className="text-sm">{doctor.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{doctor.experience}</span>
                            <span className="text-sm text-muted-foreground">{doctor.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Step 3: Date & Time Selection */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Select Date</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {availableDates.map((dateOption) => (
                      <Button
                        key={dateOption.date}
                        variant={selectedDate === dateOption.date ? "default" : "outline"}
                        className="h-auto p-3 flex flex-col"
                        onClick={() => setSelectedDate(dateOption.date)}
                      >
                        <div className="font-medium">{dateOption.day}</div>
                        <div className="text-xs opacity-75">{dateOption.slots} slots</div>
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Select Time</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Consultation Details */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="chiefComplaint">Chief Complaint *</Label>
                  <Input
                    id="chiefComplaint"
                    placeholder="What is your main health concern?"
                    value={formData.chiefComplaint}
                    onChange={(e) => handleInputChange("chiefComplaint", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="symptoms">Describe Your Symptoms *</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Please describe your symptoms in detail..."
                    rows={3}
                    value={formData.symptoms}
                    onChange={(e) => handleInputChange("symptoms", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="How long have you had these symptoms?"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="severity">Severity</Label>
                    <Input
                      id="severity"
                      placeholder="Rate severity 1-10 or describe"
                      value={formData.severity}
                      onChange={(e) => handleInputChange("severity", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !canProceedStep1) ||
                  (step === 2 && !canProceedStep2) ||
                  (step === 3 && !canProceedStep3) ||
                  (step === 4 && !canProceedStep4)
                }
              >
                {step === 4 ? "Confirm Booking" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookAppointment;