import type { Project, ProjectCategory } from '@/types'

interface GitHubRepoResponse {
  name: string
  full_name: string
  html_url: string
  description: string | null
  homepage: string | null
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
}

const defaultFallbackDescription =
  'This repository is currently sourced directly from GitHub so it stays synced with the public profile.'

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function deriveProjectCategory(
  language?: string | null,
  topics: string[] = []
): ProjectCategory {
  const haystack = `${language ?? ''} ${topics.join(' ')}`.toLowerCase()

  if (/flutter|dart|android|ios|mobile|app/i.test(haystack)) return 'Mobile'
  if (/linux|ubuntu|bash|shell|docker|systemd|ssh|devops|server|network/i.test(haystack))
    return 'Linux'
  if (/network|security|cyber|firewall|router|vpn|dns|packet/i.test(haystack)) return 'Networking'

  return 'Web'
}

export function createProjectFromGitHubRepo(repo: GitHubRepoResponse): Project {
  const title = repo.name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

  const tags = Array.from(
    new Set(
      [...(repo.topics ?? []).slice(0, 4), repo.language, 'GitHub'].filter(
        (tag): tag is string => Boolean(tag)
      )
    )
  ).slice(0, 6)

  const description = repo.description || defaultFallbackDescription

  return {
    slug: normalizeSlug(repo.name) || 'project',
    title,
    category: deriveProjectCategory(repo.language, repo.topics ?? []),
    tags,
    summary: description,
    description,
    challenges:
      'This project is pulled directly from GitHub, so the available repository metadata is used as the default profile description until a dedicated project page is added.',
    solution:
      'The project is kept in sync with GitHub automatically, which means publishing a new repository or updating an existing one refreshes the profile without a manual content edit.',
    architecture:
      repo.language
        ? `Built with ${repo.language} and published on GitHub for public access and iteration.`
        : 'Published on GitHub as an open project with versioned source code and project history.',
    github: repo.html_url,
    demo: repo.homepage || '',
    images: [],
  }
}

export async function fetchGitHubProjects(username: string): Promise<Project[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  )

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`)
  }

  const repos: GitHubRepoResponse[] = await response.json()

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .map(createProjectFromGitHubRepo)
    .slice(0, 12)
}

export async function fetchGitHubProjectBySlug(
  username: string,
  slug: string | undefined
): Promise<Project | null> {
  if (!slug) return null

  const repos = await fetchGitHubProjects(username)
  return repos.find((repo) => repo.slug === normalizeSlug(slug)) ?? null
}
