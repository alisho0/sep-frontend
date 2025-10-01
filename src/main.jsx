import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import SepApp from './SepApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SepApp />
  </StrictMode>,
)
