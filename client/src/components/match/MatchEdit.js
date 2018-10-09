import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileActions";
import { addResult } from "../../actions/matchActions";
import ScoreInput from "./ScoreInput";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

class MatchEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalScore: "",
      opponentScore: "",
      lineup: [],
      scorer: [],
      inputNum: 0,
      errors: {}
    };

    this.props.getProfiles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onScorerChange = i => person => {
    let scorer = [...this.state.scorer];
    scorer[i] = { ...scorer[i], scorer: person.key };
    this.setState({
      scorer
    });
  };

  onAssistChange = i => person => {
    let scorer = [...this.state.scorer];
    scorer[i] = { ...scorer[i], assist: person.key };
    this.setState({
      scorer
    });
  };

  selectChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    });

  addScorer = e => {
    let { inputNum } = this.state;
    let scorer = [...this.state.scorer];
    scorer[inputNum] = { id: inputNum, scorer: "", assist: "" };
    inputNum++;
    this.setState({
      inputNum,
      scorer
    });
  };

  onSubmit = e => {
    const { totalScore, opponentScore, lineup, scorer } = this.state;
    const { profile, match, addResult } = this.props;

    const result = { totalScore, opponentScore };
    const players = lineup.map(player => {
      const playerProfile = profile.profiles.find(person => {
        return person.user.name === player;
      });
      return {
        playerID: playerProfile._id,
        name: player,
        image: playerProfile.user.thumbnail_image
      };
    });

    const matchData = {
      result,
      players,
      scorer,
      matchID: match.match._id
    };
    addResult(matchData);
  };

  render() {
    const {
      errors,
      totalScore,
      opponentScore,
      lineup,
      scorer,
      inputNum
    } = this.state;
    const { match, classes, profile } = this.props;

    let scoreInput = [];

    for (let i = 0; i < inputNum; i++) {
      scoreInput.push(
        <Grid item key={i}>
          <ScoreInput
            classes={this.props.classes}
            lineup={lineup}
            scorer={scorer[i]}
            onScorerChange={this.onScorerChange(i)}
            onAssistChange={this.onAssistChange(i)}
          />
        </Grid>
      );
    }

    return (
      <Fragment>
        <Typography variant="headline" className={classes.title} align="center">
          경기결과 등록
        </Typography>
        <Grid
          container
          className={classes.root}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid
            container
            className={classes.root}
            direction="row"
            justify="center"
            alignItems="baseline"
            spacing={16}
          >
            <Grid item>
              <Typography variant="body1">스코어:</Typography>
            </Grid>
            <Grid item>
              <TextField
                label="* 토탈"
                name="totalScore"
                value={totalScore}
                onChange={this.onChange}
                margin="normal"
                className={classes.score}
                error={errors.totalScore}
                helperText={errors.totalScore ? errors.totalScore : ""}
              />
              &nbsp;vs&nbsp;
              <TextField
                label="* 상대편"
                name="opponentScore"
                value={opponentScore}
                onChange={this.onChange}
                margin="normal"
                className={classes.score}
                error={errors.opponentScore}
                helperText={errors.opponentScore ? errors.opponentScore : ""}
              />
            </Grid>
          </Grid>
          <Grid item>
            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="lineup">* 참석 명단</InputLabel>
              <Select
                multiple
                value={lineup}
                onChange={this.selectChange("lineup")}
                input={<Input id="lineup" />}
                renderValue={selected => selected.join(", ")}
              >
                {profile.profiles
                  ? profile.profiles.map(player => (
                      <MenuItem key={player._id} value={player.user.name}>
                        <Checkbox
                          checked={lineup.indexOf(player.user.name) > -1}
                        />
                        <ListItemText
                          primary={`${player.handle} ${player.user.name}`}
                        />
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            container
            className={classes.root}
            direction="row"
            justify="center"
            alignItems="center"
            spacing={16}
          >
            <Typography variant="body1">골 스코어러 추가</Typography>
            <IconButton color="secondary" onClick={this.addScorer}>
              <AddIcon />
            </IconButton>
          </Grid>
          {scoreInput}
          <Button
            color="primary"
            size="small"
            variant="raised"
            onClick={this.onSubmit}
            className={classes.button}
          >
            경기결과 등록
          </Button>
        </Grid>
      </Fragment>
    );
  }
}

MatchEdit.propTypes = {
  errors: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  addResult: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  match: state.match,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProfiles, addResult }
)(MatchEdit);

{
  /* <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="mainposition">* 주포지션</InputLabel>
            <Select
              multiple
              value={formState.mainposition}
              onChange={selectChange("mainposition")}
              input={<Input id="mainposition" />}
              renderValue={selected => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox
                    checked={formState.mainposition.indexOf(option.value) > -1}
                  />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>주 포지션을 순서대로 선택해주세요</FormHelperText>
          </FormControl> */
}
