import React, { Component } from "react";
import axios from "axios";
import MyEditor from "../common/editor/MyEditor";

class AddFiles extends Component {
  state = {
    file: null,
    hasFocus: false
  };

  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    console.log(this.state.file[0]);
    formData.append("file", this.state.file[0]);
    axios
      .post(`/api/upload/test-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        // handle your response;
        console.log(response);
      })
      .catch(error => {
        // handle your error
        console.log(error);
      });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitFile}>
          <input
            label="upload file"
            type="file"
            onChange={this.handleFileUpload}
          />
          <button type="submit">Send</button>
        </form>
        <MyEditor />
      </div>
    );
  }
}

export default AddFiles;
