import React from 'react'

const sidebarheader = ({logo, title, subtitle, userType,status}) => (
    <div>
        <div className="sidebar-brand">
            <a href={void(0)} >Dashboard</a>
            <div id="close-sidebar">
            <i className="fas fa-times"></i>
            </div>
        </div>
        <div className="sidebar-header">
            <div className="user-pic">
                <img className="img-responsive img-rounded" src={logo} alt="User picture" />
            </div>
            <div className="user-info">
                <span className="user-name">{title}<strong>{subtitle}</strong></span>
                <span className="user-role">{userType}</span>
                <span className="user-status">
                    <i className="fa fa-circle"></i>
                    <span>{status}</span>
                </span>
            </div>
        </div>
    </div>)

export default sidebarheader
