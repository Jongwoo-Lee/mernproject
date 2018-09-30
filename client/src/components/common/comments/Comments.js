import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../spinner";
import shallowCompare from "react-addons-shallow-compare";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  grid: {
    marginTop: 10,
    padding: 20
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    }
  },
  button: {
    margin: 10,
    width: 100
  },
  FormControl: {
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: 250
    }
  }
});

class Comments extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { post, addComment, deleteComment } = this.props;
    let commentContent;
    if (post === null || post.loading || Object.keys(post).length === 0) {
      commentContent = <Spinner />;
    } else {
      commentContent = (
        <div>
          <AppBar position="static" color="default">
            <Toolbar variant="dense">
              <Typography color="inherit">
                댓글 {post.comments.length}
              </Typography>
            </Toolbar>
          </AppBar>
          <CommentFeed
            postID={post._id}
            comments={post.comments}
            deleteComment={deleteComment}
          />
          <br />
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              <Typography color="inherit">댓글 쓰기</Typography>
            </Toolbar>
          </AppBar>
          <CommentForm postID={post._id} addComment={addComment} />
        </div>
      );
    }

    return commentContent;
  }
}

Comments.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = null;

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Comments));
