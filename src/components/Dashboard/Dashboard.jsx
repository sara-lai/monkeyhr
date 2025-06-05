import { useState, useEffect } from 'react'

import * as AirtableService from '../../services/AirtableService'

import { Card, Divider, CardContent, Box } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';

import './Dashboard.css'

// todo -  currently dashboard is getting all data from airtable, but to get latest report probably needs props!

const LatestReportSummary = () => {
  const categories = ['Commits', 'Iteration', 'Code Choices', 'Code Style', 'Artefacts', 'AI Assessment']

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 8, minHeight: 300 }}>
      <div className='categories-flags'>
        {categories.map((category) => (
          <div className='category-flag-set'>
            <span>{category}</span>
            <FlagIcon sx={{ color: 'green' }} /> 
          </div>
        ))}
      </div>
    </Card>    
  )
}

// put in own folder later??
// ok the sx={{}} is getting ridiculous .... is this worth it? what's wrong with css?
const ReportSummary = (props) => {
  return (
    <>
      <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, minHeight: 60, mb: 2, width: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 6, cursor: 'pointer', }, '&:focus': {outline: '2px solid #90caf9'} }}>
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
            <LatestReportSummary />
          </div>
          <div className='previous-report-section'>
            <h3>All Reports</h3>
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