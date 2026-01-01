"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0, triggerOnce = false, rootMargin = "0px" } = options
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold, triggerOnce, rootMargin])

  return { ref, inView }
}
