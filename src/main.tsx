import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { searchMovies } from './services/tmdb.ts' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Test in Conole.log
searchMovies("matrix").then((filme) => console.log(filme));
