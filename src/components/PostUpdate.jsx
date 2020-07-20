import React, { Component } from 'react';
import http from '../services/httpService';
import Snackbar from '@material-ui/core/Snackbar';

const apiEndpoint = 'http://localhost:4500/api/v1/update_post';
const apiEndpointUrl = 'http://localhost:4500/api/v1/get_postsById';

export default class PostUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                title: "",
                body: ""
            },
            body: "",
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            singlepost: null,
            opensnack: false
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const data = await http.get(apiEndpointUrl + "/" + id)
        const post = data.data.data
        console.log(post);
        this.setState({
            singlepost: data,
            post: {
                title: post.title,
                body: post.body
            }
        })
    }

    handleChange = ({ currentTarget: input }) => {
        const post = { ...this.state.post };
        post[input.name] = input.value;
        this.setState({ post })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.updatePost();
        this.setState({
            post: {
                title: "",
                body: ""
            }
        })
        window.location = "/"
    }

    updatePost = async () => {
        const data = { ...this.state.post };
        const id = this.props.match.params.id;
        const post = await http.put(apiEndpoint + "/" + id, data);
        this.setState({
            opensnack: true
        })
        console.log(post)
    }

    handleClose = () => {
        this.setState({
            opensnack: false
        })
    }

    render() {
        const { post, vertical, horizontal, opensnack } = this.state;
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical},${horizontal}`}
                    open={opensnack}
                    onClose={this.handleClose}
                    message="Post Updated Successfully"
                />
                <div className="col-lg-8 offset-lg-2">
                    <h4 className="text-center mt-4">Update Post</h4>
                    <form onSubmit={this.handleSubmit} className="py-2">
                        <div className="form-group">
                            <label htmlFor="title">Post Title</label>
                            <input
                                value={post.title}
                                onChange={this.handleChange}
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Post Description</label>
                            <textarea
                                rows="6"
                                value={post.body}
                                onChange={this.handleChange}
                                type="text"
                                id="body"
                                name="body"
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
