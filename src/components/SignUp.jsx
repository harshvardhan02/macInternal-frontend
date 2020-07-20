import React, { Component } from 'react';

export default class SignUp extends Component {
	constructor(props){
		super(props);

		this.state = {
			email: '',
			password: '',
			gender: '',
			state: '',
			checked: '',
			states: [{"code": "AN","name": "Andaman and Nicobar Islands"},
						{"code": "AP","name": "Andhra Pradesh"},
						{"code": "AR","name": "Arunachal Pradesh"},
						{"code": "AS","name": "Assam"},
						{"code": "BR","name": "Bihar"},
						{"code": "CG","name": "Chandigarh"},
						{"code": "CH","name": "Chhattisgarh"},
						{"code": "DH","name": "Dadra and Nagar Haveli"},
						{"code": "DD","name": "Daman and Diu"},
						{"code": "DL","name": "Delhi"},
						{"code": "GA","name": "Goa"},
						{"code": "GJ","name": "Gujarat"},
						{"code": "HR","name": "Haryana"},
						{"code": "HP","name": "Himachal Pradesh"},
						{"code": "JK","name": "Jammu and Kashmir"},
						{"code": "JH","name": "Jharkhand"},
						{"code": "KA","name": "Karnataka"},
						{"code": "KL","name": "Kerala"},
						{"code": "LD","name": "Lakshadweep"},
						{"code": "MP","name": "Madhya Pradesh"},
						{"code": "MH","name": "Maharashtra"},
						{"code": "MN","name": "Manipur"},
						{"code": "ML","name": "Meghalaya"},
						{"code": "MZ","name": "Mizoram"},
						{"code": "NL","name": "Nagaland"},
						{"code": "OR","name": "Odisha"},
						{"code": "PY","name": "Puducherry"},
						{"code": "PB","name": "Punjab"},
						{"code": "RJ","name": "Rajasthan"},
						{"code": "SK","name": "Sikkim"},
						{"code": "TN","name": "Tamil Nadu"},
						{"code": "TS","name": "Telangana"},
						{"code": "TR","name": "Tripura"},
						{"code": "UK","name": "Uttarakhand"},
						{"code": "UP","name": "Uttar Pradesh"},
						{"code": "WB","name": "West Bengal"}],

		}
		this.inputHandler = this.inputHandler.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	inputHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = e => {
		e.preventDefault()
		const { email, password, gender, state, checked } = this.state;
		const data = { email, password, gender, state, checked }
		console.log(data)
	}

	render() {
		return (
			<div className="container">
				<div className="col-lg-8 offset-lg-2">
					<h4 className="text-center mt-3">Sign up here</h4>
					<form>
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Email address</label>
					    <input name="email" onChange={this.inputHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
					    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputPassword1">Password</label>
					    <input name="password" onChange={this.inputHandler} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
					  </div>	
					  <div className="form-group">
					      <label htmlFor="inputState">State</label>
					      <select name="state" onChange={this.inputHandler} id="inputState" className="form-control">
					      {this.state.states.map(state => (
								<option value={state.name} key={state.code}>{state.code}: {state.name}</option>
					      	))}
					      </select>
					    </div>				  
					  <div className="form-check form-check-inline">
						  <input name="gender" onChange={this.inputHandler} className="form-check-input" type="radio" id="inlineRadio1" value="Male"/>
						  <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
						</div>
					  <div className="form-check form-check-inline">
						<input name="gender" onChange={this.inputHandler} className="form-check-input" type="radio" id="inlineRadio2" value="Female"/>
						<label className="form-check-label" htmlFor="inlineRadio2">Female</label>
					  </div>
					  <div className="form-group form-check mt-4">
					    <input name="checked" onChange={this.inputHandler} type="checkbox" className="form-check-input" id="exampleCheck1"/>
					    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
					  </div>
					  <button onClick={this.onSubmit} type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		)
    }
}