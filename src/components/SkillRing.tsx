import { motion } from 'framer-motion'

interface Props {
  name: string
}

export default function SkillRing({ name }: Props) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass card-hover-depth w-full rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-neon-blue/40 hover:bg-neon-blue/10 hover:text-white"
    >
      <span className="flex items-center justify-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-emerald" />
        <span>{name}</span>
      </span>
    </motion.button>
  )
}
