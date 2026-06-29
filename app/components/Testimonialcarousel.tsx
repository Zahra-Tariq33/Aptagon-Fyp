"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric?: string;
  metricLabel?: string;
}

const testimonials: Testimonial[] = [
  { id: 1,  name: "John Miller",   role: "CEO",        company: "TechNova Solutions", metric: "3×",   metricLabel: "Revenue Growth",    quote: "Working with Aptagon Technologies was a game-changer for our business. Their team delivered our web app on time with excellent design and functionality. Every detail was considered — from micro-interactions to load performance." },
  { id: 2,  name: "Sarah Khan",    role: "Manager",    company: "Digital Wave",       metric: "3×",   metricLabel: "User Engagement",   quote: "The attention to detail and professionalism Aptagon brought to our project exceeded every expectation. Our platform saw a 3× increase in user engagement post-launch. I wouldn't trust any other team with our product." },
  { id: 3,  name: "Robert Fox",    role: "Founder",    company: "Fox Capital",        metric: "99%",  metricLabel: "Uptime Delivered",  quote: "Aptagon built our fintech dashboard from scratch. The UI is stunning, the performance is rock-solid, and the team was a pleasure to work with throughout the entire engagement." },
  { id: 4,  name: "Emily Blunt",   role: "COO",        company: "Global Systems",     metric: "60%",  metricLabel: "Faster Delivery",   quote: "From discovery to delivery, Aptagon's process was seamless. They translated complex requirements into an intuitive product our team loves. Communication was flawless from day one to launch." },
  { id: 5,  name: "David Goggins", role: "Director",   company: "Stay Hard Inc",      metric: "#1",   metricLabel: "Industry Rank",     quote: "Aptagon didn't just build software — they built a competitive advantage. The quality of their code and their UX thinking is genuinely world-class. No shortcuts, no compromises." },
  { id: 6,  name: "Aisha Patel",   role: "CTO",        company: "NexGen Labs",        metric: "0",    metricLabel: "Launch Downtime",   quote: "The engineering rigour Aptagon applied to our AI product was impressive. Clean architecture, thorough documentation, and zero downtime on launch day. Simply the best team I've worked with." },
  { id: 7,  name: "Carlos Mendez", role: "VP Product", company: "Orbis Tech",         metric: "−20%", metricLabel: "Under Budget",      quote: "Our redesign project was delivered two weeks early and 20% under budget. Aptagon sets the gold standard for what a technology partner should look like." },
  { id: 8,  name: "Lena Fischer",  role: "CMO",        company: "Bright Commerce",    metric: "+40%", metricLabel: "Conversion Rate",   quote: "The e-commerce solution Aptagon delivered boosted our conversion rate by 40% in the first quarter. Exceptional design meets exceptional engineering — that is the Aptagon formula." },
  { id: 9,  name: "James Okonkwo", role: "Founder",    company: "Strata Health",      metric: "100%", metricLabel: "Compliance Met",    quote: "Regulatory-compliant healthcare software is notoriously hard. Aptagon navigated every challenge with expertise and delivered on time. Remarkable team, remarkable results." },
  { id: 10, name: "Mei Ling",      role: "CEO",        company: "PacRim Ventures",    metric: "3rd",  metricLabel: "Project Together",  quote: "We've worked with agencies on three continents. Aptagon is the only partner we've brought back for a second and third project. Their consistency and quality are unmatched in the industry." },
];

const RADIUS  = 900;
const TOTAL   = testimonials.length;
const ARC_DEG = 260;
const DEG_GAP = ARC_DEG / (TOTAL - 1);

/* ── Avatar ─────────────────────────────────────────────────────────────── */
const Avatar = ({ name }: { name: string }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const palettes: [string, string][] = [
    ["#0EBAB0","#073A53"],["#073A53","#0EBAB0"],["#0a4f6e","#15d4c8"],
    ["#0e7a74","#073A53"],["#0EBAB0","#0a6e8a"],["#073A53","#1ecfc4"],
    ["#0a3d55","#0EBAB0"],["#0EBAB0","#05524d"],["#0d8a80","#073A53"],["#0EBAB0","#073A53"],
  ];
  const [from, to] = palettes[name.charCodeAt(0) % palettes.length];
  return (
    <div style={{
      width: 52, height: 52, borderRadius: 16, flexShrink: 0,
      background: `linear-gradient(135deg,${from},${to})`,
      boxShadow: `0 6px 20px ${from}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 900, fontSize: 17,
      position: "relative", overflow: "hidden",
      fontFamily: "'Montserrat',sans-serif",
    }}>
      {initials}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,255,255,0.25),transparent 55%)" }}/>
    </div>
  );
};

/* ── Stars ───────────────────────────────────────────────────────────────── */
const Stars = ({ count = 5 }: { count?: number }) => (
  <div style={{ display:"flex", gap:3 }}>
    {[...Array(count)].map((_,i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" style={{ filter:"drop-shadow(0 0 3px rgba(245,158,11,0.5))" }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

/* ── Progress Dots ───────────────────────────────────────────────────────── */
const Dots = ({ progress }: { progress: MotionValue<number> }) => {
  const active = useTransform(progress, [0,1], [0, TOTAL-1]);
  return (
    <div style={{ display:"flex", gap:7, alignItems:"center", justifyContent:"center", marginTop:16 }}>
      {testimonials.map((_,i) => (
        <motion.div key={i} style={{
          height: 7, borderRadius: 4,
          width:      useTransform(active, v => Math.abs(i-v) < 0.5 ? 30 : 8),
          opacity:    useTransform(active, v => 1 - Math.min(Math.abs(i-v)*0.38, 0.68)),
          background: useTransform(active, v => Math.abs(i-v) < 0.5
            ? "linear-gradient(90deg,#0EBAB0,#073A53)"
            : "rgba(14,186,176,0.25)"),
        }}/>
      ))}
    </div>
  );
};

/* ── Card ────────────────────────────────────────────────────────────────── */
const TestimonialCard = ({
  t, index, progress,
}: {
  t: Testimonial; index: number; progress: MotionValue<number>;
}) => {
  const ci       = useTransform(progress, [0,1], [0, TOTAL-1]);
  const angleDeg = useTransform(ci, v => (index - v) * DEG_GAP);
  const toRad    = (a: number) => a * (Math.PI / 180);

  const x      = useTransform(angleDeg, a => Math.sin(toRad(a)) * RADIUS);
  const y      = useTransform(angleDeg, a => -Math.cos(toRad(a)) * RADIUS + RADIUS + 60);
  const rotateZ = useTransform(angleDeg, a => a * 0.4);
  const zIndex  = useTransform(ci, v => Math.round(100 - Math.abs(index-v)*10));
  const opacity = useTransform(ci, v => {
    const d = Math.abs(index-v);
    if (d < 0.5) return 1;
    if (d < 1.5) return 0.82;
    if (d < 2.5) return 0.5;
    return 0.15;
  });
  const scale   = useTransform(ci, v => 1 - Math.min(Math.abs(index-v)*0.1, 0.3));
  const glow    = useTransform(ci, v => Math.max(0, 1 - Math.abs(index-v)*2));

  return (
    <motion.div style={{
      position:"absolute", left:"50%", top:"40%",
      x, y, scale, opacity, rotateZ, zIndex,
      translateX:"-50%", translateY:"-50%",
      willChange:"transform",
      width: 330,
    }}
      className="pointer-events-auto"
    >
      {/* Outer glow ring */}
      <motion.div style={{
        position:"absolute", inset:-20, borderRadius:44, pointerEvents:"none",
        opacity: glow,
        background:"radial-gradient(ellipse at 50% 50%, rgba(14,186,176,0.22) 0%, transparent 68%)",
        filter:"blur(18px)",
      }}
        animate={{ scale:[1,1.06,1] }}
        transition={{ duration:3.2, repeat:Infinity, ease:"easeInOut" }}
      />

      {/* ── CARD ── */}
      <div style={{
        borderRadius: 32,
        overflow: "hidden",
        background: "#ffffff",
        boxShadow: "0 0 0 1.5px rgba(14,186,176,0.18), 0 32px 80px rgba(7,58,83,0.16), 0 8px 24px rgba(14,186,176,0.1)",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden" as const,
        position: "relative",
      }}>

        {/* ── TOP GRADIENT HEADER BAND ── */}
        <div style={{
          background: "linear-gradient(135deg, #073A53 0%, #0a5570 50%, #0EBAB0 100%)",
          padding: "22px 24px 20px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
          <div style={{ position:"absolute", bottom:-20, left:-10, width:80, height:80, borderRadius:"50%", background:"rgba(14,186,176,0.15)" }}/>

          {/* Big quote mark */}
          <div style={{ position:"absolute", top:8, right:20, fontSize:"4.5rem", lineHeight:1,
            color:"rgba(255,255,255,0.08)", fontFamily:"Georgia,serif", userSelect:"none" as const }}>❝</div>

          {/* Metric badge */}
          {t.metric && (
            <div style={{
              display:"inline-flex", flexDirection:"column", alignItems:"center",
              background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,0.2)",
              borderRadius:16, padding:"8px 18px", marginBottom:14,
            }}>
              <span style={{ fontSize:22, fontWeight:900, color:"#fff", lineHeight:1, fontFamily:"'Montserrat',sans-serif" }}>
                {t.metric}
              </span>
              <span style={{ fontSize:9, color:"rgba(255,255,255,0.65)", textTransform:"uppercase", letterSpacing:"0.12em", marginTop:2 }}>
                {t.metricLabel}
              </span>
            </div>
          )}

          {/* Quote text */}
          <p style={{ margin:0, fontSize:13, lineHeight:1.85, color:"rgba(255,255,255,0.9)", fontWeight:400, position:"relative",  }}>
            "{t.quote}"
          </p>

          {/* Shimmer sweep */}
          <motion.div style={{ opacity:glow, position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
            <motion.div
              animate={{ x:["-120%","220%"] }}
              transition={{ duration:3, repeat:Infinity, ease:"easeInOut", repeatDelay:2 }}
              style={{ position:"absolute", top:0, left:0, width:"25%", height:"100%",
                background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)" }}
            />
          </motion.div>
        </div>

        {/* ── BOTTOM WHITE SECTION ── */}
        <div style={{ padding:"18px 24px 22px", background:"#fff" }}>

          {/* Stars row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <Stars/>
            <span style={{
              fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.14em",
              color:"#0EBAB0", background:"rgba(14,186,176,0.08)",
              padding:"3px 10px", borderRadius:99, border:"1px solid rgba(14,186,176,0.2)",
            }}>Verified ✓</span>
          </div>

          {/* Divider */}
          <div style={{ height:1, marginBottom:16,
            background:"linear-gradient(90deg,transparent,rgba(14,186,176,0.4),transparent)" }}/>

          {/* Person row */}
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <Avatar name={t.name}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"'Montserrat','Arial Black',sans-serif",
                color:"#073A53", fontWeight:900, fontSize:15, letterSpacing:"-0.02em", marginBottom:4 }}>
                {t.name}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:10, color:"#0EBAB0", fontWeight:700,
                  textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  {t.role}
                </span>
                <span style={{ width:3, height:3, borderRadius:"50%", background:"#0EBAB0", display:"inline-block", opacity:0.5 }}/>
                <span style={{ fontSize:10,  fontWeight:600 }}>
                  {t.company}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <motion.div style={{ opacity: glow }}
            animate={{ scaleX:[0.3,1,0.3] }}
            transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
          >
            <div style={{ marginTop:16, height:2.5, borderRadius:2,
              background:"linear-gradient(90deg,transparent,#0EBAB0,#073A53,transparent)" }}/>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Export ─────────────────────────────────────────────────────────── */
export default function TestimonialCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start","end end"],
  });

  return (
    <div ref={containerRef} style={{ position:"relative", width:"100%", height:`${TOTAL * 100}vh`, background:"#f8fafc" }}>
      <div style={{ position:"sticky", top:0, height:"100vh", width:"100%", overflow:"hidden",
        display:"flex", flexDirection:"column", alignItems:"center" }}>

        {/* Ambient */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(ellipse 90% 50% at 50% -10%, rgba(14,186,176,0.13) 0%, transparent 60%)" }}/>

        {/* Grid */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.022,
          backgroundImage:"linear-gradient(#0EBAB0 1px,transparent 1px),linear-gradient(90deg,#0EBAB0 1px,transparent 1px)",
          backgroundSize:"44px 44px" }}/>

        {/* ── HEADER ── */}
        <div style={{ position:"relative", zIndex:50, textAlign:"center", padding:"40px 24px 0", width:"100%" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:10 }}>
            <motion.div animate={{ width:[14,30,14], opacity:[0.4,1,0.4] }}
              transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
              style={{ height:1.5, background:"linear-gradient(90deg,transparent,#0EBAB0)", borderRadius:2 }}/>
            <span style={{ fontSize:11, fontWeight:900, color:"#0EBAB0",
              textTransform:"uppercase", letterSpacing:"0.38em", fontFamily:"'Montserrat',sans-serif" }}>
              Success Stories
            </span>
            <motion.div animate={{ width:[14,30,14], opacity:[0.4,1,0.4] }}
              transition={{ duration:3, repeat:Infinity, ease:"easeInOut", delay:0.5 }}
              style={{ height:1.5, background:"linear-gradient(90deg,#0EBAB0,transparent)", borderRadius:2 }}/>
          </div>

          <h2 style={{ margin:0, 
            fontSize:"3rem", fontWeight:700, 
            color:"#073A53" }}>
           Trusted by{" "}
            <span style={{ color:"#0EBAB0", textShadow:"0 0 40px rgba(14,186,176,0.3)" }}>Businesses Worldwide</span>
            
          </h2>

          <Dots progress={scrollYProgress}/>
        </div>

        {/* ── ARC ── */}
        <div style={{ position:"absolute", marginTop:"80px", inset:0, pointerEvents:"none" }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} progress={scrollYProgress}/>
          ))}
        </div>
      

        {/* Side fades */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:40,
          background:"linear-gradient(90deg,rgba(248,250,252,0.95) 0%,transparent 16%,transparent 84%,rgba(248,250,252,0.95) 100%)" }}/>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:130,
          pointerEvents:"none", zIndex:40,
          background:"linear-gradient(transparent,rgba(248,250,252,0.92))" }}/>
      </div>
    </div>
  );
}