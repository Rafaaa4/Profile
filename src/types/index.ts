export interface Profile {
  name: string
  initials: string
  roles: string[]
  tagline: string
  summary: string
  location: string
  email: string
  whatsapp: string
  github: string
  githubUsername: string
  behance?: string
  linkedin: string
  resumeUrl: string
  availability: string
}

export interface TimelineItem {
  year: string
  title: string
  description: string
}

export interface SkillItem {
  name: string
  level?: number
}

export interface SkillCategory {
  category: string
  items: SkillItem[]
}

export type ProjectCategory = 'Web' | 'Mobile' | 'Linux' | 'Networking'

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  tags: string[]
  summary: string
  description: string
  challenges: string
  solution: string
  architecture: string
  github: string
  demo: string
  images: string[]
}

export interface LinuxLabItem {
  id: string
  title: string
  prompt: string
  output: string[]
  description: string
}

export type NetworkNodeType = 'client' | 'switch' | 'firewall' | 'router' | 'server'

export interface NetworkNode {
  id: string
  label: string
  type: NetworkNodeType
  x: number
  y: number
}

export interface NetworkLink {
  from: string
  to: string
}

export interface NetworkTopologyData {
  nodes: NetworkNode[]
  links: NetworkLink[]
  legend: { type: NetworkNodeType; label: string; detail: string }[]
}

export interface MobileAppScreen {
  label: string
  accent: 'blue' | 'purple' | 'emerald'
}

export interface MobileApp {
  name: string
  tagline: string
  platform: string
  screens: MobileAppScreen[]
  github: string
}
