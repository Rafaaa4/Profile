import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGitBranch, FiStar, FiUsers } from 'react-icons/fi'
import profile from '@/data/profile.json'
import type { Profile } from '@/types'

const data = profile as Profile

interface GithubUser {
  public_repos: number
  followers: number
  html_url: string
}

interface RepoSummary {
  stargazers_count: number
}

/**
 * Fetches live public GitHub data for the profile's username. Fails silently
 * to a quiet placeholder state if the API is unreachable or rate-limited —
 * this is decorative, not critical path.
 */
export default function GithubStats() {
  const [user, setUser] = useState<GithubUser | null>(null)
  const [totalStars, setTotalStars] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${data.githubUsername}`)
        if (!userRes.ok) throw new Error('user fetch failed')
        const userJson: GithubUser = await userRes.json()

        const reposRes = await fetch(
          `https://api.github.com/users/${data.githubUsername}/repos?per_page=100`
        )
        const repos: RepoSummary[] = reposRes.ok ? await reposRes.json() : []
        const stars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0

        if (!cancelled) {
          setUser(userJson)
          setTotalStars(stars)
        }
      } catch {
        if (!cancelled) setError(true)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const stats = [
    { icon: FiGitBranch, label: 'Public repos', value: user?.public_repos },
    { icon: FiStar, label: 'Stars earned', value: totalStars },
    { icon: FiUsers, label: 'Followers', value: user?.followers },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map(({ icon: Icon, label, value }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="glass card-hover-depth rounded-xl p-5"
        >
          <Icon className="mb-3 text-neon-blue" size={20} />
          <p className="font-mono text-2xl font-semibold text-white">
            {error ? '—' : value ?? '···'}
          </p>
          <p className="mt-1 text-xs text-slate-500">{label}</p>
        </motion.div>
      ))}
    </div>
  )
}
