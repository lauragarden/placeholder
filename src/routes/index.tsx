import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [phase, setPhase] = useState<'idle' | 'poof' | 'gone'>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleClick = () => {
    if (phase === 'idle') {
      if (!audioRef.current) {
        audioRef.current = new Audio('/poof.mp3')
      }
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setPhase('poof')
      setTimeout(() => setPhase('gone'), 500)
      setTimeout(() => setPhase('idle'), 1800)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-[#FDFBF7] overflow-hidden">
      <div className="text-center space-y-7">
        <button
          onClick={handleClick}
          className="cursor-pointer"
          type="button"
          disabled={phase !== 'idle'}
        >
          <h1
            className={`text-5xl md:text-7xl font-serif font-bold tracking-tight leading-none transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              phase === 'idle'
                ? 'scale-100 opacity-100 rotate-0 text-[#44403c] hover:text-[#3A5A40]'
                : phase === 'poof'
                  ? 'scale-[2.5] opacity-0 rotate-12 text-[#3A5A40]'
                  : 'scale-0 opacity-0'
            }`}
          >
            Laura Thiel
          </h1>
        </button>

        <div className="h-8 flex items-center justify-center">
          <div
            className={`flex items-center justify-center gap-3 transition-all duration-500 ${
              phase === 'gone' ? 'opacity-100 scale-100' : phase === 'poof' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
            }`}
          >
            <span className={`block w-6 h-px bg-[#3A5A40] transition-all duration-500 ${phase === 'gone' ? 'w-12' : ''}`} />
            <span className="text-sm font-serif italic text-[#78716c] transition-all duration-300">
              {phase === 'idle' ? 'Coming Soon' : phase === 'poof' ? '•' : 'poof'}
            </span>
            <span className={`block w-6 h-px bg-[#3A5A40] transition-all duration-500 ${phase === 'gone' ? 'w-12' : ''}`} />
          </div>
        </div>

        {phase !== 'idle' && (
          <div
            className={`transition-all duration-500 ${
              phase === 'gone' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <p className="text-[10px] text-[#a8a29e] font-sans tracking-[0.15em] uppercase">
              {phase === 'poof' ? '•' : 'try again'}
            </p>
          </div>
        )}
      </div>

      {/* Floating particles */}
      {phase === 'poof' && (
        <div className="absolute inset-0 pointer-events-none">
          {[
            { left: '45%', top: '42%' },
            { left: '50%', top: '45%' },
            { left: '42%', top: '48%' },
            { left: '55%', top: '44%' },
            { left: '48%', top: '40%' },
            { left: '52%', top: '50%' },
            { left: '44%', top: '52%' },
            { left: '56%', top: '46%' },
          ].map((pos, i) => (
            <span
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#3A5A40]/30 rounded-full"
              style={{
                left: pos.left,
                top: pos.top,
                animation: `particle-${i} 0.7s ease-out forwards`,
              }}
            />
          ))}
        </div>
      )}

      <p className="absolute bottom-8 text-xs text-[#a8a29e] tracking-[0.15em] uppercase font-sans">
        <a
          href="https://laura.garden"
          target="_blank"
          rel="noreferrer"
          className="hover:underline decoration-1 underline-offset-2 decoration-[#a8a29e] hover:text-[#3A5A40] transition-colors"
        >
          laura.garden
        </a>
        &nbsp;&nbsp;&bull;&nbsp;&nbsp;
        &copy; {new Date().getFullYear()}
      </p>
    </div>
  )
}
