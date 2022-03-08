import React, { Component } from 'react'
import { ReactComponent as Left } from './left.svg'
import { ReactComponent as Icon } from './icon.svg'
import { ReactComponent as Icon2 } from './icon2.svg'
import './style.css'
import { BASE_URL,AUTH_TYPE } from '../../config'
import Spinner from '../../components/spinner/Spinner'

class Login extends Component  {
    constructor() {
        super()
        
        this.state = {
            uname: '',
            password: '',
            loading: false
        }
    }

    handleChange = event => {
        const {name,value} = event.target
        this.setState({ [name]:value })
    }

    checkAuth = () => {
        fetch(BASE_URL + 'api/authstatus.php',{ credentials: AUTH_TYPE })
        .then(response => response.text())
        .then(rdata => {
            if(rdata === "true") {
                this.props.setLogin({login:true})
            } else {
                this.props.setLogin({login:false})
            }
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})

        const data = {
            uname: this.state.uname,
            password: this.state.password
        }

        fetch(BASE_URL + 'api/login.php',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
            },
            credentials: AUTH_TYPE,
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
                alert(data)
                this.checkAuth()
                this.setState({loading: false})
            }
        )
        .catch(error => {
            alert("Error : " + error)
            this.setState({loading: false})
        })

    }

    componentDidMount = () => {
        this.checkAuth()
    }

    render() {
        return(
    <div className="form_login" id="login_form" >
        { this.state.loading && <Spinner/> }
        <div className="session">
            <div className="left">
                <Left />
            </div>
            <form onSubmit={this.handleSubmit} method="POST" action="" className="log-in" autoComplete="off"> 
            <h4>Admin Panel <span> SPN College </span></h4>
            <p>Welcome back! Log in to your account to view dashboard:</p>
            <div className="floating-label">
                <input value={this.state.uname} onChange={this.handleChange} placeholder="Username" type="text" name="uname" id="uname" autoComplete="off"/>
                <label htmlFor="uname">Username:</label>
                <div className="icon">
                    <Icon/>
                </div>
            </div>
            <div className="floating-label">
                <input value={this.state.password} onChange={this.handleChange} placeholder="Password" type="password" name="password" id="password" autoComplete="off"/>
                <label htmlFor="password">Password:</label>
                <div className="icon">          
                    <Icon2/>
                </div>
            </div>
            <button type="submit" >Log in</button>
            <a href="#" className="discrete" target="_blank"></a>
            </form>
        </div>        
    </div>)
    }
}

export default Login