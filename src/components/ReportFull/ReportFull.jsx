import { useParams } from 'react-router';

const ReportFull = (props) => {

    const { reportId } = useParams() // see pokemon lab

    const report = props.allReports.find(report => report.id === reportId)

    console.log("here at reportFull", props.allReports)

    return (
        <>
            {Object.keys(report.fields).map(category => (
                <div className='category-set'>
                    <h3>{category}</h3>
                    <div className='tests-set'>
                        {props.data[category].map(test => (
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