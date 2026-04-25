"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

// --- Internal Typewriter Component for the Heading ---
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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

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

const LlmHero: React.FC<AnimatedHeroSectionProps> = ({
  tagline = "Engineering Intelligence with Large Language Models",
  heading = "LLM Development & Training",
  description = "Empowering businesses with intelligent, domain-specific LLMs designed to understand context, generate insights, and automate complex tasks with precision.",
  primaryCtaText = "Start Training",
  secondaryCtaText = "Our Models",
  primaryCtaHref = "#",
  secondaryCtaHref = "#",
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

  // --- UPDATED 3D LLM ANIMATION ---
  const Stunning3DLLMHub = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: -5 }}
      transition={{ duration: 1.2 }}
      className="hidden lg:flex flex-1 lg:mt-10 relative h-[600px] perspective-2000 items-center justify-center"
    >
      {/* Floating Token Boxes (Representing LLM Tokens) */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -30, 0], 
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            rotateX: [0, 10, 0] 
          }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          className="absolute w-24 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-[10px] font-mono text-[#0EBAB0] shadow-xl z-20"
          style={{ 
            top: 100 + i * 80, 
            left: i % 2 === 0 ? "10%" : "70%" 
          }}
        >
          {`token_${Math.random().toString(36).substring(7)}`}
        </motion.div>
      ))}

      {/* Training Stats Card */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 right-0 w-[350px] h-[220px] bg-[#073A53]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 font-mono text-[10px] text-[#0EBAB0] z-10"
      >
        <div className="flex gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0EBAB0]" />
          <span className="text-[9px] uppercase tracking-widest opacity-60 font-bold">Fine-Tuning In Progress</span>
        </div>
        <div className="space-y-2">
          <p>{`> loading dataset: context_aware_v2`}</p>
          <p className="text-white/60">{`> optimizer: AdamW (lr=2e-5)`}</p>
          <p className="text-white/60">{`✔ tokens processed: 4.2B`}</p>
          <p className="text-white animate-pulse">{`> epoch 14/20: loss decreasing...`}</p>
        </div>
      </motion.div>

      {/* Central Neural Interface Card */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="relative w-[440px] h-[320px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-2xl z-10 p-10 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#073A53]/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Knowledge Accuracy</p>
            <h3 className="text-5xl font-black text-[#073A53]"><Counter target={99} suffix="%" /></h3>
          </div>
          <div className="w-14 h-14 bg-[#073A53] rounded-2xl flex items-center justify-center text-white shadow-lg">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
          </div>
        </div>
        
        {/* Animated Logic Waves */}
        <div className="flex items-end gap-3 h-24">
          {[40, 95, 60, 100, 80, 55, 90, 70, 85].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              className="flex-1 bg-gradient-to-t from-[#073A53] to-[#0EBAB0] rounded-t-lg"
            />
          ))}
        </div>
      </motion.div>

      {/* Domain Logic Badge */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-52 h-24 bg-white rounded-3xl shadow-xl z-20 p-6 border flex flex-col justify-center"
      >
        <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Context Window</p>
        <p className="text-xl font-black text-[#073A53]"><Counter target={128} suffix="k Tokens" /></p>
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
            <motion.p variants={itemVariants} className="mb-6 text-[#0EBAB0] font-semibold uppercase tracking-widest">
              {tagline}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-[65px] font-black text-[#073A53] leading-[1.2] mb-6 tracking-tighter"
            >
              LLM Development{" "}
              <br />
              <TypewriterEffect 
                words={[
                  "& Advanced Training", 
                  "& Domain Fine-Tuning", 
                  "& Cognitive Systems"
                ]} 
              />
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              {description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <motion.a
                href={primaryCtaHref}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 bg-[#0EBAB0] text-white font-bold rounded-xl shadow-lg"
              >
                {primaryCtaText} →
              </motion.a>
              <motion.a
                href={secondaryCtaHref}
                whileHover={{ borderColor: "#073A53" }}
                className="px-10 py-5 border-2 border-slate-300 text-slate-700 font-bold rounded-xl"
              >
                {secondaryCtaText}
              </motion.a>
            </motion.div>
          </div>

          {alignment === "left" && <Stunning3DLLMHub />}
        </motion.div>
      </div>
    </section>
  );
};

export default LlmHero;