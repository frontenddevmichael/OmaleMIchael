import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { CredibilityStrip } from '../components/CredibilityStrip'
import { Work } from '../components/Work'
import { Experience } from '../components/Experience'
import { ResumeSection } from '../components/ResumeSection'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <>
      <div className="page">
        <Nav />
        <main className="stack">
          <Hero />
          <CredibilityStrip />
          <Work />
          <Experience />
          <ResumeSection />
        </main>
      </div>
      <Footer />
    </>
  )
}
