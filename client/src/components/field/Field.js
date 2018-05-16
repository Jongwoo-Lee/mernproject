import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Field extends Component {
  render() {
    return (
      <div>
        <h1>Add Field</h1>
      </div>
    );
  }
}

Field.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
