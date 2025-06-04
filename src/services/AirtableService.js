// ? will have to duplicate this for Candidates as well?? 

const BASE_URL = 'https://api.airtable.com/v0/appw87dXqaC1qljNj/tblJt2K6UNrTM5K4I' // reports table

const getReport = () => {
    console.log('getting a report...')
}

const getAllReports = () => {
    console.log('getting all report...')
}

const createReport = async (reportData) => {
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
                'RepoName': 'TESTING',
                'ReportData': JSON.stringify(reportData), // use another JSON.stringify ??
            }
          })
        })
        data = await res.json()
        console.log('data from Airtable create', data)
        return data
    } catch (err) {
        console.log(err)
    }
}

const updateReport = () => {
    console.log('udpate report...')
}

const deleteReport = () => {
    console.log('deleting report...')
}

export {
    getReport,
    getAllReports,
    createReport,
    updateReport,
    deleteReport
}