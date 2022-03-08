import React,{ Component } from 'react'
import { filter } from '../../functions/functions'
import { BASE_URL } from '../../config'
import Modal from '../../components/modal/modal'
import ModalButton from '../../components/modal/modalButton'
import Spinner from '../../components/spinner/Spinner'

class AddTeacher extends Component {
    constructor() {
        super()
        this.state = {
            teacher:'',
            dept:'',
            department:'',
            deptList:[],
            loading: true
        }
    }

    setDeptList = data => { this.setState({ deptList: data }) }

    componentDidMount = () => {
        fetch(BASE_URL + 'api/get/departments.php')
        .then(response => response.json())
        .then(data => { 
            this.setDeptList(data)
            if(data.length)
            this.setState({dept: data[0].dept})
            this.setState({loading: false})
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
            teacher: this.state.teacher,
            dept: this.state.dept
        }

        fetch(BASE_URL + 'api/set/newteacher.php',{
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
            alert('Failed to Add New Teacher : \n' + err)
        })
    }

    handleModalSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})

        const FormData = {
            department: this.state.department
        }

        fetch(BASE_URL + 'api/set/newdepartment.php',{
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
            fetch(BASE_URL + 'api/get/departments.php')
            .then(response => response.json())
            .then(data => { 
                this.setDeptList(data)
                this.setState({dept: data[0].dept})
                this.setState({loading: false})
            })
        })
        .catch(err => { 
            this.setState({loading: false})
            alert('Failed to Add New Department : \n' + err)
        })
    }


    render() {
        const departments = filter(this.state.deptList,item => <option key={item.dept} > { item.dept } </option>)

        return(
            <div>
                { this.state.loading && <Spinner /> }           

                <Modal title="Add Teacher" onSubmit={this.handleModalSubmit} >
                    <label htmlFor="department" >Department Name : </label>
                    <input onChange={this.handleChange} value={this.state.department} name="department" type="text" className="form-control" id="department" placeholder="Department Name" />
                </Modal>
                <div className="container-fluid" >
                    <div className="container my-5 px-5" >
                        <h1 className="display-4 text-center">Add Teacher</h1>
                        <form onSubmit={ this.handleSubmit } className="px-5" method="POST" >
                        <div className="form-group">
                            <label htmlFor="teacher"> Teacher Name </label>
                            <input onChange={ this.handleChange } value={ this.state.teacher } type="text" className="form-control" id="teacher" name="teacher" placeholder="Alex" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dept"> Department </label>
                            <div className="d-flex" >
                                <select onChange={ this.handleChange } value={ this.state.dept } className="form-control" name="dept" id="dept" required >
                                    {departments}
                                </select>
                                <ModalButton type="button" className="btn btn-dark" style={{width:"12rem", marginLeft:"20px" }}  > Add Department </ModalButton>
                            </div>
                        </div>
                        <input className="btn btn-danger btn-block" type="submit" value="Add Teacher" />
                        </form>
                    </div>
                </div>
            </div>)
    }
}

export default AddTeacher