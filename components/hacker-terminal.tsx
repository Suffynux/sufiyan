"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { useAudio } from "@/hooks/use-audio"

// Dynamically import the puzzle game to reduce initial load time
const TerminalPuzzleGame = dynamic(() => import("@/components/terminal-puzzle-game"), {
  loading: () => <div className="text-white/70">Loading neural puzzle system...</div>,
})

type CommandType = {
  command: string
  output: string | string[]
  isHtml?: boolean
}

export default function HackerTerminal() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const [commandHistory, setCommandHistory] = useState<CommandType[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isInputActive, setIsInputActive] = useState(false)
  const [showPuzzleGame, setShowPuzzleGame] = useState(false)
  const [puzzleCompleted, setPuzzleCompleted] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { playSound } = useAudio()

  const initialLines = [
    "$ whoami",
    "Suffynux - Fullstack Developer - Born in Pakistann (9/11/2003)",
    "$ age",
    "Running age calculation...",
    "Birth date: Sep 11, 2003",
    `Current age: ${calculateAge(new Date(2003, 9, 11))} years`,
    "$ help",
    "Type a command to continue...",
  ]

  // Available commands
  const commands: Record<string, CommandType> = {
    help: {
      command: "help",
      output: [
        "Available commands:",
        "- whoami         : Display basic identity information",
        "- bio            : Show biographical information",
        "- skills         : List technical skills",
        "- projects       : Show current projects",
        "- contact        : Display contact information",
        "- clear          : Clear the terminal",
        "- age            : Calculate current age",
        "- scan           : Run system scan simulation",
        "- matrix         : Display Matrix effect",
        "- puzzle         : Launch neural puzzle challenge (7 levels)",
        "- help           : Show this help message",
      ],
    },
    whoami: {
      command: "whoami",
      output: "Suffynux - Fullstack Developer - Born in Pakistann (9/11/2003)",
    },
    bio: {
      command: "bio",
      output: [
        "NAME: Sufiyan",
        "AGE: 20 years",
        "BORN: Sep 11, 2003",
        "LOCATION: Pakistan",
        "OCCUPATION: Fullstack Web developer",
        "STATUS: Available for projects(job)",
      ],
    },
    skills: {
      command: "skills",
      output: [
        "Technical Skills:",
        "- JavaScript ███████████ 95%",
        "- TypeScript ██████░░░░░ 50%",
        "- Node.js    ████████░░░ 80%",
        "- Discord.js ███████████ 60%",
        "- React      ████████░░░ 80%",
        "- Next.js    ██████░░░░░ 50%",
        "- MongoDB    ████████░░░ 80%",
        "- API Dev    █████████░░ 85%",
        "- UI Dev     ███████████ 95%",
        "- Python     ██████░░░░░ 50%"
      ],
    },
    projects: {
      command: "projects",
      output: [
        "Active Projects:",
        "- Gemini Discord Bot: AI-powered Discord bot using Google's Gemini API",
        "- Server Log Tracker: Comprehensive server monitoring and analytics",
        "- Portfolio Website: Cyberpunk-themed developer portfolio (this site)",
      ],
    },
    contact: {
      command: "contact",
      output: [
        "Contact Information:",
        "- Email: contact@kyros.dev",
        "- Discord: kyros#0001",
        "- GitHub: github.com/kyros",
        "- PayPal: paypal.me/ayoubzel/",
      ],
    },
    clear: {
      command: "clear",
      output: "",
    },
    age: {
      command: "age",
      output: [
        "Running age calculation...",
        "Birth date: May 27, 2004",
        `Current age: ${calculateAge(new Date(2004, 4, 27))} years`,
      ],
    },
    scan: {
      command: "scan",
      output: "",
      isHtml: true,
    },
    matrix: {
      command: "matrix",
      output: "Initializing Matrix sequence...",
      isHtml: true,
    },
    puzzle: {
      command: "puzzle",
      output: puzzleCompleted
        ? "You have already completed the neural puzzle challenge! Type 'puzzle reset' to play again."
        : "Launching neural puzzle challenge...",
      isHtml: true,
    },
    "puzzle reset": {
      command: "puzzle reset",
      output: "Resetting neural puzzle challenge...",
      isHtml: true,
    },
  }

  function calculateAge(birthDate: Date) {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  useEffect(() => {
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLine >= initialLines.length) {
      setIsInputActive(true)
      if (inputRef.current) {
        inputRef.current.focus()
      }
      return
    }

    // Type out the current line
    let i = 0
    const typingInterval = setInterval(() => {
      if (i <= initialLines[currentLine].length) {
        setText(initialLines[currentLine].substring(0, i))
        i++
      } else {
        clearInterval(typingInterval)

        // Move to next line after a delay
        setTimeout(
          () => {
            if (terminalRef.current) {
              const newLine = document.createElement("div")
              newLine.className = "terminal-line"

              // Add command styling
              if (initialLines[currentLine].startsWith("$")) {
                newLine.innerHTML = `<span class="text-[#00ffff]">$</span> <span>${initialLines[currentLine].substring(2)}</span>`
              }
              // Add loading bar styling
              else if (initialLines[currentLine].includes("█")) {
                const [skill, bar, percentage] = initialLines[currentLine].split(/\s+/)
                newLine.innerHTML = `<span class="text-[#ff00ff]">${skill}</span> <span class="text-white">${bar}</span> <span class="text-[#00ffff]">${percentage}</span>`
              }
              // Add list item styling
              else if (initialLines[currentLine].startsWith("-")) {
                newLine.innerHTML = `<span class="text-[#ff00ff]">-</span> <span>${initialLines[currentLine].substring(2)}</span>`
              }
              // Default styling
              else {
                newLine.innerHTML = initialLines[currentLine]
              }

              terminalRef.current.appendChild(newLine)
              terminalRef.current.scrollTop = terminalRef.current.scrollHeight
            }

            setCurrentLine(currentLine + 1)
            setText("")
          },
          initialLines[currentLine].startsWith("$") ? 500 : 100,
        ) // Longer pause after commands
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentLine])

  const handleCommand = (cmd: string) => {
    // Add command to history
    const commandLine = { command: cmd, output: `Command not found: ${cmd}` }

    // Process command
    const commandLower = cmd.trim().toLowerCase()

    if (commandLower === "puzzle") {
      setCommandHistory([
        ...commandHistory,
        {
          command: cmd,
          output: puzzleCompleted
            ? "You have already completed the neural puzzle challenge! Type 'puzzle reset' to play again."
            : "Launching neural puzzle challenge...",
          isHtml: true,
        },
      ])

      if (!puzzleCompleted) {
        setShowPuzzleGame(true)
        try {
          playSound("/audio/click.mp3")
        } catch (error) {
          console.warn("Could not play sound effect")
        }
      }
      return
    }

    if (commandLower === "puzzle reset") {
      setCommandHistory([
        ...commandHistory,
        {
          command: cmd,
          output: "Resetting neural puzzle challenge...",
          isHtml: true,
        },
      ])

      setPuzzleCompleted(false)
      setShowPuzzleGame(true)
      try {
        playSound("/audio/click.mp3")
      } catch (error) {
        console.warn("Could not play sound effect")
      }
      return
    }

    if (commands[commandLower]) {
      if (commandLower === "clear") {
        setCommandHistory([])
        return
      }

      if (commandLower === "scan") {
        setCommandHistory([
          ...commandHistory,
          {
            command: cmd,
            output: "",
            isHtml: true,
          },
        ])

        // Simulate system scan
        simulateSystemScan()
        return
      }

      if (commandLower === "matrix") {
        setCommandHistory([
          ...commandHistory,
          {
            command: cmd,
            output: "Initializing Matrix sequence...",
            isHtml: true,
          },
        ])

        // Simulate matrix effect
        simulateMatrixEffect()
        return
      }

      commandLine.output = commands[commandLower].output
    }

    setCommandHistory([...commandHistory, commandLine])
  }

  const simulateSystemScan = () => {
    const scanSteps = [
      { text: "Initializing system scan...", delay: 500 },
      { text: "Scanning personal data...", delay: 800 },
      { text: "Name: Kyros ✓", delay: 300 },
      { text: "Location: Morocco ✓", delay: 300 },
      { text: "Birth date: 2004/5/27 ✓", delay: 300 },
      { text: "Age: 21 years ✓", delay: 300 },
      { text: "Scanning skills database...", delay: 800 },
      { text: "JavaScript: 95% proficiency ✓", delay: 200 },
      { text: "TypeScript: 90% proficiency ✓", delay: 200 },
      { text: "Node.js: 95% proficiency ✓", delay: 200 },
      { text: "Discord.js: 95% proficiency ✓", delay: 200 },
      { text: "Scanning projects...", delay: 800 },
      { text: "Active projects: 3 ✓", delay: 300 },
      { text: "Completed projects: 12 ✓", delay: 300 },
      { text: "System scan complete. All systems operational.", delay: 500 },
    ]

    let currentIndex = 0

    const processScanStep = () => {
      if (currentIndex < scanSteps.length) {
        const step = scanSteps[currentIndex]

        if (terminalRef.current) {
          const newLine = document.createElement("div")
          newLine.className = "terminal-line"

          if (step.text.includes("✓")) {
            newLine.innerHTML = `<span class="text-[#00ffff]">${step.text}</span>`
          } else if (step.text.includes("Scanning")) {
            newLine.innerHTML = `<span class="text-[#ff00ff]">${step.text}</span>`
          } else if (step.text.includes("complete")) {
            newLine.innerHTML = `<span class="text-green-400">${step.text}</span>`
          } else {
            newLine.innerHTML = step.text
          }

          terminalRef.current.appendChild(newLine)
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }

        currentIndex++
        setTimeout(processScanStep, step.delay)
      }
    }

    processScanStep()
  }

  const simulateMatrixEffect = () => {
    if (terminalRef.current) {
      const matrixContainer = document.createElement("div")
      matrixContainer.className = "terminal-line"
      matrixContainer.style.height = "150px"
      matrixContainer.style.overflow = "hidden"
      matrixContainer.style.position = "relative"

      terminalRef.current.appendChild(matrixContainer)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight

      const chars =
        "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789"
      const columns = Math.floor(matrixContainer.clientWidth / 14)

      for (let i = 0; i < columns; i++) {
        const column = document.createElement("div")
        column.className = "matrix-column"
        column.style.position = "absolute"
        column.style.left = `${i * 14}px`
        column.style.top = "0"
        column.style.fontSize = "14px"
        column.style.color = i % 2 === 0 ? "#0fa" : "#0ff"

        matrixContainer.appendChild(column)

        const delay = Math.random() * 1500

        const animateColumn = () => {
          const charCount = Math.floor(Math.random() * 15) + 5
          column.innerHTML = ""

          for (let j = 0; j < charCount; j++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length))
            const charSpan = document.createElement("span")
            charSpan.textContent = char
            charSpan.style.opacity = (1 - j / charCount).toString()
            column.appendChild(charSpan)
          }

          column.innerHTML += "<br>"
        }

        // Run the animation a few times
        let runs = 0
        const maxRuns = 10

        const runAnimation = () => {
          if (runs < maxRuns) {
            animateColumn()
            runs++
            setTimeout(runAnimation, 100)
          } else if (runs === maxRuns) {
            // Add completion message
            if (terminalRef.current) {
              const completionLine = document.createElement("div")
              completionLine.className = "terminal-line"
              completionLine.innerHTML = '<span class="text-green-400">Matrix sequence completed.</span>'
              terminalRef.current.appendChild(completionLine)
              terminalRef.current.scrollTop = terminalRef.current.scrollHeight
            }
          }
        }

        setTimeout(runAnimation, delay)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (inputValue.trim()) {
      handleCommand(inputValue)
      setInputValue("")

      // Scroll to bottom
      if (terminalRef.current) {
        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
          }
        }, 0)
      }
    }
  }

  const handleTerminalClick = () => {
    if (inputRef.current && isInputActive) {
      inputRef.current.focus()
    }
  }

  const handlePuzzleComplete = () => {
    setPuzzleCompleted(true)

    // Add completion message to terminal
    if (terminalRef.current) {
      const completionLine = document.createElement("div")
      completionLine.className = "terminal-line"
      completionLine.innerHTML =
        '<span class="text-green-400">Neural puzzle challenge completed! PayPal reward unlocked.</span>'
      terminalRef.current.appendChild(completionLine)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }

    setTimeout(() => {
      setShowPuzzleGame(false)
      setIsInputActive(true)
    }, 5000)
  }

  const handlePuzzleExit = () => {
    setShowPuzzleGame(false)
    setIsInputActive(true)

    // Add exit message to terminal
    if (terminalRef.current) {
      const exitLine = document.createElement("div")
      exitLine.className = "terminal-line"
      exitLine.innerHTML =
        '<span class="text-yellow-400">Neural puzzle challenge exited. Type "puzzle" to resume.</span>'
      terminalRef.current.appendChild(exitLine)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="border border-white/20 bg-black/70 backdrop-blur-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.7)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]"></div>
          </div>
          <div className="text-xs font-mono text-white/70">
            {showPuzzleGame ? "neural-puzzle-system ~ " : "suffynux@terminal ~ "}
          </div>
          <div className="w-4"></div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="p-4 h-[600px] font-mono text-sm overflow-y-auto terminal-content"
          onClick={handleTerminalClick}
        >
          {showPuzzleGame ? (
            <TerminalPuzzleGame onComplete={handlePuzzleComplete} onExit={handlePuzzleExit} playSound={playSound} />
          ) : (
            <>
              {/* Command history */}
              {commandHistory.map((item, index) => (
                <div key={index}>
                  <div className="terminal-line">
                    <span className="text-[#00ffff]">$</span> <span>{item.command}</span>
                  </div>

                  {Array.isArray(item.output)
                    ? item.output.map((line, lineIndex) => (
                        <div key={lineIndex} className="terminal-line">
                          {line.startsWith("-") ? (
                            <>
                              <span className="text-[#ff00ff]">-</span> <span>{line.substring(2)}</span>
                            </>
                          ) : line.includes("█") ? (
                            (() => {
                              const [skill, bar, percentage] = line.split(/\s+/)
                              return (
                                <>
                                  <span className="text-[#ff00ff]">{skill}</span>{" "}
                                  <span className="text-white">{bar}</span>{" "}
                                  <span className="text-[#00ffff]">{percentage}</span>
                                </>
                              )
                            })()
                          ) : (
                            line
                          )}
                        </div>
                      ))
                    : !item.isHtml && <div className="terminal-line">{item.output}</div>}
                </div>
              ))}

              {/* Current typing line */}
              {currentLine < initialLines.length && (
                <div className="flex">
                  {initialLines[currentLine].startsWith("$") && <span className="text-[#00ffff] mr-1">$</span>}
                  <span>{text}</span>
                  <span
                    className={cn("ml-0.5 w-2 h-4 bg-white/70", cursorVisible ? "opacity-100" : "opacity-0")}
                  ></span>
                </div>
              )}

              {/* Input line */}
              {isInputActive && (
                <form onSubmit={handleInputSubmit} className="flex items-center">
                  <span className="text-[#00ffff] mr-1">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm"
                    autoFocus
                  />
                  <span
                    className={cn("ml-0.5 w-2 h-4 bg-white/70", cursorVisible ? "opacity-100" : "opacity-0")}
                  ></span>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
