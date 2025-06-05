import './Processor.css'

const ProcessingScreen = (props) => {

    function formatDate(date_raw){
        const date = new Date(date_raw);
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    }

    return (
        <div className="processing-wrapper">
            <h2>Processsing.... (estimated time: 2 minutes)</h2>
            <h2>{props.repoURL} </h2>
            <p>Project type: {props.repoData.language}, Created: {formatDate(props.repoData.created_at)}</p>
            <p>Reviewing commits...</p>
            <p>Reviewing iteration...</p>
            <p>Reviewing code choices...</p>
            <p>Reviewing code style...</p>
            <p>Reviewing artefacts...</p>
            <p>Cross-checking with AI...</p>
            <p>Checking for mitigating factors...</p>
        </div>
    )

}

export default ProcessingScreen