import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

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
    const { post, auth, showActions, isMobile } = this.props;

    const date = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric"
    }).format(new Date(post.date));

    const commentStyle = { fontSize: "12px" };
    const buttonStyle = { fontSize: "10px" };

    const { likeByUser } = this.state;
    let likeContent;
    if (likeByUser) {
      likeContent = (
        <i
          className={classnames("fas fa-thumbs-up", {
            "text-info": true
          })}
          onClick={this.onLikeClick.bind(this, post._id)}
        />
      );
    } else {
      likeContent = (
        <i
          className={classnames("fas fa-thumbs-up", {
            "text-info": false
          })}
          onClick={this.onLikeClick.bind(this, post._id)}
        />
      );
    }

    if (isMobile) {
      return (
        <div className="border-bottom mt-3">
          <div className="row">
            <div className="col-2 col-sm-2">
              <p className="text-center" style={commentStyle}>
                <b>{post.name}</b>
              </p>
            </div>
            <div className="col-7 col-sm-7" style={commentStyle}>
              <p onClick={this.onPostClick.bind(this, post._id)}>{post.text}</p>
            </div>
            <div className="col-2 col-sm-2">
              {post.user === auth.user.id ? (
                <i
                  className="fas fa-times"
                  style={buttonStyle}
                  onClick={this.onDeleteClick.bind(this, post._id)}
                />
              ) : null}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-2" />
            <div className="col-8">
              {showActions ? (
                <span>
                  {" "}
                  <div style={buttonStyle}>
                    <small>
                      <i>{date}</i>
                    </small>{" "}
                    &nbsp;&nbsp;&nbsp;
                    {likeContent}
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                    <i
                      className="text-secondary fas fa-thumbs-down ml-3"
                      onClick={this.onUnlikeClick.bind(this, post._id)}
                    />
                    &nbsp;&nbsp;&nbsp;댓글 {post.comments.length}
                  </div>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card card-body mb-4">
          <div className="row">
            <div className="col-3 col-sm-2">
              <a href="profile.html">
                <img
                  className="rounded-circle d-block"
                  src={post.thumbnail_image}
                  alt=""
                />
              </a>
              <br />
              <p className="text-center">
                <b>{post.name}</b>
              </p>
            </div>
            <div className="col-7 col-sm-8">
              <p
                className="lead"
                onClick={this.onPostClick.bind(this, post._id)}
              >
                {post.text}
              </p>
              {showActions ? (
                <span>
                  <small>
                    <i>{date}</i>
                  </small>{" "}
                  &nbsp;
                  <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    {likeContent}
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={this.onUnlikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                </span>
              ) : null}{" "}
              <span onClick={this.onPostClick.bind(this, post._id)}>
                댓글 {post.comments.length}
              </span>
            </div>
            <div className="col-2 col-sm-2">
              {post.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className=" float-right align-top btn btn-light mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired
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
)(withRouter(PostItem));
