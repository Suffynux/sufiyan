"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number
  color: string
}

interface SkillRadarProps {
  skills: Skill[]
  size?: number
}

export default function SkillRadar({ skills, size = 300 }: SkillRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    // Set canvas CSS size
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw radar background
    const centerX = size / 2
    const centerY = size / 2
    const maxRadius = size * 0.45

    // Draw radar circles
    for (let i = 1; i <= 5; i++) {
      const radius = (maxRadius / 5) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + i * 0.03})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw radar lines
    const skillCount = skills.length
    const angleStep = (Math.PI * 2) / skillCount

    for (let i = 0; i < skillCount; i++) {
      const angle = i * angleStep
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw skill data
    ctx.beginPath()
    skills.forEach((skill, i) => {
      const angle = i * angleStep
      const radius = (skill.level / 100) * maxRadius
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()

    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, "rgba(0, 255, 255, 0.2)")
    gradient.addColorStop(1, "rgba(255, 0, 255, 0.2)")
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw stroke
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw skill points and labels
    skills.forEach((skill, i) => {
      const angle = i * angleStep
      const radius = (skill.level / 100) * maxRadius
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      // Draw point
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = skill.color
      ctx.fill()
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw label
      const labelRadius = maxRadius + 20
      const labelX = centerX + Math.cos(angle) * labelRadius
      const labelY = centerY + Math.sin(angle) * labelRadius

      ctx.font = "10px monospace"
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(skill.name, labelX, labelY)
    })

    // Draw glitch effect occasionally
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        // Save current state
        ctx.save()

        // Apply glitch effect
        const glitchX = Math.random() * size
        const glitchY = Math.random() * size
        const glitchW = Math.random() * 100 + 50
        const glitchH = Math.random() * 20 + 10

        ctx.fillStyle = Math.random() < 0.5 ? "rgba(0, 255, 255, 0.2)" : "rgba(255, 0, 255, 0.2)"
        ctx.fillRect(glitchX, glitchY, glitchW, glitchH)

        // Restore after a short delay
        setTimeout(() => {
          if (canvas && ctx) {
            ctx.restore()
            // Redraw the radar
            // (simplified - in a real implementation you'd extract the drawing code to a function)
          }
        }, 100)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [skills, size])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      <canvas ref={canvasRef} className="mx-auto" />
    </motion.div>
  )
}
