// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <Router>
    <Navbar />
    <main className="min-h-screen">
    <AppRoutes />
    </main>
    <Footer />
    </Router>
  )
}

export default App
