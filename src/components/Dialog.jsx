import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import http from '../services/httpService';

const apiEndpointGetComments = "http://localhost:4500/api/v1/get_comments";

export default class DialogOne extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            comments: [],
            id: ""
        }
    }

    getComments = async id => {
        const post = await http.get(apiEndpointGetComments + "/" + this.props.id);
        this.setState({
            comments: post.data
        })
    }

    render() {
        return (
                <Dialog
                    open={this.props.open}
                    onClose={this.props.close}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Comments"}</DialogTitle>
                    <DialogContent>
                        {this.props.data.map(data => (
                            <DialogContentText key={data._id} id="alert-dialog-description">
                                {data.comment}
                            </DialogContentText>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.close} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
        )
    }
}
