export const profile = {
  name: 'Michael',
  fullName: 'Omale Michael',
  roles: ['web developer', 'mobile app developer'],
  location: 'Lagos, Nigeria',
}

export const credibility = [
  { name: 'CloudCrave', detail: 'Part-time contract developer' },
  { name: 'Zelion', detail: 'Developer intern' },
  { name: 'Bells University', detail: 'Computer Science and IT, class of 2029' },
]

export type Project = {
  slug: string
  name: string
  year: string
  status: string
  lead?: boolean
}

/** The folder deck, in the order it is read. Copy for each page lives in `src/content/work`. */
export const projects: Project[] = [
  { slug: 'docket', name: 'Docket', year: '2026', status: 'In progress', lead: true },
  { slug: 'sketchroom', name: 'Sketchroom', year: '2026', status: 'Live' },
  { slug: 'bells-notes', name: 'Bells Notes', year: '2025', status: 'Live' },
  { slug: 'correr', name: 'Correr', year: '2026', status: 'Beta' },
  { slug: 'zelion', name: 'Zelion work', year: '2026', status: 'Client work' },
  { slug: 'chatbot-studio', name: 'ChatBot Studio', year: '2026', status: 'In progress' },
]

export type TimelineEntry = {
  when: string
  title: string
  detail?: string
  current?: boolean
  /** Work and study get an icon; skills are plain entries. */
  kind?: 'work' | 'school'
}

/** One timeline: what I learned and where I did it, year by year. */
export const timeline: TimelineEntry[] = [
  {
    when: '2024',
    title: 'HTML, CSS and JavaScript',
    detail: 'Then Supabase, Git and Firebase.',
  },
  {
    when: '2024',
    title: 'CloudCrave',
    detail: 'Joined their development program as a student, then went part-time on contract.',
    kind: 'work',
  },
  {
    when: '2024',
    title: 'Bells University',
    detail: 'Computer Science and IT, until 2029.',
    kind: 'school',
  },
  {
    when: '2025',
    title: 'React and Tailwind',
    detail: 'Plus libraries like React Bits and library.dev.',
  },
  {
    when: '2025',
    title: 'PrimeAxis Group',
    detail: 'Started my own software development studio.',
    kind: 'work',
  },
  {
    when: '2026',
    title: 'AWS, Cloudflare and secure development',
    detail: 'Leaning toward the security side.',
    current: true,
  },
  {
    when: '2026',
    title: 'Zelion',
    detail: 'Developer intern.',
    current: true,
    kind: 'work',
  },
]

export const tools = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Expo',
  'Convex',
]

/* ---------- resume ---------- */

export const resume = {
  email: 'omalemcmails@gmail.com',
  phone: '09164300395',
  whatsapp: '09061712509',
  github: 'https://github.com/frontenddevmichael',
  githubLabel: 'github.com/frontenddevmichael',
  linkedin: 'https://www.linkedin.com/in/michael-omale-b63406354/',
  linkedinLabel: 'linkedin.com/in/michael-omale-b63406354',
  location: 'Lagos, Nigeria',
  summary:
    'I build interfaces for the web and for mobile, and design them too. Most of the work is React, React Native and TypeScript, from the first screen through to the last component.',
}

export type ResumeEntry = {
  when: string
  title: string
  role: string
  detail?: string
}

export const resumeExperience: ResumeEntry[] = [
  {
    when: '2024 to present',
    title: 'CloudCrave',
    role: 'Part-time contract developer',
    detail: 'Joined their development program as a student, then went part-time on contract.',
  },
  {
    when: '2025',
    title: 'PrimeAxis Group',
    role: 'Founder',
    detail: 'Started my own software development studio.',
  },
  {
    when: '2026',
    title: 'Zelion',
    role: 'Developer intern',
  },
]

export const resumeEducation: ResumeEntry[] = [
  {
    when: '2024 to 2029',
    title: 'Bells University',
    role: 'BSc Computer Science and IT',
  },
]

export const resumeSkills = [
  { title: 'Languages and markup', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript'] },
  { title: 'Frameworks', items: ['React', 'React Native', 'Tailwind'] },
  {
    title: 'Platforms and tools',
    items: ['Expo', 'Convex', 'Supabase', 'Firebase', 'Git', 'AWS', 'Cloudflare'],
  },
  { title: 'Design', items: ['UI design', 'UX design'] },
]
