"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

// --- Typewriter Component ---
const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-[#0EBAB0]">
      {`${words[index].substring(0, subIndex)}`}
      <span className={`inline-block w-1 h-10 md:h-14 ml-2 bg-[#0EBAB0] align-middle ${blink ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
};

// --- Counter Component ---
const Counter = ({ target, duration = 2, suffix = "" }: { target: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    let totalFrames = duration * 60;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.floor(end * progress));
      if (frame === totalFrames) clearInterval(counter);
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

// --- Animated Hero Section ---
interface AnimatedHeroSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  height?: string;
  alignment?: "left" | "center";
  contentAlignment?: "left" | "center";
  showSearchBar?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

const AnimatedHeroSection: React.FC<AnimatedHeroSectionProps> = ({
  tagline = "Empowering Businesses Through Innovation",
  description = "Transforming businesses with innovative technology solutions, strategic consulting, and world-class digital experiences.",
  primaryCtaText = "Explore Services",
  secondaryCtaText = "Let's Collaborate",
  primaryCtaHref = "#services",
  secondaryCtaHref = "/schedule-call",
  height = "min-h-screen",
  alignment = "left",
  contentAlignment = "left",
  showSearchBar = false,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange = () => {},
  onSearchSubmit = () => {},
}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;
    const connectionDistance = 200;
    const mouseRadius = 300;
    const themeColors = { primary: "#0EBAB0" };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 1.5,
          opacity: Math.random() * 0.5 + 0.3,
          glow: 0,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          p.x -= dx * force * 0.04;
          p.y -= dy * force * 0.04;
          p.glow = Math.min(force, 1);
        } else {
          p.glow *= 0.85;
        }

        ctx.beginPath();
        ctx.shadowBlur = p.glow * 8;
        ctx.shadowColor = themeColors.primary;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.glow > 0.1 ? `rgba(14,186,176,${0.5 + p.glow})` : `rgba(14,186,176,${p.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < connectionDistance) {
            ctx.beginPath();
            const alpha = (1 - dist2 / connectionDistance) * 0.45;
            ctx.strokeStyle = `rgba(7,58,83,${alpha})`;
            ctx.lineWidth = 1.3;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const Stunning3DOffice = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: -5 }}
      transition={{ duration: 1.2 }}
      className="hidden lg:flex flex-1 lg:mt-10 relative h-[600px] perspective-2000 items-center justify-center"
    >
      {/* Top-right terminal */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 right-0 w-[350px] h-[250px] bg-[#073A53]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 font-mono text-[10px] text-[#0EBAB0]"
      >
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="space-y-1">
          <p>{`> npm install aptagon-tech`}</p>
          <p className="text-white/60">{`✔ System Health: 100%`}</p>
          <p className="text-white/60">{`✔ Digital Core: Online`}</p>
        </div>
      </motion.div>

      {/* Center graph */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="relative w-[420px] h-[300px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl z-10 p-8 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#073A53]/60 text-xs font-bold uppercase tracking-widest mb-1">Performance Index</p>
            <h3 className="text-4xl font-black text-[#073A53]"><Counter target={98} suffix="%" /></h3>
          </div>
        </div>
        <div className="flex items-end gap-2 h-24">
          {[60, 85, 45, 100, 75, 90, 65].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
              className="flex-1 bg-gradient-to-t from-[#073A53] to-[#0EBAB0] rounded-t-md"
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom-left stats */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-48 h-24 bg-white rounded-2xl shadow-xl z-20 p-5 border"
      >
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Success Stories</p>
        <p className="text-2xl font-black text-[#073A53]"><Counter target={540} suffix="+" /></p>
      </motion.div>
    </motion.div>
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className={`relative flex items-center overflow-hidden bg-white ${height}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative lg:mt-20 z-10 container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className={`flex flex-col lg:flex-row items-center gap-12`}
        >
          <div className="max-w-3xl flex flex-col items-start">
            <motion.p variants={itemVariants} className="mb-6 text-[#0EBAB0] font-semibold uppercase">
              {tagline}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-[65px] font-black text-[#073A53] leading-[1.25] mb-4 tracking-tighter"
            >
              We Build Digital <br />
              <TypewriterEffect 
                words={[
                  "Solutions That Matter", 
                  "Ecosystems That Scale", 
                  "Experiences That Inspire"
                ]} 
              />
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl mb-10">
              {description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              {showSearchBar ? (
                <div className="w-full max-w-md flex gap-2">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && onSearchSubmit(searchValue)}
                    className="flex-1 px-6 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0EBAB0]"
                  />
                  <button
                    onClick={() => onSearchSubmit(searchValue)}
                    className="px-8 py-3 bg-[#0EBAB0] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Search
                  </button>
                </div>
              ) : (
                <>
                  <motion.a
                    href={primaryCtaHref}
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById("services");
                      if (section) section.scrollIntoView({ behavior: "smooth" });
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="px-10 py-5 bg-gradient-to-br from-[#0EBAB0] to-[#073A53] text-[17px] text-white font-bold rounded-sm shadow-lg"
                  >
                    {primaryCtaText} →
                  </motion.a>
                  <motion.a
                    href={secondaryCtaHref}
                    whileHover={{ borderColor: "#073A53" }}
                    className="px-10 py-5 border-2 border-slate-900 font-bold rounded-sm"
                  >
                    {secondaryCtaText}
                  </motion.a>
                </>
              )}
            </motion.div>
          </div>

          {alignment === "left" && <Stunning3DOffice />}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;