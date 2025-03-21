"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Words for the animated text rotation
  const words = [
    "Students",
    "Professionals",
    "Creators",
    "Innovators",
    "Dreamers",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 100 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    mouseX.set(mousePosition.x * 0.05);
    mouseY.set(mousePosition.y * 0.05);
  }, [mousePosition]);

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Solid color background elements instead of blurred orbs */}
        {/* {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(to right, #6366f1, #a78bfa)"
                  : "linear-gradient(to right, #f97316, #a855f7)",
              width: `${180 + i * 60}px`,
              height: `${180 + i * 60}px`,
              top: `${15 + i * 10}%`,
              left: `${5 + i * 12}%`,
              x: mouseX,
              y: mouseY,
              scale: isHovering ? 1.05 : 1,
              opacity: 0.05, // Reduced opacity, no blur
            }}
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -30, 30, 0],
              transition: {
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.5,
              },
            }}
          />
        ))} */}
      </div>

      {/* Main content - Centered and scaled up */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="text-center flex flex-col items-center"
        >
          {/* SPARK title with solid effect (no blur) */}
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span
              className="text-8xl sm:text-9xl lg:text-[10rem] font-serif font-bold tracking-tight mb-8 inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
            >
              <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-violet-400 text-transparent bg-clip-text">
                S
              </span>
              <motion.span
                className="bg-gradient-to-r from-indigo-600 via-purple-500 to-violet-400 text-transparent bg-clip-text"
                animate={{
                  rotateY: [0, 360],
                  transition: {
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                    delay: 2,
                  },
                }}
              >
                P
              </motion.span>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-violet-400 text-transparent bg-clip-text">
                A
              </span>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-violet-400 text-transparent bg-clip-text">
                R
              </span>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-violet-400 text-transparent bg-clip-text">
                K
              </span>
            </motion.span>

            {/* Solid shadow instead of blurred */}
            <motion.span
              className="absolute -bottom-6 left-0 right-0 text-8xl sm:text-9xl lg:text-[10rem] font-serif font-bold tracking-tight text-transparent opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              SPARK
            </motion.span>
          </motion.div>

          {/* Tagline with animated text rotation */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl mt-10 leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Let's Collaborate, Connect & Grow for{" "}
            <span className="relative inline-block w-64 h-14 align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-violet-700 text-transparent bg-clip-text font-bold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {words[activeIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          {/* Description with character-by-character animation */}
          <motion.p
            className="mt-8 text-2xl text-neutral-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {"Empower your creativity and bring your ideas to one of the most trusted platform"
              .split("")
              .map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.8 + index * 0.01,
                    ease: "easeOut",
                  }}
                >
                  {char}
                </motion.span>
              ))}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
