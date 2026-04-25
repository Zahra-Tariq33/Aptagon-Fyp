"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Technology {
  src: string;
  alt: string;
}

interface TechnologiesGridProps {
  heading: string;
  technologies: Technology[];
  minWidth?: number; // optional, default 100px
}

export default function TechnologiesGrid({
  heading,
  technologies,
  minWidth = 100,
}: TechnologiesGridProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.08,
        duration: 0.4,
      },
    }),
  };

  return (
    <section className="py-14 px-4 md:px-16 bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#214F65] dark:text-[#0EBAB0] transition-colors duration-300"
      >
        {heading}
      </motion.h2>

      {/* Technologies Grid */}
      <div
        className={`mx-auto max-w-7xl px-3 grid gap-6 justify-items-center`}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
        }}
      >
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            whileHover={{ y: -6, scale: 1.05 }}
            className="group flex items-center justify-center bg-white dark:bg-[#2a2a2a] p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#0EBAB0]/25 w-full h-32"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={tech.src}
                alt={tech.alt}
                fill
                className="object-contain filter dark:brightness-0 dark:invert transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
