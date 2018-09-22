import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

// Component
import ProfileForm from "./ProfileForm";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  grid: {
    marginTop: 10,
    padding: 20
  },
  paper: {
    padding: 20,
    [theme.breakpoints.up("md")]: {
      width: "650px"
    }
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    }
  },
  button: {
    margin: 10,
    width: 200
  },
  FormControl: {
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: 250
    }
  }
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      handle: "",
      height: "",
      weight: "",
      mainfoot: [],
      mainposition: [],
      birthday: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const { profile } = nextProps.profile;

      // Bring skills array back to CSV
      // const positionCSV = profile.mainposition.join(",");
      // const footCSV = profile.mainfoot.join(",");

      // If profile field doesn't exist, make empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.height = !isEmpty(profile.height) ? profile.height : "";
      profile.weight = !isEmpty(profile.weight) ? profile.weight : "";
      profile.birthday = !isEmpty(profile.birthday) ? profile.birthday : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      this.setState({
        handle: profile.handle,
        height: profile.height,
        weight: profile.weight,
        birthday: profile.birthday,
        mainposition: profile.mainposition,
        mainfoot: profile.mainfoot,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  selectChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    });

  async onSubmit(e) {
    e.preventDefault();

    // Main Position 순서 정하기
    let num = 0;
    let mainposition = this.state.mainposition.map(pos => {
      let newPos = { ...pos, num: num++ };
      return newPos;
    });

    num = 0;
    let mainfoot = this.state.mainfoot.map(pos => {
      let newPos = {};
      newPos.label = pos.label;
      newPos.value = num++;
      return newPos;
    });

    if (this.state.twitter === "https://www.twitter.com/")
      await this.setState({ twitter: null });
    if (this.state.facebook === "https://www.facebook.com/")
      await this.setState({ facebook: null });
    if (this.state.linkedin === "https://www.linkedin.com/")
      await this.setState({ linkedin: null });
    if (this.state.youtube === "https://www.youtube.com/")
      await this.setState({ youtube: null });
    if (this.state.instagram === "https://www.instagram.com/")
      await this.setState({ instagram: null });

    let handleChange = false;
    if (this.state.handle !== this.props.profile.profile.user.handle)
      handleChange = true;

    const profileData = {
      id: this.props.auth.user.id,
      name: this.state.name,
      handle: this.state.handle,
      height: this.state.height,
      weight: this.state.weight,
      birthday: this.state.birthday,
      mainposition: mainposition,
      mainfoot: mainfoot,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      handleChange
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    let handle;
    if (this.props.profile && this.props.profile.profile) {
      handle = this.props.profile.profile.handle;
    }

    return (
      <Grid
        container
        className={classes.grid}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid item sm>
          <Typography
            variant="display3"
            className={classes.title}
            align="center"
          >
            개인 프로필 수정
          </Typography>
          <ProfileForm
            selectChange={this.selectChange}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            formState={this.state}
            classes={classes}
          />
        </Grid>
      </Grid>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(withStyles(styles)(EditProfile)));
