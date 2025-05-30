import { useState } from 'react'

import './App.css'

import GithubForm from './components/GithubForm/GithubForm'
import ProcessingScreen from './components/ProcessingScreen/ProcessingScreen'

import * as GithubService from './services/GithubService' // should put this in Landing isntead?
import * as AirtableService from './services/AirtableService'

function App() {

  const [repoURL, setRepoURL] = useState('')
  const [processing, setProcessing] = useState(false)

  function kickoffProcessing(query) {
    setRepoURL(query)
    setProcessing(true)

    // getRepoBasics??    
  }  

  console.log('after form submit:', repoURL)

  function getRepoBasics() {
  }
  
  function processCommits() {
    // live here or in landing? 
    GithubService.getCommits()

    // generate a report & update state??
  }

  return (
    <div className='landing-box'>
      <h1>MonkeyHR</h1>

      {!processing && <GithubForm handleFormSubmit={kickoffProcessing} />}

      {processing && <ProcessingScreen repoURL={repoURL} />}

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
