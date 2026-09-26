import Image from 'next/image'
import OrbBackground from '@/components/ui/OrbBackground'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <OrbBackground />
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-36">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-16">
          {/* Text */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm font-medium text-accent tracking-widest uppercase mb-4">
              <span>Team Manager</span>
              <span className="hidden sm:inline">·</span>
              <span>Software Engineer</span>
              <span className="hidden sm:inline">·</span>
              <span>Bass Player</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-text">
              Mike Kazmer
            </h1>
            <p className="text-xl text-text-muted mt-6 max-w-[350px] sm:max-w-[475px]">
              Building thoughtful web experiences, intuitive UIs and melodic bass lines.
            </p>
          </div>

          {/* Avatar */}
          <div className="flex justify-center md:justify-end shrink-0">
            <div
              className="relative w-80 h-80 sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px]"
              style={{ maskImage: 'radial-gradient(circle closest-side at center, black 92%, transparent 100%)' }}
            >
              <Image
                src="/images/avatar_color.png"
                alt="Mike Kazmer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
