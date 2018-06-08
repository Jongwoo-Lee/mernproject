import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import logo from "../common/fct_logo_small.png";
import { Image } from "react-bootstrap";
// import LandingButtons from "./LandingButtons";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
                <h1 className="display-3 mb-4">FC Total</h1>
                <p className="lead">
                  {" "}
                  The Community Website of University of Illinois at Urbana
                  Champaign Korean Football Club. <br /> Since 2007
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-success mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
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
