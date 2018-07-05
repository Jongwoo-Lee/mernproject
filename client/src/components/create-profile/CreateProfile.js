import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";

import Select from "react-select";
import "react-select/dist/react-select.css";

import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      birthday: moment(),
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
    this.PositionChange = this.PositionChange.bind(this);
    this.MainfootChange = this.MainfootChange.bind(this);
    this.DateChange = this.DateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    // Main Position 순서 정하기
    let num = 0;
    let mainposition = this.state.mainposition.map(pos => {
      let newPos = { ...pos, num: num++ };
      return newPos;
    });

    num = 0;
    let mainfoot = this.state.mainfoot.map(pos => {
      let newPos = {};
      newPos.label = pos.label;
      newPos.value = num++;
      return newPos;
    });

    const profileData = {
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
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  PositionChange(value) {
    this.setState({ mainposition: value });
  }

  MainfootChange(value) {
    this.setState({ mainfoot: value });
  }

  DateChange(date) {
    this.setState({ birthday: date });
  }
  render() {
    const {
      errors,
      displaySocialInputs,
      mainposition,
      mainfoot,
      birthday
    } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter 주소"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook 주소"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin 주소"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel 주소"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram 주소"
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
              <h1 className="display-4 text-center">개인 프로필 작성</h1>
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
                {/* <TextFieldGroup
                  placeholder="생일"
                  name="birthday"
                  value={this.state.birthday}
                  onChange={this.onChange}
                  error={errors.birthday}
                  info="본인의 생일을 입력해주세요"
                /> */}{" "}
                <div className="form-group">
                  <DatePicker selected={birthday} onChange={this.DateChange} />
                  <small className="form-text text-muted mb-3">
                    본인의 생일을 입력해주세요
                  </small>
                </div>
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
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
