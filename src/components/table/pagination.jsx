import React from 'react'
import { Component } from 'react';


class Pagination extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
            max: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.maxPages !== this.props.maxPages) {
            if(nextProps.maxPages != 0) this.setState({ max: nextProps.maxPages })
        }
    }

    prev = () => {
        if(this.state.currentPage === 1)
            return

        this.setState(prevState => {
            return { currentPage: prevState.currentPage - 1 }
        })
    }

    next = () => {
        if(this.state.currentPage === this.state.max)
            return

        this.setState(prevState => {
            return { currentPage: prevState.currentPage + 1 }
        })
    }

    setPage = page => {
        this.setState({currentPage: page})
    }

    componentDidUpdate(props,prevState) {
        if(this.state.currentPage !== prevState.currentPage) {
            this.props.setParentPage(this.state.currentPage)
        }
    }

    render () {
        const navStyle = {
            width: "max-content",
            margin: "auto"
        }

        const pages = []
        for(var i = 1; i <= this.state.max;++i) {
            pages.push(<li onClick={this.setPage.bind(this,i)} className={`page-item ${ i === this.state.currentPage ? 'active' : null }`}><a className="page-link" href="#">{ i }</a></li>)
        }

        return(
                <nav style={ navStyle } aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={this.prev} >
                    <a className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                    </li>
                    {pages}
                    <li className="page-item" onClick={this.next} >
                    <a className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                    </li>
                </ul>
                </nav>
        )
    }
}

export default Pagination