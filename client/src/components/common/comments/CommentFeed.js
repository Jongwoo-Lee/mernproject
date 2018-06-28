import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, postID, isMobile } = this.props;
    return comments.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
        postID={postID}
        isMobile={isMobile}
        deleteComment={this.props.deleteComment}
      />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
};

export default CommentFeed;
