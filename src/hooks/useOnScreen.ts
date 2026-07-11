import { useEffect, useRef, useState } from 'react'

/** Tracks whether an element has entered the viewport (used for scroll reveal). */
export function useOnScreen<T extends HTMLElement>(rootMargin = '-80px') {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, visible }
}
