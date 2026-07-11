import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CursorSpotlight from '@/components/CursorSpotlight'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import ScrollPenguin from '@/components/ScrollPenguin'
import CommandPalette from '@/components/CommandPalette'
import LoadingScreen from '@/components/LoadingScreen'
import Home from '@/pages/Home'
import ProjectDetail from '@/pages/ProjectDetail'
import NotFound from '@/pages/NotFound'
import { pageTransition } from '@/animations/variants'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition}>
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <motion.div {...pageTransition}>
              <ProjectDetail />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div {...pageTransition}>
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Global Cmd/Ctrl+K hotkey for the command palette.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <HashRouter>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <CursorSpotlight />
      <ScrollProgressBar />
      <ScrollPenguin />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </HashRouter>
  )
}
