import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Machine Test</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink exact={true} className="nav-link" activeClassName="text-info" to="">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-info ml-4" to="/createpost">Create post</Link>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact={true} className="nav-link ml-4" activeClassName="text-info" to="">Logout</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
