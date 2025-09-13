import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle,
  Phone,
  Camera,
  FileText
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  type: "single" | "multiple";
}

const SymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is your main health concern today?",
      options: ["Fever", "Headache", "Stomach pain", "Cough", "Body ache", "Skin problem"],
      type: "single"
    },
    {
      id: 2,
      question: "How long have you been experiencing this symptom?",
      options: ["Less than 1 day", "1-3 days", "4-7 days", "More than 1 week"],
      type: "single"
    },
    {
      id: 3,
      question: "How severe is your symptom?",
      options: ["Mild (doesn't interfere with daily activities)", "Moderate (some difficulty with activities)", "Severe (unable to do normal activities)"],
      type: "single"
    },
    {
      id: 4,
      question: "Do you have any of these additional symptoms?",
      options: ["Nausea/Vomiting", "Dizziness", "Loss of appetite", "Difficulty sleeping", "None of these"],
      type: "multiple"
    }
  ];

  const handleAnswer = (questionId: number, option: string, isMultiple: boolean) => {
    if (isMultiple) {
      const currentAnswers = answers[questionId] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter(a => a !== option)
        : [...currentAnswers, option];
      setAnswers({ ...answers, [questionId]: newAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: [option] });
    }
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendation = () => {
    const mainSymptom = answers[1]?.[0];
    const severity = answers[3]?.[0];
    
    if (severity === "Severe (unable to do normal activities)") {
      return {
        level: "urgent",
        title: "Immediate Medical Attention Recommended",
        description: "Based on your symptoms, we recommend you consult with a doctor immediately.",
        action: "Book Emergency Consultation",
        color: "destructive"
      };
    } else if (severity === "Moderate (some difficulty with activities)") {
      return {
        level: "moderate",
        title: "Medical Consultation Recommended",
        description: "Your symptoms suggest you should see a doctor within the next day or two.",
        action: "Book Consultation",
        color: "warning"
      };
    } else {
      return {
        level: "mild",
        title: "Home Care with Monitoring",
        description: "Your symptoms are mild. Try home remedies and monitor for changes.",
        action: "View Home Remedies", 
        color: "accent"
      };
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const currentAnswers = answers[currentQuestion?.id] || [];
  const canProceed = currentAnswers.length > 0;

  if (showResults) {
    const recommendation = getRecommendation();
    
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Symptom Assessment Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`p-6 rounded-lg border-l-4 ${
                recommendation.color === "destructive" ? "border-destructive bg-destructive/10" :
                recommendation.color === "warning" ? "border-warning bg-warning/10" :
                "border-accent bg-accent/10"
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  {recommendation.level === "urgent" ? (
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  ) : recommendation.level === "moderate" ? (
                    <Activity className="h-6 w-6 text-warning" />
                  ) : (
                    <CheckCircle className="h-6 w-6 text-accent" />
                  )}
                  <h3 className="text-xl font-semibold">{recommendation.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{recommendation.description}</p>
                
                {recommendation.level === "urgent" && (
                  <div className="bg-destructive text-destructive-foreground p-4 rounded-lg mb-4">
                    <div className="font-semibold mb-2">Warning Signs Present</div>
                    <div className="text-sm">If this is a medical emergency, call 108 immediately or go to the nearest hospital.</div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {recommendation.level !== "mild" && (
                  <Link to="/book-appointment">
                    <Button size="lg" className="w-full">
                      <Phone className="h-5 w-5 mr-2" />
                      Book Video Consultation
                    </Button>
                  </Link>
                )}
                
                <Button variant="outline" size="lg" className="w-full">
                  <Camera className="h-5 w-5 mr-2" />
                  Upload Photo (Optional)
                </Button>
                
                <Button variant="outline" size="lg" className="w-full">
                  <FileText className="h-5 w-5 mr-2" />
                  Save to Health Records
                </Button>
                
                <Link to="/dashboard">
                  <Button variant="secondary" size="lg" className="w-full">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>

              {recommendation.level === "mild" && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Home Care Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Rest and adequate sleep</li>
                      <li>• Stay hydrated with water and fluids</li>
                      <li>• Monitor temperature if feverish</li>
                      <li>• Avoid strenuous activities</li>
                      <li>• Seek medical attention if symptoms worsen</li>
                    </ul>
                  </CardContent>
                </Card>
              )}

              <div className="text-center text-sm text-muted-foreground mt-6">
                This assessment is for informational purposes only and should not replace professional medical advice.
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
          <h1 className="text-2xl font-bold text-foreground">Symptom Checker</h1>
          <p className="text-muted-foreground">Answer a few questions to get personalized health guidance</p>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Question {currentStep + 1}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-medium">{currentQuestion.question}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = currentAnswers.includes(option);
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full text-left justify-start h-auto p-4 ${
                      isSelected ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => handleAnswer(currentQuestion.id, option, currentQuestion.type === "multiple")}
                  >
                    <div className="text-wrap">{option}</div>
                  </Button>
                );
              })}
            </div>

            {currentQuestion.type === "multiple" && (
              <div className="text-sm text-muted-foreground">
                You can select multiple options that apply to you.
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={nextStep}
                disabled={!canProceed}
              >
                {currentStep === questions.length - 1 ? "Get Results" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          This tool provides general guidance only. For emergencies, call 108 immediately.
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;