'use client'

import { useEffect, useRef } from 'react'

interface Orb {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
}

const LIGHT_COLORS = ['#6366f1', '#7c3aed', '#38bdf8', '#f472b6', '#818cf8', '#34d399']
const DARK_COLORS  = ['#818cf8', '#a78bfa', '#7dd3fc', '#f9a8d4', '#6366f1', '#6ee7b7']
const ORB_COUNT = 10
const MOUSE_RADIUS = 280
const MOUSE_FORCE = 0.018
const SPEED = 0.35
const DECAY = 0.985

export default function OrbBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const orbsRef = useRef<Orb[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = () => document.documentElement.classList.contains('dark')

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function initOrbs() {
      const w = canvas!.width
      const h = canvas!.height
      orbsRef.current = Array.from({ length: ORB_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2
        const speed = SPEED * (0.5 + Math.random() * 0.5)
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 70 + Math.random() * 90,
          color: LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)],
          opacity: 0.13 + Math.random() * 0.10,
        }
      })
    }

    function drawOrb(orb: Orb) {
      const colors = isDark() ? DARK_COLORS : LIGHT_COLORS
      // re-assign color from palette based on stable index isn't possible here — we just use stored color
      const grad = ctx!.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
      grad.addColorStop(0, hexToRgba(orb.color, orb.opacity * 1.6))
      grad.addColorStop(0.45, hexToRgba(orb.color, orb.opacity))
      grad.addColorStop(1, hexToRgba(orb.color, 0))
      ctx!.beginPath()
      ctx!.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
      ctx!.fillStyle = grad
      ctx!.fill()
      void colors // consumed above indirectly via isDark; suppress lint
    }

    function tick() {
      const w = canvas!.width
      const h = canvas!.height
      ctx!.clearRect(0, 0, w, h)

      for (const orb of orbsRef.current) {
        const dx = mouse.current.x - orb.x
        const dy = mouse.current.y - orb.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE
          orb.vx += (dx / dist) * force
          orb.vy += (dy / dist) * force
        }

        orb.vx *= DECAY
        orb.vy *= DECAY

        // nudge if too slow
        const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy)
        if (speed < SPEED * 0.3) {
          orb.vx += (Math.random() - 0.5) * 0.05
          orb.vy += (Math.random() - 0.5) * 0.05
        }

        orb.x += orb.vx
        orb.y += orb.vy

        // wrap at edges with a margin equal to radius
        if (orb.x < -orb.radius) orb.x = w + orb.radius
        if (orb.x > w + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = h + orb.radius
        if (orb.y > h + orb.radius) orb.y = -orb.radius

        drawOrb(orb)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function onTouchMove(e: TouchEvent) {
      const rect = canvas!.getBoundingClientRect()
      const t = e.touches[0]
      mouse.current = { x: t.clientX - rect.left, y: t.clientY - rect.top }
    }

    function onMouseLeave() {
      mouse.current = { x: -9999, y: -9999 }
    }

    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(canvas)

    resize()
    initOrbs()
    tick()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
