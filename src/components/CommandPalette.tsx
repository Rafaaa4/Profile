import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiCpu,
  FiFolder,
  FiGithub,
  FiHome,
  FiMail,
  FiSearch,
  FiSmartphone,
  FiTerminal,
  FiWifi,
} from 'react-icons/fi'
import profile from '@/data/profile.json'
import type { Profile } from '@/types'

const data = profile as Profile

interface Command {
  id: string
  label: string
  hint?: string
  icon: typeof FiHome
  action: () => void
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const goTo = (hash: string) => {
    onClose()
    if (window.location.pathname !== '/') {
      navigate('/' + hash)
      return
    }
    setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 10)
  }

  const commands: Command[] = useMemo(
    () => [
      { id: 'home', label: 'Go to top', icon: FiHome, action: () => goTo('#top') },
      { id: 'about', label: 'About', icon: FiHome, action: () => goTo('#about') },
      { id: 'stack', label: 'Tech Stack', icon: FiCpu, action: () => goTo('#stack') },
      { id: 'projects', label: 'Featured Projects', icon: FiFolder, action: () => goTo('#projects') },
      { id: 'linux', label: 'Linux Lab', icon: FiTerminal, action: () => goTo('#linux-lab') },
      { id: 'network', label: 'Network Topology', icon: FiWifi, action: () => goTo('#network') },
      { id: 'mobile', label: 'Mobile Apps', icon: FiSmartphone, action: () => goTo('#mobile') },
      { id: 'github-section', label: 'GitHub Activity', icon: FiGithub, action: () => goTo('#github') },
      { id: 'contact', label: 'Contact', icon: FiMail, action: () => goTo('#contact') },
      {
        id: 'github',
        label: 'Open GitHub profile',
        hint: data.github.replace('https://', ''),
        icon: FiGithub,
        action: () => window.open(data.github, '_blank'),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-glow"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <FiSearch className="text-slate-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or link…"
                className="w-full bg-transparent font-mono text-sm text-slate-100 outline-none placeholder:text-slate-600"
              />
              <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                esc
              </kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-slate-500">No matches.</li>
              )}
              {filtered.map(({ id, label, hint, icon: Icon, action }) => (
                <li key={id}>
                  <button
                    onClick={action}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="text-neon-blue" />
                    <span>{label}</span>
                    {hint && <span className="ml-auto font-mono text-xs text-slate-600">{hint}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
