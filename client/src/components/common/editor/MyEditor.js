import React, { Component } from "react";
import Editor from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import { EditorState, RichUtils } from "draft-js";
import createRichButtonsPlugin from "draft-js-richbuttons-plugin";

const richButtonsPlugin = createRichButtonsPlugin();
const linkifyPlugin = createLinkifyPlugin();
const plugins = [linkifyPlugin, richButtonsPlugin];

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

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  render() {
    const initial = JSON.parse(sessionStorage.getItem("draftail:content"));
    const { BoldButton, ItalicButton } = richButtonsPlugin;
    return (
      <div
        className={`container-root ${this.state.hasFocus ? "hasFocus" : ""}`}
      >
        {/* <button onClick={this._onBoldClick.bind(this)}>Bold</button> */}
        <div style={{ backgroundColor: "grey" }}>
          <BoldButton>
            <span className={`fa fa-bold`} style={{ color: "#000" }} />
          </BoldButton>
          <ItalicButton>
            <span className={`fa fa-italic`} style={{ color: "#000" }} />
          </ItalicButton>
        </div>
        <Editor
          customStyleMap={{
            SUBSCRIPT: { fontSize: "0.6em", verticalAlign: "sub" },
            SUPERSCRIPT: { fontSize: "0.6em", verticalAlign: "super" }
          }}
          onFocus={() => this.setState({ hasFocus: true })}
          onBlur={() => this.setState({ hasFocus: false })}
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
      </div>
    );
  }
}
export default MyEditor;
