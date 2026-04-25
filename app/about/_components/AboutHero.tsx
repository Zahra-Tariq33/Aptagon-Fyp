"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineLightBulb, 
  HiOutlineTrendingUp, 
  HiOutlineUserGroup, 
  HiOutlineSparkles,
  HiOutlineShieldCheck
} from "react-icons/hi";
import Link from "next/link";

const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Cursor blink
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkTimer);
  }, []);

  // Typing logic
  useEffect(() => {

    if (!reverse && subIndex === words[index].length) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);

  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-[#0EBAB0]">
      {words[index].substring(0, subIndex)}
      <span
        className={`inline-block w-1 h-10 md:h-14 ml-2 bg-[#0EBAB0] align-middle ${
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

const AboutHero = () => {
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
    const connectionDistance = 180;
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

        ctx.fillStyle =
          p.glow > 0.1
            ? `rgba(14,186,176,${0.5 + p.glow})`
            : `rgba(14,186,176,${p.opacity})`;

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8fafc] py-10 lg:py-0">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />

      {/* Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#0EBAB0]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#073A53]/10 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 lg:basis-1/2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="text-[#0EBAB0] font-bold tracking-widest uppercase text-[10px] md:text-xs mt-12">
                Innovation in Motion
              </span>
            </motion.div>

           <motion.h1
                       
                        className="text-6xl md:text-[65px] font-black text-[#073A53] leading-[1.25] mb-4 tracking-tighter"
                      >
                       Driven by Innovation, 
                        <br />
                        <TypewriterEffect 
                          words={[
                      "Defined by Excellence",
"Engineering the Future",
"Built for Growth"
                          ]} 
                        />
                      </motion.h1>

            <p className="text-lg md:text-xl font-medium mb-10 leading-relaxed mx-auto lg:mx-0 max-w-2xl">
            Aptagon Technologies provides innovative digital solutions that accelerate business growth.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-[#073A53] text-white font-bold rounded-2xl shadow-[0_20px_40px_-10px_rgba(7,58,83,0.3)] transition-all uppercase tracking-wider text-sm"
              >
              <Link href="/schedule-call">
  <span>
    Get In Touch →
  </span>
</Link>
              </motion.button>

             <motion.button
  whileHover={{ scale: 1.05, backgroundColor: "rgba(14,186,176,0.1)" }}
  whileTap={{ scale: 0.95 }}
  onClick={() =>
    document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })
  }
  className="px-10 py-5 border-2 border-[#0EBAB0] text-[#0EBAB0] font-bold rounded-2xl transition-all uppercase tracking-wider text-sm"
>
  Meet Our Team
</motion.button>
            </div>
          </motion.div>

          {/* RIGHT SIDE: GLAMOROUS 3D QUANTUM CORE */}
          <div className="flex-1 lg:basis-1/2 relative h-[600px] mt-12 w-full flex items-center justify-center [perspective:2000px]">
            <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-[#0EBAB0]/20 to-transparent rounded-full blur-3xl" />

            <div className="relative w-80 h-80 flex items-center justify-center [transform-style:preserve-3d]">
              {/* Spinning Orbit Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotateX: 360, rotateY: 360 }}
                  transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-[#0EBAB0]/30 rounded-full"
                  style={{ rotateZ: `${i * 45}deg`, scale: 1 + i * 0.1 }}
                />
              ))}

              {/* PRIMARY QUANTUM SPHERE */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotateY: [0, 360] }}
                transition={{
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                className="w-56 h-56 relative z-10 [transform-style:preserve-3d]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#073A53] via-[#0EBAB0] to-[#073A53] rounded-3xl shadow-[0_0_100px_rgba(14,186,176,0.5)] flex items-center justify-center overflow-hidden border border-white/20">
                  <HiOutlineSparkles className="text-white text-8xl animate-pulse" />
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 animate-[shine_5s_infinite]" />
                </div>
              </motion.div>

              {/* Floating Info Cards with infinite orbit */}
              {[
                { icon: <HiOutlineLightBulb />, title: "Strategy", radius: 220, angle: 0, delay: 0 },
                { icon: <HiOutlineTrendingUp />, title: "Velocity", radius: 240, angle: 90, delay: 0.5 },
                { icon: <HiOutlineUserGroup />, title: "Culture", radius: 200, angle: 180, delay: 1 },
                { icon: <HiOutlineShieldCheck />, title: "Security", radius: 200, angle: 270, delay: 1.5 },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: [
                      card.radius * Math.cos((card.angle * Math.PI) / 180),
                      card.radius * Math.cos((card.angle * Math.PI) / 180 + 0.2),
                      card.radius * Math.cos((card.angle * Math.PI) / 180),
                    ],
                    y: [
                      card.radius * Math.sin((card.angle * Math.PI) / 180),
                      card.radius * Math.sin((card.angle * Math.PI) / 180 + 0.2),
                      card.radius * Math.sin((card.angle * Math.PI) / 180),
                    ],
                    rotateY: [-5, 5, -5],
                  }}
                  transition={{
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay },
                    rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay },
                    scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                  }}
                  className="absolute w-44 p-6 bg-white/70 backdrop-blur-2xl border border-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col items-center gap-3 z-20 group hover:bg-white transition-colors cursor-default"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#073A53] to-[#0EBAB0] rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[12px] font-black uppercase tracking-[0.3em] text-[#073A53]">{card.title}</span>
                  <div className="w-8 h-1 bg-[#0EBAB0]/30 rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% { transform: translate(-50%, -50%) rotate(45deg); }
          100% { transform: translate(150%, 150%) rotate(45deg); }
        }
      `}</style>

    </section>
  );
};

export default AboutHero;