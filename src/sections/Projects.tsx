import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import { staggerContainer } from '@/animations/variants'
import projects from '@/data/projects.json'
import type { Project, ProjectCategory } from '@/types'

const data = projects as Project[]
const CATEGORIES: Array<ProjectCategory | 'All'> = ['All', 'Web', 'Mobile', 'Linux', 'Networking']

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All')

  const visible = useMemo(
    () => (filter === 'All' ? data : data.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Things I've built and kept running"
      description="A mix of web tools, a Flutter app, and a couple of things that live closer to the metal."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === cat
                ? 'border-neon-blue/50 bg-neon-blue/10 text-white'
                : 'border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        key={filter}
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </Section>
  )
}
