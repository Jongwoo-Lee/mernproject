import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "../common/comments/CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, postID, isMobile } = this.props;
    return comments.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
        postID={postID}
        isMobile={isMobile}
      />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postID: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
};

export default CommentFeed;
