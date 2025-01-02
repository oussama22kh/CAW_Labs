import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Auth from "./Components/Auth"
import './index.css'
import App from './App.jsx'
import PocketBase from "pocketbase";
const pb = new PocketBase("https://masroofy.pockethost.io/");
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={<App />} /> {/* Catch-all for the rest of the app */}
      </Routes>
    </Router>
  </StrictMode>,
)
