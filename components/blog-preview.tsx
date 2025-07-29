"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import GlitchText from "@/components/glitch-text"

interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  tags: string[]
}

interface BlogPreviewProps {
  posts: BlogPost[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={cn(
              "border border-white/10 bg-black/50 backdrop-blur-sm p-6",
              "transition-all duration-300",
              hoveredIndex === index ? "border-white/30" : "border-white/10",
            )}
          >
            {/* Glitch effect on hover */}
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.03, 0] }}
                transition={{ duration: 0.2, repeat: 2 }}
                className="absolute inset-0 bg-white"
              />
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <div key={tag} className="px-2 py-1 text-xs font-mono border border-white/10 bg-white/5 text-white/70">
                  {tag}
                </div>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3">
              {hoveredIndex === index ? (
                <GlitchText text={post.title} glitchIntensity={0.2} glitchColors={["#00ffff", "#ff00ff"]} />
              ) : (
                post.title
              )}
            </h3>

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
              <motion.a
                href={`/blog/${post.slug}`}
                className="flex items-center text-sm font-mono text-white/70 hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                READ MORE <ArrowRight className="h-3 w-3 ml-1" />
              </motion.a>
            </div>
          </div>

          {/* Bottom line animation */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
            initial={{ width: "0%" }}
            animate={{ width: hoveredIndex === index ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  )
}
