const ProcessingScreen = (props) => {

    function formatDate(date_raw){
        const date = new Date(date_raw);
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    }

    return (
        <div className="processing-container">
            <h2>Processsing.... (estimated time: 2 minutes)</h2>
            <h2>{props.repoURL} </h2>
            <p>Project type: {props.repoData.language}, Created: {formatDate(props.repoData.created_at)}</p>
            <p>Analyzing commits (5+ factors)...</p>
            <p>Assessing iteration (4+ factors)...</p>
            <p>Reviewing code choices (4+ factors)...</p>
            <p>Cross-checking with AI...</p>
        </div>
    )

}

export default ProcessingScreen