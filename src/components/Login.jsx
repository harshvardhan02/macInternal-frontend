import React, { Component } from 'react';

export default class Login extends Component {
	constructor(props){
		super(props);

		this.state = {
			email: '',
			password: ''
		}
		this.inputHandler = this.inputHandler.bind(this)
		this.onSubmit =  this.onSubmit.bind(this)
	}

	inputHandler = e => {
		this.setState({ [e.target.name]: e.target.value})
	}

	onSubmit = e => {
		e.preventDefault()
		const { email, password } = this.state;
		const data = { email, password }
		console.log(data)
	}

	render() {
		return (
			<div className="container">
				<div className="col-lg-8 offset-lg-2">
					<h4 className="text-center mt-3">Login</h4>
					<form>
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Email address</label>
					    <input onChange={this.inputHandler} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
					    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputPassword1">Password</label>
					    <input onChange={this.inputHandler} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
					  </div>				  
					  <button onClick={this.onSubmit} type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		)
    }
}