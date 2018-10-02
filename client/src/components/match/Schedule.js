import React, { Component, Fragment } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import dates from "./date";
import events from "./events";

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "react-big-calendar/lib/css/react-big-calendar.css";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, events, start: "", end: "" };
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleFormSubmit = exercise => {
    this.handleToggle();
    this.props.onCreate(exercise);
  };

  handleSelect = ({ start, end }) => {
    console.log(start);
    this.setState({ open: true, start: start.toString(), end: end.toString() });
  };

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    return (
      <Fragment>
        <BigCalendar
          selectable
          localizer={localizer}
          events={this.state.events}
          views={{ month: true, agenda: true }}
          step={60}
          showMultiDayTimes
          max={dates.add(
            dates.endOf(new Date(2015, 17, 1), "day"),
            -1,
            "hours"
          )}
          defaultDate={new Date().setDate()}
          style={{ height: "600px" }}
          onSelectSlot={this.handleSelect}
        />
        <Dialog open={this.state.open} onClose={this.handleToggle}>
          <DialogTitle>스케쥴 생성</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
              <br />
              {this.state.start}
              <br />
              {this.state.end}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default Schedule;
