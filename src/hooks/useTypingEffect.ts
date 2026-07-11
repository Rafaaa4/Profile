import { useEffect, useState } from 'react'

interface Options {
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
}

/**
 * Cycles through a list of words with a typewriter + backspace effect.
 * Respects prefers-reduced-motion by freezing on the first word.
 */
export function useTypingEffect(words: string[], options: Options = {}) {
  const { typingSpeed = 70, deletingSpeed = 40, pauseTime = 1400 } = options
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (reducedMotion) {
      setText(words[0] ?? '')
      return
    }
    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            isDeleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
          )
        },
        isDeleting ? deletingSpeed : typingSpeed
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime, reducedMotion])

  return text
}
