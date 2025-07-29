"use client"

import { useState, useEffect, useRef } from "react"

export function useAudio(src?: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (src) {
      try {
        audioRef.current = new Audio(src)

        // Add event listeners for error handling
        audioRef.current.addEventListener("canplaythrough", () => {
          setAudioLoaded(true)
          setAudioError(false)
        })

        audioRef.current.addEventListener("error", (e) => {
          console.warn("Audio failed to load:", e)
          setAudioError(true)
          setAudioLoaded(false)
        })

        audioRef.current.loop = true
        audioRef.current.volume = volume
        audioRef.current.preload = "auto"
      } catch (error) {
        console.error("Error initializing audio:", error)
        setAudioError(true)
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("canplaythrough", () => {})
        audioRef.current.removeEventListener("error", () => {})
        audioRef.current = null
      }
    }
  }, [src])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const toggleAudio = () => {
    if (!audioRef.current || audioError) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Audio playback failed:", error)
            setAudioError(true)
          })
        }
      }

      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error("Error toggling audio:", error)
      setAudioError(true)
    }
  }

  const playSound = (soundSrc: string) => {
    try {
      // Only attempt to play sound effects if audio is generally working
      if (!audioError) {
        const sound = new Audio(soundSrc)
        sound.volume = volume * 0.5 // Slightly lower volume for effect sounds

        const playPromise = sound.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Sound effect playback failed:", error)
          })
        }
      }
    } catch (error) {
      console.warn("Error playing sound effect:", error)
    }
  }

  return { isPlaying, toggleAudio, volume, setVolume, playSound, audioLoaded, audioError }
}
