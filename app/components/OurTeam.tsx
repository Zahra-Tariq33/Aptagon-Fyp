"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────── DATA */
interface TeamMember {
  name: string;
  role: string;
  image: string;
  isFounder?: boolean;
  dept?: string;
  social?: { fb?: string; tw?: string; ig?: string; li?: string };
}
const founders: TeamMember[] = [
  { name: "Syed Faizan Amjad", role: "CEO & Co-Founder", image: "/team/founders/faizan.jpeg", isFounder: true, dept: "Leadership",
    social: { li: "https://www.linkedin.com/company/aptagon", tw: "#", ig: "https://www.instagram.com/aptagon/#", fb: "https://www.facebook.com/aptagon/" } },
  { name: "Syed Furqan Amjad", role: "CEO & CDO", image: "/team/founders/furqan.jpg", isFounder: true, dept: "Leadership",
    social: { li: "https://www.linkedin.com/company/aptagon", tw: "#", ig: "https://www.instagram.com/aptagon/", fb: "https://www.facebook.com/aptagon/" } },
  { name: "Talal Nazir", role: "Chief Developer Officer", image: "/team/founders/talal.jpeg", isFounder: false, dept: "Developer",
    social: { li: "https://www.linkedin.com/company/aptagon", tw: "#", ig: "https://www.instagram.com/aptagon/", fb: "https://www.facebook.com/aptagon/" } },
];

const rowTwo: TeamMember[] = [
  { name: "Usman Muneer", role: "Full Stack Developer", image: "/usmanimg1.jpeg", dept: "Engineering",
    social: { li: "https://www.linkedin.com/company/aptagon", tw: "#", ig: "https://www.instagram.com/aptagon/", fb: "https://www.facebook.com/aptagon/" } },
  { name: "Usman Azeem", role: "Frontend Developer", image: "/team/members/usman-azeem.jpeg",  dept: "Engineering",
    social: { li: "https://www.linkedin.com/company/aptagon", tw: "#", ig: "https://www.instagram.com/aptagon/#", fb: "https://www.facebook.com/aptagon/#" } },
  { name: "Zahra Tariq", role: "Web Developer", image: "/team/members/female2.jpg", dept: "Engineering",
    social: { li: "https://www.linkedin.com/company/aptagon#", tw: "#", ig: "https://www.instagram.com/aptagon/", fb: "https://www.facebook.com/aptagon/#" } },
  { name: "Maham Waleed", role: "Web Developer", image: "/team/members/female2.jpg", dept: "Engineering",
    social: { li: "https://www.linkedin.com/company/aptagon", tw: "#", ig: "https://www.instagram.com/aptagon/", fb: "https://www.facebook.com/aptagon/" } },
 
];

const rowThree: TeamMember[] = [
   { name: "Laiba Asif", role: "Ai Automation Engineer", image: "/team/members/female2.jpg", dept: "Strategy",
    social: { li: "https://www.linkedin.com/company/aptagon#", tw: "#", ig: "https://www.instagram.com/aptagon/", fb: "https://www.facebook.com/aptagon/" } },
 
  { name: "Warda Ibrar", role: "UI/UX Designer", image: "/team/members/female2.jpg", dept: "Design",
    social: { li: "https://www.linkedin.com/company/aptagon#", tw: "#", ig: "https://www.instagram.com/aptagon/#", fb: "https://www.facebook.com/aptagon/#" } },
     { name: "Amina Ali", role: "Digital Marketing", image: "/team/members/female2.jpg", dept: "Marketing",
    social: { li: "https://www.linkedin.com/company/aptagon#", tw: "#", ig: "https://www.instagram.com/aptagon/#", fb: "https://www.facebook.com/aptagon/" } },
];

/* ─────────────────── ICONS */
const FbIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>;
const TwIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const IgIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
const LiIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;

const socials = [
  { key: "fb", icon: <FbIcon /> },
  { key: "tw", icon: <TwIcon /> },
  { key: "ig", icon: <IgIcon /> },
  { key: "li", icon: <LiIcon /> },
];

/* ─────────────────── SOCIAL BTN */
function SocialBtn({ icon, href, index, show }: { icon: React.ReactNode; href: string; index: number; show: boolean }) {
  const [h, setH] = useState(false);
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14, scale: show ? 1 : 0.7 }}
      transition={{ duration: 0.3, delay: show ? 0.18 + index * 0.06 : 0, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: 34, height: 34, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: h ? "#ffffff" : "rgba(255,255,255,0.15)",
        color: h ? "#0EBAB0" : "#ffffff",
        border: "1.5px solid rgba(255,255,255,0.4)",
        transition: "background 0.2s, color 0.2s, transform 0.2s",
        transform: h ? "scale(1.12)" : "scale(1)",
        cursor: "pointer", textDecoration: "none",
        backdropFilter: "blur(6px)",
        flexShrink: 0,
      }}
    >{icon}</motion.a>
  );
}

/* ─────────────────── MEMBER CARD */
function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      <div style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        aspectRatio: "3/3.6",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 20px 55px rgba(14,186,176,0.25), 0 6px 18px rgba(7,58,83,0.14)"
          : "0 4px 22px rgba(7,58,83,0.09)",
        transition: "box-shadow 0.4s ease",
      }}>

        {/* ── RESTING STATE ── */}
        <div style={{
          position: "absolute", inset: 0,
          background: "#ffffff",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "0.75rem",
          padding: "1.25rem 1rem 1rem",
          border: "2px solid #e4eff6",
          borderRadius: 22,
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}>
          {/* Founder badge */}
          {member.isFounder && (
            <div style={{
              position: "absolute", top: 11, left: 11,
              background: "linear-gradient(135deg,#0EBAB0,#0a9e95)",
              borderRadius: 999, padding: "0.18rem 0.6rem",
              fontSize: "0.5rem", fontWeight: 800,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#fff", boxShadow: "0 3px 10px rgba(14,186,176,0.4)",
              fontFamily: "system-ui,sans-serif",
            }}>Founder</div>
          )}

          {/* Dept badge top-right */}
          {member.dept && (
            <div style={{
              position: "absolute", top: 11, right: 11,
              background: "rgba(14,186,176,0.08)",
              border: "1px solid rgba(14,186,176,0.22)",
              borderRadius: 999, padding: "0.18rem 0.6rem",
              fontSize: "0.5rem", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#0EBAB0", fontFamily: "system-ui,sans-serif",
            }}>{member.dept}</div>
          )}

          {/* Circle photo */}
          <div style={{
            position: "relative",
            width: "62%", aspectRatio: "1/1",
            borderRadius: "50%", overflow: "hidden",
            border: "3.5px solid #e4eff6",
            boxShadow: "0 4px 20px rgba(14,186,176,0.18), 0 2px 6px rgba(7,58,83,0.08)",
            flexShrink: 0,
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg,#0EBAB0,#073A53)" }} />
            <Image src={member.image} alt={member.name} fill sizes="180px"
              style={{ objectFit: "cover", objectPosition: "center top", zIndex: 1 }} />
          </div>

          {/* Name */}
          <p style={{
            margin: 0, textAlign: "center",
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontWeight: 700, fontSize: "clamp(0.9rem,1.8vw,1.05rem)",
            color: "#073A53", letterSpacing: "-0.01em", lineHeight: 1.2,
          }}>{member.name}</p>

          {/* Role */}
          <p style={{
            margin: 0, textAlign: "center",
            fontSize: "0.68rem", fontWeight: 600,
            color: "#8aacba", letterSpacing: "0.04em",
            fontFamily: "system-ui,sans-serif",
          }}>{member.role}</p>

          {/* Bottom accent */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg,#0EBAB0,rgba(14,186,176,0.15))",
          }} />
        </div>

        {/* ── HOVER STATE ── */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", inset: 0, borderRadius: 22,
            background: "linear-gradient(155deg,#0EBAB0 0%,#0a9e95 35%,#073A53 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "0.7rem", padding: "1.25rem 1rem",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
         
          {hovered && [1, 2, 3].map(n => (
            <motion.div key={n}
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ scale: 1.8 + n * 0.4, opacity: 0 }}
              transition={{ duration: 1.2, delay: n * 0.18, ease: "easeOut", repeat: 0 }}
              style={{
                position: "absolute", width: "50%", aspectRatio: "1/1",
                borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.25)",
                pointerEvents: "none", zIndex: 1,
              }}
            />
          ))}

          {/* Decorative circle bg */}
          <div style={{
            position: "absolute",
            width: "80%", aspectRatio: "1/1", borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            top: "50%", left: "50%",
            transform: "translate(-50%,-62%)",
            zIndex: 0,
          }} />

          {/* Circle photo on teal */}
          <motion.div
            animate={{ scale: hovered ? 1 : 0.8, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative", width: "55%", aspectRatio: "1/1",
              borderRadius: "50%", overflow: "hidden",
              border: "3px solid rgba(255,255,255,0.4)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.22)",
              flexShrink: 0, zIndex: 2,
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg,#0EBAB0,#073A53)" }} />
            <Image src={member.image} alt={member.name} fill sizes="180px"
              style={{ objectFit: "cover", objectPosition: "center top", zIndex: 1 }} />
          </motion.div>

          {/* Name */}
          <motion.p
            animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.32, delay: 0.1 }}
            style={{
              margin: 0, textAlign: "center", zIndex: 2,
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontWeight: 700, fontSize: "clamp(0.9rem,1.8vw,1.05rem)",
              color: "#ffffff", letterSpacing: "-0.01em", lineHeight: 1.2,
              textShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >{member.name}</motion.p>

          {/* Role */}
          <motion.p
            animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.32, delay: 0.14 }}
            style={{
              margin: "-0.3rem 0 0", textAlign: "center", zIndex: 2,
              fontSize: "0.67rem", fontWeight: 600,
              color: "rgba(255,255,255,0.72)", letterSpacing: "0.05em",
              fontFamily: "system-ui,sans-serif",
            }}
          >{member.role}</motion.p>

          {/* Thin divider */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            style={{
              width: "45%", height: 1,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 1, zIndex: 2,
              transformOrigin: "center",
            }}
          />

          {/* Social icons */}
          <div style={{ display: "flex", gap: 7, zIndex: 2 }}>
            {socials.map((s, i) => (
              <SocialBtn key={s.key} icon={s.icon}
                href={member.social?.[s.key as keyof typeof member.social] || "#"}
                index={i} show={hovered} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── SECTION LABEL */
function SectionLabel({ label, index }: { label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "2rem" }}
    >
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ width: 32, height: 3, borderRadius: 2, background: "#0EBAB0", transformOrigin: "left", flexShrink: 0 }}
      />
      <span style={{
        color: "#073A53", fontSize: "0.62rem", fontWeight: 800,
        letterSpacing: "0.26em", textTransform: "uppercase",
        fontFamily: "system-ui,sans-serif",
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(14,186,176,0.35),transparent)" }} />
      <motion.div
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ width: 14, height: 14, flexShrink: 0, opacity: 0.4 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#0EBAB0" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── MAIN */
export default function OurTeam() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="team" style={{
      position: "relative",
      background: "linear-gradient(180deg,#f0f7fa 0%,#f6fafb 55%,#edf5f8 100%)",
      padding: "6.5rem 1.5rem 8rem",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&display=swap');
        .tg { display:grid; gap:1.3rem; }
        .tg-3 { grid-template-columns:repeat(3,1fr); }
        .tg-4 { grid-template-columns:repeat(4,1fr); }
        @media(max-width:1080px){ .tg-3,.tg-4{ grid-template-columns:repeat(3,1fr); } }
        @media(max-width:760px) { .tg-3,.tg-4{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:420px) { .tg-3,.tg-4{ grid-template-columns:1fr; } }
      `}</style>

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { w: 560, top: "-14%", right: "-7%", c: "rgba(14,186,176,0.08)" },
          { w: 460, bottom: "-10%", left: "-5%", c: "rgba(7,58,83,0.07)" },
          { w: 260, top: "42%", left: "46%", c: "rgba(14,186,176,0.05)" },
        ].map((o: any, i) => (
          <motion.div key={i}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.4 }}
            style={{
              position: "absolute", width: o.w, height: o.w,
              top: o.top, right: o.right, bottom: o.bottom, left: o.left,
              borderRadius: "50%",
              background: `radial-gradient(circle,${o.c} 0%,transparent 70%)`,
            }}
          />
        ))}
        
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle,rgba(7,58,83,0.06) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%,black 25%,transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%,black 25%,transparent 100%)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1260, margin: "0 auto" }}>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              marginBottom: "1.5rem", padding: "0.45rem 1.1rem",
              borderRadius: 999,
              background: "linear-gradient(135deg,rgba(14,186,176,0.1),rgba(7,58,83,0.05))",
              border: "1px solid rgba(14,186,176,0.24)",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
              <motion.span animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#0EBAB0" }} />
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0EBAB0", position: "relative" }} />
            </span>
            <span style={{ color: "#0EBAB0", fontSize: "0.63rem", fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>
              The People Behind The Vision
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(14,186,176,0.35)", display: "inline-block" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.82, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
             
              fontWeight: 700,
              fontSize: "3rem",
              lineHeight: 1.03, letterSpacing: "-0.03em",
              color: "#073A53", margin: 0,
            }}
          >
            Meet Our{" "}
            <span style={{
             
              backgroundImage: "linear-gradient(125deg,#0EBAB0 20%,#073A53 85%)",
              backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Awesome</span>{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              Team
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.75, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", bottom: -4, left: 0, right: 0,
                  height: 4, borderRadius: 2,
                  background: "linear-gradient(90deg,#0EBAB0,rgba(14,186,176,0.1))",
                  transformOrigin: "left",
                }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.32 }}
            style={{
              marginTop: "1.1rem", color: "#040708", fontSize: "0.98rem",
              maxWidth: 470, margin: "1.1rem auto 0",
              lineHeight: 1.76,
            }}
          >
            Passionate minds, bold thinkers, and dedicated builders united by a single mission.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.48 }}
            style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: "1.4rem" }}
          >
            {[1, 0.4, 0.2].map((o, i) => (
              <div key={i} style={{ width: i === 0 ? 22 : 6, height: 3, borderRadius: 2, background: `rgba(14,186,176,${o})` }} />
            ))}
          </motion.div>
        </div>

        {/* ── FOUNDERS (3 col, same size as others) ── */}
        <div style={{ marginBottom: "4rem" }}>
          <SectionLabel label="Founders & Leadership" index={0} />
          <div className="tg tg-3">
            {founders.map((m, i) => <MemberCard key={i} member={m} index={i} />)}
          </div>
        </div>

        {/* ── ENGINEERING (4 col) ── */}
        <div style={{ marginBottom: "4rem" }}>
          <SectionLabel label="Engineering" index={1} />
          <div className="tg tg-4">
            {rowTwo.map((m, i) => <MemberCard key={i} member={m} index={i} />)}
          </div>
        </div>

        {/* ── CREATIVE & STRATEGY (3 col, centred) ── */}
        <div>
          <SectionLabel label="Our Enthusiastic Team" index={2} />
          <div className="tg tg-3" style={{ maxWidth: 900, margin: "0 auto" }}>
            {rowThree.map((m, i) => <MemberCard key={i} member={m} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}