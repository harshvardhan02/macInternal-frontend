import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import FacebookLogin from 'react-facebook-login';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.responseFacebook = this.responseFacebook.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     console.log(this.props.loginPhase)
    //     if (prevProps.loginPhase !== this.props.loginPhase) {
    //         this.props.history.push('/')
    //     }
    // }

    componentDidMount() {
        const user = localStorage.getItem('authToken')
        if (user && user !== 'undefined') {
            this.props.history.push('/')
        }
    }

    inputHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state;
        const data = { email, password }
        this.props.loginUser(data);
    }

    // responseFacebook = (response) => {
    //     this.props.fbLogin(response)
    // }

    render() {
        return (
            <div className="container d-flex min-vh-100">
                <div className="row flex-grow-1 justify-content-center align-items-center">
                    <div className="col-lg-8">
                        <h4 className="text-center">Login</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input onChange={this.inputHandler} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input onChange={this.inputHandler} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <button onClick={this.onSubmit} type="submit" className="btn btn-primary">Submit</button>
                            <small id="emailHelp" className="form-text text-muted">Don't have an account <Link to="/signup">Sign Up</Link> instead or with <Link to="/adminlogin">Admin</Link></small>
                            
                            {/* <FacebookLogin
                                cssClass="btn btn-primary btn-block mt-3"
                                appId="195878658464696"
                                autoLoad={true}
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook} /> */}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
