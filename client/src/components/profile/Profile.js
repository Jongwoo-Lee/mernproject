import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/spinner";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/create-profile");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent, editButton;

    const userId = this.props.auth.user.id;

    if (profile && profile.user && profile.user._id === userId) {
      editButton = (
        <Link to="/edit-profile" className="btn btn-light mb-3 float-right">
          프로필 수정
        </Link>
      );
    } else {
      editButton = null;
    }

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/members" className="btn btn-light mb-3 float-left">
                전체 명단
              </Link>
            </div>
            <div className="col-md-6">{editButton}</div>
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
