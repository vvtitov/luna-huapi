"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "../components/ui/button"

interface ParallaxCircleDividerProps {
  title: string
  buttonText: string
  onButtonClick?: () => void
}

export function ParallaxCircleDivider({ title, buttonText, onButtonClick }: ParallaxCircleDividerProps) {
  const [progress, setProgress] = useState(0)
  const dividerRef = useRef<HTMLDivElement>(null)

  const initialSize = 100
  const finalWidth = 2220
  const finalHeight = 1125

  useEffect(() => {
    const updateProgress = () => {
      if (!dividerRef.current) return

      const rect = dividerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const startOffset = viewportHeight / 1.3 - initialSize / 2
      const scrollRange = viewportHeight + rect.height - initialSize
      const scrollProgress = (startOffset - rect.top) / scrollRange

      const newProgress = Math.max(0, Math.min(1, scrollProgress * 5))
      setProgress(newProgress)
    }

    window.addEventListener("scroll", updateProgress)
    window.addEventListener("resize", updateProgress)
    updateProgress()

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
      className="relative min-w-full w-full h-full pt-10 lg:mt-0"
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
            src={"/images/parallaxbg2.webp"}
            alt="Parallax Background"
            className="object-cover w-full h-full"
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-light text-center"
            style={{ opacity: progress }}
          >
            <h2 className="text-5xl lg:text-6xl mb-6 uppercase p-4">{title}</h2>
            <Button asChild className="border border-[#6B6B6B] text-[#D1D1D1] px-8 py-4 rounded-full max-w-fit bg-transparent text-lg hover:bg-[#CADBD8] hover:text-[#3F3F3F]">
              <a href="https://www.instagram.com/lunahuapi/" onClick={onButtonClick}>
                {buttonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
