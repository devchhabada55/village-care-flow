import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Bot,
  User,
  Send,
  Mic,
  MicOff,
  Volume2,
  Languages,
  Image as ImageIcon,
  FileText,
  Phone,
  Calendar,
  Loader2,
  Sparkles,
  Heart,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface Message {
  id: number;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
  type?: 'text' | 'image' | 'audio' | 'recommendation';
  metadata?: any;
}

interface AIChatProps {
  isFloating?: boolean;
  onClose?: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isFloating = false, onClose }) => {
  const { t, speak, currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      message: currentLanguage === 'hi' ? 
        'नमस्ते! मैं आपकी स्वास्थ्य सहायक हूं। मैं आपकी स्वास्थ्य संबंधी चिंताओं में मदद कर सकती हूं।' :
        currentLanguage === 'pa' ?
        'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡੀ ਸਿਹਤ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀਆਂ ਸਿਹਤ ਸੰਬੰਧੀ ਚਿੰਤਾਵਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ।' :
        'Hello! I\'m your AI health assistant. I can help you with health concerns, symptoms, and medical questions.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const commonQuestions = [
    { 
      question: "I have fever and headache",
      response: "I understand you're experiencing fever and headache. These symptoms can indicate various conditions. Let me ask a few questions to help better assess your situation.",
      followUp: [
        "How long have you had these symptoms?",
        "What's your current temperature?",
        "Any other symptoms like nausea or body aches?"
      ]
    },
    {
      question: "My blood pressure is high today",
      response: "High blood pressure readings can be concerning. For immediate care, please rest and avoid stress. If it's severely elevated (over 180/120), seek immediate medical attention.",
      recommendation: {
        type: "urgent",
        action: "Monitor closely and consider consultation"
      }
    },
    {
      question: "I need to book an appointment",
      response: "I can help you book an appointment with a doctor. Based on your symptoms, I recommend seeing a general physician. Would you like me to check available slots?",
      action: "book_appointment"
    },
    {
      question: "What medicines are available nearby?",
      response: "I can help you find medicines at nearby pharmacies. Let me check the current stock at pharmacies in Nabha.",
      action: "check_pharmacy"
    }
  ];

  const mockAIResponses = [
    "Based on your symptoms, I recommend monitoring your condition closely. If symptoms persist or worsen, please consult a doctor.",
    "These symptoms could indicate several conditions. Let me ask you a few more questions to provide better guidance.",
    "Your health data suggests you should consider scheduling a check-up. Would you like me to help you book an appointment?",
    "I've analyzed your recent health trends. Here are some recommendations for maintaining good health.",
    "For your current symptoms, I suggest some home remedies. However, if you experience severe symptoms, please seek immediate medical attention."
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    // Check for common questions
    const commonQuestion = commonQuestions.find(q => 
      userMessage.toLowerCase().includes(q.question.toLowerCase().slice(0, 10))
    );

    if (commonQuestion) {
      return {
        id: messages.length + 1,
        sender: 'bot',
        message: commonQuestion.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'recommendation',
        metadata: commonQuestion.recommendation || commonQuestion.followUp || { action: commonQuestion.action }
      };
    }

    // Generate a contextual response
    let response = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
    
    // Add language-specific responses
    if (currentLanguage === 'hi') {
      response = "आपके लक्षणों के आधार पर, मैं सुझाव देता हूं कि आप अपनी स्थिति पर बारीकी से नजर रखें। यदि लक्षण बने रहते हैं या बिगड़ते हैं, तो कृपया डॉक्टर से सलाह लें।";
    } else if (currentLanguage === 'pa') {
      response = "ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ 'ਤੇ, ਮੈਂ ਸਿਫਾਰਸ਼ ਕਰਦਾ ਹਾਂ ਕਿ ਤੁਸੀਂ ਆਪਣੀ ਸਥਿਤੀ ਦੀ ਨੇੜਿਓਂ ਨਿਗਰਾਨੀ ਕਰੋ। ਜੇ ਲੱਛਣ ਬਣੇ ਰਹਿੰਦੇ ਹਨ ਜਾਂ ਵਿਗੜਦੇ ਹਨ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।";
    }

    return {
      id: messages.length + 1,
      sender: 'bot',
      message: response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Speak the response if enabled
      speak(aiResponse.message);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsListening(true);
      
      // Simulate voice input
      setTimeout(() => {
        setIsRecording(false);
        setIsListening(false);
        setInputMessage("I have been having fever for 2 days");
      }, 3000);
    } else {
      setIsRecording(false);
      setIsListening(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    textareaRef.current?.focus();
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'recommendation':
        return <Sparkles className="h-4 w-4 text-primary" />;
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Bot className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card className={`${isFloating ? 'fixed bottom-4 right-4 w-96 h-[600px] z-50' : 'h-[600px]'} shadow-elevated flex flex-col`}>
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span>{t('chatbot.title')}</span>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground font-normal">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              <Languages className="h-3 w-3 mr-1" />
              {currentLanguage.toUpperCase()}
            </Badge>
            {isFloating && onClose && (
              <Button size="sm" variant="ghost" onClick={onClose}>
                ×
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        {/* Quick Questions */}
        <div className="flex-shrink-0">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8"
              onClick={() => handleQuickQuestion("I have fever and headache")}
            >
              <Heart className="h-3 w-3 mr-1" />
              Fever & Headache
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8"
              onClick={() => handleQuickQuestion("Book appointment")}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Book Appointment
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8"
              onClick={() => handleQuickQuestion("Find medicines")}
            >
              <FileText className="h-3 w-3 mr-1" />
              Find Medicines
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <div className="flex-shrink-0 mt-1">
                        {getMessageIcon(message.type || 'text')}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.message}</p>
                      
                      {/* Show metadata for recommendations */}
                      {message.metadata && message.type === 'recommendation' && (
                        <div className="mt-2 space-y-2">
                          {message.metadata.followUp && (
                            <div className="space-y-1">
                              {message.metadata.followUp.map((question: string, index: number) => (
                                <p key={index} className="text-xs text-muted-foreground">• {question}</p>
                              ))}
                            </div>
                          )}
                          {message.metadata.action && (
                            <Button size="sm" variant="outline" className="mt-2">
                              {message.metadata.action === 'book_appointment' && <Calendar className="h-3 w-3 mr-1" />}
                              {message.metadata.action === 'check_pharmacy' && <FileText className="h-3 w-3 mr-1" />}
                              {message.metadata.action === 'book_appointment' ? 'Book Now' : 
                               message.metadata.action === 'check_pharmacy' ? 'Check Stock' : 'Action'}
                            </Button>
                          )}
                        </div>
                      )}
                      
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                    {message.sender === 'bot' && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="p-1 h-auto"
                        onClick={() => speak(message.message)}
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[85%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex-shrink-0 space-y-2">
          {isListening && (
            <div className="flex items-center justify-center p-2 bg-accent/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm text-accent">Listening...</span>
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                placeholder={t('chatbot.placeholder')}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-0 resize-none pr-10"
                rows={2}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1 p-1 h-auto"
                onClick={handleVoiceInput}
              >
                {isRecording ? <MicOff className="h-4 w-4 text-destructive" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;