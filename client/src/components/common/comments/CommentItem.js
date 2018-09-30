import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  avatar: {
    margin: 10
  }
});

class CommentItem extends Component {
  onDeleteClick(postID, commentID) {
    this.props.deleteComment(postID, commentID);
  }

  render() {
    const { comment, postID, auth, classes } = this.props;

    const date = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric"
    }).format(new Date(comment.date));

    return (
      <Paper className={classes.root} elevation={1}>
        <Grid container direction="row" spacing={8}>
          <Grid item sm={2} xs={3}>
            <Avatar
              alt="Remy Sharp"
              src={comment.thumbnail_image}
              className={classes.avatar}
            />
          </Grid>
          <Grid item sm={10} xs={9} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subheading">
                  {comment.name}
                </Typography>
                <Typography gutterBottom>{comment.text}</Typography>
                <Typography color="textSecondary">{date}</Typography>
              </Grid>
            </Grid>
            {comment.user === auth.user.id ? (
              <Grid item>
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={this.onDeleteClick.bind(this, postID, comment._id)}
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentItem));
