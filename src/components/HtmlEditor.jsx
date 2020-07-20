import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';

export default class HtmlEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                title: '',
                body: ''
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const data = { ...this.state.post }
        console.log(data);
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            post: {
                body: content
            }
        });
        console.log(content, editor)
    }

    handleChange = e => {
        let data = this.state.post.title
        data = e.currentTarget.value;
        this.setState({
            post: {
                title: data
            }
        })
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Post Title</label>
                        <input
                            value={this.state.post.title}
                            onChange={this.handleChange}
                            type="text"                            
                            className="form-control"
                        />
                    </div>
                    {parse(this.state.post.body)}
                    <Editor
                        apiKey='9ztainkpdpehxdxkpztgt25fo6vlonfmjg1l4jduqdnfrfhv'
                        initialValue={this.state.post.body}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={this.handleEditorChange}
                        className="form-control"
                    />
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary">Create Post</button>
                    </div>
                </form>
            </div>
        )
    }
}
