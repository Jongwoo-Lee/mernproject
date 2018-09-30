import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";
import CommentForm from "../common/comments/CommentForm";
import CommentFeed from "../common/comments/CommentFeed";
import Spinner from "../common/spinner";
import { getPost, addComment, deleteComment } from "../../actions/postActions";

import shallowCompare from "react-addons-shallow-compare";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { classes } = this.props;
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} />
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
            deleteComment={this.props.deleteComment}
          />
          <br />
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              <Typography color="inherit">댓글 쓰기</Typography>
            </Toolbar>
          </AppBar>
          <CommentForm postID={post._id} addComment={this.props.addComment} />
        </div>
      );
    }

    return (
      <Grid
        container
        className={classes.grid}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid item sm>
          <Button
            variant="contained"
            size="large"
            className={classes.button}
            component={Link}
            to="/feed"
          >
            돌아가기
          </Button>
          {postContent}
        </Grid>
      </Grid>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = { getPost, addComment, deleteComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post));
