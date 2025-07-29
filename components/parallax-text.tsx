"use client"

import { useRef, useState, useEffect } from "react"
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion"
import { wrap } from "@/lib/utils"

interface ParallaxProps {
  children: string
  baseVelocity: number
}

// Client-only scroll hook
function useClientScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Get initial value
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return { scrollY: useMotionValue(scrollY), mounted }
}

export default function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const [mounted, setMounted] = useState(false)
  const baseX = useMotionValue(0)
  
  // Use client-only scroll
  const { scrollY, mounted: scrollMounted } = useClientScroll()
  
  // Always create hooks to follow Rules of Hooks
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useAnimationFrame((t, delta) => {
    if (!mounted || !scrollMounted) return
    
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="parallax">
        <div className="scroller">
          <span className="text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap pr-12">{children} </span>
          <span className="text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap pr-12">{children} </span>
          <span className="text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap pr-12">{children} </span>
          <span className="text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap pr-12">{children} </span>
        </div>
      </div>
    )
  }

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span className="text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap pr-12">{children} </span>
        <span className="text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap pr-12">{children} </span>
        <span className="text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap pr-12">{children} </span>
        <span className="text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap pr-12">{children} </span>
      </motion.div>
    </div>
  )
}
