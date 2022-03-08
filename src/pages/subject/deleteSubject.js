import React, { Component } from 'react'
import { BASE_URL } from '../../config'
import { filter } from '../../functions/functions'
import Spinner from '../../components/spinner/Spinner'
import ListTable from '../../components/table/ListTable'

class DeleteSubject extends Component {
    constructor() {
        super()

        this.state = {
            class:'',
            classList:[],
            subjectList:[],
            loading: true
        }

    }

    setClassList = data => { this.setState({ classList: data, class: data[0].class }) }

    init = () => {
        fetch(BASE_URL + 'api/get/classes.php')
        .then(response => response.json())
        .then(data => { 
            if(data.length) {
                this.setClassList(data)
                //this.setState({ class: data[0].class })
            } else {
                throw "There are no classes!!"
            }

            fetch(BASE_URL + 'api/get/subjects.php?class='+data[0].class)
            .then(response => response.json())
            .then(data => { this.setState({ subjectList: data,loading: false }) })    
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
        const { name, value } = event.target
        
        if(name === "class") {
            this.setState({loading: true})
            fetch(BASE_URL + 'api/get/subjects.php?class='+value)
            .then(response => response.json())
            .then(data => { this.setState({ subjectList: data, loading: false }) })
            .catch(error => {
                this.setState({loading: false})
                alert("Error : "+error)
            })
        }

        this.setState({ [name]:value })
    }

    handleSubmit = event => {
        event.preventDefault()
    }

    deleteSelectedClass = () => {
        this.setState({loading: true})

        fetch(BASE_URL + 'api/delete/class.php?class='+this.state.class)
        .then(response => response.text())
        .then(data => {
            this.setState({loading: false})
            alert(data)
            this.init()
        })
        .catch(error => {
            this.setState({loading: false})
            alert("Failed to Delete \n" + error)
        })
    }

    deleteSubject = id => {
        this.setState({loading: true})
        fetch(BASE_URL + 'api/delete/subject.php?id='+id)
        .then(response => response.text())
        .then(data => {
            alert(data)
            fetch(BASE_URL + 'api/get/subjects.php?class='+this.state.class)
            .then(response => response.json())
            .then(data => { this.setState({ subjectList: data,loading: false }) })
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

    deleteAllSubject = () => {
        this.setState({loading: true})
        fetch(BASE_URL + 'api/delete/subject.php?class='+this.state.class)
        .then(response => response.text())
        .then(data => {
            alert(data)
            fetch(BASE_URL + 'api/get/subjects.php?class='+this.state.class)
            .then(response => response.json())
            .then(data => { this.setState({ subjectList: data,loading: false }) })
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
        const classes = filter(this.state.classList,item => <option key={item.class} > { item.class } </option>)
        const subjects = filter(this.state.subjectList,item => {
            return (
                <tr key={'subject:' + item.subject} >
                    <td>{ item.subject }</td>
                    <td><button onClick={ () => { this.deleteSubject(item.id) } }  type="button" className="btn btn-danger">Delete Subject</button></td>
                </tr>
            )
        })

        return(
            <div className="container-fluid" >
                { this.state.loading && <Spinner/> }
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto my-5">
                            <h4 className="display-4 text-center" >Delete Subject </h4>
                        </div>
                    </div>
                    <div className="row" >

                    <ListTable 
                        name="Subject" 
                        perPage="5" 
                        action= {
                            <th className="d-flex" scope="col">
                            <div className="mr-3 mb-0" >
                                <span > Class  </span> 
                                <select className="h-100 ml-3"  name="class" value={this.state.class} onChange={this.handleChange} > 
                                    {classes}
                                </select> 
                            </div>
                            <div className="mb-0" >
                                <button onClick={this.deleteSelectedClass} className="btn btn-danger">Delete Selected Class</button>
                            </div>
                            </th>
                        }
                        lastRow={
                        <tr>
                            <td> All Subjects </td>
                            <td><button onClick={this.deleteAllSubject} className="btn btn-danger">Delete All Subjects</button></td>
                        </tr>
                        }
                        > 
                        {subjects}
                    </ListTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteSubject