import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

import PostPaper from "./PostPaper";
import PostCard from "./PostCard";

// Material UI
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      width: "324px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "450px"
    },
    [theme.breakpoints.up("md")]: {
      width: "650px"
    }
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  card: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      width: "450px"
    },
    [theme.breakpoints.up("md")]: {
      width: "650px"
    }
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    display: "flex",
    flexDirection: "row"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 100,
    height: 100
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

export class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeByUser: false,
      isUserPost: false
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onPostClick = this.onPostClick.bind(this);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onUnlikeClick = this.onUnlikeClick.bind(this);
  }

  componentDidMount() {
    this.findUserLike(this.props.post.likes);
    this.findUserPost(this.props.post.user);
  }

  onDeleteClick = id => e => {
    this.props.deletePost(id);
    window.location.href = "/feed";
  };

  onPostClick = id => e => {
    this.props.history.push(`/post/${id}`);
  };

  onLikeClick = id => e => {
    this.props.addLike(id);
  };

  onUnlikeClick = id => e => {
    this.props.removeLike(id);
  };

  findUserLike(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      this.setState({ likeByUser: true });
    } else {
      this.setState({ likeByUser: false });
    }
  }

  findUserPost(user) {
    const { auth } = this.props;
    if (user === auth.user.id) {
      this.setState({ isUserPost: true });
    } else {
      this.setState({ isUserPost: false });
    }
  }

  async shouldComponentUpdate(nextProps) {
    if (
      nextProps.post &&
      nextProps.post.likes.length !== this.props.post.likes.length
    ) {
      await this.findUserLike(nextProps.post.likes);
      return true;
    }
    return false;
  }

  render() {
    const { post, classes, isCard } = this.props;
    const { likeByUser, isUserPost } = this.state;

    return (
      <Fragment>
        {isCard ? (
          <PostCard
            post={post}
            classes={classes}
            likeByUser={likeByUser}
            isUserPost={isUserPost}
            onLikeClick={this.onLikeClick}
            onUnlikeClick={this.onUnlikeClick}
            onDeleteClick={this.onDeleteClick}
            onPostClick={this.onPostClick}
          />
        ) : (
          <PostPaper
            post={post}
            classes={classes}
            likeByUser={likeByUser}
            isUserPost={isUserPost}
            onLikeClick={this.onLikeClick}
            onUnlikeClick={this.onUnlikeClick}
            onDeleteClick={this.onDeleteClick}
            onPostClick={this.onPostClick}
          />
        )}
      </Fragment>
    );
  }
}

PostItem.defaultProps = {
  isCard: false
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  deletePost,
  addLike,
  removeLike
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(PostItem)));
