import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowUpRight, FiGithub } from 'react-icons/fi'
import projects from '@/data/projects.json'
import type { Project } from '@/types'
import { fadeUp, staggerContainer } from '@/animations/variants'
import NotFound from './NotFound'

const data = projects as Project[]

const CATEGORY_GRADIENT: Record<Project['category'], string> = {
  Web: 'from-neon-blue/25 via-transparent to-transparent',
  Mobile: 'from-neon-emerald/25 via-transparent to-transparent',
  Linux: 'from-neon-purple/25 via-transparent to-transparent',
  Networking: 'from-neon-blue/20 via-neon-purple/15 to-transparent',
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = data.find((p) => p.slug === slug)

  if (!project) return <NotFound />

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-4xl px-6 pb-24 pt-32"
    >
      <Link
        to="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <FiArrowLeft /> Back to projects
      </Link>

      <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="show">
        <motion.p variants={fadeUp} className="section-eyebrow mb-3">
          {project.category}
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl">
          {project.title}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
          {project.summary}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:-translate-y-0.5"
          >
            <FiGithub /> Repository
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <FiArrowUpRight /> Live demo
            </a>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.images.map((img) => (
            <div
              key={img}
              className={`gradient-border relative flex h-36 items-end overflow-hidden rounded-xl bg-gradient-to-br p-3 ${CATEGORY_GRADIENT[project.category]} bg-surface`}
            >
              <span className="font-mono text-xs text-slate-300">{img}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 space-y-10">
          <motion.section variants={fadeUp}>
            <h2 className="mb-3 text-lg font-semibold text-white">Overview</h2>
            <p className="leading-relaxed text-slate-400">{project.description}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="mb-3 text-lg font-semibold text-white">The challenge</h2>
            <p className="leading-relaxed text-slate-400">{project.challenges}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="mb-3 text-lg font-semibold text-white">The solution</h2>
            <p className="leading-relaxed text-slate-400">{project.solution}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="mb-3 text-lg font-semibold text-white">Architecture</h2>
            <p className="leading-relaxed text-slate-400">{project.architecture}</p>
          </motion.section>
        </div>
      </motion.div>
    </motion.article>
  )
}
