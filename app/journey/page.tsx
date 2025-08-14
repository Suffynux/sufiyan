"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Code, Cpu, Gamepad2, Server, Braces, Terminal, Rocket } from "lucide-react"
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
      year: 20,
      title: "The Inspiration",
      description:
        "Inspired by the anime Sword Art Online, I became fascinated with the idea of creating virtual worlds. Despite not having a PC, I began researching and learning about programming concepts.",
      icon: <Cpu className="h-6 w-6" />,
      color: "from-blue-500 to-purple-500",
      skills: ["Conceptual Learning", "Anime Research", "Virtual Reality Concepts"],
    },
    {
      year: 16,
      title: "First Steps",
      description:
        "Bought my first PC and immediately dove into coding. Started with algorithm fundamentals and Python, while also learning HTML, CSS, and JavaScript basics.",
      icon: <Code className="h-6 w-6" />,
      color: "from-green-500 to-blue-500",
      skills: ["Python", "HTML", "CSS", "JavaScript", "Algorithms"],
    },
    {
      year: 17,
      title: "First Project",
      description:
        "Created my first practical application - a month calculator for a coffee shop that calculated monthly net income. This project taught me about real-world application development.",
      icon: <Terminal className="h-6 w-6" />,
      color: "from-yellow-500 to-orange-500",
      skills: ["Application Development", "Business Logic", "UI Design"],
    },
    {
      year: 18,
      title: "Game Development & Discord",
      description:
        "Expanded my skills into C# and Unity, creating several small games. Simultaneously discovered Discord bot development and built my first moderation tools.",
      icon: <Gamepad2 className="h-6 w-6" />,
      color: "from-red-500 to-pink-500",
      skills: ["C#", "Unity", "API Integration", "Bot Development", "Game Design"],
    },
    {
      year: 20,
      title: "Advanced Discord & Web Dev",
      description:
        "Built a comprehensive Discord bot with moderation features and a 'One-tap' bot that created temporary voice channels. Started exploring React for web development.",
      icon: <Server className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-500",
      skills: ["Discord API", "React", "Node.js", "Server Management", "UX Design"],
    },
    {
      year: 20,
      title: "Skill Enhancement",
      description:
        "Focused on upgrading my skills in both game development and web development, diving deeper into advanced concepts and frameworks.",
      icon: <Braces className="h-6 w-6" />,
      color: "from-cyan-500 to-blue-500",
      skills: ["Advanced React", "Game Physics", "API Development", "State Management", "3D Modeling"],
    },
    {
      year: 20,
      title: "Continuous Learning",
      description:
        "Despite being busy with work, I maintained a commitment to continuous learning, exploring new technologies and keeping up with industry trends.",
      icon: <Terminal className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-500",
      skills: ["Self-directed Learning", "Industry Research", "Code Reviews", "Documentation"],
    },
    {
      year: 20,
      title: "Full Stack Mastery",
      description:
        "Achieved proficiency as a Full Stack Developer and Discord bot developer. Created my own Discord server focused on development, idea sharing, and collaborative learning.",
      icon: <Rocket className="h-6 w-6" />,
      color: "from-[#00ffff] to-[#ff00ff]",
      skills: ["Full Stack Development", "Community Building", "Mentoring", "Project Architecture", "DevOps"],
    },
  ]

  const futureGoals = [
    "Ethical Hacking & Cybersecurity",
    "Advanced AI Integration",
    "Blockchain Development",
    "AR/VR Experiences",
    "Open Source Contributions",
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
          <div className="text-white/50 text-sm font-mono">
            © {new Date().getFullYear()} // DESIGNED & DEVELOPED BY SUFFYNUX
          </div>
        </div>
      </footer>
    </div>
  )
}
