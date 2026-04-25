"use client";

import React from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceCard({
  icon,
  title,
  description,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 
      border-[#0EBAB0] bg-transparent dark:bg-[#1f1f1f] p-6 
      transition-all duration-500 
      hover:border-none hover:shadow-2xl 
      hover:shadow-[#0EBAB0]/40 dark:hover:shadow-[#0EBAB0]/25"
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 
        group-hover:opacity-100 
        bg-linear-to-br from-[#0EBAB0] via-[#0EBAB0]/90 to-[#214F65]"
      />

      {/* Glow ring */}
      <div
        className="absolute inset-0 z-0 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 
        group-hover:opacity-60 bg-[#0EBAB0]"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0, ease: "easeInOut" }}
          className="flex h-18 w-18 items-center justify-center rounded-full 
          border-2 border-[#0EBAB0] bg-[#0EBAB0]/10 text-[#0EBAB0]
          transition-all duration-500 dark:group-hover:border-white
          group-hover:bg-white dark:group-hover:bg-[#0EBAB0] group-hover:text-[#0ebab0]
          group-hover:shadow-lg group-hover:shadow-white/40"
        >
          {icon}
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl mt-4 font-bold text-[#0EBAB0] 
          transition-colors duration-500 
          group-hover:text-white"
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm font-medium leading-relaxed text-[#214F65] dark:text-white 
          transition-colors duration-500 
          group-hover:text-white/90"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
