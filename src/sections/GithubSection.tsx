import Section from '@/components/Section'
import GithubStats from '@/components/GithubStats'
import GithubContributionGraph from '@/components/GithubContributionGraph'

export default function GithubSection() {
  return (
    <Section
      id="github"
      eyebrow="Open Source"
      title="Live from GitHub"
      description="Pulled straight from the GitHub API at page load — no cached numbers."
    >
      <div className="space-y-6">
        <GithubStats />
        <GithubContributionGraph />
      </div>
    </Section>
  )
}
