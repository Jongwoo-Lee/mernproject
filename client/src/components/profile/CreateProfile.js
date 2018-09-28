import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileActions";
import { getProfileAuth } from "../../actions/authActions";

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

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.auth.user.name,
      handle: "",
      height: "",
      weight: "",
      mainfoot: [],
      mainposition: [],
      birthday: "1990-01-01",
      bio: "",
      twitter: "https://www.twitter.com/",
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
      youtube: "https://www.youtube.com/",
      instagram: "https://www.instagram.com/",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  async onSubmit(e) {
    e.preventDefault();

    // Main Position 순서 정하기
    let num = 0;
    let mainposition = this.state.mainposition.map(pos => {
      let newPos = { value: pos, num: num++ };
      return newPos;
    });

    num = 0;
    let mainfoot = this.state.mainfoot.map(pos => {
      let newPos = {};
      newPos.value = pos;
      newPos.num = num++;
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
    if (this.state.handle !== this.props.auth.user.handle) handleChange = true;

    const profileData = {
      id: this.props.auth.user.id,
      name: this.state.name,
      handle: this.state.handle,
      height: this.state.height,
      weight: this.state.weight,
      mainfoot: mainfoot,
      mainposition: mainposition,
      birthday: this.state.birthday,
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

  selectChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    });

  render() {
    const { classes } = this.props;

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
            개인 프로필 작성
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfileAuth: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getProfileAuth }
)(withRouter(withStyles(styles)(CreateProfile)));
