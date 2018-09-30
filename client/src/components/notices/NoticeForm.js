import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNotice } from "../../actions/noticeActions";

// Components
import { EditorState, convertToRaw } from "draft-js";
import MyEditor from "../common/editor/MyEditor";
import draftToHtml from "draftjs-to-html";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

class NoticeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      preview: "",
      errors: {},
      editorState: EditorState.createEmpty()
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.onPreviewChange = this.onPreviewChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const text = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    const newPost = {
      title: this.state.title,
      text: text,
      name: user.name,
      preview: this.state.preview,
      thumbnail_image: user.thumbnail_image
    };

    this.props.addNotice(newPost);
    this.setState({ title: "", text: "" });
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onPreviewChange = preview => {
    this.setState({
      preview
    });
  };

  render() {
    const { title, editorState, errors } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar position="static" color="secondary">
          <Toolbar variant="dense">
            <Typography color="inherit">공지사항 작성</Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper}>
          <form noValidate>
            <TextField
              label="* 제목"
              name="title"
              value={title}
              onChange={this.onChange}
              margin="normal"
              className={classes.FormControl}
              error={errors.title}
              helperText={errors.title}
            />
            <br />
            <MyEditor
              editorState={editorState}
              onEditorStateChange={this.onEditorStateChange}
              onPreviewChange={this.onPreviewChange}
            />
            <Button
              color="primary"
              size="small"
              variant="raised"
              onClick={this.onSubmit}
              className={classes.button}
            >
              작성
            </Button>
          </form>
        </Paper>
      </Fragment>
    );
  }
}

NoticeForm.propTypes = {
  addNotice: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addNotice }
)(NoticeForm);
