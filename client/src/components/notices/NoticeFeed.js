import React, { Component } from "react";
import PropTypes from "prop-types";
import NoticeItem from "./NoticeItem";

export class NoticeFeed extends Component {
  render() {
    const { posts } = this.props;
    return posts.map(post => <NoticeItem key={post._id} post={post} />);
  }
}

NoticeFeed.propTypes = {
  posts: PropTypes.array.isRequired
};
export default NoticeFeed;
