import { useMousePosition } from '@/hooks/useMousePosition'

/**
 * A soft radial glow that follows the cursor, sitting behind all content.
 * Pointer-events are disabled so it never intercepts clicks.
 */
export default function CursorSpotlight() {
  const { x, y } = useMousePosition()

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      aria-hidden="true"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(63,198,255,0.06), transparent 40%)`,
      }}
    />
  )
}
