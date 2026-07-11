import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCommand, FiMenu, FiX } from 'react-icons/fi'

const NAV_LINKS = [
  { label: 'About', hash: '#about' },
  { label: 'Stack', hash: '#stack' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Linux Lab', hash: '#linux-lab' },
  { label: 'Network', hash: '#network' },
  { label: 'Mobile', hash: '#mobile' },
  { label: 'GitHub', hash: '#github' },
  { label: 'Contact', hash: '#contact' },
]

interface Props {
  onOpenPalette: () => void
}

export default function Navbar({ onOpenPalette }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const goToSection = (hash: string) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/' + hash)
      return
    }
    const el = document.querySelector(hash)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'glass shadow-glow/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-lg font-semibold text-white">
          <span className="text-neon-blue">~/</span>
          <span className="text-gradient">rafaa-selmi</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.hash}>
              <button
                onClick={() => goToSection(link.hash)}
                className="rounded-full px-3.5 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-neon-blue/40 hover:text-white sm:flex"
          >
            <FiCommand />
            <span>{isMac ? '⌘' : 'Ctrl'} K</span>
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden glass lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.hash}>
                  <button
                    onClick={() => goToSection(link.hash)}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
