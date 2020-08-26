import AdminLogin from './component';
import { connect } from 'react-redux';
import { loginUser } from '../../store/user/duck'

const AdminLoginContainer = connect(
	//map state to props
	state => ({
		loginPhase: state.user.loginPhase,
		loginError: state.user.loginError
	}),
	//map dispatch to props
	{
		loginUser
	}
	)(AdminLogin)

export default AdminLoginContainer;