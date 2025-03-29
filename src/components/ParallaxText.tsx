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
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001
  });

  const imageScale = useTransform(smoothProgress, [0, 1], [1.1, 1]);
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "5%"]);
  
  const overlayOpacity = useTransform(smoothProgress, [0.2, 0.4, 0.6], [0.7, 0.3, 0]);
  
  const textProgress = useTransform(smoothProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  
  const gradientPosition = useTransform(smoothProgress, [0.1, 0.5, 0.9], ["-100%", "0%", "100%"]);

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
            y: imageY
          }}
        />
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />
      
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ opacity: textProgress }}
      >
        <motion.div className="relative overflow-hidden px-20">
          <motion.h2 
            className="text-5xl lg:text-6xl font-light leading-none tracking-wider uppercase text-center px-40"
            style={{
              backgroundImage: `linear-gradient(
                90deg, 
                transparent 0%, 
                #ffffff 25%, 
                #ffffff 75%, 
                transparent 100%
              )`,
              backgroundSize: "200% 100%",
              backgroundPosition: gradientPosition,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
            }}
          >
            {firstText}
          </motion.h2>
        </motion.div>
        
        <motion.div className="relative overflow-hidden">
          <motion.h2 
            className="text-[60px] lg:text-7xl font-light leading-none tracking-wider uppercase text-center"
            style={{
              backgroundImage: `linear-gradient(
                90deg, 
                transparent 0%, 
                #ffffff 25%, 
                #ffffff 75%, 
                transparent 100%
              )`,
              backgroundSize: "200% 100%",
              backgroundPosition: gradientPosition,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
            }}
          >
            {secondText}
          </motion.h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
