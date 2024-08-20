import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/home.tsx'
import AddSnippet from './pages/add.snippet.tsx'
import SearchSnippet from './pages/search.snippet.tsx'
import Contact from './pages/contact.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home/>} />
      <Route path='add'element={<AddSnippet />} />
      <Route path='search'element={<SearchSnippet />} />
      <Route path='contact'element={<Contact />} />
    </Route>
    
  )
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
