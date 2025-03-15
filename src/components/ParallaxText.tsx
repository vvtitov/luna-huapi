"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  firstText: string;
  secondText: string;
  bgImage?: string;
}

const ParallaxSection = ({ 
  firstText, 
  secondText, 
  bgImage = "/images/parallaxbg.png" 
}: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Aplicar spring para hacer las animaciones más suaves
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001
  });

  // Mejorar los rangos de animación para un movimiento más natural
  const leftX = useTransform(smoothProgress, [0, 1], ["-50%", "50%"]);
  const rightX = useTransform(smoothProgress, [0, 1], ["50%", "-50%"]);
  
  // Añadir escala para efecto de profundidad
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  
  // Mejorar la opacidad del overlay para una transición más suave
  const overlayOpacity = useTransform(smoothProgress, [0.2, 0.4, 0.6], [0.7, 0.3, 0]);
  
  // Añadir opacidad a los textos para efecto fade-in/fade-out
  const textOpacity = useTransform(smoothProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[855px] overflow-hidden flex items-center justify-center bg-background pointer-primary"
    >
      <div className="absolute inset-0">
        <motion.img
          src={bgImage}
          alt="Parallax Background"
          className="w-full h-full object-cover"
          style={{ 
            scale: useTransform(smoothProgress, [0, 1], [1.1, 1]),
            y: useTransform(smoothProgress, [0, 1], ["0%", "5%"])
          }}
        />
      </div>
      <motion.div 
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
        style={{ scale }}
      >
        <motion.div 
          style={{ 
            x: leftX,
            opacity: textOpacity,
          }}
          className="whitespace-nowrap z-10 overflow-hidden"
        >
          <motion.span 
            className="text-[60px] lg:text-7xl text-dark font-light leading-none tracking-wider uppercase block"
            style={{
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
            }}
          >
            {firstText}
          </motion.span>
        </motion.div>
        <motion.div 
          style={{ 
            x: rightX,
            opacity: textOpacity,
          }}
          className="whitespace-nowrap z-10 overflow-hidden"
        >
          <motion.span 
            className="text-[60px] lg:text-7xl text-dark font-light leading-none tracking-wider uppercase block"
            style={{
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
            }}
          >
            {secondText}
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
