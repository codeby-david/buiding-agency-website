import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Services from './pages/Services.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />


  </StrictMode>,
)
