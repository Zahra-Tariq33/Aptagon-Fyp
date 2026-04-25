"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineChatAlt2, HiArrowRight } from "react-icons/hi";
import Link from "next/link";

// --- Interfaces ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

// --- Internal Typewriter Component ---
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

// --- Counter Component ---
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

const ReachUsHero = () => {
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

  const ConnectivityHub3D = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="hidden pt-20 lg:flex flex-1 relative h-[600px] items-center justify-center [perspective:2000px]"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#073A53] via-[#0EBAB0] to-[#073A53] opacity-20 blur-3xl"
      />

      <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] border border-[#0EBAB0]/20 rounded-full"
            style={{ rotateZ: `${i * 45}deg` } as any}
          />
        ))}

        {[
          { icon: <HiOutlineMail />, label: "Email", val: "hr@aptagon.com", x: -180, y: -120, z: 100 },
          { icon: <HiOutlinePhone />, label: "Call Us", val: "+923704640036", x: 200, y: 50, z: 150 },
          { icon: <HiOutlineLocationMarker />, label: "Visit", val: "Okara, Pakistan", x: -100, y: 180, z: 50 },
          { icon: <HiOutlineChatAlt2 />, label: "Support", val: "Live 24/7", x: 150, y: -180, z: 120 },
        ].map((card, i) => (
          <motion.div
            key={i}
            animate={{ 
                y: [card.y - 20, card.y + 20, card.y - 20],
                rotateY: [0, 10, 0]
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            style={{ x: card.x, y: card.y, translateZ: card.z } as any}
            className="absolute w-48 p-5 bg-white/70 border border-white rounded-[2rem] shadow-2xl flex flex-col items-center gap-3 z-10 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#073A53] to-[#0EBAB0] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
              {card.icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#073A53]">{card.label}</p>
            <p className="text-[11px] font-bold text-center text-slate-600">{card.val}</p>
          </motion.div>
        ))}

        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 rounded-full border-2 border-dashed border-[#0EBAB0]/40 flex items-center justify-center"
        >
          <div className="w-32 h-32 rounded-full bg-[#073A53] flex flex-col items-center justify-center text-white shadow-[0_0_50px_rgba(14,186,176,0.5)]">
            <span className="text-3xl font-black"><Counter target={99} suffix="%" /></span>
            <span className="text-[8px] uppercase tracking-widest font-bold">Response Rate</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8fafc]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 relative z-10 py-20 lg:py-0 ">
        <div className="flex flex-col lg:flex-row lg:mt-0 items-center justify-between gap-16">
          
          {/* --- UPGRADED LEFT SIDE CONTENT --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 mt-40 text-center lg:text-left"
          >
            {/* Pulsing Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center  gap-2 px-4 py-2 rounded-full bg-[#0EBAB0]/10 border border-[#0EBAB0]/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0EBAB0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0EBAB0]"></span>
              </span>
              <p className="text-[#0EBAB0] font-bold uppercase tracking-[0.2em] text-[10px]">
                Global Tech Solutions
              </p>
            </motion.div>
            
            {/* Heading: 3 words top, dynamic words bottom */}
            <h1 className="text-5xl md:text-6xl font-black leading-[1.25] text-[#073A53] leading-[1.05] mb-8 tracking-tighter">
              <span className="block">Connect With Experts</span>
              <span className="block">
               <TypewriterEffect words={["We Solve Problems", "We Drive Solutions", "Support Without Limits"]} />
              </span>
            </h1>
            
            {/* 2-Line Description */}
            <p className="text-lg md:text-xl font-medium mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Expert engineering meets creative vision. We bridge the gap between complex 
              
              technology and seamless user experiences to scale your business.
            </p>

            {/* Premium Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(7,58,83,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-[#073A53] text-white font-bold rounded-2xl overflow-hidden transition-all"
              >
              <Link href="/schedule-call">
  <span className="relative z-10 flex items-center gap-2">
    Schedule a Call 
    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
  </span>

               </Link>
                <div className="absolute inset-0 bg-[#0EBAB0] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>

              <motion.button 
                whileHover={{ backgroundColor: "rgba(14,186,176,0.05)", borderColor: "#073A53" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-[#0EBAB0] text-[#0EBAB0] hover:text-[#073A53] font-bold rounded-2xl transition-all"
              >
                 <Link href="/schedule-call">
             <span>   Quick Inquiry</span>
                </Link>
              </motion.button>
            </div>

            {/* Social Proof / Trust */}
          <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
  className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-slate-400"
>
  <div className="flex -space-x-3">
    {[
      // 1. Pakistani Office Worker - Man
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=150&h=150&auto=format&fit=crop",
      // 2. Pakistani Office Worker - Woman
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop",
      // 3. Pakistani Office Worker - Man
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop",
      // 4. Pakistani Office Worker - Woman
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=150&h=150&auto=format&fit=crop"
    ].map((imgUrl, i) => (
      <div key={i} className="relative w-10 h-10">
        <img 
          src={imgUrl} 
          alt={`Professional Partner ${i + 1}`}
          className="w-full h-full rounded-full object-cover shadow-lg grayscale-[20%] hover:grayscale-0 transition-all duration-300"
          style={{ 
            border: "none",
            backgroundColor: "#073A53"
          }}
        />
      </div>
    ))}
  </div>
  <div className="flex flex-col">
    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#073A53]">
      Trusted by 200+ Global Partners
    </p>
    <div className="flex gap-1 mt-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-[#0EBAB0] text-[9px]">★</span>
      ))}
    </div>
  </div>
</motion.div>
          </motion.div>

          <ConnectivityHub3D />
        </div>
      </div>
    </section>
  );
};

export default ReachUsHero;