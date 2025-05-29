import { useState } from 'react'

import './App.css'

import Landing from './components/Landing/Landing' // or not! 
import GithubForm from './components/GithubForm/GithubForm'

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
      {/* <Landing  /> */}
      {/* <LoadingScreen />
      <Dashboard /> */}
    </>  
  )
}

export default App
