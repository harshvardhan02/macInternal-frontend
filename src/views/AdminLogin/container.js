import AdminLogin from './component';
import { connect } from 'react-redux';
import { loginUser, fbLogin } from '../../store/user/duck'

const AdminLoginContainer = connect(
	//map state to props
	state => ({
        loginPhase: state.user.loginPhase
	}),
	//map dispatch to props
	{
		loginUser
	}
	)(AdminLogin)

export default AdminLoginContainer;