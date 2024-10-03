import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Shop from "./components/Shop"
import About from "./components/About"
import Contact from "./components/Contact"

function App() {
  return (
    <Router>
      <div className="h-screen relative">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
