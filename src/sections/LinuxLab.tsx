import { motion } from 'framer-motion'
import { FiTerminal } from 'react-icons/fi'
import Section from '@/components/Section'
import { fadeUp, staggerContainer } from '@/animations/variants'
import linuxLab from '@/data/linuxLab.json'
import type { LinuxLabItem } from '@/types'

const data = linuxLab as LinuxLabItem[]

export default function LinuxLab() {
  return (
    <Section
      id="linux-lab"
      eyebrow="Linux Lab"
      title="Where I actually spend most of my time"
      description="Real commands from real boxes I administer — shell scripting, permissions, systemd, and enough SSH sessions to have opinions about all of it."
    >
      <motion.div
        variants={staggerContainer(0.08)}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {data.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="glass card-hover-depth overflow-hidden rounded-xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
              <FiTerminal className="text-neon-emerald" size={14} />
              <span className="font-mono text-xs text-slate-400">{item.title}</span>
            </div>
            <div className="space-y-1 px-4 py-4 font-mono text-[12px] leading-relaxed">
              <p className="text-neon-blue">{item.prompt}</p>
              {item.output.map((line, i) => (
                <p key={i} className="text-slate-500">
                  {line}
                </p>
              ))}
            </div>
            <p className="border-t border-white/5 px-4 py-3 text-sm text-slate-400">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
