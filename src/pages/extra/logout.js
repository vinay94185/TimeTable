import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { BASE_URL,AUTH_TYPE } from '../../config'

class Logout extends Component  {
    constructor() {
        super()
    }

    checkAuth = () => {
        fetch(BASE_URL + 'api/authstatus.php',{ credentials: AUTH_TYPE })
        .then(response => response.text())
        .then(rdata => {
            if(rdata === "true") {
                this.props.setLogin({login:true})
            } else {
                this.props.setLogin({login:false})
                this.props.history.push('/');
            }
        })
    }

    componentDidMount() {
        fetch(BASE_URL + 'api/logout.php',{ credentials: AUTH_TYPE })
        .then(response => response.text())
        .then(data => {
                alert(data)
                this.checkAuth()
            }
        )
    }

    render() {
        return(
            <div>
            </div>
        )
    }
}

export default withRouter(Logout)