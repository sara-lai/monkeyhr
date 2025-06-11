import * as GithubService from '../../services/GithubService'

// test green flag -> sara-lai/sg-knowledge-challenge
// test red flag -> sara-l-ai/find-the-big-commit

// this is meant to be a fun test to try out binary search!
// https://frontendmasters.com/courses/algorithms/ (primeagen)
// using the compare endpoint can determine if first half has the large commit or second half, then take the correct half, and halve it, and so on

// Goal is reduce API consumption drastically
// eg "red flag" repo above would be 68 calls if iterated, this approach means it is around 6 calls.

async function test7(repo){

  // much repeated logic of test1
  const allCommitsMeta = await GithubService.getCommitsMeta(repo)
  const numCommits = allCommitsMeta.length

  let shaLast = allCommitsMeta[0].sha
  let shaFirst = allCommitsMeta[numCommits - 1].sha 

  // lets go
  let lo = 0
  let hi = numCommits-1

  while (lo < hi){
    let midpoint = Math.floor(lo + (hi - lo) / 2) // copying primeagen

    let testCommit = allCommitsMeta[midpoint]
    let response = await GithubService.getCommit(repo, testCommit.sha) // this should still wait despite looping because test7 is async....
    let numChanges = response.stats.additions
    if (numChanges >= 400){
      return true
    } else if (the_large_section_is_left(lo, midpoint-1)) {
      hi = midpoint-1
    } else if (the_large_section_is_right(midpoint+1, hi)) {
      lo = midpoint+1
    }
  }

  // there could be off by 1 issues here!!!

  let n = numCommits
  let midpoint = Math.floor(numCommits/2)

  function the_large_section_is_left(lo, hi){
    return compareAndCheckSize()
  }
  function the_large_section_is_right(lo, hi){
    return compareAndCheckSize()
  }

  async function compareAndCheckSize(lo, hi){
    let allChangedFiles = await GithubService.compareCommits(repo, lo, hi)
    let totalChanges = 0
      for (let file of allChangedFiles) {
        totalChanges += file.changes
    }
    if (totalChanges >= 400) {
      return true
    }
     return false
  }




  return {
    'testDescription': 'Simple test if a blatantly large commit among smaller ones',
    'resultFlag': '',
    'resultDescription': '',
  }
}

export default test7
