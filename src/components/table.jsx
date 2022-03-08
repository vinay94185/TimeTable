import React from 'react'
import SelectList from './selectlist'

function Table({ data, deptList, subjectList, teacherLists, labList,classList,changeHandler,currentClass, sameForWeek }) {    
    const periods = []
    const subjects = []
    const teachers = []
    const rooms = []

    for(var i = 0; i < 9;i++) {
        periods.push(<th key={i + 'period' } scope="col" >{ i } <input index={i} type="checkbox" name="sameForWeek" onChange={changeHandler} checked={sameForWeek[i]} /> Same For Week </th>)
        subjects.push(<td key={i + 'subject' } > <SelectList index={i} name="subject" changeHandler={changeHandler} value={ data[i].subject } list={subjectList} /> </td>)
        teachers.push(<td key={i + 'teacher'} > 
            <SelectList index={i} name="dept" changeHandler={changeHandler} value={ data[i].dept } list={deptList} />
            <SelectList index={i} name="teacher" changeHandler={changeHandler} value={ data[i].teacher } list={teacherLists[i]} /> 
        </td>)
        rooms.push(<td key={i + 'room'} >
            <input disabled={ data[i].lab !== "--------"} index={i} name="room" value={data[i].room} onChange={changeHandler} style={{width:"150px",height:"25px" }} type="text" />
            <SelectList index={i} name="lab" changeHandler={changeHandler} value={ data[i].lab } list={labList} />
        </td>)
    }

    return(
        <div className="table-responsive">
        <table className="table table-hover table-bordered">
        <thead className="thead-dark">
            <tr><th scope="col"><select name="classList" onChange={changeHandler}  value={currentClass} >{ classList.map( item => <option key={'class' + item} > { item } </option> ) }</select></th>{periods}</tr>
        </thead>
        <tbody>
            <tr id="subjects" ><th>SUBJECT</th>{subjects}</tr>
            <tr id="teachers" ><th>TEACHER</th>{teachers}</tr>
            <tr id="rooms" ><th>ROOM NO.</th>{rooms}</tr>
        </tbody>
        </table> 
        </div>
    )
}

export default Table