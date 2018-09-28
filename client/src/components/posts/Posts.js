import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/spinner";
import { getPosts } from "../../actions/postActions";
import Pagination from "../common/Pagination";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
    width: 200
  },
  FormControl: {
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: 250
    }
  }
});

class Posts extends Component {
  constructor() {
    super();
    this.state = {
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
    this.props.getPosts(1);
  }

  onChangePage(page) {
    this.props.getPosts(page);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { classes } = this.props;
    const { posts, loading, current, pages } = this.props.post;
    let postContent;

    const { width } = this.state;
    const isMobile = width <= 500;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} isMobile={isMobile} />;
    }

    return (
      <Grid
        container
        className={classes.grid}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid item sm>
          <Typography
            variant="display3"
            className={classes.title}
            align="center"
          >
            회원게시판
          </Typography>
          <PostForm />
        </Grid>
        <Grid item sm>
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

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(withStyles(styles)(Posts));
