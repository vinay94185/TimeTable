import React, { Component } from 'react'
import Pagination from './pagination'


class ListTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
            max: 0,
            children: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.children !== nextProps.children) {
            const total = React.Children.count(nextProps.children)
            this.setState({ currentPage: 1, max: Math.ceil(total /  nextProps.perPage) })
        }
    }

    componentDidUpdate(props,prevState) {
        if(prevState.currentPage !== this.state.currentPage || this.props.children !== props.children) {
            const cb = (val,idx) => {
                let end_index = (this.props.perPage * this.state.currentPage)
                if(idx >= end_index - this.props.perPage) {
                    if(idx < end_index) {
                        return true
                    }
                }
            }

            this.setState({ children: React.Children.toArray(this.props.children).filter(cb) })
        }
    }

    render() {
        return (
            <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark" >
                <tr>
                    <th scope="col"> { this.props.name }  </th>
                    { this.props.action === undefined ? <th className="d-flex" scope="col">Action</th> : this.props.action }
                </tr>
            </thead>
            <tbody>
            { this.state.children }
            { this.props.lastRow }
            <tr>
                <td colSpan="2" >
                    <Pagination setParentPage={ page => { this.setState({currentPage: page}) } } maxPages={ this.state.max } />
                </td>
            </tr>
            </tbody>
        </table>
        )
    }
}

export default ListTable