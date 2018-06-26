import React, { Component } from "react";
import PropTypes from "prop-types";
import NoticeItem from "./NoticeItem";

export class NoticeFeed extends Component {
  render() {
    const { notices } = this.props;
    return notices.map(notice => (
      <NoticeItem key={notice._id} notice={notice} />
    ));
  }
}

NoticeFeed.propTypes = {
  notices: PropTypes.array.isRequired
};
export default NoticeFeed;
