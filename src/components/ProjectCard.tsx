import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import type { Project } from '@/types'
import { fadeUp } from '@/animations/variants'

const CATEGORY_ACCENT: Record<Project['category'], string> = {
  Web: 'from-neon-blue/30 to-transparent',
  Mobile: 'from-neon-emerald/30 to-transparent',
  Linux: 'from-neon-purple/30 to-transparent',
  Networking: 'from-neon-blue/30 via-neon-purple/20 to-transparent',
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article variants={fadeUp} className="group relative">
      <div className="gradient-border card-hover-depth glass relative flex h-full flex-col overflow-hidden rounded-2xl">
        <Link to={`/projects/${project.slug}`} className="block">
          <div
            className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${
              CATEGORY_ACCENT[project.category]
            } bg-surface`}
          >
            <span className="font-mono text-4xl font-bold text-white/10 transition-transform duration-500 group-hover:scale-110">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
            <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-slate-300">
              {project.category}
            </span>
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <Link to={`/projects/${project.slug}`}>
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-neon-blue">
              {project.title}
            </h3>
          </Link>
          <p className="flex-1 text-sm leading-relaxed text-slate-400">{project.summary}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-3 border-t border-white/5 pt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-300 transition-colors hover:text-neon-blue"
            >
              <FiGithub /> Code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 transition-colors hover:text-neon-emerald"
              >
                <FiArrowUpRight /> Live demo
              </a>
            )}
            <Link
              to={`/projects/${project.slug}`}
              className="ml-auto text-xs font-medium text-neon-purple transition-colors hover:text-white"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
