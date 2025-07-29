"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, Share2, Github, Twitter, Facebook } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import GlitchText from "@/components/glitch-text"
import DigitalRain from "@/components/digital-rain"

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

export default function BlogPostPage() {
  const [mounted, setMounted] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const params = useParams()
  const slug = params.slug as string

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sample blog posts data - in a real app, you'd fetch this from an API or CMS
  const blogPosts: BlogPost[] = [
    {
      id: "building-discord-bots-with-gemini",
      title: "Building Advanced API Bots with Gemini API",
      excerpt: "Learn how to leverage Google's Gemini API to create intelligent API bots with multimodal capabilities.",
      content: `
# Building Advanced API Bots with Gemini API

API bots have become an essential part of server management and user engagement. With the introduction of Google's Gemini API, we can now create even more powerful and intelligent bots that can understand and generate text, images, and more.

## What is Gemini?

Gemini is Google's most capable AI model, designed to be helpful, harmless, and honest. It can understand and generate text, images, audio, and more, making it perfect for creating multimodal API bots.

## Setting Up Your Environment

Before we start building our bot, we need to set up our development environment. Here's what you'll need:

- Node.js (v16.9.0 or higher)
- An API client library (e.g., custom library or SDK)
- Google AI Node.js SDK
- An API bot token (if required by the API)
- A Google API key for Gemini

\`\`\`javascript
// Install dependencies
npm install @google/generative-ai dotenv
\`\`\`

## Creating Your Bot

First, let's set up the basic structure of our API bot:

\`\`\`javascript
// index.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Example function to handle API interactions
async function handleApiRequest(input) {
  // Replace this with your actual API interaction logic
  const result = await model.generateContent(input);
  return result.response.text();
}

\`\`\`

## Adding Gemini-Powered Commands

Now, let's add some commands that leverage the power of Gemini:

\`\`\`javascript
// Example usage
async function processUserInput(userInput) {
  // Simple text generation
  if (userInput.startsWith('!ask')) {
    const question = userInput.slice(5).trim();
    if (!question) return 'Please provide a question!';

    try {
      const response = await handleApiRequest(question);
      
      // Split response if it's too long for the output
      if (response.length > 2000) {
        const chunks = response.match(/.{1,2000}/g);
        return chunks;
      } else {
        return response;
      }
    } catch (error) {
      console.error('Error generating content:', error);
      return 'Sorry, I encountered an error processing your request.';
    }
  }
}
\`\`\`

## Handling Images with Gemini Pro Vision

One of the most powerful features of Gemini is its ability to understand images. Let's add image analysis capabilities to our bot:

\`\`\`javascript
// Example usage
async function analyzeImage(imageUrl, contentType) {
  try {
    // Get the image data
    const response = await fetch(imageUrl);
    const imageData = await response.arrayBuffer();
    const base64Image = Buffer.from(imageData).toString('base64');

    // Use Gemini Pro Vision for image analysis
    const visionModel = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    const result = await visionModel.generateContent([
      'Describe this image in detail',
      { inlineData: { data: base64Image, mimeType: contentType } },
    ]);

    const description = result.response.text();
    return description;
  } catch (error) {
    console.error('Error analyzing image:', error);
    return 'Sorry, I encountered an error analyzing the image.';
  }
}
\`\`\`

## Conclusion

By integrating Google's Gemini API with an API client, we've created a powerful bot that can understand and generate text, analyze images, and provide intelligent responses to users. This is just the beginning of what's possible with Gemini-powered API bots.

In future tutorials, we'll explore more advanced features like:

- Creating custom slash commands
- Implementing conversation memory
- Adding moderation capabilities
- Building interactive experiences

Stay tuned for more API bot development tutorials!
      `,
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
  ]

  const post = blogPosts.find((post) => post.slug === slug)

  if (!mounted) return null

  if (!post) {
    return (
      <div className="relative bg-black text-white min-h-screen flex items-center justify-center">
        <div className="fixed inset-0 z-0 opacity-40">
          <DigitalRain />
        </div>
        <div className="relative z-10 text-center p-8">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-white/70 mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Digital Rain Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <DigitalRain />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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

              <GlitchText
                text={post.title}
                className="text-3xl md:text-4xl font-bold tracking-tight"
                glitchIntensity={0.1}
                glitchColors={["#00ffff", "#ff00ff"]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 flex flex-wrap items-center text-white/60 text-sm"
            >
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </div>
              <div className="flex items-center mr-4">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center text-white/60 hover:text-white transition-colors"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </button>

                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 bg-black/90 border border-white/20 p-2 rounded-sm z-20"
                  >
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-white/10 rounded-sm transition-colors">
                        <Twitter className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-sm transition-colors">
                        <Facebook className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-sm transition-colors">
                        <Github className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="border border-white/20 bg-black/70 backdrop-blur-sm p-6 md:p-8">
            <div className="prose prose-invert max-w-none">
              {post.content.split("\n").map((line, index) => {
                if (line.startsWith("# ")) {
                  return (
                    <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                      {line.substring(2)}
                    </h1>
                  )
                } else if (line.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                      {line.substring(3)}
                    </h2>
                  )
                } else if (line.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-bold mt-5 mb-2">
                      {line.substring(4)}
                    </h3>
                  )
                } else if (line.startsWith("```")) {
                  return null // Handle code blocks separately
                } else if (line.trim() === "") {
                  return <br key={index} />
                } else {
                  return (
                    <p key={index} className="my-4 text-white/80 leading-relaxed">
                      {line}
                    </p>
                  )
                }
              })}

              {/* Extract and render code blocks */}
              {post.content.match(/```[\s\S]*?```/g)?.map((codeBlock, index) => {
                const code = codeBlock.replace(/```(javascript|js)?\n|```$/g, "")
                return (
                  <div
                    key={`code-${index}`}
                    className="my-6 bg-black/50 border border-white/10 rounded-sm overflow-hidden"
                  >
                    <div className="bg-white/5 px-4 py-2 text-xs font-mono border-b border-white/10">JavaScript</div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-white/80 text-sm">{code}</code>
                    </pre>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 border border-white/20 bg-black/70 backdrop-blur-sm p-6">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] flex items-center justify-center text-black font-bold text-xl">
                K
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold">Kyros</h3>
                <p className="text-white/60">API Bot Developer & Full Stack Engineer</p>
              </div>
            </div>
            <p className="mt-4 text-white/70">
              Passionate about creating innovative API bots and web applications. Sharing knowledge and experiences
              through tutorials and articles.
            </p>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(
                  (relatedPost) =>
                    relatedPost.slug !== post.slug && relatedPost.tags.some((tag) => post.tags.includes(tag)),
                )
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="border border-white/10 bg-black/50 backdrop-blur-sm p-4 hover:bg-white/5 transition-colors">
                      <h3 className="font-bold mb-2">{relatedPost.title}</h3>
                      <p className="text-white/60 text-sm mb-2">{relatedPost.excerpt}</p>
                      <div className="flex items-center text-xs text-white/50">
                        <Calendar className="h-3 w-3 mr-1" />
                        {relatedPost.date}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <GlitchText text="KYROS" className="text-2xl font-bold" glitchIntensity={0.1} />
          </div>
          <div className="text-white/50 text-sm font-mono">
            © {new Date().getFullYear()} // DESIGNED & DEVELOPED BY KYROS
          </div>
        </div>
      </footer>
    </div>
  )
}
