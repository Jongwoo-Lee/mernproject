import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "../post/PostItem";

export class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    return posts.map(post => (
      <PostItem key={post._id} post={post} isCard={true} />
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};
export default PostFeed;
