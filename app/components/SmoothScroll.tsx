"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  
  useLayoutEffect(() => {
    // 1. Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2, // Speed of the scroll (higher = smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Natural "feel" easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // 3. Sync ScrollTrigger with Lenis
    // This is the "secret sauce" that makes GSAP animations perfectly smooth
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}