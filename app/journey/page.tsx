"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Code, Cpu, Terminal, Rocket, Package, Table, PenTool, Globe } from "lucide-react"
import Link from "next/link"
import GlitchText from "@/components/glitch-text"
import DigitalRain from "@/components/digital-rain"
import ParallaxText from "@/components/parallax-text"
import { cn } from "@/lib/utils"

export default function JourneyPage() {
  const [activeYear, setActiveYear] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const journeyData = [
    {
      year: 18,
      title: "Stock Boy Beginnings",
      description:
        "Started my first job as a stock boy in retail. While organizing inventory and tracking stock levels, I became curious about how systems and data work in business environments.",
      icon: <Package className="h-6 w-6" />,
      color: "from-blue-500 to-purple-500",
      skills: ["Inventory Management", "Team Collaboration", "Organization", "Time Management"],
    },
    {
      year: 18,
      title: "Microsoft Excel Introduction",
      description:
        "Began learning Microsoft Excel to help improve inventory tracking at work. Discovered the power of data organization and basic formulas that could automate repetitive tasks.",
      icon: <Table className="h-6 w-6" />,
      color: "from-green-500 to-blue-500",
      skills: ["Microsoft Excel", "Data Entry", "Basic Formulas", "Data Organization"],
    },
    {
      year: 19,
      title: "IT Concepts Exploration",
      description:
        "Started learning basic IT concepts through online resources. Became interested in how computers work and how software could solve real-world problems in business settings.",
      icon: <Cpu className="h-6 w-6" />,
      color: "from-yellow-500 to-orange-500",
      skills: ["Computer Basics", "Troubleshooting", "Self-Learning", "Online Resources"],
    },
    {
      year: 19,
      title: "Graphic Design Beginnings",
      description:
        "Explored graphic design using tools like Canva. Created simple designs for personal projects and began understanding the importance of visual communication in digital spaces.",
      icon: <PenTool className="h-6 w-6" />,
      color: "from-red-500 to-pink-500",
      skills: ["Canva", "Basic Design Principles", "Visual Communication", "Digital Graphics"],
    },
    {
      year: 19,
      title: "Python Programming Introduction",
      description:
        "Took my first steps into programming by learning Python. Started with basic syntax and simple scripts, gradually building more complex programs and understanding programming logic.",
      icon: <Code className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-500",
      skills: ["Python", "Programming Logic", "Problem Solving", "Algorithms"],
    },
    {
      year: 20,
      title: "Web Development Foundations",
      description:
        "Began learning HTML, CSS, and JavaScript. Built my first static websites and learned how to create responsive designs for different screen sizes.",
      icon: <Globe className="h-6 w-6" />,
      color: "from-cyan-500 to-blue-500",
      skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "Web Basics"],
    },
    {
      year: 20,
      title: "React Framework Learning",
      description:
        "Dove into React.js to build more interactive and modern web applications. Learned about component-based architecture and state management to create dynamic user interfaces.",
      icon: <Terminal className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-500",
      skills: ["React", "Component Architecture", "State Management", "UI Development"],
    },
    {
      year: 20,
      title: "Full Stack Development Journey",
      description:
        "Expanded my skills to include backend development with Node.js and Express. Built full-stack applications and learned about database integration, API development, and deployment processes.",
      icon: <Rocket className="h-6 w-6" />,
      color: "from-[#00ffff] to-[#ff00ff]",
      skills: ["Node.js", "Express", "MongoDB", "API Design", "Full Stack Development"],
    },
  ]

  const futureGoals = [
    "Advanced React Patterns",
    "System Design & Architecture",
    "Cybersecurity Specialization",
    "Mobile App Development",
    "MERN Stack Project Collaborations",
  ]

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
                text="MY DEVELOPMENT JOURNEY"
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
              From anime inspiration to full stack development — my path through code and creation
            </motion.p>
          </div>
        </div>
      </header>

      {/* Parallax Text Section */}
      <section className="relative py-10 overflow-hidden bg-black/80 backdrop-blur-sm border-y border-white/10">
        <ParallaxText baseVelocity={-3}>INSPIRATION • LEARNING • GROWTH • CREATION • MASTERY</ParallaxText>
      </section>

      {/* Main Content */}
      <main className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">
                  <span className="text-[#00ffff]">/</span> TIMELINE
                </h2>
                <div className="space-y-4">
                  {journeyData.map((item) => (
                    <motion.button
                      key={item.year}
                      className={cn(
                        "w-full text-left p-3 border transition-all duration-300",
                        activeYear === item.year
                          ? "border-white bg-white/10 text-white"
                          : "border-white/20 bg-black/50 text-white/70 hover:bg-white/5",
                      )}
                      onClick={() => setActiveYear(item.year)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full mr-3",
                            "bg-gradient-to-r",
                            item.color,
                          )}
                        >
                          <span className="font-mono font-bold">{item.year}</span>
                        </div>
                        <span className="font-mono">{item.title}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              {activeYear ? (
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {journeyData
                    .filter((item) => item.year === activeYear)
                    .map((item) => (
                      <div key={item.year} className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r opacity-50 blur-md rounded-md"></div>
                        <div className="relative border border-white/20 bg-black/70 backdrop-blur-sm p-6">
                          <div className="flex items-center mb-6">
                            <div
                              className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-full mr-4",
                                "bg-gradient-to-r",
                                item.color,
                              )}
                            >
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold">Age {item.year}</h3>
                              <p className="text-white/70">{item.title}</p>
                            </div>
                          </div>

                          <p className="text-white/80 mb-8 leading-relaxed text-lg">{item.description}</p>

                          <div className="mb-6">
                            <h4 className="text-sm font-mono text-white/50 mb-3">SKILLS & TECHNOLOGIES</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill) => (
                                <div
                                  key={skill}
                                  className="px-3 py-1 text-sm font-mono border border-white/20 bg-white/5 text-white/80"
                                >
                                  {skill}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {item.year > 15 && (
                              <button
                                onClick={() => setActiveYear(item.year - 1)}
                                className="flex items-center justify-center py-2 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                              >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Previous Year
                              </button>
                            )}
                            {item.year < 22 && (
                              <button
                                onClick={() => setActiveYear(item.year + 1)}
                                className="flex items-center justify-center py-2 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                              >
                                Next Year
                                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 border border-white/20 bg-black/50 backdrop-blur-sm"
                >
                  <div className="mb-6">
                    <Terminal className="h-16 w-16 text-[#00ffff] mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Select a Year</h3>
                    <p className="text-white/70">
                      Choose a point in my development journey from the timeline to see what I was working on.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Future Plans */}
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8 text-center"
            >
              <h2 className="inline-block text-3xl font-bold border-b-2 border-white/20 pb-2">
                <span className="text-[#ff00ff]">/</span> FUTURE PLANS <span className="text-[#00ffff]">/</span>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] opacity-30 blur-md rounded-md"></div>
              <div className="relative border border-white/20 bg-black/70 backdrop-blur-sm p-8">
                <p className="text-white/80 mb-8 text-center max-w-3xl mx-auto">
                  My journey is far from over. As I continue to grow as a developer, these are the areas I'm excited to
                  explore next:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {futureGoals.map((goal, index) => (
                    <motion.div
                      key={goal}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <div className="text-lg font-bold mb-2 text-[#00ffff]">{goal}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-white/60 italic">
                    "The best way to predict the future is to create it." — Abraham Lincoln
                  </p>
                </div>
              </div>
            </div>
          </div>
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
