"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineStar, HiOutlineLightningBolt, HiOutlineShieldCheck } from "react-icons/hi";
import Link from "next/link";

// --- Types ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

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

interface AnimatedHeroSectionProps {
  description?: string;
  height?: string;
}

const MobileHero: React.FC<AnimatedHeroSectionProps> = ({
  height = "min-h-screen",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Function to trigger the Navbar Dropdown
  const handleExploreClick = () => {
    window.dispatchEvent(new CustomEvent("openNavbarDropdown"));
  };

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

  const Stunning3DMobileApp = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: -12 }}
      transition={{ duration: 1.2 }}
      className="hidden lg:flex flex-1 relative h-[650px] items-center justify-center [perspective:2000px]"
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[290px] h-[530px] bg-[#073A53] rounded-[55px] border-[10px] border-[#1e293b] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-10"
      >
        <div className="flex-1 bg-[#f8fafc] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0EBAB0] to-[#073A53]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#073A53]">Welcome Back</span>
                <span className="text-[8px] text-slate-400 font-bold">FAIZAN A.</span>
              </div>
            </div>
            <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px]">🔔</div>
          </div>

          <div className="h-32 w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
            <span className="text-[9px] font-black text-[#073A53] uppercase tracking-widest">Active Revenue</span>
            <div className="flex items-end gap-1.5 h-16">
              {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                <motion.div key={i} animate={{ height: [`${h}%`, `${h - 15}%`, `${h}%`] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} className="flex-1 bg-[#0EBAB0]/20 rounded-t-sm relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#0EBAB0]" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
              <p className="text-[7px] font-bold uppercase">Growth</p>
              <p className="text-sm text-[#000000]">+24%</p>
            </div>
            <div className="bg-[#073A53] p-3 rounded-xl shadow-sm">
              <p className="text-[7px] font-bold text-white uppercase">Session</p>
              <p className="text-sm text-white">12.4k</p>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <span className="text-[9px] font-black text-slate-400 uppercase">Recent Activity</span>
            {[1, 2, 3].map(i => (
              <div key={i} className="h-10 w-full bg-white rounded-xl border border-slate-50 flex items-center px-3 gap-3 shadow-sm">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] ${i === 1 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>✓</div>
                <div className="flex flex-col"><span className="text-[8px] font-bold text-[#073A53]">Task Completed</span><span className="text-[7px] text-slate-400 font-medium">Updated 2m ago</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-14 bg-white border-t border-slate-100 flex items-center justify-around px-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="w-5 h-5 rounded bg-slate-100" />)}
        </div>
      </motion.div>

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-40px] top-1/4 w-40 p-4 bg-white/90 backdrop-blur-xl border border-white rounded-2xl shadow-2xl z-20 flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-500 text-xl">
          <HiOutlineStar />
        </div>
        <div>
          <h4 className="text-xl font-black text-[#073A53]">4.9</h4>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Global Rating</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-12 top-1/3 w-44 p-4 bg-[#0EBAB0] text-white rounded-3xl shadow-2xl z-20"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><HiOutlineLightningBolt /></div>
          <p className="text-[10px] font-black uppercase tracking-tighter">Ultra Speed</p>
        </div>
        <p className="text-[9px] font-medium opacity-80 leading-tight">Optimized for <br /> 120 FPS Rendering</p>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-2 right-3 w-48 p-4 bg-[#073A53]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl z-20 flex flex-col gap-2"
      >
        <div className="flex items-center gap-2">
          <HiOutlineShieldCheck className="text-[#0EBAB0]" />
          <span className="text-[9px] font-bold text-white uppercase tracking-widest">End-to-End Encrypted</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div animate={{ width: "100%" }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-[#0EBAB0]" />
        </div>
      </motion.div>

      <div className="absolute w-[550px] h-[550px] border border-[#0EBAB0]/10 rounded-full [transform:rotateX(75deg)] z-0" />
      <div className="absolute w-[450px] h-[450px] border border-dashed border-[#073A53]/20 rounded-full [transform:rotateX(65deg)] z-0" />
    </motion.div>
  );

  return (
    <section className={`relative flex items-center overflow-hidden bg-white ${height}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />
      <div className="relative lg:mt-10 z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-3xl flex flex-col items-start text-left">
            {/* 1. Tagline Upgrade (3 Words) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 text-[#0EBAB0] font-black uppercase tracking-[0.3em] text-[10px] px-4 py-2 bg-[#0EBAB0]/5 border border-[#0EBAB0]/10 rounded-full"
            >
              Scale. Build. Disrupt.
            </motion.p>

            {/* 2. Main Heading: 3 Lines with Typewriter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
  <h2 className="text-4xl lg:text-6xl font-black text-[#073A53] leading-[1.25] tracking-tighter uppercase mb-2">
    Mobile App Design
    <br />
    <TypewriterEffect words={["Intuitive User Flow",  "Innovative App Ideas", "Smart App Features"]} />
  </h2>
</motion.div>

            {/* 3. Description Upgrade */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[14px] md:text-xl  mb-10 leading-relaxed font-medium"
            >
              Explore cutting-edge app features that enhance engagement and usability.  
    We combine creativity with the latest technology to build standout apps.  
    Make your mobile app a must-have tool for users every day.
            </motion.p>

            <div className="flex flex-wrap gap-5">
              <motion.button
                onClick={handleExploreClick}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 bg-[#073A53] text-white font-black rounded-xl shadow-2xl text-xs uppercase tracking-widest"
              >
                Explore Services →
              </motion.button>

              <Link href="/schedule-call">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(14,186,176,0.1)", scale: 1.05 }}
                  className="px-10 py-5 border-2 border-slate-200 text-[#073A53] font-black rounded-xl text-xs uppercase tracking-widest"
                >
                  Let's Collaborate
                </motion.button>
              </Link>
            </div>
          </div>

          <Stunning3DMobileApp />
        </div>
      </div>
    </section>
  );
};

export default MobileHero;