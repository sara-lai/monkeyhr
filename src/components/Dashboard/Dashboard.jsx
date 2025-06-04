import { useState, useEffect } from 'react'

import * as AirtableService from '../../services/AirtableService'

import { Card, Divider, CardContent } from '@mui/material';

import './Dashboard.css'

// put in own folder later??
const ReportSummary = (props) => {
  return (
    <>
      <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, minHeight: 80, mb: 2, width: '100%' }}>
        <span>{props.report.fields.RepoURL}</span>
        <span>{props.report.fields.ProjectType}</span>        
        <button>view report</button>
      </Card>
    </>
  )
}

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
        <div className='dashboard-wrapper'>
          <div className='new-report-section'>
            <h3>Latest Report</h3>
          </div>
          <div className='previous-report-section'>
            <h3>Previous Reports</h3>
            <div className='reports-summary-box'>
              {allReports.map(report => (
                  <ReportSummary report={report} />
              ))}
            </div>
          </div>              
        </div>
      </>
    )
}

export default Dashboard