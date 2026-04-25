"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// --- Internal Typewriter Component ---
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
    let frame = 0;
    const totalFrames = duration * 60;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.floor(target * progress));
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
  height?: string;
  alignment?: "left" | "center";
}

const SqaHero: React.FC<AnimatedHeroSectionProps> = ({
  tagline = "Quality-First Engineering Excellence",
  heading = "Delivering Flawless Software", 
  description = "We bridge the gap between development and deployment with precision testing. Our automated QA frameworks eliminate vulnerabilities, ensuring your software is high-performing and ready for market scale.",
  primaryCtaText = "Explore Services",
  secondaryCtaText = "Let's Collaborate",
  height = "min-h-screen",
  alignment = "left",
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

  const Stunning3DSQAAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: -5 }}
      transition={{ duration: 1.2 }}
      className="hidden lg:flex flex-1 lg:mt-10 relative h-[600px] perspective-2000 items-center justify-center"
    >
      {/* Automation Logs Terminal */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 w-[350px] h-[250px] bg-[#073A53]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5 font-mono text-[10px] text-[#0EBAB0] z-20"
      >
        <div className="flex gap-1.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="space-y-1.5 overflow-hidden">
          <p>{`> executing automated_test_suite...`}</p>
          <p className="text-white/60">{`✔ UI Performance: PASS`}</p>
          <p className="text-white/60">{`✔ API Security: PASS`}</p>
          <p className="text-white/60">{`✔ Load Stability: PASS`}</p>
          <p className="text-white mt-4 animate-pulse">{`> preparing final_delivery_package_`}</p>
        </div>
      </motion.div>

      {/* Quality Shield Card */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[420px] h-[320px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-2xl z-10 p-10 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start">
          <div className="z-10">
            <p className="text-[#073A53]/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Stability Index</p>
            <h3 className="text-5xl font-black text-[#073A53]"><Counter target={100} suffix="%" /></h3>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-[#0EBAB0] flex items-center justify-center text-white shadow-[0_10px_20px_rgba(14,186,176,0.3)]">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
          </div>
        </div>
        
        <div className="relative">
          <p className="text-[10px] font-bold text-[#073A53] uppercase mb-3">Deployment Pipeline</p>
          <div className="h-2 w-full bg-[#073A53]/10 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#0EBAB0] to-transparent" 
            />
          </div>
          <div className="flex justify-between mt-2">
            {["Build", "Test", "Staging", "Live"].map((step, i) => (
               <span key={i} className="text-[8px] font-black text-slate-400 uppercase">{step}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Delivery Success Badge */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 w-52 h-24 bg-white rounded-3xl shadow-xl z-20 p-6 border flex flex-col justify-center gap-1"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Reliable Delivery</p>
        </div>
        <p className="text-xl font-black text-[#073A53]">Zero Downtime</p>
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
      <div className="relative lg:mt-20 z-10 container mx-auto px-3">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="flex flex-col lg:flex-row items-center gap-12">
          <div className="max-w-3xl flex flex-col items-start">
            <motion.p variants={itemVariants} className="mb-6 text-[#0EBAB0] font-semibold uppercase tracking-widest">{tagline}</motion.p>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-[55px] font-black text-[#073A53] leading-[1.25] mb-6 tracking-tighter">
              {heading} <br />
              <TypewriterEffect words={["QA Excellence", "Bug-Free Code", "Rapid Delivery"]} />
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">{description}</motion.p>
            <div className="flex flex-wrap gap-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.dispatchEvent(new Event("openNavbarDropdown"))}
                className="px-10 py-5 bg-[#0EBAB0] text-white font-bold rounded-xl shadow-lg cursor-pointer"
              >
                {primaryCtaText} →
              </motion.button>
              <Link href="/schedule-call">
                <motion.button
                  whileHover={{ borderColor: "#073A53", scale: 1.05 }}
                  className="px-10 py-5 border-2 border-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  {secondaryCtaText}
                </motion.button>
              </Link>
            </div>
          </div>
          {alignment === "left" && <Stunning3DSQAAnimation />}
        </motion.div>
      </div>
    </section>
  );
};

export default SqaHero;