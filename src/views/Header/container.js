import Header from './component';
import { connect } from 'react-redux';
import { logout } from '../../store/user/duck'

const HeaderContainer = connect(
	//map state to props
	state => ({
        
	}),
	//map dispatch to props
	{
		logout
	}
	)(Header)

export default HeaderContainer;