"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Unlock, Copy, Check, ArrowRight, Gift, Users, Trophy, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import DigitalRain from "@/components/digital-rain"
import GlitchText from "@/components/glitch-text"
import CyberButton from "@/components/cyber-button"
import FloatingGifts from "@/components/floating-gifts"
import confetti from "canvas-confetti"

export default function GiveawayPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // The correct password
  const CORRECT_PASSWORD = "nullstudio"

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate loading
    setTimeout(() => {
      if (password.toLowerCase() === CORRECT_PASSWORD) {
        setAuthenticated(true)
        setError(false)
        launchConfetti()
      } else {
        setError(true)
        setPassword("")
      }
      setLoading(false)
    }, 1500)
  }

  const launchConfetti = () => {
    setShowConfetti(true)

    if (typeof window !== "undefined") {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // Since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        )
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          }),
        )
      }, 250)
    }
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText("https://discord.gg/aFvUxKejw4")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted) return null

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Digital Rain Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <DigitalRain />
      </div>

      {/* Floating Gifts Animation */}
      <FloatingGifts />

      {/* Grid overlay */}
      <div className="fixed inset-0 z-0 grid grid-cols-12 grid-rows-12 opacity-20">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="border border-white/5"></div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!authenticated ? (
          // Password screen
          <motion.div
            key="password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative max-w-md w-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] opacity-50 blur-md rounded-md"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/20 p-8 rounded-md">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{
                      rotateZ: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="inline-block mb-4"
                  >
                    <Gift className="h-16 w-16 text-[#ff00ff]" />
                  </motion.div>
                  <GlitchText
                    text="EXCLUSIVE GIVEAWAY"
                    className="text-3xl font-bold mb-2"
                    glitchIntensity={0.3}
                    glitchColors={["#00ffff", "#ff00ff"]}
                  />
                  <p className="text-white/70">Enter the password to access the giveaway details</p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/20 to-[#ff00ff]/20 blur-sm rounded-md"></div>
                    <div className="relative flex items-center">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className={cn(
                          "w-full bg-black border px-4 py-3 pr-10 text-white font-mono",
                          "focus:outline-none focus:ring-1",
                          "transition-colors duration-300",
                          error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-white/20 focus:border-[#00ffff] focus:ring-[#00ffff]",
                        )}
                        disabled={loading}
                      />
                      <div className="absolute right-3">
                        <Lock className="h-5 w-5 text-white/50" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-mono bg-red-500/10 border border-red-500/20 p-2"
                    >
                      Incorrect password. Access denied.
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading || !password}
                    className={cn(
                      "relative w-full py-3 font-mono text-sm",
                      "border transition-colors duration-300",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      loading ? "border-white/20 bg-white/5" : "border-white/20 bg-white/5 hover:bg-white/10",
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ffff]"></span>
                    <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ffff]"></span>
                    <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ffff]"></span>
                    <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ffff]"></span>

                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        AUTHENTICATING...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        UNLOCK GIVEAWAY
                        <Unlock className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <Link href="/" className="text-white/50 text-sm hover:text-white transition-colors">
                    Return to homepage
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // Giveaway content
          <motion.div
            key="giveaway"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 min-h-screen py-16 px-4"
          >
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-12">
              <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Home
              </Link>

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <GlitchText
                  text="COMMUNITY GIVEAWAY"
                  className="text-4xl md:text-5xl font-bold tracking-tight"
                  glitchIntensity={0.2}
                  glitchColors={["#00ffff", "#ff00ff"]}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="mt-4 inline-block"
                >
                  <div className="px-4 py-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black font-bold rounded-sm">
                    $50 STEAM GIFT CARDS
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Main content */}
            <div className="max-w-4xl mx-auto">
              {/* Banner image */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative mb-12 overflow-hidden rounded-lg"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] opacity-50 blur-md"></div>
                <div className="relative">
                  <Image
                    src="https://cdn.discordapp.com/attachments/1285614035068387471/1374387073863127081/upscalemedia-transformed.jpeg"
                    alt="NullStudio Giveaway Banner"
                    width={1200}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </motion.div>

              {/* Giveaway details */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative mb-12"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff]/30 to-[#ff00ff]/30 opacity-50 blur-md rounded-lg"></div>
                <div className="relative bg-black/80 backdrop-blur-sm border border-white/20 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                    <span className="text-[#00ffff]">/</span> NULLSTUDIO — COMMUNITY INVITATION & GIVEAWAY CHALLENGE{" "}
                    <span className="text-[#ff00ff]">/</span>
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-[#00ffff]" />
                        Invite Friends, Build Our Community!
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-white/80 ml-6">
                        <li>Create a permanent invite link</li>
                        <li>Track your invites in real time</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center">
                        <Trophy className="mr-2 h-5 w-5 text-[#ff00ff]" />
                        Milestone Giveaway: 500 Members Goal!
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-white/80 ml-6">
                        <li>Reach 500 members together</li>
                        <li>Top 2 inviters each win a $50 Steam Gift Card</li>
                        <li>Reward for our most active supporters</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center">
                        <Gift className="mr-2 h-5 w-5 text-[#00ffff]" />
                        Ready to Join the Challenge?
                      </h3>
                      <div className="flex items-center justify-between bg-black/50 rounded p-3 border border-white/10">
                        <div className="text-white/70 font-mono text-sm truncate flex-1 px-2">
                          https://discord.gg/aFvUxKejw4
                        </div>
                        <button
                          onClick={copyInviteLink}
                          className={cn(
                            "p-2 rounded hover:bg-white/10 transition-colors",
                            copied ? "text-green-400" : "text-white/70",
                          )}
                          aria-label="Copy invite link"
                        >
                          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Secondary illustration */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="relative mb-12"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff00ff]/30 to-[#00ffff]/30 opacity-50 blur-md rounded-lg"></div>
                <div className="relative bg-black/80 backdrop-blur-sm border border-white/20 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                    <span className="text-[#ff00ff]">/</span> HOW TO PARTICIPATE{" "}
                    <span className="text-[#00ffff]">/</span>
                  </h2>

                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                      <Image
                        src="https://cdn.discordapp.com/attachments/1312098797601689640/1374543260579795154/1_._Creat_you_Unique_invite_link.png"
                        alt="Create your unique invite link"
                        width={500}
                        height={300}
                        className="w-full h-auto rounded-lg border border-white/10"
                      />
                    </div>
                    <div className="md:w-1/2 space-y-4">
                      <h3 className="text-xl font-bold">Create Your Unique Invite Link</h3>
                      <p className="text-white/80">
                        Follow these simple steps to create your unique invite link and start tracking your invites:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-white/80 ml-2">
                        <li>Join our Discord server</li>
                        <li>Go to the #invites channel</li>
                        <li>Use the /create-invite command</li>
                        <li>Share your unique link with friends</li>
                        <li>Track your progress in real-time</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center"
              >
                <a
                  href="https://discord.gg/aFvUxKejw4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <CyberButton variant="primary" soundEffect="click">
                    JOIN DISCORD NOW
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </CyberButton>
                </a>
                <p className="mt-4 text-white/50 text-sm">
                  Giveaway ends when we reach 500 members. Winners will be announced in the Discord server.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti effect */}
      {showConfetti && <div className="fixed inset-0 pointer-events-none z-50"></div>}
    </div>
  )
}
