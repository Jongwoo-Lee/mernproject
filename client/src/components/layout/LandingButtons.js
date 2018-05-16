import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class LandingButtons extends Component {
  changeRoute(linkto) {
    this.props.history.push(linkto);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div
            className="col bg-warning mt-3 btn"
            style={{ height: "500px" }}
            onClick={() => this.changeRoute("/dashboard")}
          >
            <h1>Single Player</h1>
          </div>
          <div
            className="col bg-info mt-3 btn"
            style={{ height: "500px" }}
            onClick={() => this.changeRoute("/dashboard")}
          >
            <h1>Multi Player</h1>
          </div>
          <div
            className="col bg-success mt-3 btn"
            style={{ height: "500px" }}
            onClick={() => this.changeRoute("/field")}
          >
            <h1>Field Owner</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingButtons);
