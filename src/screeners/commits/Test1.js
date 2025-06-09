import * as GithubService from '../../services/GithubService'

// needs: the test ai gen repo(s) made for this test

// needs to return:
// test name
// test description
// result flag
// result description

function test1(repo){

  return {
    'testName': 'test1',
    'testDescription': 'number of commits relative to size of codebase',
    'resultFlag': '',
    'resultDescription': '',
  }
}

export default test1

