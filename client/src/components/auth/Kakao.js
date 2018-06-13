import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/authActions";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

class Kakao extends Component {
  componentWillMount() {
    if (this.props.match.params.token) {
      // Save to localStorage
      const { token } = this.props.match.params;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      this.props.setCurrentUser(decoded);

      this.props.history.push("/feed");
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return null;
  }
}

Kakao.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Kakao);
