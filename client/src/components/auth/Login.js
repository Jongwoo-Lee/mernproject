import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import kakaoBtn from "../common/images/kakao_btn_wide.png";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/feed");
    }
  }

  componentWillReceiveProps(nextProps) {
    // If some logged in user tries to get into login page, redirect to dashboard
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/feed");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, password, errors } = this.state;
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
            로그인
          </Typography>
          <Typography variant="subheading" align="center">
            토탈FC 커뮤티니 사이트에 접속하세요
          </Typography>
          <br />
          <Paper className={classes.paper}>
            <form noValidate style={{ textAlign: "center" }}>
              <TextField
                label="이메일"
                name="email"
                type="email"
                value={email}
                onChange={this.onChange}
                margin="normal"
                className={classes.FormControl}
                error={errors.email}
                helperText={errors.email}
              />
              <br />
              <TextField
                label="비밀번호"
                name="password"
                type="password"
                value={password}
                onChange={this.onChange}
                margin="normal"
                className={classes.FormControl}
                error={errors.password}
                helperText={errors.password}
              />
              <br />
              <Button
                color="secondary"
                size="large"
                variant="raised"
                onClick={this.onSubmit}
                className={classes.button}
              >
                로그인
              </Button>
            </form>
            <hr />
            <a
              href="/auth/kakao"
              className="btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={kakaoBtn}
                alt={"kakao_login"}
                style={{
                  width: "250px"
                }}
              />
            </a>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login));
