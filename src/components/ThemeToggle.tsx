import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '@/hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:border-neon-blue/40 hover:text-white"
    >
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  )
}
