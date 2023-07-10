import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/init/reset.css'
import './assets/styles/init/typography.css'
import './assets/styles/index.css'
import './assets/styles/components/splash.css'
import './assets/styles/components/paginator.css'
import './assets/styles/components/navbar.css'
import './assets/styles/animations.css'
import './assets/styles/layout.css'
import './assets/styles/forms/off-canvas.css'
import './assets/styles/inputs.css'
import './assets/styles/forms/forms.css'
import './assets/styles/forms/login-form.css'
import './assets/styles/tables.css'
import './assets/styles/media/media.css'
import './assets/styles/media-queries/media-queries.css'

import { BrowserRouter, HashRouter } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/game-of-thrones-houses-catalogue'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
