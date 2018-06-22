import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoticeForm from "./NoticeForm";
import NoticeFeed from "./NoticeFeed";
import Spinner from "../common/spinner";
import { getPosts } from "../../actions/postActions";

class Notices extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postSubmitform, postContent;

    if (this.props.auth.user.admin) {
      postSubmitform = <NoticeForm />;
    } else {
      postSubmitform = null;
    }

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <NoticeFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {postSubmitform}
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Notices.propTypes = {
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Notices);
