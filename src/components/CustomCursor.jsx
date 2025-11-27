import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CURSOR_STORAGE_KEY = 'cursor-enabled';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if custom cursor should be enabled
    const checkEnabled = () => {
      // Check user preference from localStorage
      const storedPreference = localStorage.getItem(CURSOR_STORAGE_KEY);
      if (storedPreference !== null) {
        setIsEnabled(storedPreference === 'true');
        return;
      }

      // Default: only enable on large screens (>1024px) with pointer capability
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const shouldEnable = isLargeScreen && hasFinePointer && !prefersReducedMotion;
      setIsEnabled(shouldEnable);
      
      // Store default preference
      if (shouldEnable) {
        localStorage.setItem(CURSOR_STORAGE_KEY, 'true');
      }
    };
    
    checkEnabled();
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => checkEnabled();
    mediaQuery.addEventListener('change', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    // Throttle mouse updates for performance
    let rafId: number;
    const updateMousePosition = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border-2 border-cyan-400 ${
          isHovering ? 'w-12 h-12' : 'w-8 h-8'
        }`}
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
    </>
  );
};

export default CustomCursor;
