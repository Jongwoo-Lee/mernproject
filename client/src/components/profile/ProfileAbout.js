import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Position List
    const mainposition = profile.mainposition.map(skill => (
      <div key={skill.num} className="p-3">
        <i className="fa fa-check" /> {skill.value}
      </div>
    ));

    const mainfoot = profile.mainfoot.map(foot => (
      <div key={foot.num} className="p-3">
        <i className="fa fa-check" /> {foot.label}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-6 card card-body bg-light mb-3">
          <h3 className="text-center text-info">포지션</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {mainposition}
          </div>
        </div>
        <div className="col-md-6 card card-body bg-light mb-3">
          <h3 className="text-center text-info">사용발</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {mainfoot}
          </div>
        </div>
        <div className="col-md-12 card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstName}'s Bio</h3>
          <p className="lead">
            {isEmpty(profile.bio) ? (
              <span>{firstName} does not have a bio</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
