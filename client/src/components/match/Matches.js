import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import MatchFeed from "./MatchFeed";
import Spinner from "../common/spinner";
import { getMatches } from "../../actions/matchActions";
import Pagination from "../common/Pagination";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  grid: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      width: "324px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "450px"
    },
    [theme.breakpoints.up("md")]: {
      width: "850px"
    }
  },
  image: {
    width: 100,
    height: 100,
    [theme.breakpoints.down("sm")]: {
      width: "70px"
    }
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
  },
  opponent: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px"
    }
  }
});

class Matches extends Component {
  componentDidMount() {
    this.props.getMatches(1);
  }

  onChangePage = page => {
    this.props.getMatches(page);
  };

  shouldCmatchnentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { classes, history } = this.props;
    const { matches, loading, current, pages } = this.props.match;
    let matchContent;

    if (matches === null || loading) {
      matchContent = <Spinner />;
    } else {
      matchContent = (
        <MatchFeed matches={matches} classes={classes} history={history} />
      );
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
            경기 결과
          </Typography>
          <br />
        </Grid>
        <Grid item sm>
          {matchContent}
          <br />
          <Pagination
            maxPage={pages}
            currentPage={Number(current)}
            onChangePage={this.onChangePage}
            isMobile={true}
          />
        </Grid>
      </Grid>
    );
  }
}

Matches.propTypes = {
  getMatches: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  match: state.match
});

export default connect(
  mapStateToProps,
  { getMatches }
)(withStyles(styles)(Matches));
