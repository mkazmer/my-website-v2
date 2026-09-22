import type { Metadata } from 'next'
import Carousel from '@/components/about/Carousel'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          About Me
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text">
          A few things I love
        </h1>
      </div>
      <Carousel />
    </section>
  )
}
