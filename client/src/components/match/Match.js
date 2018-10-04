import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/spinner";
import { getMatch } from "../../actions/matchActions";
import shallowCompare from "react-addons-shallow-compare";

// Components
import Comments from "../common/comments/Comments";
import totallogo from "../common/images/fct_logo_small.png";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
  grid: {
    marginTop: 10,
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
      width: "650px"
    }
  },
  image: {
    width: 128,
    height: 128
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
  }
});

class Match extends Component {
  componentDidMount() {
    this.props.getMatch(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { classes } = this.props;
    const { match, loading } = this.props.matches;
    let postContent;
    if (match === null || loading || Object.keys(match).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <Fragment>
          <Paper className={classes.root}>
            <Grid container spacing={16}>
              <Grid
                item
                container
                display="row"
                justify="space-around"
                alignItems="center"
              >
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="totallogo"
                    src={totallogo}
                  />
                </ButtonBase>
                <Grid item container direction="column" alignItems="center">
                  <Typography variant="display3">2</Typography>
                  <Typography variant="textSecondary">
                    <i>골: 조남헌, 어시: 이종우</i>
                  </Typography>
                </Grid>
                &nbsp;
                <Typography variant="display1">vs</Typography>
                &nbsp;
                <Typography variant="display3">0</Typography>
                &nbsp;
                <Typography variant="display1">
                  {match.title.replace("vs ", "")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subheading">
                      {match.place}
                    </Typography>
                    <Typography gutterBottom>{match.text}</Typography>
                    <Typography color="textSecondary">abc</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Comments
            post={match}
            // addComment={addComment}
            // deleteComment={deleteComment}
          />
        </Fragment>
      );
    }

    return (
      <Grid
        container
        className={classes.grid}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Button
          variant="contained"
          size="large"
          className={classes.button}
          component={Link}
          to="/feed"
        >
          돌아가기
        </Button>
        <Grid item sm>
          {postContent}
        </Grid>
      </Grid>
    );
  }
}

Match.propTypes = {
  getMatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  matches: state.match
});

const mapDispatchToProps = { getMatch };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Match));
