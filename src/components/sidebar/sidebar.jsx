import React, { Component } from 'react'
import SidebarMenu from './sidebarmenu'
import SidebarHeader from './sidebarheader'
import Logo from '../../assets/logo.png'
import './sidebar.css'

class Sidebar extends Component {
    render() {
        return(
                <div className="page-wrapper chiller-theme toggled">
                <a id="show-sidebar" className="btn btn-sm btn-dark" href={void(0)} > <i className="fas fa-bars"></i></a>
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">
                        <SidebarHeader logo={Logo} title="SPN" subtitle="College" userType="Administrator" status="Online" />
                        <SidebarMenu/>
                    </div>
                </nav>
                <main className="page-content">
                    { this.props.children }
                </main>
            </div>)
    }
}

export default Sidebar;