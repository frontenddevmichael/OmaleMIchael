import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Todo } from '../components/Todo'
import { projects } from '../data/content'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  useEffect(() => {
    if (project) document.title = `${project.name} — Michael`
    return () => {
      document.title = 'Michael — Frontend developer and UI/UX designer'
    }
  }, [project])

  if (!project) {
    return (
      <>
        <div className="page">
          <Nav />
          <main className="case">
            <div className="case-panel">
              <h1>That one isn&rsquo;t here.</h1>
              <p className="case-summary">
                The page you asked for doesn&rsquo;t exist, but the work does.
              </p>
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
            <span className="case-status">
              {project.year}. {project.status}
            </span>
          </div>

          <article className="case-panel">
            <h1>{project.name}</h1>
            <p className="case-summary">{project.summary}</p>

            <div className="case-grid">
              <dl className="case-list">
                <div>
                  <dt>My role</dt>
                  <dd>{project.role ? project.role : <Todo label="role" />}</dd>
                </div>

                <div>
                  <dt>Built with</dt>
                  <dd>
                    {project.stack ? project.stack.join(', ') : <Todo label="stack" />}
                  </dd>
                </div>

                <div>
                  <dt>What was hard</dt>
                  <dd>{project.decision ? project.decision : <Todo label="the hard part" />}</dd>
                </div>

                <div>
                  <dt>See it live</dt>
                  <dd>
                    {project.live ? (
                      <a className="footer-link" href={project.live}>
                        {project.live}
                      </a>
                    ) : (
                      <Todo label="live link" />
                    )}
                  </dd>
                </div>

                {project.items ? (
                  <div>
                    <dt>What I worked on</dt>
                    <dd>
                      <ul className="case-items">
                        {project.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}

                {project.private ? (
                  <div>
                    <dt>Code</dt>
                    <dd>The code is private, so this is the written version.</dd>
                  </div>
                ) : null}
              </dl>

              <div className="case-shots">
                <h2>Screenshots</h2>
                <div className="shot-todo">TODO · screenshots not supplied</div>
              </div>
            </div>

            <div className="case-foot">
              <p>Want the longer version? Ask me about it.</p>
              <Link className="btn-soft" to="/#projects">
                All work
              </Link>
            </div>
          </article>
        </main>
      </div>

      <Footer />
    </>
  )
}
