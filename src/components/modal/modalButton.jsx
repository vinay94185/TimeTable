import React from 'react'

function modalButton(props) {
    return (
        <button {...props} data-toggle="modal" data-target="#Modal" > {props.children} </button>
    )
}

export default modalButton