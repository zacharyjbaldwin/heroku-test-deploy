const TutorCard = props => {

    const onFavorite = () => {
        alert('501 not implemented - (.../frontend/components/TutorList/TutorCard.js)');
    };

    return (
        <div className="card" style={{ height: '100%' }}>
            <img className="card-img-top" src={props.tutor.profilePictureUrl} alt={`${props.tutor.firstName} ${props.tutor.lastName}`}></img>
            <div className="card-body d-flex flex-column justify-content-between">
                <div className="d-flex flex-column mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{props.tutor.firstName} {props.tutor.lastName}</h5>
                        <i className="fa-regular fa-star" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={onFavorite}></i>
                    </div>
                    <span className="text-muted mb-1">{props.tutor.aboutMe}</span>
                    <span className="text-muted mb-1">
                        <strong>Skills:</strong> {props.tutor.skills.join(', ')}
                    </span>
                </div>
                <button className="btn btn-success col-12">Schedule an appointment</button>
            </div>
        </div>
    );
};

export default TutorCard;