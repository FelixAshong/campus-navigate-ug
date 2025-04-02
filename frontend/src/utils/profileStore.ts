import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the types for our profile data
export interface SavedLocation {
  id: number;
  name: string;
  category: string;
  notes: string;
  lastVisited: string;
}

export interface UserSettings {
  notifications: boolean;
  locationServices: boolean;
  saveSearchHistory: boolean;
  darkMode: boolean;
  showDistanceInMetric: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  department: string;
  year: string;
  bio: string;
}

// Define the store state
interface ProfileState {
  userProfile: UserProfile;
  savedLocations: SavedLocation[];
  recentSearches: string[];
  userSettings: UserSettings;
  
  // Actions
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addSavedLocation: (location: SavedLocation) => void;
  removeSavedLocation: (id: number) => void;
  addRecentSearch: (search: string) => void;
  removeRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
}

// Initial mock data
const initialSavedLocations: SavedLocation[] = [
  {
    id: 1,
    name: "Balme Library",
    category: "Academic",
    notes: "My favorite study spot with quiet areas on the 3rd floor.",
    lastVisited: "2025-03-28"
  },
  {
    id: 2,
    name: "Business School",
    category: "Academic",
    notes: "Marketing class in Room 203 every Tuesday and Thursday.",
    lastVisited: "2025-04-01"
  },
  {
    id: 3,
    name: "Night Market",
    category: "Food",
    notes: "Great place for waakye and other local dishes at affordable prices.",
    lastVisited: "2025-03-30"
  },
  {
    id: 4,
    name: "University Sports Stadium",
    category: "Sports",
    notes: "Soccer practice every Wednesday at 4pm.",
    lastVisited: "2025-03-25"
  }
];

// Create the store with persistence
export const useProfileStore = create<ProfileState>(
  persist(
    (set) => ({
      // Initial state
      userProfile: {
        name: "Felix Ashong",
        email: "felix.ashong@st.ug.edu.gh",
        department: "Computer Science",
        year: "Second Year",
        bio: "Computer Science student passionate about technology and exploring new places on campus."
      },
      savedLocations: initialSavedLocations,
      recentSearches: ["Great Hall", "JQB Building", "Science Faculty", "Commonwealth Hall", "Banking Square", "Main Gate"],
      userSettings: {
        notifications: true,
        locationServices: true,
        saveSearchHistory: true,
        darkMode: false,
        showDistanceInMetric: true
      },
      
      // Actions
      updateUserProfile: (profile) => set((state) => ({
        userProfile: { ...state.userProfile, ...profile }
      })),
      
      addSavedLocation: (location) => set((state) => {
        // Check if location already exists
        const exists = state.savedLocations.some(loc => loc.id === location.id);
        
        if (exists) {
          // Update the lastVisited date of the existing location
          return {
            savedLocations: state.savedLocations.map(loc => 
              loc.id === location.id 
                ? { ...loc, lastVisited: new Date().toISOString().split('T')[0] }
                : loc
            )
          };
        } else {
          // Add the new location
          return {
            savedLocations: [...state.savedLocations, {
              ...location,
              lastVisited: new Date().toISOString().split('T')[0]
            }]
          };
        }
      }),
      
      removeSavedLocation: (id) => set((state) => ({
        savedLocations: state.savedLocations.filter(location => location.id !== id)
      })),
      
      addRecentSearch: (search) => set((state) => {
        // Avoid duplicates and keep most recent at the top
        const filtered = state.recentSearches.filter(
          item => item.toLowerCase() !== search.toLowerCase()
        );
        return {
          recentSearches: [search, ...filtered].slice(0, 6) // Keep only most recent 6 searches
        };
      }),
      
      removeRecentSearch: (search) => set((state) => ({
        recentSearches: state.recentSearches.filter(
          item => item !== search
        )
      })),
      
      clearRecentSearches: () => set({ recentSearches: [] }),
      
      updateUserSettings: (settings) => set((state) => ({
        userSettings: { ...state.userSettings, ...settings }
      }))
    }),
    {
      name: "campus-navigate-profile", // Local storage key
    }
  )
);
