import { connect } from 'react-redux';
import Home from './component';
import { getPosts, deletePost } from '../../store/user/duck'

const HomeContainer = connect(
	//map state to props
	state => ({
		posts: state.user.posts
	}),
	//map dispatch to props
	{
		getPosts,
		deletePost
	}
	)(Home)

export default HomeContainer;