import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  MapPin,
  Search,
  Package,
  ShoppingCart,
  Truck,
  Clock,
  Phone,
  MessageSquare,
  Star,
  Navigation as NavigateIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Pill,
  FileText,
  Calendar
} from "lucide-react";

const Pharmacies = () => {
  const { t, speak } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);

  const mockPharmacies = [
    {
      id: 1,
      name: "Nabha Medical Store",
      address: "Main Market, Nabha",
      distance: "0.5 km",
      rating: 4.8,
      isOpen: true,
      phone: "+91 98765 43210",
      deliveryAvailable: true,
      deliveryTime: "30-45 mins",
      deliveryFee: "₹20",
      specialties: ["General Medicines", "Baby Care", "Diabetes Care"]
    },
    {
      id: 2,
      name: "Singh Pharma",
      address: "Bus Stand Road, Nabha",
      distance: "1.2 km",
      rating: 4.6,
      isOpen: true,
      phone: "+91 98765 43211",
      deliveryAvailable: true,
      deliveryTime: "45-60 mins",
      deliveryFee: "₹25",
      specialties: ["Ayurvedic Medicines", "General Medicines"]
    },
    {
      id: 3,
      name: "Apollo Pharmacy",
      address: "Civil Hospital Road, Nabha",
      distance: "2.1 km",
      rating: 4.9,
      isOpen: false,
      phone: "+91 98765 43212",
      deliveryAvailable: true,
      deliveryTime: "60-90 mins",
      deliveryFee: "₹30",
      specialties: ["General Medicines", "Surgical Items", "Lab Tests"]
    }
  ];

  const mockMedicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      brand: "Crocin",
      price: "₹25",
      availability: {
        1: { inStock: true, quantity: 50, lowStock: false },
        2: { inStock: true, quantity: 8, lowStock: true },
        3: { inStock: false, quantity: 0, lowStock: false }
      },
      category: "Fever & Pain"
    },
    {
      id: 2,
      name: "Metformin 500mg",
      brand: "Glycomet",
      price: "₹45",
      availability: {
        1: { inStock: true, quantity: 30, lowStock: false },
        2: { inStock: true, quantity: 15, lowStock: false },
        3: { inStock: true, quantity: 20, lowStock: false }
      },
      category: "Diabetes"
    },
    {
      id: 3,
      name: "Amoxicillin 250mg",
      brand: "Moxikind",
      price: "₹85",
      availability: {
        1: { inStock: true, quantity: 25, lowStock: false },
        2: { inStock: false, quantity: 0, lowStock: false },
        3: { inStock: true, quantity: 5, lowStock: true }
      },
      category: "Antibiotics"
    },
    {
      id: 4,
      name: "Cetirizine 10mg",
      brand: "Zyrtec",
      price: "₹35",
      availability: {
        1: { inStock: true, quantity: 40, lowStock: false },
        2: { inStock: true, quantity: 12, lowStock: false },
        3: { inStock: true, quantity: 18, lowStock: false }
      },
      category: "Allergy"
    }
  ];

  const mockReservations = [
    {
      id: 1,
      pharmacyName: "Nabha Medical Store",
      medicines: ["Paracetamol 500mg", "Cetirizine 10mg"],
      totalAmount: "₹60",
      reservedAt: "2024-01-15 10:30 AM",
      pickupBy: "2024-01-16 6:00 PM",
      status: "reserved"
    },
    {
      id: 2,
      pharmacyName: "Singh Pharma",
      medicines: ["Metformin 500mg"],
      totalAmount: "₹45",
      reservedAt: "2024-01-14 2:15 PM",
      pickupBy: "2024-01-15 2:15 PM",
      status: "ready"
    }
  ];

  const getAvailabilityBadge = (medicine: any, pharmacyId: number) => {
    const availability = medicine.availability[pharmacyId];
    if (!availability.inStock) {
      return <Badge variant="destructive" className="text-xs">Out of Stock</Badge>;
    }
    if (availability.lowStock) {
      return <Badge variant="secondary" className="bg-warning/10 text-warning text-xs">Low Stock</Badge>;
    }
    return <Badge variant="default" className="bg-accent text-accent-foreground text-xs">In Stock</Badge>;
  };

  const getAvailabilityIcon = (medicine: any, pharmacyId: number) => {
    const availability = medicine.availability[pharmacyId];
    if (!availability.inStock) {
      return <XCircle className="h-4 w-4 text-destructive" />;
    }
    if (availability.lowStock) {
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    }
    return <CheckCircle className="h-4 w-4 text-accent" />;
  };

  const filteredMedicines = mockMedicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('pharmacy.title')}</h1>
            <p className="text-muted-foreground">Find medicines and manage orders from local pharmacies</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="pharmacies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pharmacies" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Nearby Pharmacies</span>
            </TabsTrigger>
            <TabsTrigger value="medicines" className="flex items-center space-x-2">
              <Pill className="h-4 w-4" />
              <span>Medicine Search</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>My Orders</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pharmacies" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockPharmacies.map((pharmacy) => (
                <Card key={pharmacy.id} className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{pharmacy.address}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{pharmacy.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{pharmacy.distance}</span>
                        </div>
                      </div>
                      <Badge variant={pharmacy.isOpen ? 'default' : 'secondary'} 
                             className={pharmacy.isOpen ? 'bg-accent text-accent-foreground' : ''}>
                        {pharmacy.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {pharmacy.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {pharmacy.deliveryAvailable && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Truck className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Home Delivery</span>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>Delivery time:</span>
                            <span>{pharmacy.deliveryTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery fee:</span>
                            <span>{pharmacy.deliveryFee}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedPharmacy(pharmacy.id)}
                      >
                        <Package className="h-4 w-4 mr-1" />
                        View Stock
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <NavigateIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medicines" className="space-y-4">
            <div className="grid gap-4">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Pill className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{medicine.name}</h3>
                          <p className="text-muted-foreground">{medicine.brand}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="outline">{medicine.category}</Badge>
                            <span className="font-semibold text-primary">{medicine.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Availability at nearby pharmacies:</h4>
                      {mockPharmacies.map((pharmacy) => (
                        <div key={pharmacy.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getAvailabilityIcon(medicine, pharmacy.id)}
                            <div>
                              <p className="font-medium">{pharmacy.name}</p>
                              <p className="text-sm text-muted-foreground">{pharmacy.distance}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {getAvailabilityBadge(medicine, pharmacy.id)}
                            {medicine.availability[pharmacy.id].inStock && (
                              <Button size="sm" variant="outline">
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                Reserve
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="grid gap-4">
              {mockReservations.map((reservation) => (
                <Card key={reservation.id} className="shadow-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{reservation.pharmacyName}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Reserved on {reservation.reservedAt}</span>
                        </div>
                      </div>
                      <Badge variant={reservation.status === 'ready' ? 'default' : 'secondary'}
                             className={reservation.status === 'ready' ? 'bg-accent text-accent-foreground' : ''}>
                        {reservation.status === 'ready' ? 'Ready for Pickup' : 'Reserved'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Medicines:</h4>
                      <div className="flex flex-wrap gap-2">
                        {reservation.medicines.map((medicine, index) => (
                          <Badge key={index} variant="outline">{medicine}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-semibold text-lg">{reservation.totalAmount}</span>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="h-4 w-4 text-warning" />
                        <span className="text-sm font-medium">Pickup Details</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Please pickup by {reservation.pickupBy}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <NavigateIcon className="h-4 w-4 mr-1" />
                        Get Directions
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Call Pharmacy
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        SMS Updates
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Pharmacies;