import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Snackbar from '@material-ui/core/Snackbar';

export default class updatePost extends Component {
	constructor(props) {
        super(props);
        this.state = {
            vertical: 'bottom',
            horizontal: 'center',
            title: '',
            body: '',
            posts: []           
        }
    }

   	// static getDerivedStateFromProps = (props, state) => {
   	// 	if(props.postById !== state.posts){
    //         return {
    //             posts: props.postById,
    //             title: props.postById.title
    //         }
    //     }
    //     return null
   	// }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            body: content
        })
    }

    componentDidMount(){
    	const id = this.props.match.params.id;
    	this.props.getPostById(id);
    }

    componentDidUpdate(prevProps){
    	console.log(prevProps.postById)
    	if(this.props.postById !== prevProps.postById) {
    		this.setState({ 
    			posts: this.props.postById, 
    			title: this.props.postById.title, 
    			body: this.props.postById.body
    		})
    	}
    }

    onSubmit = e => {
    	e.preventDefault();
    	const id = this.props.match.params.id;
    	const { title, body } = this.state;
    	const data = { title, body };
    	console.log(data)
    	this.props.updatePosts(id, data);
    }

	render(){
		const { vertical, horizontal } = this.state;
		return(
			<div className="container">
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical},${horizontal}`}
                    open={this.state.open}
                    onClose={this.handleClose}
                    message={this.props.success}
                />
                <div className="col-lg-8 offset-lg-2">
                    <h4 className="text-center mt-4">Update Post</h4>                    
                    <form onSubmit={this.onSubmit} className="py-2">
                        <div className="form-group">
                            <label htmlFor="title">Post Title</label>
                            <input
                                value={this.state.title}
                                onChange={this.handleInput}
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Post Description</label>                            
                            <Editor
                                apiKey='9ztainkpdpehxdxkpztgt25fo6vlonfmjg1l4jduqdnfrfhv'
                                initialValue={this.state.body}
                                init={{
                                    height: 300,
                                    menubar: true,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount table emoticons'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor forecolor table emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                                }}
                                onEditorChange={this.handleEditorChange}
                                className="form-control"
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary">Update Post</button>
                        </div>
                    </form>
                </div>
            </div>
		)
	}
}