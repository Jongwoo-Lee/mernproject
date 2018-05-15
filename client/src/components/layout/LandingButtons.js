import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingButtons extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col bg-warning mt-3 btn" style={{ height: "500px" }}>
            Single Player
          </div>
          <div className="col bg-info mt-3 btn" style={{ height: "500px" }}>
            Multi Player
          </div>
          <div className="col bg-success mt-3 btn" style={{ height: "500px" }}>
            Field Owner
          </div>
        </div>
      </div>
    );
  }
}

export default LandingButtons;
