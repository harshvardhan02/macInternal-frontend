import React, { Component } from 'react'

export default class Footer extends Component {
    constructor(props){
        super();
        this.state = {
            time: ""
        }
    }
    
    render() {
        return (
            <div className="text-center bg-primary mt-5">
                <div className="text-white">
                    {(new Date().getDate())}-{(new Date().getMonth())}-{(new Date().getFullYear())}
                    {this.state.time}
                </div>
            </div>
        )
    }
}
