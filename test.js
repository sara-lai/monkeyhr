// incredibly bare bones testing method (run `node test.js` in console), credit GBT for help

import test1 from './src/screeners/commits/Test1.js'
test1('sara-l-ai/commits-to-code-ratio').then(console.log).catch(console.error)


// import test7 from './src/screeners/commits/Test7.js'

// // // test red flag
// test7('sara-l-ai/find-the-big-commit').then(console.log).catch(console.error)

// test green flag
// test7('sara-l-ai/negative-case-simplest').then(console.log).catch(console.error)