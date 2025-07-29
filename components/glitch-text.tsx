"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: number
  glitchColors?: string[]
}

export default function GlitchText({
  text,
  className,
  glitchIntensity = 0.1,
  glitchColors = ["#00ffff", "#ff00ff"],
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        setIsGlitching(true)

        // Create glitched text
        const glitchedText = text
          .split("")
          .map((char) => {
            if (Math.random() < 0.3) {
              const glitchChars = "!<>-_\\/[]{}—=+*^?#________"
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            }
            return char
          })
          .join("")

        setDisplayText(glitchedText)

        // Reset after a short delay
        setTimeout(() => {
          setDisplayText(text)
          setIsGlitching(false)
        }, 100)
      }
    }, 150)

    return () => clearInterval(glitchInterval)
  }, [text, glitchIntensity])

  return (
    <div className="relative inline-block">
      {isGlitching && (
        <>
          <div
            className="absolute inset-0 opacity-70 translate-x-[1px] translate-y-[-1px]"
            style={{ color: glitchColors[0] }}
          >
            {displayText}
          </div>
          <div
            className="absolute inset-0 opacity-70 translate-x-[-1px] translate-y-[1px]"
            style={{ color: glitchColors[1] }}
          >
            {displayText}
          </div>
        </>
      )}
      <motion.span
        className={cn("relative", className)}
        animate={{
          x: isGlitching ? [0, -2, 2, -1, 1, 0] : 0,
          y: isGlitching ? [0, 1, -1, 1, -1, 0] : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {displayText}
      </motion.span>
    </div>
  )
}
