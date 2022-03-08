import React, { Component } from 'react'
import { BASE_URL } from '../../config'
import { filter } from '../../functions/functions'
import Spinner from '../../components/spinner/Spinner'
import ListTable from '../../components/table/ListTable'

class DeleteTable extends Component {
    constructor() {
        super()
        this.state = {
            tableList:[],
            loading: true
        }
    }

    setTableList = data => { this.setState({ tableList: data }) }

    init = () => {
        fetch(BASE_URL + 'api/get/classes_with_table.php')
        .then(response => response.json())
        .then(data => { 
            this.setTableList(data)
            this.setState({loading: false})
        })
    }

    componentDidMount = () => { this.init() }

    deleteTable = clas => {
        this.setState({loading: true})
        fetch(BASE_URL + 'api/delete/table.php?class='+clas)
        .then(response => response.text())
        .then(data => {
            alert(data)             
            this.setState({loading: false})
            this.init()
        })
        .catch(error => alert("Failed to Delete \n" + error))
    }

    deleteAll = () => {
        this.setState({loading: true})
        fetch(BASE_URL + 'api/delete/table.php')
        .then(response => response.text())
        .then(data => { 
            alert(data)
            this.setState({loading: false})
            this.init()
         })
        .catch(error => alert("Failed to Delete \n" + error))
    }

    render() {
        const tables = filter(this.state.tableList,item => {
            return (
                <tr key={item.class} >
                    <td>{ item.class }</td>
                    <td><button onClick={ () => { this.deleteTable(item.class) } }  type="button" className="btn btn-danger">Delete</button></td>
                </tr>
            )
        })

        return(
            <div className="container-fluid" >
                { this.state.loading && <Spinner/> }
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto my-5">
                            <h4 className="display-4 text-center" >Delete Time Table </h4>
                        </div>
                    </div>
                    <div className="row" >
                        <ListTable 
                            name="Class" 
                            perPage="5" 
                            lastRow={
                                <tr>
                                    <td> All Classes </td>
                                    <td><button onClick={this.deleteAll} className="btn btn-danger">Delete All</button></td>
                                </tr>
                            }> 
                            {tables}
                        </ListTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteTable