import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            isOpen: false
        };
        this.logout = this.logout.bind(this);
        this.fblogout = this.fblogout.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    logout = () => {
        this.props.logout();
        this.setState({ visible: false }, () => {
            this.props.history.push('/')
        })
    }

    fblogout = () => {
        this.props.logout();
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Mac Internal</Link>
                        <button onClick={this.toggleOpen} className={this.state.isOpen ? 'navbar-toggler' : 'navbar-toggler collapsed'} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={this.state.isOpen ? true : false} aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className={this.state.isOpen ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'} id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink exact={true} className="nav-link" activeClassName="text-info" to="">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-info ml-4" activeClassName="text-warning" to="/createpost">Create post</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink onClick={this.logout} exact={true} className="nav-link ml-4" activeClassName="text-info" to="">Logout</NavLink>
                                </li>
                                <li className="nav-item">
                                    <GoogleLogout
                                        clientId="14909510442-d7ki7bm4inpi4pelkqsikvnh0h416a3h.apps.googleusercontent.com"
                                        buttonText="Google-Logout"
                                        onLogoutSuccess={this.logout}
                                        icon={false}
                                        className="nav-link ml-4"
                                    >
                                    </GoogleLogout>
                                </li>
                                <li className="nav-item">
                                    <NavLink onClick={this.fblogout} exact={true} className="nav-link ml-4" activeClassName="text-info" to="">Facebook-Logout</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
