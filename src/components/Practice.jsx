import React, { Component } from 'react'

export default class Practice extends Component {
    constructor() {
        super();
        this.state = {
            id: ""
        }
    }

    componentDidMount(){
        const id = this.props.id;
        this.setState({
            id
        })
        console.log(id)
    }   

    render() {
        return (
            <div className="text-danger">
                Id: {this.state.id}
            </div>
        )
    }
}
