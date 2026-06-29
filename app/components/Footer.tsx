"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSun,
  FaMoon
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LocationMap from "./LocationMap";

// --- Custom Social Icon Component ---
const SocialIcon = ({ Icon, name, color, link }: { Icon: any; name: string; color: string; link: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-full mb-2 px-3 py-1 rounded-md text-[10px] font-bold text-white z-50 shadow-lg"
            style={{ backgroundColor: color }}
          >
            {name}
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" 
              style={{ borderTopColor: color }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4, backgroundColor: color, color: "#fff" }}
        className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full transition-all duration-300 shadow-md"
      >
        <Icon size={14} className={isHovered ? "text-white" : "text-[#214F65] dark:text-[#0EBAB0]"} />
      </motion.a>
    </div>
  );
};

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-[#214F65] dark:bg-[#0f1f2e] text-white transition-colors duration-500 overflow-hidden">
      {/* Top Section */}
      <div className="max-w-10xl px-4 sm:px-6 lg:px-24 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.2fr] gap-4 lg:gap-12">
          
          {/* Left Side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="inline-block cursor-pointer">
              <Image
                src="/logos/logo-white.png"
                width={212}
                height={63}
                alt="Aptagon Technologies Logo"
                className="mb-4"
                unoptimized
              />
            </motion.div>

            <p className="text-sm leading-relaxed text-white/80 dark:text-gray-300 max-w-lg font-light">
              Aptagon Technologies is a leading software house committed to
              delivering innovative digital solutions that empower businesses to
              grow and succeed globally. We specialize in web development, mobile
              applications, and digital transformation.
            </p>

            <div className="pt-8">
              <h3 className="font-black uppercase tracking-widest text-[#fffff] text-md mb-6">Connect With Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-3 text-sm">
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#0EBAB0] transition-colors"><FaEnvelope /></div>
                    <span className="font-medium">info@aptagon.com</span>
                  </div>
                 
                </div>

                <div className="space-y-4">
                 
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-[#0EBAB0] mt-1 shrink-0" />
                    <div className="flex flex-col"><span className="text-[10px] uppercase font-bold text-white/50">UK Office</span><span className="text-xs">Poole, United Kingdom</span></div>
                  </div>
                    <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-[#0EBAB0] mt-1 shrink-0" />
                    <div className="flex flex-col"><span className="text-[10px] uppercase font-bold text-white/50">PK Office</span><span className="text-xs">Okara, Pakistan</span></div>
                  </div>
                   <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-[#0EBAB0] mt-1 shrink-0" />
                    <div className="flex flex-col"><span className="text-[10px] uppercase font-bold text-white/50">USA Office</span><span className="text-xs">Dallas, Texas</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                   {/* <div className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#0EBAB0] transition-colors"><FaPhoneAlt /></div>
                    <span className="font-medium">0370 4640036</span>
                  
                  </div> */}
                   <div className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#0EBAB0] transition-colors"><FaPhoneAlt /></div>
                    <span className="font-medium">03097624802</span>
                  
                  </div>

                    <div className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#0EBAB0] transition-colors"><FaPhoneAlt /></div>
                    <span className="font-medium">03177212261</span>
                  
                  </div>
                  
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right Side - Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative flex items-center justify-center w-full min-h-[340px] overflow-hidden"
          >
            <LocationMap />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#214F65]/20 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom Bar - Ultra Compact (py-2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Animated Theme Toggle */}
          <div className="flex items-center gap-3 order-2 sm:order-1 px-2 py-1">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30">
              {theme === "dark" ? "Night" : "Day"}
            </span>
            <button
              onClick={toggleTheme}
              className={`relative w-11 h-5 rounded-full p-0.5 transition-colors duration-500 border border-white/10 overflow-hidden ${
                theme === "dark" ? "bg-slate-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]" : "bg-cyan-500/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
              }`}
            >
              <motion.div
                animate={{ 
                  x: theme === "dark" ? 22 : 0,
                  rotate: theme === "dark" ? 360 : 0
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative z-10 w-[14px] h-[14px] rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${
                  theme === "dark" ? "bg-[#0EBAB0] text-white" : "bg-white text-orange-500"
                }`}
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <FaMoon className="text-[8px]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <FaSun className="text-[8px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Background Stars for Night Mode */}
              <AnimatePresence>
                {theme === "dark" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div className="absolute top-1 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
                    <div className="absolute bottom-1.5 left-5 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-75" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Copyright */}
          <p className="text-[10px] font-medium text-gray-500 order-3 sm:order-2">
            © 2025 Aptagon Technologies. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 order-1 sm:order-3">
            <SocialIcon Icon={FaFacebookF} name="Facebook" color="#1877F2" link="https://www.facebook.com/aptagon/" />
            <SocialIcon Icon={FaInstagram} name="Instagram" color="#E4405F" link="https://www.instagram.com/aptagon/" />
            <SocialIcon Icon={FaLinkedinIn} name="LinkedIn" color="#0A66C2" link="https://www.linkedin.com/company/aptagon" />
            <SocialIcon Icon={FaXTwitter} name="Twitter" color="#000000" link="#" />
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;