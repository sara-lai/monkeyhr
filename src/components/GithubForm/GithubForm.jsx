import { useState } from 'react'

const GithubForm = (props) => {

    const [query, setQuery] = useState('')

    function handleSubmit(event){
        // submit back to app.js where stores
        event.preventDefault()
        props.handleFormSubmit(query)
        setQuery('')
    }

    function handleChange(event){
        setQuery(event.target.value)
    }

    return (
        <form className='github-form' onSubmit={handleSubmit}>
            <p>Github Repository URL, exclude https://www & .com</p>
            <input
                id="repo-url"
                name="repo-url"
                value={query}
                onChange={handleChange}
                placeholder="Owner/Repo"
                required
            />   
            <button>Submit</button>         
        </form>
    )
}

export default GithubForm