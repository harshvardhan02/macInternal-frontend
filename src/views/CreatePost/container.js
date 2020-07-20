import { connect } from 'react-redux';
import CreatePost from './component';
import { createPost } from '../../store/user/duck'

const CreatePostContainer = connect(
	// map state to props
	state => ({
		phase: state.user.phase,
		success: state.user.createPostMessage
	}),
	// map dispatch to props
	{
		createPost
	}
	)(CreatePost)

export default CreatePostContainer;	

