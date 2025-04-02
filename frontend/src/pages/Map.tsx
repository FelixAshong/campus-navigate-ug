import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { NavBar } from "components/NavBar";
import { Footer } from "components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LocationInfoCard } from "components/LocationInfoCard";

// Import the Leaflet map components
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Import Leaflet CSS
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
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2940&auto=format&fit=crop",
    features: ["Study Spaces", "Computer Lab", "Research Materials", "Group Rooms"],
    openingHours: [
      { days: "Monday - Friday", hours: "8:00 AM - 10:00 PM" },
      { days: "Saturday", hours: "9:00 AM - 5:00 PM" },
      { days: "Sunday", hours: "12:00 PM - 6:00 PM" },
    ],
    contactInfo: "Tel: +233-302-123456 | Email: balmelibrary@ug.edu.gh",
    isLandmark: true,
  },
  {
    id: 2,
    name: "Great Hall",
    category: "Administrative",
    description: "The university's main ceremonial hall used for graduations and major events.",
    lat: 5.6515,
    lng: -0.1866,
    icon: "red",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
    features: ["Auditorium", "Conference Rooms", "Event Space"],
    openingHours: [
      { days: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
      { days: "Weekends", hours: "Closed (except for events)" },
    ],
    contactInfo: "Tel: +233-302-987654 | Email: greathall@ug.edu.gh",
    isLandmark: true,
  },
  {
    id: 3,
    name: "JQB Building",
    category: "Academic",
    description: "Houses various departments including Computer Science and Mathematics.",
    lat: 5.6495,
    lng: -0.1876,
    icon: "blue",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
    features: ["Lecture Rooms", "Computer Labs", "Faculty Offices"],
    openingHours: [
      { days: "Monday - Friday", hours: "7:00 AM - 9:00 PM" },
      { days: "Saturday", hours: "8:00 AM - 2:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    contactInfo: "Tel: +233-302-456789 | Email: jqb@ug.edu.gh",
  },
  {
    id: 4,
    name: "Commonwealth Hall",
    category: "Residence",
    description: "A historic male hall of residence known as 'Vandal City'.",
    lat: 5.6525,
    lng: -0.1846,
    icon: "green",
    imageUrl: "https://images.unsplash.com/photo-1551239262-61cf00e9d4cb?q=80&w=2874&auto=format&fit=crop",
    features: ["Dormitories", "Common Room", "Dining Hall", "Study Areas"],
    openingHours: [
      { days: "All Days", hours: "24 Hours (for residents)" },
      { days: "Visiting Hours", hours: "10:00 AM - 8:00 PM" },
    ],
    contactInfo: "Tel: +233-302-345678 | Email: commonwealth@ug.edu.gh",
  },
  {
    id: 5,
    name: "Akuafo Hall",
    category: "Residence",
    description: "One of the original halls of residence on campus.",
    lat: 5.6535,
    lng: -0.1836,
    icon: "green",
    imageUrl: "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?q=80&w=2874&auto=format&fit=crop",
    features: ["Dormitories", "Social Areas", "Dining Services"],
    openingHours: [
      { days: "All Days", hours: "24 Hours (for residents)" },
      { days: "Visiting Hours", hours: "11:00 AM - 8:00 PM" },
    ],
    contactInfo: "Tel: +233-302-567890 | Email: akuafo@ug.edu.gh",
  },
  {
    id: 6,
    name: "Business School",
    category: "Academic",
    description: "The university's business education center with modern facilities.",
    lat: 5.6545,
    lng: -0.1826,
    icon: "blue",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
    features: ["Lecture Halls", "Case Study Rooms", "Computer Labs", "Library"],
    openingHours: [
      { days: "Monday - Friday", hours: "8:00 AM - 8:00 PM" },
      { days: "Saturday", hours: "9:00 AM - 4:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    contactInfo: "Tel: +233-302-678901 | Email: business@ug.edu.gh",
  },
  {
    id: 7,
    name: "Main Gate",
    category: "Landmark",
    description: "The primary entrance to the university campus.",
    lat: 5.6555,
    lng: -0.1816,
    icon: "gold",
    imageUrl: "https://images.unsplash.com/photo-1587162146766-e06b1189b907?q=80&w=2071&auto=format&fit=crop",
    features: ["Security Post", "Information Center", "Shuttle Stop"],
    openingHours: [
      { days: "All Days", hours: "24 Hours" },
    ],
    contactInfo: "Security Tel: +233-302-789012",
    isLandmark: true,
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

export default function Map() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<typeof campusLocations[0] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([5.6515, -0.1846]); // University of Ghana coordinates
  const [mapZoom, setMapZoom] = useState(15);
  const [filteredLocations, setFilteredLocations] = useState(campusLocations);
  const mapRef = useRef<L.Map | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Handle search with advanced functionality
  useEffect(() => {
    if (searchQuery) {
      // Save to recent searches if query is meaningful
      if (searchQuery.trim().length > 1) {
        addToSearchHistory(searchQuery);
      }
      
      const query = searchQuery.toLowerCase();
      
      // Calculate a relevance score for each location
      const scoredLocations = campusLocations.map(location => {
        let score = 0;
        
        // Exact name match (highest priority)
        if (location.name.toLowerCase() === query) {
          score += 100;
        }
        // Name contains query
        else if (location.name.toLowerCase().includes(query)) {
          score += 50;
        }
        // Category match
        if (location.category.toLowerCase().includes(query)) {
          score += 30;
        }
        // Description match
        if (location.description.toLowerCase().includes(query)) {
          score += 20;
        }
        
        return { ...location, score };
      });
      
      // Filter out non-matching locations and sort by score
      const filtered = scoredLocations
        .filter(location => location.score > 0)
        .sort((a, b) => b.score - a.score);
      
      setFilteredLocations(filtered);
      
      // If we have matches and user hasn't selected a location yet, auto-select the top match
      if (filtered.length > 0 && !selectedLocation) {
        setSelectedLocation(filtered[0]);
        setMapCenter([filtered[0].lat, filtered[0].lng]);
        setMapZoom(17);
      }
    } else {
      setFilteredLocations(campusLocations);
    }
  }, [searchQuery]);
  
  // Add search to history
  const addToSearchHistory = (query: string) => {
    if (query.trim() === "" || query.length < 2) return;
    
    // Avoid duplicates and keep most recent searches at the top
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 5); // Keep only most recent 5 searches
    });
    
    // In a real app, this would be persisted to user profile
    console.log(`Added "${query}" to search history`);
  };
  
  // Apply search from history or suggestions
  const applySearch = (query: string) => {
    setSearchQuery(query);
    setShowRecentSearches(false);
    addToSearchHistory(query);
  };


  // Function to handle location selection
  const handleLocationSelect = (location: typeof campusLocations[0]) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    setMapZoom(18);
  };

  // Function to clear selection
  const clearSelection = () => {
    setSelectedLocation(null);
    setMapZoom(15);
    setMapCenter([5.6515, -0.1846]);
    setIsInfoModalOpen(false);
  };

  // Function to view detailed info
  const viewDetailedInfo = () => {
    if (selectedLocation) {
      setIsInfoModalOpen(true);
    }
  };

  // Filter by category
  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    
    if (category === "All") {
      setFilteredLocations(campusLocations);
    } else {
      const filtered = campusLocations.filter(
        (location) => location.category === category
      );
      setFilteredLocations(filtered);
    }
  };

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
            University of Ghana Campus Map
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/3 space-y-6"
            >
              {/* Search bar with recent searches and filters */}
              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Find Locations</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Input
                          type="text"
                          placeholder="Search for buildings, halls..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setShowRecentSearches(true)}
                          className="flex-grow w-full pr-10"
                        />
                        {searchQuery && (
                          <Button 
                            variant="ghost" 
                            onClick={() => setSearchQuery("")}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          >
                            ✕
                          </Button>
                        )}
                      </div>
                      <Button onClick={() => {
                        if (searchQuery.trim()) {
                          addToSearchHistory(searchQuery);
                        }
                      }}>
                        Search
                      </Button>
                    </div>
                    
                    {/* Recent searches dropdown */}
                    {showRecentSearches && recentSearches.length > 0 && (
                      <div 
                        className="absolute z-10 w-full bg-background border border-border rounded-md shadow-md mt-1"
                        onMouseDown={(e) => e.preventDefault()} // Prevent blur triggering before click
                      >
                        <div className="p-2 border-b border-border flex justify-between items-center">
                          <span className="text-sm font-medium">Recent Searches</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2"
                            onClick={() => setShowRecentSearches(false)}
                          >
                            Close
                          </Button>
                        </div>
                        <ul>
                          {recentSearches.map((search, index) => (
                            <li key={index}>
                              <Button 
                                variant="ghost" 
                                className="w-full justify-start text-left" 
                                onClick={() => applySearch(search)}
                              >
                                <span className="mr-2">🔍</span> {search}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Category filters as buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === "All" ? "default" : "outline"}
                      size="sm"
                      onClick={() => filterByCategory("All")}
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedCategory === "Academic" ? "default" : "outline"}
                      size="sm"
                      onClick={() => filterByCategory("Academic")}
                    >
                      Academic
                    </Button>
                    <Button
                      variant={selectedCategory === "Residence" ? "default" : "outline"}
                      size="sm"
                      onClick={() => filterByCategory("Residence")}
                    >
                      Residence
                    </Button>
                    <Button
                      variant={selectedCategory === "Administrative" ? "default" : "outline"}
                      size="sm"
                      onClick={() => filterByCategory("Administrative")}
                    >
                      Administrative
                    </Button>
                    <Button
                      variant={selectedCategory === "Landmark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => filterByCategory("Landmark")}
                    >
                      Landmarks
                    </Button>
                  </div>
                  
                  {/* Search results count */}
                  <div className="text-sm text-muted-foreground">
                    {filteredLocations.length} location{filteredLocations.length !== 1 ? "s" : ""} found
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedCategory !== "All" && ` in ${selectedCategory}`}
                  </div>
                </div>
              </Card>



              {/* Location list */}
              <Card className="p-4 overflow-auto max-h-[400px]">
                <h2 className="text-xl font-semibold mb-4">Locations</h2>
                {filteredLocations.length === 0 ? (
                  <p className="text-muted-foreground">No locations found</p>
                ) : (
                  <ul className="space-y-2">
                    {filteredLocations.map((location) => (
                      <motion.li
                        key={location.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-left ${selectedLocation?.id === location.id ? 'bg-primary/10' : ''}`}
                          onClick={() => handleLocationSelect(location)}
                        >
                          <div>
                            <div className="font-medium">{location.name}</div>
                            <div className="text-sm text-muted-foreground">{location.category}</div>
                          </div>
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </Card>

              {/* Selected location details */}
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold">{selectedLocation.name}</h2>
                      <Button variant="ghost" size="sm" onClick={clearSelection}>
                        ✕
                      </Button>
                    </div>
                    <Badge className="mb-2">{selectedLocation.category}</Badge>
                    <p className="text-muted-foreground mb-4">{selectedLocation.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => setMapCenter([selectedLocation.lat, selectedLocation.lng])}
                      >
                        Show on Map
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => viewDetailedInfo()}
                      >
                        More Details
                      </Button>
                    </div>
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
                
                {filteredLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.lat, location.lng]}
                    icon={createCustomIcon(location.isLandmark ? "red" : location.icon)}
                    eventHandlers={{
                      click: () => handleLocationSelect(location),
                    }}
                  >
                    <Popup>
                      <div className="p-1">
                        <h3 className="font-bold text-base">{location.name}</h3>
                        <Badge className="mt-1 mb-2">{location.category}</Badge>
                        <p className="text-sm mb-2">{location.description}</p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="text-xs px-2 py-1 h-auto"
                            onClick={() => {
                              handleLocationSelect(location);
                              viewDetailedInfo();
                            }}
                          >
                            View Details
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm" 
                            className="text-xs px-2 py-1 h-auto"
                            onClick={() => handleLocationSelect(location)}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Detailed Location Info Modal */}
      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold">{selectedLocation?.name}</DialogTitle>
            <DialogClose className="absolute right-4 top-4" />
          </DialogHeader>
          <ScrollArea className="h-full p-6 pt-2">
            {selectedLocation && (
              <LocationInfoCard
                name={selectedLocation.name}
                category={selectedLocation.category}
                description={selectedLocation.description}
                imageUrl={selectedLocation.imageUrl}
                features={selectedLocation.features}
                openingHours={selectedLocation.openingHours}
                contactInfo={selectedLocation.contactInfo}
                isLandmark={selectedLocation.isLandmark}
              />
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
