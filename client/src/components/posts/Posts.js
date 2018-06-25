import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/spinner";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.props.post.posts.length);
    // console.log(this.props.post.posts.likes.length);
    // if (
    //   this.props.post.posts &&
    //   this.props.post.posts.length !== nextProps.post.posts.length
    // ) {
    //   console.log(this.props.post.posts.length);
    //   return true;
    // }
    // if (
    //   this.props.post.posts
    // ) {
    //   return true;
    // }

    // return false;
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
