


const ConfirmDeleteModal = props => {

    const {handleModal} = props
    return(
        <div className="delete--modal-container">
            <h1>
                Location Successfully Deleted
            </h1>
            <button
            className="delete--modal-button"
            onClick={handleModal}
            >
                OK
            </button>
        </div>
    )
}

export default ConfirmDeleteModal