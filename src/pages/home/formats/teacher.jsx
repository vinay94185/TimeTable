import React, {useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'
import { filter } from '../../../functions/functions'
import { BASE_URL } from '../../../config'
import Spinner from '../../../components/spinner/Spinner'

function fillBlanks(data,periods) {
    let index = 0
    const array = []
    for(var i = 0; i <= periods;++i) {
        if(data[index] !== undefined) {
            if(data[index].period == i) {
                array.push(<td key={uuid()} >{ data[index].subject } <br/> {data[index].class} <br/> { data[index].lab ? data[index].lab : data[index].room }</td>)
                if(data.length != index+1) index++
                continue
            }
        } 
        array.push(<td key={uuid()} > </td>)
    }

    return array
}


function TeacherWise() {

    const [tableData,setData] = useState({})
    const [teacherList,setTeacherList] = useState([])
    const [teacherName,setTeacherName] = useState('')
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        fetch(BASE_URL + 'api/get/teachers.php')
        .then(response => response.json())
        .then(data => {
            setTeacherList(data)
            if(data.length)
                setTeacherName(data[0].name)
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            alert("Error : " + error)
        })
    },[])

    useEffect(() => {
        if(teacherName !== "") {
            setLoading(true)
            fetch(BASE_URL + 'api/get/table/teacherwise.php?teacher='+teacherName)
            .then(response => response.json())
            .then(data => { 
                setData(data)
                setLoading(false)
             })
             .catch(error => {
                setLoading(false)
                alert("Error : " + error)
            })             
        }
    },[teacherName])

    const weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    let periodCount = 0
    if(tableData['Monday'] !== undefined)
    weekDays.forEach(item => {
        tableData[item].forEach(itm => {
            if(itm.period > periodCount) 
                periodCount = itm.period
        })
    })

    const periods = [] 
    for(var i=0;i<=periodCount;++i) {
        periods.push(<th key={'period-'+i } scope="col"> { i } </th>)
    }

    const Options = filter(teacherList,item => <option key={item.name} > {item.name} </option>)
    const rows = weekDays.map( item => <tr key={ uuid() } > 
        <th scope="row thread-dark" >{item}</th>
        {   
            tableData[item] ? fillBlanks(tableData[item],periodCount) : null
        }
    </tr>)
    
    return (
        <div>
            {loading && <Spinner/>}
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">
                        <select value={teacherName} onChange={event => setTeacherName(event.target.value) } >
                            <option> _____ </option>
                            {Options}
                        </select>
                        </th>{ teacherName ? periods : null}
                    </tr>
                </thead>
                <tbody>
                    {teacherName ? rows : <tr><td><center>There is no data to display</center></td></tr>}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeacherWise