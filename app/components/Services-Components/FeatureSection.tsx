"use client";

import React from "react";
import { motion } from "framer-motion";

interface Card {
  image: string;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  heading: string;
  description: string;
  cards: Card[];
}

const FeatureCard = ({ card, index }: { card: Card; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -12, 
        rotateX: 4, 
        rotateY: -4,
        transition: { duration: 0.3 } 
      }}
      className="group relative cursor-pointer rounded-[2rem] bg-white 
               
                 border-[1.5px] border-[#073A53]/60 p-8
                 shadow-[0_10px_30px_rgba(7,58,83,0.05)] 
                 hover:shadow-[0_20px_40px_rgba(7,58,83,0.12)]
                 transition-all duration-500 overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 1. Animated Gradient Background (Appears on Hover) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#073A53] via-[#073A53] to-[#0EBAB0]" />

      {/* 2. Neon Border Glow (Appears on Hover) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 border-[2px] border-[#0EBAB0] rounded-[2rem] transition-all duration-500" />

      {/* 3. Floating Icon Design */}
      <div className="relative z-10 mb-6" style={{ transform: "translateZ(40px)" }}>
        <div className="w-14 h-14 rounded-xl bg-[#0EBAB0]/10 border border-[#0EBAB0]/20 flex items-center justify-center 
                        group-hover:bg-white group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-500">
          <img
            src={card.image}
            alt={card.title}
            className="w-7 h-7 object-contain transition-all duration-500 group-hover:brightness-0"
          />
        </div>
        {/* Decorative circle behind icon */}
        <div className="absolute -top-2 -left-2 w-16 h-16 bg-[#0EBAB0]/5 rounded-full blur-xl group-hover:bg-white/20 transition-colors" />
      </div>

      {/* 4. Content */}
      <div className="relative z-10" style={{ transform: "translateZ(25px)" }}>
        <h3 className="text-xl font-bold text-[#073A53] mb-3 group-hover:text-white transition-colors duration-300 tracking-tight">
          {card.title}
        </h3>
        <p className="text-[15px]  leading-relaxed font-normal group-hover:text-white/80 transition-colors duration-300">
          {card.description}
        </p>
      </div>

      {/* 5. Bottom Interactive Indicator */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
         </svg>
      </div>
    </motion.div>
  );
};

export default function FeatureSection({
  heading,
  description,
  cards,
}: FeatureSectionProps) {
  return (
    <section className="relative py-20 px-6 md:px-10 bg-white overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#0EBAB0]/5 rounded-full blur-[120px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#073A53]/5 rounded-full blur-[120px] -ml-32 -mb-32" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="flex items-center justify-center md:justify-start gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-[#0EBAB0] rounded-full" />
            <span className="text-[#0EBAB0] font-bold uppercase tracking-[0.3em] text-xs">
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-4xl md:text-5xl font-extrabold text-[#073A53] mb-6 leading-[1.1] tracking-tight"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 leading-relaxed font-medium"
          >
            {description}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <FeatureCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}