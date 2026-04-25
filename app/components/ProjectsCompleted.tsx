"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

/* ================= IMPROVED COUNT UP COMPONENT ================= */
const Counter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(parseInt(value));
    }
  }, [isInView, value, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
  }, [rounded]);

  return <span ref={ref}>{display}</span>;
};

/* ================= STATS DATA ================= */
const stats = [
  { value: "107", label: "Successful Projects", icon: "/home/ProjectsCompleted/project.png" },
  { value: "52", label: "Global Clients", icon: "/home/ProjectsCompleted/client.png" },
  { value: "71", label: "Multi Service", icon: "/home/ProjectsCompleted/service.png" },
  { value: "19", label: "Winning Awards", icon: "/home/ProjectsCompleted/award.png" },
];

export default function WeHaveCompleted() {
  const [mounted, setMounted] = useState(false);
  const themeGradient = "linear-gradient(135deg, #0EBAB0 0%, #06544F 100%)";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="bg-white dark:bg-[#1a1a1a] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center font-extrabold text-4xl md:text-4xl text-[#214F65] dark:text-white mb-16"
        >
         Our <span className="text-[#0EBAB0]">Impact</span> in Numbers
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className="relative group bg-white dark:bg-[#262626] p-10 text-center border border-gray-100 dark:border-none shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_rgba(14,186,176,0.3)] transition-all duration-500 overflow-hidden rounded-2xl"
            >
              {/* GRADIENT OVERLAY */}
              <motion.div 
                variants={{ hover: { y: 0 } }}
                initial={{ y: "100%" }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="absolute inset-0 z-0"
                style={{ background: themeGradient }}
              />

              <div className="relative z-10 flex flex-col items-center">
                {/* 🌟 CONTINUOUS ROTATION */}
                <motion.div variants={{ hover: { y: -10, scale: 1.1 } }} className="mb-6">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                    className="h-24 w-24 rounded-full border-[3px] border-[#0EBAB0] flex items-center justify-center transition-all group-hover:border-white/40 group-hover:bg-white/10"
                  >
                    <div className="relative h-12 w-12">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          fill
                          className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                        />
                    </div>
                  </motion.div>
                </motion.div>

                {/* --- THE COUNTER --- */}
                <h3 className="text-4xl md:text-5xl font-black text-[#214F65] dark:text-white group-hover:text-white transition-colors mb-2">
                  <Counter value={item.value} />+
                </h3>

                <h3 className="text-[16px] md:text-[18px] font-bold text-[#214F65] dark:text-gray-400 group-hover:text-white/90 transition-colors uppercase">
                  {item.label}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}