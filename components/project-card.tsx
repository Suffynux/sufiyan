"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  icon: ReactNode | string
  tags: string[]
  link: string
}

export default function ProjectCard({ title, description, icon, tags, link }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div
        className={cn(
          "relative h-full border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden",
          "transition-all duration-500",
          isHovered ? "border-white/30" : "border-white/10",
        )}
      >
        {/* Glowing border effect */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]",
          )}
        ></div>

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className="flex justify-between items-start mb-4">
            <div
              className={cn(
                "flex items-center justify-center w-12 h-12",
                "border border-white/20 bg-white/5",
                "transition-all duration-300",
                isHovered ? "bg-white/10" : "bg-white/5",
              )}
            >
              {typeof icon === "string" ? (
                <Image
                  src={icon || "/placeholder.svg"}
                  alt={title}
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                icon
              )}
            </div>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-white/50 hover:text-white transition-colors duration-300"
            >
              <ExternalLink className="h-5 w-5" />
            </motion.div>
          </div>

          <h3 className="text-xl font-bold mb-3 font-mono">{title}</h3>
          <p className="text-white/60 mb-6 leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag} className="px-2 py-1 text-xs font-mono border border-white/10 bg-white/5 text-white/70">
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Hover line animation */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-white"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
