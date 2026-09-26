import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = { title: 'Music' }

function SpotifyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-7 h-7 shrink-0 transition-transform hover:scale-110"
      fill="#1DB954"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

const bands = [
  {
    name: 'The Short Term',
    description:
      "A punk-influenced indie rock band, The Short Term was my first Boston-based project. In addition to playing bass and creating album art, I recorded much of our EP at my home studio. It's one of the projects I'm most proud of.",
    spotify: 'https://open.spotify.com/album/5gaSZQzYvLm31AQ3IarDXK?si=eMcWCowVTc2mwL7gX9LdEg',
  },
  {
    name: 'Vayden',
    description:
      'Nu-metal band with classic rock influences and driving energy. We toured nationally and internationally while signed to Silent Majority Group, opening for Candlebox, Tantric and Drowning Pool.',
    spotify: 'https://open.spotify.com/album/0xsT0ZeMrSMW2xTyeBp7j9?si=ZOpw_wKjQImaFE-A-60lyQ',
  },
  {
    name: 'Halocene',
    description:
      'Girl-fronted, high-energy pop rock band. Being close friends with the Halocene gang, I played with these hometown heroes on many occasions (including as the opening act for Blink 182!).',
    spotify: 'https://open.spotify.com/album/64hpAt4LCzIfiAHLdWsDt5?si=EEZDClKRRV6YcLG6LdayUw',
  },
  {
    name: 'Housmans Athletes',
    description:
      'A party rock band (though we preferred the term "hardcore pop") influenced equally by metal and country. Shared the festival stage with Rise Against, Alkaline Trio, NOFX and Flogging Molly.',
    spotify: 'https://open.spotify.com/album/3cH8b9TjJKPbA9ZI5MWOut?si=gk1V_BQWSZi6u8yGaWMv-w',
  },
]

// Banner height: 320px
// clip-path cuts diagonally: bottom-right at 68%, bottom-left at 100%
// At horizontal center (50%): cut height = 84% × 320 = 269px
// Avatar (160px / radius 80px) centered on that cut line → top: 189px
const BANNER_HEIGHT = 320
const CUT_AT_CENTER_PX = Math.round(0.84 * BANNER_HEIGHT) // 269
const AVATAR_RADIUS = 80
const AVATAR_TOP = CUT_AT_CENTER_PX - AVATAR_RADIUS // 189

export default function MusicPage() {
  return (
    <div>
      {/* Full-bleed hero banner */}
      <div className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: `${BANNER_HEIGHT}px`,
            clipPath: 'polygon(0 0, 100% 0, 100% 68%, 0 100%)',
          }}
        >
          <Image
            src="/bass_banner.png"
            alt="Bass guitar on stage"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Avatar centered on the diagonal cut line */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${AVATAR_TOP}px` }}
        >
          <div className="w-[160px] h-[160px] rounded-full overflow-hidden border-[5px] border-bg">
            <Image
              src="/avatar.jpg"
              alt="Mike Kazmer"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="mt-16 max-w-5xl mx-auto px-6 pb-24 text-center">
        <p className="text-lg font-semibold max-w-2xl mx-auto">
          I&apos;ve been lucky enough to play in many bands over the years and here are a few of my favorites.
        </p>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {bands.map((band) => (
            <li key={band.name} className="bg-surface border border-border rounded-md p-4">
              <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-border min-h-[72px]">
                <h3 className="text-base font-bold">{band.name}</h3>
                <a
                  href={band.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${band.name} on Spotify`}
                >
                  <SpotifyIcon />
                </a>
              </div>
              <p className="text-sm text-text-muted text-center">{band.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
