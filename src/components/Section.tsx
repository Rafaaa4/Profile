import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/animations/variants'

interface Props {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

/** Shared section shell: eyebrow label, heading, description, scroll-reveal on enter. */
export default function Section({ id, eyebrow, title, description, children, className = '' }: Props) {
  return (
    <motion.section
      id={id}
      className={`relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 ${className}`}
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={fadeUp} className="mb-12 max-w-2xl">
        {eyebrow && <p className="section-eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>}
      </motion.div>
      {children}
    </motion.section>
  )
}
