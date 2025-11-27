import { useEffect, useRef, useState } from "react";

/**
 * Particle quality levels: 'high' | 'medium' | 'low' | 'off'
 * @typedef {'high' | 'medium' | 'low' | 'off'} ParticlesQuality
 */

/**
 * Detects device capabilities and returns appropriate particle quality
 * @returns {ParticlesQuality}
 */
function detectParticleQuality() {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'off';
  }

  // Check device memory (if available)
  const deviceMemory = navigator.deviceMemory;
  if (deviceMemory && deviceMemory < 4) {
    return 'low';
  }

  // Check CPU cores
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  if (hardwareConcurrency < 4) {
    return 'low';
  }

  // Check connection (if available)
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 'off';
    }
    if (effectiveType === '3g') {
      return 'low';
    }
  }

  // Default to medium for balance
  return 'medium';
}

/**
 * Gets particle count based on quality level
 * @param {ParticlesQuality} quality
 * @returns {number}
 */
function getParticleCount(quality) {
  switch (quality) {
    case 'high':
      return 150;
    case 'medium':
      return 75;
    case 'low':
      return 30;
    case 'off':
      return 0;
    default:
      return 75;
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  const [quality, setQuality] = useState('medium');
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Detect quality on mount
    const detectedQuality = detectParticleQuality();
    setQuality(detectedQuality);

    if (detectedQuality === 'off') {
      setShouldRender(false);
      return;
    }

    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    const numberOfParticles = getParticleCount(quality);
    let animationFrameId = null;
    const colors = [
      "rgba(255, 255, 255, 0.5)",
      "rgba(255, 255, 255, 0.3)",
      "rgba(255, 255, 255, 0.1)",
    ];
    let mouse = { x: null, y: null };

    class Particle {
      constructor(x, y, size, color, vx, vy) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
      }
      update() {
        // Slight floating movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse hover effect
        if (
          mouse.x &&
          mouse.y &&
          Math.hypot(this.x - mouse.x, this.y - mouse.y) < 80
        ) {
          // Move away from cursor
          const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
          this.vx += Math.cos(angle) * 0.2;
          this.vy += Math.sin(angle) * 0.2;
        }

        // Limit velocity
        this.vx = Math.max(Math.min(this.vx, 0.5), -0.5);
        this.vy = Math.max(Math.min(this.vy, 0.5), -0.5);
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      // Lower speed for more floaty effect
      const vx = (Math.random() - 0.5) * 0.08;
      const vy = (Math.random() - 0.5) * 0.08;
      particlesArray.push(new Particle(x, y, size, color, vx, vy));
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    function handleMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    initParticles();
    animateParticles();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [quality, shouldRender]);

  // Don't render if particles are disabled
  if (!shouldRender) {
    return (
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-gradient-to-br from-[#302b63]/20 via-[#00bf8f]/10 to-[#1cd8d2]/20" />
    );
  }

  return (
    <canvas
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      ref={canvasRef}
      aria-hidden="true"
    ></canvas>
  );
}