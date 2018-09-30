import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  paper: {
    padding: 15,
    [theme.breakpoints.down("sm")]: {
      width: "324px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "450px"
    },
    [theme.breakpoints.up("md")]: {
      width: "650px"
    }
  },
  button: {
    margin: 10,
    width: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100px"
    }
  },
  FormControl: {
    width: "100%"
  }
});

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postID } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      thumbnail_image: user.thumbnail_image
    };

    this.props.addComment(postID, newComment);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { text, errors } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <form noValidate>
          <TextField
            label="댓글을 작성해주세요"
            name="text"
            value={text}
            onChange={this.onChange}
            multiline
            rows="2"
            margin="normal"
            variant="filled"
            className={classes.FormControl}
            error={errors.text}
            helperText={errors.text}
            InputLabelProps={{
              shrink: true
            }}
          />
          <br />
          <Button
            color="secondary"
            size="large"
            variant="raised"
            onClick={this.onSubmit}
            className={classes.button}
          >
            작성
          </Button>
        </form>
      </Paper>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withStyles(styles)(CommentForm));
