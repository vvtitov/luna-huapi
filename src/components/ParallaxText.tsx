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

  const leftX = useTransform(scrollYProgress, [0, 0.9], ["-150%", "200%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.9], ["150%", "-200%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[855px] overflow-hidden flex items-center justify-center bg-background pointer-primary"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src="/paralaxbg.png"
          alt="Parallax Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay que se desvanece */}
      <motion.div 
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />

      {/* Container para los textos */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        {/* Texto izquierdo */}
        <motion.div 
          style={{ x: leftX }}
          className="whitespace-nowrap z-10"
        >
          <span className="text-[60px] lg:text-7xl text-dark leading-none tracking-wider uppercase">
            {firstText}
          </span>
        </motion.div>
        
        {/* Texto derecho */}
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
