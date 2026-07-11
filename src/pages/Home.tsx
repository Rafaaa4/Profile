import Hero from '@/sections/Hero'
import About from '@/sections/About'
import TechStack from '@/sections/TechStack'
import Projects from '@/sections/Projects'
import LinuxLab from '@/sections/LinuxLab'
import NetworkSection from '@/sections/NetworkSection'
import MobileApps from '@/sections/MobileApps'
import GithubSection from '@/sections/GithubSection'
import Contact from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <LinuxLab />
      <NetworkSection />
      <MobileApps />
      <GithubSection />
      <Contact />
    </>
  )
}
