import React, { Component } from 'react'
import { BASE_URL } from '../../config'

class ExportTable extends Component {
    render() {
        return(
            <div className="container-fluid" >
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
                                <td><button onClick={ () => window.location.href=BASE_URL + '/exportall_by_class.php' } className="btn btn-primary"> Export </button></td>
                            </tr>
                            <tr>
                                <td> Teacher Wise </td>
                                <td><button onClick={() => window.location.href=BASE_URL + '/exportall_by_teacher.php'}  className="btn btn-primary"> Export </button></td>
                            </tr>
                            <tr>
                                <td> Room Wise </td>
                                <td><button onClick={() => window.location.href=BASE_URL + '/exportall_by_room.php'}  className="btn btn-primary"> Export </button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExportTable