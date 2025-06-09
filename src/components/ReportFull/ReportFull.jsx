import { useState, useEffect } from 'react'
import { useParams } from 'react-router';

import * as AirtableService from '../../services/AirtableService'

import FlagIcon from '@mui/icons-material/Flag';

// todo - a GET to airtable may be more appropriate than passing allReports and filtering by id.

const ReportFull = (props) => {

    const { reportId } = useParams() // see pokemon lab
    const [report, setReport] = useState({})

    // GET to airtable (vs. allReports/filtering - see graveyard)
    async function getReport() {
        const report = await AirtableService.getReport(reportId)
        const reportDataObj = JSON.parse(report.fields.ReportData)
        setReport(reportDataObj)
    }        
    useEffect(() => {
        getReport()
    }, [])

    return (
        <>
            {Object.keys(report).map(category => (
                <div className='category-set'>
                    <h3>{category}</h3>
                    <div className='tests-set'>
                        {report[category].map(test => (
                            <div className='test-block'>
                                <p>{test.testDescription}</p>
                                <FlagIcon sx={{ color: test.resultFlag, p: .5 }} /> 
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
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