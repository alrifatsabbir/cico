import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register globally
gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
