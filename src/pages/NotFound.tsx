import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-sm text-neon-blue"
      >
        bash: cd: 404: No such directory
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-4 text-4xl font-bold text-white"
      >
        Page not found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-3 max-w-sm text-sm text-slate-400"
      >
        Whatever you were looking for isn&apos;t at this path. Let&apos;s get you back home.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 text-sm font-medium text-white shadow-glow"
        >
          <FiArrowLeft /> Back to home
        </Link>
      </motion.div>
    </div>
  )
}
