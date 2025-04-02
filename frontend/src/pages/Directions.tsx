import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NavBar } from "components/NavBar";
import { Footer } from "components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProfileStore } from "utils/profileStore";
import { toast, Toaster } from "sonner";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom marker icon
const createCustomIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Campus locations data
const campusLocations = [
  {
    id: 1,
    name: "Balme Library",
    category: "Academic",
    description: "The main university library with extensive collections and study spaces.",
    lat: 5.6505,
    lng: -0.1856,
    icon: "blue",
  },
  {
    id: 2,
    name: "Great Hall",
    category: "Administrative",
    description: "The university's main ceremonial hall used for graduations and major events.",
    lat: 5.6515,
    lng: -0.1866,
    icon: "red",
  },
  {
    id: 3,
    name: "JQB Building",
    category: "Academic",
    description: "Houses various departments including Computer Science and Mathematics.",
    lat: 5.6495,
    lng: -0.1876,
    icon: "blue",
  },
  {
    id: 4,
    name: "Commonwealth Hall",
    category: "Residence",
    description: "A historic male hall of residence known as 'Vandal City'.",
    lat: 5.6525,
    lng: -0.1846,
    icon: "green",
  },
  {
    id: 5,
    name: "Akuafo Hall",
    category: "Residence",
    description: "One of the original halls of residence on campus.",
    lat: 5.6535,
    lng: -0.1836,
    icon: "green",
  },
  {
    id: 6,
    name: "Business School",
    category: "Academic",
    description: "The university's business education center with modern facilities.",
    lat: 5.6545,
    lng: -0.1826,
    icon: "blue",
  },
  {
    id: 7,
    name: "Main Gate",
    category: "Landmark",
    description: "The primary entrance to the university campus.",
    lat: 5.6555,
    lng: -0.1816,
    icon: "gold",
  },
];

// Map view center controller component
const MapViewController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Direction steps generation (mock data for demonstration)
const generateDirectionSteps = (startId: number, endId: number) => {
  const start = campusLocations.find(loc => loc.id === startId);
  const end = campusLocations.find(loc => loc.id === endId);
  
  if (!start || !end) return [];
  
  // In a real app, this would be replaced with actual path-finding algorithm
  // or API call to get directions
  return [
    {
      instruction: `Start at ${start.name}`,
      distance: "0 m",
      time: "0 min",
    },
    {
      instruction: `Head ${start.lat < end.lat ? "north" : "south"}${start.lng < end.lng ? "east" : "west"} along the main path`,
      distance: "150 m",
      time: "2 min",
    },
    {
      instruction: `Continue straight past the ${Math.random() > 0.5 ? "fountain" : "garden"}`,
      distance: "100 m",
      time: "1 min",
    },
    {
      instruction: `Turn ${Math.random() > 0.5 ? "left" : "right"} at the intersection`,
      distance: "50 m",
      time: "1 min",
    },
    {
      instruction: `Continue to ${end.name}`,
      distance: "150 m",
      time: "2 min",
    },
    {
      instruction: `Arrive at your destination: ${end.name}`,
      distance: "0 m",
      time: "0 min",
    },
  ];
};

// Generate routing points (simplified for demonstration)
const generateRoute = (startId: number, endId: number) => {
  const start = campusLocations.find(loc => loc.id === startId);
  const end = campusLocations.find(loc => loc.id === endId);
  
  if (!start || !end) return [];
  
  // Generate a route with some intermediate points
  const latDiff = end.lat - start.lat;
  const lngDiff = end.lng - start.lng;
  
  // In a real app, this would be replaced with actual path-finding algorithm
  // or API call to get directions
  return [
    [start.lat, start.lng],
    [start.lat + latDiff * 0.25, start.lng + lngDiff * 0.2],
    [start.lat + latDiff * 0.5, start.lng + lngDiff * 0.5],
    [start.lat + latDiff * 0.75, start.lng + lngDiff * 0.8],
    [end.lat, end.lng],
  ];
};

export default function Directions() {
  const [startLocation, setStartLocation] = useState<number | null>(null);
  const [endLocation, setEndLocation] = useState<number | null>(null);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [directionSteps, setDirectionSteps] = useState<any[]>([]);
  const [transportMode, setTransportMode] = useState<string>("walking");
  const [mapCenter, setMapCenter] = useState<[number, number]>([5.6515, -0.1846]); // University of Ghana coordinates
  const [mapZoom, setMapZoom] = useState(15);
  const mapRef = useRef<L.Map | null>(null);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { savedLocations, addRecentSearch } = useProfileStore();
  
  // Check URL params for pre-filled directions
  useEffect(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    
    if (fromParam) {
      const fromId = parseInt(fromParam);
      if (!isNaN(fromId)) {
        setStartLocation(fromId);
      }
    }
    
    if (toParam) {
      const toId = parseInt(toParam);
      if (!isNaN(toId)) {
        setEndLocation(toId);
        
        // If we have a destination, add it to recent searches
        const location = campusLocations.find(loc => loc.id === toId);
        if (location) {
          addRecentSearch(location.name);
        }
      }
    }
    
    // Auto-calculate directions if both params are present
    if (fromParam && toParam) {
      const fromId = parseInt(fromParam);
      const toId = parseInt(toParam);
      if (!isNaN(fromId) && !isNaN(toId)) {
        // Give the component time to set the state values
        setTimeout(() => calculateDirections(), 100);
      }
    }
  }, [searchParams]);

  // Handle direction calculation
  const calculateDirections = () => {
    if (startLocation && endLocation) {
      const route = generateRoute(startLocation, endLocation);
      const steps = generateDirectionSteps(startLocation, endLocation);
      
      setRoutePoints(route as [number, number][]);
      setDirectionSteps(steps);
      
      // Adjust map to show the route
      const start = campusLocations.find(loc => loc.id === startLocation);
      const end = campusLocations.find(loc => loc.id === endLocation);
      
      if (start && end) {
        // Calculate center of the route
        const centerLat = (start.lat + end.lat) / 2;
        const centerLng = (start.lng + end.lng) / 2;
        setMapCenter([centerLat, centerLng]);
        
        // Calculate appropriate zoom level based on distance
        const latDiff = Math.abs(start.lat - end.lat);
        const lngDiff = Math.abs(start.lng - end.lng);
        const maxDiff = Math.max(latDiff, lngDiff) * 111; // Rough conversion to km
        
        // Adjust zoom based on distance
        if (maxDiff < 0.2) setMapZoom(16);
        else if (maxDiff < 0.5) setMapZoom(15);
        else setMapZoom(14);
      }
    }
  };

  // Reset directions
  const resetDirections = () => {
    setStartLocation(null);
    setEndLocation(null);
    setRoutePoints([]);
    setDirectionSteps([]);
    setMapCenter([5.6515, -0.1846]);
    setMapZoom(15);
  };

  // Calculate total distance and time
  const calculateTotals = () => {
    if (directionSteps.length === 0) return { distance: "0 m", time: "0 min" };
    
    let totalDistance = 0;
    let totalTime = 0;
    
    directionSteps.forEach(step => {
      const distance = parseInt(step.distance.split(" ")[0]) || 0;
      const time = parseInt(step.time.split(" ")[0]) || 0;
      
      totalDistance += distance;
      totalTime += time;
    });
    
    return {
      distance: `${totalDistance} m`,
      time: `${totalTime} min`,
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Campus Directions
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Directions Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/3 space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Route Planner</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-location">Starting Point</Label>
                      <Select
                        value={startLocation?.toString() || ""}
                        onValueChange={(value) => setStartLocation(parseInt(value))}
                      >
                        <SelectTrigger id="start-location">
                          <SelectValue placeholder="Select starting point" />
                        </SelectTrigger>
                        <SelectContent>
                          {campusLocations.map((location) => (
                            <SelectItem 
                              key={location.id} 
                              value={location.id.toString()}
                              disabled={location.id === endLocation}
                            >
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="end-location">Destination</Label>
                      <Select
                        value={endLocation?.toString() || ""}
                        onValueChange={(value) => setEndLocation(parseInt(value))}
                      >
                        <SelectTrigger id="end-location">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {campusLocations.map((location) => (
                            <SelectItem 
                              key={location.id} 
                              value={location.id.toString()}
                              disabled={location.id === startLocation}
                            >
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transport-mode">Mode of Transport</Label>
                      <Select
                        value={transportMode}
                        onValueChange={(value) => setTransportMode(value)}
                      >
                        <SelectTrigger id="transport-mode">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="walking">Walking</SelectItem>
                          <SelectItem value="bicycle">Bicycle</SelectItem>
                          <SelectItem value="shuttle">Campus Shuttle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 pt-4 flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={calculateDirections}
                        disabled={!startLocation || !endLocation}
                      >
                        Get Directions
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={resetDirections}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {directionSteps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Directions</h2>
                        <div className="text-sm text-muted-foreground">
                          {transportMode === "walking" && "🚶"}
                          {transportMode === "bicycle" && "🚲"}
                          {transportMode === "shuttle" && "🚌"}
                          <span className="ml-1">{totals.distance} • {totals.time}</span>
                        </div>
                      </div>
                      
                      <Tabs defaultValue="steps" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="steps">Steps</TabsTrigger>
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="steps" className="space-y-4 mt-4">
                          <ol className="space-y-4">
                            {directionSteps.map((step, index) => (
                              <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-4 items-start pb-4 border-b border-border last:border-0 last:pb-0"
                              >
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                                  {index + 1}
                                </div>
                                <div className="flex-grow">
                                  <p className="font-medium">{step.instruction}</p>
                                  <div className="text-sm text-muted-foreground">
                                    {step.distance} • {step.time}
                                  </div>
                                </div>
                              </motion.li>
                            ))}
                          </ol>
                        </TabsContent>
                        
                        <TabsContent value="overview" className="space-y-4 mt-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-border">
                              <span>Starting Point</span>
                              <span className="font-medium">
                                {campusLocations.find(loc => loc.id === startLocation)?.name}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b border-border">
                              <span>Destination</span>
                              <span className="font-medium">
                                {campusLocations.find(loc => loc.id === endLocation)?.name}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b border-border">
                              <span>Distance</span>
                              <span className="font-medium">{totals.distance}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b border-border">
                              <span>Estimated Time</span>
                              <span className="font-medium">{totals.time}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span>Transport Mode</span>
                              <span className="font-medium capitalize">{transportMode}</span>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full mt-4 text-primary"
                        onClick={() => {
                          if (startLocation && endLocation) {
                            const startLoc = campusLocations.find(loc => loc.id === startLocation);
                            const endLoc = campusLocations.find(loc => loc.id === endLocation);
                            
                            if (startLoc && endLoc) {
                              const routeInfo = `${startLoc.name} to ${endLoc.name}`;
                              toast.success(`Route saved: ${routeInfo}`);
                              addRecentSearch(routeInfo);
                            }
                          }
                        }}
                      >
                        Save This Route
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full lg:w-2/3 h-[600px] shadow-lg rounded-lg overflow-hidden border border-border"
            >
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
                whenCreated={(map) => { mapRef.current = map; }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapViewController center={mapCenter} zoom={mapZoom} />
                
                {campusLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.lat, location.lng]}
                    icon={createCustomIcon(
                      location.id === startLocation 
                        ? "green" 
                        : location.id === endLocation 
                          ? "red" 
                          : location.icon
                    )}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{location.name}</h3>
                        <p className="text-sm">{location.description}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                {routePoints.length > 0 && (
                  <Polyline 
                    positions={routePoints} 
                    color="#3b82f6" 
                    weight={5} 
                    opacity={0.7}
                    dashArray={transportMode === "shuttle" ? "10, 10" : undefined}
                  />
                )}
              </MapContainer>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
