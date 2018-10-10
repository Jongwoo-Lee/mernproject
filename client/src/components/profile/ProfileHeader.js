import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

class ProfileHeader extends Component {
  render() {
    const { profile, classes } = this.props;

    let date;
    if (!isEmpty(profile.birthday)) {
      date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date(profile.birthday));
    }

    return (
      <Paper className={classes.root}>
        <Grid container spacing={8} justify="center">
          <Grid
            item
            container
            display="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={3}>
              <Typography variant="display2" className={classes.header}>
                {profile.mainposition[0] ? profile.mainposition[0].value : null}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Avatar
                className={classes.img}
                alt="profile image"
                src={profile.user.thumbnail_image}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="display2" className={classes.header}>
                {profile.handle}
              </Typography>
            </Grid>
          </Grid>
          <br />
          <Grid item>
            <Typography variant="display2" className={classes.header}>
              {profile.user.name}
            </Typography>
            <div className="text-center" style={{ color: "white" }}>
              <p className="lead text-center">
                {isEmpty(profile.height) ? null : (
                  <span>
                    {profile.height}
                    cm,{" "}
                  </span>
                )}
                {isEmpty(profile.weight) ? null : (
                  <span>
                    {profile.weight}
                    kg
                  </span>
                )}
              </p>
              {isEmpty(profile.birthday) ? null : <p>생일: {date}</p>}

              <p>
                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}

                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default ProfileHeader;
