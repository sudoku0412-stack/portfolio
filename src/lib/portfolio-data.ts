import { useCallback, useEffect, useState } from 'react'

export type Experience = {
  role: string
  company: string
  period: string
  description: string
  highlights?: string[]
}

export type Project = {
  title: string
  description: string
  tags: string[]
  url: string
}

export type Stat = {
  label: string
  value: number
  suffix?: string
}

export type PortfolioData = {
  name: string
  role: string
  location: string
  tagline: string
  about: string
  email: string
  phone: string
  appsTitle: string
  stats: Stat[]
  experience: Experience[]
  projects: Project[]
}

export const STORAGE_KEY = 'portfolio-data-v1'

export const defaultData: PortfolioData = {
  name: 'Kaushik Majumder',
  role: 'Engineering Team Lead at eXp Realty',
  location: 'Toronto, Canada',
  tagline: '12+ years building and leading teams that ship software people rely on.',
  about:
    "I'm a Toronto-based engineer who leads teams by day and chases curiosity by night. Outside of work you'll find me watching or playing cricket, experimenting in the kitchen with whatever's in the fridge, and reading about design systems and the psychology behind why people actually use (or abandon) the things we build. I like problems that sit at the intersection of people and systems — which is probably why I ended up leading engineers instead of just writing code.",
  email: 'kmaz285@gmail.com',
  phone: '+91-8961269679',
  appsTitle: 'Apps',
  stats: [
    { label: 'Engineers led', value: 18 },
    { label: 'Releases delivered', value: 240, suffix: '+' },
    { label: 'Years experience', value: 12, suffix: '+' },
    { label: 'Apps shipped', value: 9 },
  ],
  experience: [
    {
      role: 'Engineering Team Lead',
      company: 'Northwind Systems',
      period: '2021 — Present',
      description:
        'Leading a team of platform engineers building the core services that power a fleet of internal and customer-facing applications.',
      highlights: [
        'Grew the platform team from 4 to 12 engineers without losing delivery velocity',
        'Led migration from a monolith to a service-oriented architecture, cutting deploy time by 70%',
        'Introduced a paved-road CI/CD pipeline adopted across 6 product teams',
        'Ran quarterly technical planning that tied roadmap directly to reliability metrics',
      ],
    },
    {
      role: 'Mendix Developer',
      company: 'Tata Consultancy Services',
      period: 'Aug 2019 — Aug 2021',
      description:
        'Built a web application in Mendix processing risk assessment for an internal client, working in an Agile environment with daily standups.',
      highlights: [
        'Integrated an external authentication system for login',
        'Built Excel export/import functionality for uploading large datasets',
        'Integrated the system with DocuSign',
      ],
    },
    {
      role: 'Mendix Developer',
      company: 'Tata Consultancy Services',
      period: 'Aug 2018 — Aug 2019',
      description:
        'Built a Mendix web application for an ecommerce client, processing retail orders in an Agile environment with daily standups.',
      highlights: [],
    },
    {
      role: 'Integration Developer',
      company: 'Tata Consultancy Services',
      period: 'Oct 2016 — Aug 2018',
      description:
        'Developed and supported applications built on IBM Integration Bus and IBM BPM — IIB for retail order processing, BPM for internal hiring workflows.',
      highlights: [
        'Worked ServiceNow ITIL ticketing for all development, production monitoring, and incident resolution',
        'Monitored application logs, troubleshot and documented fixes for orders with issues',
        'On call outside business hours for production support and release deployments',
      ],
    },
    {
      role: 'Integration Developer',
      company: 'Tata Consultancy Services',
      period: 'Dec 2015 — Oct 2016',
      description:
        'Developed and supported a Tibco BW application processing retail orders, working in an Agile environment with daily standups.',
      highlights: [
        'Worked ServiceNow ITIL ticketing for development/code changes, production monitoring, and incident resolution',
        'Monitored application logs, troubleshot and documented fixes for orders with issues',
        'On call outside business hours for production support and release deployments',
      ],
    },
    {
      role: 'ILP Trainee',
      company: 'Tata Consultancy Services',
      period: 'Aug 2015 — Nov 2015',
      description: 'Initial Learning Program training at TCS before moving into project delivery.',
      highlights: [],
    },
  ],
  projects: [
    {
      title: 'NextExpenseTracker',
      description:
        'A receipt-scanning expense tracker for mobile. Uses on-device OCR to scan receipts and auto-categorize spending, with cloud sync and auth.',
      tags: ['React Native', 'Expo', 'Firebase', 'ML Kit'],
      url: '#',
    },
    {
      title: 'NestChat',
      description:
        'A real-time chat app for mobile, backed by Supabase for auth, storage, and realtime messaging.',
      tags: ['React Native', 'Expo', 'Supabase'],
      url: '#',
    },
  ],
}

function readStorage(): PortfolioData {
  if (typeof window === 'undefined') return defaultData
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    return { ...defaultData, ...JSON.parse(raw) } as PortfolioData
  } catch {
    return defaultData
  }
}

function writeStorage(data: PortfolioData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(readStorage)

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setData(readStorage())
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const update = useCallback((next: PortfolioData) => {
    writeStorage(next)
    setData(next)
  }, [])

  const reset = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setData(defaultData)
  }, [])

  return { data, update, reset }
}
