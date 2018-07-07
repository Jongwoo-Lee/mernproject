import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import jwt_decode from "jwt-decode";

class Kakao extends Component {
  componentWillMount() {
    if (this.props.match.params.token && !this.props.auth.isAuthenticated) {
      const { token } = this.props.match.params;

      if (token === "inactive") {
      } else {
        const user = jwt_decode(token);
        user.password = "1kakao@Total3Goovoo$";

        this.props.loginUser(user);
      }
    } else {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    // If some logged in user tries to get into login page, redirect to dashboard
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/feed");
    }
  }

  render() {
    let postContent;
    if (this.props.auth.user.active) {
      postContent = null;
    } else {
      postContent = (
        <div>
          {" "}
          <span>
            계정이 아직 활성화가 되어있지 않습니다. 정무형이나 FC토탈 카톡
            단체방에 연락바랍니다.
          </span>{" "}
        </div>
      );
    }

    return <div>{postContent}</div>;
  }
}

Kakao.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Kakao);

// this.props.loginKakaoUser({
//   code: this.props.match.params.code,
//   grant_type: "authorization_code",
//   client_id: "33bdb5c8abf403a5a232ef10aa74c722",
//   redirect_uri: "http://localhost:5000/auth/kakao/callback"
// });
