import React, { useState } from 'react'
import ClassWise from './formats/class'
import TeacherWise from './formats/teacher'
import RoomWise from './formats/room'

function Home() {

    const [format,setFormat] = useState('class')

    let ActiveFormat
    switch(format) {
        case 'class':
            ActiveFormat =  <ClassWise />
            break;
        case 'teacher':
            ActiveFormat =  <TeacherWise />
            break;
        case 'room':
            ActiveFormat =  <RoomWise />
            break;
        default:
            ActiveFormat =  <ClassWise />
    }

    return (
        <div>
            <div className="container" style={{ marginTop: "41px"}} >
                <div className="btn-group pull-right my-2" style={{float:"right"}}>
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false" > { format } wise </button>
                    <div className="dropdown-menu dropdown-menu-lg-right">
                        <button onClick={ event => setFormat(event.target.value) } className="dropdown-item" value="teacher" type="button">TEACHER WISE</button>
                        <button onClick={ event => setFormat(event.target.value) } className="dropdown-item" value="class" type="button">CLASS WISE</button>
                        <button onClick={ event => setFormat(event.target.value) } className="dropdown-item" value="room" type="button">ROOM WISE</button>
                    </div>
                </div>
            </div>
            <div id="table" className="container">
                { ActiveFormat }
            </div>
        </div>
    )
}

export default Home