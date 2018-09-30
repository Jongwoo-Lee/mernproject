import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class MyEditor extends Component {
  uploadImageCallBack(file) {
    // return new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("POST", "https://api.imgur.com/3/image");
    //   xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
    //   const data = new FormData();
    //   data.append("image", file);
    //   xhr.send(data);
    //   xhr.addEventListener("load", () => {
    //     const response = JSON.parse(xhr.responseText);
    //     resolve(response);
    //   });
    //   xhr.addEventListener("error", () => {
    //     const error = JSON.parse(xhr.responseText);
    //     reject(error);
    //   });
    // });
    const formData = new FormData();
    formData.append("file", file);
    return axios
      .post(`/api/upload/test-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        // handle your response;
        // return
        return { data: { link: response.data.Location } };
      })
      .catch(error => {
        // handle your error
        console.log(error);
        error.response.json();
      });
  }

  render() {
    const { editorState, onEditorStateChange } = this.props;
    return (
      <div className="container-root">
        <Editor
          editorState={editorState}
          wrapperClassName="draft-wrapper"
          editorClassName="draft-editor"
          toolbarClassName="draft-toolbar"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            inline: {
              inDropdown: true
            },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: false }
            }
          }}
        />
      </div>
    );
  }
}

MyEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  onEditorStateChange: PropTypes.func.isRequired
};

export default MyEditor;
