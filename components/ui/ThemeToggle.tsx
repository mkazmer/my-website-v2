'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Render a placeholder of equal size before mount to avoid layout shift
  if (!mounted) return <div className="w-16 h-8 rounded-full" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex items-center w-16 h-8 rounded-full border transition-colors duration-300 ${
        isDark
          ? 'bg-zinc-800 border-zinc-600'
          : 'bg-zinc-100 border-zinc-300'
      }`}
    >
      {/* Sun icon — left side, visible in light mode */}
      <Sun
        size={14}
        className={`absolute left-2 transition-opacity duration-200 ${
          isDark ? 'opacity-0' : 'opacity-100 text-amber-500'
        }`}
      />

      {/* Moon icon — right side, visible in dark mode */}
      <Moon
        size={14}
        className={`absolute right-2 transition-opacity duration-200 ${
          isDark ? 'opacity-100 text-indigo-400' : 'opacity-0'
        }`}
      />

      {/* Sliding thumb — right in light mode, left in dark mode */}
      <motion.div
        className={`absolute top-1/2 left-1 w-6 h-6 rounded-full z-10 ${
          isDark ? 'bg-white' : 'bg-zinc-900'
        }`}
        style={{ y: '-50%' }}
        animate={{ x: isDark ? 0 : 32 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </button>
  )
}
