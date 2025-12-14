import { useState } from 'react'
import './App.css'
import TicketsPage from './pages/ticketsPage'
import TicketDetails from './pages/TicketDetails'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="mainPanel">
      <div className='appHeader'>Ticket management system</div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TicketsPage />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
