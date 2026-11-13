import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'

export default function NotFound() {
  return (
    <div className="page">
      <Nav />
      <main className="case">
        <div className="case-panel">
          <h1>Not found.</h1>
          <p className="case-summary">This page does not exist.</p>
          <div className="case-top">
            <Link className="btn-soft" to="/">
              Back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
