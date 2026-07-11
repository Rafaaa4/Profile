import { motion } from 'framer-motion'
import { FiGithub } from 'react-icons/fi'
import Section from '@/components/Section'
import { fadeUp, staggerContainer } from '@/animations/variants'
import mobileApps from '@/data/mobileApps.json'
import type { MobileApp } from '@/types'

const data = mobileApps as MobileApp[]

const ACCENT_CLASS: Record<MobileApp['screens'][number]['accent'], string> = {
  blue: 'from-neon-blue/40 to-neon-blue/5',
  purple: 'from-neon-purple/40 to-neon-purple/5',
  emerald: 'from-neon-emerald/40 to-neon-emerald/5',
}

export default function MobileApps() {
  return (
    <Section
      id="mobile"
      eyebrow="Mobile"
      title="Flutter, in the field"
      description="Apps built for people who don't always have signal — offline-first by default."
    >
      <motion.div variants={staggerContainer(0.15)} className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {data.map((app) => (
          <motion.div key={app.name} variants={fadeUp} className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="flex shrink-0 -space-x-10">
              {app.screens.map((screen, i) => (
                <motion.div
                  key={screen.label}
                  initial={{ opacity: 0, y: 30, rotate: (i - 1) * 6 }}
                  whileInView={{ opacity: 1, y: 0, rotate: (i - 1) * 6 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10, rotate: 0, zIndex: 10 }}
                  className="relative h-56 w-28 rounded-[1.4rem] border-4 border-white/10 bg-surface shadow-xl"
                  style={{ zIndex: i }}
                >
                  <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-black/60" />
                  <div
                    className={`h-full w-full rounded-[1rem] bg-gradient-to-br ${ACCENT_CLASS[screen.accent]} p-3`}
                  >
                    <p className="font-mono text-[10px] text-white/70">{screen.label}</p>
                    <div className="mt-3 space-y-1.5">
                      <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
                      <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                      <div className="h-10 w-full rounded-md bg-white/10" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">{app.name}</h3>
              <p className="mt-1 font-mono text-xs text-neon-emerald">{app.platform}</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">{app.tagline}</p>
              <a
                href={app.github}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-300 transition-colors hover:text-neon-blue"
              >
                <FiGithub /> View source
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
