import React, { Component } from "react";
import PropTypes from "prop-types";
import MatchItem from "./MatchItem";

export class MatchFeed extends Component {
  render() {
    const { matches, classes, history } = this.props;
    return matches.map(match => (
      <MatchItem
        key={match._id}
        match={match}
        classes={classes}
        history={history}
      />
    ));
  }
}

MatchFeed.propTypes = {
  matches: PropTypes.array.isRequired
};
export default MatchFeed;
