# Candidate screening demo
<br>

<img width="300" alt="Screenshot 2025-06-13 at 7 21 21 PM" src="https://github.com/user-attachments/assets/48e8d93e-dd0e-4ee4-b61d-c6ff6ec9a7a4" />

<br>
<br>

This is a proof-of-concept for a candidate screening tool for engineering teams, prepared for a presentation. Come back soon for production version link!

[demo on Vercel](https://monkeyhr.vercel.app/)

**Next Steps**:
  - Robust project-type recognition (zero-in on key file and sections)
  - Caching Github API calls shared among test modules
  - Complete the full suite of planned tests
  - HR account features

**Tech Stack**:
**React** - **Vercel** - **Vite** - **Airtable** - **Github API** - **ChatGPT API** - **Material UI**

**Features Include**:
  - A "starter set" of tests for simple Github repositories 
  - A module that uses binary search to find large commits
  - AI integration
  - Complex data structure handling (including with Airtable)
  - Custom testing script to isolate modules

**See individual files for citations/useful resources**

## Key moments in development

- Figma mockups (inspired by code+AI style startup)
- Finding limits of React components: Avoid non React-like, back-end features in components (see Process.jsx, the useRef oddness)
- Realizing `useEffect` can handle almost all of your "non React-like" needs
- A way to test modules without running the full app flow: `node test.js` to demo
- Using params instead of props to avoid messy state lifting or splitting of routes (see ReportFull.jsx)
- Basic AI integration (e.g. `test.js`)

## Some Highlights

- `Processor.jsx` -> React-like and non-React like mix (`useEffect` & `useRef` bonanza)
- `Dashboard.jsx` / `FullReport.jsx` -> Complex data object handling (Creating Frankenstein data of live + mock data, deep copying, nested looping, Airtable approach)
- `Test7.js` -> Binary search possible with Github’s compare endpoint! (68 api calls to < 6)
- `Test1.js` -> how to get lines-of-code from Github’s API (not simple!)
- `report.css` -> clever/simple way to create a separate layout for a specific page
- Processing screen -> `useEffect` + `setInterval` to walk through steps and show dots for tests 
- `FullReport.jsx` -> selective rendering for edit mode, and params instead of props to avoid lifting

## Selected slides from presentation

<img width="1000" alt="Screenshot 2025-06-13 at 7 01 31 PM" src="https://github.com/user-attachments/assets/22262b42-842d-47c4-858f-760c98553355" />
<img width="1000" alt="Screenshot 2025-06-13 at 7 03 13 PM" src="https://github.com/user-attachments/assets/30b94336-240e-4a7c-86a4-ba0a0ad0c4f5" />
<img width="1000" alt="Screenshot 2025-06-13 at 7 06 15 PM" src="https://github.com/user-attachments/assets/35d55d64-1309-49d2-a953-11e7b3d6c4fc" />




