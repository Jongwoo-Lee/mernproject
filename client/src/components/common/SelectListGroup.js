import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const POSITION = [
  { label: "GK", value: "GK" },
  { label: "수비수", value: "defender", disabled: true },
  { label: "CB", value: "CB, SW" },
  { label: "LB", value: "LB, LWB" },
  { label: "RB", value: "RB, RWB" },
  { label: "미드필더", value: "midfielder", disabled: true },
  { label: "LM", value: "LM, LW" },
  { label: "CM", value: "CM, DM, AM" },
  { label: "RM", value: "RM, RW" },
  { label: "공격수", value: "forward", disabled: true },
  { label: "CF", value: "CF" }
];

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
