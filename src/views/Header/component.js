import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        };
    }

    logout = () => {
        this.props.logout()
        this.setState({ visible: false }, () => {
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Mac Internal</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink exact={true} className="nav-link" activeClassName="text-info" to="">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-info ml-4" activeClassName="text-warning" to="/createpost">Create post</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink onClick={this.logout.bind(this)} exact={true} className="nav-link ml-4" activeClassName="text-info" to="">Logout</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
