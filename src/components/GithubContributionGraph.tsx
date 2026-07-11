import { motion } from 'framer-motion'
import profile from '@/data/profile.json'
import type { Profile } from '@/types'

const data = profile as Profile

/**
 * Renders the public ghchart.rshah.org contribution-graph SVG for the
 * profile's GitHub username — real contribution data, no auth/token needed.
 */
export default function GithubContributionGraph() {
  const src = `https://ghchart.rshah.org/3fc6ff/${data.githubUsername}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass overflow-x-auto rounded-xl p-5"
    >
      <p className="mb-3 font-mono text-xs text-slate-500">
        contributions · github.com/{data.githubUsername}
      </p>
      <img
        src={src}
        alt={`GitHub contribution graph for ${data.githubUsername}`}
        className="min-w-[600px]"
        loading="lazy"
      />
    </motion.div>
  )
}
