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
  bgImage = "/images/parallaxbg.webp" 
}: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 150, 
    damping: 25,
    restDelta: 0.001,
    mass: 0.5
  });

  // Animaciones mejoradas de la imagen
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.15, 1.05, 1]);
  const imageY = useTransform(smoothProgress, [0, 0.5, 1], ["-2%", "0%", "3%"]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  
  // Overlay con mejor transición - se desvanece cuando el texto aparece
  const overlayOpacity = useTransform(smoothProgress, [0, 0.3, 0.5, 0.7, 1], [0.8, 0.6, 0.3, 0.1, 0]);
  
  // Texto aparece animadamente cuando llegamos a la mitad (0.4-0.6) - animación más sutil
  const textOpacity = useTransform(smoothProgress, [0.35, 0.5, 0.65, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(smoothProgress, [0.35, 0.5, 0.65, 0.9], [10, 0, 0, -10]);
  const textScale = useTransform(smoothProgress, [0.35, 0.5, 0.65, 0.9], [0.98, 1, 1, 0.98]);
  
  // Gradiente mejorado - aparece cuando el texto aparece
  const gradientPosition = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.8], ["-150%", "0%", "0%", "150%"]);
  
  // Animaciones separadas para cada texto - aparecen secuencialmente alrededor de la mitad (más sutiles)
  const firstTextY = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.85], [15, 0, 0, -15]);
  const secondTextY = useTransform(smoothProgress, [0.45, 0.55, 0.65, 0.85], [20, 0, 0, -20]);
  
  const firstTextOpacity = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.85], [0, 1, 1, 0]);
  const secondTextOpacity = useTransform(smoothProgress, [0.45, 0.55, 0.65, 0.85], [0, 1, 1, 0]);
  
  // Escala individual para cada texto - más sutil
  const firstTextScale = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.85], [0.96, 1, 1, 0.98]);
  const secondTextScale = useTransform(smoothProgress, [0.45, 0.55, 0.65, 0.85], [0.96, 1, 1, 0.98]);

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
            scale: imageScale,
            y: imageY,
            opacity: imageOpacity
          }}
        />
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-transparent"
        style={{ opacity: overlayOpacity }}
      />
      
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 lg:gap-8"
        style={{ 
          opacity: textOpacity,
          y: textY,
          scale: textScale
        }}
      >
        <motion.div 
          className="relative overflow-hidden px-4 sm:px-8 lg:px-20"
          style={{
            y: firstTextY,
            opacity: firstTextOpacity,
            scale: firstTextScale
          }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-wider uppercase text-center px-4 sm:px-20 lg:px-40 text-balance"
            style={{
              backgroundImage: `linear-gradient(
                60deg, 
                transparent 0%, 
                rgba(255, 255, 255, 0.95) 20%,
                #ffffff 30%, 
                #ffffff 70%, 
                rgba(255, 255, 255, 0.95) 80%,
                transparent 100%
              )`,
              backgroundSize: "250% 100%",
              backgroundPosition: gradientPosition,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 16px rgba(0, 0, 0, 0.2))"
            }}
          >
            {firstText}
          </motion.h2>
        </motion.div>
        
        {secondText && (
          <motion.div 
            className="relative overflow-hidden"
            style={{
              y: secondTextY,
              opacity: secondTextOpacity,
              scale: secondTextScale
            }}
          >
            <motion.h2 
              className="text-[48px] sm:text-[60px] lg:text-7xl font-light leading-tight tracking-wider uppercase text-center px-4 sm:px-8"
              style={{
                backgroundImage: `linear-gradient(
                  90deg, 
                  transparent 0%, 
                  rgba(255, 255, 255, 0.95) 15%,
                  #ffffff 25%, 
                  #ffffff 75%, 
                  rgba(255, 255, 255, 0.95) 85%,
                  transparent 100%
                )`,
                backgroundSize: "250% 100%",
                backgroundPosition: gradientPosition,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 16px rgba(0, 0, 0, 0.2))"
              }}
            >
              {secondText}
            </motion.h2>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
