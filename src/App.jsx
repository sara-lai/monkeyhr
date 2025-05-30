import { useState } from 'react'

import './App.css'

import GithubForm from './components/GithubForm/GithubForm'
import Processor from './components/Processor/Processor'

import * as GithubService from './services/GithubService' // should put this in Landing isntead?
import * as AirtableService from './services/AirtableService'

function App() {

  const [repoURL, setRepoURL] = useState('')
  const [projectType, setProjectType] = useState('...')
  const [repoData, setRepoData] = useState({})
  const [processing, setProcessing] = useState(false)

  async function kickoffProcessing(query) {
    setRepoURL(query)
    setProcessing(true)

    let repoData = await GithubService.getRepoBasics(query)
    setProjectType(repoData.language) // or dont use
    setRepoData(repoData)  
  }  

  console.log('hello repo!', repoData)
  console.log('after form submit:', repoURL)

  // function getRepoBasics() {
  // }
  
  function processCommits() {
    // live here or in landing? 
    GithubService.getCommits()

    // generate a report & update state??
  }

  return (
    <div className='landing-box'>
      <h1>MonkeyHR</h1>

      {!processing && <GithubForm handleFormSubmit={kickoffProcessing} />}

      {processing && <Processor repoURL={repoURL} repoData={repoData} />}

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
