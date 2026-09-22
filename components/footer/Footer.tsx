const socials = [
  { href: 'https://www.linkedin.com/in/mike-kazmer-517967118/', label: 'LinkedIn' },
  { href: 'https://github.com/mkazmer', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} Mike Kazmer
        </p>
        <ul className="flex items-center gap-6">
          {socials.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-text transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
