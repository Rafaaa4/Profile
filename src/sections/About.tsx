import { motion } from 'framer-motion'
import Section from '@/components/Section'
import { fadeUp } from '@/animations/variants'
import timeline from '@/data/timeline.json'
import type { TimelineItem } from '@/types'

const data = timeline as TimelineItem[]

const PASSIONS = ['Linux', 'Networking', 'Operating Systems', 'Web Development', 'Mobile Development', 'Cyber Security']

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Who I am"
      description="A systems-first developer: I care as much about how software runs as how it looks. Below is the path that got me here, in order — it's a real timeline, so the order matters."
    >
      <div className="mb-12 flex flex-wrap gap-2">
        {PASSIONS.map((p) => (
          <motion.span
            key={p}
            variants={fadeUp}
            className="glass rounded-full px-4 py-1.5 text-sm text-slate-300"
          >
            {p}
          </motion.span>
        ))}
      </div>

      <div className="relative border-l border-white/10 pl-8">
        {data.map((item, i) => (
          <motion.div key={item.year} variants={fadeUp} className="relative mb-10 last:mb-0">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-neon-blue shadow-glow" />
            <p className="font-mono text-xs text-neon-blue">{item.year}</p>
            <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{item.description}</p>
            {i !== data.length - 1 && <div className="mt-8 h-px w-full bg-white/5" />}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
