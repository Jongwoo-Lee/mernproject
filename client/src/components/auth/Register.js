import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

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
    margin: 10
  },
  FormControl: {
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: 250
    }
  }
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { username, email, password, password2, errors } = this.state;
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
            회원 가입
          </Typography>
          <Typography variant="subheading" align="center">
            신규 회원은 개별 연락부탁드립니다. (카카오톡 로그인은 회원가입
            불필요)
          </Typography>
          <br />
          <Paper className={classes.paper}>
            <form noValidate style={{ textAlign: "center" }}>
              <TextField
                label="이름"
                name="username"
                value={username}
                onChange={this.onChange}
                margin="normal"
                className={classes.FormControl}
                error={errors.username}
                helperText={errors.username}
              />
              <br />
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
              <TextField
                label="비밀번호 재확인"
                name="password2"
                type="password"
                value={password2}
                onChange={this.onChange}
                margin="normal"
                className={classes.FormControl}
                error={errors.password2}
                helperText={errors.password2}
              />
              <br />
              <Button
                color="secondary"
                size="large"
                variant="raised"
                onClick={this.onSubmit}
                className={classes.button}
              >
                회원 가입
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(withStyles(styles)(Register)));
