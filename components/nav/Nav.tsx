import Link from 'next/link'
import type { NavLink } from '@/types'
import MobileNav from './MobileNav'
import ThemeToggle from '@/components/ui/ThemeToggle'

const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/music', label: 'Music' },
  { href: '/projects', label: 'Projects' },
]

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 border-b border-border bg-bg/80 backdrop-blur-sm">
      <nav className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight text-text hover:text-accent transition-colors"
        >
          Mike Kazmer
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-text-muted hover:text-text transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          {/* Mobile hamburger */}
          <MobileNav links={links} />
        </div>
      </nav>
    </header>
  )
}
