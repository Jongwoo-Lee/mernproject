import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

class ProfileItem extends Component {
  onPostClick(id) {
    this.props.history.push(`/profile/${id}`);
  }

  render() {
    const { profile, classes } = this.props;

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

      <Card className={classes.card}>
        <CardActionArea onClick={this.onPostClick.bind(this, profile.handle)}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="140"
            image={profile.user.thumbnail_image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="title" component="h2">
              {profile.handle}
              &nbsp; <small>{profile.user.name}</small>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default withRouter(ProfileItem);
