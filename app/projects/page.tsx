"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, MessageSquare, Server, Code, Gamepad2, Bot, Cloud, Video, Globe, BookOpen, Palette } from "lucide-react"
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
    // {
    //   id: "portfolio-page",
    //   title: "PORTFOLIO WEBSITE",
    //   description: "Modern, responsive portfolio showcasing web development skills",
    //   longDescription:
    //     "A clean, responsive single-page portfolio built with Next.js showcasing web development, UI/UX design, and digital marketing services. Features modern design, smooth user experience, and optimized performance for all devices.",
    //   image: "/placeholder.svg?height=300&width=500",
    //   technologies: ["Next.js", "React", "JavaScript", "Tailwind CSS", "TypeScript"],
    //   category: ["web"],
    //   links: {
    //     github: "https://github.com/Suffynux/porfolio-page",
    //     live: "https://www.suffynux.me/",
    //   },
    //   featured: true,
    //   icon: <Code className="h-6 w-6 text-[#00ffff]" />,
    // },
    {
      id: "deeniverse",
      title: "DEENIVERSE",
      description: "Online Quran learning platform with interactive features",
      longDescription:
        "An online Quran learning platform with interactive features and modern UI. Provides comprehensive Islamic education resources, interactive Quran recitation tools, and a community forum for learners. The platform includes progress tracking and personalized learning paths.",
      image: "https://images.pexels.com/photos/36704/pexels-photo.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Express", "RESTful API"],
      category: ["web", "api"],
      links: {
        github: "https://github.com/Suffynux/deeniverse",
        live: "https://www.deeniverse.com/"
      },
      featured: true,
      icon: <BookOpen className="h-6 w-6 text-[#ff00ff]" />,
    },
    {
      id: "chatcord",
      title: "CHATCORD",
      description: "Real-time team chat application with Socket.io integration",
      longDescription:
        "A real-time team chat application that enables instant messaging between team members. Features include private messaging, channel creation, message history, and real-time notifications. Built with Socket.io for seamless real-time communication.",
      image: "https://images.pexels.com/photos/18663994/pexels-photo-18663994.jpeg",
      technologies: ["Node.js", "Socket.io", "Express", "JavaScript", "CSS"],
      category: ["web", "api"],
      links: {
        github: "https://github.com/Suffynux/chatcord",
      },
      featured: true,
      icon: <MessageSquare className="h-6 w-6 text-[#00ffff]" />,
    },
    {
      id: "nextgrid-it",
      title: "NEXTGRID IT",
      description: "Professional IT solutions and web development services platform",
      longDescription:
        "A professional website for an IT solutions and web development services company. Features service listings, portfolio showcase, team profiles, and contact forms. Built with modern web technologies for optimal performance and user experience.",
      image: "https://images.pexels.com/photos/9588205/pexels-photo-9588205.jpeg",
      technologies: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
      category: ["web"],
      links: {
        live: "https://nextgridit.co.uk/",
      },
      featured: true,
      icon: <Globe className="h-6 w-6 text-[#ff00ff]" />,
    },
    {
      id: "video-tube",
      title: "VIDEO TUBE",
      description: "Full-stack video sharing platform built with MERN stack",
      longDescription:
        "A full-stack video sharing platform similar to YouTube. Features include video uploads, user authentication, comments, likes, subscriptions, and personalized recommendations. Built using the MERN stack with RESTful API design.",
      image: "https://images.pexels.com/photos/5081404/pexels-photo-5081404.jpeg",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Redux"],
      category: ["web", "api"],
      links: {
        github: "https://github.com/Suffynux/Mern-Project-Video-Tube-",
      },
      featured: false,
      icon: <Video className="h-6 w-6 text-[#00ffff]" />,
    },
    {
      id: "weather-app",
      title: "WEATHER APP",
      description: "Interactive weather application with real-time data",
      longDescription:
        "An interactive weather application that provides real-time weather information for any location. Features include current weather conditions, forecasts, temperature trends, and location search. The app leverages weather APIs to deliver accurate and up-to-date information.",
      image: "https://images.pexels.com/photos/32396961/pexels-photo-32396961.jpeg",
      technologies: ["HTML", "JavaScript", "CSS", "API Integration", "Responsive Design"],
      category: ["web", "api"],
      links: {
        github: "https://github.com/Suffynux/Weather-APP",
        live: "https://suffynux.github.io/Weather-APP/",
      },
      featured: false,
      icon: <Cloud className="h-6 w-6 text-[#ff00ff]" />,
    },
    {
      id: "image-color-extractor",
      title: "IMAGE COLOR EXTRACTOR",
      description: "Tool for extracting dominant colors from any image",
      longDescription:
        "A user-friendly web application that extracts and displays the dominant color palette from any uploaded image. Useful for designers and developers who need color scheme inspiration. The app uses advanced color quantization algorithms to identify the most prominent colors and presents them in an easily usable format.",
      image: "https://images.pexels.com/photos/33626195/pexels-photo-33626195.jpeg",
      technologies: ["JavaScript", "HTML5", "CSS3", "Canvas API", "Color Theory"],
      category: ["web"],
      links: {
        github: "https://github.com/Suffynux/Image-Color-Extractor",
        live: "https://suffynux.github.io/Image-Color-Extractor/",
      },
      featured: false,
      icon: <Palette className="h-6 w-6 text-[#00ffff]" />,
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
              A showcase of my work across web development, Discord bots
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
              © {new Date().getFullYear()} // DESIGNED & DEVELOPED BY SUFFYNUX
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
