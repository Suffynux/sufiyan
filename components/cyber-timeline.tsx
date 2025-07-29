"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface CyberTimelineProps {
  items: TimelineItem[]
}

export default function CyberTimeline({ items }: CyberTimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00ffff] via-white to-[#ff00ff]"></div>

      {/* Timeline items */}
      <div className="space-y-8 ml-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative pl-8"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Dot */}
            <motion.div
              className={cn(
                "absolute left-0 w-2 h-2 rounded-full border border-white",
                "transform -translate-x-[5px] -translate-y-[1px]",
                activeIndex === index ? "bg-white" : "bg-black",
              )}
              animate={{
                boxShadow:
                  activeIndex === index
                    ? [
                        "0 0 0px rgba(0, 255, 255, 0)",
                        "0 0 10px rgba(0, 255, 255, 0.7)",
                        "0 0 0px rgba(0, 255, 255, 0)",
                      ]
                    : "none",
              }}
              transition={{ duration: 1.5, repeat: activeIndex === index ? Number.POSITIVE_INFINITY : 0 }}
            />

            {/* Year */}
            <div className="flex items-center mb-2">
              <div
                className={cn(
                  "font-mono text-sm px-2 py-1 border",
                  activeIndex === index ? "text-black bg-white border-white" : "text-white bg-black border-white/30",
                )}
              >
                {item.year}
              </div>
              <div
                className={cn(
                  "h-[1px] ml-2 w-16 transition-all duration-300",
                  activeIndex === index ? "bg-white" : "bg-white/30",
                )}
              />
            </div>

            {/* Content */}
            <div>
              <h3
                className={cn(
                  "text-lg font-bold mb-2 transition-colors duration-300",
                  activeIndex === index ? "text-[#00ffff]" : "text-white",
                )}
              >
                {item.title}
              </h3>
              <p className="text-white/70">{item.description}</p>
            </div>

            {/* Glitch effect on hover */}
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.2, repeat: 1 }}
                className="absolute inset-0 bg-white/5"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
