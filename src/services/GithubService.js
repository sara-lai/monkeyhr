const BASE_URL = 'todo'

const getCommits =  () => {
    // note: can pass in ?per_page=1 and use Link Header to get data on number of pages
    console.log('getting all the commits....')
}

const getRepoBasics = () => {
    // get the language field, try to infer project type
    console.log('getting repo basics')    
}

export {
    getCommits,
    getRepoBasics
}