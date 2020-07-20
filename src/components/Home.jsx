import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar'
import { Link } from 'react-router-dom';
import Comments from './Comments';
import DialogOne from './Dialog';
import parse from 'html-react-parser';
import Practice from './Practice';


const HOSTNAME = process.env.REACT_APP_API_HOSTNAME;

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            show: {},
            isOpen: false,
            open: false,
            setOpen: false,
            posts: [],
            opensnack: false,
            vertical: 'bottom',
            horizontal: 'center',
            shared_id: "",
            comments: []
        }
    }

    
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    commentInputHandler = id => {
        const { show } = this.state
        this.setState({
            show: { ...show, [id]: !show.id }
        })
    }

    componentDidMount() {
        const { posts, show } = this.state
        posts.map(post => this.setState({ show: { ...show, [post._id]: false } }))
        console.log(HOSTNAME);
    }

    handleCloseSnack = () => {
        this.setState({
            opensnack: false
        })
    }   

    render() {
        const { vertical, horizontal } = this.state;
        if (this.state.posts.length === 0) {
            return (
                <div className="container">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="card mt-5">
                            <div className="card-header text-center">No data found</div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical},${horizontal}`}
                    open={this.state.opensnack}
                    onClose={this.handleCloseSnack}
                    message="Post Deleted Successfully"
                />
                <div className="col-lg-8 offset-lg-2 pb-5">
                    {this.state.posts.map(post => (
                        <React.Fragment key={post._id}>
                            <div className="card mt-4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="card-title w-75">{post.title}</h4>
                                        <div className="w-25 text-right">
                                            <span onClick={() => this.deletePost(post._id)} className="badge badge-danger cp">Delete</span>
                                            <span className="badge badge-primary cp ml-3">
                                                <Link className="text-white" to={`/postupdate/${post._id}`}>Update</Link>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-text">
                                        {parse(post.body)}
                                    </div>
                                    <Practice id={post._id} />
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-end">
                                        <span onClick={() => this.commentInputHandler(post._id)} className="badge badge-pill badge-secondary mr-3 cp">Comment</span>
                                        <span onClick={() => this.handleClickOpen(post._id)} className="badge badge-pill badge-info cp">View comment</span>
                                    </div>
                                    {this.state.show[post._id] ?
                                        <div>
                                            <Comments id={post._id} />
                                        </div> : null
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <DialogOne
                    data={this.state.comments}
                    id={this.state.shared_id}
                    open={this.state.open}
                    close={this.handleClose}
                />
            </div>
        )
    }
}