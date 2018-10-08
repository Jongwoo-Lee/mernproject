import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import { getMatch } from "../../actions/matchActions";
import shallowCompare from "react-addons-shallow-compare";
import { addComment, deleteComment } from "../../actions/matchActions";

// Components
import Comments from "../common/comments/Comments";
import totallogo from "../common/images/fct_logo_small.png";
import MatchEdit from "./MatchEdit";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import EditIcon from "@material-ui/icons/EditOutlined";

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
    height: 128,
    [theme.breakpoints.down("sm")]: {
      width: "70px"
    }
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px"
    }
  },
  button: {
    margin: 10,
    width: 100
  },
  FormControl: {
    width: 300,
    [theme.breakpoints.down("xs")]: {
      width: 200
    }
  },
  score: {
    width: 100
  },
  font: {
    fontSize: 12
  }
});

class Match extends Component {
  state = {
    editOn: false
  };

  componentDidMount() {
    this.props.getMatch(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleEdit = () => {
    this.setState({ editOn: !this.state.editOn });
  };

  render() {
    const { addComment, deleteComment, classes } = this.props;
    const { match, loading } = this.props.matches;
    let postContent;
    if (match === null || loading || Object.keys(match).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <Fragment>
          <Paper className={classes.root}>
            <Grid container spacing={16}>
              <Grid item>
                <Typography variant="body2">{match.type}</Typography>
              </Grid>
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
                <Typography variant="display3" className={classes.title}>
                  2
                </Typography>
                &nbsp;
                <Typography variant="display1" className={classes.title}>
                  vs
                </Typography>
                &nbsp;
                <Typography variant="display3" className={classes.title}>
                  0
                </Typography>
                &nbsp;
                <Typography variant="display1" className={classes.title}>
                  {match.title.replace("vs ", "")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography className={classes.font}>
                      <i className="fas fa-futbol" />
                      &nbsp;
                      <b>조남헌</b> (이종우)
                    </Typography>
                    <Typography gutterBottom variant="subheading">
                      {match.place}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      {match.start.slice(0, 10)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Comments
            post={match}
            addComment={addComment}
            deleteComment={deleteComment}
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
        <Grid
          container
          justify="space-around"
          alignItems="center"
          direction="row"
        >
          <Button
            variant="contained"
            size="large"
            className={classes.button}
            // component={Link}
            // to="/feed"
            onClick={this.props.history.goBack}
          >
            돌아가기
          </Button>

          <Button
            className={classes.button}
            // component={Link}
            // to="/feed"
            onClick={this.handleEdit}
          >
            <EditIcon />
          </Button>
        </Grid>
        <Grid item sm>
          {postContent}
        </Grid>

        {this.state.editOn ? <MatchEdit classes={classes} /> : null}
      </Grid>
    );
  }
}

Match.propTypes = {
  getMatch: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  matches: state.match
});

const mapDispatchToProps = { getMatch, addComment, deleteComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Match));
