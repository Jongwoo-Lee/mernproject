import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
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
    const { post, auth, showActions } = this.props;

    const { likeByUser } = this.state;
    let likeContent;
    if (likeByUser) {
      likeContent = (
        <i
          className={classnames("fas fa-thumbs-up", {
            "text-info": true
          })}
        />
      );
    } else {
      likeContent = (
        <i
          className={classnames("fas fa-thumbs-up", {
            "text-info": false
          })}
        />
      );
    }

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.thumbnail_image}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">
              <b>{post.name}</b>
            </p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  {likeContent}
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-dark mr-1">
                  댓글
                </Link>
              </span>
            ) : null}
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

PostItem.defaultProps = {
  showActions: true
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
)(PostItem);
