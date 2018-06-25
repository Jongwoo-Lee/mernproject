import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NoticeItem from "./NoticeItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../common/spinner";
import { getNotice } from "../../actions/noticeActions";

class Notice extends Component {
  componentDidMount() {
    this.props.getNotice(this.props.match.params.id);
  }

  render() {
    const { notice, loading } = this.props.notice;
    let noticeContent;

    if (notice === null || loading || Object.keys(notice).length === 0) {
      noticeContent = <Spinner />;
    } else {
      noticeContent = (
        <div>
          <NoticeItem notice={notice} />
          <CommentForm postID={notice._id} />
          <CommentFeed postID={notice._id} comments={notice.comments} />
        </div>
      );
    }

    return (
      <div className="notice">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/notices" className="btn btn-light mb-3">
                돌아가기
              </Link>
              {noticeContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Notice.propTypes = {
  getNotice: PropTypes.func.isRequired,
  notice: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notice: state.notice
});

const mapDispatchToProps = { getNotice };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notice);
