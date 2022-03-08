import React, { Component } from 'react'
import { BASE_URL } from '../../config'
import './pass.css'
import Spinner from '../../components/spinner/Spinner'

class changePassword extends Component  {
    constructor() {
        super()
        this.state = {
            oldpass:'',
            newpass1:'',
            newpass2:'',
            loading:false
        }
    }

    changeHandler = event => {
        const {name,value} = event.target
        this.setState({[name]:value})
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({loading:true})
        fetch(BASE_URL + 'api/update/password.php',{
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify( this.state )
        })
        .then(response => response.text())
        .then(data => {
            alert(data)
            this.setState({loading:false})
        })
        .catch(error => {
            alert("Error : " + error)
            this.setState({loading:false})
        })
    }

    componentDidMount() {
        window.$(document).ready(function(){
            window.$('.pass_show').append('<span class="ptxt">Show</span>');  
        });
        window.$(document).on('click','.pass_show .ptxt', function(){ 
            window.$(this).text(window.$(this).text() == "Show" ? "Hide" : "Show"); 
            window.$(this).prev().attr('type', function(index, attr){return attr == 'password' ? 'text' : 'password'; }); 
        });    
    }

    render() {
        return(
            <div className="container">
                {this.state.loading && <Spinner/>}
                <div className="row">
                    <div className="col-sm-4 mx-auto mt-5">
                        <form onSubmit={this.handleSubmit} method="post" >
                            <label>Current Password</label>
                            <div className="form-group pass_show"> 
                                <input onChange={this.changeHandler} value={this.state.oldpass} name="oldpass" type="password" className="form-control" placeholder="Current Password"/> 
                            </div> 
                            <label>New Password</label>
                            <div className="form-group pass_show"> 
                                <input onChange={this.changeHandler} value={this.state.newpass1} name="newpass1" type="password" className="form-control" placeholder="New Password"/> 
                            </div> 
                            <label>Confirm Password</label>
                            <div className="form-group pass_show"> 
                                <input onChange={this.changeHandler} value={this.state.newpass2} name="newpass2" type="password" className="form-control" placeholder="Confirm Password"/> 
                            </div> 
                            <button type="submit" className="btn btn-primary btn-block" > Update Password  </button>
                        </form>
                    </div> 
                </div>
            </div>
        )
    }
}

export default changePassword

