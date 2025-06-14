import * as GithubService from '../../services/GithubService.js'

// test green flag -> sara-lai/sg-knowledge-challenge
// test red flag -> sara-l-ai/commits-to-code-ratio

// limitations: 
// does not account for various project types or framework usage (it assumes simple vanilla JS)
// needs to correctly identify relevant files to check (eg exclude large css copied in)

async function test1(repo){
  // for this test need to get Lines of code/LOC (of relevant files), and compare to number of commits
  // using the /compare endpoint, because alternative is fetching every single commit
  // see comments in GithubService.js file

  const allCommitsMeta = await GithubService.getCommitsMeta(repo) 
  const numCommits = allCommitsMeta.length
  let shaLast = allCommitsMeta[0].sha
  let shaFirst = allCommitsMeta[numCommits - 1].sha
  // todo - using file.changes (but can use file.additions, or others??).... may be approximate only
  let allChangedFiles = await GithubService.compareCommits(repo, shaFirst, shaLast)
  let totalChanges = 0
  for (let file of allChangedFiles) {
    totalChanges += file.changes
  }

  // todo - yellow flag conditions
  let flag = 'green';
  if (totalChanges <= 500 && numCommits <= 4){
    flag = 'red'
  } else if (totalChanges <= 1000 && numCommits <= 10){
    flag = 'red'
  } else if (totalChanges <= 3000 && numCommits <= 20){
    flag = 'red'    
  } else if (totalChanges <= 5000 && numCommits <= 30 ){
    flag = 'red'
  } else if (totalChanges > 5000 && numCommits <= 30) {
    flag = 'red'
  }
  
  return {
    'testDescription': 'Assess number of commits relative to the size of the codebase.',
    'resultFlag': flag,
    'resultDescription': `Number commits: ${numCommits}, size of codebase: ${totalChanges}.`,
    'id': 1
  }
}

export default test1

