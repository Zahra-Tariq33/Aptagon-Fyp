"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

// --- Internal Typewriter Component ---
const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor logic
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
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
      <span
        className={`inline-block w-1 h-8 md:h-12 ml-2 bg-[#0EBAB0] align-middle ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

// --- Particle Interface ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

const SchedualHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // --- Animation Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 120;
    const connectionDistance = 180;
    const mouseRadius = 250;

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
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.4 + 0.2,
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
          p.x -= dx * force * 0.03;
          p.y -= dy * force * 0.03;
          p.glow = Math.min(force, 1);
        } else {
          p.glow *= 0.9;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 186, 176, ${p.opacity + p.glow})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < connectionDistance) {
            ctx.beginPath();
            const alpha = (1 - dist2 / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(7, 58, 83, ${alpha})`;
            ctx.lineWidth = 0.8;
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

  // Correctly Typed Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-white min-h-[85vh]">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
      />

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full flex flex-col items-center"
        >
          {/* Tagline */}
         <motion.div variants={itemVariants} className="flex mt-24 items-center gap-3 mb-4">
            <span className="w-12 h-[2px] bg-[#0EBAB0] rounded-full" />
            <span className="text-[#0EBAB0] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">Let&apos;s Innovate Together</span>
            <span className="w-12 h-[2px] bg-[#0EBAB0] rounded-full" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-5xl lg:text-6xl font-black text-[#073A53] leading-[1.1] mb-4 tracking-tighter"
          >
            Schedule A <br />
            <TypewriterEffect
              words={["Call With Experts", "Discovery Session", "Strategy Meeting"]}
            />
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-lg  mb-6 max-w-4xl leading-relaxed font-medium mx-auto"
          >
            At Aptagon Technologies, our team drives every innovation. We&apos;re
            passionate developers, designers, and strategists collaborating to craft
            impactful digital solutions. With creativity and expertise, we turn
            ideas into seamless experiences that help businesses grow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 w-full justify-center items-center"
          >
           <motion.button
  whileHover={{
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(14, 186, 176, 0.25)",
  }}
  whileTap={{ scale: 0.95 }}
  onClick={() =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }
  className="w-full sm:w-auto px-12 py-5 bg-[#0EBAB0] text-white font-black rounded-2xl shadow-xl transition-all"
>
  Book My Slot →
</motion.button>
           <motion.button
  whileHover={{ backgroundColor: "#f8fafc", borderColor: "#073A53" }}
  whileTap={{ scale: 0.95 }}
  onClick={() => window.open("https://wa.me/923704640036", "_blank")}
  className="w-full sm:w-auto px-12 py-5 border-2 border-slate-200 text-[#073A53] font-black rounded-2xl transition-all"
>
  Contact Support
</motion.button>
          </motion.div>

          {/* Badge */}
          
        </motion.div>
      </div>
    </section>
  );
};

export default SchedualHero;