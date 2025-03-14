"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  firstText: string;
  secondText: string;
}

const ParallaxSection = ({ firstText, secondText }: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftX = useTransform(scrollYProgress, [0, 0.9], ["-130%", "300%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.9], ["130%", "-300%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0.8, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[855px] overflow-hidden flex items-center justify-center bg-background pointer-primary"
    >
      <div className="absolute inset-0">
        <img
          src="/images/parallaxbg.png"
          alt="Parallax Background"
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div 
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <motion.div 
          style={{ x: leftX }}
          className="whitespace-nowrap z-10"
        >
          <span className="text-[60px] lg:text-7xl text-dark leading-none tracking-wider uppercase">
            {firstText}
          </span>
        </motion.div>
        <motion.div 
          style={{ x: rightX }}
          className="whitespace-nowrap z-10"
        >
          <span className="text-[60px] lg:text-7xl text-dark leading-none tracking-wider uppercase">
            {secondText}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxSection;
