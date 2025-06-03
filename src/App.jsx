import { useState } from 'react'

import './App.css'

import GithubForm from './components/GithubForm/GithubForm'
import Processor from './components/Processor/Processor'
import ReportFull from './components/ReportFull/ReportFull'

import * as GithubService from './services/GithubService' // should put this in Landing isntead?
import * as AirtableService from './services/AirtableService'

import mockReportData from './services/mockProcessor.json';


function App() {

  const [repoURL, setRepoURL] = useState('')
  const [projectType, setProjectType] = useState('...')
  const [repoData, setRepoData] = useState({})

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

    setnewReportReady(true)
    setProcessing(false)
  }  

  console.log('hello repo!', repoData)
  console.log('after form submit:', repoURL)

  // function getRepoBasics() {
  // }

  const reportData = 
  
  function processCommits() {
    // live here or in landing?   
    GithubService.getCommits()

    // generate a report & update state??
  }

  return (
    <div className='landing-box'>
      <h1>MonkeyHR</h1>

      {preProcess && <GithubForm handleFormSubmit={kickoffProcessing} />}

      {processing && <Processor repoURL={repoURL} repoData={repoData} />}

      {newReportReady && <ReportFull data={mockReportData} />}


      {/* <Dashboard /> */}

      <div className='monkey-zone'>
        <img className='monkey-img-landing' src='images/monkey.png' />
        <img className='monkey-img-landing' src='images/monkey.png' />
        <img className='monkey-img-landing' src='images/monkey.png' />
      </div>
    </div>  
  )
}

export default App
