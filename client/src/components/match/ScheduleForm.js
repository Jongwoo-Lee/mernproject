import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMatch } from "../../actions/matchActions";

// Material UI
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import TimeInput from "material-ui-time-picker";

class Form extends Component {
  state = this.getInitState();

  getInitState() {
    const { date } = this.props;
    if (date) {
      return {
        date: date,
        start: new Date(),
        end: new Date(),
        opponent: "",
        place: "",
        text: "",
        type: ""
      };
    } else {
      return {
        date: date,
        start: new Date(),
        end: new Date(),
        opponent: "",
        place: "",
        text: "",
        type: ""
      };
    }
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    });

  handleTime = (name, time) => {
    console.log(time);
    this.setState({
      [name]: time
    });
  };

  handleSubmit = () => {
    const { date, start, end, type, text, place, opponent } = this.state;
    const startTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      start.getHours(),
      start.getMinutes(),
      start.getSeconds()
    );

    const endTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      end.getHours(),
      end.getMinutes(),
      end.getSeconds()
    );

    let title;
    type === "자체 연습" ? (title = "자체 연습") : (title = opponent);

    const matchData = {
      title: title,
      place: place,
      start: startTime,
      end: endTime,
      text: text,
      type: type
    };

    console.log(matchData);
    this.props.addMatch(matchData);
    this.props.onClose();
  };

  render() {
    const { opponent, place, text, type, start, end } = this.state,
      { classes } = this.props;

    const categories = ["자체 연습", "친선경기", "리그/대회"];
    return (
      <form>
        <TimeInput
          label="시작"
          mode="12h"
          value={start}
          onChange={time => this.handleTime("start", time)}
        />
        ~
        <TimeInput
          label="끝"
          mode="12h"
          value={end}
          onChange={time => this.handleTime("end", time)}
        />
        <br />
        <TextField
          label="장소"
          value={place}
          onChange={this.handleChange("place")}
          margin="normal"
          className={classes.FormControl}
        />
        <FormControl className={classes.FormControl}>
          <InputLabel htmlFor="type">종류</InputLabel>
          <Select value={type} onChange={this.handleChange("type")}>
            {categories.map(category => (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {type === "친선경기" || type === "리그/대회" ? (
          <TextField
            label="상대편"
            value={opponent}
            onChange={this.handleChange("opponent")}
            margin="normal"
            className={classes.FormControl}
          />
        ) : null}
        <br />
        <TextField
          label="공지사항"
          value={text}
          onChange={this.handleChange("text")}
          margin="normal"
          multiline
          rows="2"
          className={classes.FormControl}
        />
        <br />
        <Button color="primary" variant="raised" onClick={this.handleSubmit}>
          등록
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => null;

export default connect(
  mapStateToProps,
  { addMatch }
)(Form);
