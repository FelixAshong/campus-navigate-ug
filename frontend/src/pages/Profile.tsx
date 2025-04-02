import React from "react";
import { motion } from "framer-motion";
import { NavBar } from "components/NavBar";
import { Footer } from "components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "utils/profileStore";
import { toast, Toaster } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const { 
    savedLocations, 
    removeSavedLocation, 
    recentSearches, 
    removeRecentSearch, 
    clearRecentSearches, 
    userSettings, 
    updateUserSettings,
    userProfile,
  } = useProfileStore();

  // Function to handle settings changes
  const handleSettingChange = (setting: keyof typeof userSettings) => {
    updateUserSettings({
      [setting]: !userSettings[setting]
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your preferences and saved locations</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
                      <AvatarFallback>FA</AvatarFallback>
                    </Avatar>
                    <CardTitle>{userProfile.name}</CardTitle>
                    <CardDescription>{userProfile.email}</CardDescription>
                    <div className="flex mt-3 gap-2">
                      <Badge variant="outline">{userProfile.department}</Badge>
                      <Badge variant="outline">{userProfile.year}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">About Me</h3>
                      <p className="text-sm text-muted-foreground">{userProfile.bio}</p>
                    </div>
                    <Separator />
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/map')}
                      >
                        View Campus Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content Area */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs defaultValue="saved">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="saved">Saved Locations</TabsTrigger>
                  <TabsTrigger value="recent">Recent Searches</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="saved" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">My Saved Locations</h2>
                    <Button variant="outline" size="sm" onClick={() => navigate('/map')}>
                      Add Location
                    </Button>
                  </div>

                  {savedLocations.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-10">
                        <div className="text-5xl mb-4">📍</div>
                        <h3 className="text-lg font-medium mb-2">No saved locations yet</h3>
                        <p className="text-muted-foreground mb-4 text-center">
                          Save your favorite campus locations for quick access
                        </p>
                        <Button onClick={() => navigate('/map')}>Explore Map</Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {savedLocations.map((location) => (
                        <motion.div
                          key={location.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          layout
                        >
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg">{location.name}</h3>
                                  <Badge className="mt-1" variant="outline">{location.category}</Badge>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => navigate(`/map?location=${location.id}`)}>
                                    View
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => navigate(`/directions?to=${location.id}`)}
                                  >
                                    Directions
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => {
                                      removeSavedLocation(location.id);
                                      toast.success("Location removed");
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                              <p className="mt-3 text-muted-foreground text-sm">{location.notes}</p>
                              <div className="mt-4 text-xs text-muted-foreground">
                                Last visited: {location.lastVisited}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recent">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Recent Searches</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        clearRecentSearches();
                        toast.success("Search history cleared");
                      }}
                      disabled={recentSearches.length === 0}
                    >
                      Clear All
                    </Button>
                  </div>

                  {recentSearches.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-10">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium mb-2">No recent searches</h3>
                        <p className="text-muted-foreground mb-4 text-center">
                          Your search history will appear here
                        </p>
                        <Button onClick={() => navigate('/map')}>Search Map</Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <ul className="space-y-2">
                          {recentSearches.map((search, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className="flex items-center justify-between py-2 border-b border-border last:border-none"
                            >
                              <Button 
                                variant="ghost" 
                                className="text-left justify-start px-2 font-normal"
                                onClick={() => navigate(`/map?search=${search}`)}
                              >
                                <span className="mr-2">🔍</span> {search}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                  removeRecentSearch(search);
                                  toast.success("Search removed");
                                }}
                                className="h-8 w-8 p-0"
                              >
                                ×
                              </Button>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                      <CardDescription>
                        Customize your map experience and notification settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="notifications">Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive alerts about campus events and locations
                            </p>
                          </div>
                          <Switch
                            id="notifications"
                            checked={userSettings.notifications}
                            onCheckedChange={() => handleSettingChange('notifications')}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="locationServices">Location Services</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow the app to track your location for better navigation
                            </p>
                          </div>
                          <Switch
                            id="locationServices"
                            checked={userSettings.locationServices}
                            onCheckedChange={() => handleSettingChange('locationServices')}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="saveSearchHistory">Save Search History</Label>
                            <p className="text-sm text-muted-foreground">
                              Keep track of your recent searches
                            </p>
                          </div>
                          <Switch
                            id="saveSearchHistory"
                            checked={userSettings.saveSearchHistory}
                            onCheckedChange={() => handleSettingChange('saveSearchHistory')}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="darkMode">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Switch to dark theme for low-light conditions
                            </p>
                          </div>
                          <Switch
                            id="darkMode"
                            checked={userSettings.darkMode}
                            onCheckedChange={() => handleSettingChange('darkMode')}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="metricSystem">Use Metric System</Label>
                            <p className="text-sm text-muted-foreground">
                              Display distances in meters/kilometers instead of feet/miles
                            </p>
                          </div>
                          <Switch
                            id="metricSystem"
                            checked={userSettings.showDistanceInMetric}
                            onCheckedChange={() => handleSettingChange('showDistanceInMetric')}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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