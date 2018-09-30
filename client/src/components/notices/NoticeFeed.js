import React, { Component } from "react";
import PropTypes from "prop-types";
import NoticeItem from "./NoticeItem";

export class NoticeFeed extends Component {
  render() {
    const { notices, classes } = this.props;
    return notices.map(notice => (
      <NoticeItem key={notice._id} notice={notice} classes={classes} />
    ));
  }
}

NoticeFeed.propTypes = {
  notices: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};
export default NoticeFeed;
