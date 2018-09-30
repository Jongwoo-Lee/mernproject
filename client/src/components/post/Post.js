import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";
import Spinner from "../common/spinner";
import { getPost } from "../../actions/postActions";
import shallowCompare from "react-addons-shallow-compare";
import { addComment, deleteComment } from "../../actions/postActions";

// Components
import Comments from "../common/comments/Comments";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
    const { addComment, deleteComment, classes } = this.props;
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <Fragment>
          <PostItem post={post} />
          <Comments
            post={post}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        </Fragment>
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
        <Button
          variant="contained"
          size="large"
          className={classes.button}
          component={Link}
          to="/feed"
        >
          돌아가기
        </Button>
        <Grid item sm>
          {postContent}
        </Grid>
      </Grid>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = { getPost, addComment, deleteComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post));
