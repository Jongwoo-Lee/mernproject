import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteNotice, addLike, removeLike } from "../../actions/noticeActions";

// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUpRounded";
import ThumbDownIcon from "@material-ui/icons/ThumbDownRounded";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

class NoticePaper extends Component {
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
    this.findUserLike(this.props.notice.likes);
    this.findUserPost(this.props.notice.user);
  }

  onDeleteClick = id => e => {
    this.props.deleteNotice(id);
    window.location.href = "/notices";
  };

  onPostClick = id => e => {
    this.props.history.push(`/notice/${id}`);
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
      nextProps.notice &&
      nextProps.notice.likes.length !== this.props.notice.likes.length
    ) {
      await this.findUserLike(nextProps.notice.likes);
      return true;
    }
    return false;
  }

  render() {
    const { notice, classes } = this.props;
    const { likeByUser, isUserPost } = this.state;

    const date = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    }).format(new Date(notice.date));

    let likeContent;
    if (likeByUser) {
      likeContent = (
        <ThumbUpIcon
          color="secondary"
          fontSize="small"
          onClick={this.onLikeClick(notice._id)}
        />
      );
    } else {
      likeContent = (
        <ThumbUpIcon fontSize="small" onClick={this.onLikeClick(notice._id)} />
      );
    }

    return (
      <Paper className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="display1">
                  {notice.title}
                </Typography>
                <Typography gutterBottom variant="subheading">
                  {notice.name}
                </Typography>
                <Typography color="textSecondary">{date}</Typography>
                <br />
                <div dangerouslySetInnerHTML={{ __html: notice.text }} />
              </Grid>
              <Grid item xs>
                <Grid item xs container direction="row" justify="center">
                  <Button
                    size="small"
                    className={classes.controls}
                    aria-label="Like"
                  >
                    {likeContent}
                    &nbsp;
                    <span>{notice.likes.length}</span>
                  </Button>
                  <Button
                    size="small"
                    className={classes.controls}
                    aria-label="Dislike"
                    onClick={this.onUnlikeClick(notice._id)}
                  >
                    <ThumbDownIcon fontSize="small" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {isUserPost ? (
              <Grid item>
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={this.onDeleteClick(notice._id)}
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

NoticePaper.propTypes = {
  deleteNotice: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  notice: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  deleteNotice,
  addLike,
  removeLike
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NoticePaper));
