import { useState, useEffect } from 'react'

import * as AirtableService from '../../services/AirtableService'

import ReportSummary from '../ReportSummary/ReportSummary'

const Dashboard = () => {

    const [allReports, setAllReports] = useState([])

    async function getAllReports() {
        const reports = await AirtableService.getAllReports()
        setAllReports(reports)
    }    

    // loading all existing report summaries when visit dashboard
    useEffect(() => {
        getAllReports()
    }, [])

    console.log('here', allReports)

    return (
        <>
            <h1> Dashboard </h1>
            <h3>All Reports</h3>
            <div className='reports-summary-box'>
                <p>number of reports: {allReports.length}</p>
                {allReports.map(report => (
                    <ReportSummary report={report} />
                ))}
            </div>
        </>
    )
}

export default Dashboard