import React, { Component } from 'react'
import {v4 as uuid} from 'uuid'
import SelectList from '../../components/selectlist'
import { BASE_URL } from '../../config'
import { filter } from '../../functions/functions'
import Modal from '../../components/modal/modal'
import ModalButton from '../../components/modal/modalButton'
import './addtable.css'
import Spinner from '../../components/spinner/Spinner'

class EditTable extends Component {

    componentDidMount = () => {
        fetch(BASE_URL + "api/get/classes_with_table.php")
        .then(response => response.json())
        .then(classdata =>  {
            if(classdata.length)
            this.setState({
                classList: classdata,
                currentClass: classdata[0].class,
                loading:false
            })
        })
    }
    
    makeTableArray = () => {
        const array = []
        for(var i=0; i<=this.periods;++i) {
            array.push({
                period: i,
                room: '',
                lab: null,
                dept: '',
                teacher: '',
                subject: '',
                uid: uuid()
            })
        }
        return array
    }

    pushTableArray = (oldData,data) => {
        const array = []
        let index = 0
        if(data.length === 0) {
            return this.makeTableArray()
        }

        for(var i=0; i<=this.periods;++i) {
            if(data[index].period == i) {
                array.push({
                    period: i,
                    room: data[index].room,
                    lab: data[index].lab,
                    dept: data[index].dept,
                    teacher: data[index].teacher,
                    subject: data[index].subject,
                    uid: oldData[i].uid
                })
                if(data.length != index+1) index++
            } else {
                array.push({
                    period: i,
                    room: '',
                    lab: null,
                    dept: '',
                    teacher: '',
                    subject: '',
                    uid: oldData[i].uid
                })
            }
        }
        return array
    }

    updateClass = (currentClass) => {
        this.setState({loading: true})
        fetch(BASE_URL + "api/get/new_table_data.php?class="+currentClass)
        .then(response => response.json())
        .then(data => {
            const subjectList = filter(data.subjects,item => item.subject);
            const labList = filter(data.labs,item => item.lab);
            const deptList = filter(data.departments,item => item.dept);
            this.setState({ subjectList, labList, deptList, currentClass })

            fetch(BASE_URL + "api/get/table/classwise.php?class="+currentClass)
            .then(response => response.json())
            .then(data => {
                let table = {}
                this.weekDays.forEach(day => {
                    table[day] = this.pushTableArray(this.state.tableData[day],data[day])
                })
                this.setState({tableData: table, loading: false})                         
            })
            .catch(error => {
                alert("Error : "+error)
                this.setState({loading: false})
            })
        })
        .catch(error => {
            alert("Error : "+ error)
            this.setState({loading: false})
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.currentClass !== prevState.currentClass) {
            this.updateClass(this.state.currentClass)
        }
    }

    constructor() {
        super()
        this.periods = 9;
        this.weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        const tableData = {}
        this.weekDays.forEach(item => {
            tableData[item] = this.makeTableArray()
        })

        this.selectedItems = []

        this.state = {
            subjectList: [],
            labList: [],
            deptList: [],
            teacherList:[],
            classList: [],
            currentClass: '',
            subject:'',
            dept: '',
            teacher:'',
            lab: "",
            room: '',
            tableData: tableData,
            loading:true
        }
    }

    fillBlanks = (data,periods) => {
        const array = []
        for(var i = 0; i <= periods;++i) {
            array.push(<td 
                className={ ( this.selectedItems.includes(data[i].uid) ) ? "selected" : "" } 
                onClick={this.selectTableItem} 
                uid={data[i].uid} 
                key={data[i].uid}> 
                    { data[i].subject } 
                    <br/> {data[i].teacher} <br/>
                    { data[i].lab ? data[i].lab : data[i].room }
                </td>)
        }
        return array
    }

    selectTableItem = (event) => {
        const td = event.target
        if(td.classList.toggle('selected')) {
            this.selectedItems.push(td.getAttribute('uid'))
        } else {
            let uid = td.getAttribute('uid')
            this.selectedItems = this.selectedItems.filter( id => id != uid )
        }
    }

    changeHandler = event => {
        let {name,value} = event.target

        if(name === 'dept') {
            this.setState({loading: true})
            fetch(BASE_URL + "api/get/teachers.php?dept="+value)
            .then(response => response.json())
            .then(teacherList => {
                teacherList = filter(teacherList,item => item.name)
                this.setState({teacherList, loading: false})
            })
        }

        if(name === 'lab') {
            if(value === "--------")
                value = ""
        }
        this.setState({[name]: value})
    }

    addItems = event => {
        event.preventDefault()

        const tableData = {...this.state.tableData}

        this.selectedItems.forEach(id => {
            this.weekDays.forEach(day => {
                tableData[day].forEach(period => {
                    if(period.uid === id) {
                        period.subject = this.state.subject
                        period.dept = this.state.dept
                        period.teacher = this.state.teacher
                        period.lab = this.state.lab
                        period.room = this.state.room
                    }
                })
            })
        })

        const subject = "",
        dept = "",
        teacher = "",
        lab = "",
        room = "";

        this.selectedItems = []
        this.setState({subject,dept,teacher,lab,room,tableData})
        document.getElementById('modal_close').click()
    }

    handle_submit = event => {
        event.preventDefault()
        this.setState({loading: true})

        fetch(BASE_URL + "api/update/table.php",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ data: this.state.tableData, class: this.state.currentClass  })
        })
        .then(response => response.text())
        .then(data => { 
            alert(data) 
            this.setState({loading: false})
        })
        .catch( error => {
            alert("Error while sending data : \n" + error) 
            this.setState({loading: false})
        })
    }

    render() {
        const classOptions = filter(this.state.classList,item => <option key={item.class} > {item.class} </option>)
        const periods = []
        for(var i=0;i<=this.periods;++i)
            periods.push(<th key={'period-'+i } scope="col"> { i } </th>)

        const rows = this.weekDays.map( item => <tr key={ uuid() } > 
        <th scope="row thread-dark" >{item}</th>
        {
            this.state.tableData[item] ? this.fillBlanks(this.state.tableData[item],this.periods) : null
        }
        </tr>)
    
        return(
            <div className="container-fluid my-table" >
                { this.state.loading && <Spinner/> }
                <Modal title="Set Values" onSubmit={this.addItems} >
                    <SelectList 
                        noBlank={true}
                        placeholder="Subject"
                        className="form-control"
                        name="subject" 
                        changeHandler={this.changeHandler}
                        value={this.state.subject }
                        list={this.state.subjectList} />
                    <SelectList 
                        noBlank={true}
                        placeholder="Dept"
                        className="form-control"
                        name="dept" 
                        changeHandler={this.changeHandler}
                        value={this.state.dept }
                        list={this.state.deptList} />
                    <SelectList 
                        noBlank={true}
                        placeholder="Teacher"
                        className="form-control"
                        name="teacher" 
                        changeHandler={this.changeHandler}
                        value={this.state.teacher }
                        list={this.state.teacherList} />
                    <input disabled={this.state.lab !== "" ? true : false} name="room" value={this.state.room} onChange={this.changeHandler} className="form-control" placeholder="room" />                    
                    <SelectList 
                        noBlank={true}
                        placeholder="Lab"
                        className="form-control"
                        name="lab" 
                        changeHandler={this.changeHandler}
                        value={this.state.lab}
                        list={this.state.labList} />
                </Modal>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto my-5">
                            <h4 className="display-4 text-center" > Edit TimeTable </h4>
                        </div>
                    </div>
                    <div className="row" >
                    <div className="table-responsive clickhover">
                        <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">
                                <select value={this.state.currentClass} onChange={ event => { this.setState({ currentClass: event.target.value}) } } >
                                    <option> </option>
                                    {classOptions}
                                </select>
                                </th>{periods}
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                        </table>
                    </div>
                    </div>
                    <div className="row" >
                        <div className="col-5 ml-auto mt-5" >
                            <ModalButton style={{marginRight: "20px"}} onClick={this.setValues} type="button" className="btn btn-danger"> Set Value </ModalButton>
                            <button onClick={this.handle_submit} type="button" className="btn btn-danger">Submit TimeTable</button>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default EditTable