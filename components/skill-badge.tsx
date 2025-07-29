"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  icon: ReactNode
  name: string
}

export default function SkillBadge({ icon, name }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        "bg-zinc-900 border border-zinc-800",
        "text-sm text-gray-300",
        "transition-all duration-300 hover:border-white/50",
      )}
    >
      {icon}
      {name}
    </motion.div>
  )
}
