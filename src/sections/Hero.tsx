import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { fadeUp, staggerContainer } from '@/animations/variants'
import HeroTerminal from '@/components/HeroTerminal'
import AmbientBackground from '@/components/AmbientBackground'
import profile from '@/data/profile.json'
import type { Profile } from '@/types'

const data = profile as Profile

export default function Hero() {
  const typed = useTypingEffect(data.roles, { pauseTime: 1600 })

  return (
    <section id="top" className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden">
      <AmbientBackground />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-32 pb-20 lg:grid-cols-2 lg:pt-24">
        <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="section-eyebrow mb-4">
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
          >
            {data.name}
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-4 h-9 font-mono text-lg text-neon-blue sm:text-xl">
            {typed}
            <span className="animate-blink">|</span>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-slate-400">
            {data.summary}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`${import.meta.env.BASE_URL}${data.resumeUrl}`}
              download
              className="glass flex items-center gap-2 rounded-full border border-neon-blue/30 px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <FiDownload /> Download CV
            </a>
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              View Projects <FiArrowRight />
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 font-mono text-xs text-slate-600">
            {data.availability} · {data.location}
          </motion.p>
        </motion.div>

        <div className="flex justify-center lg:justify-end">
          <HeroTerminal />
        </div>
      </div>
    </section>
  )
}
