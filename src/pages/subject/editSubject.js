import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import { filter } from '../../functions/functions'
import { BASE_URL } from '../../config'
import Modal from '../../components/modal/modal'
import ModalButton from '../../components/modal/modalButton'
import Spinner from '../../components/spinner/Spinner'
import ListTable from '../../components/table/ListTable'

class EditSubject extends Component {
    constructor() {
        super()
        this.state = {
            subject:'',
            class:'',
            department:'',
            className:'',
            updateClass:'',
            classList:[],
            subjectList:[],
            deptList:[],
            loading: true
        }
    }

    setClassList = data => { this.setState({ classList: data }) }
    setdeptList = data => { this.setState({ deptList: data }) }

    componentDidMount = () => {

        fetch(BASE_URL + 'api/get/departments.php')
        .then(response => response.json())
        .then(data => { 
            this.setdeptList(data) 

            fetch(BASE_URL + 'api/get/classes.php')
            .then(response => response.json())
            .then(data => { 
                this.setClassList(data)
                if(data.length) {
                    this.setState({ className: data[0].class })
                    this.setState({ department: data[0].dept })    
                    this.setState({ updateClass: data[0].class })
                } else {
                    throw "There are no classes to Edit"
                }
    
                fetch(BASE_URL + 'api/get/subjects.php?class='+data[0].class)
                .then(response => response.json())
                .then(data => { 
                    this.setState({ subjectList: data, loading: false }) 
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

        })
        .catch(error => {
            this.setState({loading: false})
            alert("Error : " + error)
        })

    }
    
    handleChange = event => {
        const { name, value } = event.target

        if(name === "className") {
            this.setState({loading: true})
            fetch(BASE_URL + 'api/get/subjects.php?class='+value)
            .then(response => response.json())
            .then(data => { this.setState({ subjectList: data,loading: false }) })
            .catch(error => {
                this.setState({loading: false})
                alert("Error : " + error)
            })
            this.setState({ updateClass: value })

            for(var i=0; i < this.state.classList.length;++i)
                if(this.state.classList[i].class === value)
                    this.setState({ department: this.state.classList[i].dept })
        }

        this.setState({ [name]:value })
    }

    handleModalSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})

        const FormData = {
            department: this.state.department,
            class: this.state.updateClass,
            prevclass: this.state.className
        }

        fetch(BASE_URL + 'api/update/class.php',{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(FormData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data)
            fetch(BASE_URL + 'api/get/classes.php')
            .then(response => response.json())
            .then(data => { 
                this.setClassList(data)
                this.setState( prevState => {
                    return {className: prevState.updateClass, loading: false}
                })

                document.getElementById('modal_close').click()                
            })
            .catch(err => {
                this.setState({loading: false})
                alert("Error : " + err)
            })
        })
        .catch(err => {
            this.setState({loading: false})
            alert('Failed to Update Class : \n' + err)
        })
    }

    render() {
        const departments = filter(this.state.deptList,item => <option key={ item.dept} > { item.dept } </option>)
        const classes = filter(this.state.classList,item => <option key={ 'option' + item.class} > { item.class } </option>)
        const subjects = filter(this.state.subjectList,item => {
            return (
                <tr key={'subject:' + item.subject} >
                    <td>{ item.subject }</td>
                    <td><Link to={ "/updateSubject/" + item.id} ><button type="button" className="btn btn-primary">Edit Subject</button></Link></td>
                </tr>
            )
        })

        return(
            <div>
                { this.state.loading && <Spinner/> }
                <Modal title="Edit Subject" onSubmit={this.handleModalSubmit} >
                    <label htmlFor="dept" >Department Name : </label>
                    <select onChange={ this.handleChange } value={ this.state.department } className="form-control" name="department" id="department" required >
                        {departments}
                    </select>
                    <label htmlFor="class" >Class Name : </label>
                    <input onChange={this.handleChange} value={this.state.updateClass} name="updateClass" type="text" className="form-control" id="updateClass" placeholder="Class Name" />
                </Modal>
                <div className="row" >
                    <ListTable 
                        name="Subject" 
                        perPage="5" 
                        action= {
                            <th className="d-flex" scope="col">
                            <form method="get" className="mr-3 mb-0" >
                                <span > Class  </span> 
                                <select value={this.state.className} className="h-100 ml-3"  name="className" onChange={this.handleChange} > 
                                    {classes}
                                </select> 
                            </form>
                                <input type="hidden" name="deldpt" value={this.state.dept} />
                                <ModalButton type="submit" className="btn btn-primary">Edit Selected Class</ModalButton> 
                            </th>
                        }
                        > 
                        {subjects}
                    </ListTable>
                </div>
            </div>)
    }
}

export default EditSubject