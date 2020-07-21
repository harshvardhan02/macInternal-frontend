import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import store from './store'

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
// import Home from './components/Home';
// import CreatePost from './components/CreatePost';
// import PostUpdate from './components/PostUpdate';
import HtmlEditor from './components/HtmlEditor';
import Practice from './components/Practice';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CreatePostContainer from './views/CreatePost/container';
import HomeContainer from './views/Home/container';
import TimeSlotContainer from './views/Timeslot/container';
import UpdatePostContainer from './views/UpdatePost/container';

// const PrivateRoute = ({ component, user, ...rest }) => {
//   const isAuthed = (localStorage.getItem('Authorization') || localStorage.getItem('AdminAuthorization')) ? true : false
//   return (
//     <Route {...rest} exact
//       render = {props => (
//         isAuthed ? 
//         (
//           <div>{React.createElement(component, props)}</div>
//         )
//         :
//         (
//           <Redirect to={{pathname: route, state: { from: props.location } }}/>
//         )
//       )}
//     />
//   )
// }

class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
			<BrowserRouter>
				<Header />
					<Switch>
						// <PrivateRoute exact path="/" component={Dashboard} {...this.props} />
						<Route exact path={`${process.env.PUBLIC_URL}/`} component={HomeContainer} />
						<Route exact path={`${process.env.PUBLIC_URL}/timeslot`} component={TimeSlotContainer} />
						<Route exact path={`${process.env.PUBLIC_URL}/createpost`} component={CreatePostContainer} />
						<Route exact path={`${process.env.PUBLIC_URL}/htmleditor`} component={HtmlEditor} />
						<Route exact path={`${process.env.PUBLIC_URL}/practice`} component={Practice} />
						<Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
						<Route exact path={`${process.env.PUBLIC_URL}/signup`} component={SignUp} />
						<Route exact path={`${process.env.PUBLIC_URL}/updatepost/:id`} component={UpdatePostContainer} />
					</Switch>
				<Footer />
			</BrowserRouter>
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
