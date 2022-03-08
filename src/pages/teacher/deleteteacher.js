import React, { Component } from 'react'
import { BASE_URL } from '../../config'
import { filter } from '../../functions/functions'
import Spinner from '../../components/spinner/Spinner'
import ListTable from '../../components/table/ListTable'

class DeleteTeacher extends Component {
    constructor() {
        super()

        this.state = {
            department:'',
            deptList:[],
            teacherList:[],
            loading:true
        }
    }

    setDeptList = data => { this.setState({ deptList: data }) }

    init = () => {
        fetch(BASE_URL + 'api/get/departments.php')
        .then(response => response.json())
        .then(data => { 
            this.setDeptList(data)
            this.setState({
                department: data[0].dept
            })

            fetch(BASE_URL + 'api/get/teachers.php?dept='+data[0].dept)
            .then(response => response.json())
            .then(data => { this.setState({ teacherList: data, loading: false }) })    
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

    componentDidMount = () => {
        this.init()
    }

    handleChange = event => {
        this.setState({loading: true})
        const { name, value } = event.target
        
        let setLoad = true;
        if(name === "department") {
            setLoad = false;
            fetch(BASE_URL + 'api/get/teachers.php?dept='+value)
            .then(response => response.json())
            .then(data => { this.setState({ teacherList: data, loading: false }) })
        }

        this.setState({ [name]:value })
        if(setLoad) this.setState({loading: false})
    }

    handleSubmit = event => {
        event.preventDefault()
    }

    deleteSelectedDepartment = () => {
        this.setState({loading: true})
        fetch(BASE_URL + 'api/delete/department.php?dept='+this.state.department)
        .then(response => response.text())
        .then(data => {
            alert(data)
            this.init()
        })
        .catch(error => {
            this.setState({loading: false})
            alert("Failed to Delete \n" + error)
        })
    }


    deleteTeacher = id => {
        this.setState({loading: true})

        fetch(BASE_URL + 'api/delete/teacher.php?id='+id)
        .then(response => response.text())
        .then(data => {
            alert(data)
            fetch(BASE_URL + 'api/get/teachers.php?dept='+this.state.department)
            .then(response => response.json())
            .then(data => { this.setState({ teacherList: data,loading: false }) })
        })
        .catch(error => {
            this.setState({loading: false})
            alert("Failed to Delete \n" + error)
        })
    }

    deleteAllTeacher = () => {
        this.setState({loading: false})

        fetch(BASE_URL + 'api/delete/teacher.php?dept='+this.state.department)
        .then(response => response.text())
        .then(data => {
            alert(data)
            fetch(BASE_URL + 'api/get/teachers.php?dept='+this.state.department)
            .then(response => response.json())
            .then(data => { this.setState({ teacherList: data, loading: false }) })
            .catch(error => {
                this.setState({loading: false})
                alert("Error : " + error)
            })
        })
        .catch(error => {
            this.setState({loading: false})
            alert("Failed to Delete \n" + error)
        })
    }

    render() {

        const departments = filter(this.state.deptList,item => <option key={item.dept} > { item.dept } </option>)
        const teachers = filter(this.state.teacherList,item => {
            return (
                <tr key={'teacher:' + item.name} >
                    <td>{ item.name }</td>
                    <td><button onClick={ () => { this.deleteTeacher(item.id) } }  type="button" className="btn btn-danger">Delete Teacher</button></td>
                </tr>
            )
        })

        return(
            <div className="container-fluid" >
                { this.state.loading && <Spinner/> }
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto my-5">
                            <h4 className="display-4 text-center" >Delete Teacher </h4>
                        </div>
                    </div>
                    <div className="row" >
                    <ListTable 
                        name="Teacher" 
                        perPage="5" 
                        action= {
                            <th className="d-flex" scope="col">
                            <div className="mr-3 mb-0" >
                                <span > Dept  </span> 
                                <select className="h-100 ml-3"  name="department" value={this.state.department} onChange={this.handleChange} > 
                                    {departments}
                                </select> 
                            </div>
                            <div className="mb-0" >
                                <button onClick={this.deleteSelectedDepartment} className="btn btn-danger">Delete Selected Department</button>
                            </div>
                            </th>
                        }
                        lastRow={
                        <tr>
                            <td> All Teachers </td>
                            <td><button onClick={this.deleteAllTeacher} className="btn btn-danger">Delete All Teachers</button></td>
                        </tr>
                        }
                        > 
                        {teachers}
                    </ListTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteTeacher