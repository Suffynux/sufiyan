"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, MessageSquare, Server, Code, Gamepad2, Bot } from "lucide-react"
import Link from "next/link"
import GlitchText from "@/components/glitch-text"
import GlitchImage from "@/components/glitch-image"
import DigitalRain from "@/components/digital-rain"
import { cn } from "@/lib/utils"

type ProjectCategory = "all" | "api" | "web" | "game" | "ai"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: ProjectCategory[]
  links: {
    demo?: string
    github?: string
    live?: string
  }
  featured: boolean
  icon: React.ReactNode
}

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects: Project[] = [
    {
      id: "gemini-bot",
      title: "GEMINI DISCORD BOT",
      description: "AI-powered Discord bot using Google's Gemini API",
      longDescription:
        "A powerful Discord bot leveraging Google's Gemini API for advanced natural language processing, image recognition, and multimodal interactions within Discord servers. The bot can answer questions, generate images, moderate content, and provide personalized assistance to server members.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["API Integration", "Node.js", "Gemini API", "MongoDB", "Express"],
      category: ["api", "ai"],
      links: {
        github: "https://github.com/kyros/gemini-bot",
        live: "https://discord.com/application-directory/gemini-bot",
      },
      featured: true,
      icon: <Bot className="h-6 w-6 text-[#00ffff]" />,
    },
    {
      id: "server-log",
      title: "SERVER LOG TRACKER",
      description: "Comprehensive server monitoring and analytics",
      longDescription:
        "A comprehensive Discord bot that monitors and logs server activities, providing detailed analytics, moderation tools, and security features. Track member activity, message statistics, voice channel usage, and receive alerts for suspicious behavior. Includes a web dashboard for easy configuration and data visualization.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["API Integration", "MongoDB", "Express", "Chart.js", "React"],
      category: ["api", "web"],
      links: {
        github: "https://github.com/kyros/server-log",
        demo: "https://server-log.kyros.dev",
      },
      featured: true,
      icon: <Server className="h-6 w-6 text-[#ff00ff]" />,
    },
    {
      id: "portfolio",
      title: "CYBERPUNK PORTFOLIO",
      description: "Personal developer portfolio with cyberpunk aesthetics",
      longDescription:
        "A cyberpunk-themed developer portfolio showcasing my projects and skills. Features include interactive elements, animations, 3D graphics, terminal simulation, and a neural puzzle game. Built with Next.js and Three.js for an immersive user experience.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "React", "Three.js", "Framer Motion", "Tailwind CSS"],
      category: ["web"],
      links: {
        github: "https://github.com/kyros/portfolio",
        live: "https://kyros.dev",
      },
      featured: true,
      icon: <Code className="h-6 w-6 text-[#00ffff]" />,
    },
    {
      id: "one-tap",
      title: "ONE-TAP BOT",
      description: "Discord bot creating temporary voice channels",
      longDescription:
        "A specialized Discord bot that creates temporary voice channels on demand. When users join a designated 'hub' channel, the bot automatically creates a new voice channel for them and their friends. The channel is automatically deleted when everyone leaves, keeping the server clean and organized.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["API Integration", "Node.js", "MongoDB"],
      category: ["api"],
      links: {
        github: "https://github.com/kyros/one-tap-bot",
      },
      featured: false,
      icon: <MessageSquare className="h-6 w-6 text-[#ff00ff]" />,
    },
    {
      id: "unity-game",
      title: "CYBER RUNNER",
      description: "3D endless runner game built with Unity",
      longDescription:
        "A cyberpunk-themed endless runner game built with Unity and C#. Players navigate through a neon-lit cityscape, avoiding obstacles and collecting power-ups. Features include procedurally generated levels, character customization, and online leaderboards.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Unity", "C#", "Blender", "Adobe Photoshop"],
      category: ["game"],
      links: {
        demo: "https://kyros.itch.io/cyber-runner",
      },
      featured: false,
      icon: <Gamepad2 className="h-6 w-6 text-[#00ffff]" />,
    },
    {
      id: "coffee-calculator",
      title: "COFFEE SHOP CALCULATOR",
      description: "Monthly net income calculator for coffee shops",
      longDescription:
        "My first practical application - a month calculator for a coffee shop that calculated monthly net income. This project taught me about real-world application development, business logic, and creating user-friendly interfaces for non-technical users.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["JavaScript", "HTML", "CSS", "Local Storage"],
      category: ["web"],
      links: {
        github: "https://github.com/kyros/coffee-calculator",
      },
      featured: false,
      icon: <Code className="h-6 w-6 text-[#ff00ff]" />,
    },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category.includes(selectedCategory))

  const categories: { value: ProjectCategory; label: string; icon: React.ReactNode }[] = [
    { value: "all", label: "All Projects", icon: <Code className="h-4 w-4" /> },
    { value: "api", label: "API Projects", icon: <MessageSquare className="h-4 w-4" /> },
    { value: "web", label: "Web Development", icon: <Server className="h-4 w-4" /> },
    { value: "game", label: "Game Development", icon: <Gamepad2 className="h-4 w-4" /> },
    { value: "ai", label: "AI Projects", icon: <Bot className="h-4 w-4" /> },
  ]

  const currentProject = selectedProject ? projects.find((p) => p.id === selectedProject) : null

  if (!mounted) return null

  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Digital Rain Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <DigitalRain />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <GlitchText
                text="MY PROJECTS"
                className="text-4xl md:text-6xl font-bold tracking-tight"
                glitchIntensity={0.2}
                glitchColors={["#00ffff", "#ff00ff"]}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-white/70 max-w-2xl mx-auto"
            >
              A showcase of my work across Discord bots, web development, and game creation
            </motion.p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.value}
                  className={cn(
                    "flex items-center px-4 py-2 border transition-all duration-300",
                    selectedCategory === category.value
                      ? "border-white bg-white/10 text-white"
                      : "border-white/20 bg-black/50 text-white/70 hover:bg-white/5",
                  )}
                  onClick={() => setSelectedCategory(category.value)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  <span className="ml-2 font-mono">{category.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {selectedProject ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {currentProject && (
                <div className="relative">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 left-4 z-20 flex items-center justify-center w-10 h-10 bg-black/70 border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <div className="relative mb-8">
                    <GlitchImage
                      src={currentProject.image}
                      alt={currentProject.title}
                      width={1200}
                      height={600}
                      className="w-full h-[300px] md:h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center justify-center w-10 h-10 border border-white/20 bg-black/70 mr-3">
                          {currentProject.icon}
                        </div>
                        <h1 className="text-3xl font-bold">{currentProject.title}</h1>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {currentProject.technologies.map((tech) => (
                          <div
                            key={tech}
                            className="px-2 py-1 text-xs font-mono border border-white/10 bg-black/70 text-white/70"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2">
                      <div className="border border-white/10 bg-black/70 backdrop-blur-sm p-6">
                        <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">PROJECT OVERVIEW</h2>
                        <p className="text-white/80 leading-relaxed whitespace-pre-line">
                          {currentProject.longDescription}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="border border-white/10 bg-black/70 backdrop-blur-sm p-6">
                        <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">PROJECT LINKS</h2>
                        <div className="space-y-4">
                          {currentProject.links.github && (
                            <a
                              href={currentProject.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-white/70 hover:text-white transition-colors"
                            >
                              <Github className="h-5 w-5 mr-2" />
                              <span>GitHub Repository</span>
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </a>
                          )}
                          {currentProject.links.live && (
                            <a
                              href={currentProject.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-white/70 hover:text-white transition-colors"
                            >
                              <ExternalLink className="h-5 w-5 mr-2" />
                              <span>Live Project</span>
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </a>
                          )}
                          {currentProject.links.demo && (
                            <a
                              href={currentProject.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-white/70 hover:text-white transition-colors"
                            >
                              <ExternalLink className="h-5 w-5 mr-2" />
                              <span>Demo</span>
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="border border-white/10 bg-black/70 backdrop-blur-sm p-6 mt-6">
                        <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">TECHNOLOGIES</h2>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.technologies.map((tech) => (
                            <div
                              key={tech}
                              className="px-3 py-2 text-sm font-mono border border-white/20 bg-white/5 text-white/80"
                            >
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] opacity-30 group-hover:opacity-100 blur-sm transition duration-500"></div>
                    <div className="relative border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <GlitchImage
                          src={project.image}
                          alt={project.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        {project.featured && (
                          <div className="absolute top-2 right-2 bg-[#ff00ff] text-black text-xs font-bold px-2 py-1">
                            FEATURED
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center justify-center w-10 h-10 border border-white/20 bg-white/5">
                            {project.icon}
                          </div>
                          <motion.div
                            whileHover={{ rotate: 45 }}
                            transition={{ duration: 0.3 }}
                            className="text-white/50 hover:text-white transition-colors duration-300"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </motion.div>
                        </div>

                        <h3 className="text-xl font-bold mb-3 font-mono">{project.title}</h3>
                        <p className="text-white/60 mb-6 leading-relaxed">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <div
                              key={tech}
                              className="px-2 py-1 text-xs font-mono border border-white/10 bg-white/5 text-white/70"
                            >
                              {tech}
                            </div>
                          ))}
                          {project.technologies.length > 3 && (
                            <div className="px-2 py-1 text-xs font-mono border border-white/10 bg-white/5 text-white/70">
                              +{project.technologies.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Hover line animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <GlitchText text="Suffynux" className="text-2xl font-bold" glitchIntensity={0.1} />
          </div>
          <div className="text-white/50 text-sm font-mono">
            © {new Date().getFullYear()} // DESIGNED & DEVELOPED BY SUFFYNUX
          </div>
        </div>
      </footer>
    </div>
  )
}
