import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GlobalBackground from './components/GlobalBackground.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalBackground />
    <App />
  </StrictMode>,
)