import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import { filter } from '../../functions/functions'
import { BASE_URL } from '../../config'
import Modal from '../../components/modal/modal'
import ModalButton from '../../components/modal/modalButton'
import Spinner from '../../components/spinner/Spinner'
import ListTable from '../../components/table/ListTable'

class EditTeacher extends Component {
    constructor() {
        super()
        this.state = {
            teacher:'',
            dept:'',
            department:'',
            updateDepartment:'',
            deptList:[],
            teacherList:[],
            loading:true
        }
    }

    setDeptList = data => { this.setState({ deptList: data }) }

    componentDidMount = () => {
        fetch(BASE_URL + 'api/get/departments.php')
        .then(response => response.json())
        .then(data => { 
            this.setDeptList(data)
            this.setState({
                department: data[0].dept
            })

            fetch(BASE_URL + 'api/get/teachers.php?dept='+data[0].dept)
            .then(response => response.json())
            .then(data => { 
                this.setState({ loading: false, teacherList: data })                 
            })
            .catch(error => {
                this.setState({loading: false})
                alert("Error : " + error)
            })
        })
    }
    
    handleChange = event => {
        this.setState({loading: true})
        const { name, value } = event.target
        
        let setLoad = true
        if(name === "department") {
            setLoad = false
            fetch(BASE_URL + 'api/get/teachers.php?dept='+value)
            .then(response => response.json())
            .then(data => { 
                this.setState({ teacherList: data, loading: false }) 
            })
            .catch(error => {
                this.setState({loading: false})
                alert("Error : " + error)
            })
            this.setState({ updateDepartment: value })
        }

        this.setState({ [name]:value })
        if(setLoad) this.setState({loading: false})
    }

    handleModalSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})

        const FormData = {
            department: this.state.updateDepartment,
            prevdept: this.state.department
        }

        fetch(BASE_URL + 'api/update/department.php',{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(FormData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data)
            fetch(BASE_URL + 'api/get/departments.php')
            .then(response => response.json())
            .then(data => { 
                this.setDeptList(data)
                this.setState( prevState => {
                    return {department: prevState.updateDepartment}
                })

                document.getElementById('modal_close').click()
                this.setState({loading: false})
            })
            .catch( error => {
                this.setState({loading: true})
                alert("Error : " + error)
            })
        })
        .catch(err => {
            this.setState({loading: false})
            alert('Failed to Update Department : \n' + err)
        })
    }

    render() {
        const departments = filter(this.state.deptList,item => <option key={item.dept} > { item.dept } </option>)
        const teachers = filter(this.state.teacherList,item => {
            return (
                <tr key={'teacher:' + item.name} >
                    <td>{ item.name }</td>
                    <td><Link to={ "/updateteacher/" + item.id} ><button type="button" className="btn btn-primary">Edit Teacher</button></Link></td>
                </tr>
            )
        })

        return(
            <div>
                {this.state.loading && <Spinner/> }
                <Modal title="Edit Department" onSubmit={this.handleModalSubmit} >
                    <label htmlFor="department" >Department Name : </label>
                    <input onChange={this.handleChange} value={this.state.updateDepartment} name="updateDepartment" type="text" className="form-control" id="department" placeholder="Department Name" />
                </Modal>
                <div className="row" >
                <ListTable 
                        name="Teacher" 
                        perPage="5" 
                        action= {
                            <th className="d-flex" scope="col">
                            <form method="get" className="mr-3 mb-0" >
                                <span > Dept  </span> 
                                <select value={this.state.department} className="h-100 ml-3"  name="department" onChange={this.handleChange} > 
                                    {departments}
                                </select> 
                            </form>
                                <input type="hidden" name="deldpt" value={this.state.dept} />
                                <ModalButton type="submit" className="btn btn-primary">Edit Selected Department</ModalButton> 
                            </th>
                        }> 
                        {teachers}
                    </ListTable>
                </div>
            </div>)
    }
}

export default EditTeacher