import React, { Component } from "react";
import Select from "react-select";

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

class MultiSelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeSelected: false,
      disabled: false,
      stayOpen: true,
      value: [],
      rtl: false
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
    console.log("You've selected:", value);
    this.setState({ value: [value, ...this.state.value] });
  }

  render() {
    const { disabled, stayOpen, value } = this.state;
    const options = POSITION;
    return (
      <div className="section">
        <Select
          closeOnSelect={!stayOpen}
          disabled={disabled}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder="주포지션을 선택하세요"
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue
          value={value}
        />
      </div>
    );
  }
}

export default MultiSelectField;
