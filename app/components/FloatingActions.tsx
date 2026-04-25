"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUp, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; 

const FloatingActions = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    // Agar Lenis layout mein setup hai, to window.scrollTo automatically 
    // smooth behave karega. 
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Lenis isko intercept karke smooth bana dega
    });
  };

  const actions = [
    {
      icon: <Phone size={22} />,
      href: "tel:+923704640036", 
      baseColor: "#2CB6E8",
      hoverColor: "#1a9ecf",
      label: "Call us",
      type: "tel"
    },
    {
      icon: <FaWhatsapp size={26} />, 
      href: "https://wa.me/447882610679", 
      baseColor: "#25D366", 
      hoverColor: "#1ebe59",
      label: "WhatsApp",
      type: "external"
    },
    {
      icon: <Mail size={22} />,
      href: "mailto:hr@aptagon.com", 
      baseColor: "#2CB6E8",
      hoverColor: "#1a9ecf",
      label: "Email us",
      type: "mail"
    },
  ];

  return (
    <>
      <div
        className="fixed top-1/2 z-[100] flex flex-col items-end"
        style={{ right: "15px", transform: "translateY(-50%)" }}
      >
        <div className="flex flex-col gap-3">
          {actions.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.type === "external" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              initial={{ x: 80, opacity: 0 }}
              animate={mounted ? { x: 0, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.12 }}
              whileHover={{ scale: 1.15, x: -5 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: item.baseColor,
                boxShadow: `0 4px 18px ${item.baseColor}66`,
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full text-white transition-all duration-300"
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            onClick={scrollToTop}
            className="fixed bottom-10 z-[100] text-white flex items-center justify-center w-12 h-12 rounded-full shadow-2xl bg-[#2CB6E8] hover:bg-[#1a9ecf]"
            style={{ right: "15px" }}
          >
            <ArrowUp size={24} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActions;