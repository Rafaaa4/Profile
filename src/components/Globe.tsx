import { motion } from 'framer-motion'

/**
 * A lightweight rotating "globe" built from layered SVG ellipses (meridians)
 * plus a slowly rotating dotted graticule — gives a 3D impression without
 * pulling in a WebGL dependency for a single decorative element.
 */
export default function Globe({ size = 220 }: { size?: number }) {
  const meridianCount = 6
  const meridians = Array.from({ length: meridianCount })

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size, perspective: 800 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue/20 via-neon-purple/10 to-transparent blur-2xl" />
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="100" cy="100" r="96" fill="rgba(63,198,255,0.03)" stroke="rgba(63,198,255,0.35)" />
        {meridians.map((_, i) => {
          const rx = 96 * Math.abs(Math.cos((i * Math.PI) / meridianCount))
          return (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx={Math.max(rx, 4)}
              ry="96"
              fill="none"
              stroke="rgba(139,92,246,0.35)"
              strokeWidth="0.75"
            />
          )
        })}
        {[-60, -30, 0, 30, 60].map((lat) => (
          <ellipse
            key={lat}
            cx="100"
            cy={100 - lat}
            rx={96 * Math.cos((lat * Math.PI) / 180)}
            ry={14}
            fill="none"
            stroke="rgba(34,211,166,0.3)"
            strokeWidth="0.6"
          />
        ))}
      </motion.svg>
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-neon-emerald shadow-glow-emerald"
        style={{ top: '38%', left: '54%' }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
    </div>
  )
}
