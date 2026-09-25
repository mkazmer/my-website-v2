import type { Metadata } from 'next'
import Carousel from '@/components/about/Carousel'
import OrbBackground from '@/components/ui/OrbBackground'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <OrbBackground />
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            About Me
          </p>
        </div>
        <Carousel />
      </section>
    </div>
  )
}
