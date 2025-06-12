// improvements:
// use BASE_URL + '/repos/ + ownerRepo as the actual base URL.... need a class for that?

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

// new: maybe just calculate this in the individual tests
// const getLinesOfCodes = async (ownerRepo) => {

//     const commitMetaData = await getCommitsMeta(ownerRepo)
//     const numCommits = 

//     // not so easy! 
//     // need compareCommits(first, last)
//     // iterate the files and total the stats
//     // OR.... 
//     // get each commit with separate API call and run calculations
//     try {
//         const response = await fetch(BASE_URL + '/repos/' + ownerRepo)
//         const data = await response.json()
//         return data
//     } catch(err) {
//         console.log(err)
//     }    
// }

const compareCommits = async (ownerRepo, shaFirst, shaLast) => {
    // compare: GET /repos/{owner}/{repo}/compare/{first}...{last}
    // see services/sample-compare-response-githubapi.json
    // will give a list of files, { files: [ filename: 'app.js', "additions": 927, "deletions": 71, "changes": 998,] }
    try {
        const response = await fetch(BASE_URL + '/repos/' + ownerRepo + '/compare/' + shaFirst + '...' + shaLast)
        const data = await response.json()
        return data.files
    } catch(err) {
        console.log(err)
    }     
}

const getCommitsMeta = async (ownerRepo) => {
    // note: this does not give stats --> need to individually call commits
    // todo, need to update logic for more than 100 commits
    // commit messages: [{"commit": { "message": "my commit message"}, ]
    // date created: [{"commit": {"author": {"date": "2025-05-10T06:54:44Z"}}}]
    // number of commits: data.length
    try {
        const response = await fetch(BASE_URL + '/repos/' + ownerRepo + '/commits?per_page=100') // show as many as can in 1 api call
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err)
    }
}

const getCommit = async (ownerRepo, sha) => {
    // stats meta: { "stats": { "total": 400, "additions": 400, "deletions": 0} }
    try {
        const response = await fetch(BASE_URL + '/repos/' + ownerRepo + '/commits/' + sha)
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err)
    }
} 

const getCommitsFull =  async (ownerRepo) => {
    // todo 
    
    // danger: this is an API call for every commit!!! 
    // only way to get stats
    // stats meta: { "stats": { "total": 400, "additions": 400, "deletions": 0} }
    // stats per file: {"files": ["filename": "app.js", "additions": 113, "deletions": 0, "changes": 113]}
    // date create: {"commit": {"author": {"date": "2025-05-10T06:54:44Z"}}}
    // message: {"commit": { "message": "my commit message"}

    // future possible uses:
    // "patch" inside the files array gives you the content of changes, can use for ai assess
    // each file has its own sha (separate from commit sha).... api call for file content? but git/blobs/sha gives whacky encoded
    // ^ have to decode.... 

    // need to wrap this in a loop, loop over each commit sha
    const allCommits = await getCommitsMeta(ownerRepo)
    // .... todo, loop
    sha = '123'

    try {
        const response = await fetch(BASE_URL + '/repos/' + ownerRepo + '/commits/' + sha)
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err)
    }
}

export {
    getRepoBasics,
    getCommitsMeta,
    compareCommits,
    getCommitsFull,
    getCommit
}