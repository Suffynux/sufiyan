"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useTransform, useMotionValue } from "framer-motion"
import { Terminal, MessageSquare, Server, ExternalLink, BookOpen, Gift, Video, Palette } from "lucide-react"
import dynamic from "next/dynamic"
import GlitchText from "@/components/glitch-text"
import CyberButton from "@/components/cyber-button"
import HackerTerminal from "@/components/hacker-terminal"
import GlitchImage from "@/components/glitch-image"
import AudioController from "@/components/audio-controller"
import ContactForm from "@/components/contact-form"
import BlogPreview from "@/components/blog-preview"
import GeminiDemo from "@/components/gemini-demo"
import CyberTimeline from "@/components/cyber-timeline"
import { useAudio } from "@/hooks/use-audio"
import CyberLoading from "@/components/cyber-loading"
import DiscordInvite from "@/components/discord-invite"

// Dynamically import heavy components
const DigitalRain = dynamic(() => import("@/components/digital-rain"), { ssr: false })
const ThreeDScene = dynamic(() => import("@/components/three-d-scene"), { ssr: false })
const ParallaxText = dynamic(() => import("@/components/parallax-text"), { ssr: false })
const SkillRadar = dynamic(() => import("@/components/skill-radar"), { ssr: false })

// Client-only scroll hook
function useClientScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Get initial value
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return { scrollYProgress: useMotionValue(scrollProgress), mounted }
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use client-only scroll
  const { scrollYProgress, mounted: scrollMounted } = useClientScrollProgress()

  const { isPlaying, toggleAudio, volume, setVolume, audioError } = useAudio("/audio/cyberpunk-ambient.mp3")
  const [hasInteracted, setHasInteracted] = useState(false)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)

  // Always create transforms to follow Rules of Hooks
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.2, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setMounted(true)

    // Set a timeout to hide the loading screen
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4000) // Adjust time as needed

    // Prevent automatic scrolling
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual"
      window.scrollTo(0, 0)

      // Only prevent auto-scrolling during initial load
      let lastScrollPosition = 0
      const handleScroll = () => {
        // Only prevent auto-scrolling, not user scrolling
        if (!initialLoadComplete) {
          // Store last position before forcing to top
          lastScrollPosition = window.scrollY
          window.scrollTo(0, 0)
        }
      }

      window.addEventListener("scroll", handleScroll, { passive: true })

      // After a delay, allow scrolling
      const scrollTimer = setTimeout(() => {
        setInitialLoadComplete(true)
        window.removeEventListener("scroll", handleScroll)

        // If there was a scroll attempt, restore that position
        if (lastScrollPosition > 0) {
          window.scrollTo(0, lastScrollPosition)
        }
      }, 3000)

      return () => {
        clearTimeout(timer)
        clearTimeout(scrollTimer)
        window.removeEventListener("scroll", handleScroll)
      }
    }

    return () => clearTimeout(timer)
  }, [])

  // Blog posts data
  const blogPosts = [
    {
      title: "Building Advanced Discord Bots with Gemini API",
      excerpt:
        "Learn how to leverage Google's Gemini API to create intelligent Discord bots with multimodal capabilities.",
      date: "May 10, 2023",
      readTime: "8 min read",
      slug: "building-discord-bots-with-gemini",
      tags: ["Discord.js", "Gemini API", "Tutorial"],
    },
    {
      title: "The Future of AI in Community Management",
      excerpt: "Exploring how AI-powered bots are transforming Discord server management and community engagement.",
      date: "April 22, 2023",
      readTime: "6 min read",
      slug: "ai-in-community-management",
      tags: ["AI", "Community", "Discord"],
    },
    {
      title: "Optimizing Bot Performance: Advanced Techniques",
      excerpt: "Deep dive into performance optimization strategies for high-traffic Discord bots.",
      date: "March 15, 2023",
      readTime: "10 min read",
      slug: "optimizing-bot-performance",
      tags: ["Performance", "Node.js", "Technical"],
    },
  ]

  // Experience timeline data
  const experienceData = [
    {
      year: "2025",
      title: "MERN Stack Developer at Epoch Solutions",
      description: "Building and maintaining web applications using React.js and Next.js. Collaborating on MERN stack projects to deliver scalable solutions.",
    },
    {
      year: "2024",
      title: "MERN Stack Developer at Vizz Web Solutions Pvt. Ltd",
      description: "Developed secure RESTful APIs with Node.js and Express.js. Managed project code and documentation on GitHub for team collaboration.",
    },
    {
      year: "2023",
      title: "Frontend Developer at Emirates TechHub",
      description: "Built a modern responsive real estate platform with React.js featuring property listings and interactive UI. Implemented pixel-perfect Figma-to-code conversion using Tailwind CSS.",
    },
    {
      year: "2022",
      title: "Inventory Associate at Outfitters Stores",
      description: "Managed inventory levels, conducted stock audits, and analyzed inventory data using Excel to optimize turnover rates.",
    },
  ]

  // Skills data for the radar chart
  const skillsData = [
    { name: "HTML/CSS", level: 90, color: "#00ffff" },
    { name: "JavaScript", level: 85, color: "#ff00ff" },
    { name: "React.js", level: 80, color: "#00ffff" },
    { name: "Next.js", level: 75, color: "#ff00ff" },
    { name: "Node.js", level: 80, color: "#00ffff" },
    { name: "Express.js", level: 75, color: "#ff00ff" },
    { name: "MongoDB", level: 70, color: "#00ffff" },
    { name: "Tailwind CSS", level: 85, color: "#ff00ff" },
  ]

  const handleFirstInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      toggleAudio()
    }
  }

  if (!mounted) return null

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-hidden" onClick={handleFirstInteraction}>
      {/* Loading Screen */}
      {loading && <CyberLoading onComplete={() => setInitialLoadComplete(true)} />}

      {/* Audio Controller */}
      <AudioController
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        volume={volume}
        setVolume={setVolume}
        audioError={audioError}
      />

      {/* Digital Rain Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <DigitalRain />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: mounted && scrollMounted ? backgroundY : 0,
            opacity: mounted && scrollMounted ? opacity : 1,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]"></div>
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full opacity-20">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-white/5"></div>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-6 inline-block"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-white/10 blur-md"></div>
              <div className="relative px-6 py-2 border border-white/20 bg-black/50 backdrop-blur-sm">
                <Terminal className="inline-block mr-2 h-4 w-4" />
                <span className="text-sm font-mono">FULL STACK DEVELOPER</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4"
          >
            <GlitchText
              text="Sufiyan"
              className="text-8xl md:text-9xl font-black tracking-tighter"
              glitchIntensity={0.2}
              glitchColors={["#00ffff", "#ff00ff", "#ffffff"]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white/80">
              <span className="font-mono text-white">{">"}</span> Fullstack Web developer
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <CyberButton
              onClick={() => {
                setInitialLoadComplete(true)
                scrollToSection("projects")
              }}
              variant="primary"
              soundEffect={audioError ? "none" : "click"}
            >
              VIEW PROJECTS
            </CyberButton>
            <CyberButton
              onClick={() => {
                setInitialLoadComplete(true)
                scrollToSection("terminal")
              }}
              variant="outline"
              soundEffect="hover"
            >
              OPEN TERMINAL
            </CyberButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 mt-4"
          >
            <CyberButton
              onClick={() => {
                setInitialLoadComplete(true)
                window.location.href = "/journey"
              }}
              variant="outline"
              soundEffect="hover"
            >
              MY JOURNEY
            </CyberButton>
            <CyberButton
              onClick={() => {
                setInitialLoadComplete(true)
                window.location.href = "/projects"
              }}
              variant="outline"
              soundEffect="hover"
            >
              ALL PROJECTS
            </CyberButton>
            <CyberButton
              onClick={() => {
                setInitialLoadComplete(true)
                window.location.href = "/giveaway"
              }}
              variant="outline"
              soundEffect="hover"
              className="bg-gradient-to-r from-[#00ffff]/10 to-[#ff00ff]/10 "
            >
              GIVEAWAY
              <Gift className="ml-2 h-4 w-4" />
            </CyberButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-1 h-2 bg-white/80 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 3D Scene Section */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <ThreeDScene />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center px-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-[#00ffff]">DIGITAL</span> CRAFTSMAN
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Creating next-generation Discord experiences through code and innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Parallax Text Section */}
      <section className="relative py-20 overflow-hidden bg-black/80 backdrop-blur-sm border-y border-white/10">
        <ParallaxText baseVelocity={-3}>
          JAVASCRIPT • TYPESCRIPT • NODE.JS • API INTEGRATION • REACT • NEXT.JS
        </ParallaxText>
        <ParallaxText baseVelocity={3}>AI INTEGRATION • API DEVELOPMENT • AUTOMATION • BOTS • SERVERS</ParallaxText>
      </section>

      {/* Terminal Section */}
      <section id="terminal" className="relative min-h-screen flex items-center justify-center py-20 px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="inline-block text-4xl font-bold border-b-2 border-white/20 pb-2">
              <span className="text-[#00ffff]">/</span> TERMINAL <span className="text-[#ff00ff]">/</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <HackerTerminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Radar Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="inline-block text-4xl font-bold border-b-2 border-white/20 pb-2">
              <span className="text-[#00ffff]">/</span> SKILLS <span className="text-[#ff00ff]">/</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <SkillRadar skills={skillsData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">TECHNICAL PROFICIENCY</h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  With expertise in MERN stack development and responsive web design, I build scalable web applications 
                  with clean code and exceptional user experiences.
                </p>

                <div className="space-y-4">
                  {[
                    { name: "Frontend Development", value: 90 },
                    { name: "RESTful API Design", value: 85 },
                    { name: "MERN Stack", value: 80 },
                    { name: "Responsive Design", value: 85 },
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-mono">{skill.name}</span>
                        <span className="font-mono text-[#00ffff]">{skill.value}%</span>
                      </div>
                      <div className="h-1 bg-white/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-black/80 backdrop-blur-sm border-y border-white/10">
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="inline-block text-4xl font-bold border-b-2 border-white/20 pb-2">
              <span className="text-[#ff00ff]">/</span> EXPERIENCE <span className="text-[#00ffff]">/</span>
            </h2>
          </motion.div>

          <CyberTimeline items={experienceData} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen flex items-center py-20 px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="inline-block text-4xl font-bold border-b-2 border-white/20 pb-2">
              <span className="text-[#ff00ff]">/</span> PROJECTS <span className="text-[#00ffff]">/</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First project card - Video Tube */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] opacity-30 group-hover:opacity-100 blur-sm transition duration-500"></div>
                <div className="relative border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center justify-center w-12 h-12 border border-white/20 bg-white/5">
                        <Video className="h-6 w-6 text-[#00ffff]" />
                      </div>
                      <motion.div
                        whileHover={{ rotate: 45 }}
                        transition={{ duration: 0.3 }}
                        className="text-white/50 hover:text-white transition-colors duration-300"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.div>
                    </div>

                    <GlitchText
                      text="VIDEO TUBE"
                      className="text-xl font-bold mb-3 font-mono"
                      glitchIntensity={0.1}
                      glitchColors={["#00ffff", "#ff00ff", "#ffffff"]}
                    />

                    <p className="text-white/60 mb-6 leading-relaxed">
                      A full-stack video sharing platform similar to YouTube with features like video uploads, user authentication, 
                      comments, likes, and personalized recommendations.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {["MongoDB", "Express", "React", "Node.js", "Redux"].map((tag) => (
                        <div
                          key={tag}
                          className="px-2 py-1 text-xs font-mono border border-white/10 bg-white/5 text-white/70"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <a href="https://github.com/Suffynux/Mern-Project-Video-Tube-" target="_blank" rel="noopener noreferrer">
                        <GlitchImage
                          src="https://images.pexels.com/photos/5081404/pexels-photo-5081404.jpeg"
                          alt="Video Tube Preview"
                          width={500}
                          height={300}
                          className="w-full h-[150px] object-cover"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff00ff] to-[#00ffff] opacity-30 group-hover:opacity-100 blur-sm transition duration-500"></div>
                <div className="relative border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center justify-center w-12 h-12 border border-white/20 bg-white/5">
                        <Palette className="h-6 w-6 text-[#ff00ff]" />
                      </div>
                      <motion.div
                        whileHover={{ rotate: 45 }}
                        transition={{ duration: 0.3 }}
                        className="text-white/50 hover:text-white transition-colors duration-300"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.div>
                    </div>

                    <GlitchText
                      text="IMAGE COLOR EXTRACTOR"
                      className="text-xl font-bold mb-3 font-mono"
                      glitchIntensity={0.1}
                      glitchColors={["#ff00ff", "#00ffff", "#ffffff"]}
                    />

                    <p className="text-white/60 mb-6 leading-relaxed">
                      A user-friendly web application that extracts and displays the dominant color palette from any uploaded image,
                      perfect for designers and developers seeking color scheme inspiration.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {["JavaScript", "HTML5", "CSS3", "Canvas API"].map((tag) => (
                        <div
                          key={tag}
                          className="px-2 py-1 text-xs font-mono border border-white/10 bg-white/5 text-white/70"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <a href="https://suffynux.github.io/Image-Color-Extractor/" target="_blank" rel="noopener noreferrer">
                        <GlitchImage
                          src="https://images.pexels.com/photos/33626195/pexels-photo-33626195.jpeg"
                          alt="Image Color Extractor Preview"
                          width={500}
                          height={300}
                          className="w-full h-[150px] object-cover"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gemini Demo Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="inline-block text-4xl font-bold border-b-2 border-white/20 pb-2">
              <span className="text-[#00ffff]">/</span> GEMINI DEMO <span className="text-[#ff00ff]">/</span>
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Experience a simulation of the Gemini AI interface. This demo showcases the conversational capabilities
              that power my Discord bots.
            </p>
          </motion.div>

          <GeminiDemo />
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-black/80 backdrop-blur-sm border-y border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="inline-block text-4xl font-bold border-b-2 border-white/20 pb-2">
              <span className="text-[#ff00ff]">/</span> BLOG <span className="text-[#00ffff]">/</span>
            </h2>
          </motion.div>

          <BlogPreview posts={blogPosts} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-10 text-center"
          >
            <CyberButton
              onClick={() => {
                setInitialLoadComplete(true)
                window.location.href = "/blog"
              }}
              variant="outline"
              soundEffect="hover"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              VIEW ALL POSTS
            </CyberButton>
          </motion.div>
        </div>
      </section>

      {/* Discord Server Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,101,242,0.1)_0%,transparent_70%)]"></div>
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/discord-bg.png')" }}
          ></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="inline-block text-4xl font-bold border-b-2 border-white/20 pb-2">
              <span className="text-[#00ffff]">/</span> JOIN MY DISCORD <span className="text-[#ff00ff]">/</span>
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Connect with me and the community in my Discord server. Get updates, share ideas, and collaborate on
              projects.
            </p>
          </motion.div>

          <DiscordInvite inviteLink="https://discord.gg/9ZQPctbScC" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8 text-center"
          >
            <h2 className="inline-block text-4xl font-bold border-b-2 border-white/20 pb-2">
              <span className="text-[#00ffff]">/</span> CONNECT <span className="text-[#ff00ff]">/</span>
            </h2>
            <p className="mt-4 text-white/70">
              Ready to collaborate on your next project? Let's create something extraordinary together.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <GlitchText text="SUFFYNUX" className="text-2xl font-bold" glitchIntensity={0.1} />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/sufiyan-ali-suffynux/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#0A66C2] transition-colors"
              >
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.041 0 3.603 2.003 3.603 4.605v5.591z"/></svg>
              </a>
              <a
                href="https://x.com/suffynux"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-[#1DA1F2] transition-colors"
              >
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.162 0h-4.326l-5.836 8.228-5.836-8.228h-4.326l8.228 11.6-8.228 12.4h4.326l5.836-8.228 5.836 8.228h4.326l-8.228-12.4z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/suffynux/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#E1306C] transition-colors"
              >
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.682 1.329-.995.995-1.271 2.406-1.329 3.682-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.329 3.682.995.995 2.406 1.271 3.682 1.329 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.682-1.329.995-.995 1.271-2.406 1.329-3.682.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.329-3.682-.995-.995-2.406-1.271-3.682-1.329-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a
                href="https://github.com/Suffynux"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-[#fff] transition-colors"
              >
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
            </div>
            <div className="text-white/50 text-sm font-mono">
              © {new Date().getFullYear()} // DESIGNED & DEVELOPED BY Suffynux
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
