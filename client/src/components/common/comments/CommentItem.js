import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CommentItem extends Component {
  onDeleteClick(postID, commentID) {
    this.props.deleteComment(postID, commentID);
  }

  render() {
    const { comment, postID, auth, isMobile } = this.props;
    const commentStyle = { fontSize: "15px" };
    const buttonStyle = { fontSize: "10px" };

    const date = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric"
    }).format(new Date(comment.date));

    if (isMobile) {
      return (
        <div className="border-bottom">
          <div className="row mt-3">
            <div className="col-3 col-sm-2">
              <p className="text-center" style={commentStyle}>
                <b>{comment.name}</b>
              </p>
            </div>
            <div className="col-7 col-sm-8" style={commentStyle}>
              <p>{comment.text}</p>
              <small>
                <i>{date}</i>
              </small>
            </div>
            <div className="col-2 col-sm-2">
              {comment.user === auth.user.id ? (
                <i
                  className="fas fa-times"
                  style={buttonStyle}
                  onClick={this.onDeleteClick.bind(this, postID, comment._id)}
                />
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card card-body">
          <div className="row">
            <div className="col-2">
              <a
                href="profile.html"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  className="rounded-circle d-none d-md-block"
                  src={comment.thumbnail_image}
                  alt=""
                />
              </a>
              <br />
              <p className="text-center">
                <b>{comment.name}</b>
              </p>
            </div>
            <div className="col-10">
              {comment.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, postID, comment._id)}
                  type="button"
                  className="float-right align-top btn btn-light mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}{" "}
              <p className="lead">{comment.text}</p>{" "}
              <small>
                <i>{date}</i>
              </small>
            </div>
          </div>
        </div>
      );
    }
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
