import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-4">
          <Heart className="h-16 w-16 text-primary mx-auto opacity-50" />
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <p className="text-xl text-muted-foreground">Page Not Found</p>
          <p className="text-muted-foreground">
            The healthcare page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link to="/">
            <Button size="lg" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Need help? Contact support or call emergency: 108
        </div>
      </div>
    </div>
  );
};

export default NotFound;
