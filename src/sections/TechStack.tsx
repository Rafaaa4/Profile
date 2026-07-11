import { motion } from 'framer-motion'
import Section from '@/components/Section'
import SkillRing from '@/components/SkillRing'
import { fadeUp, staggerContainer } from '@/animations/variants'
import skills from '@/data/skills.json'
import type { SkillCategory } from '@/types'

const data = skills as SkillCategory[]

export default function TechStack() {
  return (
    <Section
      id="stack"
      eyebrow="Tech Stack"
      title="Tools I reach for"
      description="Proficiency here is self-rated and means 'comfortable in production,' not 'knows every flag.'"
    >
      <div className="space-y-12">
        {data.map((category) => (
          <div key={category.category}>
            <motion.h3 variants={fadeUp} className="mb-5 font-mono text-sm uppercase tracking-wider text-slate-500">
              {category.category}
            </motion.h3>
            <motion.div
              variants={staggerContainer(0.06)}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            >
              {category.items.map((item) => (
                <motion.div key={item.name} variants={fadeUp}>
                  <SkillRing name={item.name} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  )
}
