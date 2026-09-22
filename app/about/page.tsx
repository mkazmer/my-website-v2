import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight text-text">About</h1>
      <p className="text-text-muted mt-4">Coming soon.</p>
    </section>
  )
}
