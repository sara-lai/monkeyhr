// bare bones testing method (run `node test.js` in console), credit GPT for help

import test1 from './src/screeners/commits/Test1.js'

// test red flag
test1('sara-l-ai/commits-to-code-ratio').then(console.log).catch(console.error)
// test green flag
test1('sara-lai/sg-knowledge-challenge').then(console.log).catch(console.error)


import test8 from './src/screeners/mitigation/Test8.js'

// test yellow flag
test8('sara-l-ai/commits-to-code-ratio', "2025-04-30T15:34:20Z").then(console.log).catch(console.error)
// test green flag
test8('freeCodeCamp/freeCodeCamp', "2020-04-30T15:34:20Z").then(console.log).catch(console.error)


// ****************************** warning: repeated testing of test7 calls the api a lot! *********************
import test7 from './src/screeners/commits/Test7.js'

// test red flag
// test7('sara-l-ai/find-the-big-commit').then(console.log).catch(console.error)

// test green flag
//test7('sara-l-ai/negative-case-simplest').then(console.log).catch(console.error)




// ***************************** GPT testing ****************************

// Calling /api/ai1
async function analyzeCommitMessages(messages) {
  try {
      const response = await fetch('http://localhost:3000/api/ai1', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commitMessages: messages }),
      })

      const data = await response.json();

      console.log('GPT call complete', data)

      return data
  } catch (error) {
      console.log('error', error)
  }
}
  
// // Testing GPT red case 
let commitMessages = [
    'Added function deleteTodoList',
    'Added function generateTheBoard',
    'Added variable todo',
 ]
analyzeCommitMessages(commitMessages)

// Testing GPT green case 
let commitMessages2 = [
  'Completed todo list deletion feature',
  'Refactor to avoid confusing useRef, better in own JS file',
  'Attempt1 at a live chat feature',
]
analyzeCommitMessages(commitMessages2)