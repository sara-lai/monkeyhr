import { useState } from 'react'

import './App.css'

import GithubForm from './components/GithubForm/GithubForm'
import ProcessingScreen from './components/ProcessingScreen/ProcessingScreen'

import * as GithubService from './services/GithubService' // should put this in Landing isntead?
import * as AirtableService from './services/AirtableService'

function App() {
  
  function processCommits() {
    // live here or in landing? 
    GithubService.getCommits()

    // generate a report & update state??
  }

  return (
    <>
      <h1>MonkeyHR</h1>
      <GithubForm />
      <ProcessingScreen />
      {/* <Dashboard /> */}
      <img className='monkey-img-landing' src='images/monkey.png' />
    </>  
  )
}

export default App
