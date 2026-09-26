'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    src: '/images/about/travel.png',
    alt: 'Travel',
    label: 'Travel',
    title: 'Always Exploring',
    subtitle: 'Lifelong Learner',
    description:
      "I've lived and traveled across the U.S. and currently call Salem, MA home. Exploring new places, meeting new people and experiencing different perspectives keeps me curious—something I bring to web development by always looking for new ideas, approaches and ways to improve.",
  },
  {
    src: '/images/about/gaming.png',
    alt: 'Gaming setup',
    label: 'Gaming',
    title: 'Up for the Challenge',
    subtitle: 'Creative Problem-Solving',
    description:
      "I've always been a casual gamer, but I've developed a particular love for tabletop games and the strategy, creativity and social interaction they bring. I enjoy approaching problems from different angles and finding creative solutions, whether it's across a game board or while building an intuitive web experience.",
  },
  {
    src: '/images/about/music.jpg',
    alt: 'Music',
    label: 'Music',
    title: 'Creating & Building',
    subtitle: 'Artistically Minded',
    description:
      "I started playing bass at 14 and have been creating music ever since. There's something incredibly rewarding about taking an idea and turning it into something people can experience—whether that's playing live, improvising with a band, or bringing an idea to life through thoughtful web design and development.",
  },
  {
    src: '/images/avatar_color.png',
    alt: 'Team leadership',
    label: 'Leadership',
    title: 'Helping Others Grow',
    subtitle: 'Team Management / Leadership',
    description:
      "I've always found a lot of fulfillment in helping people grow, whether that means mentoring a teammate, working through a challenging problem together, or helping someone find their confidence. As a manager and technical leader, I bring that same mindset to building great teams and creating an environment where people can do their best work.",
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

const textVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

const AUTO_INTERVAL = 15_000
const INTERACTION_PAUSE = 30_000

export default function Carousel() {
  const [[index, direction], setSlide] = useState([0, 0])
  const [imgLoaded, setImgLoaded] = useState(false)
  const dragRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const paginate = useCallback((newDirection: number) => {
    setSlide(([prev]) => [
      (prev + newDirection + slides.length) % slides.length,
      newDirection,
    ])
  }, [])

  const goTo = useCallback((i: number) => {
    setSlide(([prev]) => [i, i > prev ? 1 : -1])
  }, [])

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => paginate(1), AUTO_INTERVAL)
  }, [paginate])

  // After user interaction: stop auto-cycle, then resume after INTERACTION_PAUSE
  const resetTimerAfterInteraction = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => startAutoPlay(), INTERACTION_PAUSE)
  }, [startAutoPlay])

  useEffect(() => {
    startAutoPlay()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [startAutoPlay])

  useEffect(() => { setImgLoaded(false) }, [index])

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -50) { paginate(1); resetTimerAfterInteraction() }
      else if (info.offset.x > 50) { paginate(-1); resetTimerAfterInteraction() }
      requestAnimationFrame(() => {
        dragRef.current = false
      })
    },
    [paginate, resetTimerAfterInteraction],
  )

  const handleClick = useCallback(() => {
    if (!dragRef.current) { paginate(1); resetTimerAfterInteraction() }
  }, [paginate, resetTimerAfterInteraction])

  const slide = slides[index]

  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-12">
      {/* Left column: track + dots */}
      <div className="w-full md:w-[56%] shrink-0">
        {/* Track */}
        <div
          className="relative w-full overflow-hidden rounded-2xl cursor-pointer group select-none"
          style={{ aspectRatio: '4/3' }}
          onClick={handleClick}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 220, damping: 30, mass: 1.1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={() => {
                dragRef.current = true
              }}
              onDragEnd={handleDragEnd}
              className="absolute inset-0"
              style={{ touchAction: 'pan-y' }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover pointer-events-none"
                priority={index === 0}
                onLoad={() => setImgLoaded(true)}
              />
              {/* Loading spinner */}
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-subtle/60 backdrop-blur-sm pointer-events-none">
                  <div className="w-8 h-8 rounded-full border-2 border-text-muted/30 border-t-text-muted animate-spin" />
                </div>
              )}
              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Prev arrow */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/50 hover:scale-105"
            onClick={(e) => {
              e.stopPropagation()
              paginate(-1)
              resetTimerAfterInteraction()
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next arrow */}
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/50 hover:scale-105"
            onClick={(e) => {
              e.stopPropagation()
              paginate(1)
              resetTimerAfterInteraction()
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimerAfterInteraction() }}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-6 h-[6px] bg-accent'
                  : 'w-[6px] h-[6px] bg-border hover:bg-text-muted'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right column: per-slide text */}
      <div className="mt-10 md:mt-0 md:flex-1 text-center md:text-left min-h-[96px] md:min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-text">{slide.title}</h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mt-2">{slide.subtitle}</p>
            <p className="text-text-muted mt-4 leading-relaxed text-base">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
