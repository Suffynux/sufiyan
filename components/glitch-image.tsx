"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlitchImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function GlitchImage({ src, alt, width, height, className }: GlitchImageProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.05) {
        setIsGlitching(true)

        setTimeout(() => {
          setIsGlitching(false)
        }, 200)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Base image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("object-cover transition-all duration-300", isGlitching ? "scale-[1.02]" : "scale-100")}
      />

      {/* Glitch effects */}
      {isGlitching && (
        <>
          {/* Red channel */}
          <motion.div
            className="absolute inset-0 mix-blend-screen opacity-70"
            animate={{
              x: [0, -10, 5, -2, 0],
              opacity: [0, 0.8, 0.5, 0.8, 0],
            }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt=""
              width={width}
              height={height}
              className="object-cover"
              style={{ filter: "url(#redChannel)" }}
            />
          </motion.div>

          {/* Blue channel */}
          <motion.div
            className="absolute inset-0 mix-blend-screen opacity-70"
            animate={{
              x: [0, 10, -5, 2, 0],
              opacity: [0, 0.8, 0.5, 0.8, 0],
            }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt=""
              width={width}
              height={height}
              className="object-cover"
              style={{ filter: "url(#blueChannel)" }}
            />
          </motion.div>

          {/* Noise overlay */}
          <motion.div
            className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.2 }}
          />
        </>
      )}

      {/* SVG filters */}
      <svg className="absolute -z-10 opacity-0 pointer-events-none">
        <defs>
          <filter id="redChannel">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="blueChannel">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
