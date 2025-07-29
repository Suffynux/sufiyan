"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, AlertCircle } from "lucide-react"

interface AudioControllerProps {
  isPlaying: boolean
  toggleAudio: () => void
  volume: number
  setVolume: (volume: number) => void
  audioError?: boolean
}

export default function AudioController({
  isPlaying,
  toggleAudio,
  volume,
  setVolume,
  audioError = false,
}: AudioControllerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="relative">
        {/* Volume slider */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-12 right-0 bg-black/80 backdrop-blur-sm border border-white/20 p-3 rounded-lg"
          >
            {audioError ? (
              <div className="text-xs text-white/70 mb-2 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1 text-red-400" />
                <span>Audio unavailable</span>
              </div>
            ) : (
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00ffff ${volume * 100}%, rgba(255, 255, 255, 0.2) ${volume * 100}%)`,
                }}
              />
            )}
          </motion.div>
        )}

        {/* Audio toggle button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (!audioError) toggleAudio()
            setIsOpen(!isOpen)
          }}
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm border ${
            audioError ? "border-red-400/30" : "border-white/20"
          }`}
        >
          {audioError ? (
            <AlertCircle className="w-5 h-5 text-red-400/70" />
          ) : isPlaying ? (
            <Volume2 className="w-5 h-5 text-[#00ffff]" />
          ) : (
            <VolumeX className="w-5 h-5 text-white/70" />
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
