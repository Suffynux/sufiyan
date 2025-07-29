"use client"

import type React from "react"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAudio } from "@/hooks/use-audio"

interface CyberButtonProps {
  children: ReactNode
  href?: string
  variant?: "primary" | "outline"
  size?: "default" | "sm"
  soundEffect?: "click" | "hover" | "none"
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  className?: string
}

export default function CyberButton({
  children,
  href,
  variant = "primary",
  size = "default",
  soundEffect = "none",
  onClick,
  className,
}: CyberButtonProps) {
  const isExternal = href?.startsWith("http")

  const { playSound } = useAudio()

  const handleMouseEnter = () => {
    if (soundEffect === "hover") {
      try {
        playSound("/audio/hover.mp3")
      } catch (error) {
        console.warn("Could not play hover sound effect")
      }
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (soundEffect === "click") {
      try {
        playSound("/audio/click.mp3")
      } catch (error) {
        console.warn("Could not play click sound effect")
      }
    }

    if (onClick) {
      onClick(e)
    }
  }

  const buttonContent = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden",
        "font-mono font-bold tracking-wider",
        size === "default" ? "px-6 py-3 text-sm" : "px-4 py-2 text-xs",
        variant === "primary"
          ? "bg-white text-black hover:bg-white/90"
          : "border border-white/30 bg-black/50 text-white hover:border-white/50",
        "transition-all duration-300",
        "cursor-pointer",
        className,
      )}
    >
      {/* Glowing effect */}
      <span
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          variant === "primary"
            ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)]"
            : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]",
        )}
      ></span>

      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50"></span>
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50"></span>
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50"></span>

      {/* Button text */}
      <span className="relative z-10">{children}</span>

      {/* Hover effect */}
      <span
        className={cn(
          "absolute inset-0 z-0 opacity-0 transition-opacity duration-300",
          variant === "primary" ? "bg-white/20" : "bg-white/10",
          "group-hover:opacity-100",
        )}
      ></span>
    </motion.div>
  )

  if (!href) {
    return <div className="group">{buttonContent}</div>
  }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group">
        {buttonContent}
      </a>
    )
  }

  return (
    <Link href={href} className="group">
      {buttonContent}
    </Link>
  )
}
