import GithubForm from "../GithubForm/GithubForm"

import './Landing.css'

const Landing = (props) => {
    
    return (
        <div className='landing-wrapper'>    
            
            <div className='top-bar'>
                <h1 className='monkeyhr-logo'>MonkeyHR</h1>
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
            <div className='monkey-zone'>
                <img className='monkey-img-landing' src='images/monkey.png' />
                <img className='monkey-img-landing' src='images/monkey.png' />
                <img className='monkey-img-landing' src='images/monkey.png' />
            </div>  
        </div>       
    )
}

export default Landing 