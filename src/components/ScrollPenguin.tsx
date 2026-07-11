import { motion, useTransform, useScroll, useSpring } from 'framer-motion'

/** A small penguin that walks left-to-right as the page is scrolled — pure whimsy. */
export default function ScrollPenguin() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.3 })
  const x = useTransform(smooth, [0, 1], ['2vw', '92vw'])
  const bob = useTransform(smooth, (v) => Math.sin(v * 80) * 6)

  return (
    <motion.div
      className="pointer-events-none fixed bottom-4 z-40 hidden text-2xl md:block"
      style={{ left: x, y: bob }}
      aria-hidden="true"
    >
      🐧
    </motion.div>
  )
}
