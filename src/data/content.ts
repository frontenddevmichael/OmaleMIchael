export const profile = {
  name: 'Michael',
  fullName: 'Omale Michael',
  roles: ['web developer', 'mobile app developer'],
  location: 'Lagos, Nigeria',
}

export const credibility = [
  { name: 'CloudCrave', detail: 'Part-time contract developer' },
  { name: 'Zelion', detail: 'Junior developer intern' },
  { name: 'Bells University', detail: 'Computer Science and IT, class of 2029' },
]

export type Project = {
  slug: string
  name: string
  year: string
  status: string
  lead?: boolean
  summary: string
  /** Unknown facts stay null so the UI can render a visible TODO. */
  role: string | null
  stack: string[] | null
  decision: string | null
  live: string | null
  items?: string[]
  private?: boolean
}

export const projects: Project[] = [
  {
    slug: 'docket',
    name: 'Docket',
    year: '2026',
    status: 'In progress',
    lead: true,
    summary:
      'Turns screenshots and requirements into test cases you can trace back to where they came from.',
    role: null,
    stack: null,
    decision: null,
    live: null,
  },
  {
    slug: 'calebs-library',
    name: "Caleb's Library",
    year: '2025',
    status: 'In progress',
    summary: 'A free library of notes and past questions for students at Bells University.',
    role: null,
    stack: null,
    decision: null,
    live: null,
  },
  {
    slug: 'correr',
    name: 'Correr',
    year: '2026',
    status: 'Beta',
    summary: 'A coaching app built with Expo and Convex, with the AI kept on the server.',
    role: null,
    stack: ['Expo', 'Convex'],
    decision: null,
    live: null,
  },
  {
    slug: 'zelion',
    name: 'Zelion work',
    year: '2026',
    status: 'Private',
    summary: 'Three pieces of client work, written up here without the code.',
    role: null,
    stack: null,
    decision: null,
    live: null,
    private: true,
    items: ['Admin page', 'Landing page refactor', 'Newsletter automation'],
  },
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
    detail: 'Junior developer intern.',
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
    role: 'Junior developer intern',
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
