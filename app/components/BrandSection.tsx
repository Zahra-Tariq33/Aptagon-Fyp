"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const clients = [
  { name: "WickenSoft",            url: "www.wickensoft.com",        desc: "Worked with WickenSoft to deliver reliable and innovative technology solutions.",                          img: "/logos/wicken.png",     color: "#073A53" },
  { name: "Windsor",               url: "www.windsor.com",           desc: "Collaborated with Windsor to deliver technology solutions for their education consultancy.",               img: "/logos/windsor.png",    color: "#073A53" },
  { name: "Free Word Unscrambler", url: "www.wordunscramble.com",    desc: "Delivered a reliable digital solution to enhance Free Word Unscrambler performance and usability.",      img: "/logos/trendbost.png",  color: "#073A53" },
  { name: "Sadsan",                url: "www.sadsantechnologies.com", desc: "Provided modern digital solutions to support efficient business operations and platform performance.",    img: "/logos/sadsan.png",     color: "#073A53" },
  { name: "PVP.com",               url: "www.pvp.com",               desc: "Delivered reliable digital solutions to enhance platform performance and user experience.",               img: "/logos/PVP.png",        color: "#073A53" },
  { name: "PSG (Proximus)",        url: "www.psg.com",               desc: "Worked with PSG to deliver reliable technology solutions that support their digital growth.",             img: "/logos/PSG.png",        color: "#073A53" },
  { name: "Infinex",               url: "www.zetastudy.com",         desc: "Worked with Zeta Study to deliver reliable digital solutions for their education consultancy platform.",  img: "/logos/ZZETA.png",       color: "#073A53" },
  { name: "DataCore",              url: "www.datacore.com",          desc: "Managing massive data ecosystems with enterprise-grade cloud storage and security protocols.",             img: "/logos/word.png",       color: "#073A53" },
];

const CARD_W = 200;
const CARD_H = 260;
const RADIUS  = 430;
const TOTAL   = clients.length;

export default function ClientsSection3D() {
  const angleRef       = useRef(0);
  const targetAngleRef = useRef(0);
  const rafRef         = useRef<number>(0);
  const isDragging     = useRef(false);
  const lastX          = useRef(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!isDragging.current) targetAngleRef.current += dt * 11;
      angleRef.current += (targetAngleRef.current - angleRef.current) * 0.055;
      setTick(t => t + 1);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true; lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    targetAngleRef.current -= (e.clientX - lastX.current) * 0.22;
    lastX.current = e.clientX;
  };
  const onPointerUp = () => { isDragging.current = false; };

  return (
    <>
      <style>{`
        @keyframes cs-shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes cs-dotpulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(2.2);opacity:1} }
        @keyframes cs-gridmv   { to{background-position:60px 60px} }
        @keyframes cs-orb1     { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.15)} }
        @keyframes cs-orb2     { 0%,100%{transform:translate(-50%,-50%) scale(1.1) rotate(0deg)} 100%{transform:translate(-50%,-50%) scale(1) rotate(360deg)} }
        @keyframes cs-scan     { 0%{top:-4%} 100%{top:108%} }
        @keyframes cs-holo     { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes cs-flicker  { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:.7} 94%{opacity:1} 97%{opacity:.85} 98%{opacity:1} }
        @keyframes cs-particleup { 0%{transform:translateY(0) scale(1);opacity:.8} 100%{transform:translateY(-40px) scale(0);opacity:0} }
        @keyframes cs-border-spin { to{transform:rotate(360deg)} }
        @keyframes cs-pulse-ring { 0%{transform:translate(-50%,-50%) scale(.6);opacity:.8} 100%{transform:translate(-50%,-50%) scale(1.4);opacity:0} }
      `}</style>

      <section
        style={{
          position:"relative", width:"100%", height:"90vh",
          background:"#0EBAB01A",
          overflow:"hidden",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"grab", userSelect:"none",
         
        }}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}     onPointerLeave={onPointerUp}
      >

        {/* ── Deep space bg grid ── */}
        <div style={{ position:"absolute", inset:0, opacity:.08, backgroundImage:"linear-gradient(#0EBAB0 1px,transparent 1px),linear-gradient(90deg,#0EBAB0 1px,transparent 1px)", backgroundSize:"60px 60px", animation:"cs-gridmv 25s linear infinite", pointerEvents:"none" }} />







        {/* ── HEADING ── */}
        <div style={{ position:"absolute", top:"7%", left:"50%", transform:"translateX(-50%)", zIndex:20, textAlign:"center", pointerEvents:"none", width:"100%", maxWidth:640 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:12 }}>
            <div style={{ height:1, width:40, background:"linear-gradient(90deg,transparent,rgba(14,186,176,0.6))" }} />
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#0EBAB0", animation:"cs-dotpulse 2.2s ease-in-out infinite", boxShadow:"0 0 10px #0EBAB0" }} />
            <span style={{ fontSize:10, letterSpacing:"0.45em", fontWeight:700, color:"#073A53", textTransform:"uppercase" }}>Trusted Worldwide</span>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"rgba(14,186,176,0.4)", boxShadow:"0 0 8px rgba(14,186,176,0.4)" }} />
            <div style={{ height:1, width:40, background:"linear-gradient(90deg,rgba(14,186,176,0.6),transparent)" }} />
          </div>
          <h2 style={{ fontSize:"clamp(34px,5vw,60px)", fontWeight:900, letterSpacing:"-0.04em", margin:"0 0 0", color:"transparent", background:"linear-gradient(120deg,#073A53 0%,#0EBAB0 50%,#073A53 100%)", backgroundSize:"250% auto", WebkitBackgroundClip:"text", backgroundClip:"text", animation:"cs-shimmer 6s linear infinite", textShadow:"none" }}>
            Our Global Clients
          </h2>
        
        </div>

        {/* ── 3D CAROUSEL ── */}
        <div style={{ position:"relative", width:CARD_W, height:CARD_H, perspective:1400, zIndex:10, marginTop:70 }}>
          <div style={{ position:"absolute", width:CARD_W, height:CARD_H, transformStyle:"preserve-3d" }}>
            {clients.map((client, i) => {
              const angle       = angleRef.current + (i / TOTAL) * 360;
              const rad         = (angle * Math.PI) / 180;
              const x           = Math.sin(rad) * RADIUS;
              const z           = Math.cos(rad) * RADIUS;
              const normalizedZ = (z + RADIUS) / (RADIUS * 2);
              const scale       = 0.5 + normalizedZ * 0.58;
              const opacity     = 0.18 + normalizedZ * 0.82;
              const blur        = (1 - normalizedZ) * 5;
              const isActive    = z > RADIUS * 0.72;
              const isFront     = z > RADIUS * 0.88;

              return (
                <div key={client.name} style={{
                  position:"absolute", left:"50%", top:"50%",
                  width:CARD_W, height:CARD_H,
                  transform:`translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                  opacity, filter:`blur(${blur}px)`,
                  zIndex:Math.round(normalizedZ * 100),
                  willChange:"transform,opacity,filter",
                }}>

                  {/* ════════════════════════════
                      STUNNING DARK LUXURY CARD
                  ════════════════════════════ */}
                  <div style={{
                    width:"100%", height:"100%",
                    borderRadius:24,
                    position:"relative",
                    overflow:"hidden",
                    background: "#ffffff",
                    border: "1.5px solid #0EBAB0",
                    boxShadow: isActive
                      ? "0 16px 40px rgba(14,186,176,0.18), 0 4px 16px rgba(7,58,83,0.1)"
                      : "0 4px 20px rgba(7,58,83,0.07)",
                    marginTop:20,
                    display:"flex", flexDirection:"column",
                  }}>

                    {/* ══ LOGO ZONE ══ */}
                    <div style={{
                      position:"relative",
                      width:"100%", height:80, flexShrink:0,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      padding:"18px 20px 10px",
                      background:"transparent",
                    }}>
                      <div style={{ position:"relative", width:"100%", height:"100%", background:"transparent" }}>
                        <Image
                          src={client.img}
                          alt={client.name}
                          fill
                          sizes="160px"
                          style={{ objectFit:"contain", objectPosition:"center" }}
                        />
                      </div>
                    </div>

                    {/* ══ TEAL DIVIDER ══ */}
                    <div style={{ width:"85%", height:1, background:"rgba(14,186,176,0.3)", margin:"0 auto" }} />

                    {/* ══ URL ══ */}
                    <div style={{ padding:"8px 16px 0", textAlign:"center" }}>
                      <span style={{
                        fontSize:8, fontWeight:600,
                        color:"#0EBAB0",
                        letterSpacing:"0.04em",
                      }}>
                        {client.url}
                      </span>
                    </div>

                    {/* ══ DESCRIPTION ══ */}
                    <div style={{ padding:"6px 16px", textAlign:"center", flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <p style={{
                        fontSize:10, lineHeight:1.65,
                        color:"#000102",
                        fontWeight:600,
                        margin:0,
                      }}>
                        {client.desc}
                      </p>
                    </div>

                  </div>
                  {/* ════ END CARD ════ */}

                </div>
              );
            })}
          </div>
        </div>

    



      </section>
    </>
  );
}

/* ── hex to rgb helper ── */
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}