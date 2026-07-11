import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import profile from '@/data/profile.json'
import skills from '@/data/skills.json'
import projects from '@/data/projects.json'
import type { Profile, Project, SkillCategory } from '@/types'

const data = profile as Profile
const skillData = skills as SkillCategory[]
const projectData = projects as Project[]

type Line = { type: 'input' | 'output'; text: string }

const HELP_TEXT = [
  'Available commands:',
  '  whoami        show a short bio',
  '  neofetch      system-style summary',
  '  ls projects   list featured projects',
  '  cat skills.txt   print the tech stack',
  '  clear         clear the terminal',
  '  help          show this message',
]

function runCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase()

  if (cmd === 'whoami') {
    return [data.name.toLowerCase().replace(' ', '.'), data.tagline]
  }

  if (cmd === 'neofetch') {
    return [
      `${data.initials}@portfolio`,
      '-----------------',
      `OS: Ubuntu 24.04 LTS`,
      `Host: ${data.name}`,
      `Location: ${data.location}`,
      `Role: ${data.roles[0]}`,
      `Shell: zsh 5.9`,
      `Status: ${data.availability}`,
    ]
  }

  if (cmd === 'ls projects' || cmd === 'ls ./projects' || cmd === 'ls') {
    return projectData.map((p) => `${p.slug.padEnd(24, ' ')} [${p.category}]`)
  }

  if (cmd === 'cat skills.txt') {
    return skillData.flatMap((c) => [`# ${c.category}`, c.items.map((i) => i.name).join(', ')])
  }

  if (cmd === 'help') return HELP_TEXT
  if (cmd === '') return []

  return [`command not found: ${raw}`, 'type "help" to see available commands']
}

const INTRO: Line[] = [
  { type: 'output', text: `Welcome to ${data.name}'s terminal. Type "help" to get started.` },
]

export default function HeroTerminal() {
  const [lines, setLines] = useState<Line[]>(INTRO)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const submit = (raw: string) => {
    if (raw.trim().toLowerCase() === 'clear') {
      setLines([])
      return
    }
    const output = runCommand(raw)
    setLines((prev) => [
      ...prev,
      { type: 'input', text: raw },
      ...output.map((text) => ({ type: 'output' as const, text })),
    ])
    if (raw.trim()) setHistory((h) => [...h, raw])
    setHistoryIndex(null)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit(value)
      setValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setValue(history[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === null) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(null)
        setValue('')
      } else {
        setHistoryIndex(nextIndex)
        setValue(history[nextIndex])
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="glass gradient-border w-full max-w-xl overflow-hidden rounded-2xl shadow-glow"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <span className="terminal-dot bg-[#ff5f56]" />
        <span className="terminal-dot bg-[#ffbd2e]" />
        <span className="terminal-dot bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-slate-500">rafaa@portfolio: ~</span>
      </div>

      <div
        ref={scrollRef}
        className="h-72 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed sm:text-sm"
      >
        {lines.map((line, i) =>
          line.type === 'input' ? (
            <p key={i} className="text-slate-200">
              <span className="text-neon-emerald">➜</span>{' '}
              <span className="text-neon-blue">~</span> {line.text}
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap text-slate-400">
              {line.text}
            </p>
          )
        )}
        <div className="flex items-center gap-2">
          <span className="text-neon-emerald">➜</span>
          <span className="text-neon-blue">~</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
            className="flex-1 bg-transparent text-slate-100 outline-none"
          />
          <span className="h-4 w-2 animate-blink bg-neon-blue" />
        </div>
      </div>
    </motion.div>
  )
}
