import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const BOOT_LINES = [
  '[  OK  ] Started Load Kernel Modules',
  '[  OK  ] Mounted /home/portfolio',
  '[  OK  ] Reached target Network',
  '[  OK  ] Started OpenSSH Daemon',
  '[  OK  ] Started React Application Server',
  'Ubuntu 24.04 LTS · amine-portfolio tty1',
]

interface Props {
  onFinish: () => void
}

/** A brief Ubuntu-boot-styled loading sequence shown once per session. */
export default function LoadingScreen({ onFinish }: Props) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onFinish()
      return
    }

    const lineTimer = setInterval(() => {
      setVisibleLines((v) => Math.min(v + 1, BOOT_LINES.length))
    }, 220)

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 4, 100))
    }, 45)

    const finishTimer = setTimeout(onFinish, 1700)

    return () => {
      clearInterval(lineTimer)
      clearInterval(progressTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
      >
        <div className="w-[min(90vw,480px)] font-mono text-sm">
          <div className="mb-4 flex items-center gap-2 text-neon-emerald">
            <span className="text-lg">●</span>
            <span>Ubuntu 24.04 LTS</span>
          </div>
          <div className="space-y-1 text-slate-400">
            {BOOT_LINES.slice(0, visibleLines).map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {line.startsWith('[  OK  ]') ? (
                  <>
                    <span className="text-neon-emerald">[  OK  ]</span>
                    {line.replace('[  OK  ]', '')}
                  </>
                ) : (
                  line
                )}
              </motion.p>
            ))}
          </div>
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-emerald"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
