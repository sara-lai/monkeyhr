import * as GithubService from '../../services/GithubService.js'

// test green flag -> sara-lai/sg-knowledge-challenge
// test red flag -> sara-l-ai/find-the-big-commit

// this is meant to be a fun test to try out binary search!
// https://frontendmasters.com/courses/algorithms/ (primeagen)
// using the compare endpoint can determine if first half has the large commit or second half, then take the correct half, and halve it, and so on

// Goal is reduce API consumption drastically
// eg "red flag" repo above would be 68 calls if iterated, this approach means it is around 6 calls.

// limitations: 
// requires different approach if 2 or more mega commits searching for

async function test7(repo){

  // much repeated logic of test1
  const allCommitsMeta = await GithubService.getCommitsMeta(repo)
  const numCommits = allCommitsMeta.length

  let flag = 'green'
  let description = 'No blatantly large commits found among small ones.'

  // Copying primeagen from above lecture, but adapted for the compare API
  let lo = 0
  let hi = numCommits
  
  while (lo < hi){
    console.log('looping!', lo, hi)
    let midpoint = Math.floor(lo + (hi - lo) / 2) // ask primeagen

    if (await is_the_mega_commit(midpoint)){
      console.log('yes a blatantly large one at index: ', midpoint)
      flag = 'red'
      description = 'A blatantly large commit among small ones was found.'
      break
    } else if (large_section_is_on_left(lo, midpoint-1)) {
      hi = midpoint
    } else if (large_section_is_on_right(midpoint+1, hi)) {
      lo = midpoint+1
    } else {
      console.log('something went wrong....')
    }
  }

  // there are certainly off by 1 issues here!

  async function is_the_mega_commit(index){
    let testCommit = allCommitsMeta[index]
    let response = await GithubService.getCommit(repo, testCommit.sha) // this should still wait despite looping because test7 is async....
    let numChanges = response.stats.additions
    console.log('numChanges', numChanges, response.stats)
    if (numChanges >= 400){
      return true
    }
    console.log('returning false then ')
    return false
  }

  function large_section_is_on_left(lo, hi){
    console.log('checking left')
    return compareAndCheckSize(lo, hi)
  }

  function large_section_is_on_right(lo, hi){
    console.log('checking right')
    return compareAndCheckSize(lo, hi)
  }
  
  async function compareAndCheckSize(lo, hi){
    shaLast = allCommitsMeta[lo].sha
    shaFirst = allCommitsMeta[hi].sha
    let allChangedFiles = await GithubService.compareCommits(repo, shaFirst, shaLast)
    console.log('compareAndCheckSize', allChangedFiles, lo, hi, shaFirst, shaLast)
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
    'testDescription': 'Simple test if a blatantly large commit among smaller ones.',
    'resultFlag': flag,
    'resultDescription': description,
    'id': 7
  }
} 

export default test7
