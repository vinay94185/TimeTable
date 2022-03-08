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
                array.push(<td key={uuid()} >{ data[index].subject } <br/> {data[index].teacher} <br/> { data[index].lab ? data[index].lab : data[index].room }</td>)
                if(data.length != index+1) index++
                continue
            }
        } 
        array.push(<td key={uuid()} > </td>)
    }
    return array
}

function ClassWise() {

    const [tableData,setData] = useState({})
    const [classList,setClassList] = useState([])
    const [className,setClassName] = useState('')
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        fetch(BASE_URL + 'api/get/classes_with_table.php')
        .then(response => response.json())
        .then(data => {
            setClassList(data)
            if(data.length)
                setClassName(data[0].class)
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            alert("Error : " + error)
        })
    },[])

    useEffect(() => {
        if(className !== "") {
            setLoading(true)
            fetch(BASE_URL + 'api/get/table/classwise.php?class='+className)
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
    },[className])

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

    const classOptions = filter(classList,item => <option key={item.class} > {item.class} </option>)
    const rows = weekDays.map( item => <tr key={ uuid() } > 
        <th scope="row thread-dark" >{item}</th>
        {   
            tableData[item] ? fillBlanks(tableData[item],periodCount) : null
        }
    </tr>)
    
    return (
        <div>
            { loading && <Spinner/> }
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">
                        <select value={className} onChange={event => setClassName(event.target.value) } >
                            <option> _____ </option>
                            {classOptions}
                        </select>
                        </th>{ className ? periods: null}
                    </tr>
                </thead>
                <tbody>
                    {className ? rows : <tr><td><center>There is no data to display</center></td></tr>}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClassWise