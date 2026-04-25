"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";

export type HeroBackgroundAnimationProps = {
  nodeCount?: number;
  connectionDistance?: number;
  cursorInfluence?: number;
  nodeSpeed?: number;
  accentColor?: string;
  lineOpacity?: number;
  cursorAttractionStrength?: number;
};

export default function HeroBackgroundAnimation({
  nodeCount = 50,
  connectionDistance = 200,
  cursorInfluence = 180,
  nodeSpeed = 0.5,
  accentColor = "59, 130, 246",
  lineOpacity = 0.5,
  cursorAttractionStrength = 1.5,
}: HeroBackgroundAnimationProps) {
  const style: CSSProperties = {
    opacity: 1,
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={style}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-900/30 to-blue-950/50" />
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={`rgba(${accentColor}, ${lineOpacity})`}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 6 + nodeSpeed, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0">
        {Array.from({ length: Math.max(6, Math.min(24, Math.floor(nodeCount / 3))) }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[rgba(14,186,176,0.35)]"
            style={{
              width: 10 + (i % 5) * 6,
              height: 10 + (i % 5) * 6,
              left: `${(i * 13) % 90}%`,
              top: `${(i * 29) % 90}%`,
              filter: "blur(0px)",
            }}
            animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
            transition={{
              duration: 4 + (i % 6) * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        ))}
      </div>
    </div>
  );
}

