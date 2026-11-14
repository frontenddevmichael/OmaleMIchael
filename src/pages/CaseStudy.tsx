import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { StudyHead } from '../components/study/StudyHead'
import { StudySections } from '../components/study/StudySections'
import { StudyGallery } from '../components/study/StudyGallery'
import { StudyMeta } from '../components/study/StudyMeta'
import { getStudy } from '../lib/work'

export default function CaseStudy() {
  const { slug } = useParams()
  const study = slug ? getStudy(slug) : null

  useEffect(() => {
    if (study) document.title = `${study.title} — Michael`
    return () => {
      document.title = 'Michael — Frontend developer and UI/UX designer'
    }
  }, [study])

  if (!study) {
    return (
      <>
        <div className="page">
          <Nav />
          <main className="case">
            <div className="case-panel">
              <h1>That one isn&rsquo;t here.</h1>
              <p className="case-summary">The page you asked for doesn&rsquo;t exist, but the work does.</p>
              <div className="case-top">
                <Link className="btn-soft" to="/#projects">
                  Back to the work
                </Link>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="page">
        <Nav />

        <main className="case">
          <div className="case-top">
            <Link className="case-back" to="/#projects">
              <span aria-hidden="true">&larr;</span> All work
            </Link>
            <span className="case-status">{study.status}</span>
          </div>

          <article className="study">
            <StudyHead study={study} />

            <div className="study-body">
              <div className="study-main">
                <StudySections sections={study.sections} />
              </div>
              <StudyMeta study={study} />
            </div>

            <StudyGallery images={study.images} />
          </article>
        </main>
      </div>

      <Footer />
    </>
  )
}
