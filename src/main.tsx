import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css'
import './assets/styles/pages/splash.css'
import './assets/styles/animations.css'
import './assets/styles/media-queries.css'
import './assets/styles/layout.css'
import './assets/styles/inputs.css'
import './assets/styles/forms.css'
import './assets/styles/typography.css'
import './assets/styles/tables.css'
import './assets/styles/navbar.css'
import './assets/styles/paginator.css'
import './assets/styles/media.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/game-of-thrones-houses-catalogue'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
