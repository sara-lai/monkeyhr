import './report.css'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'

import * as AirtableService from '../../services/AirtableService'

import FlagIcon from '@mui/icons-material/Flag'
import CloseIcon from "@mui/icons-material/Close"

const ReportFull = (props) => {

    const { reportId } = useParams() // see pokemon lab
    const [report, setReport] = useState({})
    const [updating, setUpdating] = useState(false)

    const navigate = useNavigate()

    // GET to airtable (vs. allReports/filtering - see graveyard)
    async function getReport() {
        const report = await AirtableService.getReport(reportId)
        const reportDataObj = JSON.parse(report.fields.ReportData)
        setReport(reportDataObj)
    }        
    useEffect(() => {
        getReport()
    }, [])

    async function deleteReport(){
        const report = await AirtableService.deleteReport(reportId) // dont really need to do anything else with response?
        navigate('/dashboard')
    }

    async function updateReport(category, testId){
        // tricky, this needs to iterate the report obj and remove the clicked test 
        let reportDataNew = structuredClone(report) // shallow vs deep copying

        // format: {"commmits": [{test1}, {test2}...etc], "iteration": [test3, {test3}...etc] ...etc}
        reportDataNew[category] = reportDataNew[category].filter(test => test.id !== testId) // filter+update a test in a category key

        setReport(reportDataNew) // putting this before the API call so get immediate UI response

        await AirtableService.updateReport(reportId, reportDataNew)
    }

    // todo - ordering of categories is getting scrambled
    return (
        <div className='report-wrapper'>
            <div className='report-container'>
                <div className='sidebar'>
                    <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                    <button onClick={deleteReport}>Delete Report</button>
                    <button onClick={() => setUpdating(true)}>Edit Report</button>
                    <button>Download</button>
                </div>
                <div className='the-report'>
                    {updating && <button className='editing-done' onClick={() => setUpdating(false)}>
                        Done
                    </button>}
                    {Object.keys(report).map(category => (
                        <div className='category-set' key={category}>
                            <h2>{category}</h2>
                            <div className='tests-set'>
                                {report[category].map(test => (                                                                            
                                    <div className='test-block' key={test.id}>
                                        {updating && <CloseIcon  
                                            sx={{ cursor: "pointer", position: "absolute", right: "5%", top: "40%", fontSize: "1.5rem" }} 
                                            onClick={() => updateReport(category, test.id)} 
                                        />}
                                        <div className='test-info'>
                                            <p>{test.testDescription}</p>
                                            <p>{test.resultDescription}</p>
                                        </div>
                                        <FlagIcon sx={{ color: test.resultFlag, p: .5, fontSize: "2rem" }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>                
            </div>
        </div>
    )
}

export default ReportFull

/* Graveyard 

old approach passing in AllReports:
const report = props.allReports.find(report => report.id === reportId)
let reportDataObj = {}
if (report){
    reportDataObj = JSON.parse(report.fields.ReportData)
}

*/