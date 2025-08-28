"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Search, Tag, ArrowRight } from "lucide-react"
import Link from "next/link"
import GlitchText from "@/components/glitch-text"
import DigitalRain from "@/components/digital-rain"
import { cn } from "@/lib/utils"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  slug: string
  tags: string[]
  featured: boolean
}

export default function BlogPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const blogPosts: BlogPost[] = [
    {
      id: "building-discord-bots-with-gemini",
      title: "Building Advanced Discord Bots with Gemini API",
      excerpt:
        "Learn how to leverage Google's Gemini API to create intelligent Discord bots with multimodal capabilities.",
      content: "Full blog post content here...",
      date: "May 10, 2023",
      readTime: "8 min read",
      slug: "building-discord-bots-with-gemini",
      tags: ["API Integration", "Gemini API", "Tutorial"],
      featured: true,
    },
    {
      id: "ai-in-community-management",
      title: "The Future of AI in Community Management",
      excerpt: "Exploring how AI-powered bots are transforming Discord server management and community engagement.",
      content: "Full blog post content here...",
      date: "April 22, 2023",
      readTime: "6 min read",
      slug: "ai-in-community-management",
      tags: ["AI", "Community", "Discord"],
      featured: true,
    },
    {
      id: "optimizing-bot-performance",
      title: "Optimizing Bot Performance: Advanced Techniques",
      excerpt: "Deep dive into performance optimization strategies for high-traffic Discord bots.",
      content: "Full blog post content here...",
      date: "March 15, 2023",
      readTime: "10 min read",
      slug: "optimizing-bot-performance",
      tags: ["Performance", "Node.js", "Technical"],
      featured: false,
    },
    {
      id: "discord-js-v14-guide",
      title: "Complete Guide to Discord.js v14",
      excerpt: "Everything you need to know about the latest version of Discord.js and how to migrate your bots.",
      content: "Full blog post content here...",
      date: "February 28, 2023",
      readTime: "12 min read",
      slug: "discord-js-v14-guide",
      tags: ["API Integration", "Tutorial", "Migration"],
      featured: false,
    },
    {
      id: "mongodb-for-bot-developers",
      title: "MongoDB for Discord Bot Developers",
      excerpt: "Learn how to effectively use MongoDB to store and manage data for your Discord bots.",
      content: "Full blog post content here...",
      date: "January 15, 2023",
      readTime: "9 min read",
      slug: "mongodb-for-bot-developers",
      tags: ["MongoDB", "Database", "Tutorial"],
      featured: false,
    },
    {
      id: "creating-custom-commands",
      title: "Creating Custom Commands for Discord Bots",
      excerpt: "A step-by-step guide to implementing flexible and powerful custom commands in your Discord bot.",
      content: "Full blog post content here...",
      date: "December 10, 2022",
      readTime: "7 min read",
      slug: "creating-custom-commands",
      tags: ["API Integration", "Commands", "Tutorial"],
      featured: false,
    },
  ]

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

  // Filter posts based on search query and selected tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

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
                text="BLOG"
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
              Thoughts, tutorials, and insights on Discord bot development and web technologies
            </motion.p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Search */}
                <div className="border border-white/20 bg-black/70 backdrop-blur-sm p-4">
                  <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">SEARCH</h2>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search posts..."
                      className="w-full bg-black border border-white/20 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#00ffff] focus:border-[#00ffff] transition-colors duration-300"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  </div>
                </div>

                {/* Tags */}
                <div className="border border-white/20 bg-black/70 backdrop-blur-sm p-4">
                  <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">TAGS</h2>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedTag(null)}
                      className={cn(
                        "px-3 py-1 text-sm font-mono border transition-colors duration-300",
                        selectedTag === null
                          ? "border-[#00ffff] bg-[#00ffff]/10 text-[#00ffff]"
                          : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10",
                      )}
                    >
                      All
                    </button>
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={cn(
                          "px-3 py-1 text-sm font-mono border transition-colors duration-300",
                          tag === selectedTag
                            ? "border-[#00ffff] bg-[#00ffff]/10 text-[#00ffff]"
                            : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10",
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured Posts */}
                <div className="border border-white/20 bg-black/70 backdrop-blur-sm p-4">
                  <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">FEATURED</h2>
                  <div className="space-y-4">
                    {blogPosts
                      .filter((post) => post.featured)
                      .map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="block border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors duration-300"
                        >
                          <h3 className="font-bold text-sm mb-1">{post.title}</h3>
                          <div className="flex items-center text-xs text-white/50">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="md:col-span-2">
              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div
                        className={cn(
                          "border border-white/10 bg-black/50 backdrop-blur-sm p-6",
                          "transition-all duration-300",
                          "hover:border-white/30",
                        )}
                      >
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <div
                              key={tag}
                              className="flex items-center px-2 py-1 text-xs font-mono border border-white/10 bg-white/5 text-white/70"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </div>
                          ))}
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="text-xl font-bold mb-3 hover:text-[#00ffff] transition-colors duration-300">
                            {post.title}
                          </h3>
                        </Link>

                        {/* Excerpt */}
                        <p className="text-white/60 mb-4">{post.excerpt}</p>

                        {/* Meta */}
                        <div className="flex items-center text-xs text-white/50 mb-4">
                          <div className="flex items-center mr-4">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>

                        {/* Read more link */}
                        <div className="flex justify-end">
                          <motion.div whileHover={{ x: 5 }}>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="flex items-center text-sm font-mono text-white/70 hover:text-white transition-colors duration-300"
                            >
                              READ MORE <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                          </motion.div>
                        </div>
                      </div>

                      {/* Bottom line animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="border border-white/20 bg-black/70 backdrop-blur-sm p-8 text-center">
                  <Search className="h-12 w-12 mx-auto mb-4 text-white/30" />
                  <h3 className="text-xl font-bold mb-2">No Posts Found</h3>
                  <p className="text-white/60 mb-4">
                    No posts match your current search criteria. Try adjusting your search or tags.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedTag(null)
                    }}
                    className="px-4 py-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
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
