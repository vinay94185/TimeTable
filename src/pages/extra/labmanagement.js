import React, { Component } from 'react'
import { BASE_URL } from '../../config'
import { filter } from '../../functions/functions'
import Spinner from '../../components/spinner/Spinner'
import ListTable from '../../components/table/ListTable'
import Pagination from '../../components/table/pagination'

class LabManagement extends Component {
    constructor() {
        super()
        this.state = {
            newlab:'',
            labList:[],
            loading:true,
        }
    }

    init = () => {
        fetch(BASE_URL + 'api/get/labs.php')
        .then(response => response.json())
        .then(data => {
            this.setState({labList: data, loading: false})
        })
    }

    componentDidMount = () => {
        this.init()
    }

    ChangeHandler = event => {
        const {name,value} = event.target
        this.setState({[name]:value})
    }

    clickHandler = event => {
        const {name,value} = event.target

        switch(name) {
            case 'add':
                this.setState({loading:true})
                fetch(BASE_URL + 'api/set/newlab.php',{
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        lab: value
                    })
                })
                .then(response => response.text())
                .then(data => {
                    alert(data)
                    this.init()
                })
                .catch(error => {
                    alert("Error in Connection : \n"+error)
                    this.setState({loading:false})
                })
                break
            case 'edit':
                var old_name = event.target.getAttribute('lab')
                var new_name = prompt("Enter Lab Name",old_name)
                if(new_name === null) return
                this.setState({loading:true})
                fetch(BASE_URL + 'api/update/lab.php',{
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        id: value,
                        lab: new_name
                    })
                })
                .then(response => response.text())
                .then(data => {
                    alert(data)
                    this.init()
                })
                .catch(error => {
                    alert("Error in Connection : \n"+error)
                    this.setState({loading:false})
                })
                break;
            case 'delete':
                this.setState({loading:true})
                fetch(BASE_URL + 'api/delete/lab.php?id='+value)
                .then(response => response.text())
                .then(data => {
                    alert(data)
                    this.init()
                })
                .catch(error => {
                    alert("Error in Connection : \n"+error)
                    this.setState({loading:false})
                })
                break
        }
    }

    render() {
        const labs = filter(this.state.labList,item => {
            return (
                <tr key={'lab:' + item.lab} >
                    <td>{ item.lab }</td>
                    <td>
                        <button style={{marginRight:"10px"}} onClick={this.clickHandler} name="edit" value={item.id} lab={item.lab} type="button" className="btn btn-primary">Edit Lab</button>
                        <button onClick={this.clickHandler} name="delete" value={item.id} type="button" className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })


        let lastRow = (
            <tr>
                <td> Add New </td>
                <td>
                    <input style={{marginRight:"10px"}} name="newlab" value={this.state.newlab} onChange={this.ChangeHandler}  type="text" />
                    <button onClick={this.clickHandler} name="add" value={this.state.newlab} className="btn btn-primary"> Add </button>
                </td>
            </tr>
        )

        return(
            <div>
            {this.state.loading && <Spinner/>}
            <div className="container-fluid" >
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto my-5">
                            <h4 className="display-4 text-center" >Lab Management </h4>
                        </div>
                    </div>
                    <div className="row" >
                        <ListTable name="Lab" perPage="5" lastRow={lastRow}  > 
                            {labs}
                        </ListTable>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default LabManagement