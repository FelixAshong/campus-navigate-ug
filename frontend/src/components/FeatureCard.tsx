import React from "react";
import { motion } from "framer-motion";

export interface Props {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon, title, description, delay = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white p-6 rounded-lg shadow-md border border-border hover:border-primary"
    >
      <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
        <span className="text-2xl text-primary">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};
