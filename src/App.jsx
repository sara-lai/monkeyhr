import { useState } from 'react'

import './App.css'

import Landing from './components/Landing/Landing'
import Processor from './components/Processor/Processor'
import Dashboard from './components/Dashboard/Dashboard'

import * as GithubService from './services/GithubService' // should put this in Landing isntead?
import * as AirtableService from './services/AirtableService'

import mockReportData from './services/mockProcessor.json';


function App() {

  const [repoURL, setRepoURL] = useState('')
  const [projectType, setProjectType] = useState('...')
  const [repoData, setRepoData] = useState({})
  const [newReportData, setNewReportData] = useState({})

  // todo switching to Routes will probably make this unnecessary
  const [preProcess, setPreProcess] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [newReportReady, setnewReportReady] = useState(false)

  async function kickoffProcessing(query) {
    setRepoURL(query)
    setProcessing(true)
    setPreProcess(false)

    let repoData = await GithubService.getRepoBasics(query)
    setProjectType(repoData.language) // or dont use
    setRepoData(repoData)  

    // usage from https://javascript.info/async-await
    await new Promise((resolve, reject) => setTimeout(resolve, 3000))

    saveNewReport()
  }  

  // function getRepoBasics() {
  // }

  async function saveNewReport(){    
    // data coming from imported mockReportData, for now

    const reportData = await AirtableService.createReport(mockReportData)

    setNewReportData(reportData)

    setnewReportReady(true)
    setProcessing(false)
  }

  
  function processCommits() {
    // live here or in landing?   
    GithubService.getCommits()

    // generate a report & update state??
  }

  return (
    <div className='landing-box'>     

      {preProcess && <Landing handleFormSubmit={kickoffProcessing} />}

      {processing && <Processor repoURL={repoURL} repoData={repoData} />}

      {newReportReady && <Dashboard />}

      {/* <Dashboard /> */}

    </div>  
  )
}

export default App
