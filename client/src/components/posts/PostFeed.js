import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

export class PostFeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts, isMobile } = this.props;
    return posts.map(post => (
      <PostItem key={post._id} post={post} isMobile={isMobile} />
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  isMobile: PropTypes.bool.isRequired
};
export default PostFeed;
