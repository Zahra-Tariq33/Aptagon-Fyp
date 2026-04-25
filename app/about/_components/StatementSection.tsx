"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StatementSectionProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function StatementSection({
  title,
  description,
  backgroundImage,
}: StatementSectionProps) {
  const containerRef = useRef(null);

  // Parallax Effect for Background Image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background smooth movement
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false }}
      className="relative w-full mt-10 overflow-hidden"
    >
      {/* PARALLAX IMAGE LAYER */}
      <motion.div
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          y,
          scale: 1.2
        }}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
      />

      {/* DYNAMIC OVERLAY (Navy to Teal Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#073A53]/90 via-[#073A53]/85 to-[#0EBAB0]/50" />

      {/* CONTENT (Original py-20 height maintained) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center text-white">
        
        {/* Top Quote Icon - Changed to White */}
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          className="absolute left-4 top-4 text-7xl md:text-9xl font-serif text-white select-none pointer-events-none"
        >
          “
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            {title}
          </h2>

          {/* Divider */}
          <div className="w-20 h-1 bg-[#0EBAB0] mx-auto mb-8 rounded-full shadow-[0_0_10px_rgba(14,186,176,0.5)]" />

          {/* Description */}
          <p className="max-w-4xl mx-auto text-sm md:text-lg leading-relaxed text-white/90 font-medium">
            {description}
          </p>
        </motion.div>

        {/* Bottom Quote Icon - Changed to White */}
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          className="absolute right-4 bottom-4 text-7xl md:text-9xl font-serif text-white select-none pointer-events-none"
        >
          ”
        </motion.span>
      </div>

      {/* Grainy Texture for Premium Look */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </motion.section>
  );
}