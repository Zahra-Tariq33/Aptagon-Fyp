"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// --- Typewriter Effect ---
const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => { setBlink((prev) => !prev); }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) { setTimeout(() => setReverse(true), 2000); return; }
    if (subIndex === 0 && reverse) { setReverse(false); setIndex((prev) => (prev + 1) % words.length); return; }
    const timeout = setTimeout(() => { setSubIndex((prev) => prev + (reverse ? -1 : 1)); }, reverse ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-[#0EBAB0]">
      {`${words[index].substring(0, subIndex)}`}
      <span className={`inline-block w-1 h-10 md:h-14 ml-2 bg-[#0EBAB0] align-middle ${blink ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
};

// --- Professional Live Feedback Component ---
const LiveFeedback = () => {
  const feedbacks = [
    { id: 1, user: "Sarah", text: "Love the new CTA gradient!", color: "bg-pink-500" },
    { id: 2, user: "James", text: "Spacing looks perfect here.", color: "bg-blue-500" },
    { id: 3, user: "Emma", text: "The user flow is so smooth.", color: "bg-orange-500" },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % feedbacks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Collaborator Feed</div>
        <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[8px] font-bold text-green-600">LIVE</span>
        </div>
      </div>

      <div className="relative h-24 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-start gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-full ${feedbacks[active].color} flex items-center justify-center text-white font-black text-xs shadow-inner`}>
              {feedbacks[active].user[0]}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-[#073A53]">{feedbacks[active].user}</span>
                <span className="text-[8px] text-gray-400 italic">Just now</span>
              </div>
              <p className="text-[11px] leading-tight text-slate-600 font-medium">
                "{feedbacks[active].text}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Internal UI/UX Design Dashboard ---
const DesignSystemUI = () => {
  return (
    <div className="flex flex-col h-full space-y-4 pt-10 px-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0EBAB0]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Design Space</span>
          </div>
          <div className="text-sm font-black text-[#073A53]">Modern_SaaS_v2</div>
        </div>
        <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <div className={`w-full h-full bg-gradient-to-tr ${i===1?'from-pink-400 to-red-400':i===2?'from-blue-400 to-indigo-400':'from-teal-400 to-emerald-400'}`} />
                </div>
            ))}
        </div>
      </div>

      <div className="w-full h-36 rounded-3xl bg-[#073A53] p-4 relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col h-full">
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Conversion rate</span>
            <span className="text-white text-2xl font-black mt-1">+12.4%</span>
            
            <div className="mt-auto flex items-end justify-between gap-1.5 h-12">
                {[30, 60, 40, 80, 50, 90, 70].map((h, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ height: 0 }} 
                        animate={{ height: `${h}%` }} 
                        transition={{ delay: i * 0.1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                        className="w-full bg-[#0EBAB0] rounded-t-[4px] shadow-[0_0_10px_rgba(14,186,176,0.5)]" 
                    />
                ))}
            </div>
          </div>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col gap-2">
            <div className="flex gap-1.5">
                {["#0EBAB0", "#073A53", "#EC4899"].map(c => (
                    <div key={c} className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: c }} />
                ))}
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Global Styles</div>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col justify-center items-center group cursor-pointer">
            <motion.svg animate={{ rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#073A53" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></motion.svg>
            <div className="text-[9px] font-bold text-slate-400 uppercase mt-1">Wireframe</div>
        </div>
      </div>

      <LiveFeedback />
    </div>
  );
};

// --- Glamorous 3D Design Mockup ---
const UXUIAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="hidden lg:flex flex-1 relative h-[700px] items-center justify-center"
      style={{ perspective: "1500px" }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[420, 300].map((size, i) => (
          <motion.div
            key={size}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute border border-[#0EBAB0]/10 rounded-full"
            style={{ width: size, height: size, borderStyle: i === 0 ? 'dashed' : 'solid' }}
          />
        ))}
      </div>

      <motion.div
        style={{ rotateY: -15, rotateX: 5 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-[270px] mt-30 h-[500px] bg-white rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(7,58,83,0.18)] border-[8px] border-[#073A53] overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#073A53] rounded-b-3xl z-20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_cyan]" />
        </div>

        <div className="relative w-full h-full bg-white rounded-[2.8rem] overflow-hidden">
            <DesignSystemUI />
            <motion.div 
              animate={{ x: ['-150%', '300%'] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-30"
            />
        </div>
      </motion.div>

      {/* Floating Layer Badge */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-40 right-[30px] z-20 bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-100 shadow-xl min-w-[150px]"
      >
        <div className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Layer Tree</div>
        <div className="space-y-2">
            {["Navigation", "Hero Section", "Buttons"].map((layer, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded ${i===0?'bg-[#0EBAB0]':i===1?'bg-[#EC4899]':'bg-blue-500'}`} />
                    <div className="w-full h-1.5 bg-slate-100 rounded" />
                </div>
            ))}
        </div>
      </motion.div>

      {/* Floating Cursor/Reviewer Badge */}
      <motion.div 
        animate={{ x: [0, 20, 0] }} 
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-28 left-[50px] z-20 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-slate-100 shadow-2xl flex items-center gap-3"
      >
        <div className="flex flex-col items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0EBAB0"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z"/></svg>
            <div className="text-[8px] font-bold bg-[#0EBAB0] text-white px-1 rounded">Alex</div>
        </div>
        <div>
            <div className="text-[10px] font-black text-[#073A53]">Prototype</div>
            <div className="text-[8px] text-[#0EBAB0] font-bold tracking-tight">Status: Reviewing</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedHeroSection: React.FC = () => {
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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Canvas background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#0EBAB0]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col mt-20 lg:flex-row items-center gap-16 lg:gap-14">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left"
          >
            <span className="inline-block px-5 py-2.5 rounded-full bg-[#0EBAB0]/10 text-[#0EBAB0] text-[10px] font-black tracking-[0.3em] mb-10 uppercase border border-[#0EBAB0]/20">
              Future-Forward UI/UX Agency
            </span>
            
           <h1 className="text-6xl lg:text-6xl font-black text-[#073A53] leading-[1.25] mb-8 tracking-tighter">
  UX/UI Design Studio
  <br />
  <TypewriterEffect words={["User Experience Flow", "Interface Innovation", "Creative Strategy"]} />
</h1>
            
            <p className="text-xl mb-12 max-w-xl leading-relaxed font-medium">
              We craft intuitive and visually stunning digital experiences that connect users to your brand.  
    Our UX/UI solutions focus on usability, engagement, and aesthetic excellence.  
    Transform your digital platforms with innovative design strategies that inspire action.
            </p>
            
            <div className="flex flex-wrap gap-5">
              <motion.button 
                onClick={handleExploreClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-[#073A53] text-white font-black rounded-2xl shadow-2xl shadow-[#073A53]/20"
              >
                Explore Services
              </motion.button>
              
              <Link href="/schedule-call">
                <motion.button 
                  whileHover={{ backgroundColor: "#f8fafc", scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 border-2 border-slate-200 text-[#073A53] font-black rounded-2xl"
                >
                  Let's Collaborate
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <UXUIAnimation />
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;