import './Processor.css'

// main role of Processor:
// processor should import modules that do the code tests
// for each test it should get: the flag (red, yellow, green), a results description, a test description, and a test name
// processor needs to pass the repo url to the modules

import test1 from '../../screeners/commits/Test1';
import test2 from '../../screeners/commits/Test2';
import test3 from '../../screeners/commits/Test3';
import test4 from '../../screeners/commits/Test4';
import test5 from '../../screeners/commits/Test5';

import { useState, useEffect } from 'react'

const ProcessingScreen = (props) => {

    function formatDate(date_raw){
        const date = new Date(date_raw);
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    }

    // tricky feature
    // goal: walk through the steps 1-by-1 at some interval ....setInterval.... 
    // goal2: show a "." after each test next to the category, have those also put on page
    // react: setInterval is a side effect, so use useEffect.... 
    // todo - probably need to clear the setIntervals
    const [activeStage, setActiveStage] = useState('')
    const stages = ['commits', 'iteration', 'code-choices', 'code-style', 'artefacts', 'ai-assessment', 'mitigation']
    useEffect(() => {
        let stageIdx = 0
        const interval = setInterval(() => { // do i need to clearInterval later?
            setActiveStage(stages[stageIdx])
            stageIdx++
        }, 1200)
    }, [])

    // a second useEffect + setInterval that contorls the "dots" ? 
    const [dots, setDots] = useState('')
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev + ".")
        }, 150)
    }, [])

    return (
        <div className="processing-wrapper">
            <h2>{props.repoURL}</h2>
            <p>Project type: {props.repoData.language}, Created: {formatDate(props.repoData.created_at)}</p>
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

export default ProcessingScreen