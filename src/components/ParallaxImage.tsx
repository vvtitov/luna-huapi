"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "../components/ui/button"

interface ParallaxCircleDividerProps {
  imageUrl: string
  title: string
  buttonText: string
  onButtonClick?: () => void
}

export function ParallaxCircleDivider({ imageUrl, title, buttonText, onButtonClick }: ParallaxCircleDividerProps) {
  const [progress, setProgress] = useState(0)
  const dividerRef = useRef<HTMLDivElement>(null)

  const initialSize = 100 // Tamaño del círculo inicial en px
  const finalWidth = 2220 // Ancho final en px
  const finalHeight = 1125 // Alto final en px

  useEffect(() => {
    const updateProgress = () => {
      if (!dividerRef.current) return

      const rect = dividerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Ajustamos el cálculo para que el efecto comience cuando el círculo está en el centro
      const startOffset = viewportHeight / 1.3 - initialSize / 2
      const scrollRange = viewportHeight + rect.height - initialSize
      const scrollProgress = (startOffset - rect.top) / scrollRange

      const newProgress = Math.max(0, Math.min(1, scrollProgress * 5))
      setProgress(newProgress)
    }

    window.addEventListener("scroll", updateProgress)
    window.addEventListener("resize", updateProgress)
    updateProgress() // Llamada inicial

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  const currentWidth = initialSize + (finalWidth - initialSize) * progress
  const currentHeight = initialSize + (finalHeight - initialSize) * progress
  const currentBorderRadius = 50 * (1 - progress)

  return (
    <div
      ref={dividerRef}
      className="relative min-w-full w-full h-full mt-30 lg:mt-0"
      style={{ height: `${Math.max(finalHeight, window.innerHeight)}px` }}
    >
      <div className="sticky top-0 flex justify-center min-w-full">
        <div
          className="relative overflow-hidden transition-all duration-100 ease-in-out"
          style={{
            width: `${currentWidth}px`,
            height: `${currentHeight}px`,
            borderRadius: `${currentBorderRadius}%`,
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        >
          <img
            src={"/images/parallaxbg.png"}
            alt="Parallax Background"
            className="object-cover w-full h-full"
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-light text-center"
            style={{ opacity: progress }}
          >
            <h2 className="text-6xl lg:text-7xl mb-6 uppercase">{title}</h2>
            <Button variant="default" className="px-6 py-4 my-10 rounded-full text-xl bg-background text-primary font-light" onClick={onButtonClick}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
