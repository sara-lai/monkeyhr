import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'

import './App.css'

import Landing from './components/Landing/Landing'
import Processor from './components/Processor/Processor'
import Dashboard from './components/Dashboard/Dashboard'
import ReportFull from './components/ReportFull/ReportFull'

function App() {

  const [repoURL, setRepoURL] = useState('')

  const navigate = useNavigate()

  function kickoffProcessing(query) {
    // formerly had a ton of logic here, moving to processor
    setRepoURL(query)
    navigate("/process")
  }  

  return (
    <Routes>
      <Route path="/" element={<Landing handleFormSubmit={kickoffProcessing} />} />
      <Route path="/process" element={<Processor repoURL={repoURL} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="reports/:reportId" element={<ReportFull />} />
      <Route path="*" element={<h2>Whoops, nothing here!</h2>} />      
    </Routes>
  )
}

export default App
