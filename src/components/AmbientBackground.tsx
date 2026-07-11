import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaDocker, FaGithub, FaLinux, FaReact } from 'react-icons/fa6'
import { SiFlutter } from 'react-icons/si'

const GLYPHS = '01{}<>/=;$#λπ'.split('')

/**
 * Very subtle "code rain" on a canvas, kept low-opacity and behind everything.
 * Pure decoration — disabled entirely for reduced-motion users.
 */
function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)
    const fontSize = 14
    let columns = Math.floor(width / fontSize)
    let drops = new Array(columns).fill(0)

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      columns = Math.floor(width / fontSize)
      drops = new Array(columns).fill(0)
    }
    window.addEventListener('resize', onResize)

    let frame: number
    let last = 0
    const draw = (t: number) => {
      frame = requestAnimationFrame(draw)
      if (t - last < 90) return
      last = t
      ctx.fillStyle = 'rgba(5,7,10,0.12)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      for (let i = 0; i < drops.length; i++) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ctx.fillStyle = 'rgba(63,198,255,0.18)'
        ctx.fillText(glyph, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="code-rain-mask absolute inset-0 h-full w-full opacity-40"
      aria-hidden="true"
    />
  )
}

const FLOATING_ICONS = [
  { Icon: FaReact, top: '12%', left: '8%', delay: 0, color: 'text-neon-blue' },
  { Icon: SiFlutter, top: '68%', left: '5%', delay: 1.2, color: 'text-neon-emerald' },
  { Icon: FaDocker, top: '20%', left: '92%', delay: 0.6, color: 'text-neon-blue' },
  { Icon: FaGithub, top: '78%', left: '90%', delay: 1.8, color: 'text-slate-400' },
  { Icon: FaLinux, top: '45%', left: '95%', delay: 0.9, color: 'text-neon-purple' },
]

function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {FLOATING_ICONS.map(({ Icon, top, left, delay, color }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color} opacity-20`}
          style={{ top, left }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={34} />
        </motion.div>
      ))}
    </div>
  )
}

/** Gradient blobs used behind the hero, animated slowly in a loop. */
function GradientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-32 left-1/4 h-96 w-96 animate-blob rounded-full bg-neon-blue/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-20 h-96 w-96 animate-blob rounded-full bg-neon-purple/20 blur-[120px] [animation-delay:4s]" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-blob rounded-full bg-neon-emerald/10 blur-[120px] [animation-delay:8s]" />
    </div>
  )
}

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <GradientBlobs />
      <CodeRain />
      <FloatingIcons />
    </div>
  )
}
