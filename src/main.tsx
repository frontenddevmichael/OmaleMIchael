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
import './styles/footer.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
