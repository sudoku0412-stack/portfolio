import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { ChevronDown, Plus, Trash2, ArrowLeft, RotateCcw } from 'lucide-react'
import { usePortfolioData, defaultData, type PortfolioData } from '../lib/portfolio-data'

const inputClass =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent'
const labelClass = 'mb-1.5 block text-sm font-medium text-muted'
const sectionClass = 'rounded-2xl border border-border bg-surface p-6'

function Section({
  title,
  action,
  defaultOpen = true,
  children,
}: {
  title: string
  action?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className={sectionClass}>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 font-heading text-xl font-semibold"
          aria-expanded={open}
        >
          <ChevronDown
            className={`h-5 w-5 text-muted transition-transform duration-300 ${open ? '' : '-rotate-90'}`}
            aria-hidden="true"
          />
          {title}
        </button>
        {action}
      </div>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1.05,0.3,1)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  )
}

function DateField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <input
      ref={ref}
      type="date"
      className={inputClass}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={() => ref.current?.showPicker?.()}
      onFocus={() => ref.current?.showPicker?.()}
    />
  )
}

export default function Admin() {
  const { data, update, reset } = usePortfolioData()
  const [form, setForm] = useState<PortfolioData>(data)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    update(form)
    toast.success('Portfolio updated')
  }

  const handleReset = () => {
    reset()
    setForm(defaultData)
    toast('Reset to defaults')
  }

  const set = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  return (
    <div className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              to="/"
              className="story-link inline-flex items-center gap-1.5 text-sm text-muted"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to site
            </Link>
            <h1 className="mt-3 font-heading text-3xl font-bold">Content Editor</h1>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset to defaults
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Section title="Basics">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Role</label>
                <input
                  className={inputClass}
                  value={form.role}
                  onChange={(e) => set('role', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => set('location', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Apps section title</label>
                <input
                  className={inputClass}
                  value={form.appsTitle}
                  onChange={(e) => set('appsTitle', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Career start date</label>
                <DateField
                  value={form.careerStartDate}
                  onChange={(v) => set('careerStartDate', v)}
                />
                <p className="mt-1 text-xs text-muted">
                  Drives the "Years experience" stat automatically — recalculated every time the
                  site loads, no manual updates needed.
                </p>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Tagline</label>
                <input
                  className={inputClass}
                  value={form.tagline}
                  onChange={(e) => set('tagline', e.target.value)}
                />
                <p className="mt-1 text-xs text-muted">
                  Any "X years" mentioned here is auto-replaced with the live count from your
                  career start date.
                </p>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>About</label>
                <textarea
                  className={inputClass}
                  rows={4}
                  value={form.about}
                  onChange={(e) => set('about', e.target.value)}
                />
              </div>
            </div>
          </Section>

          <Section
            title="Stats"
            action={
              <button
                type="button"
                onClick={() =>
                  set('stats', [...form.stats, { label: 'New stat', value: 0, suffix: '' }])
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-background"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add stat
              </button>
            }
          >
            <div className="space-y-4">
              {form.stats.map((stat, i) => (
                <div key={i} className="grid grid-cols-[1fr_100px_80px_auto] items-end gap-3">
                  <div>
                    <label className={labelClass}>Label</label>
                    <input
                      className={inputClass}
                      value={stat.label}
                      onChange={(e) => {
                        const next = [...form.stats]
                        next[i] = { ...stat, label: e.target.value }
                        set('stats', next)
                      }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Value</label>
                    <input
                      type="number"
                      className={inputClass}
                      value={stat.value}
                      disabled={stat.label === 'Years experience' && !!form.careerStartDate}
                      onChange={(e) => {
                        const next = [...form.stats]
                        next[i] = { ...stat, value: Number(e.target.value) }
                        set('stats', next)
                      }}
                    />
                    {stat.label === 'Years experience' && form.careerStartDate && (
                      <p className="mt-1 text-xs text-muted">Auto-calculated from career start date</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Suffix</label>
                    <input
                      className={inputClass}
                      value={stat.suffix ?? ''}
                      onChange={(e) => {
                        const next = [...form.stats]
                        next[i] = { ...stat, suffix: e.target.value }
                        set('stats', next)
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => set('stats', form.stats.filter((_, idx) => idx !== i))}
                    className="rounded-lg border border-border p-2 text-muted hover:text-foreground"
                    aria-label="Remove stat"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Experience"
            action={
              <button
                type="button"
                onClick={() =>
                  set('experience', [
                    ...form.experience,
                    { role: '', company: '', period: '', description: '', highlights: [] },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-background"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add role
              </button>
            }
          >
            <div className="space-y-6">
              {form.experience.map((exp, i) => (
                <div key={i} className="rounded-xl border border-border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted">Role {i + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        set('experience', form.experience.filter((_, idx) => idx !== i))
                      }
                      className="rounded-lg border border-border p-2 text-muted hover:text-foreground"
                      aria-label="Remove experience"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Role title</label>
                      <input
                        className={inputClass}
                        value={exp.role}
                        onChange={(e) => {
                          const next = [...form.experience]
                          next[i] = { ...exp, role: e.target.value }
                          set('experience', next)
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Company</label>
                      <input
                        className={inputClass}
                        value={exp.company}
                        onChange={(e) => {
                          const next = [...form.experience]
                          next[i] = { ...exp, company: e.target.value }
                          set('experience', next)
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Period</label>
                      <input
                        className={inputClass}
                        value={exp.period}
                        onChange={(e) => {
                          const next = [...form.experience]
                          next[i] = { ...exp, period: e.target.value }
                          set('experience', next)
                        }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Description</label>
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={exp.description}
                        onChange={(e) => {
                          const next = [...form.experience]
                          next[i] = { ...exp, description: e.target.value }
                          set('experience', next)
                        }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Highlights (one per line)</label>
                      <textarea
                        className={inputClass}
                        rows={3}
                        value={(exp.highlights ?? []).join('\n')}
                        onChange={(e) => {
                          const next = [...form.experience]
                          next[i] = {
                            ...exp,
                            highlights: e.target.value.split('\n').filter(Boolean),
                          }
                          set('experience', next)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Projects"
            action={
              <button
                type="button"
                onClick={() =>
                  set('projects', [
                    ...form.projects,
                    { title: '', description: '', tags: [], url: '' },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-background"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add project
              </button>
            }
          >
            <div className="space-y-6">
              {form.projects.map((project, i) => (
                <div key={i} className="rounded-xl border border-border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted">Project {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => set('projects', form.projects.filter((_, idx) => idx !== i))}
                      className="rounded-lg border border-border p-2 text-muted hover:text-foreground"
                      aria-label="Remove project"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Title</label>
                      <input
                        className={inputClass}
                        value={project.title}
                        onChange={(e) => {
                          const next = [...form.projects]
                          next[i] = { ...project, title: e.target.value }
                          set('projects', next)
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>URL</label>
                      <input
                        className={inputClass}
                        value={project.url}
                        onChange={(e) => {
                          const next = [...form.projects]
                          next[i] = { ...project, url: e.target.value }
                          set('projects', next)
                        }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Description</label>
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={project.description}
                        onChange={(e) => {
                          const next = [...form.projects]
                          next[i] = { ...project, description: e.target.value }
                          set('projects', next)
                        }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Tags (comma separated)</label>
                      <input
                        className={inputClass}
                        value={project.tags.join(', ')}
                        onChange={(e) => {
                          const next = [...form.projects]
                          next[i] = {
                            ...project,
                            tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                          }
                          set('projects', next)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
