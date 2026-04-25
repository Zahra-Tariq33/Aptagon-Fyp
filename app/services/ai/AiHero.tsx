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

const AiHero: React.FC<AnimatedHeroSectionProps> = ({
  tagline = "Empowering Businesses Through Innovation",
  heading = "AI & Generative Solutions",
  description = "We build powerful AI solutions that automate workflows, enhance decision-making, and accelerate digital transformation. Our technologies help businesses scale faster with intelligent systems and modern innovation.",
  primaryCtaText = "Explore Services",
  secondaryCtaText = "Let's Collaborate",
  primaryCtaHref = "#", 
  secondaryCtaHref = "/schedual-call",
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

  // Function to trigger Navbar dropdown via event
  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent("openNavbarDropdown");
    window.dispatchEvent(event);
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

  // --- 3D AI ANIMATION COMPONENT ---
  const Stunning3DAIAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: -5 }}
      transition={{ duration: 1.2 }}
      className="hidden lg:flex flex-1 lg:mt-10 relative h-[600px] perspective-2000 items-center justify-center"
    >
      <div className="absolute w-80 h-80 bg-[#0EBAB0]/20 rounded-full blur-[100px] animate-pulse" />
      <motion.div
        animate={{ rotateY: 360, rotateX: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="relative w-56 h-56 flex items-center justify-center [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0EBAB0]/40 [transform:rotateX(60deg)]" />
        <div className="absolute inset-0 rounded-full border-2 border-[#073A53]/30 [transform:rotateY(60deg)]" />
        <div className="absolute inset-0 rounded-full border border-[#0EBAB0]/60 [transform:rotateZ(60deg)]" />
        <div className="absolute w-20 h-20 bg-gradient-to-br from-[#0EBAB0] to-[#073A53] rounded-full shadow-[0_0_60px_rgba(14,186,176,0.9)] animate-pulse" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 w-[350px] h-[250px] bg-[#073A53] border border-white rounded-2xl shadow-2xl p-5 text-[10px] text-white z-20"
      >
        <div className="flex gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="space-y-2">
          <p>{`> initializing neural_engine...`}</p>
          <p className="text-white/60">{`> load_model('GenAI_v4.5')`}</p>
          <p className="text-white/60">{`✔ weights synced & optimized`}</p>
          <p className="text-white/60">{`✔ cognitive framework online`}</p>
          <p className="text-white mt-4 animate-pulse">{`> awaiting prompt_`}</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-0 w-[380px] bg-white/50 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_30px_60px_rgba(7,58,83,0.15)] z-30 p-6"
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#073A53] to-[#0EBAB0] flex items-center justify-center text-white shadow-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <p className="text-[#073A53] font-black text-sm uppercase tracking-wide">Gen-AI Processing</p>
            <p className="text-[10px] font-bold text-[#0EBAB0] uppercase tracking-widest">Model Training Active</p>
          </div>
        </div>
        <div className="space-y-2">
           <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
              <span>Deep Learning Progress</span>
              <span className="text-[#073A53]">99%</span>
           </div>
           <div className="h-2 w-full bg-white rounded-full overflow-hidden">
             <motion.div
               animate={{ width: ["0%", "100%", "0%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="h-full bg-gradient-to-r from-[#073A53] to-[#0EBAB0]"
             />
           </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 left-10 w-44 bg-white rounded-2xl shadow-xl z-20 p-4 border border-slate-100 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full border-4 border-[#0EBAB0] flex items-center justify-center">
          <span className="text-sm font-black text-[#073A53]"><Counter target={99} suffix="%" /></span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-wider">Prediction<br/>Accuracy</p>
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
              className="text-6xl md:text-[65px] font-black text-[#073A53] leading-[1.25] mb-6 tracking-tighter"
            >
              Smart AI Systems
              <br />
              <TypewriterEffect 
                words={[
                  "AI Powered Automation",
                  "Smart Business process",
                  "Enterprise AI Integration"
                ]} 
              />
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
              {description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <motion.button
                onClick={handleExploreClick}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 bg-[#0EBAB0] text-white font-bold rounded-xl shadow-lg cursor-pointer"
              >
                {primaryCtaText} →
              </motion.button>
              
              <motion.a
                href={secondaryCtaHref}
                whileHover={{ borderColor: "#073A53" }}
                className="px-10 py-5 border-2 border-slate-300 text-slate-700 font-bold rounded-xl"
              >
                {secondaryCtaText}
              </motion.a>
            </motion.div>
          </div>

          {alignment === "left" && <Stunning3DAIAnimation />}
        </motion.div>
      </div>
    </section>
  );
};

export default AiHero;