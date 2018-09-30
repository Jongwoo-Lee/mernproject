import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUpRounded";
import ThumbDownIcon from "@material-ui/icons/ThumbDownRounded";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
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
      likeByUser: false
    };
  }

  componentDidMount() {
    this.findUserLike(this.props.post.likes);
  }

  onPostClick(id) {
    this.props.history.push(`/post/${id}`);
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      this.setState({ likeByUser: true });
    } else {
      this.setState({ likeByUser: false });
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
    const { post, classes } = this.props;

    const date = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric"
    }).format(new Date(post.date));

    const { likeByUser } = this.state;
    let likeContent;
    if (likeByUser) {
      likeContent = (
        <ThumbUpIcon
          color="secondary"
          fontSize="small"
          onClick={this.onLikeClick.bind(this, post._id)}
        />
      );
    } else {
      likeContent = (
        <ThumbUpIcon
          fontSize="small"
          onClick={this.onLikeClick.bind(this, post._id)}
        />
      );
    }

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={post.thumbnail_image}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography
              variant="subheading"
              onClick={this.onPostClick.bind(this, post._id)}
            >
              {post.name}
              &nbsp;&nbsp;&nbsp;
              <small color="grey">
                <i>{date}</i>
              </small>
            </Typography>

            <Typography
              variant="body1"
              color="textSecondary"
              onClick={this.onPostClick.bind(this, post._id)}
            >
              {post.text}
            </Typography>

            <div className={classes.button}>
              <Button
                size="small"
                className={classes.controls}
                aria-label="Like"
              >
                {likeContent}
                &nbsp;
                <span>{post.likes.length}</span>
              </Button>
              <Button
                size="small"
                className={classes.controls}
                aria-label="Dislike"
                onClick={this.onUnlikeClick.bind(this, post._id)}
              >
                <ThumbDownIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                className={classes.controls}
                aria-label="comments"
                onClick={this.onPostClick.bind(this, post._id)}
              >
                댓글 {post.comments.length}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }
}

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
