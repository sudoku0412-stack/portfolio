import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from 'react'

type Variant = 'up' | 'scale' | 'left' | 'right'

type RevealProps = {
  children: ReactNode
  variant?: Variant
  delay?: number
  className?: string
  as?: ElementType
}

const hiddenTransform: Record<Variant, string> = {
  up: 'translateY(80px) scale(0.94) rotate(-1.5deg)',
  scale: 'translateY(0) scale(0.85) rotate(0deg)',
  left: 'translateX(-90px) scale(0.94) rotate(-2deg)',
  right: 'translateX(90px) scale(0.94) rotate(2deg)',
}

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className = '',
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const style: CSSProperties = visible
    ? {
        opacity: 1,
        transform: 'none',
        filter: 'blur(0px)',
        transitionDelay: `${delay}ms`,
      }
    : {
        opacity: 0,
        transform: hiddenTransform[variant],
        filter: 'blur(12px)',
        transitionDelay: `${delay}ms`,
      }

  const Tag = as as any

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: '0.9s',
        transitionTimingFunction: 'cubic-bezier(0.16, 1.05, 0.3, 1)',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
