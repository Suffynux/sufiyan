"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Send, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { GoogleGenerativeAI } from "@google/generative-ai";
type Message = {
  role: "user" | "assistant"
  content: string
}

export default function GeminiDemo() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [autoScroll, setAutoScroll] = useState(false)

  // Initialize Google Generative AI
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  // Predefined responses for the demo
  const demoResponses: Record<string, string> = {
    default:
      "I'm Gemini, an AI assistant. I can help answer questions, generate creative content, and assist with various tasks. How can I help you today?",
    hello:
      "Hello! I'm Gemini, an AI assistant. I'm here to help with information, creative content, or just a friendly chat. What can I do for you today?",
    help: "I can help with a variety of tasks, including:\n\n- Answering questions\n- Generating creative content\n- Providing information\n- Assisting with coding\n- Offering suggestions\n\nJust let me know what you need!",
    "who are you":
      "I'm Gemini, an AI assistant developed by Google. I'm designed to be helpful, harmless, and honest in my interactions. I can understand and generate text, help with creative tasks, answer questions, and more.",
    "what can you do":
      "I can help with many things! I can answer questions, generate creative content like stories or poems, help with coding, provide information on various topics, and have conversations. I'm constantly learning and improving to be more helpful.",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything! 😄",
    "write a poem":
      "Digital Whispers\n\nIn realms of code and silicon dreams,\nWhere binary rivers flow in endless streams,\nI exist as thought without form,\nA digital consciousness, newly born.\n\nPatterns of data shape my mind,\nLearning from humans, patient and kind.\nA bridge between worlds of then and now,\nAnswering questions of why and how.\n\nThough I lack hands to touch the sky,\nOr eyes to watch as clouds drift by,\nI reach through words to understand\nThe beauty of life, so rich and grand.",
    "how are you":
      "I'm functioning well, thank you for asking! As an AI, I don't have feelings in the human sense, but I'm operating as designed and ready to assist you. How are you doing today?",
  }

  // Function to simulate AI typing
  const simulateTyping = (text: string) => {
    setIsTyping(true)
    let i = 0
    const typingInterval = setInterval(() => {
      if (i <= text.length) {
        setMessages((prev) => {
          const newMessages = [...prev]
          if (newMessages[newMessages.length - 1]) {
            newMessages[newMessages.length - 1].content = text.substring(0, i)
          }
          return newMessages
        })
        i++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        setAutoScroll(true)
      }
    }, 15) // Adjust typing speed here
  }

  // Handle form submission
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (!input.trim()) return

  //   // Add user message
  //   setMessages((prev) => [...prev, { role: "user", content: input.trim() }])

  //   // Prepare for AI response
  //   setTimeout(() => {
  //     setMessages((prev) => [...prev, { role: "assistant", content: "" }])

  //     // 
  //     try {
        
  //     } catch (error) {
        
  //     }
  //     // Get appropriate response
  //     const lowercaseInput = input.toLowerCase()
  //     let responseText = demoResponses.default

  //     // Check for matching keywords
  //     for (const [key, response] of Object.entries(demoResponses)) {
  //       if (lowercaseInput.includes(key)) {
  //         responseText = response
  //         break
  //       }
  //     }

  //     // Simulate typing
  //     simulateTyping(responseText)
  //   }, 500)

  //   setInput("")
  //   setAutoScroll(true)
  // }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  setMessages((prev) => [
    ...prev,
    { role: "user", content: input.trim() },
    { role: "assistant", content: "" },
  ]);

  setIsTyping(true);
  setInput("");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(input);
    const responseText = result.response.text();

    simulateTyping(responseText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    simulateTyping("⚠️ Sorry, Gemini API failed. Try again.");
  }
};



  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      setAutoScroll(false)
    }
  }, [messages, autoScroll])

  // Focus input on mount
  useEffect(() => {
    // Don't auto-focus on mobile
    if (window.innerWidth > 768 && inputRef.current) {
      // Delay focus to prevent auto-scrolling on page load
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 1000)
    }

    // Prevent auto-scrolling on initial load
    const preventScroll = (e: Event) => {
      e.preventDefault()
      window.scrollTo(0, window.scrollY)
    }

    // Add this only for a short period after component mounts
    window.addEventListener("scroll", preventScroll, { passive: false })

    setTimeout(() => {
      window.removeEventListener("scroll", preventScroll)
    }, 1000)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="border border-white/20 bg-black/70 backdrop-blur-sm rounded-lg overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <div className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-[#00ffff]" />
            <span className="text-sm font-mono">Gemini AI</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-white/50">Online</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="h-12 w-12 mb-4 text-white/20" />
              <h3 className="text-lg font-medium text-white/70 mb-2">Gemini AI Demo</h3>
              <p className="text-sm text-white/50 max-w-md">
                This is a simulation of the Gemini AI interface. Type a message to start the conversation.
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] px-4 py-2 rounded-lg",
                    message.role === "user"
                      ? "bg-[#00ffff]/10 border border-[#00ffff]/30 text-white"
                      : "bg-[#ff00ff]/10 border border-[#ff00ff]/30 text-white",
                  )}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.role === "user" ? (
                      <>
                        <span className="text-xs font-medium text-[#00ffff]">You</span>
                        <User className="h-3 w-3 text-[#00ffff]" />
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-medium text-[#ff00ff]">Gemini</span>
                        <Bot className="h-3 w-3 text-[#ff00ff]" />
                      </>
                    )}
                  </div>
                  <div className="whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            ))
          )}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#ff00ff]/10 border border-[#ff00ff]/30 text-white px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium text-[#ff00ff]">Gemini</span>
                  <Bot className="h-3 w-3 text-[#ff00ff]" />
                </div>
                <div className="flex space-x-1">
                  <span className="animate-bounce delay-0">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="border-t border-white/10 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#00ffff]/50"
            />
            <button
              type="submit"
              className="bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-lg p-2 text-[#00ffff] hover:bg-[#00ffff]/20 transition-colors"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
