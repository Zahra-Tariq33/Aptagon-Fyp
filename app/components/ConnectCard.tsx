"use client";
import React, { useState } from "react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

export default function ConnectCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center sm:justify-start mt-10">
      <div 
        className="relative group" 
        style={{ width: "190px", height: "190px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Connect Card - Added a subtle breathing glow */}
        <div
          className={`relative w-full h-full rounded-2xl cursor-pointer overflow-visible z-30 transition-all duration-500 ${
            isHovered ? "shadow-[0_20px_50px_rgba(14,186,176,0.3)] scale-[1.02]" : "shadow-xl"
          }`}
          style={{
            background: `conic-gradient(from 233.81deg at 100% 19.84%, #0EBAB0 0deg,#214F65 259.66deg,#0EBAB0 360deg)`,
          }}
        >
          {/* Connect Text - Glassy reflection effect on hover */}
          <div
            className="flex items-center justify-center h-full transition-all duration-700 ease-[0.23,1,0.32,1]"
            style={{
              transform: isHovered ? "translateY(-55px)" : "translateY(0)",
            }}
          >
            <h1 className="text-white text-4xl font-black tracking-tight drop-shadow-md">
              Connect
            </h1>
          </div>

          {/* --- PREMIUM STAGGERED SOCIALS --- */}
          
          {/* Instagram - The "Big Brother" */}
          <div
            className="absolute transition-all"
            style={{
              width: "150px", height: "135px",
              bottom: "0", left: "0",
              backgroundColor: "#5DDCD6",
              borderTop: "1.5px solid rgba(255,255,255,0.4)",
              borderRight: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "0 24px 90px 0",
              display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
              paddingTop: "12px", paddingRight: "14px",
              zIndex: 1,
              opacity: isHovered ? 1 : 0,
              // Spring Physics Motion
              transform: isHovered 
                ? "translate(0, 0) scale(1) rotate(0deg)" 
                : "translate(-30px, 30px) scale(0.7) rotate(-5deg)",
              transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: isHovered ? "10px 10px 30px rgba(0,0,0,0.1)" : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundImage = "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundImage = "none";
              e.currentTarget.style.backgroundColor = "#5DDCD6";
            }}
          >
            <a href="https://www.instagram.com/aptagon/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-8 h-8 text-white hover:rotate-12 hover:scale-125 transition-all duration-300" />
            </a>
          </div>

          {/* LinkedIn - The "Middle Child" */}
          <div
            className="absolute transition-all"
            style={{
              width: "110px", height: "100px",
              bottom: "0", left: "0",
              backgroundColor: "#5DDCD6",
              borderTop: "1.5px solid rgba(255,255,255,0.4)",
              borderRight: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "0 20px 70px 0",
              display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
              paddingTop: "10px", paddingRight: "12px",
              zIndex: 11,
              opacity: isHovered ? 1 : 0,
              transform: isHovered 
                ? "translate(0, 0) scale(1)" 
                : "translate(-20px, 20px) scale(0.75)",
              transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #0A66C2, #004182)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#5DDCD6";
            }}
          >
            <a href="https://www.linkedin.com/company/aptagon" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="w-7 h-7 text-white hover:-rotate-12 hover:scale-125 transition-all duration-300" />
            </a>
          </div>

          {/* Facebook - The "Smallest" */}
          <div
            className="absolute transition-all"
            style={{
              width: "70px", height: "60px",
              bottom: "0", left: "0",
              backgroundColor: "#5DDCD6",
              borderTop: "1.5px solid rgba(255,255,255,0.4)",
              borderRight: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "0 15px 40px 0",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 12,
              opacity: isHovered ? 1 : 0,
              transform: isHovered 
                ? "translate(0, 0) scale(1)" 
                : "translate(-10px, 10px) scale(0.8)",
              transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1877F2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#5DDCD6";
            }}
          >
            <a href="https://www.facebook.com/aptagon/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-7 h-7 text-white hover:scale-125 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}