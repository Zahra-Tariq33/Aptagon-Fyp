"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  MapPin,
  Mail,
  ChevronDown,
  Globe,
  Smartphone,
  Layout,
  Cpu,
  CheckCircle,
  BrainCircuit,
  MessageSquare,
  Sparkles,
} from "lucide-react";

type DropdownType = "services" | null;

const services = [
  { title: "Web Development", desc: "Scalable and high-performing websites.", href: "/services/web-development", icon: <Globe size={20} /> },
  { title: "Mobile App Development", desc: "Innovative and seamless mobile apps.", href: "/services/mobile-apps", icon: <Smartphone size={20} /> },
  { title: "UI/UX Designing", desc: "Creative and user-focused designs.", href: "/services/ui-ux", icon: <Layout size={20} /> },
  { title: "Business Process Automation", desc: "Smart automation for efficiency.", href: "/services/business-process-automation", icon: <Cpu size={20} /> },
  { title: "Software Quality Assurance", desc: "Reliable and error-free software.", href: "/services/sqa", icon: <CheckCircle size={20} /> },
  { title: "LLM Development & Training", desc: "Custom-trained language models.", href: "/services/llm-development", icon: <BrainCircuit size={20} /> },
  { title: "Chatbot Development", desc: "Intelligent bots for engagement.", href: "/services/chatbots", icon: <MessageSquare size={20} /> },
  { title: "AI & Generative Solutions", desc: "Transformative AI-driven innovations.", href: "/services/ai", icon: <Sparkles size={20} /> },
];

const ServiceCard = ({ service, onClick }: { service: (typeof services)[0]; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const [burst, setBurst] = useState(false);

  return (
    <Link
      href={service.href}
      onClick={onClick}
      onMouseEnter={() => {
        setHovered(true);
        setBurst(true);
        setTimeout(() => setBurst(false), 750);
      }}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "block", textDecoration: "none" }}
    >
      <div
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: 18,
          background: "linear-gradient(135deg, #0EBAB0, #073A53, #0EBAB0)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: 16,
          background: "#fff",
          border: "1px solid rgba(14,186,176,0.6)",
          boxShadow: hovered ? "0 12px 40px rgba(14,186,176,0.35)" : "0 8px 28px rgba(14,186,176,0.22)",
          transition: "box-shadow 0.4s ease, border 0.3s ease",
          padding: "1.1rem",
          minHeight: 130,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <motion.div
          initial={false}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, #073A53 0%, #0a4f6e 100%)",
            transformOrigin: "bottom",
            borderRadius: 16,
            zIndex: 0,
          }}
        />
        {burst &&
          Array.from({ length: 8 }).map((_, i) => {
            const rad = ((i / 8) * 360 * Math.PI) / 180;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], x: Math.cos(rad) * 55, y: Math.sin(rad) * 55, scale: [0, 1.3, 0] }}
                transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "40%",
                  width: 6,
                  height: 6,
                  marginLeft: -3,
                  marginTop: -3,
                  borderRadius: "50%",
                  background: "#0EBAB0",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              />
            );
          })}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: hovered ? "linear-gradient(135deg, #0EBAB0, #0a9e95)" : "linear-gradient(135deg, #effcfb, #e3f7f6)",
              boxShadow: hovered ? "0 6px 20px rgba(14,186,176,0.4)" : "0 2px 8px rgba(14,186,176,0.12)",
              color: hovered ? "#fff" : "#0EBAB0",
              marginBottom: "0.75rem",
              transition: "all 0.35s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            {service.icon}
          </div>
          <h4 style={{ fontSize: "0.8rem", fontWeight: 800, color: hovered ? "#fff" : "#073A53", marginBottom: "0.35rem", lineHeight: 1.3, transition: "color 0.3s ease" }}>
            {service.title}
          </h4>
          <p style={{ fontSize: "0.68rem", fontWeight: 500, color: hovered ? "rgba(182,222,232,0.88)" : "#6b8fa2", lineHeight: 1.6, flexGrow: 1, transition: "color 0.3s ease" }}>
            {service.desc}
          </p>
          <motion.span
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: "0.65rem", fontWeight: 700, color: "#0EBAB0", display: "flex", alignItems: "center", gap: 4, marginTop: "0.5rem" }}
          >
            Explore More <span style={{ fontSize: "1rem" }}>→</span>
          </motion.span>
        </div>
      </div>
    </Link>
  );
};

const TransparentNavbar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  useEffect(() => {
    const handleTriggerMenu = () => setOpenDropdown("services");
    window.addEventListener("openNavbarDropdown", handleTriggerMenu);
    return () => window.removeEventListener("openNavbarDropdown", handleTriggerMenu);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex w-full flex-col">
      <div className="flex min-h-9 w-full flex-wrap items-center justify-center gap-3 bg-gradient-to-r from-[#0EBAB0] to-[#073A53] px-3 py-2 text-[11px] text-white sm:gap-6 sm:text-[12px]">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Phone size={14} />
          <span className="font-medium">+44 7882 610679</span>
          <span className="mx-1 opacity-60">|</span>
          <Phone size={14} />
          <span className="font-medium">+92 370 4640036</span>
        </div>
        <span className="opacity-60">|</span>
        <div className="flex max-w-[90vw] flex-wrap items-center justify-center gap-1">
          <MapPin size={14} className="shrink-0" />
          <span className="text-center font-medium">Benazir road Dolphin mall building number 25 okara</span>
        </div>
        <span className="opacity-60">|</span>
        <div className="flex items-center gap-2">
          <Mail size={14} />
          <span className="font-medium">hr@aptagon.com</span>
        </div>
      </div>

      <nav className="relative z-20 bg-white shadow-md">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-3 lg:h-20 lg:flex-row lg:items-center lg:justify-between lg:py-0  ">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="relative h-12 w-40 shrink-0 sm:w-44">
              <Image src="/logos/logo-blue.png" alt="Logo" fill className="object-contain" priority />
            </Link>
           
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-7 lg:flex-1 lg:justify-center">
            <NavLink href="/" isActive={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/about" isActive={pathname === "/about"}>
              Who We Are
            </NavLink>
            {/* <NavLink href="/courses" isActive={pathname === "/courses"}>
              Courses
            </NavLink> */}

            <div className="relative py-1 lg:py-7">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
                className={`flex items-center gap-1 text-[13px] font-bold uppercase tracking-wider transition-all sm:text-[14px] ${pathname.includes("/services") || openDropdown === "services" ? "text-[#0EBAB0]" : "text-[#073A53]"}`}
              >
                What We Do
                <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === "services" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="left-0 top-full z-30 mt-2 w-[min(1200px,calc(100vw-2rem))] max-h-[min(80vh,720px)] overflow-y-auto rounded-b-[20px] border-t-4 border-[#0EBAB0] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] lg:absolute lg:left-1/2 lg:mt-0 lg:-translate-x-1/2  "
                  >
                    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:p-8">
                      {services.map((service) => (
                        <ServiceCard key={service.title} service={service} onClick={() => setOpenDropdown(null)} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/blogs" isActive={pathname === "/blogs"}>
              Blogs
            </NavLink>
            <NavLink href="/reach-us" isActive={pathname === "/reach-us"}>
              Reach Us
            </NavLink>
            <NavLink href="/dashboard/admin" isActive={pathname.startsWith("/dashboard/admin")}>
              Admin
            </NavLink>
            <NavLink href="/auth" isActive={pathname === "/auth"}>
              Sign in
            </NavLink>

            
          </div>
           <Link
              href="/schedule-call"
              className="inline-flex shrink-0 rounded-full bg-gradient-to-r from-[#0EBAB0] to-[#073A53] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-[#0EBAB0]/20 transition-transform hover:scale-105 sm:px-8 sm:py-3 sm:text-[12px] lg:order-last"
            >
              Schedule a Call
            </Link>
        </div>
      </nav>
    </header>
  );
};

const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => (
  <Link
    href={href}
    className={`border-b-2 pb-0.5 text-[13px] font-bold uppercase tracking-wider transition-all sm:text-[14px] ${isActive ? "border-[#0EBAB0] text-[#0EBAB0]" : "border-transparent text-[#073A53] hover:text-[#0EBAB0]"}`}
  >
    {children}
  </Link>
);

export default TransparentNavbar;
