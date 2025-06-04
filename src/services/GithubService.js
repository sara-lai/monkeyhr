const BASE_URL = 'https://api.github.com'

const getRepoBasics = async (ownerRepo) => { // input as "owner/repoName"
    // GET /repos/{owner}/{repo}
    try {
        const response = await fetch(BASE_URL + '/repos/' + ownerRepo)
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err)
    }
}

const getCommits =  () => {
    // note: can pass in ?per_page=1 and use Link Header to get data on number of pages
    console.log('getting all the commits....')
}

export {
    getCommits,
    getRepoBasics
}