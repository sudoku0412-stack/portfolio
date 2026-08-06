import { ArrowRight, Mail, MapPin, Phone, ExternalLink } from 'lucide-react'
import { usePortfolioData, getYearsOfExperience } from '../lib/portfolio-data'
import AuroraBackground from '../components/AuroraBackground'
import Nav from '../components/Nav'
import Reveal from '../components/Reveal'
import TimelineItem from '../components/TimelineItem'
import CountUp from '../components/CountUp'
import ShineCard from '../components/ShineCard'

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Portfolio() {
  const { data } = usePortfolioData()
  const yearsExperience = getYearsOfExperience(data.careerStartDate)
  const displayStats = data.stats.map((stat) =>
    stat.label === 'Years experience' && data.careerStartDate
      ? { ...stat, value: yearsExperience }
      : stat,
  )
  const displayTagline = data.careerStartDate
    ? data.tagline.replace(/\d+\+?\s*years?/i, `${yearsExperience}+ years`)
    : data.tagline

  return (
    <div id="top" className="relative min-h-screen">
      <AuroraBackground />
      <Nav initials={initialsOf(data.name)} />

      <main>
        {/* Hero */}
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pt-16 pb-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-start">
            <Reveal variant="up">
              <p className="mb-4 flex items-center gap-2 text-sm font-medium text-accent-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {data.location}
              </p>
            </Reveal>
            <Reveal variant="up" delay={100}>
              <h1 className="gradient-text font-heading text-5xl font-bold leading-tight sm:text-6xl md:text-7xl">
                {data.name}
              </h1>
            </Reveal>
            <Reveal variant="up" delay={200}>
              <p className="mt-4 max-w-2xl text-lg text-foreground/85 sm:text-xl">{data.role}</p>
            </Reveal>
            <Reveal variant="up" delay={300}>
              <p className="mt-3 max-w-xl text-muted">{displayTagline}</p>
            </Reveal>
            <Reveal variant="up" delay={400}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#experience"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105"
                >
                  View my work
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-64">
            {displayStats.map((stat, i) => (
              <Reveal key={stat.label} variant="right" delay={i * 100}>
                <ShineCard className="rounded-2xl border border-border bg-surface p-4">
                  <div className="font-heading text-3xl font-bold text-accent-2">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </ShineCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-6 pt-2 pb-20">
          <Reveal variant="up">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">About</h2>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/85">
              {data.about}
            </p>
          </Reveal>
        </section>

        {/* Experience */}
        <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
          <Reveal variant="up">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Work Experience</h2>
          </Reveal>
          <div className="mt-10">
            {data.experience.map((exp, i) => (
              <Reveal key={`${exp.company}-${i}`} variant="left" delay={i * 80}>
                <TimelineItem experience={exp} isLast={i === data.experience.length - 1} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Apps */}
        <section id="apps" className="mx-auto max-w-6xl px-6 py-20">
          <Reveal variant="up">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">{data.appsTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {data.projects.map((project, i) => (
              <Reveal key={project.title} variant="scale" delay={i * 100}>
                <ShineCard className="h-full rounded-2xl border border-border bg-surface p-6">
                  <div className="flex h-full flex-col">
                    <h3 className="font-heading text-xl font-semibold">{project.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-xs text-accent-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="story-link mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-2"
                    >
                      Visit project
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </ShineCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
          <Reveal variant="up">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Contact</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Reveal variant="up" delay={0}>
              <ShineCard className="h-full rounded-2xl border border-border bg-surface p-6">
                <p className="text-sm text-muted">Phone</p>
                <p className="mt-2 font-heading text-lg font-semibold">{data.phone}</p>
                <a
                  href={`tel:${data.phone.replace(/[^+\d]/g, '')}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-foreground transition-transform hover:scale-105"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call me
                </a>
              </ShineCard>
            </Reveal>
            <Reveal variant="up" delay={200}>
              <ShineCard className="h-full rounded-2xl border border-border bg-surface p-6">
                <p className="text-sm text-muted">Email</p>
                <p className="mt-2 font-heading text-lg font-semibold break-all">{data.email}</p>
                <a
                  href={`mailto:${data.email}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-background"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email me
                </a>
              </ShineCard>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {data.name}. All rights reserved.
      </footer>
    </div>
  )
}
