import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import store from './store'
import history from './history'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Practice from './components/Practice';
import Footer from './components/Footer';
import CreatePostContainer from './views/CreatePost/container';
import HomeContainer from './views/Home/container';
import TimeSlotContainer from './views/Timeslot/container';
import UpdatePostContainer from './views/UpdatePost/container';
import SignUpContainer from './views/SignUp/container';
import LoginContainer from './views/Login/container';
import AdminLoginContainer from './views/AdminLogin/container';

let route = '/login'
if (window.location.origin !== 'http://localhost:3000') {
	route = '/'
}

const PrivateRoute = ({ component, ...rest }) => {
	const isAuthed = (localStorage.getItem('authToken') || localStorage.getItem('fbToken')) ? true : false
	return (
		<Route {...rest} exact
			render={props => (
				isAuthed ?
					(
						<div>{React.createElement(component, props)}</div>
					)
					:
					(
						<Redirect to={{ pathname: route, state: { from: props.location } }} />
					)
			)}
		/>
	)
}

class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<PrivateRoute exact path={`${process.env.PUBLIC_URL}/`} component={HomeContainer} {...this.props} />
						<PrivateRoute exact path={`${process.env.PUBLIC_URL}/timeslot`} component={TimeSlotContainer} {...this.props} />
						<PrivateRoute exact path={`${process.env.PUBLIC_URL}/createpost`} component={CreatePostContainer} {...this.props} />
						<PrivateRoute exact path={`${process.env.PUBLIC_URL}/practice`} component={Practice} {...this.props} />
						<PrivateRoute exact path={`${process.env.PUBLIC_URL}/updatepost/:id`} component={UpdatePostContainer} {...this.props} />
						{/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
						<Route exact path={`${process.env.PUBLIC_URL}/signup`} component={SignUpContainer} {...this.props} />
						<Route exact path={`${process.env.PUBLIC_URL}/login`} component={LoginContainer} {...this.props} />
						<Route exact path={`${process.env.PUBLIC_URL}/adminlogin`} component={AdminLoginContainer} {...this.props} />
					</Switch>
					<Footer />
				</Router>
			</Provider>
		)
	}
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
