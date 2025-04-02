import React from "react";
import { motion } from "framer-motion";

export interface Props {
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  features?: string[];
  openingHours?: { days: string; hours: string }[];
  contactInfo?: string;
  isLandmark?: boolean;
}

export const LocationInfoCard = ({
  name,
  category,
  description,
  imageUrl,
  features = [],
  openingHours = [],
  contactInfo,
  isLandmark = false,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-all hover:scale-105 duration-700"
        />
        {isLandmark && (
          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
            Key Landmark
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <span className="inline-block rounded bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm">{category}</span>
        </div>
      </div>
      
      <div className="p-4">
        <p className="mb-4 text-muted-foreground">{description}</p>
        
        {features.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Features</h4>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {openingHours.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Opening Hours</h4>
            <ul className="space-y-1 text-sm">
              {openingHours.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-muted-foreground">{item.days}</span>
                  <span className="font-medium">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {contactInfo && (
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Contact</h4>
            <p className="text-sm text-muted-foreground">{contactInfo}</p>
          </div>
        )}
        
        <div className="mt-4 flex gap-2">
          <button className="flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
            Get Directions
          </button>
          <button className="flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
