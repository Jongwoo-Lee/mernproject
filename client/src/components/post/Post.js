import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PostItem from "../posts/PostItem";
import NoticeItem from "../notice/NoticeItem";
import CommentForm from "../common/comments/CommentForm";
import CommentFeed from "../common/comments/CommentFeed";
import Spinner from "../common/spinner";
import { getPost, addComment, deleteComment } from "../../actions/postActions";
import shallowCompare from "react-addons-shallow-compare";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <NoticeItem notice={post} />
          <div className="card card-header bg-dark text-white">
            댓글 {post.comments.length}
          </div>
          <CommentFeed
            postID={post._id}
            comments={post.comments}
            isMobile={true}
            deleteComment={this.props.deleteComment}
          />
          <CommentForm postID={post._id} addComment={this.props.addComment} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                돌아가기
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = { getPost, addComment, deleteComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
