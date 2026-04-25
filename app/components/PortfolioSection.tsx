"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { id: "1", image: "/logos/port1.png", title: "Strategic Growth Partners" },
  { id: "2", image: "/logos/port2.png", title: "Food & Dining UI/UX" },
  { id: "3", image: "/logos/port3.png", title: "Mobile Accessories Store" },
  { id: "4", image: "/logos/port6.png", title: "Windsor – Your Gateway to Global Education" },
  { id: "5", image: "/logos/port5.png", title: "Study Abroad Consultancy UI/UX" },
];

export default function PortfolioSection() {
  const triggerRef = useRef(null);
  const horizontalRef = useRef(null);
  const curtainLeft = useRef(null);
  const curtainRight = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=8000",
        scrub: 1.5, // Increased scrub slightly for smoother "liquid" movement
        pin: true,
      },
    });

    // 1. Curtain Split (Removed border/line in JSX below)
    tl.to(curtainLeft.current, { x: "-100%", duration: 4, ease: "power2.inOut" }, 0)
      .to(curtainRight.current, { x: "100%", duration: 4, ease: "power2.inOut" }, 0)
      
      // 2. Attractive Text Animation (Reveal with scale and blur)
      .fromTo(".zoom-p", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 3 }, 1)
      .fromTo(".zoom-h1", 
        { scale: 0.8, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 5, ease: "power4.out" }, 1.5)

    // 3. Smooth Reveal the Gallery
    tl.to(".intro-overlay", { 
        y: "-100%", 
        duration: 4, 
        ease: "expo.inOut" 
    }, "+=1");

    // 4. Horizontal Scroll
    tl.to(horizontalRef.current, {
      x: "-300vw",
      duration: 15,
      ease: "none",
    });
  }, []);

  return (
    <div ref={triggerRef} className="relative overflow-hidden h-screen bg-[#0EBAB033]">
      
      {/* FIXED BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 bg-[#0EBAB033]" />

      {/* CURTAINS - Removed border-l to get rid of the center line */}
      <div className="absolute inset-0 z-[100] flex pointer-events-none">
        <div ref={curtainLeft} className="w-1/2 h-full bg-white flex items-center justify-end overflow-hidden">
           <h2 className="text-[15vw] font-black text-[#1a365d] translate-x-[5%] pr-10 select-none">PORT</h2>
        </div>
        <div ref={curtainRight} className="w-1/2 h-full bg-white flex items-center justify-start overflow-hidden">
           <h2 className="text-[15vw] pl-10 font-black text-[#1a365d] -translate-x-[5%] select-none">FOLIO</h2>
        </div>
      </div>

      {/* ZOOMING INTRO LAYER */}
      <div className="intro-overlay absolute inset-0 z-[90] bg-white flex items-center justify-center text-center px-10">
        <div className="will-change-transform max-w-5xl">
          <p className="zoom-p text-[#0EBAB0] font-bold uppercase tracking-[0.3em] text-lg mb-6">
            The highlights of our creations
          </p>
          <h1 className="zoom-h1 text-3xl md:text-5xl font-black text-[#1a365d] leading-[1.1] tracking-tight">
          Transforming Ideas into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a365d] to-[#0EBAB0]">Powerful Digital Product</span>
          </h1>
        </div>
      </div>

      {/* GALLERY SECTION */}
      <div ref={horizontalRef} className="flex h-screen w-[400vw] relative z-20 items-center">
        {portfolioItems.map((item) => (
          <section key={item.id} className="h-screen w-[100vw] flex items-center justify-center py-[15px]">
            <div className="relative h-full flex flex-col group transition-all duration-500">
              
              {/* IMAGE BOX */}
              <div className="relative flex-1 w-[60vw] md:w-[50vw] mt-28 mb-0 overflow-hidden rounded-2xl">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-contain transition-transform duration-1000 ease-out group-hover:scale-110"
                  sizes="50vw"
                  priority
                />
              </div>

              {/* LOWER TITLE */}
              <div className="py-8 w-full text-center">
                <h3 className="text-[#1a365d] text-4xl md:text-4xl font-bold tracking-tighter uppercase leading-none opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.title}
                </h3>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}