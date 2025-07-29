"use client"

import { useEffect, useRef } from "react"

export default function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Characters to display
    const chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const charArray = chars.split("")

    // Columns
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Drops - one per column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    // Colors
    const colors = ["#0fa", "#0ff", "#f0f", "#fff"]
    const columnColors: string[] = []
    for (let i = 0; i < columns; i++) {
      columnColors[i] = colors[Math.floor(Math.random() * colors.length)]
    }

    // Drawing the characters
    function draw() {
      // Black BG for the canvas, translucent to show trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        // Random character to print
        const text = charArray[Math.floor(Math.random() * charArray.length)]

        // Gradient effect for the leading character
        if (drops[i] > 0) {
          const gradient = ctx.createLinearGradient(
            i * fontSize,
            drops[i] * fontSize,
            i * fontSize,
            (drops[i] - 5) * fontSize,
          )
          gradient.addColorStop(0, columnColors[i])
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = gradient
          ctx.fillText(text, i * fontSize, (drops[i] - 5) * fontSize)
        }

        // Main character
        ctx.fillStyle = columnColors[i]
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Sending the drop back to the top randomly after it has crossed the screen
        // Adding randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Incrementing Y coordinate
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}
