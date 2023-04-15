import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitems = (props) => {
    const context = useContext(noteContext)
    const {deleteNote } = context
    const { allnote, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex align-items-center justify-content-between'>
                        <h5 className="card-title">{allnote.title}</h5>
                        <div>
                            <i className="fas fa-trash-alt mx-2" onClick = {()=>{deleteNote(allnote._id); props.showAlert("Deleted successfully","success")}} ></i>
                            <i className="fas fa-edit mx-2" onClick={()=>{updateNote(allnote)}} ></i>
                        </div>
                    </div>
                    <p className="card-text">{allnote.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitems
