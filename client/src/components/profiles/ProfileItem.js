import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  onPostClick(id) {
    this.props.history.push(`/profile/${id}`);
  }

  render() {
    const { profile } = this.props;

    return (
      // <div className="col-md-12 col-lg-5 card card-body bg-secondary text-white m-1 mb-3">
      //   <div
      //     className="row"
      //     onClick={this.onPostClick.bind(this, profile.handle)}
      //   >
      //     <div className="col-4">
      //       <img
      //         src={profile.user.thumbnail_image}
      //         alt=""
      //         className="rounded"
      //       />
      //     </div>
      //     <div className="col-5">
      //       <h3>{profile.user.name}</h3>
      //       <p>
      //         {isEmpty(profile.mainposition) ? null : (
      //           <span>{profile.mainposition[0].label}</span>
      //         )}
      //       </p>
      //     </div>
      //     <div className="col-3">
      //       <h1 className="display-6 text-right">{profile.handle}</h1>
      //     </div>
      //   </div>{" "}
      // </div>
      <div
        className="card col-6 col-md-4 col-lg-2"
        style={{
          paddingLeft: "0",
          paddingRight: "0",
          position: "relative"
        }}
      >
        <img
          className="card-img-top"
          src={profile.user.thumbnail_image}
          alt="player"
          onClick={this.onPostClick.bind(this, profile.handle)}
        />
        <div style={{ position: "absolute", right: "6px", fontSize: "2em" }}>
          <b>{profile.handle}</b>
        </div>
        <div className="card-footer">
          <p className="card-text">
            <b>{profile.user.name}</b>
          </p>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default withRouter(ProfileItem);
