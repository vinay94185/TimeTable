import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand pl-5" to="/"> TimeTable Management System </Link>
        </nav>
    )
}

export default Navbar