import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export interface Props {
  transparent?: boolean;
}

export const NavBar = ({ transparent = false }: Props) => {
  const navigate = useNavigate();
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full fixed top-0 z-50 py-4 ${transparent ? 'bg-transparent' : 'bg-white shadow-sm'}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">CN</span>
          </div>
          <h1 className="text-xl font-bold">CampusNavigate UG</h1>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-6">
          <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
          <Button variant="ghost" onClick={() => navigate('/map')}>Map</Button>
          <Button variant="ghost" onClick={() => navigate('/about')}>About</Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/register')}>Sign Up</Button>
        </div>
      </div>
    </motion.header>
  );
};
