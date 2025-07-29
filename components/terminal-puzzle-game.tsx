"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"

interface PuzzleLevel {
  id: number
  title: string
  description: string
  puzzle: string
  hint?: string
  solution: string
  validator?: (input: string) => boolean
  background?: string
}

interface TerminalPuzzleGameProps {
  onComplete: () => void
  onExit: () => void
  playSound?: (sound: string) => void
}

export default function TerminalPuzzleGame({ onComplete, onExit, playSound }: TerminalPuzzleGameProps) {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [input, setInput] = useState("")
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" | "info" }>({
    text: "",
    type: "info",
  })
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [showPaypal, setShowPaypal] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [pulseEffect, setPulseEffect] = useState(false)
  const [backgroundLines, setBackgroundLines] = useState<string[]>([])
  const [showStory, setShowStory] = useState(false)
  const [storyProgress, setStoryProgress] = useState(0)
  const [showHackerEffect, setShowHackerEffect] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Storyline text
  const storyText = [
    "SYSTEM ALERT: Unauthorized access detected in neural network sector 7.",
    "SECURITY PROTOCOL: Initiating neural firewall...",
    "WARNING: Neural firewall bypassed. Unknown entity detected.",
    "SYSTEM: Activating countermeasures. Neural puzzle sequence engaged.",
    "UNKNOWN ENTITY: I've been expecting you, hacker. Let's see if you're worthy.",
    "UNKNOWN ENTITY: Complete my 7 trials to access the reward. Fail, and you'll be locked out forever.",
    "SYSTEM: Neural puzzle sequence initialized. Prepare for Level 1...",
  ]

  // Define the puzzle levels with enhanced descriptions and cyberpunk themes
  const levels: PuzzleLevel[] = [
    {
      id: 1,
      title: "NEURAL CIPHER",
      description:
        "The neural network is encrypted. Decrypt this message to bypass the first security layer. Each letter has been shifted by a constant value in the alphabet.",
      puzzle: "HNRWX NX YMJ KNWXY QJAJQ. YMJ UFXXBTWI NX HTWWJHY.",
      hint: "This is a Caesar cipher with a shift of 5. Decrypt by shifting each letter back 5 positions in the alphabet.",
      solution: "correct",
      validator: (input) => input.toLowerCase().trim() === "correct",
      background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.2), transparent 70%)",
    },
    {
      id: 2,
      title: "QUANTUM SEQUENCE",
      description:
        "The quantum processor requires the next value in this sequence to calibrate. Analyze the pattern and predict the next number.",
      puzzle: "2, 6, 12, 20, 30, 42, ?",
      hint: "Look at the differences between consecutive numbers: 4, 6, 8, 10, 12... What's the pattern in these differences?",
      solution: "56",
      validator: (input) => input.trim() === "56",
      background: "radial-gradient(circle at center, rgba(255, 0, 255, 0.2), transparent 70%)",
    },
    {
      id: 3,
      title: "PATTERN MATRIX",
      description:
        "The neural network's pattern recognition system is testing you. Identify the pattern and provide the next element in the sequence.",
      puzzle: "9P, 8O, 7N, 6M, 5L, ?",
      hint: "Notice how the number decreases by 1 and the letter moves backward by 1 in the alphabet with each step.",
      solution: "4K",
      validator: (input) => input.trim() === "4K",
      background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.2), transparent 70%)",
    },
    {
      id: 4,
      title: "BINARY DECRYPTION",
      description:
        "A binary encoded message has been intercepted from the system core. Decrypt it to reveal the access key.",
      puzzle: "01110000 01100001 01110100 01110100 01100101 01110010 01101110",
      hint: "Each 8-bit binary number represents one ASCII character. Convert each group to its decimal value, then to the corresponding ASCII character.",
      solution: "pattern",
      validator: (input) => input.toLowerCase().trim() === "pattern",
      background: "radial-gradient(circle at center, rgba(255, 0, 255, 0.2), transparent 70%)",
    },
    {
      id: 5,
      title: "CRYPTOGRAPHIC EQUATION",
      description:
        "The system's cryptographic module requires a solution to this alphametic puzzle to grant access to the next level.",
      puzzle: "SEND + MORE = MONEY (What is the value of M? Enter just the digit.)",
      hint: "This is a classic alphametic puzzle where each letter represents a unique digit. Since it's the leftmost digit in MONEY and there's a carry from the previous column, M must be 1.",
      solution: "1",
      validator: (input) => input.trim() === "1",
      background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.2), transparent 70%)",
    },
    {
      id: 6,
      title: "CODE ANALYSIS",
      description:
        "The system's security algorithm needs to be analyzed. Determine the output of this JavaScript code to proceed.",
      puzzle: `
function mystery(n) {
  if (n <= 1) return 1;
  return n * mystery(n - 1);
}
console.log(mystery(4) + mystery(3));
      `,
      hint: "This function calculates the factorial of a number. So mystery(4) = 4! = 24 and mystery(3) = 3! = 6.",
      solution: "30",
      validator: (input) => input.trim() === "30",
      background: "radial-gradient(circle at center, rgba(255, 0, 255, 0.2), transparent 70%)",
    },
    {
      id: 7,
      title: "NEURAL CONVERGENCE",
      description:
        "You've reached the final security layer. The system requires a convergence key derived from your previous answers to grant access to the reward.",
      puzzle: `
01010100 01101000 01100101 00100000 01100110 01101001 01101110 01100001 01101100 00100000
01110000 01100001 01110011 01110011 01110111 01101111 01110010 01100100 00100000 01101001 
01110011 00100000 01110100 01101000 01100101 00100000 01100110 01101001 01110010 01110011 
01110100 00100000 01101100 01100101 01110100 01110100 01100101 01110010 01110011 00100000 
01101111 01100110 00100000 01100101 01100001 01100011 01101000 00100000 01110000 01110010 
01100101 01110110 01101001 01101111 01110101 01110011 00100000 01100001 01101110 01110011 
01110111 01100101 01110010 01110011 00101110
      `,
      hint: "Convert the binary to ASCII first. It tells you to take the first letter of each of your previous answers and combine them.",
      solution: "cp4p1m",
      validator: (input) => input.toLowerCase().trim() === "cp4p1m",
      background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3), transparent 80%)",
    },
  ]

  useEffect(() => {
    if (inputRef.current && !showIntro && !showStory) {
      inputRef.current.focus()
    }
  }, [currentLevel, showIntro, showStory])

  useEffect(() => {
    // Generate random background lines for cyberpunk effect
    const lines = []
    for (let i = 0; i < 50; i++) {
      const y = Math.floor(Math.random() * 100)
      const width = Math.floor(Math.random() * 100) + 20
      const opacity = Math.random() * 0.5 + 0.1
      const delay = Math.random() * 5
      lines.push(`${y}% ${width}% ${opacity} ${delay}`)
    }
    setBackgroundLines(lines)

    // Trigger glitch effect occasionally
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        setGlitchEffect(true)
        setTimeout(() => setGlitchEffect(false), 200)
      }
    }, 3000)

    // Trigger pulse effect
    const pulseInterval = setInterval(() => {
      setPulseEffect(true)
      setTimeout(() => setPulseEffect(false), 1000)
    }, 5000)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(pulseInterval)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (showIntro) {
      setShowIntro(false)
      setShowStory(true)
      if (playSound) playSound("/audio/click.mp3")
      return
    }

    if (showStory) {
      if (storyProgress < storyText.length - 1) {
        setStoryProgress(storyProgress + 1)
        if (playSound) playSound("/audio/click.mp3")
      } else {
        setShowStory(false)
        if (playSound) playSound("/audio/click.mp3")
      }
      return
    }

    const level = levels[currentLevel]
    const isCorrect = level.validator
      ? level.validator(input)
      : input.toLowerCase().trim() === level.solution.toLowerCase().trim()

    if (isCorrect) {
      // Success animation
      setGlitchEffect(true)
      setMessage({ text: "CORRECT! Access granted to next level...", type: "success" })
      if (playSound) playSound("/audio/success.mp3")

      setTimeout(() => {
        setGlitchEffect(false)
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1)
          setInput("")
          setShowHint(false)
          setMessage({ text: "", type: "info" })
          setAttempts(0)
          setShowHackerEffect(true)
          setTimeout(() => setShowHackerEffect(false), 1500)
        } else {
          // Game complete
          setGameComplete(true)
          setTimeout(() => {
            if (containerRef.current) {
              // Launch confetti
              const rect = containerRef.current.getBoundingClientRect()
              const x = rect.left + rect.width / 2
              const y = rect.top + rect.height / 2

              confetti({
                particleCount: 150,
                spread: 70,
                origin: { x: x / window.innerWidth, y: y / window.innerHeight },
                colors: ["#00ffff", "#ff00ff", "#ffffff"],
              })

              // Second confetti burst after a delay
              setTimeout(() => {
                confetti({
                  particleCount: 100,
                  angle: 60,
                  spread: 55,
                  origin: { x: 0.1, y: 0.6 },
                  colors: ["#00ffff", "#ff00ff", "#ffffff"],
                })
              }, 500)

              // Third confetti burst
              setTimeout(() => {
                confetti({
                  particleCount: 100,
                  angle: 120,
                  spread: 55,
                  origin: { x: 0.9, y: 0.6 },
                  colors: ["#00ffff", "#ff00ff", "#ffffff"],
                })
              }, 1000)
            }

            if (playSound) playSound("/audio/win.mp3")
            setShowPaypal(true)
            onComplete()
          }, 1000)
        }
      }, 1500)
    } else {
      setAttempts(attempts + 1)
      setMessage({ text: "ACCESS DENIED. Incorrect solution.", type: "error" })
      if (playSound) playSound("/audio/error.mp3")
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)

      // Show hint after 3 failed attempts
      if (attempts >= 2 && !showHint && level.hint) {
        setShowHint(true)
      }
    }
  }

  const currentLevelData = levels[currentLevel]
  const backgroundStyle = currentLevelData?.background
    ? { background: currentLevelData.background }
    : { background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.1), transparent 70%)" }

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full flex flex-col relative overflow-hidden",
        glitchEffect && "animate-glitch",
        pulseEffect && "animate-pulse",
      )}
      style={backgroundStyle}
    >
      {/* Background cyberpunk lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {backgroundLines.map((line, index) => {
          const [y, width, opacity, delay] = line.split(" ")
          return (
            <div
              key={index}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              style={{
                top: y,
                width: width,
                opacity: opacity,
                left: `-${width}`,
                animation: `scanline 5s ${delay}s infinite linear`,
              }}
            />
          )
        })}
      </div>

      {/* Hacker effect overlay */}
      {showHackerEffect && (
        <div className="absolute inset-0 bg-green-500/10 z-50 flex items-center justify-center">
          <div className="text-green-500 font-mono text-xl animate-pulse">ACCESS GRANTED</div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2 z-10">
        <div className="text-[#00ffff] font-mono text-sm flex items-center">
          <span className={cn("mr-2 h-2 w-2 rounded-full bg-green-500", pulseEffect && "animate-ping")}></span>
          NEURAL PUZZLE SYSTEM v3.0 - {!showIntro && !showStory && `LEVEL ${currentLevel + 1}/${levels.length}`}
        </div>
        <button
          onClick={onExit}
          className="text-white/50 hover:text-white text-xs border border-white/20 px-2 py-1 hover:border-white/50 transition-colors"
        >
          [EXIT]
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 terminal-content z-10">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6"
              >
                <div className="text-3xl font-bold mb-2 glitch-text" data-text="NEURAL PUZZLE CHALLENGE">
                  <span className="text-[#00ffff]">NEURAL</span> <span className="text-white">PUZZLE</span>{" "}
                  <span className="text-[#ff00ff]">CHALLENGE</span>
                </div>
                <div className="text-white/70">7 Levels of Increasing Difficulty</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-8 max-w-md"
              >
                <p className="text-white/80 mb-4">
                  You've discovered a hidden neural network with a secured reward. To access it, you must solve 7
                  increasingly difficult puzzles that will test your intelligence and problem-solving abilities.
                </p>
                <p className="text-white/80">
                  Each level requires different skills: cryptography, pattern recognition, logical reasoning, and code
                  analysis. Only the most skilled hackers will reach the final reward.
                </p>
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black font-bold rounded-sm hover:from-[#ff00ff] hover:to-[#00ffff] transition-all duration-300"
              >
                INITIALIZE CHALLENGE
              </motion.button>
            </motion.div>
          ) : showStory ? (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col"
            >
              <div className="flex-1 space-y-4 mb-4">
                {storyText.slice(0, storyProgress + 1).map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.3 }}
                    className={cn(
                      "p-2 border-l-2",
                      text.includes("SYSTEM:") || text.includes("SYSTEM ALERT:")
                        ? "border-[#00ffff] bg-[#00ffff]/5"
                        : text.includes("WARNING:")
                          ? "border-yellow-500 bg-yellow-500/5"
                          : text.includes("UNKNOWN ENTITY:")
                            ? "border-[#ff00ff] bg-[#ff00ff]/5"
                            : "border-white/20 bg-white/5",
                    )}
                  >
                    <div
                      className={cn(
                        "font-mono",
                        text.includes("SYSTEM:") || text.includes("SYSTEM ALERT:")
                          ? "text-[#00ffff]"
                          : text.includes("WARNING:")
                            ? "text-yellow-500"
                            : text.includes("UNKNOWN ENTITY:")
                              ? "text-[#ff00ff]"
                              : "text-white",
                      )}
                    >
                      {text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto text-center"
              >
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
                >
                  {storyProgress < storyText.length - 1 ? "CONTINUE" : "BEGIN CHALLENGE"}
                </button>
              </motion.div>
            </motion.div>
          ) : !gameComplete ? (
            <motion.div
              key={`level-${currentLevel}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff]/20 to-[#ff00ff]/20 blur-sm rounded-sm"></div>
              <div className="relative bg-black/70 border border-white/10 p-4 mb-6">
                <div className="text-[#ff00ff] font-bold mb-2 flex items-center">
                  <div className="w-1 h-6 bg-[#ff00ff] mr-2"></div>
                  {currentLevelData.title}
                </div>
                <div className="text-white/80 mb-4">{currentLevelData.description}</div>
              </div>

              <div className="bg-black/50 border border-white/10 p-3 font-mono text-white/90 mb-4 whitespace-pre-wrap relative overflow-hidden">
                {/* Animated scan line effect */}
                <div className="absolute h-px w-full bg-[#00ffff]/30 left-0 animate-scanline"></div>
                {currentLevelData.puzzle}
              </div>

              {showHint && currentLevelData.hint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-yellow-400 text-sm mb-4 italic border-l-2 border-yellow-400 pl-2 bg-yellow-400/5 p-2"
                >
                  <div className="font-bold mb-1">HINT:</div>
                  {currentLevelData.hint}
                </motion.div>
              )}

              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "mb-4 text-sm p-2 border-l-2",
                    message.type === "error"
                      ? "text-red-400 border-red-400 bg-red-400/5"
                      : message.type === "success"
                        ? "text-green-400 border-green-400 bg-green-400/5"
                        : "text-white/70 border-white/20 bg-white/5",
                  )}
                >
                  {message.text}
                </motion.div>
              )}

              {/* Level progress indicator */}
              <div className="w-full h-1 bg-white/10 mb-4 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6"
              >
                <div className="text-3xl font-bold mb-2 glitch-text" data-text="SYSTEM HACKED">
                  <span className="text-[#00ffff]">SYSTEM</span> <span className="text-[#ff00ff]">HACKED</span>
                </div>
                <div className="text-white/70">All Security Layers Bypassed</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-8"
              >
                <div className="text-white/80 mb-6">
                  Congratulations, elite hacker! You've successfully completed all 7 neural puzzles, demonstrating
                  exceptional intelligence and problem-solving abilities. The secured system has been breached, and the
                  reward is now accessible.
                </div>

                {showPaypal && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] opacity-50 blur-md rounded-md"></div>
                    <div className="relative bg-black/80 border border-white/30 p-6 rounded-md">
                      <div className="text-[#ff00ff] font-bold mb-4 text-xl">REWARD UNLOCKED</div>
                      <div className="text-white mb-6 text-lg">Support the developer:</div>
                      <motion.a
                        href="https://paypal.me/ayoubzel/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ffff] font-mono text-xl hover:underline inline-block relative mb-6 bg-white/10 px-4 py-3 rounded-sm border border-[#00ffff]/30 hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">https://paypal.me/ayoubzel/</span>
                        <div className="absolute inset-0 bg-white/10 blur-sm -z-10"></div>
                      </motion.a>

                      <div className="mt-6 text-sm text-white/60 mb-6">
                        Your exceptional skills deserve recognition. Thank you for experiencing the neural puzzle
                        challenge!
                      </div>

                      <motion.button
                        onClick={onExit}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors"
                      >
                        EXIT CHALLENGE
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!gameComplete && !showIntro && !showStory && (
        <form onSubmit={handleSubmit} className="mt-auto z-10">
          <div className="flex items-center relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff]/20 to-[#ff00ff]/20 opacity-50 blur-sm rounded-sm"></div>
            <div className="relative flex items-center w-full bg-black/70 border border-white/20">
              <span className="text-[#00ffff] mx-2">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono py-2 pr-2"
                placeholder="Enter your solution..."
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 border-l border-white/20 transition-colors"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
