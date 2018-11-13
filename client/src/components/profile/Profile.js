import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";
import { getProfileAuth } from "../../actions/authActions";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import Spinner from "../common/spinner";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  grid: {
    marginTop: 10,
    padding: 20
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      width: "324px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "550px"
    },
    [theme.breakpoints.up("md")]: {
      width: "850px"
    },
    backgroundColor: "#28a745"
  },
  img: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",

    [theme.breakpoints.down("sm")]: {
      width: "100px",
      height: "110px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "200px",
      height: "220px"
    },
    [theme.breakpoints.up("md")]: {
      width: "300px",
      height: "330px"
    }
  },
  header: {
    textAlign: "center",
    color: "white",
    [theme.breakpoints.up("md")]: {
      fontSize: "70px"
    }
  },
  paper: {
    ...theme.mixins.gutters(),
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 110,
    [theme.breakpoints.down("sm")]: {
      width: "324px"
    }
  }
});

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
    if (
      this.props.profile.profile &&
      nextProps.profile.profile &&
      nextProps.profile.profile.handle !== this.props.profile.profile.handle
    ) {
      this.props.getProfileByHandle(nextProps.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { classes } = this.props;
    let profileContent, editButton;

    const userId = this.props.auth.user.id;

    if (profile && profile.user && profile.user._id === userId) {
      editButton = (
        <Button
          variant="contained"
          size="small"
          component={Link}
          to="/edit-profile"
        >
          프로필 수정
        </Button>
      );
    } else {
      editButton = null;
    }

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.grid}
        >
          <Grid item container direction="row" justify="space-around">
            <Button
              variant="contained"
              size="small"
              component={Link}
              to="/members"
            >
              전체 명단
            </Button>
            {editButton}
          </Grid>
          <br />
          <Grid item>
            <ProfileHeader profile={profile} classes={classes} />
          </Grid>
          <ProfileAbout profile={profile} classes={classes} />
        </Grid>
      );
    }

    return profileContent;
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getProfileAuth: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getProfileAuth }
)(withStyles(styles)(Profile));
