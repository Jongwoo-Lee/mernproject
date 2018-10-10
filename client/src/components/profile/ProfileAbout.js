import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";

function PositionIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M8,3C6.343,3,5,1.657,5,0H0v6h3v10h10V6h3V0h-5C11,1.657,9.657,3,8,3z" />
    </SvgIcon>
  );
}

const ShoeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="30"
      height="30"
      x="0px"
      y="0px"
      viewBox="0 0 48 60"
      enableBackground="new 0 0 48 48"
    >
      <path
        fill="#000000"
        d="M42.6,24.1c-1.6,0-3.7-0.6-6.1-1.6c-1.2,1.3-3.5,3.4-6.9,5.1l-1.4-2.7c2.3-1.2,4.1-2.6,5.2-3.7  c-0.9-0.4-1.8-0.9-2.7-1.3c-1.2,1.3-3.5,3.3-6.7,4.9L22.7,22c2.3-1.2,4.1-2.6,5.2-3.7c-0.9-0.5-1.8-1-2.6-1.5  c-1.2,1.3-3.5,3.3-6.8,5l-1.4-2.7c2.5-1.3,4.3-2.8,5.4-3.9c-2.5-1.5-4.2-2.6-4.2-2.6S12.3,15.9,3.6,12c0,0-5.1,7.6-2.3,17.5  c0,0,0.4,0,1.1,0v3.1h3.1v-3c0.8,0,1.6,0.1,2.6,0.1v2.9h3.1V30c3.6,0.3,7.9,0.9,12.1,2v3.4h3.1v-2.5c1.3,0.4,2.6,0.6,3.8,0.8V36h3.1  v-2.2c0.8,0,1.7,0,2.5-0.1V36h3.1v-2.6c1.1-0.2,2-0.4,2.9-0.7v2.2h3.1v-3.3c1.5-0.6,2.4-1.2,2.4-1.2S49.6,24.2,42.6,24.1z"
      />
    </svg>
  );
};

class ProfileAbout extends Component {
  render() {
    const { profile, classes } = this.props;

    // Position List
    const mainposition = profile.mainposition.map(skill => (
      <div key={skill.num} className="p-3">
        <PositionIcon /> {skill.value}
      </div>
    ));

    const mainfoot = profile.mainfoot.map(foot => (
      <div key={foot.num} className="p-3">
        <ShoeIcon />
        {foot.value === "right"
          ? "오른발"
          : foot.value === "left"
            ? "왼발"
            : null}
      </div>
    ));

    return (
      <Grid item container direction="row" justify="center">
        <Grid item md={6}>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="title" style={{ textAlign: "center" }}>
              <b>포지션</b>
            </Typography>
            <Grid container direction="row" justify="center">
              {mainposition}
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="title" style={{ textAlign: "center" }}>
              <b>사용발</b>
            </Typography>
            <Grid container direction="row" justify="center">
              {mainfoot}
            </Grid>
          </Paper>
        </Grid>
        {isEmpty(profile.bio) ? (
          <Grid item md={12}>
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="title" style={{ textAlign: "center" }}>
                <b>자기 소개</b>
              </Typography>
              <Typography variant="body2" style={{ textAlign: "center" }}>
                <span>{profile.bio}</span>
              </Typography>
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
