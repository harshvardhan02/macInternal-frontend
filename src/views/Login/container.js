import Login from './component';
import { connect } from 'react-redux';
import { loginUser, fbLogin } from '../../store/user/duck'

const LoginContainer = connect(
	//map state to props
	state => ({
        loginPhase: state.user.loginPhase
	}),
	//map dispatch to props
	{
		loginUser,
		fbLogin
	}
	)(Login)

export default LoginContainer;