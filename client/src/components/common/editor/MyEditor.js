import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
// import createLinkifyPlugin from "draft-js-linkify-plugin";
import { EditorState } from "draft-js";
// import createRichButtonsPlugin from "draft-js-richbuttons-plugin";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const richButtonsPlugin = createRichButtonsPlugin();
// const linkifyPlugin = createLinkifyPlugin();
// const plugins = [linkifyPlugin, richButtonsPlugin];

class MyEditor extends Component {
  state = {
    hasFocus: false,
    editorState: EditorState.createEmpty()
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  // _onBoldClick() {
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  // }

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
    console.log(file);
    formData.append("file", file);
    return axios
      .post(`/api/upload/test-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        // handle your response;
        console.log(response);
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
    // const { BoldButton, ItalicButton } = richButtonsPlugin;
    const { editorState } = this.state;
    return (
      <div
        className={`container-root ${this.state.hasFocus ? "hasFocus" : ""}`}
      >
        {/* <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <div style={{ backgroundColor: "#CCC" }}>
          &nbsp;
          <BoldButton onClick={this._onBoldClick.bind(this)}>
            <span className={`fa fa-bold`} style={{ color: "#000" }} />
          </BoldButton>&nbsp;
          <ItalicButton>
            <span className={`fa fa-italic`} style={{ color: "#000" }} />
          </ItalicButton>
        </div> */}
        <Editor
          // customStyleMap={{
          //   SUBSCRIPT: { fontSize: "0.6em", verticalAlign: "sub" },
          //   SUPERSCRIPT: { fontSize: "0.6em", verticalAlign: "super" }
          // }}
          // onFocus={() => this.setState({ hasFocus: true })}
          // onBlur={() => this.setState({ hasFocus: false })}
          // editorState={this.state.editorState}
          // onChange={this.onChange}
          // plugins={plugins}
          editorState={editorState}
          wrapperClassName="draft-wrapper"
          editorClassName="draft-editor"
          toolbarClassName="draft-toolbar"
          onEditorStateChange={this.onEditorStateChange}
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
export default MyEditor;
