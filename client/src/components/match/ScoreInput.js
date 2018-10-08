import React, { Fragment } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";

const ScoreInput = props => {
  const { classes, lineup, scorer, onScorerChange, onAssistChange } = props;
  return (
    <Fragment>
      <FormControl className={classes.FormControl}>
        <InputLabel htmlFor="age-simple">골</InputLabel>
        <Select
          value={scorer.scorer}
          onChange={(e, person) => onScorerChange(person)}
          input={<Input id="scorer" />}
        >
          {lineup
            ? lineup.map(player => (
                <MenuItem key={player} value={player}>
                  <ListItemText primary={player} />
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
      <FormControl className={classes.FormControl}>
        <InputLabel htmlFor="age-simple">어시스트</InputLabel>
        <Select
          value={scorer.assist}
          onChange={(e, person) => onAssistChange(person)}
        >
          {lineup
            ? lineup.map(player => (
                <MenuItem key={player} value={player}>
                  <ListItemText primary={player} />
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </Fragment>
  );
};

export default ScoreInput;
