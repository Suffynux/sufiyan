"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Gift } from "lucide-react"

interface FloatingGift {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  duration: number
  delay: number
  color: string
}

export default function FloatingGifts() {
  const [gifts, setGifts] = useState<FloatingGift[]>([])

  useEffect(() => {
    // Create random gifts
    const newGifts: FloatingGift[] = []
    const colors = ["#00ffff", "#ff00ff", "#ffffff", "#ffcc00", "#00ff99"]

    for (let i = 0; i < 15; i++) {
      newGifts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * -100,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 360,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setGifts(newGifts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {gifts.map((gift) => (
        <motion.div
          key={gift.id}
          className="absolute"
          style={{
            left: `${gift.x}%`,
            top: `${gift.y}%`,
          }}
          animate={{
            y: ["0vh", "100vh"],
            rotate: [gift.rotation, gift.rotation + 360],
          }}
          transition={{
            y: {
              duration: gift.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: gift.delay,
            },
            rotate: {
              duration: gift.duration / 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: gift.delay,
            },
          }}
        >
          <Gift
            style={{
              width: gift.size,
              height: gift.size,
              color: gift.color,
              opacity: 0.6,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
