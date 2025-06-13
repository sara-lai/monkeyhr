// incredibly bare bones testing method (run `node test.js` in console), credit GPT for help

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


// import test7 from './src/screeners/commits/Test7.js'

// // // test red flag
// test7('sara-l-ai/find-the-big-commit').then(console.log).catch(console.error)

// //test green flag
// test7('sara-l-ai/negative-case-simplest').then(console.log).catch(console.error)