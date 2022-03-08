import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class sidebar extends Component {


    componentDidMount = () => {
        window.jQuery(function ($) {
            $(".sidebar-dropdown > a").click(function() {
            $(".sidebar-submenu").slideUp(200);
                if (
                $(this)
                .parent()
                .hasClass("active")
                ) {
                    $(".sidebar-dropdown").removeClass("active");
                    $(this)
                    .parent()
                    .removeClass("active");
                } else {
                    $(".sidebar-dropdown").removeClass("active");
                    $(this)
                    .next(".sidebar-submenu")
                    .slideDown(200);
                    $(this)
                    .parent()
                    .addClass("active");
                }
            });
        
            $("#close-sidebar").click(function() {
            $(".page-wrapper").removeClass("toggled");
            });
            $("#show-sidebar").click(function() {
            $(".page-wrapper").addClass("toggled");
            });
        });    
    }

    render() {
        return (
            <div className="sidebar-menu">
            <ul>
            <li className="header-menu">
                <span>General</span>
            </li>
            <li>
                <Link to="/">
                    <i className="fa fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </Link>
            </li>
            <li className="sidebar-dropdown">
                <a href={void(0)} >
                <i className="fa fa-users"></i>
                <span>Teachers & Departments</span>
                </a>
                <div className="sidebar-submenu">
                <ul>
                    <li><Link to="/addteacher">Add</Link></li>
                    <li><Link to="/editteacher">Edit</Link></li>                
                    <li><Link to="/deleteteacher">Delete</Link></li>
                </ul>
                </div>
            </li>
            <li className="sidebar-dropdown">
                <a href={void(0)} >
                <i className="fa fa-book"></i>
                <span>Subjects & Classes</span>
                </a>
                <div className="sidebar-submenu">
                <ul>
                    <li><Link to="/addsubject">Add</Link></li>
                    <li><Link to="/editsubject">Edit</Link></li>
                    <li><Link to="/deletesubject">Delete</Link></li>
                </ul>
                </div>
            </li>
            <li className="sidebar-dropdown">
                <a href={void(0)} >
                <i className="fa fa-table"></i>
                <span>Time Table</span>
                </a>
                <div className="sidebar-submenu">
                <ul>
                    <li><Link to="/addtable">Add New</Link></li>
                    <li><Link to="/edittable">Edit</Link></li>
                    <li><Link to="/deletetable">Delete</Link></li>
                </ul>
                </div>
            </li>
            <li className="sidebar-dropdown">
                <a href={void(0)} >
                <i className="fa fa-download"></i>
                <span>Export TimeTable</span>
                </a>
                <div className="sidebar-submenu">
                <ul>
                    <li><Link to="/exportall">Export All</Link></li>
                    <li><Link to="/exportone">Export One</Link></li>
                    <li><Link to="/exportcustom">Export Custom</Link></li>
                </ul>
                </div>
            </li>
            <li className="header-menu">
                <span>Extra</span>
            </li>
            <li>
                <Link to="/labmanagement">
                    <i className="fa fa-flask"></i>
                    <span>Lab Management</span>
                </Link>
            </li>
            <li>
                <Link to="/changepass">
                    <i className="fa fa-key"></i>
                    <span>Change Password</span>
                </Link>
            </li>
            <li>
                <Link to="/logout">
                    <i className="fa fa-sign-out-alt"></i>
                    <span>Logout</span>
                </Link>
            </li>
            </ul>
        </div>
        )
    }
}