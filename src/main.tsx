import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './styles/base.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/strip.css'
import './styles/projects.css'
import './styles/experience.css'
import './styles/resume.css'
import './styles/resume-page.css'
import './styles/case.css'
import './styles/study.css'
import './styles/footer.css'

// the browser would otherwise restore the previous scroll offset on reload,
// dropping visitors into the middle of the page
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
