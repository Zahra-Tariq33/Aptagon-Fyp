"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  iconSrc: string;
}

const steps: ProcessStep[] = [
  { id: 1, title: "Discovery",  description: "We begin by deeply understanding your goals, audience, and challenges.", iconSrc: "/icons/explore.png"  },
  { id: 2, title: "Design", description: "We craft a strategic and creative roadmap tailored to your needs.",      iconSrc: "/icons/envision.png" },
  { id: 3, title: "Create",   description: "Developing high-performance solutions with agile precision.",  iconSrc: "/icons/create.png"   },
  { id: 4, title: "Deploy",  description: "Launching seamless, scalable products for the global market.",    iconSrc: "/icons/elevate.png"  },
];

/* ── Animated counter util ── */
function animateCounter(el: HTMLElement, target: number, duration = 1.4) {
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: duration,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = String(Math.round(obj.val)).padStart(2, "0");
    }
  });
}

export default function WorkProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ══ 1. PARALLAX BG ORBS on scroll ══ */
      gsap.to(".wp-orb-1", {
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
        y: -80, x: 30, ease: "none",
      });
      gsap.to(".wp-orb-2", {
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 },
        y: -50, x: -20, ease: "none",
      });
      gsap.to(".wp-orb-3", {
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        y: -120, ease: "none",
      });

      /* ══ 2. HEADER ANIMATIONS ══ */
      const headTL = gsap.timeline({
        scrollTrigger: { trigger: headRef.current, start: "top 84%" },
      });
      headTL
        .from(".wp-h-sub",   { opacity: 0, y: -20, duration: 0.6, ease: "power3.out" })
        .from(".wp-h-title", { opacity: 0, y: 35, duration: 0.85, ease: "power3.out" }, "-=0.3")
        .from(".wp-h-bar",   { scaleX: 0, transformOrigin: "center", duration: 0.9, ease: "elastic.out(1,0.6)" }, "-=0.4")
        .from(".wp-h-dots span", { scale: 0, opacity: 0, stagger: 0.08, duration: 0.4, ease: "back.out(3)" }, "-=0.5");

      /* ══ 3. CONNECTOR LINES draw with scrub ══ */
      gsap.from(".wp-line, .wp-line-tablet", {
        scrollTrigger: { trigger: gridRef.current, start: "top 72%", end: "center 55%", scrub: 1.6 },
        scaleX: 0, transformOrigin: "left center", stagger: 0.08, ease: "none",
      });

      /* ══ 4. TRAVELING DOT along each line ══ */
      gsap.utils.toArray<HTMLElement>(".wp-travel-dot").forEach((dot) => {
        gsap.fromTo(dot,
          { left: "0%" },
          {
            scrollTrigger: { trigger: gridRef.current, start: "top 68%", end: "bottom 60%", scrub: 1.8 },
            left: "100%", ease: "none",
          }
        );
      });

      /* ══ 5. CIRCLES stagger pop ══ */
      gsap.from(".wp-circle", {
        scrollTrigger: { trigger: gridRef.current, start: "top 75%" },
        scale: 0, opacity: 0,
        stagger: 0.2, duration: 0.7, ease: "back.out(2.2)", delay: 0.1,
      });

      /* ══ 6. ROTATING ORBIT RING on each circle ══ */
      gsap.utils.toArray<Element>(".wp-orbit").forEach((el, i) => {
        gsap.to(el, {
          rotation: 360, duration: 8 + i * 2,
          repeat: -1, ease: "none", transformOrigin: "center center",
        });
      });

      /* ══ 7. NUMBER BADGES counter animate ══ */
      gsap.utils.toArray<HTMLElement>(".wp-num").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: gridRef.current, start: "top 73%" },
          scale: 0, rotation: 60, opacity: 0,
          duration: 0.55, delay: 0.35 + i * 0.18, ease: "back.out(2.5)",
          onComplete: () => animateCounter(el, i + 1),
        });
      });

      /* ══ 8. TEXT blocks slide up with clip ══ */
      gsap.from(".wp-text", {
        scrollTrigger: { trigger: gridRef.current, start: "top 70%" },
        opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)",
        stagger: 0.16, duration: 0.75, ease: "power3.out", delay: 0.2,
        clearProps: "clipPath",
      });

      /* ══ 9. MICRO DIVIDER bars draw ══ */
      gsap.from(".wp-micro-bar", {
        scrollTrigger: { trigger: gridRef.current, start: "top 68%" },
        scaleX: 0, transformOrigin: "left center",
        stagger: 0.18, duration: 0.6, delay: 0.5, ease: "power3.out",
      });

      /* ══ 10. FLOAT circles (continuous sine) ══ */
      gsap.utils.toArray<Element>(".wp-circle").forEach((el, i) => {
        gsap.to(el, {
          y: -9, duration: 2.1 + i * 0.35,
          repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.55,
        });
      });

      /* ══ 11. PULSE RINGS animate outward continuously ══ */
      gsap.utils.toArray<Element>(".wp-pulse-ring").forEach((el, i) => {
        const tl = gsap.timeline({ repeat: -1, delay: i * 0.6 });
        tl.fromTo(el,
          { scale: 1, opacity: 0.6 },
          { scale: 2.2, opacity: 0, duration: 1.8, ease: "power2.out" }
        );
      });

      /* ══ 12. PARTICLE BURST on scroll enter ══ */
      gsap.utils.toArray<HTMLElement>(".wp-circle-wrap").forEach((wrap, i) => {
        const particles = wrap.querySelectorAll<HTMLElement>(".wp-particle");
        ScrollTrigger.create({
          trigger: wrap,
          start: "top 78%",
          once: true,
          onEnter: () => {
            particles.forEach((p, j) => {
              const angle  = (j / particles.length) * 360;
              const rad    = (angle * Math.PI) / 180;
              const dist   = 55 + Math.random() * 20;
              gsap.fromTo(p,
                { x: 0, y: 0, opacity: 1, scale: 1 },
                {
                  x: Math.cos(rad) * dist,
                  y: Math.sin(rad) * dist,
                  opacity: 0, scale: 0,
                  duration: 0.9, delay: 0.3 + j * 0.04,
                  ease: "power3.out",
                }
              );
            });
          },
        });
      });

      /* ══ 13. HOVER — full GSAP per step ══ */
      document.querySelectorAll<HTMLElement>(".wp-step").forEach((step) => {
        const circle  = step.querySelector<HTMLElement>(".wp-circle");
        const ring    = step.querySelector<HTMLElement>(".wp-ring");
        const title   = step.querySelector<HTMLElement>(".wp-title-text");
        const desc    = step.querySelector<HTMLElement>(".wp-desc-text");
        const num     = step.querySelector<HTMLElement>(".wp-num");
        const mbar    = step.querySelector<HTMLElement>(".wp-micro-bar");
        const orbit   = step.querySelector<HTMLElement>(".wp-orbit");

        step.addEventListener("mouseenter", () => {
          gsap.to(circle,  { scale: 1.1, boxShadow: "0 14px 44px rgba(14,186,176,0.5), 0 0 0 3px rgba(14,186,176,0.3)", duration: 0.38, ease: "power2.out" });
          gsap.to(ring,    { scale: 1.55, opacity: 0, duration: 0.65, ease: "power2.out" });
          gsap.to(title,   { color: "#0EBAB0", y: -4, duration: 0.28, ease: "power2.out" });
          gsap.to(desc,    { color: "#073A53", y: -2, duration: 0.28 });
          gsap.to(num,     { scale: 1.2, rotation: 0, background: "#073A53", duration: 0.35, ease: "back.out(2)" });
          gsap.to(mbar,    { width: 48, background: "#073A53", duration: 0.4, ease: "power2.out" });
          if (orbit) gsap.to(orbit, { timeScale: 3, duration: 0.5 });
        });
        step.addEventListener("mouseleave", () => {
          gsap.to(circle, { scale: 1, boxShadow: "0 8px 30px rgba(7,58,83,0.28), 0 2px 8px rgba(14,186,176,0.2)", duration: 0.5, ease: "elastic.out(1,0.45)" });
          gsap.to(ring,   { scale: 1, opacity: 0.35, duration: 0.4 });
          gsap.to(title,  { color: "#214F65", y: 0, duration: 0.28 });
          gsap.to(desc,   { color: "#535353", y: 0, duration: 0.28 });
          gsap.to(num,    { scale: 1, rotation: 0, background: "#0EBAB0", duration: 0.3 });
          gsap.to(mbar,   { width: 28, background: "#0EBAB0", duration: 0.4 });
          if (orbit) gsap.to(orbit, { timeScale: 1, duration: 0.6 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Build 8 particles per step */
  const particleAngles = Array.from({ length: 8 }, (_, i) => (i / 8) * 360);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "5.5rem 1.5rem 7rem",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      <style>{`
       

        /* ── Connector ── */
        .wp-line {
          position: absolute; top: 44px; right: -40%; width: 80%; height: 2px;
          background: linear-gradient(90deg,rgba(7,58,83,0.2),rgba(14,186,176,0.55),rgba(7,58,83,0.2));
          border-radius: 2px; transform-origin: left center; overflow: visible;
        }
        .wp-line::before {
          content:''; position:absolute; inset:0; border-radius:2px;
          background:linear-gradient(90deg,transparent,rgba(14,186,176,0.75),transparent);
          animation: lineShimmer 2.8s ease-in-out infinite;
        }
        @keyframes lineShimmer {
          0%   { transform:translateX(-100%); opacity:0; }
          50%  { opacity:1; }
          100% { transform:translateX(100%);  opacity:0; }
        }

        /* traveling dot */
        .wp-travel-dot {
          position:absolute; top:50%; transform:translateY(-50%);
          width:7px; height:7px; border-radius:50%;
          background:#0EBAB0; box-shadow:0 0 8px rgba(14,186,176,0.8);
          pointer-events:none;
        }

        /* tablet connector */
        .wp-line-tablet {
          position:absolute; top:44px; right:-40%; width:80%; height:2px;
          background:linear-gradient(90deg,rgba(7,58,83,0.2),rgba(14,186,176,0.55),rgba(7,58,83,0.2));
          border-radius:2px; transform-origin:left center; display:none; overflow:hidden;
        }

        /* mobile connector */
        .wp-line-mobile {
          position:absolute; bottom:-34px; left:50%; transform:translateX(-50%);
          width:2px; height:30px;
          background:linear-gradient(180deg,rgba(14,186,176,0.7),rgba(7,58,83,0.2));
          border-radius:2px; display:none;
        }

        /* ring */
        .wp-ring {
          position:absolute; inset:-6px; border-radius:50%;
          border:2px solid rgba(14,186,176,0.5); opacity:0.35; pointer-events:none;
        }

        /* orbit ring (dashed, rotating) */
        .wp-orbit {
          position:absolute; inset:-14px; border-radius:50%;
          border:1.5px dashed rgba(14,186,176,0.28);
          pointer-events:none;
        }

        /* pulse ring */
        .wp-pulse-ring {
          position:absolute; inset:-4px; border-radius:50%;
          border:1.5px solid rgba(14,186,176,0.5); pointer-events:none;
        }

        /* particles */
        .wp-particle {
          position:absolute; width:5px; height:5px; border-radius:50%;
          background:#0EBAB0; top:50%; left:50%;
          margin-left:-2.5px; margin-top:-2.5px;
          pointer-events:none; will-change:transform;
        }

        /* grid */
        .wp-proc-grid {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:0 2.5rem; position:relative;
        }

        @media(max-width:1024px){
          .wp-proc-grid   { grid-template-columns:repeat(2,1fr); gap:3.5rem 3rem; }
          .wp-line        { display:none; }
          .wp-line-tablet { display:block; }
        }
        @media(max-width:600px){
          .wp-proc-grid   { grid-template-columns:1fr; gap:4rem 0; }
          .wp-line        { display:none; }
          .wp-line-tablet { display:none; }
          .wp-line-mobile { display:block; }
        }
      `}</style>

      {/* ── PARALLAX BACKGROUND ORBS ── */}
      <div ref={bgRef} style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        <div className="wp-orb-1" style={{
          position:"absolute", width:500, height:500,
          top:"-15%", left:"-8%", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(14,186,176,0.07) 0%,transparent 70%)",
        }} />
        <div className="wp-orb-2" style={{
          position:"absolute", width:420, height:420,
          bottom:"-10%", right:"-6%", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(7,58,83,0.06) 0%,transparent 70%)",
        }} />
        <div className="wp-orb-3" style={{
          position:"absolute", width:260, height:260,
          top:"30%", left:"50%", transform:"translateX(-50%)", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(14,186,176,0.04) 0%,transparent 70%)",
        }} />
        {/* Dot grid */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"radial-gradient(circle,rgba(7,58,83,0.055) 1px,transparent 1px)",
          backgroundSize:"32px 32px",
          maskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)",
          WebkitMaskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)",
        }} />
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:2 }}>

        {/* ── HEADER ── */}
        <div ref={headRef} style={{ textAlign:"center", marginBottom:"4.5rem" }}>

          <p className="wp-h-sub" style={{
            fontSize:"clamp(0.9rem,1.8vw,1.1rem)",
            color:"rgba(0, 0, 0, 0.88)", fontWeight:600,
            marginBottom:"0.5rem",
            letterSpacing:"0.06em", textTransform:"uppercase",
          }}>
           Our Strategic Process
          </p>

          <div className="wp-h-title">
            <h2 style={{
            
              fontWeight:800,
              fontSize:"3rem",
              lineHeight:1.1, letterSpacing:"-0.025em",
              color:"#214F65", margin:0,
            }}>
              How We Turn Ideas Into{" "}
              <span style={{
               
                backgroundImage:"linear-gradient(125deg,#0EBAB0,#073A53)",
                backgroundClip:"text", WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
              }}>Impact</span>
            </h2>
          </div>

          {/* Bar + dots */}
          {/* <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:"1.2rem" }}>
            <div className="wp-h-bar" style={{
              width:56, height:4, borderRadius:2,
              background:"linear-gradient(90deg,#214F65,#0EBAB0)",
              boxShadow:"0 2px 12px rgba(14,186,176,0.35)",
            }} />
            <div className="wp-h-dots" style={{ display:"flex", gap:5 }}>
              {[0.8,0.5,0.25].map((o,i) => (
                <span key={i} style={{
                  display:"inline-block",
                  width:i===0?10:6, height:i===0?10:6,
                  borderRadius:"50%",
                  background:`rgba(14,186,176,${o})`,
                  boxShadow: i===0?"0 0 8px rgba(14,186,176,0.6)":"none",
                }} />
              ))}
            </div>
          </div> */}
        </div>

        {/* ── STEPS GRID ── */}
        <div ref={gridRef} className="wp-proc-grid">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="wp-step"
              style={{
                position:"relative",
                display:"flex", flexDirection:"column",
                alignItems:"center", textAlign:"center",
              }}
            >
              {/* Connectors */}
              {index < steps.length - 1 && (
                <>
                  <div className="wp-line">
                    <div className="wp-travel-dot" />
                  </div>
                  <div className="wp-line-tablet" style={{
                    position:"absolute", top:44, right:"-40%", width:"80%", height:2,
                    background:"linear-gradient(90deg,rgba(7,58,83,0.2),rgba(14,186,176,0.55),rgba(7,58,83,0.2))",
                    borderRadius:2, overflow:"hidden",
                  }}>
                    <div className="wp-travel-dot" />
                  </div>
                </>
              )}
              {index < steps.length - 1 && <div className="wp-line-mobile" />}

              {/* ── CIRCLE ICON WRAPPER ── */}
              <div className="wp-circle-wrap" style={{ position:"relative", marginBottom:"1.6rem" }}>

                {/* Particles */}
                {particleAngles.map((_, j) => (
                  <div key={j} className="wp-particle" style={{ opacity: 0 }} />
                ))}

                {/* Outer dashed orbit */}
                <div className="wp-orbit" />

                {/* Pulse ring (auto-expands) */}
                <div className="wp-pulse-ring" />

                {/* Hover ring */}
                <div className="wp-ring" />

                {/* Glow blob */}
                <div style={{
                  position:"absolute", inset:0, borderRadius:"50%",
                  background:"radial-gradient(circle,rgba(14,186,176,0.22) 0%,transparent 70%)",
                  filter:"blur(12px)", transform:"scale(1.4)", zIndex:0,
                }} />

                {/* Main circle */}
                <div
                  className="wp-circle"
                  style={{
                    position:"relative", zIndex:1,
                    width:90, height:90, borderRadius:"50%",
                    background:"linear-gradient(145deg,#073A53,#0a4f6e)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:"0 8px 32px rgba(7,58,83,0.3), 0 2px 8px rgba(14,186,176,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
                    border:"2px solid rgba(14,186,176,0.28)",
                  }}
                >
                  {/* Specular highlight */}
                  <div style={{
                    position:"absolute", inset:0, borderRadius:"50%",
                    background:"radial-gradient(circle at 32% 30%,rgba(255,255,255,0.14),transparent 58%)",
                  }} />
                  <Image
                    src={step.iconSrc} alt={step.title}
                    width={36} height={36}
                    style={{ objectFit:"contain", filter:"brightness(0) invert(1)", position:"relative", zIndex:1 }}
                  />
                </div>

                {/* Number badge */}
                <div
                  className="wp-num"
                  style={{
                    position:"absolute", right:-8, bottom:4,
                    width:27, height:27, borderRadius:"50%",
                    background:"#0EBAB0",
                    border:"2.5px solid #ffffff",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#fff", fontSize:"0.62rem", fontWeight:800,
                    fontFamily:"system-ui,sans-serif",
                    boxShadow:"0 3px 12px rgba(14,186,176,0.5)",
                    zIndex:4,
                  }}
                >
                  {String(step.id).padStart(2, "0")}
                </div>
              </div>

              {/* ── TEXT ── */}
              <div className="wp-text" style={{ clipPath:"inset(0 0 0 0)" }}>
                <h3 className="wp-title-text" style={{
                  fontFamily:"'Cormorant Garamond',Georgia,serif",
                  fontWeight:800,
                  fontSize:"clamp(1.25rem,2.2vw,1.55rem)",
                  letterSpacing:"-0.02em",
                  color:"#214F65", marginBottom:"0.5rem", lineHeight:1.15,
                }}>
                  {step.title}
                </h3>

                {/* Animated micro bar */}
                <div className="wp-micro-bar" style={{
                  width:28, height:3, borderRadius:2,
                  background:"#0EBAB0",
                  boxShadow:"0 2px 8px rgba(14,186,176,0.4)",
                  margin:"0 auto 0.7rem",
                }} />

                <p className="wp-desc-text" style={{
                  fontSize:"clamp(0.82rem,1.5vw,0.93rem)",
                  color:"#535353", lineHeight:1.72,
                  maxWidth:195, margin:"0 auto",
                  fontFamily:"system-ui,sans-serif",
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}