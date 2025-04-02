import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavBar } from "components/NavBar";
import { HeroSection } from "components/HeroSection";
import { FeatureCard } from "components/FeatureCard";
import { Footer } from "components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const mainRef = useRef<HTMLElement>(null);
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  
  // Features section reference for scroll animation
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const features = [
    {
      icon: "🧭",
      title: "Interactive Campus Map",
      description: "Explore the University of Ghana campus with our intuitive and responsive map interface."
    },
    {
      icon: "🔍",
      title: "Location Search",
      description: "Find any building, facility or landmark on campus with our powerful search feature."
    },
    {
      icon: "🚶",
      title: "Step-by-Step Directions",
      description: "Get detailed walking directions between any two points on campus."
    },
    {
      icon: "📍",
      title: "Location Details",
      description: "Access information about campus buildings including opening hours and facilities."
    },
    {
      icon: "⭐",
      title: "Save Favorites",
      description: "Save your frequently visited locations for quick access and navigation."
    },
    {
      icon: "🔔",
      title: "Location Alerts",
      description: "Receive notifications about campus events and location-based information."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar transparent />
      
      <main ref={mainRef} className="pt-16">
        {/* Hero Section */}
        <motion.div style={{ y, opacity }}>
          <HeroSection />
        </motion.div>
        
        {/* Features Section */}
        <section className="py-20 bg-secondary/5" ref={featuresRef}>
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Discover Our Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                CampusNavigate UG offers a comprehensive set of features to help you navigate the University of Ghana campus with ease.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Map Preview Section with 3D UI */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-3xl font-bold mb-4">Navigate Like A Pro</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  With our interactive 3D map, finding your way around campus has never been easier. Our map shows you all the important buildings, paths, and landmarks on the University of Ghana campus.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Detailed 3D representations of buildings",
                    "Clear pathways and roads",
                    "Important landmarks and meeting points",
                    "Real-time location tracking"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button 
                  onClick={() => navigate('/map')}
                  size="lg"
                  className="group"
                >
                  <motion.span 
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="mr-2"
                  >
                    Try Our Map Now
                  </motion.span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                {/* 3D-like map preview */}
                <div className="rounded-lg overflow-hidden shadow-2xl border-8 border-white relative">
                  {/* Base map layer */}
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80" 
                    alt="Campus Map Preview"
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* 3D Effect Overlay - Creates depth illusion */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10"></div>
                  
                  {/* Floating elements to create 3D effect */}
                  <motion.div 
                    className="absolute top-1/4 left-1/3 bg-white p-2 rounded shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ 
                      y: [0, -10, 0],
                      rotateY: [0, 5, 0],
                      z: [0, 20, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4,
                      ease: "easeInOut"
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">🏛️</div>
                      <p className="text-sm font-semibold">Balme Library</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-1/2 right-1/4 bg-white p-2 rounded shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ 
                      y: [0, -15, 0],
                      rotateY: [0, -5, 0],
                      z: [0, 30, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">🏫</div>
                      <p className="text-sm font-semibold">Great Hall</p>
                    </div>
                  </motion.div>
                  
                  {/* Animated Route Line */}
                  <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                    <motion.path
                      d="M 100,100 C 140,120 180,150 220,130 C 260,110 280,160 320,180 C 360,200 400,180 450,200"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="10 10"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                    />
                  </svg>
                  
                  {/* 3D Buildings */}
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i}
                      className="absolute bg-white shadow-lg rounded"
                      style={{
                        width: 30 + Math.random() * 40,
                        height: 20 + Math.random() * 30,
                        top: 50 + Math.random() * 200,
                        left: 80 * i,
                        transformStyle: "preserve-3d",
                        transform: `translateZ(${20 + i * 5}px)`
                      }}
                      animate={{
                        y: [0, -5, 0],
                        rotateY: [0, 2, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + i,
                        delay: i * 0.5
                      }}
                    >
                      <div className="w-full h-full bg-primary/10 rounded"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-primary/30 transform -skew-x-45 origin-bottom-left"></div>
                      <div className="absolute top-0 bottom-0 right-0 w-[5px] bg-primary/20 transform skew-y-45 origin-top-right"></div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Controls overlay */}
                <motion.div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white py-2 px-4 rounded-full shadow-lg border border-border flex items-center gap-4"
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >-</motion.div>
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >3D</motion.div>
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >+</motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">What Students Say</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hear from students who use CampusNavigate UG to find their way around campus.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Kofi Mensah",
                  role: "Computer Science, Level 300",
                  quote: "As a new student, finding my classes was a challenge until I discovered CampusNavigate UG. Now I confidently navigate the entire campus!"
                },
                {
                  name: "Ama Owusu",
                  role: "Business Administration, Level 200",
                  quote: "The 3D map feature is amazing! I can easily visualize where I'm going and get clear directions to any building on campus."
                },
                {
                  name: "Kwame Amoah",
                  role: "Political Science, Level 400",
                  quote: "I love the location alerts feature. It keeps me informed about events happening in different parts of campus that I might be interested in."
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white p-6 rounded-lg shadow-md border border-border"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full mb-4 flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section with 3D elements */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 z-0"></div>
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/10"
                style={{
                  width: 20 + Math.random() * 100,
                  height: 20 + Math.random() * 100,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5 + Math.random() * 10,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-border overflow-hidden relative"
            >
              {/* Decorative 3D elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-br-3xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/10 rounded-tl-3xl"></div>
              
              {/* Floating 3D compass */}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <div className="text-3xl">🧭</div>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ready to Navigate Campus Like a Pro?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Start using CampusNavigate UG today and never get lost on campus again.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden"
                  onClick={() => navigate('/map')}
                >
                  {/* 3D button effect with pseudo-element */}
                  <motion.div
                    className="absolute inset-0 bg-primary-foreground/10 rounded"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 2 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <motion.span 
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="mr-2 relative z-10"
                  >
                    Explore Map Now
                  </motion.span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="relative z-10"
                  >
                    →
                  </motion.span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="relative overflow-hidden"
                >
                  {/* Subtle shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">Create Free Account</span>
                </Button>
              </motion.div>
              
              {/* 3D Map Pin */}
              <motion.div
                className="absolute -bottom-5 left-1/2 transform -translate-x-1/2"
                animate={{
                  y: [0, -15, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <div className="w-10 h-10 bg-primary rounded-full shadow-lg flex items-center justify-center text-white">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    📍
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
