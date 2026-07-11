import { motion } from 'framer-motion'
import { FiGithub, FiGlobe, FiLinkedin, FiMail } from 'react-icons/fi'
import profile from '@/data/profile.json'
import type { Profile } from '@/types'

const data = profile as Profile

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-slate-500"
        >
          © {new Date().getFullYear()} {data.name}. 
        </motion.p>

        <div className="flex items-center gap-4 text-slate-400">
          <a
            href={data.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-neon-blue"
          >
            <FiGithub size={18} />
          </a>
          {data.behance && (
            <a
              href={data.behance}
              target="_blank"
              rel="noreferrer"
              aria-label="Behance"
              className="transition-colors hover:text-neon-blue"
            >
              <FiGlobe size={18} />
            </a>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-neon-blue"
            >
              <FiLinkedin size={18} />
            </a>
          )}
          <a
            href={`mailto:${data.email}`}
            aria-label="Email"
            className="transition-colors hover:text-neon-blue"
          >
            <FiMail size={18} />
          </a>
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[11px] text-slate-600">
        $ echo &quot;thanks for scrolling all the way down&quot;
      </p>
    </footer>
  )
}
