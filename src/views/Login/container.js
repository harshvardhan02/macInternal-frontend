import Login from './component';
import { connect } from 'react-redux';
import { loginUser, fbLogin, googleLogin } from '../../store/user/duck'

const LoginContainer = connect(
	//map state to props
	state => ({
		loginPhase: state.user.loginPhase,
		accessToken: state.user.accessToken
	}),
	//map dispatch to props
	{
		loginUser,
		fbLogin,
		googleLogin
	}
	)(Login)

export default LoginContainer;