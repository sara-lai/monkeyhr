import GithubForm from "../GithubForm/GithubForm"

const Landing = (props) => {
    
    return (
        <>
            <h1>MonkeyHR</h1>
            <GithubForm handleFormSubmit={props.handleFormSubmit} />
            <div className='monkey-zone'>
                <img className='monkey-img-landing' src='images/monkey.png' />
                <img className='monkey-img-landing' src='images/monkey.png' />
                <img className='monkey-img-landing' src='images/monkey.png' />
            </div>  
        </>         
    )
}

export default Landing 