import React from "react";
import PropTypes from "prop-types";

import totallogo from "../common/images/fct_logo_small.png";

// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const PostPaper = props => {
  const { match, classes, history } = props;

  return (
    <Paper
      className={classes.root}
      onClick={() => history.push(`/match/${match._id}`)}
    >
      <Grid container spacing={8}>
        <Grid item>
          <Typography variant="body2">
            {match.type} &nbsp; {match.start.slice(0, 10)} &nbsp; {match.place}
          </Typography>
        </Grid>
        <Grid
          item
          container
          display="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={3}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="totallogo" src={totallogo} />
            </ButtonBase>
          </Grid>
          {match.result ? (
            <Grid
              item
              xs={5}
              container
              display="row"
              justify="space-around"
              alignItems="center"
            >
              <Typography variant="display2" className={classes.title}>
                {match.result.totalScore}
              </Typography>
              &nbsp;
              <Typography variant="display1" className={classes.opponent}>
                vs
              </Typography>
              &nbsp;
              <Typography variant="display2" className={classes.title}>
                {match.result.opponentScore}
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={5}>
              <Typography variant="subheading" style={{ textAlign: "center" }}>
                경기전
              </Typography>
            </Grid>
          )}
          &nbsp;
          <Grid item xs={3}>
            <Typography variant="display1" className={classes.opponent}>
              {match.title.replace("vs ", "")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

PostPaper.propTypes = {
  match: PropTypes.object.isRequired
};

export default PostPaper;
