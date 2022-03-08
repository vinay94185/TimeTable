import React, { Component } from 'react'
import { BASE_URL } from '../../config'
import { filter } from '../../functions/functions'
import Spinner from '../../components/spinner/Spinner';

class ExportCustom extends Component {
    constructor() {
        super();

        this.state = {
            newclass:'',
            classList:[],
            addList:[],
            loading:true
        }
    }

    init = () => {
        fetch(BASE_URL + 'api/get/classes.php')
        .then(response => response.json())
        .then(data => {
            this.setState({classList: data, newclass: data[0].class, loading: false})
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

                if(this.state.addList.indexOf(value) !== -1) 
                    return

                this.setState(prevState => {
                    let addList = [...prevState.addList]
                    addList.push(value)
                    return { addList }
                })
                break
            case 'delete':
                this.setState(prevState => {
                    let addList = []
                    prevState.addList.forEach(element => {
                        if(element != value) {
                            addList.push(element)
                        }
                    });
                    return {addList}
                })
                break
            case 'export':
                if(this.state.addList.length === 0)
                    return
                this.setState({loading:true})
                fetch(BASE_URL + 'api/export_custom.php',{
                    method:"POST",
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(this.state.addList)
                })
                .then(response => response.blob())
                .then(data => {
                    this.setState({loading:false})
                    let link = document.createElement('a')
                    link.href = URL.createObjectURL(data)
                    link.setAttribute("download","export_custom.xlsx")
                    link.click()
                })
                .catch(error => {                    
                    alert("Error : " + error)
                    this.setState({loading:false})
                })
                break;
        }
    }

    render() {
        const Options = filter(this.state.classList,item => <option key={item.class} > {item.class} </option>)
        const adding = filter(this.state.addList,item => {
            return (
                <tr key={'add:' + item} >
                    <td>{ item }</td>
                    <td>
                        <button onClick={this.clickHandler} name="delete" value={item} type="button" className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })

        return(
            <div>
            <div className="container-fluid" >
                { this.state.loading && <Spinner/> }
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto my-5">
                            <h4 className="display-4 text-center" >Export Custom </h4>
                        </div>
                    </div>
                    <div className="row" >
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="thead-dark" >
                                <tr>
                                    <th scope="col">Classes </th>
                                    <th className="d-flex" scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {adding}
                            <tr>
                                <td> Add New </td>
                                <td>
                                    <select name="newclass" value={this.state.newclass} onChange={this.ChangeHandler} > 
                                        {Options}
                                    </select>
                                    <button onClick={this.clickHandler} name="add" value={this.state.newclass} className="btn btn-primary"> Add </button>
                                    <button style={{ marginLeft:"10px" }} onClick={this.clickHandler} name="export" className="btn btn-primary"> Export </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default ExportCustom