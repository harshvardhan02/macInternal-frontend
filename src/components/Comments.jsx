import React, { Component } from 'react';
import http from '../services/httpService';
import Snackbar from '@material-ui/core/Snackbar';

const apiEndpointComment = "http://localhost:4500/api/v1/create_comment"

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                comment: "",
                post_id: this.props.id
            },
            opensnack: false,
            vertical: 'bottom',
            horizontal: 'center'
        }
    }

    handleCloseSnack = () => {
        this.setState({
            opensnack: false
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.createCommentHandler();
    }

    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data })
    }

    createCommentHandler = async () => {
        const data = { ...this.state.data };
        const comment = await http.post(apiEndpointComment, data)
        console.log(comment);
        this.setState({
            opensnack: true,
            data: {
                comment: "",
                post_id: ""
            }
        })
    }

    render() {
        const { vertical, horizontal } = this.state;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical},${horizontal}`}
                    open={this.state.opensnack}
                    onClose={this.handleCloseSnack}
                    message="Comment Addedd Successfully"
                />
                <form onSubmit={this.handleSubmit} className="mt-3">
                    <input
                        value={this.state.data.comment}
                        onChange={this.handleChange}
                        type="text"
                        id="comment"
                        name="comment"
                        className="form-control"
                        placeholder="Add comment"
                    />
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary btn-sm mt-2">Comment</button>
                    </div>
                </form>
            </div>
        )
    }
}
