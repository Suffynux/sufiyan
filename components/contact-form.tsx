  "use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, always succeed
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full"
    >
      <div className="border border-white/20 bg-black/70 backdrop-blur-sm">
        {/* Form Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-mono text-white/70">new_message.sh</div>
          <div className="w-4"></div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <div className="inline-block mb-4 p-2 rounded-full bg-white/10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Send className="h-8 w-8 text-[#00ffff]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold mb-2">Message Transmitted</h3>
              <p className="text-white/70">
                Your message has been successfully sent. I'll respond as soon as possible.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormState({ name: "", email: "", message: "" })
                }}
                className="mt-6 px-4 py-2 border border-white/20 bg-white/5 hover:bg-white/10 text-sm font-mono transition-colors duration-300"
              >
                SEND ANOTHER MESSAGE
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-xs font-mono text-white/70">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full bg-black border px-3 py-2 text-white font-mono text-sm",
                    "focus:outline-none focus:ring-1 focus:ring-[#00ffff]",
                    "transition-colors duration-300",
                    "border-white/20 focus:border-[#00ffff]",
                  )}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-mono text-white/70">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full bg-black border px-3 py-2 text-white font-mono text-sm",
                    "focus:outline-none focus:ring-1 focus:ring-[#00ffff]",
                    "transition-colors duration-300",
                    "border-white/20 focus:border-[#00ffff]",
                  )}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block text-xs font-mono text-white/70">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={cn(
                    "w-full bg-black border px-3 py-2 text-white font-mono text-sm",
                    "focus:outline-none focus:ring-1 focus:ring-[#00ffff]",
                    "transition-colors duration-300",
                    "border-white/20 focus:border-[#00ffff]",
                    "resize-none",
                  )}
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm font-mono bg-red-400/10 border border-red-400/20 p-2">{error}</div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "relative w-full py-3 font-mono text-sm",
                    "border border-white/20 bg-white/5",
                    "hover:bg-white/10 transition-colors duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                >
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ffff]"></span>
                  <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ffff]"></span>
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ffff]"></span>
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ffff]"></span>

                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      TRANSMITTING...
                    </span>
                  ) : (
                    "SEND MESSAGE"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  )
}
