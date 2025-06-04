import GithubForm from "../GithubForm/GithubForm"

import './Landing.css'

const Landing = (props) => {
    
    return (
        <div className='landing-box'>    
            <h1 className='monkeyhr-logo'>MonkeyHR</h1>
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