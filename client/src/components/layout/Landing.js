import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import logo from "../common/fct_logo_small.png";
import kakaoBtn from "../common/kakao_btn.png";
import { Image } from "react-bootstrap";
// import LandingButtons from "./LandingButtons";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  success(response) {
    console.log(response);
  }

  failure(error) {
    console.log(error);
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <Image src={logo} style={{ width: 250, height: 250 }} />
                <hr />
                <h1 className="display-2 mb-4">
                  <b>FC Total</b>
                </h1>
                <p className="lead">
                  {" "}
                  서울 송파구 KFA Division 6 아마추어 축구팀 커뮤니티 사이트
                  <br />
                  The Community Site of KFA Division 6 Amateur Football Team in
                  Songpa-gu, Seoul
                  <br />Since 2007, UIUC.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-success mr-3">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
                <br />
                <a href="http://localhost:5000/auth/kakao" className="btn">
                  <img src={kakaoBtn} alt={"kakao_login"} />
                </a>
              </div>
            </div>
          </div>
          {/* <LandingButtons /> */}
        </div>
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

export default connect(mapStateToProps)(Landing);
