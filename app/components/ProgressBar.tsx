'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start progress immediately
    setProgress(10);

    // Simulate progress
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          return prev + Math.random() * 25;
        }
        return prev;
      });
    }, 300);

    // Complete progress when page loads
    const handleLoad = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setProgress(100);
    };

    window.addEventListener('load', handleLoad);

    // Fallback timeout
    const timeoutId = setTimeout(() => {
      handleLoad();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearTimeout(timeoutId);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Hide after reaching 100
  useEffect(() => {
    if (progress === 100) {
      const hideTimer = setTimeout(() => {
        setProgress(0);
      }, 1000);
      return () => clearTimeout(hideTimer);
    }
  }, [progress]);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 z-50 transition-all duration-300"
      style={{
        width: `${progress}%`,
        opacity: progress === 0 ? 0 : 1,
      }}
    />
  );
}
