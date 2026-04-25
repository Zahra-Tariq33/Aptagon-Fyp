"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineCog, HiOutlineRefresh, HiOutlineTrendingUp, HiOutlineLightningBolt } from "react-icons/hi";

// --- Typewriter Component ---
const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
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
    const timeout = setTimeout(() => setSubIndex((prev) => prev + (reverse ? -1 : 1)), reverse ? 50 : 100);
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
    let frame = 0;
    const totalFrames = duration * 60;
    const counter = setInterval(() => {
      frame++;
      setCount(Math.floor(target * (frame / totalFrames)));
      if (frame === totalFrames) clearInterval(counter);
    }, 1000 / 60);
    return () => clearInterval(counter);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

// --- Particle Type ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

// --- Main Hero ---
const BusinessHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // --- Particle Background ---
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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
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

  // --- Right 3D Animation ---
  const Stunning3DAutomationHub = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: -5 }}
      transition={{ duration: 1.2 }}
      className="hidden lg:flex flex-1 relative h-[650px] [perspective:2000px] items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[450px] h-[450px] border border-dashed border-[#0EBAB0]/20 rounded-full flex items-center justify-center"
      >
         <HiOutlineCog className="text-[400px] text-[#0EBAB0]/5" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[440px] h-[350px] bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[40px] shadow-2xl z-10 p-10 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#073A53] dark:text-[#0EBAB0] text-[10px] font-black uppercase tracking-[0.3em] mb-1">Efficiency Gain</p>
            <h3 className="text-5xl font-black text-[#073A53] dark:text-white"><Counter target={85} suffix="%" /></h3>
          </div>
          <div className="w-14 h-14 bg-[#073A53] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#0EBAB0]/20">
             <HiOutlineLightningBolt className="text-3xl animate-pulse" />
          </div>
        </div>
        
        <div className="flex gap-4 items-center">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                    <motion.div 
                        animate={{ backgroundColor: ["#073A53", "#0EBAB0", "#073A53"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        className="w-10 h-1 bg-slate-200 rounded-full overflow-hidden"
                    />
                    <div className="w-4 h-4 rounded-full bg-slate-100 border-2 border-[#0EBAB0]" />
                </div>
            ))}
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Syncing Workflows...</p>
        </div>

        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/10">
            <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 mb-2">
                <span>REDUCING OVERHEAD</span>
                <span className="text-[#0EBAB0]">-40%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-[#0EBAB0]" />
            </div>
        </div>
      </motion.div>

      {[{ label: "Data Pipeline", icon: <HiOutlineRefresh />, position: "top-24 left-4", z: 100 },
        { label: "ROI Analytics", icon: <HiOutlineTrendingUp />, position: "bottom-14 right-4", z: 150 }].map((card, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            style={{ translateZ: card.z }}
            className={`absolute ${card.position} px-5 py-3 bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 flex items-center gap-3 z-20`}
          >
            <div className="text-[#0EBAB0] text-xl">{card.icon}</div>
            <span className="text-[10px] font-black uppercase text-[#073A53] dark:text-white tracking-widest">{card.label}</span>
          </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section className="relative flex items-center overflow-hidden bg-white dark:bg-[#0a0a0a] min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 max-w-3xl text-left lg:mt-20">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-[#0EBAB0] font-black uppercase tracking-[0.3em] text-xs">
              Operational Excellence
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-[55px] font-black text-[#073A53] dark:text-white leading-[1.25] mb-6 tracking-tighter">
              Optimal Workflow Method <br />
              <TypewriterEffect words={[
                "Streamline Operations",
                "Intelligent Automation",
                "Enterprise Integration"
              ]} />
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
              We deliver smart automation solutions that optimize business processes, increase efficiency, and provide actionable insights — enabling your teams to work smarter, not harder.
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.dispatchEvent(new Event("openNavbarDropdown"))}
                className="px-10 py-5 bg-[#073A53] text-white font-black rounded-xl shadow-2xl text-xs uppercase tracking-widest group cursor-pointer"
              >
                Explore Services
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </motion.button>

              <Link href="/schedule-call">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(14, 186, 176, 0.1)", scale: 1.05 }}
                  className="px-10 py-5 border-2 border-slate-200 dark:border-white/10 text-[#073A53] dark:text-white font-black rounded-xl text-xs uppercase tracking-widest cursor-pointer"
                >
                  Let&apos;s Collaborate
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Right 3D Animation */}
          <Stunning3DAutomationHub />
        </div>
      </div>
    </section>
  );
};

export default BusinessHero;