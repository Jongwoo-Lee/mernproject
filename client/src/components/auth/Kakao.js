import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { loginKakaoUser } from "../../actions/authActions";

class Kakao extends Component {
  componentWillMount() {
    if (this.props.match.params.code && !this.props.auth.isAuthenticated) {
      console.log(this.props.match.params.code);
      this.props.loginKakaoUser({
        code: this.props.match.params.code,
        grant_type: "authorization_code",
        client_id: "33bdb5c8abf403a5a232ef10aa74c722",
        redirect_uri: "http://localhost:5000/auth/kakao/callback"
      });

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
  loginKakaoUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginKakaoUser }
)(Kakao);
