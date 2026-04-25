"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link"; // Next.js Link import kiya

/* ── Typewriter Component for Heading ── */
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
    <span style={{ color: "#0EBAB0" }}>
      {`${words[index].substring(0, subIndex)}`}
      <span 
        style={{ 
          display: "inline-block", 
          width: "4px", 
          height: "3.5rem", 
          marginLeft: "8px", 
          backgroundColor: "#0EBAB0", 
          verticalAlign: "middle",
          opacity: blink ? 1 : 0 
        }} 
      />
    </span>
  );
};

interface Particle {
  x: number; y: number; vx: number; vy: number; size: number; opacity: number; glow: number;
}

/* ── Counter Hook ── */
function useCounter(target: number, duration = 2, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const c = animate(0, target, {
      duration, ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setCount(Math.floor(v)),
    });
    return () => c.stop();
  }, [start, target, duration]);
  return count;
}

/* ── Dashboard Typing Hook ── */
const WORDS = ["React Apps", "Next.js Sites", "REST APIs", "Dashboards", "E-Commerce"];
function useTyping() {
  const [wi, setWi] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = WORDS[wi];
    let t: any;
    if (!del && text.length < w.length) t = setTimeout(() => setText(w.slice(0, text.length + 1)), 85);
    else if (!del && text.length === w.length) t = setTimeout(() => setDel(true), 1600);
    else if (del && text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 42);
    else { setDel(false); setWi(i => (i + 1) % WORDS.length); }
    return () => clearTimeout(t);
  }, [text, del, wi]);
  return text;
}

const GlamDashboard = ({ inView }: { inView: boolean }) => {
  const typed = useTyping();
  const perf = useCounter(98, 1.8, inView);
  const seo  = useCounter(96, 2.0, inView);
  const up   = useCounter(99, 2.2, inView);

  const radius = 250;
  const orbits = [
    { label: "REACT", icon: "⚛", color: "#0EBAB0", angle: 0 }, 
    { label: "NODE",  icon: "⬡", color: "#22c55e", angle: 72 }, 
    { label: "NEXT",  icon: "▲", color: "#073A53", angle: 144 }, 
    { label: "TS",    icon: "TS", color: "#3b82f6", angle: 216 }, 
    { label: "MONGO", icon: "🍃", color: "#16a34a", angle: 288 }, 
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {orbits.map((o, i) => {
        const rad = (o.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <motion.div key={i} initial={{ opacity: 0, scale: 0 }} 
            animate={inView ? { opacity: 1, scale: [1, 1.15, 1] } : {}} 
            transition={{ opacity: { delay: 0.4 + i * 0.1 }, scale: { repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" } }}
            style={{ position: "absolute", left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%,-50%)", zIndex: 20 }}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 50, background: "rgba(255,255,255,0.97)", boxShadow: `0 8px 28px rgba(7,58,83,0.16), 0 0 0 1.5px ${o.color}40`, whiteSpace: "nowrap", backdropFilter: "blur(8px)" }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", background: o.color, color: "#fff", fontWeight: 900 }}>{o.icon}</div>
              <span style={{ fontSize: 8.5, fontWeight: 800, textTransform: "uppercase", color: "#073A53" }}>{o.label}</span>
            </motion.div>
          </motion.div>
        );
      })}

      <motion.div initial={{ opacity: 0, scale: 0.72, y: 28 }} animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} style={{ position: "relative", zIndex: 10 }}>
        <div style={{ width: 300, marginLeft:'100px', borderRadius: 24, overflow: "hidden", background: "#ffffff", boxShadow: "0 48px 100px rgba(7,58,83,0.24), 0 0 0 1px rgba(14,186,176,0.2)" }}>
          <div style={{ height: 44, padding: "0 15px", background: "linear-gradient(90deg, #052d40 0%, #073A53 100%)", display: "flex", alignItems: "center", gap: 7 }}>
            {["#ff5f57","#febc2e","#28c840"].map((c,j) => (
              <div key={j} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>
            ))}
            <div style={{ flex: 1, margin: "0 12px", height: 22, borderRadius: 11, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", paddingLeft: 10 }}>
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>aptagon.tech</span>
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ height: 75, borderRadius: 14, marginBottom: 15, background: "linear-gradient(115deg, #052d40, #0EBAB0)", padding: "0 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px" }}>Currently Building</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#fff" }}>
                {typed} <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 0.8, repeat: Infinity }}>|</motion.span>
              </div>
            </div>
            {[{ label: "PERFORMANCE", val: perf, target: 98, color: "#0EBAB0" }, { label: "SEO SCORE", val: seo, target: 96, color: "#3b82f6" }, { label: "UPTIME", val: up, target: 99, color: "#22c55e" }].map((m, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 8, fontWeight: 800, color: "#475569" }}>{m.label}</span>
                  <span style={{ fontSize: 9, fontWeight: 900, color: m.color }}>{m.val}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 10, background: "rgba(7,58,83,0.06)", overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} animate={inView ? { width: `${m.target}%` } : {}} transition={{ duration: 1.6, delay: 0.8 + i * 0.2 }} style={{ height: "100%", background: m.color }} />
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, margin: "15px 0" }}>
              {["React", "Next.js", "TS"].map((tag, i) => (
                <span key={i} style={{ padding: "4px 10px", background: "rgba(14,186,176,0.1)", borderRadius: 20, fontSize: 8, fontWeight: 800, color: "#0EBAB0" }}>{tag}</span>
              ))}
            </div>
            <div style={{ padding: "10px", borderRadius: 12, background: "#0a1628", fontFamily: "'Fira Code', monospace", fontSize: 10, border: "1px solid rgba(14,186,176,0.15)" }}>
              <span style={{ color: "#0EBAB0" }}>const</span> <span style={{ color: "#e2e8f0" }}>result</span> = <span style={{ color: "#0EBAB0" }}>Aptagon</span>.<span style={{ color: "#f472b6" }}>build</span>(<span style={{ color: "#fbbf24" }}>"excellence"</span>);
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const WebDevHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const proj = useCounter(200, 2.5, inView);
  const sat  = useCounter(99, 2.2, inView);
  const yrs  = useCounter(8, 2.0, inView);

  // Function to open Navbar Dropdown
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
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
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
    <section 
      ref={sectionRef} 
      style={{ position: "relative", zIndex: 1, isolation: "isolate", width: "100%", height: "100vh", minHeight: "650px", background: "#ffffff", display: "flex", alignItems: "center", overflow: "hidden" }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: -1, opacity: 0.6 }} />

      <div style={{ padding: "0 8%", width: "100%", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>

          <motion.div initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1 }} style={{ flex: "0 0 45%" }}>
            <div className="mt-20" style={{ display: "inline-block", padding: "6px 16px", borderRadius: 50, background: "rgba(14,186,176,0.1)", color: "#0EBAB0", fontSize: "10px", fontWeight: 700, marginBottom: "20px", textTransform: "uppercase" }}>
              Architecting Digital Excellence
            </div>
            
            <h1 style={{ fontSize: 55, fontWeight: 900, color: "#073A53", lineHeight: 1.25, marginBottom: "25px" }}>
              Web Development Hub
              <br />
              <TypewriterEffect words={["Custom Web Solutions", "Interactive Experience", "Innovative Designs"]} />
            </h1>
            
            <p style={{ fontSize: "1.125rem", color: "#475569", lineHeight: 1.6, maxWidth: "700px", marginBottom: "35px" }}>
              We create powerful and engaging web experiences that connect users to your brand.  
              Our web solutions focus on responsive design, seamless functionality, and user-centered interfaces.
            </p>
            
            <div style={{ display: "flex", gap: "45px", marginBottom: "40px" }}>
              {[ { v: proj, l: "Projects Done" }, { v: sat, l: "Satisfaction" }, { v: yrs, l: "Years Exp" } ].map((item, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#073A53" }}>{item.v}{idx === 1 ? "%" : "+"}</div>
                  <div style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>{item.l}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              {/* Explore Services Button */}
              <motion.button 
                onClick={handleExploreClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ padding: "16px 32px", borderRadius: "12px", background: "#073A53", color: "#fff", fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 15px 30px rgba(7,58,83,0.2)" }}
              >
                Explore Services →
              </motion.button>

              {/* Let's Collaborate Button */}
              <Link href="/schedule-call" style={{ textDecoration: "none" }}>
                <motion.button 
                   whileHover={{ backgroundColor: "rgba(7,58,83,0.05)", scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   style={{ padding: "16px 32px", borderRadius: "12px", background: "transparent", color: "#073A53", fontWeight: 800, border: "2px solid #e2e8f0", cursor: "pointer" }}
                >
                  Let's collaborate
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <div style={{ flex: "0 0 55%", height: "600px" }}>
            <GlamDashboard inView={inView} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default WebDevHero;