import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class NoticeItem extends Component {
  onPostClick(id) {
    this.props.history.push(`/notice/${id}`);
  }

  render() {
    const { notice, classes } = this.props;
    const date = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    }).format(new Date(notice.date));

    return (
      <Paper
        className={classes.paper}
        onClick={this.onPostClick.bind(this, notice._id)}
      >
        <Grid container direction="column" spacing={16}>
          <Grid item xs>
            <Typography gutterBottom variant="title">
              {notice.title}
            </Typography>
            <Typography gutterBottom>{notice.name}</Typography>
            <Typography color="textSecondary">{date}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

NoticeItem.propTypes = {
  notice: PropTypes.object.isRequired
};

export default withRouter(NoticeItem);
