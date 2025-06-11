import * as GithubService from '../../services/GithubService'

// todo - reference my test ai generated repo app made exclusively for this test

// this test is tricky, it needs to monitor 24 hour periods..... within commits, looking at diffs (additions-subtractions)
// b/c of Github api, it will first need to get all commits via a full API call
// ^ then comb through a time window
// ^ I may need to register an auth token in order to actually test this



function test2(repo){


  return {
    'testDescription': 'large code additions in short time period',
    'resultFlag': '',
    'resultDescription': '',
    'id': 2,
  }
}

export default test2
