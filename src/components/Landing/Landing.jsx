import { useNavigate } from 'react-router'

import GithubForm from "../GithubForm/GithubForm"

import './Landing.css'

const Landing = (props) => {

    const navigate = useNavigate()
    
    return (
        <div className='landing-wrapper'>    
            
            <div className='top-bar'>
                <h1 className='monkeyhr-logo'>MonkeyHR</h1>
                <button onClick={() => navigate('/dashboard')}>dashboard</button>

            </div>
            <div className='landing-box'>
                <div className='landing-title'>
                    Don't Hire an <span>AI Monkey</span>
                </div>
                <div className='landing-subtitle'>
                    Submit a portfolio and find out, is your candidate an AI monkey?
                </div>   
                <div className='landing-subtitle2'>
                    Based on heuristics used at top tech companies
                </div>           
                <ul>
                    <li className='chosen'>full stack</li>
                    <li>UI/UX</li>
                    <li>machine learning</li>
                    <li>devOps</li>
                    <li>data engineer</li>
                    <li>mobile</li>
                </ul>                     
            </div>
            <GithubForm handleFormSubmit={props.handleFormSubmit} />
            <div className='ai-support'>
                <img src='images/ai-support.png' />
            </div>
            <div className='monkey-zone'>
                <img className='monkey-procession-img' src='images/monkey-procession.png' />
            </div>  
        </div>       
    )
}

export default Landing 