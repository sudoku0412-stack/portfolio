import type { MouseEvent, ReactNode } from 'react'

type ShineCardProps = {
  children: ReactNode
  className?: string
}

export default function ShineCard({ children, className = '' }: ShineCardProps) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`shine-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] ${className}`}
    >
      {children}
    </div>
  )
}
