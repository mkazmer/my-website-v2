export default function HomePage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 md:py-36">
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
      <p className="text-xl text-text-muted max-w-lg mt-6">
        Building thoughtful web experiences and melodic bass lines.
      </p>
    </section>
  )
}
