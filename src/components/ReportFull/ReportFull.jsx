import { useParams } from 'react-router';

// todo - a GET to airtable may be more appropriate than passing allReports and filtering by id.

const ReportFull = (props) => {

    const { reportId } = useParams() // see pokemon lab

    const report = props.allReports.find(report => report.id === reportId)

    let reportDataObj = {}
    if (report){
        reportDataObj = JSON.parse(report.fields.ReportData)
    }
    
    return (
        <>
            {Object.keys(reportDataObj).map(category => (
                <div className='category-set'>
                    <h3>{category}</h3>
                    <div className='tests-set'>
                        {reportDataObj[category].map(test => (
                            <div className='test-block'>
                                <p>{test.description}</p>
                                <p>result: flag-icon</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
}

export default ReportFull