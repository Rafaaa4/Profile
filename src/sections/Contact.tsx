import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import Section from '@/components/Section'
import { fadeUp } from '@/animations/variants'
import profile from '@/data/profile.json'
import type { Profile } from '@/types'

const data = profile as Profile

type ContactLink = {
  label: string
  value: string
  href?: string
  icon: IconType
}

const CONTACT_LINKS: ContactLink[] = [
  { label: 'GitHub', value: data.github.replace('https://', ''), href: data.github, icon: FiGithub },
  data.behance
    ? { label: 'Behance', value: data.behance.replace('https://', ''), href: data.behance, icon: FiGlobe }
    : null,
  data.linkedin
    ? { label: 'LinkedIn', value: data.linkedin.replace('https://', ''), href: data.linkedin, icon: FiLinkedin }
    : null,
  { label: 'Email', value: data.email, href: `mailto:${data.email}`, icon: FiMail },
  {
    label: 'WhatsApp',
    value: data.whatsapp,
    href: `https://wa.me/${data.whatsapp.replace(/\D/g, '')}`,
    icon: FaWhatsapp,
  },
  { label: 'Location', value: data.location, href: undefined, icon: FiMapPin },
].filter((link): link is ContactLink => Boolean(link))

type Status = 'idle' | 'sending' | 'sent'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Frontend-only: this portfolio has no backend. Wire this handler up to
    // a form service (Formspree, Getform, EmailJS) or a serverless function
    // when you're ready to receive real messages.
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 900)
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk shop"
      description="Whether it's a frontend build, a Flutter app, or a network that needs a second pair of eyes — reach out."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <motion.div variants={fadeUp} className="space-y-3">
          {CONTACT_LINKS.map(({ label, value, href, icon: Icon }) => {
            const content = (
              <>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5 text-neon-blue">
                  <Icon size={16} />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">{label}</span>
                  <span className="block text-sm text-slate-200">{value}</span>
                </span>
              </>
            )
            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="glass card-hover-depth flex items-center gap-4 rounded-xl px-4 py-3"
              >
                {content}
              </a>
            ) : (
              <div key={label} className="glass flex items-center gap-4 rounded-xl px-4 py-3">
                {content}
              </div>
            )
          })}
        </motion.div>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="glass space-y-4 rounded-2xl p-6"
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs text-slate-400">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-neon-blue/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs text-slate-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-neon-blue/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs text-slate-400">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-neon-blue/50"
              placeholder="What are you building?"
            />
          </div>
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-3 text-sm font-medium text-white shadow-glow transition-opacity disabled:opacity-70"
          >
            {status === 'idle' && (
              <>
                <FiSend /> Send message
              </>
            )}
            {status === 'sending' && 'Sending…'}
            {status === 'sent' && 'Message queued ✓'}
          </button>
          {status === 'sent' && (
            <p className="text-center text-xs text-slate-500">
              This is a frontend-only demo form — connect it to Formspree, Getform, or a serverless
              function to actually deliver messages.
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  )
}
