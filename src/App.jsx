import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'

import './App.css'

import Landing from './components/Landing/Landing'
import Processor from './components/Processor/Processor'
import Dashboard from './components/Dashboard/Dashboard'
import ReportFull from './components/ReportFull/ReportFull'

import * as GithubService from './services/GithubService' // should put this in Landing isntead?
import * as AirtableService from './services/AirtableService'

import mockReportData from './services/mockProcessor.json';


function App() {

  const [repoURL, setRepoURL] = useState('')
  const [projectType, setProjectType] = useState('...')
  const [repoData, setRepoData] = useState({})
  const [newReportData, setNewReportData] = useState({})

  const navigate = useNavigate()

  async function kickoffProcessing(query) {
    setRepoURL(query)
    navigate("/process")


    let repoData = await GithubService.getRepoBasics(query)
    setProjectType(repoData.language) // or dont use
    setRepoData(repoData)  

    // usage from https://javascript.info/async-await
    await new Promise((resolve, reject) => setTimeout(resolve, 7000))

    saveNewReport(query, repoData.language) // this is whacky .... despite 3 second delay saveNewReport will NOT have updated state variables
  }  

  async function saveNewReport(repoURL, projectType){    
    // data coming from imported mockReportData, for now

    const reportData = await AirtableService.createReport(repoURL, projectType, mockReportData)

    setNewReportData(reportData)

    navigate("/dashboard")
  }

  
  function processCommits() {
    // live here or in landing?   
    GithubService.getCommits()

    // generate a report & update state??
  }

  return (
    <Routes>
      <Route path="/" element={<Landing handleFormSubmit={kickoffProcessing} />} />
      <Route path="/process" element={<Processor repoURL={repoURL} repoData={repoData} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report/:id" element={<ReportFull />} />
    </Routes>
  )
}

export default App
