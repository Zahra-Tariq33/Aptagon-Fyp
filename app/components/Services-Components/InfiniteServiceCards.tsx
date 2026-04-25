"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useInView } from "framer-motion";
import Image from "next/image";

interface CardItem {
  image: string;
  title: string;
  description: string;
}

interface InfiniteMovingCardsProps {
  cards: CardItem[];
  speed?: number;
  heading?: string;
  subheading?: string;
}

/* ══════════════════════════════════
   SERVICE CARD (Dark Border + Heavy Shadow)
══════════════════════════════════ */
function ServiceCard({ card, stepNumber }: { card: CardItem; stepNumber: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 280,
        height: 330, 
        flexShrink: 0,
        borderRadius: 22,
        backgroundColor: "#ffffff",
        padding: "26px",
        // DARKER BORDER: Increased opacity and thickness
        border: hovered ? "2.5px solid #073A53" : "2px solid #0EBAB0",
        // HEAVY SHADOW: Multi-layered for depth
        boxShadow: hovered 
          ? "0 30px 60px rgba(7, 58, 83, 0.3), 0 10px 20px rgba(14, 186, 176, 0.2)" 
          : "0 15px 40px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.05)",
        transform: hovered ? "translateY(-15px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.5s cubic-bezier(0.2, 1, 0.3, 1)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        zIndex: hovered ? 20 : 1,
      }}
    >
      {/* ── Icon Section ── */}
      <div style={{
        width: 60,
        height: 60,
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(14, 186, 176, 0.1)",
        borderRadius: "15px",
        border: "1px solid rgba(14, 186, 176, 0.3)"
      }}>
        <Image 
          src={card.image} 
          alt={card.title} 
          width={35} 
          height={35} 
          style={{ objectFit: "contain" }} 
        />
      </div>

      {/* ── Text Content ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ 
          fontSize: "11px", 
          fontWeight: 800, 
          color: "#0EBAB0",
          textTransform: "uppercase",
          letterSpacing: "0.1em"
        }}>
          Step {stepNumber}
        </span>

        <h3 style={{ 
          fontSize: "19px", 
          fontWeight: 800, 
          color: "#073A53", 
          margin: 0,
          lineHeight: 1.2
        }}>
          {card.title}
        </h3>

        <p style={{ 
          fontSize: "14px", 
          lineHeight: 1.6, 
          color: "#475569", 
          margin: 0,
          fontWeight: 500
        }}>
          {card.description}
        </p>
      </div>

      {/* ── Bottom Accent Line ── */}
      <div style={{
        marginTop: "auto",
        width: hovered ? "100%" : "40px",
        height: "4px",
        background: "#0EBAB0",
        borderRadius: "10px",
        transition: "width 0.4s ease"
      }} />
    </div>
  );
}

/* ══════════════════════════════════
   MAIN SECTION COMPONENT
══════════════════════════════════ */
export default function InfiniteMovingCards({
  cards,
  speed = 50,
  heading = "Our Expert Process",
  subheading = "We follow a rigorous, high-quality development cycle for every project.",
}: InfiniteMovingCardsProps) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const cardW = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const first = containerRef.current.querySelector<HTMLElement>(":scope > div");
        if (first) cardW.current = first.offsetWidth + 30; // 30 is the gap
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [cards]);

  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      if (!isPaused.current && cardW.current > 0) {
        const delta = now - last;
        const move = (delta / 1000) * speed;
        const cur = x.get() - move;
        const reset = -(cardW.current * cards.length);
        x.set(cur <= reset ? cur - reset : cur);
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, x, cards.length]);

  return (
    <section style={{ width: "100%", padding: "100px 0", background: "#F8FAFC", overflow: "hidden" }}>
      
      <div style={{ padding: "0 6%", textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#073A53", marginBottom: "15px" }}>
          {heading}
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "700px", margin: "0 auto" }}>
          {subheading}
        </p>
      </div>

      <div style={{ position: "relative" }}
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
      >
        <div style={{ overflow: "hidden", padding: "40px 0" }}>
          <motion.div ref={containerRef} style={{ x, display: "flex", gap: 30, width: "max-content" }}>
            {[...cards, ...cards, ...cards].map((card, i) => (
              <ServiceCard key={i} card={card} stepNumber={(i % cards.length) + 1} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}