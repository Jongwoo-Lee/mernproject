import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

import Select from "react-select";
import "react-select/dist/react-select.css";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
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
    this.PositionChange = this.PositionChange.bind(this);
    this.MainfootChange = this.MainfootChange.bind(this);
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
  PositionChange(value) {
    this.setState({ mainposition: value });
  }

  MainfootChange(value) {
    this.setState({ mainfoot: value });
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      height: this.state.height,
      weight: this.state.weight,
      birthday: this.state.birthday,
      mainposition: this.state.mainposition,
      mainfoot: this.state.mainfoot,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs, mainposition, mainfoot } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    // Select options for status
    const options = [
      { label: "골키퍼", value: "GK" },
      { label: "왼쪽수비수", value: "LB" },
      { label: "중앙수비수", value: "CB" },
      { label: "오른쪽수비수", value: "RB" },
      { label: "왼쪽미드필더", value: "LM" },
      { label: "중앙미드필더", value: "CM" },
      { label: "오른쪽미드필더", value: "RM" },
      { label: "공격수", value: "CF" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">개인 프로필 수정</h1>
              <small className="d-block pb-3">* = 필수항목</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* 등번호"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="유니폼 등번호를 작성해주세요"
                />
                <Select
                  name="mainposition"
                  placeholder={"* 주포지션"}
                  multi={true}
                  removeSelected={false}
                  closeOnSelect={false}
                  value={mainposition}
                  onChange={this.PositionChange}
                  options={options}
                />
                <small className="form-text text-muted mb-3">
                  주 포지션을 순서대로 선택해주세요
                </small>

                <TextFieldGroup
                  placeholder="키"
                  name="height"
                  value={this.state.height}
                  onChange={this.onChange}
                  error={errors.height}
                  info="본인의 키를 cm 단위로 작성해주세요"
                />
                <TextFieldGroup
                  placeholder="몸무게"
                  name="weight"
                  value={this.state.weight}
                  onChange={this.onChange}
                  error={errors.weight}
                  info="본인의 몸무게를 kg 단위로 작성해주세요"
                />
                <Select
                  name="mainfoot"
                  placeholder={"* 주발"}
                  multi={true}
                  removeSelected={false}
                  closeOnSelect={false}
                  value={mainfoot}
                  onChange={this.MainfootChange}
                  options={[
                    { label: "오른발", value: "right" },
                    { label: "왼발", value: "left" }
                  ]}
                />
                <small className="form-text text-muted mb-3">
                  본인이 주로 사용하는 발을 선택해주세요
                </small>
                <TextFieldGroup
                  placeholder="생일"
                  name="birthday"
                  value={this.state.birthday}
                  onChange={this.onChange}
                  error={errors.birthday}
                  info="본인의 생일을 입력해주세요"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="본인에 대해 짧게 소개해주세요"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    SNS 링크 추가하기
                  </button>
                  <span className="text-muted">(선택)</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
