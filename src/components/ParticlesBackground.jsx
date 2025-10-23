import { canvas } from "framer-motion/client"
import { use, useEffect, useRef } from "react";



export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    const numberOfParticles = 100;
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
      requestAnimationFrame(animateParticles);
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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      ref={canvasRef}
    ></canvas>
  );
}