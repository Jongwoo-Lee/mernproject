import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NoticePaper from "./NoticePaper";
import Comments from "../common/comments/Comments";
import Spinner from "../common/spinner";
import {
  getNotice,
  addComment,
  deleteComment
} from "../../actions/noticeActions";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  grid: {
    marginTop: 10,
    padding: 20
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    }
  },
  button: {
    margin: 10,
    width: 100
  },
  FormControl: {
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: 250
    }
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

class Notice extends Component {
  componentDidMount() {
    this.props.getNotice(this.props.match.params.id);
  }

  render() {
    const { notice, loading } = this.props.notice;
    const { addComment, deleteComment, classes } = this.props;

    let noticeContent;
    if (notice === null || loading || Object.keys(notice).length === 0) {
      noticeContent = <Spinner />;
    } else {
      noticeContent = (
        <div>
          <NoticePaper notice={notice} classes={classes} />
          <Comments
            post={notice}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        </div>
      );
    }

    return (
      <Fragment>
        <Button
          variant="contained"
          size="large"
          className={classes.button}
          component={Link}
          to="/notices"
        >
          돌아가기
        </Button>
        {noticeContent}
      </Fragment>
    );
  }
}

Notice.propTypes = {
  getNotice: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  notice: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notice: state.notice
});

const mapDispatchToProps = { getNotice, addComment, deleteComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Notice));
