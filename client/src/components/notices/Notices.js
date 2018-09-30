import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoticeForm from "./NoticeForm";
import NoticeFeed from "./NoticeFeed";
import Spinner from "../common/spinner";
import { getNotices } from "../../actions/noticeActions";
import Pagination from "../common/Pagination";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import UploadIcon from "@material-ui/icons/FileCopyOutlined";

const styles = theme => ({
  grid: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    }
  },
  button: {
    margin: 10
  }
});

class Notices extends Component {
  constructor() {
    super();
    this.state = {
      isPost: false,
      width: window.innerWidth
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    this.props.getNotices(1);
  }

  onChangePage(page) {
    this.props.getNotices(page);
  }

  onPostClick() {
    this.setState({ isPost: !this.state.isPost });
  }

  render() {
    const { classes } = this.props;
    const { notices, loading, pages, current } = this.props.notice;
    //const { admin } = this.props.auth.user;
    const admin = true;
    let postSubmitform, postContent;

    const { width } = this.state;
    const isMobile = width <= 500;

    if (admin && this.state.isPost) {
      postSubmitform = <NoticeForm />;
    } else {
      postSubmitform = null;
    }

    if (notices === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <NoticeFeed notices={notices} />;
    }

    return (
      <Grid
        container
        className={classes.grid}
        justify="center"
        alignItems="center"
        direction="column"
        spacing={0}
      >
        <Grid item sm>
          <Typography
            variant="display3"
            className={classes.title}
            align="center"
          >
            공지사항
          </Typography>

          {admin ? (
            <Button
              size="small"
              className={classes.button}
              aria-label="onPost"
              onClick={this.onPostClick.bind(this)}
            >
              <UploadIcon />
              &nbsp;글쓰기
            </Button>
          ) : null}
          {postSubmitform}
          {postContent}
          <Pagination
            maxPage={pages}
            currentPage={Number(current)}
            onChangePage={this.onChangePage}
            isMobile={isMobile}
          />
        </Grid>
      </Grid>
    );
  }
}

Notices.propTypes = {
  getNotices: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notice: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  notice: state.notice
});

export default connect(
  mapStateToProps,
  { getNotices }
)(withStyles(styles)(Notices));
