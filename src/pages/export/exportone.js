import React, { Component } from 'react'
import { BASE_URL } from '../../config'
import { filter } from '../../functions/functions'
import './style.css'
import Spinner from '../../components/spinner/Spinner'

class ExportOneTable extends Component {
    constructor() {
        super()

        this.state = {
            classList:[],
            teacherList:[],
            roomList:[],
            deptList:[],
            class:'',
            teacher:'',
            room:'',
            dept:'',
            loading: true
        }
    }

    componentDidMount = () => {
        fetch(BASE_URL + 'api/get/classes_with_table.php')
        .then(reponse => reponse.json())
        .then(data => {
            this.setState({classList: data})
            fetch(BASE_URL + 'api/get/teachers.php')
            .then(reponse => reponse.json())
            .then(data => {
                this.setState({teacherList: data})
                fetch(BASE_URL + 'api/get/rooms.php')
                .then(reponse => reponse.json())
                .then(data => {
                    this.setState({roomList: data})
                    fetch(BASE_URL + 'api/get/departments.php')
                    .then(reponse => reponse.json())
                    .then(data => { 
                        this.setState({deptList: data, loading: false})
                    })
                    .catch(error => {
                        this.setState({loading:false})
                        alert("Error : " + error)
                    })            
                })
                .catch(error => {
                    this.setState({loading:false})
                    alert("Error : " + error)
                })        
            })
            .catch(error => {
                this.setState({loading:false})
                alert("Error : " + error)
            })    
        })
        .catch(error => {
            this.setState({loading:false})
            alert("Error : " + error)
        })

    }

    handleChange = event => {
        const {name,value} = event.target
        this.setState({ [name]:value })
    }

    render() {
        const departments = filter(this.state.deptList,item => <option key={item.dept} > { item.dept } </option>)
        const teachers = filter(this.state.teacherList,item => <option key={item.name} > { item.name } </option>)
        const rooms = filter(this.state.roomList,item => <option key={item.room} > { item.room } </option>)
        const classes = filter(this.state.classList,item => <option key={item.class} > { item.class } </option>)

        
        return(
            <div className="container-fluid" >
                {this.state.loading && <Spinner/>}
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto my-5">
                            <h4 className="display-4 text-center" >Export Time Table </h4>
                        </div>
                    </div>
                    <div className="row" >
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="thead-dark" >
                                <tr>
                                    <th scope="col">Class </th>
                                    <th className="d-flex" scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td> Class Wise </td>
                                <td>
                                    <select name="class" value={this.state.class} onChange={this.handleChange}>
                                        <option> Select </option>
                                        {classes}
                                    </select>
                                    <button onClick={ () => window.location.href=BASE_URL + '/exportone_by_class.php?item=' + this.state.class} className="btn btn-primary"> Export </button>
                                </td>
                            </tr>
                            <tr>
                                <td> Teacher Wise </td>
                                <td>
                                    <select name="teacher" value={this.state.teacher} onChange={this.handleChange}>
                                        <option> Select </option>
                                        {teachers}
                                    </select>
                                    <button onClick={() => window.location.href=BASE_URL + 'exportone_by_teacher.php?item=' + this.state.teacher}  className="btn btn-primary"> Export </button>
                                </td>
                            </tr>
                            <tr>
                                <td> Room Wise </td>
                                <td>
                                    <select name="room" value={this.state.room} onChange={this.handleChange}>
                                        <option> Select </option>
                                        {rooms}
                                    </select>
                                    <button onClick={() => window.location.href=BASE_URL + 'exportone_by_room.php?item=' + this.state.room}  className="btn btn-primary"> Export </button>
                                </td>
                            </tr>
                            <tr>
                                <td> Dept Wise </td>
                                <td>
                                    <select name="dept" value={this.state.dept} onChange={this.handleChange}>
                                        <option> Select </option>
                                        {departments}
                                    </select>
                                    <button onClick={() => window.location.href=BASE_URL + 'exportone_by_department.php?item=' + this.state.dept} className="btn btn-primary"> Export </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExportOneTable