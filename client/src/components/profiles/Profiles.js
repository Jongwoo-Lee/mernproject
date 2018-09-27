import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    // let profileGK = [],
    //   profileDF = [],
    //   profileMF = [],
    //   profileCF = [],
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
      // profileGK = null;
      // profileDF = null;
      // profileMF = null;
      // profileCF = null;
    } else {
      if (profiles.length > 0) {
        // profileItems = null;
        // profiles.forEach(profile => {
        //   const position = profile.mainposition[0].value;
        //   if (position === "GK") {
        //     profileGK.push(<ProfileItem key={profile._id} profile={profile} />);
        //   } else if (position === "CF") {
        //     profileCF.push(<ProfileItem key={profile._id} profile={profile} />);
        //   } else if (
        //     position === "LB" ||
        //     position === "RB" ||
        //     position === "CB"
        //   ) {
        //     profileDF.push(<ProfileItem key={profile._id} profile={profile} />);
        //   } else if (
        //     position === "LM" ||
        //     position === "RM" ||
        //     position === "CM"
        //   ) {
        //     profileMF.push(<ProfileItem key={profile._id} profile={profile} />);
        //   }
        // });
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found ...</h4>;
        // profileGK = null;
        // profileDF = null;
        // profileMF = null;
        // profileCF = null;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">토탈 명단</h1>
            </div>
            {profileItems}
            {/* <div className="col-md-12">
              <b>골키퍼</b>
              <hr />
            </div>
            {profileGK}
            <div className="col-md-12">
              <b>수비수</b>
              <hr />
            </div>
            {profileDF}
            <div className="col-md-12">
              <b>미드필더</b>
              <hr />
            </div>
            {profileMF}
            <div className="col-md-12">
              <b>공격수</b>
              <hr />
            </div>
            {profileCF} */}
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
