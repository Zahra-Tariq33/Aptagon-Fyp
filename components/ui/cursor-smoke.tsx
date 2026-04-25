"use client";

import React, { useEffect, useMemo, useRef } from "react";

type SmokeParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

export function CursorSmoke() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    hasMoved: false,
  });
  const rafRef = useRef<number | null>(null);

  const settings = useMemo(
    () => ({
      gravity: 0.02,
      drag: 0.96,
      fadeSpeed: 0.012,
      spawnDivisor: 5,
      maxPerFrame: 10,
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const spawn = (count: number, baseVx: number, baseVy: number) => {
      const m = mouseRef.current;
      const particles: SmokeParticle[] = [];
      for (let i = 0; i < count; i++) {
        const spread = 8;
        const t = i / Math.max(1, count);
        const offsetX = (Math.random() - 0.5) * spread - baseVx * (t - 0.5) * 0.2;
        const offsetY = (Math.random() - 0.5) * spread - baseVy * (t - 0.5) * 0.2;
        const vx = (Math.random() - 0.5) * 0.8 + baseVx * 0.01;
        const vy = (Math.random() - 0.5) * 0.8 + baseVy * 0.01;
        particles.push({
          x: m.x + offsetX,
          y: m.y + offsetY,
          vx,
          vy,
          life: 1,
          maxLife: 1,
          size: Math.random() * 22 + 10,
        });
      }
      particlesRef.current.push(...particles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const m = mouseRef.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX - rect.left;
      m.y = e.clientY - rect.top;
      m.hasMoved = true;

      const dx = m.x - m.prevX;
      const dy = m.y - m.prevY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(
        settings.maxPerFrame,
        Math.max(1, Math.ceil(distance / settings.spawnDivisor))
      );
      if (count > 0) spawn(count, dx, dy);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const next: SmokeParticle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01;
        p.vy += settings.gravity;
        p.vx *= settings.drag;
        p.vy *= settings.drag;
        p.size += 0.25;
        p.life -= settings.fadeSpeed;

        if (p.life <= 0) continue;

        next.push(p);

        const lifeNorm = Math.max(0, Math.min(1, p.life / p.maxLife));
        const opacity = lifeNorm * 0.65;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(14,186,176,${opacity})`);
        grad.addColorStop(0.5, `rgba(56,189,248,${opacity * 0.7})`);
        grad.addColorStop(1, `rgba(129,140,248,0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      particlesRef.current = next;
      rafRef.current = window.requestAnimationFrame(draw);
    };

    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [settings]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ filter: "blur(25px)", mixBlendMode: "normal", opacity: 0.9 }}
    />
  );
}

