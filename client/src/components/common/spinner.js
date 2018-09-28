import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import amber from "@material-ui/core/colors/amber";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Spinner extends React.Component {
  timer = null;

  state = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CircularProgress
          className={classes.progress}
          style={{ color: amber[400] }}
          variant="determinate"
          size={50}
          thickness={5}
          value={this.state.completed}
        />
      </div>
    );
  }
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Spinner);
