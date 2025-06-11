// ? will have to duplicate this for Candidates as well?? 

const BASE_URL = 'https://api.airtable.com/v0/appw87dXqaC1qljNj/tblJt2K6UNrTM5K4I' // reports table

const getReport = async (reportId) => {
    try {
        const res = await fetch(BASE_URL + '/' + reportId, {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`
            }
        })
        const data = await res.json()
        return data  
    } catch (err) {
        console.log(err)
    }    
}

// probably no reason to use this in final version
const getAllReports = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`
            }
        })
        const data = await res.json()
        return data.records // airtable returns {'records': [....]}   
    } catch (err) {
        console.log(err)
    }
}

const createReport = async (repoURL, projectType, reportData) => { 
    // copying from GA example
    try {
        const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`
          },
          body: JSON.stringify({
            'fields': {
                'RepoURL': repoURL,
                'ProjectType': projectType,
                'ReportData': JSON.stringify(reportData), // use another JSON.stringify ??
            }
          })
        })
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

const updateReport = async (reportId, reportData) => {
    // override the full reportData field entry each time
    try {
        const res = await fetch(BASE_URL + '/' + reportId, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`
            },
            body: JSON.stringify({
                'fields': {
                    'ReportData': JSON.stringify(reportData),
                }
              })            
        })
        const data = await res.json()
        return data  
    } catch (err) {
        console.log(err)
    }  
}

const deleteReport = async (reportId) => {
    // airtable will return { "deleted": true, "id": "recordId" }
    try {
        const res = await fetch(BASE_URL + '/' + reportId, {
            method: 'Delete',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`
            }
        })
        const data = await res.json()
        return data  
    } catch (err) {
        console.log(err)
    }     
}

// todo, version when tie to candidate
const getAllReportsforCandidate = () => {
}

export {
    getReport,
    getAllReports,
    createReport,
    updateReport,
    deleteReport
}