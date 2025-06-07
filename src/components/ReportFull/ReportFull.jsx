
const ReportFull = (props) => {

    return (
        <>
            {Object.keys(props.data).map(category => (
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