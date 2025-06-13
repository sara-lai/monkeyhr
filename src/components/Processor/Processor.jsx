// role of Processor:
// import modules that do the code tests, run them
// update the screen real-time with progress
// build up reports and save them on airtable

import './Processor.css'

import * as GithubService from '../../services/GithubService' 
import * as AirtableService from '../../services/AirtableService'

import mockReportData from '../../services/mockProcessor.json'

// commits
import test1 from '../../screeners/commits/Test1'
import test2 from '../../screeners/commits/Test2'
import test3 from '../../screeners/commits/Test3'
import test4 from '../../screeners/commits/Test4'
import test5 from '../../screeners/commits/Test5'
import test6 from '../../screeners/commits/Test6'
import test7 from '../../screeners/commits/Test7'

// mitigation
import test8 from '../../screeners/mitigation/Test8'

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

const Processor = (props) => {

    // todo - possible refactor: possibly dont use stateVariables/ or useRef.... just plain variables....
    // possible refactor: separate the UI rendering/updating component from the processor logic 

    const [projectType, setProjectType] = useState('')
    const [repoData, setRepoData] = useState({})
    const [newReportData, setNewReportData] = useState({})

    const navigate = useNavigate()

    // per Waihon useRef solution to access state vars in various runProcessor() functions
    const projectTypeRef = useRef(null) 
    const createdAtRef = useRef(null)
    const newReportDataRef = useRef(null)
    // todo - definitely extract all this non-React-like stuff out to plain js and use regular vars

    async function initializeNewReport(){
        // logic formerly from app.js
        let repoData = await GithubService.getRepoBasics(props.repoURL)
        setProjectType(repoData.language)
        projectTypeRef.current = repoData.language // part of useRef solution
        createdAtRef.current = repoData.created_at
        setRepoData(repoData)          
    }

    async function executeSteps(){
        // tests 1-7 are commit related
        let resultTest1 = await test1(props.repoURL)
        //let resultTest2 = await test2(props.repoURL)
        let commitTestResults = [resultTest1]

        // test 8 is the pre-ai mitigation test
        let resultTest8 = await test8(props.repoURL, createdAtRef.current)
        let mitigationTestResults = [resultTest8]

        // todo - refactor.... part of useRef solution / is there a point to the state variable? 
        setNewReportData({...newReportData, "mitigation": mitigationTestResults, "commits": commitTestResults})
        newReportDataRef.current = {...newReportData, "mitigation": mitigationTestResults, "commits": commitTestResults}

        await new Promise((resolve, reject) => setTimeout(resolve, 7000))  // usage from https://javascript.info/async-await
    }

    async function saveNewReport(){
        // first: add the mockdata for tests that haven't been implemented
        // report format -> {"category": [{test}, {test}, {test}....], "category2": ....}

        newReportDataRef.current.commits = newReportDataRef.current.commits.concat(mockReportData.commits) // combine arrays
        // could loop, but simpler written out
        newReportDataRef.current.iteration = mockReportData.iteration 
        newReportDataRef.current["code-choices"] = mockReportData["code-choices"]
        newReportDataRef.current["code-style"] = mockReportData["code-style"]
        newReportDataRef.current.artefacts = mockReportData.artefacts
        newReportDataRef.current.comments = mockReportData.comments
        newReportDataRef.current['ai-assessments'] = mockReportData['ai-assessments']
        newReportDataRef.current.mitigation =  newReportDataRef.current.mitigation.concat(mockReportData.mitigation)

        console.log("wonderful frankenstein report data: ", newReportDataRef.current)

        const reportData = await AirtableService.createReport(props.repoURL, projectTypeRef.current, newReportDataRef.current)

        console.log('done processing! saved report id: ', reportData.id)

        setNewReportData(reportData) // necessary??
    }

    async function runProcessor(){
        await initializeNewReport()
        await executeSteps() 
        await saveNewReport()
        navigate("/dashboard")
    }

    useEffect(() => {
        runProcessor() // note: standalone function so can run as async     
    }, []) 

    function formatDate(date_raw){
        const date = new Date(date_raw);
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    }

    // tricky feature
    // goal: walk through the steps 1-by-1 at some interval ....setInterval.... 
    // goal2: show a "." after each test next to the category, have those also put on page
    // react: setInterval is a side effect, so use useEffect.... 
    const [activeStage, setActiveStage] = useState('')
    const stages = ['commits', 'iteration', 'code-choices', 'code-style', 'artefacts', 'ai-assessment', 'mitigation']
    useEffect(() => {
        let stageIdx = 0
        const interval = setInterval(() => {
            setActiveStage(stages[stageIdx])
            stageIdx++
        }, 1200)
    }, [])

    const [dots, setDots] = useState('')
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev + ".")
        }, 150)
    }, [])

    return (
        <div className="processing-wrapper">
            <h2>{props.repoURL}</h2>
            <p>Project type: {repoData.language}, Created: {formatDate(repoData.created_at)}</p>
            <p className={activeStage === 'commits' ? 'active' : ''}>Reviewing commits</p>
            <p className={activeStage === 'iteration' ? 'active' : ''}>Reviewing iteration</p>
            <p className={activeStage === 'code-choices' ? 'active' : ''}>Reviewing code choices</p>
            <p className={activeStage === 'code-style' ? 'active' : ''}>Reviewing code style</p>
            <p className={activeStage === 'artefacts' ? 'active' : ''}>Reviewing artefacts</p>
            <p className={activeStage === 'ai-assessment' ? 'active' : ''}>Cross-checking with AI</p>
            <p className={activeStage === 'mitigation' ? 'active' : ''}>Checking mitigating factors</p>
            <div className='dot-zone'>{dots}</div>
        </div>
    )
}

export default Processor