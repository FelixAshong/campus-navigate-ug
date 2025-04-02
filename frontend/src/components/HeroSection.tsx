import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-background to-secondary/5 flex items-center">
      {/* Background pattern - Adinkra inspired */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="grid grid-cols-6 gap-8 p-8 h-full w-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div 
              key={i} 
              className="rounded-full w-12 h-12 border-2 border-primary"
              style={{
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-primary">Navigate</span> University of Ghana with Ease
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find your way around campus, discover new locations, and get directions to anywhere on campus with our interactive map.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg"
              onClick={() => navigate('/map')}
              className="group"
            >
              <motion.span 
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="mr-2"
              >
                Explore Map
              </motion.span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                →
              </motion.span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-lg overflow-hidden shadow-xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
              alt="University of Ghana Campus"
              className="w-full h-auto object-cover"
            />
            {/* Map pin animation */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                repeatType: "reverse" 
              }}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="w-4 h-12 bg-primary/80 rounded-b-full mx-auto -mt-1"></div>
            </motion.div>
          </div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute -top-4 -right-4 bg-white p-2 rounded-lg shadow-md border border-border"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              repeatType: "reverse" 
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">📍</div>
              <p className="text-sm font-medium">Balme Library</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-4 -left-4 bg-white p-2 rounded-lg shadow-md border border-border"
            animate={{ 
              y: [0, 8, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              repeatType: "reverse",
              delay: 1
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">🏫</div>
              <p className="text-sm font-medium">Great Hall</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
