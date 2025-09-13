import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-foreground">
              TelemediNabha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="h-9">
                <Globe className="h-4 w-4 mr-2" />
                English
              </Button>
              <Link to="/login">
                <Button variant="outline" size="sm" className="h-9">
                  Login
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="default" size="sm" className="h-9">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  English
                </Button>
                <Link to="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/dashboard" className="block">
                  <Button variant="default" size="sm" className="w-full">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;