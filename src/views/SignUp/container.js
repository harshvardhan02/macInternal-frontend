import SignUp from './component';
import { connect } from 'react-redux';
import { signupUser } from '../../store/user/duck';

const SignUpContainer = connect(
	//map state to props
	state => ({
		signUpPhase: state.user.signUpPhase
	}),
	//map dispatch to props
	{
		signupUser
	}
	)(SignUp)

export default SignUpContainer;