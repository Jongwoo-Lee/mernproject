import React, { Component } from "react";

// Material UI
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import SvgIcon from "@material-ui/core/SvgIcon";

function InstagramIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
    </SvgIcon>
  );
}

function FacebookIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
    </SvgIcon>
  );
}

function TwitterIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
    </SvgIcon>
  );
}

function LinkedinIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" />
    </SvgIcon>
  );
}

function YoutubeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
    </SvgIcon>
  );
}

class ProfileForm extends Component {
  state = {
    displaySocialInputs: false
  };

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.formState.errors).length !== 0 &&
      prevProps.formState.errors !== this.props.formState.errors
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { onSubmit, onChange, formState, classes, selectChange } = this.props;
    let socialInputs;

    if (this.state.displaySocialInputs) {
      socialInputs = (
        <div>
          <TextField
            label="Instagram"
            name="instagram"
            value={formState.instagram}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.instagram}
            helperText={formState.errors.instagram}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InstagramIcon />
                </InputAdornment>
              )
            }}
          />
          <br />
          <TextField
            label="Facebook"
            name="facebook"
            value={formState.facebook}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.facebook}
            helperText={formState.errors.facebook}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FacebookIcon />
                </InputAdornment>
              )
            }}
          />
          <br />
          <TextField
            label="Twitter"
            name="twitter"
            value={formState.twitter}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.twitter}
            helperText={formState.errors.twitter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TwitterIcon />
                </InputAdornment>
              )
            }}
          />
          <br />
          <TextField
            label="Linkedin"
            name="linkedin"
            value={formState.linkedin}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.linkedin}
            helperText={formState.errors.linkedin}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedinIcon />
                </InputAdornment>
              )
            }}
          />
          <br />
          <TextField
            label="Youtube"
            name="youtube"
            value={formState.youtube}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.youtube}
            helperText={formState.errors.youtube}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YoutubeIcon />
                </InputAdornment>
              )
            }}
          />
          <br />
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

    const feet = [
      { label: "오른발", value: "right" },
      { label: "왼발", value: "left" }
    ];

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
    };
    return (
      <div>
        <small className="d-block pb-3">* = 필수항목</small>
        <small className="d-block pb-3">
          <i>프로필 사진은 운동 나오셨을때 촬영된 사진으로 올라갑니다.</i>
        </small>
        <form noValidate style={{ textAlign: "center" }}>
          <TextField
            label="* 이름"
            name="name"
            value={formState.name}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.name}
            helperText={
              formState.errors.name
                ? formState.errors.name
                : "이름을 작성해주세요"
            }
          />
          <br />
          <TextField
            label="* 등번호"
            name="handle"
            value={formState.handle}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.handle}
            helperText={
              formState.errors.handle
                ? formState.errors.handle
                : "유니폼 등번호를 작성해주세요"
            }
          />
          <br />
          <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="mainposition">* 주포지션</InputLabel>
            <Select
              multiple
              value={formState.mainposition}
              onChange={selectChange("mainposition")}
              input={<Input id="mainposition" />}
              renderValue={selected => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox
                    checked={formState.mainposition.indexOf(option.value) > -1}
                  />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>주 포지션을 순서대로 선택해주세요</FormHelperText>
          </FormControl>
          <br />
          <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="mainfoot">* 주발</InputLabel>
            <Select
              multiple
              value={formState.mainfoot}
              onChange={selectChange("mainfoot")}
              input={<Input id="mainfoot" />}
              renderValue={selected => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {feet.map(foot => (
                <MenuItem key={foot.value} value={foot.value}>
                  <Checkbox
                    checked={formState.mainfoot.indexOf(foot.value) > -1}
                  />
                  <ListItemText primary={foot.label} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              본인이 주로 사용하는 발을 선택해주세요
            </FormHelperText>
          </FormControl>
          <br />
          <TextField
            label="생년월일"
            name="birthday"
            type="date"
            value={formState.birthday}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.birthday}
            helperText={
              formState.errors.birthday
                ? formState.errors.birthday
                : "본인의 생년월일을 입력해주세요"
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <br />
          <TextField
            label="키"
            name="height"
            value={formState.height}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.height}
            helperText={
              formState.errors.height
                ? formState.errors.height
                : "본인의 키를 cm 단위로 작성해주세요"
            }
          />
          <br />
          <TextField
            label="몸무게"
            name="weight"
            value={formState.weight}
            onChange={onChange}
            margin="normal"
            className={classes.FormControl}
            error={formState.errors.weight}
            helperText={
              formState.errors.weight
                ? formState.errors.weight
                : "본인의 몸무게를 kg 단위로 작성해주세요"
            }
          />

          <br />

          <TextField
            label="자기 소개"
            name="bio"
            value={formState.bio}
            onChange={onChange}
            margin="normal"
            multiline
            rows="4"
            className={classes.FormControl}
            error={formState.errors.bio}
            helperText={
              formState.errors.bio
                ? formState.errors.bio
                : "본인에 대해 짧게 소개해주세요"
            }
          />
          <br />
          <Button
            color="default"
            variant="raised"
            onClick={() => {
              this.setState(prevState => ({
                displaySocialInputs: !prevState.displaySocialInputs
              }));
            }}
            className={classes.button}
          >
            SNS 링크 추가하기 (선택)
          </Button>
          <br />
          {socialInputs}
          <Button
            color="primary"
            size="large"
            variant="raised"
            onClick={onSubmit}
            className={classes.button}
          >
            프로필 등록
          </Button>
          {/*
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
            /> */}
        </form>
      </div>
    );
  }
}

export default ProfileForm;
