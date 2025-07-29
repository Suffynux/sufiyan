"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import GlitchText from "@/components/glitch-text"

interface CyberLoadingProps {
  onComplete?: () => void
}

export default function CyberLoading({ onComplete }: CyberLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState("INITIALIZING SYSTEM")
  const [showSkip, setShowSkip] = useState(false)

  const texts = [
    "WELCOME TO MY PORTFOLIO",
    "LOADING MY PROJECTS",
    "CONNECTING TO GITHUB",
    "PREPARING INTERFACE",
    "READY TO EXPLORE",
  ]

  const completeLoading = useCallback(() => {
    if (onComplete) {
      onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1

        // Update text based on progress
        if (newProgress === 20) {
          setCurrentText(texts[1])
        } else if (newProgress === 40) {
          setCurrentText(texts[2])
        } else if (newProgress === 60) {
          setCurrentText(texts[3])
        } else if (newProgress === 80) {
          setCurrentText(texts[4])
        } else if (newProgress >= 100) {
          clearInterval(interval)
          completeLoading()
        }

        return newProgress > 100 ? 100 : newProgress
      })
    }, 40)

    // Show skip button after a delay
    const skipTimer = setTimeout(() => {
      setShowSkip(true)
    }, 1000)

    // Add key press event to skip loading
    const handleKeyPress = () => {
      clearInterval(interval)
      setProgress(100)
      completeLoading()
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      clearInterval(interval)
      clearTimeout(skipTimer)
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [texts, completeLoading])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Background grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="border border-white/5"></div>
        ))}
      </div>

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]"></div>

      <div className="relative z-10 w-full max-w-md px-4 text-center">
        <GlitchText
          text="SUFFYNUX"
          className="text-6xl font-black tracking-tighter mb-8"
          glitchIntensity={0.3}
          glitchColors={["#00ffff", "#ff00ff", "#ffffff"]}
        />

        <div className="mb-8 font-mono text-sm text-white/70">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {currentText}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10 mb-4 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="font-mono text-xs text-white/50">
          <span className="text-[#00ffff]">{progress}%</span> COMPLETE
        </div>

        {/* System initialization text */}
        <div className="mt-8 font-mono text-xs text-white/30 h-20 overflow-hidden">
          <div className="animate-terminal-scroll">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mb-1">
                {i % 3 === 0 ? (
                  <span>
                    <span className="text-[#00ffff]">[PORT]</span> Loading project_{Math.floor(Math.random() * 1000)}
                  </span>
                ) : i % 3 === 1 ? (
                  <span>
                    <span className="text-[#ff00ff]">[GIT]</span> Repository connected to GitHub
                  </span>
                ) : (
                  <span>
                    <span className="text-green-400">[OK]</span> Portfolio loaded successfully
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skip button */}
        {showSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-8 text-xs text-white/50 hover:text-white transition-colors"
            onClick={() => {
              setProgress(100)
              completeLoading()
            }}
          >
            PRESS ANY KEY TO SKIP
          </motion.button>
        )}
      </div>
    </div>
  )
}
