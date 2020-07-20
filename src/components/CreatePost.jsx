import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Snackbar from '@material-ui/core/Snackbar'
import http from '../services/httpService';
const apiEndpoint = "http://localhost:4500/api/v1/create_post"

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*post: {
                title: "",
                body: ""
            },*/
            body: "",
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            title: "",
            body: ""
        }
    }

    handleChange = ({ currentTarget: input }) => {
        const post = { ...this.state.post };
        post[input.name] = input.value;
        this.setState({ post })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.title, this.state.body);
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
        console.log(editor)
        this.setState({
            body: content
        })
    }

    handleCreatePost = async () => {
        // const data = { ...this.state.post };
        const { title, body } = this.state;
        const data = { title, body}
        const post = await http.post(apiEndpoint, data);
        console.log(post);
        this.setState({
            open: true
        })
    }


    render() {
        const { post, vertical, horizontal } = this.state;
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical},${horizontal}`}
                    open={this.state.open}
                    onClose={this.handleClose}
                    message="Post created Successfully"
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
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount table emoticons'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor forecolor table emoticons | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help'
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
        )
    }
}