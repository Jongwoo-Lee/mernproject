import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import logo from "../common/images/fct_logo_small.png";
import kakaoBtn from "../common/images/kakao_btn.png";
import Background from "../../img/showcase.jpg";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    minHeight: "850px"
  },
  button: {
    margin: theme.spacing.unit
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  title: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "60px"
    }
  },
  explain: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px"
    }
  }
});

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/feed");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={12} justify="center">
          <Grid item xs={9}>
            <img
              src={logo}
              style={{
                width: 250,
                height: 250
              }}
              alt="background showcase"
              className={classes.logo}
            />
            <hr />
            <Typography variant="display4" className={classes.title}>
              FC Total
            </Typography>
            <Typography variant="headline" className={classes.explain}>
              서울 송파구 KFA Division 6 아마추어 축구팀 커뮤니티 사이트
            </Typography>
            <Typography variant="subheading" className={classes.explain}>
              The Community Site of KFA Division 6 Amateur Football Team in
              Songpa-gu, Seoul
              <br />
              Since 2007, UIUC.
            </Typography>
            <hr />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              component={Link}
              to="/register"
            >
              회원 가입
            </Button>
            <Button
              variant="contained"
              color="default"
              size="large"
              className={classes.button}
              component={Link}
              to="/login"
            >
              로그인
            </Button>
            <br />
            <Button component="a" href="/auth/kakao">
              <img src={kakaoBtn} alt={"kakao_login"} />
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Landing));
