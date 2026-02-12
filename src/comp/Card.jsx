

function JobCard({job}){

    return(
        <div className="job-card" key={job?.id}>
            <div className="job-details">
                <p>{job?.title}</p>
                <p>{job?.company}</p>
            </div>
            <div className="job-description">
                <p>{job?.location}</p>
                <p>{job?.type}</p>
            </div>
        </div>
    )
}

export default JobCard