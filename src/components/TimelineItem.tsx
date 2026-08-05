import { useState } from 'react'
import { Building2, ChevronDown } from 'lucide-react'
import type { Experience } from '../lib/portfolio-data'
import ShineCard from './ShineCard'

type TimelineItemProps = {
  experience: Experience
  isLast?: boolean
}

export default function TimelineItem({ experience, isLast }: TimelineItemProps) {
  const [open, setOpen] = useState(false)
  const highlights = experience.highlights ?? []

  return (
    <div className="relative flex gap-6 pb-10">
      <div className="relative flex flex-col items-center">
        <span className="z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_oklch(0.62_0.21_281_/_0.2)]" />
        {!isLast && <span className="mt-1 w-px flex-1 bg-border" />}
      </div>

      <ShineCard className="flex-1 mb-2 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start justify-between gap-4 text-left"
          aria-expanded={open}
        >
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
              {experience.role}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
              <Building2 className="h-4 w-4 text-accent-2" aria-hidden="true" />
              <span>{experience.company}</span>
              <span aria-hidden="true">·</span>
              <span>{experience.period}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
              {experience.description}
            </p>
          </div>

          {highlights.length > 0 && (
            <ChevronDown
              className={`mt-1 h-5 w-5 shrink-0 text-accent-2 transition-transform duration-300 ${
                open ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          )}
        </button>

        {highlights.length > 0 && (
          <div
            className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1.05,0.3,1)]"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <ul className="mt-4 space-y-2 border-t border-border pt-4">
                {highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </ShineCard>
    </div>
  )
}
