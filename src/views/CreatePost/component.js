import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Snackbar from '@material-ui/core/Snackbar';
import Header from '../Header/component';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            title: "",
            body: ""
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.handleCreatePost();
        this.setState({
            post: {
                title: "",
                body: ""
            }
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            body: content
        })
    }

    handleCreatePost = async () => {
        const { title, body } = this.state;
        const data = { title, body }
        this.props.createPost(data);
        this.setState({
            open: true
        })
    }


    render() {
        const { vertical, horizontal } = this.state;
        return (
            <div>
                <Header {...this.props} />
                <div className="container">
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        key={`${vertical},${horizontal}`}
                        open={this.state.open}
                        onClose={this.handleClose}
                        message={this.props.success}
                    />
                    <div className="col-lg-8 offset-lg-2">
                        <h4 className="text-center mt-4">Create Post</h4>
                        {/* <div className="alert alert-success mt-3" role="alert">
                        <strong>Sucess!</strong> You successfully created this
                        post.
                    </div> */}
                        <form onSubmit={this.handleSubmit} className="py-2">
                            <div className="form-group">
                                <label htmlFor="title">Post Title</label>
                                <input
                                    value={this.state.title}
                                    onChange={this.handleInput}
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Post Description</label>
                                {/*<textarea
                                rows="6"
                                value={post.body}
                                onChange={this.handleChange}
                                type="text"
                                id="body"
                                name="body"
                                className="form-control"
                            />*/}
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
                                <button className="btn btn-primary">Create Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}