import * as GithubService from '../../services/GithubService'

// test green flag -> freeCodeCamp/freeCodeCamp
// test red flag -> sara-lai/sg-knowledge-challenge

// notes:
// this test should probably always come first (to avoid more API calls!)
// edge case: created pre AI, but AI used in later commits [maybe non concern]
// "red flag" is not a problem, just 100% mitigation factor if green

async function test8(repo, createdAt){

  console.log('running test8', createdAt) // createdAt eg "2025-04-30T15:34:20Z"

  let theDate = new Date(createdAt)
  let theYear = theDate.getFullYear()
  let resultFlag = 'yellow'
  let resultDescription = `Codebase created in ${theYear}, which is during the era of AI app building.`
  if (theYear < 2023){
    resultFlag = 'green'
    resultDescription = `Codebase created in ${theYear}, which is before the era of AI app building.`
  }

  return {
    'testDescription': 'codebase created pre AI',
    'resultFlag': resultFlag,
    'resultDescription': resultDescription,
    'id': 8,
  }
}

export default test8