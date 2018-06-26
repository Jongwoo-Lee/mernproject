import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick(postID, commentID) {
    this.props.deleteComment(postID, commentID);
  }

  render() {
    const { comment, postID, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
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
                style={{ width: "70px" }}
              />
            </a>
            <br />
            <p className="text-center">
              <b>{comment.name}</b>
            </p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postID, comment._id)}
                type="button"
                className="float-right align-top btn btn-light mr-1"
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

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  deleteComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
