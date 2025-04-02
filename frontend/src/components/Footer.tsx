import React from "react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-primary/5 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">CN</span>
              </div>
              <h2 className="text-xl font-bold">CampusNavigate UG</h2>
            </div>
            <p className="text-muted-foreground">
              Find your way around the University of Ghana campus with ease.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted-foreground hover:text-primary">Home</a></li>
              <li><a href="/map" className="text-muted-foreground hover:text-primary">Map</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-primary">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Campus Areas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Academic Buildings</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Hostels & Halls</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Facilities</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Recreation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground mb-2">University of Ghana</p>
            <p className="text-muted-foreground mb-2">Legon, Accra</p>
            <p className="text-muted-foreground mb-2">Ghana</p>
            <p className="text-muted-foreground">support@campusnavigate.ug</p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CampusNavigate UG. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            {['Facebook', 'Twitter', 'Instagram'].map((social) => (
              <motion.a 
                key={social}
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20"
              >
                {social === 'Facebook' && '𝔽'}
                {social === 'Twitter' && '𝕏'}
                {social === 'Instagram' && 'ℹ'}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
