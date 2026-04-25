"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0EBAB0] text-[#0EBAB0]">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-md font-medium text-[#214F65] dark:text-gray-300">
      {text}
    </span>
  </div>
);

export default function WhoWeAre() {
  const themeGradient = "linear-gradient(135deg, #0EBAB0 0%, #06544F 100%)";

  return (
    <section className="w-full bg-white dark:bg-[#1a1a1a] py-20 px-6 sm:px-12 lg:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* 40% / 60% Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT - IMAGE (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[40%] relative"
          >
            <div className="relative overflow-hidden rounded-[40px] shadow-2xl">
              <Image
                src="/teammeeting.png"
                alt="Aptagon Technologies Team"
                width={600}
                height={450}
                className="w-full h-[450px] lg:h-[540px] object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* RIGHT - CONTENT (60%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="w-full lg:w-[60%] space-y-8"
          >
            <div className="space-y-4">
              <h4 className="text-md font-bold tracking-wider text-[#0EBAB0] uppercase">
                About Us
              </h4>
              <h2 className="text-2xl font-extrabold text-[#214F65] dark:text-white lg:text-3xl leading-tight">
               Building Intelligent Digital Solutions for Businesses
              </h2>
            </div>

            <p className="text-md leading-relaxed dark:text-gray-300">
             <span className="font-bold text-[#214F65] dark:text-white">Aptagon Technologies</span>, 
            is a <span className="font-bold text-[#214F65] dark:text-white">forward-thinking</span> technology company dedicated to building intelligent digital products and scalable solutions. Our team combines <span  className="font-bold text-[#214F65] dark:text-white">deep technical expertise</span> with creative problem-solving to deliver high-quality software, AI solutions, and digital platforms that help businesses thrive in the modern digital world.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureItem text="Industry-leading expertise" />
              <FeatureItem text="Agile development process" />
              <FeatureItem text="24/7 dedicated support" />
              <FeatureItem text="Proven track record" />
            </div>


 
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center overflow-hidden rounded-xl px-10 py-4 text-lg font-bold text-white shadow-lg transition-all"
              style={{ background: themeGradient }}
            >
          

<Link href="/about" className="contents"> 

 
    <span className="relative z-10">Discover More</span>
   
   
</Link>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}