import pointer from '../images/gpsPointer.jpg'

const ConfirmModal = props => {

    const { location, handleModal } = props
    return(
        <div className="modal--container">
            <img src={pointer} className="modal--pointer"/>
            <h1 className="modal--text">
                "{location.location}" <br/>added to: My locations
            </h1>
            <button 
            onClick={handleModal}
            className="modal--button">
                Continue
            </button>
        </div>
    )
}

export default ConfirmModal