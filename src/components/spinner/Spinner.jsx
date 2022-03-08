import React from 'react'

function Spinner(props) {

    const color = props.white ? "#fafafa":"#fafafa55"

    const OVERLAY = {
        position:'fixed',
        width:'100vw',
        height:'100vh',
        background: color,
        zIndex:'9999',
        top:'0px',
        left:'0px'
    }

    const SPINNER = {
        display:'block',
        margin: 'auto',
        position:'relative',
        top: '50%',
        left: '0',
        right: '0',
        transform: 'translateY(-50%)',
        width:'max-content'
    }

    return (
        <div style={OVERLAY} >
            <span style={SPINNER} >
            <div className="spinner-border text-primary"></div>
            </span>
        </div>
    )
}

export default Spinner