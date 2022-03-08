import React,{ Component } from 'react'
import { filter } from '../../functions/functions'
import { BASE_URL } from '../../config'
import Modal from '../../components/modal/modal'
import ModalButton from '../../components/modal/modalButton'
import Spinner from '../../components/spinner/Spinner'

class AddSubject extends Component {
    constructor() {
        super()
        this.state = {
            teacher:'',
            class:'',
            subject:'',
            className:'',
            department:'',
            classList:[],
            deptList:[],
            loading: true
        }
    }

    setClassList = data => { this.setState({ classList: data,class: data[0].class }) }
    setDeptList = data => { this.setState({ deptList: data,department: data[0].dept }) }

    componentDidMount = () => {
        fetch(BASE_URL + 'api/get/departments.php')
        .then(response => response.json())
        .then(data => { 
            this.setDeptList(data)
            fetch(BASE_URL + 'api/get/classes.php')
            .then(response => response.json())
            .then(data => { 
                if(data.length) {
                    this.setClassList(data)
                    //this.setState({class: data[0].class})
                } else {
                    throw "Please Add an Class Before Performing any action"
                }
                this.setState({loading: false})
            })
            .catch(error => {
                this.setState({loading: false})
                alert("Error : " + error)
            })
        })
        .catch(error => {
            this.setState({loading: false})
            alert("Error : " + error)
        })

    }
    
    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]:value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})

        const FormData = {
            subject: this.state.subject,
            class: this.state.class
        }

        fetch(BASE_URL + 'api/set/newsubject.php',{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(FormData)
        })
        .then(response => response.text())
        .then(data => {
            this.setState({loading: false})
            alert(data)
        })
        .catch(err => {
            this.setState({loading: false})
            alert('Failed to Add New Subject : \n' + err)
        })
    }

    handleModalSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})

        const FormData = {
            dept: this.state.department,
            className: this.state.className
        }

        fetch(BASE_URL + 'api/set/newclass.php',{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(FormData)
        })
        .then(response => response.text())
        .then(data => { 
            document.getElementById('modal_close').click()
            alert(data) 
            fetch(BASE_URL + 'api/get/classes.php')
            .then(response => response.json())
            .then(data => { 
                this.setClassList(data) 
                this.setState({loading: false})
            })    
        })
        .catch(err => {
            this.setState({loading: false})
            alert('Failed to Add New Class : \n' + err)
        })
    }

    render() {
        const departments = filter(this.state.deptList,item => <option key={item.dept} > { item.dept } </option>)
        const classes = filter(this.state.classList,item => <option key={item.class} > { item.class } </option>)

        return(
            <div>
                { this.state.loading && <Spinner/> }
                <Modal title="Add Class" onSubmit={this.handleModalSubmit} >
                    <label htmlFor="dept" >Department Name : </label>
                    <select onChange={ this.handleChange } value={ this.state.department } className="form-control" name="department" id="department" required >
                        {departments}
                    </select>
                    <label htmlFor="class" >Class Name : </label>
                    <input onChange={this.handleChange} value={this.state.className} name="className" type="text" className="form-control" id="className" placeholder="Class Name" />
                </Modal>
                <div className="container-fluid" >
                    <div className="container my-5 px-5" >
                        <h1 className="display-4 text-center">Add Subject</h1>
                        <form onSubmit={ this.handleSubmit } className="px-5" method="POST" >
                        <div className="form-group">
                            <label htmlFor="class"> Class </label>
                            <div className="d-flex" >
                                <select onChange={ this.handleChange } value={ this.state.class } className="form-control" name="class" id="class" required >
                                    {classes}
                                </select>
                                <ModalButton type="button" className="btn btn-primary" style={{width:"12rem", marginLeft:"20px" }}  > Add Class </ModalButton>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject"> Subject Name </label>
                            <input onChange={ this.handleChange } value={ this.state.subject } type="text" className="form-control" id="subject" name="subject" placeholder="English" required />
                        </div>
                        <input className="btn btn-danger btn-block" type="submit" value="Add Subject" />
                        </form>
                    </div>
                </div>
            </div>)
    }
}

export default AddSubject