import React, { Component } from 'react';
// import Snackbar from '@material-ui/core/Snackbar'
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Header from '../Header/container';
import Pagination from '../../components/Pagination';
import { indexOf } from 'lodash';

export default class Home extends Component {
    constructor(props) {
        super(props);
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
            comments: [],
            error: '',
            openError: true,
            pageSize: 2,
            currentPage: 1
        }
    }

    //new method
    static getDerivedStateFromProps = (state, props) => {
        if (props.posts !== state.posts) {
            return {
                posts: state.posts
            }
        }
        return null
    }
    
    nextPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    }

    prevPage = () => {
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    }

    //old method

    // componentWillReceiveProps(props, state){
    //     console.log(props, "props")
    //     console.log(state, "state")
    //     const { posts } = props;
    //     this.setState({
    //         posts
    //     })
    // }

    componentDidUpdate(prevProps) {
        if (this.props.error !== prevProps.error) {
            this.setState({
                error: this.props.error,
                openError: true
            })
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
        const { currentPage, pageSize } = this.state
        this.props.getPosts()

        const { posts, show } = this.state
        posts.map(post => this.setState({ show: { ...show, [post._id]: false } }))
    }

    handleCloseSnack = () => {
        this.setState({
            opensnack: false
        })
    }

    deletePost = id => {
        this.props.deletePost(id)
        this.props.getPosts()
    }

    handlePageChange = page => {
        console.log(page)
        this.setState({ currentPage: page });
    }

    render() {
        const { currentPage, pageSize, posts } = this.state;
        const indexOfLastPost = currentPage * pageSize;
        const indexOfFirstPost = indexOfLastPost - pageSize;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

        return (
            <div>
                <Header {...this.props} />
                <div className="container">
                    {
                        this.state.posts.length === 0 ?
                            <div className="card mt-5">
                                <div className="card-header text-center">No data found</div>
                            </div>
                            :
                            null
                    }
                    <div className="col-lg-8 offset-lg-2 pb-5">
                        {currentPosts.map(post => (
                            <React.Fragment key={post._id}>
                                <div className="card mt-4">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong className="card-title w-75">{post.title}</strong>
                                            <div className="w-25 text-right">
                                                <span onClick={() => this.deletePost(post._id)} className="badge badge-danger cp">Delete</span>
                                                <span className="badge badge-primary cp ml-3">
                                                    <Link className="text-white" to={`/updatepost/${post._id}`}>Update</Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card-text">
                                            {parse(post.body)}
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="d-flex justify-content-end">
                                            <span className="badge badge-pill badge-secondary mr-3 cp">Comment</span>
                                            <span className="badge badge-pill badge-info cp">View comment</span>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}

                        <Pagination 
                            itemsCount={posts.length} 
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}
                        />
                    </div>
                </div>
            </div>
        )
    }
}