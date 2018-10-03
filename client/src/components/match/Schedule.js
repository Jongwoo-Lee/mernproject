import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { getMatches } from "../../actions/matchActions";

// Components
import ScheduleForm from "./ScheduleForm";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import "react-big-calendar/lib/css/react-big-calendar.css";

const styles = theme => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    }
  },
  FormControl: {
    width: "90%"
  },
  xsFormControl: {
    width: 250
  },
  time: {
    width: "44%"
  }
});

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, start: "", end: "" };
  }

  componentDidMount() {
    this.props.getMatches();
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
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    this.setState({
      open: true,
      start: start, //new Date(start - tzoffset).toISOString().slice(0, 10),
      end: new Date(end - tzoffset).toISOString().slice(0, 10)
    });
  };

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    const { start, end } = this.state,
      { match, classes } = this.props;

    return (
      <Fragment>
        <Typography variant="display3" className={classes.title} align="center">
          스케쥴
        </Typography>
        <BigCalendar
          selectable
          localizer={localizer}
          events={match.matches}
          views={{ month: true, agenda: true }}
          step={60}
          showMultiDayTimes
          style={{ height: "600px" }}
          onSelectSlot={this.handleSelect}
        />
        <Dialog open={this.state.open} onClose={this.handleToggle}>
          <DialogTitle>스케쥴 생성 {end}</DialogTitle>
          <DialogContent>
            <ScheduleForm
              date={start}
              classes={classes}
              onClose={this.handleToggle}
            />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  match: state.match
});

export default connect(
  mapStateToProps,
  { getMatches }
)(withStyles(styles)(Schedule));
