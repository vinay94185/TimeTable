import React from 'react'

function Modal(props) {    
    const { onSubmit, title } = props
    return(
        <div className="modal" id="Modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title"> { title } </h5>
                    <button id="modal_close" type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={ onSubmit } >
                    <div className="form-group">
                        {props.children}
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}


export default Modal