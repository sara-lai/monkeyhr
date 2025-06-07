import { useState, useEffect } from 'react'
import { Link } from 'react-router';
import { Route, Routes } from 'react-router'

import * as AirtableService from '../../services/AirtableService'
import ReportFull from '../ReportFull/ReportFull';

import { Card, Divider, CardContent, Box } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';

import './Dashboard.css'

// todo -  currently dashboard is getting all data from airtable, but to get latest report probably needs props!

const LatestReportSummary = () => {
  
  const reportStats = [
    {'id': 'commits', 'display': 'Commits', 'flags': [2,2,2,2,2] },
    {'id': 'iteration', 'display': 'Iteration', 'flags': [1,2,2,1,2] },
    {'id': 'code-choices', 'display': 'Code Choices', 'flags': [2,2,1,2,2,2] },
    {'id': 'code-style', 'display': 'Code Style', 'flags': [1,2,2] },
    {'id': 'artefacts', 'display': 'Artefacts', 'flags': [1,2,2,2] },
    {'id': 'ai-assessment', 'display': 'AI Assessment', 'flags': [2,2,2,2,2] },
  ]

  const flagColorKeys = { 0: 'red', 1: 'yellow', 2: 'green'}

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 4, minHeight: 300 }}>
      <div className='categories-flags'>
        {reportStats.map((category) => (
          <div className='category-flag-set'>
            <span>{category.display}</span>
            <div class='flags-row'>
              {category.flags.map(flag => (
                <FlagIcon sx={{ color: flagColorKeys[flag], p: .5 }} /> 
              ))}    
             </div>        
          </div>
        ))}
        <Divider sx={{ my: 2 }} />
        <div className='latest-report-bottomline'>
          <span>Overall: very minor concern</span>        
          <button>view report</button>
        </div>
      </div>
    </Card>    
  )
}

// put in own folder later??
// ok the sx={{}} is getting ridiculous .... is this worth it? what's wrong with css?
const ReportSummary = (props) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, minHeight: 60, mb: 2, width: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 6, cursor: 'pointer', }, '&:focus': {outline: '2px solid #90caf9'} }}>
      <span>{props.report.fields.RepoURL}</span>
      <span>{props.report.fields.ProjectType}</span>
      <button>view report</button>      
    </Card>
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
      <div className='dashboard-wrapper'>
        <div className='new-report-section'>
          <h3>Latest Report</h3>
          <LatestReportSummary />
        </div>
        <div className='previous-report-section'>
          <h3>All Reports</h3>
          <div className='reports-summary-box'>
            {allReports.map(report => (
                <Link to={`reports/${report.id}`}>
                  <ReportSummary report={report} />
                </Link>
            ))}
          </div>
        </div>              
        <Routes>
          <Route path="reports/:reportId" element={<ReportFull allReports={allReports} />} />
        </Routes>        
      </div>
    )
}

export default Dashboard