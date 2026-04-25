"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";

// ── TYPES ──
interface Item {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  stat: string;
  statLabel: string;
  tag: string;
}

// ── DATA ──
// ── DATA ──
const items: Item[] = [
  {
    id: "01",
    title: "Innovation",
    desc: "We turn ideas into transformative digital solutions that lead the industry forward.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="24" height="24">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35M11 8v3m0 0v3m0-3h3m-3 0H8"/>
      </svg>
    ),
    stat: "200+",
    statLabel: "Ideas Explored",
    tag: "Innovation",
  },
  {
    id: "02",
    title: "Excellence",
    desc: "Every project we deliver is crafted with precision, ensuring unmatched quality and performance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="24" height="24">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    stat: "99%",
    statLabel: "Quality Rate",
    tag: "Excellence",
  },
  {
    id: "03",
    title: "Collaboration",
    desc: "We foster partnerships built on trust and transparency, delivering results together with our clients.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="24" height="24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    stat: "50+",
    statLabel: "Team Members",
    tag: "Teamwork",
  },
  {
    id: "04",
    title: "Customer Success",
    desc: "Our solutions are designed to create measurable impact and sustainable growth for our clients.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="24" height="24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    stat: "10x",
    statLabel: "Growth Factor",
    tag: "Results",
  },
];

// ── COUNTER COMPONENT ──
// Types added to fix parameter errors
function Counter({ value, trigger }: { value: string; trigger: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  
  useEffect(() => {
    if (!trigger) return;
    
    const controls = animate(0, numericValue, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = (Number.isInteger(numericValue) ? Math.floor(v) : v.toFixed(0)) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [trigger, numericValue, suffix]);
  
  return <span ref={ref}>0{suffix}</span>;
}

// ── CARD COMPONENT ──
const DriveCard = ({ item, index }: { item: Item; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const [burst, setBurst] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => { setHovered(true); setBurst(true); setTimeout(() => setBurst(false), 750); }}
      onMouseLeave={() => setHovered(false)}
      className="relative h-full"
    >
      {/* Glow border */}
      <div style={{
        position: "absolute", inset: -2, borderRadius: 32,
        background: "linear-gradient(135deg, #0EBAB0, #073A53, #0EBAB0)",
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", zIndex: 0,
      }} />

      {/* Card shell */}
      <div style={{
        position: "relative", zIndex: 1, height: "100%",
        borderRadius: 30, background: "#fff",
         border: "1px solid #0EBAB0",  // fixed here
        overflow: "hidden", transition: "box-shadow 0.4s ease",
        display: "flex", flexDirection: "column",
      }}>

        {/* Fill sweep */}
        <motion.div
          initial={false}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg, #073A53 0%, #0a4f6e 100%)",
            transformOrigin: "bottom", borderRadius: 30, zIndex: 0,
          }}
        />

        {/* Particles Effect */}
        {burst && Array.from({ length: 8 }).map((_, i) => {
          const rad = ((i / 8) * 360 * Math.PI) / 180;
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], x: Math.cos(rad) * 65, y: Math.sin(rad) * 65, scale: [0, 1.3, 0] }}
              transition={{ duration: 0.65, delay: i * 0.03, ease: "easeOut" }}
              style={{
                position: "absolute", left: "50%", top: "38%",
                width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5,
                borderRadius: "50%", background: "#0EBAB0", zIndex: 20, pointerEvents: "none",
              }}
            />
          );
        })}

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 2, padding: "2rem", display: "flex", flexDirection: "column", height: "100%" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem" }}>
            <span style={{
              color: "#0EBAB0",
              fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "0.28rem 0.75rem", borderRadius: 999,
              border: "1px solid rgba(14,186,176,0.2)",
              background: hovered ? "rgba(14,186,176,0.2)" : "rgba(14,186,176,0.08)",
            }}>{item.tag}</span>

            <div style={{
              width: 52, height: 52, borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: hovered ? "linear-gradient(135deg, #0EBAB0, #0a9e95)" : "linear-gradient(135deg, #effcfb, #e3f7f6)",
              boxShadow: hovered ? "0 6px 20px rgba(14,186,176,0.35)" : "0 2px 8px rgba(14,186,176,0.12)",
              color: hovered ? "#fff" : "#0EBAB0"
            }}>
              {item.icon}
            </div>
          </div>

          <h3 style={{
            fontSize: "24px", fontWeight: 900, letterSpacing: "-0.03em",
            color: hovered ? "#fff" : "#073A53",
            marginBottom: "1rem"
          }}>{item.title}</h3>

          <p style={{ fontSize: "0.9rem", lineHeight: 1.76, flexGrow: 1, color: hovered ? "rgba(182,222,232,0.88)" : "#6b8fa2" }}>
            {item.desc}
          </p>

          <div style={{ marginTop: "1.6rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: "2.1rem", fontWeight: 900, color: "#0EBAB0", lineHeight: 1 }}>
                {/* Fixed Prop Name */}
                <Counter value={item.stat} trigger={hovered || inView} />
              </span>
              <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: hovered ? "rgba(155,210,222,0.8)" : "#aabfc9" }}>
                {item.statLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── MAIN COMPONENT ──
export default function WhatDrivesUsForward() {
  const headerRef = useRef(null);

  return (
    <section style={{ position: "relative", padding: "6rem 1.5rem 7rem", background: "#f4f8fb", overflow: "hidden" }}>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1300, margin: "0 auto" }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
         <h2 style={{ fontWeight: 900, fontSize: "3rem", lineHeight: 1.06 }}>
          What Drives Us  {" "}
          <span style={{
            backgroundImage: "linear-gradient(120deg, #073A53 0%, #0EBAB0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block"
          }}>
            Forward
          </span>
        </h2>
          <p style={{ color: "#7a9aaa", fontSize: "1rem", marginTop: "1rem" }}>
            The values that shape how we think, build, and grow — every single day.
          </p>
        </div>

        {/* Grid Responsive Fix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <DriveCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}