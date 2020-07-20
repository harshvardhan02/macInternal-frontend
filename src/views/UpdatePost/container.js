import { connect } from 'react-redux';
import updatePost from './component';
import { getPostById, updatePosts } from '../../store/user/duck';

const UpdatePostContainer = connect(
	// map state to props
	state => ({
		postById: state.user.getPostById
	}),
	// map dispatch to props
	{
		getPostById, updatePosts
	}
	)(updatePost)

export default UpdatePostContainer;